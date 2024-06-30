#! /usr/bin/env node

// NPM ecosystem includes
const parseArgs = require("minimist")
const path = require("path")
const fs = require("fs")

// Scroll Notation Includes
const { Disk } = require("scrollsdk/products/Disk.node.js")
const { ScrollCli, ScrollFile, ScrollFileSystem } = require("scroll-cli")
const packageJson = require("./package.json")

// Constants
const WWS_VERSION = packageJson.version

const scrollFs = new ScrollFileSystem()
const scrollCli = new ScrollCli().silence()

class WWSCli {
  CommandFnDecoratorSuffix = "Command"

  executeUsersInstructionsFromShell(args = [], userIsPipingInput = process.platform !== "win32" && fs.fstatSync(0).isFIFO()) {
    const command = args[0]
    const commandName = `${command}${this.CommandFnDecoratorSuffix}`
    if (this[commandName]) return userIsPipingInput ? this._runCommandOnPipedStdIn(commandName) : this[commandName](args.slice(1))
    else if (command) this.log(`No command '${command}'. Running help command.`)
    else this.log(`No command provided. Running help command.`)
    return this.helpCommand()
  }

  _runCommandOnPipedStdIn(commandName) {
    let pipedData = ""
    process.stdin.on("readable", function () {
      pipedData += this.read() // todo: what's the lambda way to do this?
    })
    process.stdin.on("end", () => {
      const folders = pipedData
        .trim()
        .split("\n")
        .map(line => line.trim())
        .filter(line => fs.existsSync(line))

      folders.forEach(line => this[commandName](line))

      if (folders.length === 0)
        // Hacky to make sure this at least does something in all environments.
        // process.stdin.isTTY is not quite accurate for pipe detection
        this[commandName]()
    })
  }

  silence() {
    this.verbose = false
    return this
  }

  verbose = true

  logIndent = 0
  log(message) {
    const indent = "    ".repeat(this.logIndent)
    if (this.verbose) console.log(indent + message)
    return message
  }

  get _allCommands() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(word => word.endsWith(this.CommandFnDecoratorSuffix))
      .sort()
  }

  get wwsDir() {
    return path.join(__dirname, "wws")
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
gazetteCss
printTitle
thinColumns 1

# Fetched
${this.fetchedFolders.map(concept => `- ${concept.id}\n link ${concept.id}/index.html`).join("\n")}

# Unfetched
${this.unfetchedFolders.map(concept => `- ${concept.id}`).join("\n")}
`
    Disk.write(indexFile, content)
    await scrollCli.buildCommand(wwsDir)
  }

  get folders() {
    const { wwsDir } = this
    const wwsFile = path.join(__dirname, "readme.scroll")
    const wws = new ScrollFile(Disk.read(wwsFile), wwsFile, scrollFs)
    const { concepts } = wws
    concepts.forEach(concept => (concept.fetched = Disk.exists(path.join(wwsDir, concept.id))))
    return concepts
  }

  get fetchedFolders() {
    return this.folders.filter(concept => concept.fetched)
  }

  get unfetchedFolders() {
    return this.folders.filter(concept => !concept.fetched)
  }

  listCommand() {
    this.folders.forEach(concept => this.log((concept.fetched ? "✅ " : "▢ ") + concept.id))
  }

  fetchScroll(folderName) {
    const { wwsDir } = this
    const folder = this.folders.find(concept => concept.id === folderName)
    if (!folder) return this.log(`\n👎 No folder '${folderName}' found.`)
    // mkdir the folder if it doesn't exist:
    const conceptDir = path.join(wwsDir, folder.id)
    const gitSource = folder.source
    if (!Disk.exists(conceptDir)) {
      this.log(`Fetching ${folderName}`)
      Disk.mkdir(conceptDir)
      // do a shallow clone of the built site (wws branch) into the folder:
      require("child_process").execSync(`git clone --depth 1 --branch wws ${gitSource} ${conceptDir}`)
    } else {
      // update the shallow clone but still keep it shallow
      this.log(`Updating ${folderName}`)
      require("child_process").execSync(`cd ${conceptDir} && git pull`)
    }
  }

  fetchCommand(folderNames) {
    this.init()
    const { wwsDir, fetchedFolders } = this
    if (!folderNames.length) fetchedFolders.forEach(concept => this.fetchScroll(concept.id))
    else folderNames.forEach(folderName => this.fetchScroll(folderName))
    this.buildIndexPage()
  }

  openCommand() {
    // Trigger the terminal to run "open index.html", opening the users web browser:
    this.init()
    const { wwsDir } = this
    const indexHtml = path.join(wwsDir, "index.html")
    return require("child_process").exec(`open ${indexHtml}`)
  }

  whereCommand() {
    return this.log(this.wwsDir)
  }

  helpCommand() {
    this.log(`\n🌎🌏📜 WELCOME TO THE WWS (v${WWS_VERSION})`)
    return this.log(`\nThis is the WWS help page.\n\nCommands you can run:\n\n${this._allCommands.map(comm => `🖌️ ` + comm.replace(this.CommandFnDecoratorSuffix, "")).join("\n")}\n​​`)
  }
}

if (module && !module.parent) new WWSCli().executeUsersInstructionsFromShell(parseArgs(process.argv.slice(2))._)

module.exports = { WWSCli }
