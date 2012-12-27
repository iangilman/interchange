# Interchange

Flip easily between media sites. See http://iangilman.com/interchange/

# Development

This is just a chunk from my website, so the PHP files won't work. The bookmarklet should, however, which is the point of sharing this repository.

## Prerequisites

* [CodeKit](http://incident57.com/codekit/) (build system)
* [MAMP](http://mamp.info/) (local server)

Yes, those are both Mac-only... if you need a cross-platform solution, ask me and we can try to set something up.

## Setup

1. In the main CodeKit window, hit the little plus at the bottom and select "Add project", then select the interchange folder.
1. Click on bookmarkl.js in the CodeKit window and hit "Process"; this will create bookmarklet.js. From here on, as long as CodeKit is running, it'll detect changes to the files and automatically process.
1. In MAMP (not MAMP Pro), hit Preferences, then Apache, and select your interchange folder.
1. If everything is working, you should be able to go to http://localhost:8888/js/bookmarklet.js and see a file full of code. This is assuming you have 8888 set up as your port for MAMP.
1. In your browser, add a new bookmark to your bookmark bar, and give it this for the URL: `javascript:var%20b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://localhost:8888/js/bookmarklet.js');void(b.appendChild(z));}else{}`
1. Now go to a product page on, say, Amazon, and hit the bookmarklet in your bookmark bar.

## Architecture

CodeKit automatically combines bookmarkl.js, jquery.js, and common.js into bookmarklet.js. It does the same for widg.js, jquery.js, and common.js, turning them into widget.js.

Most of the interesting stuff is in common.js. At the top, there is a big block of sources (for reading off of websites) and destinations (for linking to websites).

Using CodeKit for the build system is a bit unusual, but it was the easiest thing when I got started. Also, I do like CodeKit, especially its linting feature. The downside (besides it being Mac-only and paid software) is that it's constantly changing its codekit-config.json, which adds a lot of noise to the github repository. One of these days I'll switch over to something else, I suppose. At any rate, some sort of build system is necessary, to minimize the number of files the bookmarklet needs to load.

Any additional questions, contact ian@iangilman.com.

# TODO

## Common

* http://www.worldcat.org/
* Explicit close box
* Watch for window size events and resize/reposition accordingly
* Add google analytics or some such for tracking

## Widget

* Have it be a link to an interchange page with the proper search, so it'll work in RSS feeds. Then override via JavaScript if possible for popup.

## Old

* List sites in site error message
* Array of services
* Try to match Rdio urls better so they don't have to redirect
* When getting names from Rdio, make sure to remove underscores globally (now just getting first one)
* Wikipedia would be another destination
* Actually negotiate with SPL over the proper search while the box is up?
* Foreign characters (such as in bjork's name) don't work
* Support other biblio commons cities
* Get ISBN out of goodreads
* Better error reporting
* Pretty icons for the services
* More services
* Service plugin architecture 
* Better info page
* Define our own link colors
* Better ISBN search for Amazon
* The Amazon mobile site doesn't have isbn, so we think it's music; we need better detection,
    or an "unknown" mode for that situation.
