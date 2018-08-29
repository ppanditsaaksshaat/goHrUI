/**
 * @author pardeep.pandit
 * created on 28.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.summary')
        .controller('myTeamSummaryController', myTeamSummaryController);

    /** @ngInject */
    function myTeamSummaryController($scope, $rootScope, pageService) {

        var dayNames = [];
        var days = [];
        $scope.leavesAndHoliday = [];
        var currentDate = new Date();
        $scope.currentDate = currentDate;
        var names = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        $scope.getPreviousMonthLeaveSummary = _getPreviousMonthLeaveSummary;
        $scope.getNextMonthLeaveSummary = _getNextMonthLeaveSummary


        function _loadController() {
            $scope.month = currentDate.getMonth() + 1;
            $scope.year = currentDate.getFullYear();
            $scope.monthYear = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
            daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
            _getCustomQuery(currentDate.getMonth() + 1, currentDate.getFullYear(), true)
        }

        function _getPreviousMonthLeaveSummary() {
            $scope.leavesAndHoliday = [];
            currentDate.setMonth(currentDate.getMonth() - 1)
            dayNames = [];
            days = [];
            $scope.monthYear = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
            daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
            _getCustomQuery(currentDate.getMonth() + 1, currentDate.getFullYear(), false)
            $scope.month = currentDate.getMonth() + 1;
            $scope.year = currentDate.getFullYear();
        }
        function _getNextMonthLeaveSummary() {
            $scope.leavesAndHoliday = [];
            currentDate.setMonth(currentDate.getMonth() + 1)
            dayNames = [];
            days = [];
            $scope.monthYear = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
            daysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
            _getCustomQuery(currentDate.getMonth() + 1, currentDate.getFullYear(), false)
            $scope.month = currentDate.getMonth() + 1;
            $scope.year = currentDate.getFullYear();
        }
        function daysInMonth(month, year) {

            var totalDays = new Date(year, month, 0).getDate();
            for (var i = 1; i <= totalDays; i++) {
                var date = new Date(year, month - 1, i)
                dayNames.push({ day: names[date.getDay()] });
                days.push({ date: date.getDate(), noPriority: true, isHoliday: false, isLeave: false })
            }
            $scope.calDaysName = dayNames;
            $scope.calDays = days;
        }

        function _getCustomQuery(month, year, isCurrentMonth) {
            console.log('month =' + month + " year " + year)
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'month', operand: '=', value: month })
            searchLists.push({ field: 'year', operand: '=', value: year })
            searchLists.push({ field: 'isCurrentMonth', operand: '=', value: isCurrentMonth })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 664).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.leaveEmployees = result[0];
                    $scope.holidays = result[1];
                    if ($scope.leaveEmployees.length > 0) {
                        angular.forEach($scope.leaveEmployees, function (data) {
                            if (data.LEADDateFrom == data.LEADDateTo) {
                                var customData = {
                                    name: data.EmpName,
                                    from: data.LEADDateFrom,
                                    to: data.LEADDateTo,
                                    isLeave: true,
                                    isHoliday: false
                                }
                                $scope.leavesAndHoliday.push(customData);
                            }
                            else {
                                var to = moment(data.LEADDateTo);
                                var from = moment(data.LEADDateFrom);
                                var diff = to.diff(from, 'days')
                                for (var i = 1; i <= diff + 1; i++) {
                                    if (i != 1) {
                                        data.LEADDateFrom = moment(data.LEADDateFrom).add(1, 'days').format()
                                    }
                                    var customData = {
                                        name: data.EmpName,
                                        from: data.LEADDateFrom,
                                        to: data.LEADDateTo,
                                        isLeave: true,
                                        isHoliday: false
                                    }
                                    $scope.leavesAndHoliday.push(customData);
                                }
                            }
                        })
                    }
                    if ($scope.holidays.length > 0) {
                        angular.forEach($scope.holidays, function (data) {
                            var customData = {
                                name: data.HDName,
                                from: data.HDFromDate,
                                to: data.HDFromDate,
                                isLeave: false,
                                isHoliday: true
                            }
                            $scope.leavesAndHoliday.push(customData);
                        })
                    }
                    if ($scope.leaveEmployees.length == 0 && $scope.holidays.length == 0) {
                        $scope.leavesAndHoliday = [];
                        $scope.noDataFound = true;
                    }
                    else {
                        $scope.noDataFound = false;
                    }

                    $scope.approvalsCount = result[2][0];
                    if (result.length > 3) {
                        if (result[3].length > 0) {
                            $scope.myReportees = result[3];
                            angular.forEach($scope.myReportees, function (data) {
                                var spiltName = data.EmpName.split(' ');
                                if (spiltName.length == 3) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                                }
                                else if (spiltName.length == 2) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                                }
                                else {
                                    data.shortName = spiltName[0].substr(0, 1);
                                }
                            })
                        }
                        if (result[4].length > 0) {
                            $scope.upperHeadEmp = result[4];
                            angular.forEach($scope.upperHeadEmp, function (data) {
                                var spiltName = data.EmpName.split(' ');
                                if (spiltName.length == 3) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                                }
                                else if (spiltName.length == 2) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                                }
                                else {
                                    data.shortName = spiltName[0].substr(0, 1);
                                }
                            })

                        }
                        if (result[5].length > 0) {
                            $scope.upperHeadTeam = result[5];
                            $scope.upperHeadName = result[5][0].EmpName;
                            angular.forEach($scope.upperHeadTeam, function (data) {
                                var spiltName = data.EmpName.split(' ');
                                if (spiltName.length == 3) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                                }
                                else if (spiltName.length == 2) {
                                    data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                                }
                                else {
                                    data.shortName = spiltName[0].substr(0, 1);
                                }
                            })
                            $scope.upperHeadName = result[5][0].ReportingHead;
                        }
                    }

                    if ($scope.leavesAndHoliday.length > 0) {
                        angular.forEach($scope.calDays, function (data) {
                            angular.forEach($scope.leavesAndHoliday, function (leaveData) {
                                var day = moment(leaveData.from).date();
                                if (data.date == moment(leaveData.from).date()) {
                                    if (leaveData.isHoliday) {
                                        data.isHoliday = true;
                                        data.isLeave = false;
                                        data.noPriority = false;
                                    }
                                    else {
                                        data.isLeave = true;
                                        data.noPriority = false;
                                        data.isHoliday = false;

                                    }
                                }
                            })
                        })
                    }
                    else {
                        angular.forEach($scope.calDays, function (data) {
                            data.isHoliday = false;
                            data.isLeave = false;
                            data.noPriority = true;
                        })
                    }
                }
                else {

                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        _loadController();

    }
})();
