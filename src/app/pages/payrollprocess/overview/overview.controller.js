/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess')
        .controller('payOverViewController', payOverViewController);

    /** @ngInject */
    function payOverViewController($scope, $state, $rootScope, $filter, pageService, dialogModal) {

        $scope.collpase = true;
        $scope.collpase2 = true;
        $scope.getData = _getMonthlyPayrollData;
        $scope.CheckLeaveAndAttendanceStatus = _CheckLeaveAndAttendanceStatus;


        var date = new Date();
        var c_Month = date.getMonth() + 1;
        var c_Year = date.getFullYear();
        var nextYear = date.getFullYear() + 1;
        var isChnageYear = false;
        $scope.financialMonths = [];
        var type = "";
        var statusClass = "";
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];


        function _loadController() {
            _getPayrollData(c_Month, c_Year)
        }

        var IsCalenderYear = $filter("findObj")($rootScope.user.sysparam, "IS_PAYROLL_CALENDER_MONTH", "key");
        if (IsCalenderYear != null) {

            if (IsCalenderYear.value == "True") {
                _getPayrollMomth(1);
            }
            else {
                _getPayrollMomth(4);

            }
        }




        function _getPayrollMomth(monthId) {
            for (var i = 0; i <= 11; i++) {
                if (monthId > 12) {
                    monthId = 1
                    isChnageYear = true;
                }
                if (c_Month == monthId) {
                    type = "Current";
                    statusClass = "current";
                }
                else if (c_Month < monthId) {
                    type = "Upcoming";
                    statusClass = "upcoming";
                }
                else if (c_Month > monthId) {
                    if (isChnageYear == false) {
                        if (monthId == 5) {
                            type = "Completed";
                            statusClass = "completed";
                        }
                        else {
                            type = "Pending";
                            statusClass = "pending";
                        }
                    }
                    else {
                        type = "Upcoming";
                        statusClass = "upcoming";
                    }
                }
                var calMonth =
                {
                    "id": monthId,
                    "month": monthNames[monthId - 1],
                    "year": isChnageYear == false ? c_Year : nextYear,
                    "type": type,
                    "statusClass": statusClass,
                    "active": c_Month == monthId ? true : false
                }
                $scope.financialMonths.push(calMonth);
                monthId++;
            }
        }

        function _getMonthlyPayrollData(month, year) {
            $scope.monthId = month;
            $scope.yearId = year;
            angular.forEach($scope.financialMonths, function (data) {
                if (month == data.id) {
                    data.active = true;
                }
                else {
                    data.active = false;
                }
            })
            if (month <= c_Month) {
                _getPayrollData(month, year)
            }
            else {
                $scope.monthName = monthNames[month - 1]
                $scope.year = year;
                var daysInMonth = new Date(year, month, 0).getDate();
                $scope.lastDayNumber = daysInMonth;
                $scope.calenderDays = daysInMonth;
                $scope.totalEmployee = 0;
                $scope.exitEmployee = 0;
                $scope.newEmployee = 0;
                $scope.payrollCost = 0;
            }
        }


        function _getPayrollData(month, year) {
            var searchLists = [];
            searchLists.push({ field: 'month', operand: '=', value: month })
            searchLists.push({ field: 'year', operand: '=', value: year })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 660).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {

                $scope.monthName = monthNames[month - 1]
                $scope.year = year;
                $scope.lastDayNumber = result[0][0].CalendarDay != null ? result[0][0].CalendarDay : 0;
                $scope.calenderDays = result[0][0].CalendarDay != null ? result[0][0].CalendarDay : 0;
                $scope.totalEmployee = result[0][0].TotalEmployee != null ? result[0][0].TotalEmployee : 0;
                $scope.exitEmployee = result[0][0].ExistEmployee != null ? result[0][0].ExistEmployee : 0;
                $scope.newEmployee = result[0][0].NewEmployee != null ? result[0][0].NewEmployee : 0;
                $scope.payrollCost = result[1][0].TotalPayrollCost != null ? result[1][0].TotalPayrollCost : 0;
            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _CheckLeaveAndAttendanceStatus() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            // $state.go("team.leave")
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/leaveandattendance/request.html',
                controller: 'leaveAndAttendanceStatusController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })
        }


        _loadController();
    }
})();
