'use strict';

require(['jquery', 'scroll'], function( $, scroll ) {

  var application = {

    initialize: function() {

      scroll.initialize({
        section_selector: '.section',
        fullpage_selector: '#fullpage'
      });

      this.bindings();

    },

    bindings: function() {
      $(window).resize(this.onResize);
    },

    onResize: function() {}
  };

  $(document).ready( application.initialize() );

});
