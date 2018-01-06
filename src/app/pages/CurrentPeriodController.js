//import { error } from "util";

/**
 * @author deepak.jain
 * created on 04.01.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .controller('currentPeriodController', currentPeriodController);
    function currentPeriodController($scope, $rootScope, pageService, DJWebStore, authService) {

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(moment().year(), moment().month(), moment().date());

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $rootScope.currentPeriod = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            minMode: 'month'
        };

        $scope.formats = ['MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        $scope.setDate(moment().year(), moment().month(), moment().date())

        $scope.$watch('currentPeriod', function (selected) {

            // console.log('endOf', moment(selected).endOf('month'));

            if (moment(selected).diff(moment(), 'days') > 0) {
                $scope.setDate(moment().year(), moment().month(), moment().date())
                alert('Period Can Not Greater than current date.')
            }
            // else{
            //     $rootScope.currentPeriod = selected;
            // }
        })

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

    }

})();


angular.module("template/alert/alert.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/alert/alert.html",
        "      <div class='alert' ng-class='type && \"alert-\" + type'>\n" +
        "          <button ng-show='closeable' type='button' class='close' ng-click='close()'>Close</button>\n" +
        "          <div ng-transclude></div>\n" +
        "      </div>");
}]);