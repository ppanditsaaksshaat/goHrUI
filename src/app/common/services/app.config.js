angular.module('BlurAdmin.common').config(function (ScrollBarsProvider) {
    // the following settings are defined for all scrollbars unless the 
    // scrollbar has local scope configuration 
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
        advanced: {
            updateOnContentResize: true
        },
        scrollInertia: 0, // adjust however you want 
        setHeight: 500,
        axis: 'y', // enable 2 axis scrollbars by default, 
        theme: '3d-dark',
        autoHideScrollbar: true
    };
});


angular.module('BlurAdmin.common').config(['$provide', function($provide) { 	
      $provide.decorator('uiGridViewportDirective', ['$delegate','uiGridConstants', function($delegate, uiGridConstants) {
        var directive = $delegate[0];
        var origLinkFn = $delegate[0].link;
        var newLinkFn = function($scope, $element, $attrs, controllers) {
          var grid = controllers[0].grid;
          if (typeof $element.scrollbar === 'function') {
            $element.addClass('scrollbar-macosx');
            $element.scrollbar();
            grid.options.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
            grid.options.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
            if (grid.hasRightContainer()) {
              var middleContainer = angular.element(grid.element).find('.ui-grid-render-container-body');
              middleContainer.addClass('ui-grid-render-container-middle');
            }
          }
        };
        directive.compile = function() {
          return function($scope, $element, $attrs) {
            origLinkFn.apply(this, arguments);
            newLinkFn.apply(this, arguments);
          };
        };
        return $delegate;
      }]);
  	}]);