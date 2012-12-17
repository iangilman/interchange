/*globals */

(function($) {

  // ##########
  var widget = {
    // ----------
    init: function() {
      var site = '';
      var parts = location.hostname.split('.');
      if(parts.length < 2) {
        site = location.hostname;
      } else {
        site = parts[parts.length - 2];
      }
      
      $('.igic__').each(function(i, v) {
        var $v = $(v)
          .css({
            'text-align': 'center',
            'min-height': 50,
            height: 'auto'
          });
          
        var title = unescape($v.data('title'));
        var artist = unescape($v.data('artist'));
        
        var $button = $('<span>')
          .text('Get "' + title + '"')
          .css({
            display: 'inline-block',
            cursor: 'pointer',
            padding: 10,
            border: '1px solid #dcdbff',
            'font-family': 'Sans-serif',
            'font-weight': 'bold',
            'text-shadow': '0px 1px 1px rgba(0, 0, 0, 0.5)' /* Firefox 3.5+, Opera 9+, Safari 1+, Chrome, IE10 */
          })
          .click(function() {
            igic__.start({
              title: title,
              artist: artist,
              type: 'book',
              hide: {
                amazon: site == 'books4yourkids' || site == 'blogspot'                
              }
            });
          });
          
        $v.html($button);
      });    
    }
  };
  
  // ##########
  
  $('<link>')
    .attr('rel', 'stylesheet')
    .attr('type', 'text/css')
    .appendTo('head')
    .attr('href', 'http://iangilman.com/interchange/style/widget.css'); // IE8 wants this after the append
  
  $(document).ready(function() {
    widget.init();
  });

}($.noConflict(true)));