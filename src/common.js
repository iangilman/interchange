// common.js
// This file gets put together with several others to create bookmarklet.js and widget.js

(function($) {

  // ##########
  var sources = {
    // ----------
    amazon: {
      get: function() {
        var data = {};
        
        /*jshint regexdash:true */
        var re = /[\/-](\d{9,9}[\dX])|isbn=(\d{9,9}[\dX])|asin=(\d{9,9}[\dX])/i;
        if(re.test(location.href) === true) {
          data.isbn=RegExp.$1;
          if(data.isbn.length === 0) {
            data.isbn=RegExp.$2;
          }
          
          if(data.isbn.length === 0) {
            data.isbn=RegExp.$3;
          }
        }
        
        // ___ title
        data.title = $('#productTitle').text();
        
        if (!data.title) {
          data.title = $('#btAsinTitle').text();
        }
        
        if (!data.title) {
          data.title = $('.dpProductTitle').text();
        }

        if (!data.title) {
          var $h1 = $('h1#title').clone();
          $h1.find('span').remove();
          data.title = $h1.text();
        }

        // ___ artist
        data.artist = $(".contributorNameTrigger a:first-child").text();
        if (!data.artist) {
          var $pipe = $(".buying .byLinePipe");
          if ($pipe) {
            data.artist = $pipe.prev().text();
          }
        }

        if (!data.artist) {
          data.artist = $('#byline .author:first-child > span > a').text();
        }

        if (!data.artist) {
          data.artist = $('#byline .author:first-child > a').text();
        }
        
        // ___ type      
        if (data.isbn || data.title.search(/kindle/i) != -1)
          data.type = 'book';
        else
          data.type = 'music';
          
        return data;
      }
    },

    // ----------
    goodreads: {
      get: function() {
        var data = {};
        
        data.type = 'book';
        data.title = $('#bookTitle').text();
        data.artist = $('.authorName:first').text();
          
        return data;
      }
    },

    // ----------
    rdio: {
      get: function() {
        var data = {};
        
        data.type = 'music';
        var match = location.href.match(/artist\/(.*)\/album\/(.*)\//i);
        if (match) {
          data.artist = match[1];
          data.title = match[2];
        } else {
          match = location.href.match(/artist\/(.*)\//i);
          if (match)
            data.artist = match[1];
        }
        
        data.artist = unescape(data.artist || '').replace(/_/g, " ");
        data.title = unescape(data.title || '').replace(/_/g, " ");
          
        return data;
      }
    },

    // ----------
    letsfathom: {
      get: function() {
        var data = {};
        
        data.type = 'music';
        var match = location.href.match(/artist\/(.*)\//i);
        if (match)
          data.artist = match[1];
        
        data.artist = unescape(data.artist || '').replace(/_/g, " ");
          
        return data;
      }
    },

    // ----------
    last: {
      get: function() {
        var data = {};
        
        data.type = 'music';
        var re = /music\/([^\/]*)\/([^\/]*)/i;
        if (re.test(location.pathname)) {
          data.artist = unescape(RegExp.$1);
          data.title = unescape(RegExp.$2);
        } else {
          re = /music\/(.*)/i;
          if (re.test(location.pathname))
            data.artist = unescape(RegExp.$1);
        }

        data.artist = data.artist.replace(/\+/g, ' ');
        data.title = (data.title || '').replace(/\+/g, ' ');
          
        return data;
      }
    },

    // ----------
    bibliocommons: {
      get: function() {
        var data = {};
        
        data.title = $(".titleBlock > h1").text();
        
        data.artist = $(".titleBlock > .author > a").text();
        data.artist = data.artist.replace(/\(.*\)/, "");
        
        if (/(book|graphic novel)/i.test($(".titleBlock > .author > .format").text()))
          data.type = "book";
        else 
          data.type = "music";
          
        return data;
      }
    },

    // ----------
    books4yourkids: {
      get: function() {
        var data = {};
        
        var postTitle = $.trim($(".post-title").text())
          .replace(/written by/i, 'by')
          .replace(/written and illustrated by/i, 'by');
          
        var match = postTitle.match(/^(.*?),? by ([^,]*)/);
        if (match) {
          data.title = match[1];
          data.artist = match[2].replace(/with.*/i, '');
          data.type = "book";
        }
          
        return data;
      }
    },

    // ----------
    indiebound: {
      get: function() {
        var data = {};
        
        data.title = $('#content-left h2').eq(0).text();
        data.artist = $('.ibc-descrip a').eq(0).text();
        data.type = 'book';
        if (!data.title || !data.artist) {
          data.title = data.artist = '';
        }
          
        return data;
      }
    },

    // ----------
    powells: {
      get: function() {
        var data = {};
        
        var $title = $('#content .book-title').eq(0);
        data.title = $title.text();
        data.artist = $title.next('a').text();
        data.type = 'book';
          
        return data;
      }
    },

    // ----------
    netflix: {
      get: function() {
        var data = {};
        
        data.title = $('.title-wrapper').eq(0).text();
        data.type = 'movie';
          
        return data;
      }
    },

    // ----------
    imdb: {
      get: function() {
        var data = {};

        data.title = document.title.replace(/ \(.*$/, '');
        data.type = 'movie';

        return data;
      }
    },

    // ----------
    letterboxd: {
      get: function() {
        var data = {};

        data.title = $('#featured-film-header h1').eq(0).text();
        data.type = 'movie';

        return data;
      }
    }
  };

  // ##########
  var destinations = [{
    name: 'Amazon',
    site: 'amazon',
    url: 'http://www.amazon.com/s/?url=search-alias%3Daps&tag=iangilman-20&field-keywords=',
    hide: function(config) {
      return config.hide.amazon;
    }
  }, {
    name: 'IMDb',
    site: 'imdb',
    url: 'http://www.imdb.com/find?s=tt&q=',
    type: 'movie'
  }, {
    name: 'Netflix',
    site: 'netflix',
    url: 'http://dvd.netflix.com/Search?v1=',
    type: 'movie'
  }, {
    name: 'Letterboxd',
    site: 'letterboxd',
    url: function(artist, title) {
      return 'http://letterboxd.com/film/' + title.toLowerCase().replace(/ /g, '-') + '/';
    },
    type: 'movie'
  }, {
    name: 'YouTube Trailers',
    site: 'youtube',
    url: function(artist, title) {
      return 'https://www.youtube.com/results?search_query=' + title + '+trailer';
    },
    type: 'movie'
  }, {
    name: 'Goodreads',
    site: 'goodreads',
    url: 'http://www.goodreads.com/search/search?search_type=books&search[query]=',
    type: 'book'
  }, {
    name: 'Last.fm',
    site: 'last',
    url: function(artist, title) {
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
    name: 'King County Library System',
    site: 'bibliocommons',
    url: 'http://kcls.bibliocommons.com/search?t=smart&q=' 
  }, {
    name: 'Fathom',
    site: 'letsfathom',
    url: function(artist, title) {
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
  
      html = '<a style="color:#666" href="http://iangilman.com/interchange/" target="_blank">INTERCHANGE</a>'
        + ' - <a style="color:#666" href="mailto:ian@iangilman.com?subject=interchange problem&body='
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
      var site = '';
      var artist = config.artist || '';
      var title = config.title || '';
      var isbn = '';
      var type = config.type || '';
      
      if (!artist && !title) {
        var data;
        var parts = location.hostname.split('.');
        for (var a = 0; a < parts.length; a++) {
          site = parts[a];
          if (site && sources[site]) {
            data = sources[site].get();
            artist = data.artist || '';
            title = data.title || '';
            isbn = data.isbn || '';
            type = data.type || '';
            break;
          }
        }

        if (!data) {
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
      
      var html = 
        '<div>'
          + '<div style="font-size:20px">' + displayTitle + '</div>'
          + '<div style="font-size:16px">' + displayArtist + '</div>'
          + '<br>Find it on:<br>';         
      
      $.each(destinations, function(i, v) {
        if (v.hide && v.hide(config)) {
          return;
        }
        
        var url = '';
        if(typeof v.url == 'function') {
          url = v.url(artist, title);
        } else if(isbn && v.site == 'goodreads') {
          url = v.url + isbn;
        } else if(artist && title) {
          url = v.url + escape(title) + '+' + escape(artist);
        } else if(artist) {
          url = v.url + escape(artist);
        } else if(title) {
          url = v.url + escape(title);
        }
              
        if (url && site != v.site && (!v.type || v.type == type)) {
          html += '<a style="color:#666" href="' + url + '" target="_blank">' + v.name + '</a><br>';
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
