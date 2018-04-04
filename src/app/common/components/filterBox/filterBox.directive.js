/**
 * @author deepak.jain
 * created on 15.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('filterBox', filterBox);
    /** @ngInject */
    function filterBox($location, $state, $timeout, $rootScope, $filter) {
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
                /**
                 * public function for view
                 */
                $scope.applyBoxFilter = _applyBoxFilter;
                $scope.openSearchFilter = _openSearchFilter;
                $scope.clearFilter = _clearFilter;
                $scope.filterOperatorChange = _filterOperatorChange;
                $scope.dateModeChanged = _dateModeChanged;
                $scope.firstDateChange = _firstDateChange;
                $scope.getFilterOpt = _getFilterOpt;
                $scope.selectChange = _selectChange;
                /**END Public Function */

                // console.log($rootScope.user)

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
                    currentdate: 'current date'
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
                $scope.filterOpt.textbox.push({
                    value: '=',
                    name: resourse.equals
                });
                $scope.filterOpt.textbox.push({
                    value: '!=',
                    name: resourse.doesnotequal
                });
                $scope.filterOpt.textbox.push({
                    value: '/l',
                    name: resourse.like
                });
                $scope.filterOpt.textbox.push({
                    value: '/nl',
                    name: resourse.notlike
                });
                $scope.filterOpt.textbox.push({
                    value: '/s',
                    name: resourse.starts
                });
                $scope.filterOpt.textbox.push({
                    value: '/ns',
                    name: resourse.notstarts
                });
                $scope.filterOpt.textbox.push({
                    value: '/e',
                    name: resourse.ends
                });
                $scope.filterOpt.textbox.push({
                    value: '/ne',
                    name: resourse.notends
                });
                $scope.filterOpt.textbox.push({
                    value: '/i',
                    name: resourse.empty
                });
                $scope.filterOpt.textbox.push({
                    value: '/ni',
                    name: resourse.notempty
                });

                $scope.filterOpt.select = [];
                $scope.filterOpt.select.push({
                    value: '=',
                    name: resourse.equals,
                    type: 'single'
                });
                $scope.filterOpt.select.push({
                    value: '!=',
                    name: resourse.doesnotequal,
                    type: 'single'
                });
                $scope.filterOpt.select.push({
                    value: '/i',
                    name: resourse.empty,
                    type: 'single'
                });
                $scope.filterOpt.select.push({
                    value: '/ni',
                    name: resourse.notempty,
                    type: 'single'
                });
                $scope.filterOpt.select.push({
                    value: '/in',
                    name: resourse.in,
                    type: 'multiple'
                });
                $scope.filterOpt.select.push({
                    value: '/nin',
                    name: resourse.notin,
                    type: 'multiple'
                });

                $scope.filterOpt.date = [];
                $scope.filterOpt.date.push({
                    value: '/c',
                    name: resourse.currentdate,
                    type: 'all'
                });
                // $scope.filterOpt.date.push({ value: '=', name: resourse.currentweek, type: 'day' });
                // $scope.filterOpt.date.push({ value: '/c', name: resourse.currentmonth, type: 'month' });
                // $scope.filterOpt.date.push({ value: '/c', name: resourse.currentyear, type: 'year' });
                $scope.filterOpt.date.push({
                    value: '=',
                    name: resourse.equals,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '!=',
                    name: resourse.doesnotequal,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '>',
                    name: resourse.greater,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '=>',
                    name: resourse.greaterequal,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '<',
                    name: resourse.less,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '<=',
                    name: resourse.lessequal,
                    type: 'all'
                });
                $scope.filterOpt.date.push({
                    value: '/b',
                    name: resourse.between,
                    type: 'all'
                });

                $scope.filterOpt.time = [];
                $scope.filterOpt.time.push({
                    value: '/c',
                    name: resourse.currenttime,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '=',
                    name: resourse.equals,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '!=',
                    name: resourse.doesnotequal,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '>',
                    name: resourse.greater,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '=>',
                    name: resourse.greaterequal,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '<',
                    name: resourse.less,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '<=',
                    name: resourse.lessequal,
                    type: 'all'
                });
                $scope.filterOpt.time.push({
                    value: '/b',
                    name: resourse.between,
                    type: 'all'
                });

                function _openSearchFilter() {
                    $scope.showSearchFilter = true;
                }

                /**
                 * convert filter option for searchList and call parent function for refresh data
                 */
                function _applyBoxFilter() {
                    $scope.page.filterData = {};
                    $scope.page.searchList = [];
                    if ($scope.page.pageinfo.filters) {
                        var isRequiredFailed = false;
                        angular.forEach($scope.page.pageinfo.filters, function (filter) {


                            if (!isRequiredFailed) {

                                if (filter.required) {
                                    if (filter.value === undefined) {
                                        isRequiredFailed = true;
                                        if (filter.controlType == 'textbox')
                                            $rootScope.showMsg('warning', 'Please enter value in ' + filter.displayName)
                                        else if (filter.controlType == 'select')
                                            $rootScope.showMsg('warning', 'Please choose option from ' + filter.displayName)
                                        else
                                            $rootScope.showMsg('warning', 'Please enter value in ' + filter.displayName)
                                        // console.log(filter);
                                    }
                                }

                                if (filter.showFilter && !isRequiredFailed) {

                                    var search = {};
                                    search.field = filter.name;
                                    search.value = filter.value;
                                    if (filter.operator)
                                        search.operand = filter.operator;
                                    else
                                        search.operand = "=";

                                    if (search.spfield)
                                        search.nosp = (row.spfield == '')

                                    $scope.page.filterData[filter.name] = search;
                                    if (filter.controlType == "datepicker") {
                                        //if date mod is month and Year then dates should be changed in first and last day of selected month or year

                                        var value1, value2;
                                        value1 = moment(filter.value).format('YYYY-MM-DD');
                                        value2 = moment(filter.value2).format('YYYY-MM-DD');
                                        search.value = value1;
                                        if (filter.datePicker.option1.minMode == 'month' || filter.datePicker.option1.minMode == 'year') {
                                            //finding month starting and ending
                                            value1 = moment(filter.value).startOf('month').format('YYYY-MM-DD');

                                            if (filter.operator == "/b")
                                                value2 = moment(filter.value2).endOf('month').format('YYYY-MM-DD');
                                            else
                                                value2 = moment(filter.value).endOf('month').format('YYYY-MM-DD');

                                        } else if (filter.datePicker.option1.minMode == 'year') {
                                            //finding year starting and ending dates
                                            value1 = moment(filter.value).startOf('year').format('YYYY-MM-DD');
                                            if (filter.operator == "/b")
                                                value2 = moment(filter.value2).endOf('year').format('YYYY-MM-DD');
                                            else
                                                value2 = moment(filter.value).endOf('year').format('YYYY-MM-DD');
                                        }


                                        if (filter.operator == "/b" || (filter.operator == '=' && filter.datePicker.option1.minMode != 'day')) {
                                            search.value = value1;
                                            search.operand = '>=';
                                            $scope.page.searchList.push(search)

                                            search = {};
                                            search.field = filter.name;
                                            search.operand = '<=';
                                            search.value = value2;
                                            $scope.page.searchList.push(search)
                                        } else {
                                            if (filter.operator == '/c')
                                                search.operand = '=';
                                            else
                                                search.operand = filter.operator;

                                            if (filter.operator == '/<=')
                                                search.value = value1;
                                            else if (filter.operator == '/>=')
                                                search.value = value2;
                                            search.operand = filter.operator;
                                            $scope.page.searchList.push(search)
                                        }
                                    } else if (filter.controlType == "timepicker") {
                                        if (filter.operator == "/b") {
                                            search.value = moment(filter.value).format('HH:mm:ss')
                                            search.operand = '>=';
                                            $scope.page.searchList.push(search)

                                            search = {};
                                            search.field = filter.name;
                                            search.operand = '<=';
                                            search.value = moment(filter.value2).format('HH:mm:ss')
                                            $scope.page.searchList.push(search)
                                        } else {
                                            if (filter.operator == '/c')
                                                search.operand = '=';
                                            else
                                                search.operand = filter.operator;
                                            search.value = moment(filter.value).format('HH:mm:ss')
                                            search.operand = filter.operator;
                                            $scope.page.searchList.push(search)
                                        }
                                    } else {

                                        $scope.page.searchList.push(search)
                                    }
                                }
                            }
                        })
                    }
                    // console.log($scope.page)
                    if (isRequiredFailed)
                        $scope.page.filterData = undefined;
                    else
                        $rootScope.$broadcast('apply-filter', $scope.page.searchList);

                    //parent.applyFilter($scope.page.pageinfo.filters);
                }
                /**
                 * Clear All Fiters Values
                 */
                function _clearFilter() {

                    $scope.page.searchList = {};
                    $scope.filterData = undefined;
                    angular.forEach($scope.page.pageinfo.filters, function (filter) {
                        if (filter.required) {
                            filter.showFilter = true;
                            filter.value = undefined;
                            filter.operator = '=';
                        } else {
                            filter.showFilter = false;
                            filter.value = undefined;
                            filter.operator = '=';
                        }
                    })
                }

                function _filterOperatorChange(filter) {
                    if (filter.operator == '=')
                        filter.value = moment().format('YYYY-MM-DD');
                    else if (filter.operator == 'between') {

                    }
                }

                function _dateModeChanged(filter) {

                    filter.value2 = undefined;

                    filter.datePicker.option2.minMode = filter.datePicker.option1.minMode;

                    if (filter.datePicker.option1.minMode == 'day') {
                        filter.datePicker.format = $scope.dateCal.dayFormat
                    } else if (filter.datePicker.option1.minMode == 'month') {
                        filter.datePicker.format = $scope.dateCal.monthFormat
                    } else if (filter.datePicker.option1.minMode == 'year') {
                        filter.datePicker.format = $scope.dateCal.yearFormat
                    }
                    // filter.operator = '/=';
                    // filter.value = moment().utc();
                    // console.log($rootScope.user.sysparam[13].key)


                    var dayForFromDate = 0;
                    var dayList = $filter("findObj")($rootScope.user.sysparam, 'DAYS_FOR_FROMDATE', 'key')
                    if (dayList != null) {
                        // dayForFromDate = $rootScope.user.sysparam[13].value
                        dayForFromDate = dayList.value;
                        var currentdate = new Date();
                        var updateDate = currentdate.setDate(currentdate.getDate() - dayForFromDate);
                        filter.value = new Date(updateDate);
                        filter.value2 = new Date();
                        filter.datePicker.option2.minDate = filter.value;
                    }


                    // angular.forEach($rootScope.user.sysparam.key, function (key) {
                    //     console.log(key)
                    //     if (key == "DAYS_FOR_FROMDATE") {

                    //     }
                    // })


                    // dayForFromDate = $rootScope.user.sysparam[13].value;
                    // var currentdate = new Date();
                    // var updateDate = currentdate.setDate(currentdate.getDate() - dayForFromDate);
                    // console.log(updateDate.toLocaleString())
                    // filter.value = new Date(updateDate);

                    // if ($rootScope.user.sysparam[13].key == "DAYS_FOR_FROMDATE") {
                    //     dayForFromDate = $rootScope.user.sysparam[13].value;
                    // }
                    // filter.value = new Date();
                    // filter.value2 = new Date();
                    // filter.datePicker.option2.minDate = filter.value;
                    // console.log(filter)
                }
                /**
                 * First Datepicker Value change event
                 * @param {object} filter - A GDM Filter object
                 */
                function _firstDateChange(filter) {
                    if (filter.value) {
                        filter.datePicker.option2.minDate = filter.value;
                        filter.value2 = filter.value;
                    }
                    _selectChange(filter)
                }

                /**
                 * providing operator type to select box as per controlType
                 * @param  {object} filter - object from ng-repeat 
                 */
                function _getFilterOpt(filter) {
                    // console.log(filter)
                    if (filter.controlType == "textbox") {
                        return $scope.filterOpt.textbox;
                    } else if (filter.controlType == 'select') {
                        return $scope.filterOpt.select;
                    } else if (filter.controlType == 'datepicker') {
                        return $scope.filterOpt.date;
                    } else if (filter.controlType == 'timepicker') {
                        return $scope.filterOpt.time;
                    }

                }

                function _selectChange(filter) {

                    if (!$scope.page.filterData)
                        $scope.page.filterData = {};
                    var search = {};
                    search.field = filter.name;
                    if (filter.operator)
                        search.operand = filter.operator;
                    else
                        search.operand = "=";
                    search.value = filter.value;
                    $scope.page.filterData[filter.name] = search;

                    if ($scope.page.boxOptions.filterOnChange !== undefined && $scope.page.boxOptions.filterOnChange !== null) {
                        $scope.page.boxOptions.filterOnChange(filter);
                    }
                }

                /**
                 * A lister for pageinfo object from gdm
                 * Watch will be closed after first call
                 */
                var pageInfoListner = $scope.$watch(function () {
                    return $scope.page.pageinfo
                }, function (newVal) {
                    if (newVal) {
                        if (newVal.filters) {
                            /**
                             * assigning dateOption to filters
                             */
                            angular.forEach($scope.page.pageinfo.filters, function (filter, indx) {

                                if (filter.controlType == 'datepicker') {
                                    filter.datePicker = {
                                        option1: {},
                                        option2: {},
                                        format: ''
                                    }

                                    filter.datePicker.option1 = angular.copy($scope.dateCal.options)
                                    filter.datePicker.option2 = angular.copy($scope.dateCal.options)
                                    filter.datePicker.format = angular.copy($scope.dateCal.dayFormat)

                                    //--if date filter data is required on load can be manage from sysparam in future (02.04.18)@nm
                                    filter.datePicker.option1.minMode = 'day'
                                    filter.operator = "/b"
                                    filter.showFilter = true;
                                    _dateModeChanged(filter);


                                } else if (filter.controlType == 'timepicker') {
                                    // console.log(filter.controlType)
                                    filter.timePicker = {};
                                    filter.timePicker.option1 = angular.copy($scope.timeCal)
                                    filter.timePicker.option2 = angular.copy($scope.timeCal)

                                    //--if date filter data is required on load can be manage from sysparam in future (02.04.18)@nm
                                    filter.datePicker.option1.minMode = 'day'
                                    filter.operator = "/b"
                                    filter.showFilter = true;
                                    _dateModeChanged(filter);
                                }

                            })
                            if ($scope.page.pageinfo.statuslist != null) {
                                if ($scope.page.pageinfo.statuslist.length > 0) {
                                    $scope.page.pageinfo.statuslist.push({
                                        isApproved: false,
                                        isCancelApprove: false,
                                        isCancelOnHold: false,
                                        isCancelRejected: false,
                                        isCancelRequest: false,
                                        isCancelled: false,
                                        isOnHold: false,
                                        isPending: true,
                                        isRejected: false,
                                        name: "Pending",
                                        perc: "0",
                                        rank: "0",
                                        value: 0
                                    })
                                    $scope.page.pageinfo.filters.push({
                                        name: 'StatusId',
                                        controlType: 'select',
                                        displayName: 'Status',
                                        operator: '=',
                                        titleMap: $scope.page.pageinfo.statuslist
                                    })
                                }
                            }
                            pageInfoListner();
                        }
                    }
                })


            }
        };
    }

})();