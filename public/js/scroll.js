'use strict';

define(['jquery', 'slimScroll', 'fullPage', 'section'], function($, slimScroll, fullPage, section) {

  /**
   * scroll
   * @param {options} {
   *    section_selector: '.section',  // selector for section dom element
   *    fullpage_selector: '#fullpage' // selector for fullpage dom element
   *  }
   * Create object to handle fullpage.js events ( section leave, load, etc )
   * as well as orchestrate section on demand loading / cleanup.
   */
  var scroll = function(options) {
    var self = this;
    self.options = options || {};
    self.sections = [];
    self.section_selector = self.options.section_selector;
    self.fullpage_selector = self.options.fullpage_selector;

    /**
     * initialize
     * @return {self}
     * Initialize all sections, fullpage.js and bind to events
     */
    self.initialize = function() {

      // IE8 / IE9 complain about jquery not being loaded
      $(document).ready(function() {

        var section_names = [];
        // Initialize all sections
        $(self.section_selector).each(function(index, element) {

          var fullpage_section = section.initialize({
            index: index + 1,
            gif: $(element).data('gif')
          });

          self.sections.push( fullpage_section );
          section_names.push($(element).data('name'));
        });

        // Initialize fullpage
        $(self.fullpage_selector).fullpage({
          onLeave: self.onLeave,
          afterLoad: self.afterLoad,
          verticalCentered: false,
          navigation: true,
          paddingTop: '4.635em',
          scrollOverflow: true, 
          showActiveTooltip: true,
          navigationTooltips: section_names,
        });

        // Load the first section
        self.sections[0].setup();
      });

      return self;
    };

    /**
     * onLeave
     * @param {index} - index of current section
     * @param {nextIndex} - index of next section
     * @param {direction}
     * Fullpage.js onLeave event triggered when a section is about to be left
     * initialize next section and cleanup previous section.
     */
    self.onLeave = function(index, nextIndex, direction) {

      var previous_section = self.getSection(index);
      var current_section = self.getSection(nextIndex);

      previous_section.teardown();
      current_section.setup();
    };

    /**
     * afterLoad
     * @param {anchorLink}
     * @param {index} - index of current section loaded
     * Fullpage.js afterLoad event - triggered when a section is loaded and
     * animation has finished.
     */
    self.afterLoad = function(anchorLink, index) {

      var current_section = self.getSection(index);
      current_section.loaded();
    };

    /**
     * getSection
     * @param {index} - section index ( will be adjusted to 0 indexed array )
     * Find given section in self.sections array - update offset to account
     * for 0 indexed array.
     */
    self.getSection = function(index) {

      var adjusted_index = index - 1;
      if( self.sections.length >= adjusted_index ) {
        return self.sections[adjusted_index];
      }
    };
  };

  // return public api for object
  return {
    initialize: function(options) {
      return new scroll(options).initialize();
    }
  };
});
