/**
 * @author deepak.jain
 * created on 15.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('filterBox', filterBox);
    /** @ngInject */
    function filterBox($location, $state, $timeout, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/filterBox/filterBox.html',
            require: "^ngController",
            scope: {
                page: '='
            },
            controller: function ($scope) {

            },
            link: function ($scope, elm, attrs, parent) {
                $scope.applyBoxFilter = _applyBoxFilter;
                $scope.openSearchFilter = _openSearchFilter;
                $scope.clearFilter = _clearFilter;
                $scope.filterOperatorChange = _filterOperatorChange;
                $scope.dateModeChanged = _dateModeChanged;
                $scope.firstDateChange = _firstDateChange;

                var resourse = {
                    equals: 'equals',
                    doesnotequal: 'does not equal',
                    like: 'contains',
                    notlike: 'does not contain',
                    starts: 'begins with',
                    notstarts: 'does not begin with',
                    ends: 'ends with',
                    notends: 'does not end with',
                    empty: 'is empty',
                    notempty: 'is not empty',
                    greater: 'is greater than',
                    greaterequal: 'is greater than or equal to',
                    less: 'is less than',
                    lessequal: 'is less than or equal to',
                    in: 'in',
                    notin: 'not in',
                    between: 'within range',
                    currenttime: 'current time',
                    currentdate: 'current date',
                    currentweek: 'current week',
                    currentmonth: 'current month',
                    currentyear: 'current year'
                }
                /**
                 * setup date calender options
                 */
                $scope.dateCal = {};
                $scope.dateCal.options = {
                    formatYear: 'yyyy',
                    startingDay: 1,
                    minMode: 'day'
                };

                /**
                 * setup time options
                 */
                $scope.timeCal = {};
                $scope.timeCal.min = null;
                $scope.timeCal.max = null;
                $scope.timeCal.hourStep = 1;
                $scope.timeCal.minStep = 10;
                $scope.timeCal.showMeridian = true;


                $scope.dateCal.dayFormat = 'dd-MMM-yyyy';
                $scope.dateCal.monthFormat = 'MMM-yyyy';
                $scope.dateCal.yearFormat = 'yyyy';

                $scope.filterOpt = {}
                $scope.filterOpt.textbox = [];
                $scope.filterOpt.textbox.push({ value: '=', name: resourse.equals });
                $scope.filterOpt.textbox.push({ value: '!=', name: resourse.doesnotequal });
                $scope.filterOpt.textbox.push({ value: 'like', name: resourse.like });
                $scope.filterOpt.textbox.push({ value: 'notlike', name: resourse.notlike });
                $scope.filterOpt.textbox.push({ value: 'start', name: resourse.starts });
                $scope.filterOpt.textbox.push({ value: 'notstart', name: resourse.notstarts });
                $scope.filterOpt.textbox.push({ value: 'end', name: resourse.ends });
                $scope.filterOpt.textbox.push({ value: 'end', name: resourse.notends });
                $scope.filterOpt.textbox.push({ value: 'isempty', name: resourse.empty });
                $scope.filterOpt.textbox.push({ value: 'isnotempty', name: resourse.notempty });

                $scope.filterOpt.select = [];
                $scope.filterOpt.select.push({ value: '=', name: resourse.equals, type: 'single' });
                $scope.filterOpt.select.push({ value: '!=', name: resourse.doesnotequal, type: 'single' });
                $scope.filterOpt.select.push({ value: 'isempty', name: resourse.empty, type: 'single' });
                $scope.filterOpt.select.push({ value: 'isnotempty', name: resourse.notempty, type: 'single' });
                $scope.filterOpt.select.push({ value: 'in', name: resourse.in, type: 'multiple' });
                $scope.filterOpt.select.push({ value: 'notin', name: resourse.notin, type: 'multiple' });

                $scope.filterOpt.date = [];
                $scope.filterOpt.date.push({ value: 'current', name: resourse.currentdate, type: 'day' });
                // $scope.filterOpt.date.push({ value: '=', name: resourse.currentweek, type: 'day' });
                $scope.filterOpt.date.push({ value: 'current', name: resourse.currentmonth, type: 'month' });
                $scope.filterOpt.date.push({ value: 'current', name: resourse.currentyear, type: 'year' });
                $scope.filterOpt.date.push({ value: '=', name: resourse.equals, type: 'all' });
                $scope.filterOpt.date.push({ value: '!=', name: resourse.doesnotequal, type: 'all' });
                $scope.filterOpt.date.push({ value: '>', name: resourse.greater, type: 'all' });
                $scope.filterOpt.date.push({ value: '=>', name: resourse.greaterequal, type: 'all' });
                $scope.filterOpt.date.push({ value: '<', name: resourse.less, type: 'all' });
                $scope.filterOpt.date.push({ value: '<=', name: resourse.lessequal, type: 'all' });
                $scope.filterOpt.date.push({ value: 'between', name: resourse.between, type: 'all' });

                $scope.filterOpt.time = [];
                $scope.filterOpt.time.push({ value: 'current', name: resourse.currenttime, type: 'all' });
                $scope.filterOpt.time.push({ value: '=', name: resourse.equals, type: 'all' });
                $scope.filterOpt.time.push({ value: '!=', name: resourse.doesnotequal, type: 'all' });
                $scope.filterOpt.time.push({ value: '>', name: resourse.greater, type: 'all' });
                $scope.filterOpt.time.push({ value: '=>', name: resourse.greaterequal, type: 'all' });
                $scope.filterOpt.time.push({ value: '<', name: resourse.less, type: 'all' });
                $scope.filterOpt.time.push({ value: '<=', name: resourse.lessequal, type: 'all' });
                $scope.filterOpt.time.push({ value: 'between', name: resourse.between, type: 'all' });

                function _openSearchFilter() {
                    $scope.showSearchFilter = true;
                }

                /**
                 * convert filter option for searchList and call parent function for refresh data
                 */
                function _applyBoxFilter() {
                    $scope.page.searchList = [];
                    if ($scope.page.pageinfo.filters) {
                        angular.forEach($scope.page.pageinfo.filters, function (filter) {
                            if (filter.showFilter) {
                                var search = {};
                                search.field = filter.name;
                                search.operand = filter.operator;
                                search.value = filter.value;
                                if (filter.controlType == "datepicker") {
                                    if (filter.operator == "between") {
                                        search.value = moment(filter.value).format('YYYY-MM-DD')
                                        search.operand = '>=';
                                        search.dateMode = filter.datePicker.option1.minMode;
                                        $scope.page.searchList.push(search)

                                        search = {};
                                        search.field = filter.name;
                                        search.operand = '<=';
                                        search.value = moment(filter.value2).format('YYYY-MM-DD')
                                        search.dateMode = filter.datePicker.option1.minMode;
                                        $scope.page.searchList.push(search)
                                    }
                                    else {
                                        if (filter.operator == 'current')
                                            search.operand = '=';
                                        else
                                            search.operand = filter.operator;
                                        search.value = moment(filter.value).format('YYYY-MM-DD')
                                        search.operand = filter.operator;
                                        search.dateMode = filter.datePicker.option1.minMode;
                                        $scope.page.searchList.push(search)
                                    }
                                }
                                else if (filter.controlType == "timepicker") {
                                    if (filter.operator == "between") {
                                        search.value = moment(filter.value).format('HH:mm:ss')
                                        search.operand = '>=';
                                        $scope.page.searchList.push(search)

                                        search = {};
                                        search.field = filter.name;
                                        search.operand = '<=';
                                        search.value = moment(filter.value2).format('HH:mm:ss')
                                        $scope.page.searchList.push(search)
                                    }
                                    else {
                                        if (filter.operator == 'current')
                                            search.operand = '=';
                                        else
                                            search.operand = filter.operator;
                                        search.value = moment(filter.value).format('YYYY-MM-DD')
                                        search.operand = filter.operator;
                                        $scope.page.searchList.push(search)
                                    }
                                }
                            }
                        })
                    }
                    console.log($scope.page)
                    $rootScope.$broadcast('apply-filter', $scope.page.searchList);
                    //parent.applyFilter($scope.page.pageinfo.filters);
                }
                function _clearFilter() {
                    $scope.filterData = undefined;
                    angular.forEach($scope.page.pageinfo.filters, function (filter) {
                        filter.showFilter = false;
                        filter.value = undefined;
                        filter.operator = '=';
                    })
                }

                function _filterOperatorChange(filter) {
                    if (filter.operator == '=')
                        filter.value = moment();
                    else if (filter.operator == 'between') {

                    }
                }
                function _dateModeChanged(filter) {

                    filter.value2 = undefined;

                    filter.datePicker.option2.minMode = filter.datePicker.option1.minMode;

                    if (filter.datePicker.option1.minMode == 'day') {
                        filter.datePicker.format = $scope.dateCal.dayFormat
                    }
                    else if (filter.datePicker.option1.minMode == 'month') {
                        filter.datePicker.format = $scope.dateCal.monthFormat
                    }
                    else if (filter.datePicker.option1.minMode == 'year') {
                        filter.datePicker.format = $scope.dateCal.yearFormat
                    }
                    filter.operator = 'current';
                    filter.value = moment()
                    filter.datePicker.option2.minDate = filter.value;
                }
                function _firstDateChange(filter) {
                    console.log(filter)
                    if (filter.value) {
                        filter.datePicker.option2.minDate = filter.value;
                        filter.value2 = filter.value;
                    }
                }
                $scope.operatorFilter = function (itemFilter) {
                    return function (item) {
                        if (item.type) {
                            var minMode = 'day';
                            if (itemFilter.datePicker)
                                if (itemFilter.datePicker.option1 && itemFilter.datePicker.option1.minMode)
                                    minMode = itemFilter.datePicker.option1.minMode;

                            if (item.type == minMode || item.type == 'all') {
                                return true;
                            }
                        }
                        else {
                            return true;
                        }
                        return false;
                    }
                };


                var pageInfoListner = $scope.$watch(function () {
                    return $scope.page.pageinfo
                }, function (newVal) {
                    if (newVal) {
                        if (newVal.filters) {
                            /**
                             * assigning dateOption to filters
                             */
                            angular.forEach($scope.page.pageinfo.filters, function (filter, indx) {

                                if (filter.type == 'datetime') {
                                    filter.datePicker = { option1: {}, option2: {}, format: '' }

                                    filter.datePicker.option1 = angular.copy($scope.dateCal.options)
                                    filter.datePicker.option2 = angular.copy($scope.dateCal.options)
                                    filter.datePicker.format = angular.copy($scope.dateCal.dayFormat)
                                }
                                else if (filter.type == 'datetime') {
                                    filter.timePicker = {};
                                    filter.timePicker.option1 = angular.copy($scope.timeCal)
                                    filter.timePicker.option2 = angular.copy($scope.timeCal)
                                    filter.value = moment();
                                    filter.value2 = moment();
                                }

                            })
                            pageInfoListner();
                        }
                    }
                })


            }
        };
    }

})();