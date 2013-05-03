# Interchange

Flip easily between media sites. See http://iangilman.com/interchange/

# Development

## Prerequisites

* [Node](http://nodejs.org/) (for build system)

## Setup

1. Install the prerequisites.
1. Download this repository.
1. In your Terminal, `cd` into the repository directory.
1. Run `npm install` to load Grunt, the build system.
1. Run `grunt` once to make the bookmarklet.
1. Run `grunt server watch` for as long as you're developing; it'll automatically make the bookmarklet whenever you make changes, and it'll serve the files at http://localhost:8000/ for you.
1. If everything is working, you should be able to go to http://localhost:8000/js/bookmarklet.js and see a file full of code.
1. In your browser, add a new bookmark to your bookmark bar, and give it this for the URL: 
  * javascript:var%20b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://localhost:8000/js/bookmarklet.js');void(b.appendChild(z));}else{}
1. Now go to a product page on, say, Amazon, and hit the bookmarklet in your bookmark bar.

## Architecture

Grunt automatically combines bookmarklet-base.js, jquery.js, and common.js into bookmarklet.js. It does the same for widget-base.js, jquery.js, and common.js, turning them into widget.js. In general you should only modify files in the `src` folder; the `js` folder is just for the built files.

Most of the interesting stuff is in common.js. At the top, there is a big block of sources (for reading off of websites) and destinations (for linking to websites).

Any additional questions, contact ian@iangilman.com.

# TODO

## Common

* http://www.worldcat.org/
* Explicit close box
* Watch for window size events and resize/reposition accordingly
* Add google analytics or some such for tracking
* Support Vdio for both in and out

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
