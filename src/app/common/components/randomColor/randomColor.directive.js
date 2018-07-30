/**
 * @author Pardeep.Pandit
 * created on 17.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('randomColor', randomColor);
    /** @ngInject */
    function randomColor($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService,
        editFormService, focus, $filter, DJWebStore, $stateParams) {
            return {
                restrict: 'EA',
                replace: false,
                link: function (scope, element, attr) {
        
                    //generate random color
                    var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); 
                    
                    //Add random background class to selected element
                    element.css('background-color', color);
        
                }
            }
    }

})();