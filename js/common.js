/*globals igic__, escape, unescape */
/*jshint white:false */

(function($) {

// ##########
var interchange = {
  $containter: null,
   
  // ----------
  start: function(config) {
    var self = this;
    config = config || {};
    config.hide = config.hide || {};
    
    var html = this.getBody(config);
          
    this.$container = $('<div>')
      .css({
        position: 'fixed', 
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 20000, 
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        color: 'black'
      })
      .appendTo('body')
      .hide()
      .fadeIn(200);     

    this.$shield = $('<div>')
      .css({
        position: 'fixed', 
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
        backgroundColor: 'black',
        zIndex: 100
      })
      .click(function() {
        self.stop();
      })
      .appendTo(this.$container);
      
    var ww = $(window).width();
    var wh = $(window).height();
    var left = 100;
    var top = 100;
    var width = 400;
    var height = 300;
    var padding = 10;
    if (((padding + left) * 2) + width > ww) {
      left = 10;
      width = Math.min(width, ww - ((padding + left) * 2));
    }
    
    if (((padding + top) * 2) + height > wh) {
      top = 10;
      height = Math.min(height, wh - ((padding + top) * 2));
    }
    
    this.$display = $(html)
      .css({
        left: left, 
        top: top,
        width: width,
        height: height,
        position: 'fixed', 
        backgroundColor: 'white',
        color: 'black',
        zIndex: 200,
        padding: padding, 
        'text-align': 'left', 
        '-moz-border-radius': '10px',
        '-webkit-border-radius': '10px',
        'border-radius': '10px',
        '-moz-box-shadow': '5px 5px 30px #000',
        '-webkit-box-shadow': '5px 5px 30px #000',
        'box-shadow': '5px 5px 30px #000'
      })
      .appendTo(this.$container);

    html = '<a href="http://iangilman.com/interchange/" target="_blank">INTERCHANGE</a>'
      + ' - <a href="mailto:ian@iangilman.com?subject=interchange problem&body='
        + location.href
        + '" target="_blank">Problem?</a>';
      
    $('<div>')
      .css({
        bottom: 10,
        right: 10,
        position: 'absolute'
      })
      .appendTo(this.$display)
      .append(html);
  },
  
  // ----------
  stop: function() {
    var self = this;
    if(this.$container) {
      this.$container.fadeOut(200, function() {
        self.$container.remove(); 
        self.$container = null;
        // TODO: is there a way to either remove the JavaScript entirely
        // or just reactivate the same JavaScript if the user hits the 
        // bookmarklet again?
      }); 
    }
  },

  // ----------
  getBody: function(config) {
    var artist = config.artist || '';
    var title = config.title || '';
    var isbn = '';
    var site = '';
    var type = config.type || '';
    var re, match;
    
    if (!artist && !title) {
      var parts = location.hostname.split('.');
      if(parts.length < 2)
        site = location.hostname;
      else
        site = parts[parts.length - 2];
        
      if(site == 'amazon') {
        /*jshint regexdash:true */
        re=/[\/-](\d{9,9}[\dX])|isbn=(\d{9,9}[\dX])|asin=(\d{9,9}[\dX])/i;
        if(re.test(location.href) === true) {
          isbn=RegExp.$1;
          if(isbn.length === 0) {
            isbn=RegExp.$2;
          }
          
          if(isbn.length === 0) {
            isbn=RegExp.$3;
          }
        }
        
        // ___ title
        title = $('#btAsinTitle').text();
        if (!title)
          title = $('.dpProductTitle').text();
        
        // ___ artist
        artist = $(".contributorNameTrigger a:first-child").text();
        if (!artist) {
          var $pipe = $(".buying .byLinePipe");
          if ($pipe) {
            artist = $pipe.prev().text();
          }
        }
        
        // ___ type      
        if (isbn || title.search(/kindle/i) != -1)
          type = 'book';
        else
          type = 'music';
      } else if(site == 'goodreads') {
        type = 'book';
        title = $('#bookTitle').text();
        artist = $('.authorName:first').text();
      } else if(site == 'rdio') {
        type = 'music';
        match = location.href.match(/artist\/(.*)\/album\/(.*)\//i);
        if (match) {
          artist = match[1];
          title = match[2];
        } else {
          match = location.href.match(/artist\/(.*)\//i);
          if (match)
            artist = match[1];
        }
        
        artist = unescape(artist).replace(/_/g, " ");
        title = unescape(title).replace(/_/g, " ");
      } else if(site == 'letsfathom') {
        type = 'music';
        match = location.href.match(/artist\/(.*)\//i);
        if (match)
          artist = match[1];
        
        artist = unescape(artist).replace(/_/g, " ");
      } else if(site == 'last') {
        type = 'music';
        re = /music\/(.*)\/(.*)/i;
        if (re.test(location.href)) {
          artist = unescape(RegExp.$1);
          title = unescape(RegExp.$2);
        } else {
          re = /music\/(.*)/i;
          if (re.test(location.href))
            artist = unescape(RegExp.$1);
        }
      } else if (site == "bibliocommons") {
        title = $(".titleBlock > h1").text();
        
        artist = $(".titleBlock > .author > a").text();
        artist = artist.replace(/\(.*\)/, "");
        
        if ($(".titleBlock > .author > .format").text().toLowerCase().indexOf("book") != -1)
          type = "book";
        else 
          type = "music";
      } else if (site == "books4yourkids") {
        var postTitle = $.trim($(".post-title").text())
          .replace(/written by/i, 'by');
        match = postTitle.match(/^(.*?),? by ([^,]*)/);
        if (match) {
          title = match[1];
          artist = match[2].replace(/with.*/i, '');
          type = "book";
        }
      } else if (site == 'indiebound') {
        title = $('#content-left h2').eq(0).text();
        artist = $('.ibc-descrip a').eq(0).text();
        type = 'book';
        if (!title || !artist) {
          title = artist = '';
        }
      } else if (site == 'powells') {
        var $title = $('#content .book-title').eq(0);
        title = $title.text();
        artist = $title.next('a').text();
        type = 'book';
      } else if (site == 'netflix') {
        title = $('.title-wrapper').eq(0).text();
        type = 'movie';
      } else {
        return '<div>Interchange doesn\'t work on this site. '
            + 'To request support for it, use the "Problem?" link below.</div>';
      }
    }
    
    title = title.replace(/a novel/gi, "");
    title = title.replace(/\([^\)]*\)/g, " ");
    title = title.replace(/\[[^\]]*\]/g, " ");
    title = title.replace(/\s+/g, " ");
    var displayArtist = $.trim(artist);
    var displayTitle = $.trim(title);
    isbn = $.trim(utils.stripPunctuation(isbn));
    artist = utils.stripPunctuation(displayArtist);
    title = utils.stripPunctuation(displayTitle);
    title = title.replace(/\s+/g, " ");
    
    if(!artist && !title) {
      return '<div>Interchange can\'t find a product on this page. '
          + 'If you think it should, use the "Problem?" link below.</div>';
    }
    
    var destinations = [{
      name: 'Amazon',
      site: 'amazon',
      url: 'http://www.amazon.com/s/?url=search-alias%3Daps&tag=iangilman-20&field-keywords=',
      hide: config.hide.amazon
    }, {
      name: 'Rdio',
      site: 'rdio',
      url: function() {
        if(artist && title) {
          return 'http://rdio.com/#/artist/' + artist + '/album/' + title;
        } else if(artist) {
          return 'http://rdio.com/#/artist/' + artist;
        }
        return '';
      },
      type: 'music'
    }, {
      name: 'Goodreads',
      site: 'goodreads',
      url: 'http://www.goodreads.com/search/search?search_type=books&search[query]=',
      type: 'book'
    }, {
      name: 'Last.fm',
      site: 'last',
      url: function() {
        if(artist && title) {
          return 'http://www.last.fm/music/' + artist + '/' + title;
        } else if(artist) {
          return 'http://www.last.fm/music/' + artist;
        }
        return '';
      },
      type: 'music'
    }, {
      name: 'IndieBound',
      site: 'indiebound',
      url: 'http://www.indiebound.org/hybrid?filter0=',
      type: 'book'
    }, {
      name: 'Powell\'s',
      site: 'powells',
      url: 'http://www.powells.com/s?kw=',
      type: 'book'
    }, {
      name: 'Seattle Public Library',
      site: 'bibliocommons',
      url: 'http://seattle.bibliocommons.com/search?t=smart&q=' 
    }, {
      name: 'Fathom',
      site: 'letsfathom',
      url: function() {
        if(artist) {
          return 'http://letsfathom.com/#/artist/' + artist + '/';
        }
        return '';
      },
      type: 'music'
    }, {
      name: 'North Olympic Library System',
      site: 'nols',
      url: 'http://pac.nols.org/polaris/search/searchresults.aspx?type=Keyword&term=' 
    }, {
      name: 'San Diego County Library',
      site: 'sdcl',
      url: 'http://encore.co.san-diego.ca.us/iii/encore/search?target=' 
    }];

    var html = 
      '<div>'
        + '<div style="font-size:20px">' + displayTitle + '</div>'
        + '<div style="font-size:16px">' + displayArtist + '</div>'
        + '<br>Find it on:<br>';         
    
    $.each(destinations, function(i, v) {
      var url = '';
      
      if(typeof v.url == 'function') {
        url = v.url();
      } else if(isbn && v.site == 'goodreads') {
        url = v.url + isbn;
      } else if(artist && title) {
        url = v.url + escape(title) + '+' + escape(artist);
      } else if(artist) {
        url = v.url + escape(artist);
      } else if(title) {
        url = v.url + escape(title);
      }
            
      if (url && site != v.site && (!v.type || v.type == type) && !v.hide) {
        html += '<a href="' + url + '" target="_blank">' + v.name + '</a><br>';
      }
    });
    
    html += '</div>';
      
    return html;
  }
};

// ##########
var utils = {
  // ----------
  stripPunctuation: function(s) {
    return s.replace(/[^\w']/g, " ");
  }
};

// ##########
window.igic__ = window.igic__ || {};

// ----------
igic__.start = function(config) {
  interchange.start(config);
};

}($));