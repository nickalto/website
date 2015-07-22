'use strict';

define(['jquery'], function($) {

  /**
   * section
   * @param {options} {
   *    index: 1,               // index associated with data-index attr on $('.section')
   *    gif: '/img/explore.gif' // path to gif for section
   *  }
   * Create object to handle section lifecycle events ( setup, load, teardown ) as well
   * as on demand loading of gifs, etc.
   */
  var section = function(options) {
    var self = this;
    self.options = options || {};
    self.index = self.options.index;
    self.gif = self.options.gif;

    /**
     * initialize
     * Initialize object properties and any other initialization that needs
     * to take place.
     */
    self.initialize = function() {
      self.$element = $('[data-index=' + self.index + ']');
      self.$gif_container = self.$element.find('.gif-container');
      self.$section_down_anchors = self.$element.find('.move-section-down');
      self.$section_up_anchors = self.$element.find('.move-section-up');
      self.statisticsUrl = $('[data-statistics-url]').data('statistics-url');

      self.$section_down_anchors.on('click', function(e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
      });

      self.$section_up_anchors.on('click', function(e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
      });

      return self;
    };

    /**
     * setup
     * Once fullpage.js section is about to animate into view setup anything
     * we need to in order for that section to be displayed.
     */
    self.setup = function() {
      self.createGIF();
      if( self.statisticsUrl ) {
        self.loadStatistics();
      }
    };

    /**
     * loaded
     * Once fullpage.js section is fully animated and loaded execute
     * any logic we need to.
     */
    self.loaded = function() {};

    /**
     * teardown
     * Once fullpage.js section is scrolled off screen we can tear down
     * or release any content that isn't needed anymore.
     */
    self.teardown = function() {
      self.destroyGIF();
    };

    /**
     * createGIF
     * Adds gif img to container - allows for control over start / stop of gifs
     */
    self.createGIF = function() {

      if( self.$gif_container && self.gif ) {

        self.$gif_container.append('<img src=' + self.gif + '?' + new Date().getTime() + '></img>');
      }
    };

    /**
     * destroyGIF
     * Removes background-image gif img from container - sets
     * timeout to remove after fullpage.js transition
     */
    self.destroyGIF = function() {

      if( self.$gif_container && self.gif ) {

          self.$gif_container.find('img').animate({
            opacity: 0,
          }, 300, function() {
            self.$gif_container.empty();
          });
      }
    };

    self.loadStatistics = function () {
      $.getJSON(self.statisticsUrl, function(data) {
        console.log('data: ', data);
      });
    };
  };

  // return public api for object
  return {
    initialize: function(options) {
      return new section(options).initialize();
    }
  };
});
