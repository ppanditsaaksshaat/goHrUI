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
        //   console.log(moment("01-Jan-2018").format("M"))
        $scope.isReviewed = false;
        $scope.reviewCount = 0;
        $scope.collpase = true;
        $scope.collpase2 = true;
        $scope.entity = {};



        $scope.getData = _getMonthlyPayrollData;
        $scope.CheckLeaveAndAttendanceStatus = _CheckLeaveAndAttendanceStatus;
        $scope.skipAll = _skipAll;
        $scope.unSkip = _unSkip;
        $scope.openReviewAllEmployees = _openReviewAllEmployees;
        $scope.subUnitOnChange = _subUnitOnChange;
        $scope.openSalaryApprovalModal = _openSalaryApprovalModal

        var columnIds = ['3669'];
        var date = new Date();
        var c_Month = date.getMonth() + 1;
        var c_Year = date.getFullYear();
        var nextYear = date.getFullYear() + 1;
        $scope.financialMonths = [];
        var type = "";
        var statusClass = "";
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];


        function _loadController() {
            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {
                console.log(result)
                $scope.subUnits = result[0];
                $scope.entity.subUnitId = parseInt($rootScope.user.profile.suId);
                _getFinancialMonthStartFrom($scope.entity.subUnitId)
                _getPayrollData(c_Month, c_Year, $scope.entity.subUnitId)
            }
            function _getAllSelectErrorResult(err) {

            }
        }

        function _getFinancialMonthStartFrom(subUnitId) {

            var searchList = [];
            var searchFields = {
                field: "LSCSUId",
                operand: '=',
                value: subUnitId
            }
            searchList.push(searchFields);

            pageService.findEntity(335, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);
            function _findEntitySuccessResult(result) {
                _getPayrollCycle(moment(result.LSCEffectedFrom).format("M"));
            }
            function _findEntityErrorResult(err) {

            }
        }

        function _getPayrollCycle(monthId) {
            var isChnageYear = false;
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
                        type = "Pending";
                        statusClass = "pending";
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
                _getPayrollData(month, year, $scope.entity.subUnitId)
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


        function _getPayrollData(month, year, subUnitId) {
            var searchLists = [];
            searchLists.push({ field: 'month', operand: '=', value: month })
            searchLists.push({ field: 'year', operand: '=', value: year })
            searchLists.push({ field: 'subUnit', operand: '=', value: subUnitId })

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

        function _skipAll() {
            $scope.isReviewed = true;
            $scope.reviewedBy = $rootScope.user.profile.empName;
            $scope.actionTaken = moment().format("DD-MMM-YYYY");
            $scope.progessWidth = "83.33%";
            $scope.reviewCount = 5;
        }
        function _unSkip() {
            $scope.isReviewed = false;
            $scope.reviewedBy = "";
            $scope.actionTaken = "";
            $scope.progessWidth = "0";
            $scope.reviewCount = 0;
        }

        function _openReviewAllEmployees() {
            var month = $scope.monthId == undefined ? c_Month : $scope.monthId;
            var year = $scope.yearId == undefined ? c_Year : $scope.yearId;
            var param = {
                month: month,
                year: year,
                subUnitId: $scope.entity.subUnitId,
                modalTitle: "Salary Verification Of " + monthNames[month - 1] + " " + year
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/reviewallemp/review.html',
                controller: 'reviewAllEmpController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })
        }
        function _openSalaryApprovalModal() {
            var month = $scope.monthId == undefined ? c_Month : $scope.monthId;
            var year = $scope.yearId == undefined ? c_Year : $scope.yearId;
            var param = {
                month: month,
                year: year,
                subUnitId: $scope.entity.subUnitId,
                modalTitle: "Salary Approval Of " + monthNames[month - 1] + " " + year
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/salaryapproval/salaryapproval.html',
                controller: 'salaryApprovalController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })
        }


        function _subUnitOnChange(subUnitId) {
            $scope.financialMonths = [];
            _getFinancialMonthStartFrom(subUnitId)
            _getPayrollData(c_Month, c_Year, $scope.entity.subUnitId)
        }
        _loadController();
    }
})();
