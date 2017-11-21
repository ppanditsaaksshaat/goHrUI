(function () {
    'use strict';
    angular.module('BlurAdmin.common')
        .directive('dateInput', dateInput);

    dateInput.$inject = ["$filter", "$parse"];
    function dateInput($filter, $parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            transclude: true,
            template: '<input ng-transclude ui-mask="19/39/2999" ui-mask-raw="false" ng-keypress="limitToValidDate($event)" placeholder="DD/MM/YYYY"/>',
            link: function (scope, element, attrs, controller) {
                console.log('dateinput')
                scope.limitToValidDate = limitToValidDate;
                var dateFilter = $filter("date");
                console.log(dateFilter)
                var today = new Date();
                var date = {};

                function isValidMonth(month) {
                    return month >= 0 && month < 12;
                }

                function isValidDay(day) {
                    return day > 0 && day < 32;
                }

                function isValidYear(year) {
                    return year > (today.getFullYear() - 115) && year < (today.getFullYear() + 115);
                }

                function isValidDate(inputDate) {
                    inputDate = new Date(formatDate(inputDate));
                    if (!angular.isDate(inputDate)) {
                        return false;
                    }
                    date.month = inputDate.getMonth();
                    date.day = inputDate.getDate();
                    date.year = inputDate.getFullYear();
                    return (isValidMonth(date.month) && isValidDay(date.day) && isValidYear(date.year));
                }

                function formatDate(newDate) {
                    var modelDate = $parse(attrs.ngModel);
                    newDate = dateFilter(newDate, "dd/MM/yyyy");
                    modelDate.assign(scope, newDate);
                    return newDate;
                }

                controller.$validators.date = function (modelValue) {
                    return angular.isDefined(modelValue) && isValidDate(modelValue);
                };

                var pattern = "^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19|20)\\d\\d$" +
                    "|^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19|20)\\d$" +
                    "|^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(19|20)$" +
                    "|^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[12]$" +
                    "|^(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$" +
                    "|^(0[1-9]|1[012])([0-3])$" +
                    "|^(0[1-9]|1[012])$" +
                    "|^[01]$";
                var regexp = new RegExp(pattern);

                function limitToValidDate(event) {
                    var key = event.charCode ? event.charCode : event.keyCode;
                    
                    if ((key >= 48 && key <= 57) || key === 9 || key === 46) {
                        var character = String.fromCharCode(event.which);
                        var start = element[0].selectionStart;
                        var end = element[0].selectionEnd;
                        var testValue = (element.val().slice(0, start) + character + element.val().slice(end)).replace(/\s|\//g, "");
                        console.log(key, testValue)
                        if (!(regexp.test(testValue))) {
                            event.preventDefault();
                        }
                    }
                }
            }
        }
    }

})();