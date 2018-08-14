

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
    function AddEmployeeController($scope, $filter, pageService, $timeout, $state) {


        //local variable
        var vm = this;
        var columnIds = ['132', '667', '3841', '192', '668', '743', '744', '665', '4034', '1743', '1744', '1745', '112'];
        vm.pageId = 25;
        $scope.entity = {};
        var queryId = 528;
        //end o local variable

        //private function
        vm.saveForm = _saveForm;
        vm.rosterPlanOnChage = _rosterPlanOnChage;
        vm.locationOnChange = _locationOnChange;
        vm.branchOnChange = _branchOnChange;
        //end of private function


        //page load 
        function _loadController() {
            $timeout(function () {
                 $scope.entity.JDDate = moment();
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
                 $scope.entity.JDGroupId = result[0].GMCId;
            }
        }
        function _getCustomQueryErrorResult(err) {

        }
        function _getAllSelectSuccessResult(result) {
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
                EmpTitleId:  $scope.entity.EmpTitleId,
                EmpFirstName:  $scope.entity.EmpFirstName,
                EmpMiddleName:  $scope.entity.EmpMiddleName,
                EmpLastName:  $scope.entity.EmpLastName,
                EmpCode: $scope.entity.EmpCode,
                OtherCode:  $scope.entity.OtherCode,
                EmpPhoto1_64URL:  $scope.entity.EmpPhoto1_64URL,
            }
            var job = {
                JDDate:  $scope.entity.JDDate,
                JDDeptId:  $scope.entity.JDDeptId,
                JDDesgId:  $scope.entity.JDDesgId,
                JDEmploymentId:  $scope.entity.JDEmploymentId,
                JDEmpGradeId:  $scope.entity.JDEmpGradeId,
                JDEmpLevelId:  $scope.entity.JDEmpLevelId,
                JDGroupId:  $scope.entity.JDGroupId,
                JDReporting1:  $scope.entity.JDReporting1,
                JDReporting2:  $scope.entity.JDReporting2,
                JDReportingHR:  $scope.entity.JDReportingHR,
                JDSubUnitID:  $scope.entity.JDSubUnitID,
                DoubleOTRate: 0,
                JDSingleOTRate: 0,
                SingleOT: 0,
                JDDoubleOT: 0
            }
            var personal = {
                PdGenderId:  $scope.entity.PdGenderId,
                PdMobileNo:  $scope.entity.PdMobileNo,
                PDOtherNumber:  $scope.entity.PDOtherNumber,
                PdEmail:  $scope.entity.PdEmail
            }
            var userRoleInfo = {
                RoleId:  $scope.entity.RoleId,
            }
            var employeeData = { basic: basic, job: job, personal: personal, userRoleInfo: userRoleInfo };
            pageService.create(JSON.stringify(employeeData)).then(_createSuccessResult, _createErrorResult)

        }
        function _createSuccessResult(result) {
            console.log(result)
            if (result.success_message == 'success') {
                $scope.showMsg('success', 'Employee Saved Successfully');
                //  $state.go('organization.employees.list');
                $state.go("employee", { empid: result.entity.empId })
            }
            else {
                $scope.showMsg('error', result);
            }
        }
        function _createErrorResult(error) {
        }
        function _locationOnChange(locationId) {

            var branches = $filter("findAll")(vm.dropDownList[10], locationId, "LocationId");
            if (branches != null) {
                vm.Branches = branches;
            }
        }
        function _branchOnChange(branchId) {
            var subUnits = $filter("findAll")(vm.dropDownList[11], branchId, 'BRId');
            if (subUnits != null) {
                vm.SubUnits = subUnits;
            }
        }

        _loadController();
    }
})();
