/**
 * @author pardeep.pandit
 * created on 22.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('fieldBox', fieldBox);
    /** @ngInject */
    function fieldBox($location, $state, $compile, $rootScope) {
        return {
            restrict: 'E',
            require: "^ngModel",
            templateUrl: 'app/common/components/fieldBox/fieldBox.html',
            scope: {
                col: '=ngModel'
            },
            link: function (scope, elm, attrs, parent) {

                scope.$watch('col', function (deepak) {
                    if (deepak !== undefined) {
                        console.log(deepak)
                    }
                })
                scope.test=function(column)
                {                 
                    scope.testing=column;
                    console.log(column)
                }

            }
        };
    }

})();