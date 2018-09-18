/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess')
        .controller('payOverViewController', payOverViewController);

    /** @ngInject */
    function payOverViewController($scope, $state, $rootScope, editFormService, pageService, dialogModal) {
        //   console.log(moment("01-Jan-2018").format("M"))

        $scope.isLeaveReviewed = false;
        $scope.isAttendanceReviewed = false;
        $scope.isNewEmpReviewed = false;
        $scope.isExitEmpReviewed = false
        $scope.isOnholdSalaryReviewed = false;
        $scope.isVerifyEmpReviewed = false;
        $scope.isApprovedEmpReviewed = false;
        $scope.isFinalRun = true;
        $scope.isVerifyEmp = true;
        $scope.isApproveEmp = true;
        $scope.reviewCount = 0;
        $scope.collpase = true;
        $scope.collpase2 = true;
        $scope.entity = {};
        var form;




        $scope.getData = _getMonthlyPayrollData;
        $scope.openLeaveModal = _openLeaveModal;
        $scope.openAttendanceModal = _openAttendanceModal;
        $scope.openNewEmployeeModal = _openNewEmployeeModal;
        $scope.openExitEmployeeModal = _openExitEmployeeModal;
        $scope.openSalaryOnHoldModal = _openSalaryOnHoldModal
        $scope.skipAll = _skipAll;
        $scope.openReviewAllEmployees = _openReviewAllEmployees;
        $scope.subUnitOnChange = _subUnitOnChange;
        $scope.openSalaryApprovalModal = _openSalaryApprovalModal
        $scope.finalRun = _finalRun;
        function _finalRun() {
            $state.go("payroll.transaction.CustomPayrollSetting")
        }

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
                $scope.subUnits = result[0];
                $scope.entity.subUnitId = parseInt($rootScope.user.profile.suId);
                _getFinancialMonthStartFrom($scope.entity.subUnitId)
                _getAlreadyVerfiedAction($rootScope.user.profile.suId, c_Month, c_Year)

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
                $scope.isEndOfMonth = result.LSCEndOfMonth;
                $scope.fromDay = result.LSCFromDay;
                $scope.endDay = result.LSCToDay;
                var month = $scope.monthId == undefined ? c_Month : $scope.monthId;
                var year = $scope.yearId == undefined ? c_Year : $scope.yearId;
                _getPayrollData(month, year, subUnitId)
                _getPayrollCycle(moment(result.LSCEffectedFrom).format("M"));
            }
            function _findEntityErrorResult(err) {

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
                if ($scope.isEndOfMonth) {
                    $scope.monthStartName = monthNames[month - 1];
                    $scope.monthEndName = monthNames[month - 1];
                    $scope.firstDayNumber = 1;
                    $scope.lastDayNumber = new Date(year, month, 0).getDate();
                    $scope.fromDate = moment(1 + "-" + $scope.monthStartName + "-" + year);
                    $scope.toDate = moment($scope.lastDayNumber + "-" + $scope.monthEndName + "-" + year);
                    $scope.calenderDays = result[0][0].CalendarDay != null ? result[0][0].CalendarDay : 0;
                }
                else {
                    $scope.monthStartName = monthNames[month - 1];
                    $scope.monthEndName = monthNames[month];
                    $scope.firstDayNumber = $scope.fromDay;
                    $scope.lastDayNumber = $scope.endDay;
                    $scope.fromDate = moment($scope.fromDay + "-" + $scope.monthStartName + "-" + year);
                    $scope.toDate = moment($scope.endDay + "-" + $scope.monthEndName + "-" + year);
                    $scope.calenderDays = $scope.toDate.diff($scope.fromDate, 'days') + 1;
                }

                $scope.year = year;
                $scope.totalEmployee = result[0][0].TotalEmployee != null ? result[0][0].TotalEmployee : 0;
                $scope.exitEmployee = result[0][0].ExistEmployee != null ? result[0][0].ExistEmployee : 0;
                $scope.newEmployee = result[0][0].NewEmployee != null ? result[0][0].NewEmployee : 0;
                $scope.payrollCost = result[1][0].TotalPayrollCost != null ? result[1][0].TotalPayrollCost : 0;
            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }
        function _getAlreadyVerfiedAction(subUnit, month, year) {
            var searchList = [];
            var searchFields = {
                field: "RPVSubUnitId",
                operand: '=',
                value: subUnit
            }
            searchList.push(searchFields);
            var searchFields = {
                field: "RPVMonth",
                operand: '=',
                value: month
            }
            searchList.push(searchFields);
            var searchFields = {
                field: "RPVYear",
                operand: '=',
                value: year
            }
            searchList.push(searchFields);
            var searchListData = {
                searchList: searchList,
                orderByList: []
            }

            pageService.getTableData(509, 507, "", "", false, searchListData).then(
                _getTableDataSuccessResult, _getTableDataErrorResult)
            function _getTableDataSuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    angular.forEach(result, function (data) {

                        if (data.RPVType == "Leave") {
                            $scope.leaveRPVId = data.RPVId;
                            $scope.leaveAction = "edit";
                            $scope.leavereviewedBy = data.EmpName
                            $scope.leaveactionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isLeaveReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isLeaveReviewed = true;
                        }
                        else {
                            $scope.leaveAction = "create";
                        }
                        if (data.RPVType == "Attendance") {
                            $scope.attendanceAction = "edit";
                            $scope.attendanceRPVId = data.RPVId;
                            $scope.attendanceReviewedBy = data.EmpName
                            $scope.attendanceActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isAttendanceReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isAttendanceReviewed = true;
                        }
                        else {
                            $scope.attendanceAction = "create";
                        }
                        if (data.RPVType == "NewEmployee") {
                            $scope.newEmpAction = "edit";
                            $scope.newEmpRPVId = data.RPVId;
                            $scope.newEmpReviewedBy = data.EmpName
                            $scope.newEmpActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isNewEmpReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isNewEmpReviewed = true;
                        }
                        else {
                            $scope.newEmpAction = "create";
                        }
                        if (data.RPVType == "ExitEmployee") {
                            $scope.exitEmpAction = "edit";
                            $scope.exitEmpRPVId = data.RPVId;
                            $scope.exitEmpReviewedBy = data.EmpName
                            $scope.exitEmpActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isExitEmpReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isExitEmpReviewed = true;
                        }
                        else {
                            $scope.exitEmpAction = "create";
                        }
                        if (data.RPVType == "SalaryOnHold") {
                            $scope.salaryOnholdAction = "edit";
                            $scope.salaryOnholdRPVId = data.RPVId;
                            $scope.salOnholdReviewedBy = data.EmpName
                            $scope.salOnholdActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isOnholdSalaryReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isOnholdSalaryReviewed = true;


                        }
                        else {
                            $scope.salaryOnholdAction = "create";
                        }
                        if (data.RPVType == "ReviewAllEmployee") {
                            $scope.reviewEmpAction = "edit";
                            $scope.reviewEmpRPVId = data.RPVId;
                            $scope.allEmpReviewedBy = data.EmpName
                            $scope.allEmpReviewActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isVerifyEmpReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isVerifyEmpReviewed = true;
                        }
                        else {
                            $scope.reviewEmpAction = "create";
                        }
                        if (data.RPVType == "SalaryApproval") {
                            $scope.salaryApprovalAction = "edit";
                            $scope.salaryApprovalRPVId = data.RPVId;
                            $scope.salaryApprovalReviewedBy = data.EmpName
                            $scope.salaryApprovalActionTaken = moment(data.RPVIsVerifiedOn).format("DD-MMM-YYYY");
                            if (!$scope.isApprovedEmpReviewed) {
                                $scope.reviewCount = $scope.reviewCount + 1;
                            }
                            $scope.isApprovedEmpReviewed = true;
                            $scope.isFinalRun = false;

                        }
                        else {
                            $scope.salaryApprovalAction = "create";
                        }
                        if (data.RPVType == "SalaryGenerate") {
                            $scope.action = "edit";
                        }
                        $scope.progessWidth = (14.28 * parseInt($scope.reviewCount)) + "%";
                        if ($scope.reviewCount == 5) {
                            $scope.isVerifyEmp = false;
                            $scope.isDisabled = true;
                        }
                        if ($scope.reviewCount == 6) {
                            $scope.isApproveEmp = false;
                        }
                    })
                }
                else {
                    $scope.action = "create";
                    $scope.isLeaveReviewed = false;
                    $scope.isAttendanceReviewed = false;
                    $scope.isNewEmpReviewed = false;
                    $scope.isExitEmpReviewed = false
                    $scope.isOnholdSalaryReviewed = false;
                    $scope.isVerifyEmpReviewed = false;
                    $scope.isApprovedEmpReviewed = false;
                    $scope.isFinalRun = true;
                    $scope.isVerifyEmp = true;
                    $scope.isApproveEmp = true;
                    $scope.isDisabled = false;
                    $scope.reviewCount = 0;
                    $scope.progessWidth = "0%";
                }
                $scope.action = "create";
            }
            function _getTableDataErrorResult(err) {

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
            _getAlreadyVerfiedAction($scope.entity.subUnitId, month, year)
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



        function _skipAll() {
            $scope.isSkipAll = true;
            var year = $scope.yearId == undefined ? c_Year : $scope.yearId;
            var month = $scope.monthId == undefined ? c_Month : $scope.monthId;
            $scope.multi = {
                parentRows: [],
                delRecords: []
            };
            // $scope.multi = {};
            // $scope.multi.parentRows = [];
            if (!$scope.isLeaveReviewed) {
                var leave = {
                    RPVSubUnitId: $scope.entity.subUnitId, RPVMonth: month, RPVYear: year, RPVType: "Leave", RPVIsVerified: true,
                    RPVVerifiedBy: $rootScope.user.profile.empId, RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                }
                $scope.multiEntity = {};
                $scope.multiEntity.parent = {
                    newEntity: leave,
                    oldEntity: {},
                    action: "create",
                    tableid: 509,
                    pageid: 507
                }
                $scope.multiEntity.child = [];
                $scope.multi.parentRows.push($scope.multiEntity);
            }
            if (!$scope.isAttendanceReviewed) {
                var attendance = {
                    RPVSubUnitId: $scope.entity.subUnitId, RPVMonth: month, RPVYear: year, RPVType: "Attendance", RPVIsVerified: true,
                    RPVVerifiedBy: $rootScope.user.profile.empId, RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                }
                $scope.multiEntity = {};
                $scope.multiEntity.parent = {
                    newEntity: attendance,
                    oldEntity: {},
                    action: "create",
                    tableid: 509,
                    pageid: 507
                }
                $scope.multiEntity.child = [];
                $scope.multi.parentRows.push($scope.multiEntity);
            }
            if (!$scope.isNewEmpReviewed) {
                var newEmployee = {
                    RPVSubUnitId: $scope.entity.subUnitId, RPVMonth: month, RPVYear: year, RPVType: "NewEmployee", RPVIsVerified: true,
                    RPVVerifiedBy: $rootScope.user.profile.empId, RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                }
                $scope.multiEntity = {};
                $scope.multiEntity.parent = {
                    newEntity: newEmployee,
                    oldEntity: {},
                    action: "create",
                    tableid: 509,
                    pageid: 507
                }
                $scope.multiEntity.child = [];
                $scope.multi.parentRows.push($scope.multiEntity);
            }
            if (!$scope.isExitEmpReviewed) {
                var exitEmployee = {
                    RPVSubUnitId: $scope.entity.subUnitId, RPVMonth: month, RPVYear: year, RPVType: "ExitEmployee", RPVIsVerified: true,
                    RPVVerifiedBy: $rootScope.user.profile.empId, RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                }
                $scope.multiEntity = {};
                $scope.multiEntity.parent = {
                    newEntity: exitEmployee,
                    oldEntity: {},
                    action: "create",
                    tableid: 509,
                    pageid: 507
                }
                $scope.multiEntity.child = [];
                $scope.multi.parentRows.push($scope.multiEntity);
            }
            if (!$scope.isOnholdSalaryReviewed) {
                var onholdSalary = {
                    RPVSubUnitId: $scope.entity.subUnitId, RPVMonth: month, RPVYear: year, RPVType: "SalaryOnHold", RPVIsVerified: true,
                    RPVVerifiedBy: $rootScope.user.profile.empId, RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                }
                $scope.multiEntity = {};
                $scope.multiEntity.parent = {
                    newEntity: onholdSalary,
                    oldEntity: {},
                    action: "create",
                    tableid: 509,
                    pageid: 507
                }
                $scope.multiEntity.child = [];
                $scope.multi.parentRows.push($scope.multiEntity);
            }

            //  $scope.multi.parentRows.push($scope.multi) 
            var postData = JSON.stringify($scope.multi);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }
            //   $scope.multiEntity.lz = false

            pageService.multiSaveRows(data).then(function (result) {
                if (result.success_message == "success") {
                    $scope.isDisabled = true;
                    _getAlreadyVerfiedAction($scope.entity.subUnitId, month, year)
                }

            }, function (err) {
                console.log(err)
            })
        }

        function _openLeaveModal() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/leave/leave.html',
                controller: 'leaveVerificationController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.leaveRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "Leave",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.leaveAction == undefined ? $scope.action : $scope.leaveAction;
                    _saveEntity(entity, form, action)
                }
            })
        }
        function _openAttendanceModal() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/attendance/attendance.html',
                controller: 'attendanceVerificationController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.attendanceRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "Attendance",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.attendanceAction == undefined ? $scope.action : $scope.attendanceAction;
                    _saveEntity(entity, form, action)
                }
            })
        }
        function _openNewEmployeeModal() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/newemployee/newemployee.html',
                controller: 'newEmpVerificationController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.newEmpRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "NewEmployee",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.newEmpAction == undefined ? $scope.action : $scope.newEmpAction;
                    _saveEntity(entity, form, action)
                }
            })
        }
        function _openExitEmployeeModal() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/exitemployee/exitemployee.html',
                controller: 'exitEmpVerificationController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.exitEmpRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "ExitEmployee",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.exitEmpAction == undefined ? $scope.action : $scope.exitEmpAction;
                    _saveEntity(entity, form, action)
                }
            })
        }
        function _openSalaryOnHoldModal() {
            var param = {
                month: $scope.monthId == undefined ? c_Month : $scope.monthId,
                year: $scope.yearId == undefined ? c_Year : $scope.yearId
            }
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/overview/salaryonhold/salaryonhold.html',
                controller: 'salaryOnholdVerificationController',
                param: param
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.salaryOnholdRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "SalaryOnHold",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.salaryOnholdAction == undefined ? $scope.action : $scope.salaryOnholdAction;
                    _saveEntity(entity, form, action)
                }
            })
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
                var verified = false;
                if (data == 0) {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.reviewEmpRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "ReviewAllEmployee",
                        RPVIsVerified: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.reviewEmpAction == undefined ? $scope.action : $scope.reviewEmpAction;
                    _saveEntity(entity, form, action)
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
                var approved = false;
                if (data == 0) {
                    console.log(param)
                    var entity = {
                        RPVId: $scope.salaryApprovalRPVId,
                        RPVSubUnitId: $scope.entity.subUnitId,
                        RPVMonth: param.month,
                        RPVYear: param.year,
                        RPVType: "SalaryApproval",
                        RPVIsVerified: true,
                        RPVIsApproved: true,
                        RPVVerifiedBy: $rootScope.user.profile.empId,
                        RPVIsVerifiedOn: moment().format("YYYY-MM-DD")
                    }

                    var action = $scope.salaryApprovalAction == undefined ? $scope.action : $scope.salaryApprovalAction;
                    _saveEntity(entity, form, action)
                }
            })
        }


        function _subUnitOnChange(subUnitId) {
            $scope.financialMonths = [];
            $scope.monthId = undefined;
            $scope.yearId = undefined;
            _getAlreadyVerfiedAction(subUnitId, c_Month, c_Year)
            _getFinancialMonthStartFrom(subUnitId)
        }

        function _saveEntity(entity, form, action) {
            editFormService.saveForm(507, entity, {},
                action, "", form, false)
                .then(_saveEntitySuccessResult, _errorEntitySuccessResult)
        }
        function _saveEntitySuccessResult(result) {
            console.log(result)
            if (result.success_message == "Added New Record." || result.success_message == "Record Updated.") {
                var month = $scope.monthId == undefined ? c_Month : $scope.monthId;
                var year = $scope.yearId == undefined ? c_Year : $scope.yearId;
                _getAlreadyVerfiedAction($scope.entity.subUnitId, month, year)
            }
        }
        function _errorEntitySuccessResult(err) {
            console.log(err);
        }
        _loadController();
    }
})();
