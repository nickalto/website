'use strict';

require.config({
  'baseUrl': '',
  'paths': {
    // Third party libraries
    'jquery'      : '/components/jquery/dist/jquery.min',
    'slimScroll'  : '/components/jquery-slimscroll/jquery.slimscroll.min',
    'fullPage'    : '/components/fullpage.js/jquery.fullPage.min',

    // Application
    'application' : '/js/application',

    // Fullpage.js scroll / section logic
    'scroll'      : '/js/scroll',
    'section'     : '/js/section',

  },
  'shim': {}
});

require(['application']);
