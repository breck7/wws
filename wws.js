#! /usr/bin/env node

// NPM ecosystem includes
const parseArgs = require("minimist")
const path = require("path")
const fs = require("fs")
const child_process = require("child_process")
const express = require("express")
const dns = require("dns")
const util = require("util")

// Particles Includes
const { Disk } = require("scrollsdk/products/Disk.node.js")
const { Particle } = require("scrollsdk/products/Particle.js")
const { ScrollCli, ScrollFile, ScrollFileSystem, SimpleCLI } = require("scroll-cli")
const packageJson = require("./package.json")

// Constants
const WWS_VERSION = packageJson.version

const scrollFs = new ScrollFileSystem()
const scrollCli = new ScrollCli().silence()

const sanitizeFolderName = name => name.toLowerCase().replace(/[^a-z0-9._]/g, "")

class WWSCli extends SimpleCLI {
  get wwsDir() {
    return path.join(__dirname, "wws")
  }

  server = null
  async startCommand() {
    const app = express()
    const port = 80

    // Promisify dns.lookup to use async/await
    const lookup = util.promisify(dns.lookup)

    // Await DNS lookup
    const { address } = await lookup("scroll")
    const scrollPointsToLocalhost = address === "127.0.0.1"

    if (!scrollPointsToLocalhost) console.log(`No DNS alias to Scroll detected. Run '${__dirname}/wws.js hosts' to enable http://scroll`)

    const hostname = scrollPointsToLocalhost ? "scroll" : "localhost"

    // Wrap app.listen in a Promise to await server start
    await new Promise((resolve, reject) => {
      this.server = app.listen(port, err => {
        if (err) {
          return reject(err)
        }
        console.log(`WWS running at http://${hostname}`)
        resolve()
      })
    })

    // Middleware to allow CORS
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*")
      next()
    })

    // Serve static files from this.wwsDir
    app.use(express.static(this.wwsDir))

    return app
  }

  async stop() {
    await new Promise((resolve, reject) => {
      this.server.close(err => {
        if (err) {
          return reject(err) // Reject if an error occurs
        }
        console.log("Server stopped successfully")
        resolve() // Resolve when server has closed
      })
    })
  }

  init() {
    const { wwsDir } = this
    if (Disk.exists(wwsDir)) return true

    Disk.mkdir(wwsDir)
    const initFolder = {
      "index.scroll": `The World Wide Scroll\n`
    }
    Disk.writeObjectToDisk(wwsDir, initFolder)
    return this.log(`\n👍 Initialized new WWS cache in '${wwsDir}'.`)
  }

  async buildIndexPage() {
    const { wwsDir } = this
    const indexFile = path.join(wwsDir, "index.scroll")
    const content = `title The World Wide Scroll
metaTags
theme gazette
printTitle
buildHtml

center
Your copy of the WWS is stored in \`${wwsDir}\`. ${this.fetchedFolders.length}/${this.folders.length} folders fetched. WWS version: ${WWS_VERSION}.

../header.scroll

center
table
 data
  rootName
  ${this.fetchedFolders.map(folder => folder.name).join("\n  ")}
 compose tag <div class="iframeHolder"><div><a href="{rootName}/index.html">{rootName}</a></div><iframe src="{rootName}/index.html" frameborder="0"></iframe></div>
  printColumn tag

wwsSnippetsParser
 extends printSnippetsParser
 crux snippets
 javascript
  makeSnippet(file, compileSettings) {
    const path = require("path")
    const folderName = file.folderPath.replace('${wwsDir}', "").split(path.sep)[1]
    return super.makeSnippet(file, compileSettings).replace('<h1 class="scrollTitle">', '<h1 class="scrollTitle"><a href="' + folderName + '/index.html" style="color: gray;">~' + folderName + '</a><br>')
  }

thinColumns
snippets ${this.fetchedFolders
      .map(folder => {
        const settings = this.getFolderSettings(folder.name)
        const snippets = settings.get("snippets")
        if (!snippets) return ""
        return folder.name + "/" + snippets
      })
      .filter(i => i)
      .join(" ")}
 limit 5
endColumns

# Unfetched (${this.unfetchedFolders.length}): ${this.unfetchedFolders.map(folder => `${folder.name}`).join(" - ")}

center
viewSourceButton
scrollVersionLink
viewSourceUrl https://github.com/breck7/wws/blob/main/wws.js
`
    Disk.write(indexFile, content)
    await scrollCli.buildCommand(wwsDir)
  }

  get folders() {
    const { wwsDir } = this
    const rootFilePath = path.join(__dirname, "root.scroll")
    const wws = new ScrollFile(Disk.read(rootFilePath), rootFilePath, scrollFs)
    const { concepts } = wws
    concepts.forEach(folder => (folder.fetched = Disk.exists(path.join(wwsDir, folder.name))))
    return concepts
  }

  get fetchedFolders() {
    return this.folders.filter(folder => folder.fetched)
  }

  get unfetchedFolders() {
    return this.folders.filter(folder => !folder.fetched)
  }

  listCommand() {
    const table = new Particle(
      this.folders.map(folder => {
        const { fetched, name, description } = folder
        return {
          " ": fetched ? "🟩" : "⬜️",
          Folder: folder,
          Description: description
        }
      })
    )
    this.log(`There are currently ${this.folders.length} root folders in the World Wide Scroll.`)
    this.log("")
    this.log(table.toFormattedTable())
    this.log("")
  }

  get count() {
    return this.fetchedFolders.length
  }

  getFolderSettings(folderName) {
    const { wwsDir } = this
    const rootFolder = path.join(wwsDir, folderName)
    const wwsFile = path.join(rootFolder, "wws.scroll")
    if (!Disk.exists(wwsFile)) return new Particle()
    return new Particle(Disk.read(wwsFile))
  }

  async fetchScroll(folderName) {
    const { wwsDir } = this
    const folder = this.folders.find(folder => folder.name === folderName)
    if (!folder) return this.log(`\n👎 No root folder '${folderName}' found.`)
    // mkdir the folder if it doesn't exist:
    const rootFolder = path.join(wwsDir, folder.name)
    const gitSource = folder.source
    const gitBranch = folder.branch || "main"
    if (!Disk.exists(rootFolder)) {
      this.log(`Fetching ${folderName}`)
      Disk.mkdir(rootFolder)
      // do a shallow clone of the built site (wws branch) into the folder:
      child_process.execSync(`git clone --depth 1 --branch ${gitBranch} ${gitSource} ${rootFolder}`)
    } else {
      // update the shallow clone but still keep it shallow
      this.log(`Updating ${folderName}`)
      child_process.execSync(`cd ${rootFolder} && git pull origin ${gitBranch}`)
    }
    // if main branch, build the site
    if (gitBranch === "main") await scrollCli.buildCommand(rootFolder)
    const settingsParticle = this.getFolderSettings(folder.name)
    settingsParticle
      .filter(particle => particle.getLine().startsWith("subfolder"))
      .forEach(subfolder => {
        const subfolderName = sanitizeFolderName(subfolder.atoms[1])
        const subfolderPath = path.join(rootFolder, subfolderName)
        const sourceRepo = subfolder.atoms[2]
        console.log(`Updating subfolder '${subfolderName}'`)
        if (!Disk.exists(subfolderPath)) {
          Disk.mkdir(subfolderPath)
          child_process.execSync(`git clone --depth 1 --branch wws ${sourceRepo} ${subfolderPath}`)
        } else child_process.execSync(`cd ${subfolderPath} && git pull origin wws`)
      })
  }

  // todo: upstream this
  executeUsersInstructionsFromShell(args = [], userIsPipingInput = process.platform !== "win32" && fs.fstatSync(0).isFIFO()) {
    const command = args[0]
    const commandName = `${command}${this.CommandFnDecoratorSuffix}`
    if (this[commandName]) return userIsPipingInput ? this._runCommandOnPipedStdIn(commandName) : this[commandName](args.slice(1))
    else if (command) this.log(`No command '${command}'. Running help command.`)
    else this.log(`No command provided. Running help command.`)
    return this.helpCommand()
  }

  async fetchCommand(folderNames) {
    this.init()
    const { wwsDir, fetchedFolders } = this
    if (!folderNames.length) await Promise.all(fetchedFolders.map(async folder => await this.fetchScroll(folder.name)))
    else folderNames.forEach(folderName => this.fetchScroll(folderName))
    this.buildIndexPage()
  }

  // buildCommand() {
  //   this.init()
  //   this.buildIndexPage()
  // }

  openCommand() {
    // Trigger the terminal to run "open index.html", opening the users web browser:
    this.init()
    const { wwsDir } = this
    const indexHtml = path.join(wwsDir, "index.html")
    return child_process.exec(`open ${indexHtml}`)
  }

  get welcomeMessage() {
    return `\n🌎🌏📜 WELCOME TO THE WWS (v${WWS_VERSION})\n\n${this.count} root folders in ${this.wwsDir}`
  }
}

if (module && !module.parent) new WWSCli().executeUsersInstructionsFromShell(parseArgs(process.argv.slice(2))._)

module.exports = { WWSCli }
