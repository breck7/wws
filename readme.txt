The World Wide Scroll Readme
============================

A healthy, intelligent, trustworthy successor to the web that works offline.
============================================================================

~simoji
~wavewar
~togger
~public
~wifinder
~news
~zombo
~pldb
~breck
~scroll

Why build this?
===============
To provide every human with their own copy of humanity's most intelligent information.

What is the World Wide Scroll (WWS)?
====================================
View slideshow
 https://breckyunits.com/theScroll.html View slideshow

The WWS is like the World Wide Web, except:
- *Offline.* You download entire sites and browse completely offline locally, rather than fetching one page at a time.
- *Non-toxic.* No ads, no paywalls, no trackers, no cookies, no copyright. The WWS and all content on it is public domain.
- *Intelligent.* Built not on HTML, but from the ground up in a simple, expandable language, designed for both humans and AIs.
 https://scroll.pub simple, expandable language
- *Trustworthy.* Source code and change history behind every page. Human verified editors.

WWS command line client one-liner install
=========================================

From npm:
```
sudo npm install -g @breck/wws
```

From source:
```
git clone https://github.com/breck7/wws && cd wws && npm install --omit=dev && sudo npm install --omit=dev -g . && wws
```

Fetch sites
===========
```
wws fetch scroll breck pldb
```

Start local server
==================
```
wws start
```

OR just open static files
=========================
```
wws open 
```

Uninstalling
============
```
sudo npm uninstall -g wws
```

The WWS client currently requires Node.js. More clients coming soon.
 https://nodejs.org/en Node.js

Keeping WWS server running
==========================

```
sudo npm install -g pm2
pm2 start wws start
```

Register root names today!
==========================
The World Wide Scroll beta is live!

Scroll Alliance members can now register root names on The Scroll!
 https://alliance.scroll.pub/ Scroll Alliance members

When you register a root name, you get to name and edit a root "folder" in the World Wide Scroll.

A root folder is just a few lines of data about your folder and where the files reside, that is written to the root.scroll file.
 https://wws.scroll.pub/root.scroll root.scroll

When you are ready to register your root name(s), check out the Getting Started Guide.
 https://wws.scroll.pub/gettingStarted.html Getting Started Guide

Values
======
Craftsmanship, truth, courage, laughter, intelligence, science and love.

These are the words that guide The Scroll.

⁂

Release notes
 https://wws.scroll.pub/releaseNotes.html Release notes

Download
========
Download the list of root folders in the World Wide Scroll as: CSV | TSV | JSON
 https://wws.scroll.pub/root.csv CSV
 https://wws.scroll.pub/root.tsv TSV
 https://wws.scroll.pub/root.json JSON

Folders
=======
name,description,links
simoji,Write simulations using emojis.,"web source"
wavewar,Save earth from invading drones with waves.,"web source"
togger,Live TV that connects you to humans.,"web source"
public,A Public Domain Company,"web source"
wifinder,WiFinder: find great wifi near you,"web source"
news,BuilderNews: Watch people try web creations,"web source"
zombo,You can do anything.,"web source"
pldb,A Programming Language DataBase,"web source"
breck,Breck's Blog,"web source"
scroll,A language for scientists of all ages,"web source"

Built with Scroll v158.0.4
