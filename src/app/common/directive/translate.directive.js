angular.module('BlurAdmin.common')
    .directive('dotranslate', function ($filter, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $elem, $attrs) {

                angular.forEach($elem, function (element) {
                    var oldText = element.innerText;
                    var translated = $filter('translate')(oldText)
                    element.innerText = translated;
                });

            }
        };
    });