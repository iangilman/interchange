/*globals escape */
/*jshint white:false */

(function() {

  var $title = null;
  var $artist = null;
  var $code = null;

  function update() {
    setTimeout(function() {
      var title = $title.val();
      var artist = $artist.val();
      var code = '';
      if(artist || title) {
        code = '<!-- START INTERCHANGE - '
          + utils.stripPunctuation(title).toUpperCase()
          + ' --><script>if(!window.igic__){window.igic__={};var d=document;var s=d.createElement("script");s.src="http://iangilman.com/interchange/js/widget.js";d.body.appendChild(s);}</script><div class="igic__" data-title="'
          + escape(title)
          + '" data-artist="'
          + escape(artist)
          + '" style="height: 50px">&nbsp;</div><!-- END INTERCHANGE -->';
      }
            
      $code.text(code);
    }, 1);
  }
  
  $(document).ready(function() {
    $title = $('.title')
      .keypress(update);

    $artist = $('.artist')
      .keypress(update);
      
    $code = $('.code')
      .focus(function(event) {
        setTimeout(function() {
          $(event.target).select();
        }, 1);
      });
    
    update();
    
    setTimeout(function() {
      $title.focus();
    }, 1);
  });
  
  // ##########
  var utils = {
    // ----------
    stripPunctuation: function(s) {
      return s.replace(/[^\w']/g, " ");
    }
  };

})();
      