

/**
 * @author prardeep.pandit
 * created on 1.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('AddEmployeeController', AddEmployeeController);

    /** @ngInject */
    /** @ngInject */
    function AddEmployeeController($scope, $stateParams, pageService, $timeout, $state) {


        //local variable
        var vm = this;
        var columnIds = ['132', '667', '3841', '192', '668', '743', '744', '665','4034'];
        vm.pageId = 25;
        vm.empAdd = {};
        var queryId = 528;
        //end o local variable

        //private function
        vm.saveForm = _saveForm;
        vm.rosterPlanOnChage=_rosterPlanOnChage;
        //end of private function


        //page load 
        function _loadController() {
            $timeout(function () {
                vm.empAdd.JDDate = moment();
                pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
                pageService.getFieldSetting(vm.pageId).then(_getFieldSettingSuccessResult, _getFieldSettingErrorResult)
                var data = {
                    searchList: [],
                    orderByList: []
                }
                pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            });
        }
        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            if (result != "NoDataFound") {
                vm.groupList = result;
                vm.empAdd.JDGroupId = result[0].GMCId;
            }
        }
        function _getCustomQueryErrorResult(err) {

        }
        function _getAllSelectSuccessResult(result) {
            console.log(result)
            vm.dropDownList = result;
        }
        function _getAllSelectErrorResult(err) {
            console.log(err);
        }
        function _getFieldSettingSuccessResult(result) {
            vm.EmpCode = result.colvalue;
        }
        function _getFieldSettingErrorResult(err) {
            console.log(err)
        }

        // end of page load 

        function _rosterPlanOnChage(rosterPlan) {
            $scope.RosterPlan = rosterPlan;
        }

        // save employee form
        function _saveForm(data) {

            var basic = {
                EmpTitleId: vm.empAdd.EmpTitleId,
                EmpFirstName: vm.empAdd.EmpFirstName,
                EmpMiddleName: vm.empAdd.EmpMiddleName,
                EmpLastName: vm.empAdd.EmpLastName,
                EmpCode: vm.EmpCode,
                OtherCode: vm.empAdd.OtherCode,
                EmpPhoto1_64URL: vm.empAdd.EmpPhoto1_64URL,
            }
            var job = {
                JDDate: vm.empAdd.JDDate,
                JDDeptId: vm.empAdd.JDDeptId,
                JDDesgId: vm.empAdd.JDDesgId,
                JDEmploymentId: vm.empAdd.JDEmploymentId,
                JDEmpGradeId: vm.empAdd.JDEmpGradeId,
                JDEmpLevelId: vm.empAdd.JDEmpLevelId,
                JDGroupId: vm.empAdd.JDGroupId,
                JDReporting1: vm.empAdd.JDReporting1,
                JDReporting2: vm.empAdd.JDReporting2,
                JDReportingHR: vm.empAdd.JDReportingHR,
                DoubleOTRate: 0,
                JDSingleOTRate: 0,
                SingleOT: 0,
                JDDoubleOT: 0
            }
            var personal = {
                PdGenderId: vm.empAdd.PdGenderId,
                PdMobileNo: vm.empAdd.PdMobileNo,
                PDOtherNumber: vm.empAdd.PDOtherNumber,
                PdEmail: vm.empAdd.PdEmail
            }
            var roster = {
                RODWeekOffSetId: $scope.RosterPlan.RPDWeekOffSetId,
                RODFromDate: moment($scope.RosterPlan.RPDFromDate).format("DD-MMM-YYYY"),
                RODToDate: moment($scope.RosterPlan.RPDToDate).format("DD-MMM-YYYY"),
                RODShiftId: $scope.RosterPlan.RPDWeekOffSetId,
                RODRosterPlanId: $scope.RosterPlan.value,
            }
            var employeeData = { basic: basic, job: job, personal: personal,roster:roster };
            pageService.create(JSON.stringify(employeeData)).then(_createSuccessResult, _createErrorResult)

        }
        function _createSuccessResult(result) {
            console.log(result)
            if (result.success_message == 'success') {
                $scope.showMsg('success', 'Employee Saved Successfully');
                $state.go('organization.employees.list');
            }
            else {
                $scope.showMsg('error', result);
            }
        }
        function _createErrorResult(error) {
        }
      
        _loadController();
    }
})();
