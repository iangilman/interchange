# Interchange:

Flip easily between media sites. See http://iangilman.com/interchange/

# Development

This is just a chunk from my website, so the PHP files won't work. The bookmarklet should, however, which is the point of sharing this repository. You'll need to use [CodeKit](http://incident57.com/codekit/), however, to build; see me for info on getting that set up. 

# TODO: 

## Common

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
