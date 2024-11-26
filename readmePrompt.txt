Below is the contents of this project/repo.

Generate a beautiful readme.md file from this.

```readme.scroll
description DESCRIPTION
replace DESCRIPTION A healthy, intelligent, trustworthy successor to the web that works offline.
title The World Wide Scroll Readme

header.scroll

printTitle

# DESCRIPTION

container 800px

center
root.tsv
 compose tag ~{name}
  printColumn tag

# Why build this?
To provide every human with their own copy of humanity's most intelligent information.

# What is the World Wide Scroll (WWS)?
View slideshow
 https://breckyunits.com/theScroll.html

The WWS is like the World Wide Web, except:
- *Offline.* You download entire sites and browse completely offline locally, rather than fetching one page at a time.
- *Non-toxic.* No ads, no paywalls, no trackers, no cookies, no copyright. The WWS and all content on it is public domain.
- *Intelligent.* Built not on HTML, but from the ground up in a simple, expandable language, designed for both humans and AIs.
 https://scroll.pub simple, expandable language
- *Trustworthy.* Source code and change history behind every page. Human verified editors.

clientInstall.scroll

# Reserve your root name today!
The World Wide Scroll beta is live!

You can now reserve a root name on The Scroll!

When you buy a root name, you get to name and edit a root "folder" in the World Wide Scroll.

A root folder is just a few lines of data about your folder and where the files reside, that is written to the root.scroll file.
 link root.scroll root.scroll

Revenue from root name sales go toward the development of The Scroll ecosystem including funds to "WWS Reps" who help onboard and maintain the community.

stripeButton.scroll

After you buy your root name, check out the Getting Started Guide.
 gettingStarted.html Getting Started Guide

finePrint.scroll

stripeButton.scroll

# Values
Craftsmanship, truth, courage, laughter, intelligence, science and love.

These are the words that guide The Scroll.

****

Release notes
 releaseNotes.html

# Download
Download the list of root folders in the World Wide Scroll as: CSV | TSV | JSON
 link root.csv CSV
 link root.tsv TSV
 link root.json JSON

# Folders
root.tsv
 select name description web source
  links web source
   printTable

pageFooter.scroll

```
```releaseNotes.scroll
buildConcepts releaseNotes.csv releaseNotes.json releaseNotes.tsv
buildMeasures releaseNotesMeasures.tsv
title World Wide Scroll Release Notes

header.scroll
printTitle
## A list of what has changed in WWS releases.

thinColumn
Download as CSV | TSV | JSON
 link releaseNotes.csv CSV
 link releaseNotes.tsv TSV
 link releaseNotes.json JSON

br

node_modules/scroll-cli/microlangs/changes.parsers

thinColumns 1

📦 0.23.0 11/26/2024
🎉 if you just type `wws [folderName]` it will run fetch
🎉 updated scroll
🎉 updated scrollsdk

📦 0.22.0 11/12/2024
🎉 updated scroll
🎉 updated scrollsdk

📦 0.21.0 10/19/2024
🎉 update scroll

📦 0.20.0 10/14/2024
🎉 added tags
🎉 homepage refresh

📦 0.19.0 10/13/2024
🏥 bug fixes

📦 0.18.0 10/13/2024
🎉 added delete command
🏥 bug fixes

📦 0.17.0 10/13/2024
🏥 bug fixes
⚠️ removed branches. not worth the complexity at all.

📦 0.16.0 10/11/2024
🎉 store data in users home dir. Thanks TD!
🏥 bug fixes

📦 0.15.0 10/11/2024
🎉 added http://scroll

📦 0.14.0 10/10/2024
🎉 various improvements and upgrades

📦 0.13.0 10/02/2024
🎉 new local homepage
🎉 started support for other branches

📦 0.12.0 10/02/2024
🎉 miscelaneous cleanup

📦 0.11.0 9/12/2024
🏥 bug fixes

📦 0.10.0 9/6/2024
🏥 upgrade scroll

📦 0.9.0 7/11/2024
🎉 added descriptions to folders (max 7 words)
🎉 nicer `wws list` output
⚠️ moved `snippets` parser from the `root.scroll` file to `wws.scroll` files.

📦 0.8.0 7/10/2024
🎉 added new concept of subfolders

📦 0.7.0 7/10/2024
🎉 added release notes
🎉 updated Scroll
🎉 moved site registry to `root.scroll`

endColumns

footer.scroll

```
```gettingStarted.scroll
title World Wide Scroll Getting Started Guide

header.scroll
printTitle

mediumColumns 1

After you've purchased your Scroll Name, a WWS Rep will reach out to you via the email you provided at checkout to help onboard your work to the WWS.

While you wait for their email, follow this guide to get your site ready for the World Wide Scroll.

# How to Get Your Site Ready for the World Wide Scroll
The World Wide Scroll (WWS) is designed to be a more intelligent, offline, and human-first alternative to the World Wide Web. As you prepare your site for the WWS, keep the following guidelines in mind:

1. *Utilize the Scroll Language*: Scroll is the primary language of the WWS, designed to be simple and expandable for both humans and AIs. While you can use plain HTML, Markdown, or any language that compiles to HTML, using Scroll will streamline many other requirements. Learn more about Scroll at scroll.pub.
 https://scroll.pub scroll.pub

2. *Open Source and Public Domain*: The WWS is designed for a post-copyright world and all content on the WWS is open-source and public domain.

3. *Leverage Git for Site Management*: Unlike the traditional web, the WWS uses Git for site transfers. Your site must be stored in a publicly accessible Git repository. Platforms like GitHub and GitLab offer free hosting for open-source projects. ScrollHub (beta) is another fast option you could use.
 https://github.com GitHub
 https://gitlab.com GitLab
 https://hub.scroll.pub/ ScrollHub

4. *Design for Offline Use*: Your site should function fully offline. Avoid using external JavaScript, images, or assets that require an internet connection. Ensure all necessary files are included in your Git repo. For large files, such as videos, linking to external sites is acceptable, but avoid adding unnecessarily large files directly to your repo.

5. *No Ads or Trackers*: While commercial sites and sponsorships are welcome on the WWS, any form of JavaScript trackers or advertising is prohibited. Ensure your site is free from ads and trackers to maintain the integrity and privacy of the WWS.

If you need _any_ help with these guidelines, share your issue on github.com/breck7/wws/issues or r/WorldWideScroll or Twitter.
 https://www.reddit.com/r/WorldWideScroll/ r/WorldWideScroll
 https://github.com/breck7/wws/issues github.com/breck7/wws/issues
 https://twitter.com/breckyunits Twitter

By adhering to these guidelines, you’ll help create a more intelligent, offline-first, and human-centric internet. Welcome to the World Wide Scroll!

clientInstall.scroll
pageFooter.scroll

```
```commands.scroll
// This defines the minimum commands that a client should have.

// Schema
idParser
 extends abstractIdParser

commandDescriptionParser
 cue description
 extends abstractStringMeasureParser
 description What does this command do?
 float sortIndex 1.3

// Commands

id fetch
description If no params provided, fetch all folders previously fetched. If folder names provided, fetch those folders.

id help
description Print available commands and stats about local copy.

id list
description List all of the available folders and whether they've been fetched or not.

id open
description Open wws/index.html

id start
description Start a local server to serve files over http://scroll/[folderName]
```
```clientInstall.scroll
importOnly

# WWS command line client one-liner install

From npm:
code
 sudo npm install -g @breck/wws

From source:
code
 git clone https://github.com/breck7/wws && cd wws && npm install --omit=dev && sudo npm install --omit=dev -g . && wws

# Fetch sites
code
 wws fetch scroll breck pldb

# Start local server
code
 wws start

# OR just open static files
code
 wws open 

# Uninstalling
code
 sudo npm uninstall -g wws

The WWS client currently requires Node.js. More clients coming soon.
 https://nodejs.org/en Node.js

# Keeping WWS server running

code
 sudo npm install -g pm2
 pm2 start wws start

```
```root.parsers
nameParser
 cue name
 extends abstractIdParser
 description What is the folder name?

descriptionParser
 cue description
 extends abstractStringMeasureParser
 description What is this folder about? Maximum 7 words.
 float sortIndex 1.001

wwsTagsParser
 cue tags
 extends abstractStringMeasureParser
 description What labels apply to this folder?
 float sortIndex 1.002

webParser
 extends abstractUrlMeasureParser
 description What is the URL to this folder on the World Wide Web?
 float sortIndex 1.01

sourceParser
 extends abstractUrlMeasureParser
 description What is the URL to the source code for this folder?
 float sortIndex 1.02

editorParser
 // required
 extends abstractStringMeasureParser
 description What is the real name of the editor of this folder?
 float sortIndex 1.1
 editorEmailParser
  // required
  cue email
  extends abstractStringMeasureParser
  description What is the email address of the editor of this folder?
  float sortIndex 1.11

registeredParser
 extends abstractStringMeasureParser
 description On what day was this folder name first registered?
 float sortIndex 1.3

expiresParser
 extends abstractStringMeasureParser
 description On what day does this registration expire?
 float sortIndex 1.4

repParser
 extends abstractStringMeasureParser
 description Which WWS rep onboarded this folder?
 float sortIndex 1.5

transactionIdParser
 extends abstractStringMeasureParser
 description What is the payment transaction id for this purchase?
 float sortIndex 1.5

```
```root.scroll
buildConcepts root.csv root.json root.tsv
buildMeasures wwsMeasures.tsv

// The World Wide Scroll Root File

root.parsers

name wavewar
description Save earth from invading drones with waves.
tags featured game
web https://wavewar.space
source https://wavewar.space/wavewar.space.git
editor Breck Yunits
 email breck7@gmail.com
registered 11/26/2024
expires 11/26/2034
rep Breck Yunits
transactionId pm_1QPSGHJktJxKl0r521XUJLOx

name togger
description Live TV that connects you to humans.
tags featured social
web https://togger.com
source https://togger.com/togger.com.git
editor Breck Yunits
 email breck7@gmail.com
registered 11/26/2024
expires 11/26/2034
rep Breck Yunits
transactionId pi_3QPS3bJktJxKl0r50euUafo7

name public
description A Public Domain Company
tags companyHomepage featured
web https://publicdomaincompany.com
source https://publicdomaincompany.com/publicdomaincompany.com.git
editor Breck Yunits
 email breck7@gmail.com
registered 10/10/2024
expires 10/10/2034
rep Breck Yunits
transactionId pi_3Q8SqRJktJxKl0r50QNBJBv1

name wifinder
description WiFinder: find great wifi near you
tags maps featured
web https://wifinder.wiki
source https://wifinder.wiki/wifinder.wiki.git
editor Breck Yunits
 email breck7@gmail.com
registered 10/02/2024
expires 10/02/2034
rep Breck Yunits
transactionId pm_1Q5Y9HJktJxKl0r5jeY4nOdh

name news
description BuilderNews: Watch people try web creations
tags forums featured
web https://news.pub
source https://news.pub/news.pub.git
editor Breck Yunits
 email breck7@gmail.com
registered 9/22/2024
expires 9/22/2034
rep Breck Yunits
transactionId pm_1Q1qilJktJxKl0r5ASsCMZ5K

name zombo
description You can do anything.
tags funny
web https://zombo.togger.com
source http://zombo.togger.com/zombo.togger.com.git
editor Breck Yunits
 email breck7@gmail.com
registered 9/14/2024
expires 9/14/2034
rep Breck Yunits
transactionId pm_1Pz4fFJktJxKl0r537cx4sCs

name pldb
description A Programming Language DataBase
tags programming knowledgeBase programmingLanguages featured
web https://pldb.io
source https://pldb.io/pldb.io.git
editor Breck Yunits
 email breck7@gmail.com
registered 6/12/2024
expires 6/12/2034
rep Breck Yunits
transactionId pm_1PQxCOJktJxKl0r5l24p6Zwu

name breck
description Breck's Blog
tags personalHomepage blog featured
web https://breckyunits.com
source https://breckyunits.com/breckyunits.com.git
editor Breck Yunits
 email breck7@gmail.com
registered 6/12/2024
expires 6/12/2034
rep Breck Yunits
transactionId pm_1PQxCOJktJxKl0r5l24p6Zwu

name scroll
description A language for scientists of all ages
tags projectHomepage programming programmingLanguages featured
web https://scroll.pub
source https://github.com/breck7/scroll
editor Breck Yunits
 email breck7@gmail.com
registered 6/12/2024
expires 6/12/2034
rep Breck Yunits
transactionId pm_1PQxCOJktJxKl0r5l24p6Zwu

```
