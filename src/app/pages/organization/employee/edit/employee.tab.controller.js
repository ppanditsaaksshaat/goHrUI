

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employee')
        .controller('OrgEmployeeTabController', OrgEmployeeTabController);

    /** @ngInject */
    /** @ngInject */
    function OrgEmployeeTabController($scope, $stateParams, mailMessages, addModal, pageService, editableOptions, editableThemes, $timeout) {

        var vm = this;
        vm.navigationCollapsed = true;
        vm.pageId = $stateParams.pageId;
        vm.pkId = $stateParams.empId;
        vm.tempName = $stateParams.name;
        vm.tableId = 0;
        vm.empBasicDetail = {};
        vm.empPersonalDetail = {};
        vm.empContactDetail = {};
        vm.empJobDetail = {};
        vm.empResignDetail = {};
        vm.empSignDetail = {};
        vm.empAccountDetail = {};
        vm.param.entity = {};
        var rndValu = Math.round((Math.random() * 10) * 10);
        var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

        vm.updateForm = _updateForm;


        function _loadController() {

            vm.templateUrlPath = "app/pages/organization/employee/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
            _getTableId();
            $timeout(function () {
                pageService.getPagData(vm.pageId).then(
                    _getPageDataSuccessResult, _getPageDataErrorResult);
            });
        }
        function _getPageDataSuccessResult(result) {
            console.log(result)
            var field = "";
            if (vm.tempName == 'basic') {
                pageService.findEntity(vm.tableId, parseInt(vm.pkId), undefined).then(
                    _findEntitySuccessResult, _findEntityErrorResult);
            }
            else if (vm.tempName == 'personal') {
                vm.gender = result.pageinfo.selects.PdGenderId;
                vm.maritalStatus = result.pageinfo.selects.PdMaritalId;
                vm.nationality = result.pageinfo.selects.PdNationalityId;
                field = 'PdEmpId';
            }
            else if (vm.tempName == 'contact') {
                vm.country = result.pageinfo.selects.CountryId;
                vm.state = result.pageinfo.selects.StateId;
                vm.city = result.pageinfo.selects.CityId;
                vm.area = result.pageinfo.selects.CDAreaId;
                field = 'CDEmpId';
            }
            else if (vm.tempName == 'job') {
                vm.grade = result.pageinfo.selects.JDEmpGradeId;
                vm.level = result.pageinfo.selects.JDEmpLevelId;
                vm.location = result.pageinfo.selects.LocationId;
                vm.branch = result.pageinfo.selects.BRId;
                vm.subUnit = result.pageinfo.selects.JDSubUnitID;
                vm.department = result.pageinfo.selects.JDDeptId;
                vm.designation = result.pageinfo.selects.JDDesgId;
                vm.employeeType = result.pageinfo.selects.JDEmploymentId;
                vm.employee = result.pageinfo.selects.JDEmpId;
                field = 'JDEmpId';
            }
            else if (vm.tempName == 'resign') {
                vm.leavingType = result.pageinfo.selects.RDLeavingTypeId;
                field = 'RDEmpId';
                _findEntity(field);
            }
            else if (vm.tempName == 'sign') {
                vm.signatureType = result.pageinfo.selects.SGSTId;
                field = 'SDEmpId';
                _findEntity(field);
            }
            else if (vm.tempName == 'account') {
                vm.salaryMode = result.pageinfo.selects.ADSalaryModeId;
                vm.salary = result.pageinfo.selects.ADSalaryID;
                vm.bankName = result.pageinfo.selects.BankId;
                field = 'ADEmpId';
                _findEntity(field);
            }
            if (vm.tempName != 'basic') {
                var searchList = [];
                var searchFields = {
                    field: field,
                    operand: '=',
                    value: vm.pkId
                }
                searchList.push(searchFields);

                pageService.findEntity(vm.tableId, undefined, searchList).then(
                    _findEntitySuccessResult, _findEntityErrorResult);
            }

        }
        function _findEntity(field) {

        }
        function _getTableData(field) {

        }
        function _getPageDataErrorResult(error) {

        }
        function _findEntitySuccessResult(result) {
            if (vm.tempName == 'basic') {
                vm.empBasicDetail = result;
            }
            else if (vm.tempName == 'personal') {
                vm.empPersonalDetail = result;
            }
            else if (vm.tempName == 'contact') {
                vm.empContactDetail = result;
            }
            else if (vm.tempName == 'job') {
                console.log(result);
                vm.param.entity = result;
                vm.empJobDetail = result;
            }
            else if (vm.tempName == 'resign') {
                console.log(result);
                vm.empResignDetail = result;
            }
            else if (vm.tempName == 'sign') {
                console.log(result);
                vm.empSignDetail = result;
            }
            else if (vm.tempName == 'account') {
                console.log(result);
                vm.empAccountDetail = result;
            }

            vm.templateUrlPath = "app/pages/organization/employee/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
        }
        function _findEntityErrorResult(error) {

        }
        function _getTableId() {
            if (vm.tempName == 'basic') {
                vm.tableId = 30;
            }
            if (vm.tempName == 'personal') {
                vm.tableId = 43;
            }
            if (vm.tempName == 'contact') {
                vm.tableId = 45;
            }
            if (vm.tempName == 'job') {
                vm.tableId = 121;
            }
            if (vm.tempName == 'resign') {
                vm.tableId = 346;
            }
            if (vm.tempName == 'sign') {
                vm.tableId = 202;
            }
            if (vm.tempName == 'account') {
                vm.tableId = 131;
            }
            if (vm.tempName == 'workexperience') {
                vm.tableId = 62;
            }

        }
        function _setupSaving(dataObject) {
            var data = {
                oldEntity: vm.param.entity,
                newEntity: dataObject,
                pageCode: vm.pageId,
                activity: action
            }
            return data;
        }
        function _updateForm() {
            // if(_validateField()){                    
            var job = {
                JDId: vm.empJobDetail.JDId,
                JDDate: vm.empJobDetail.JDDate,
                JDDeptId: vm.empJobDetail.JDDeptId,
                JDDesgId: vm.empJobDetail.JDDesgId,
                JDEmploymentId: vm.empJobDetail.JDEmploymentId,
                JDEmpGradeId: vm.empJobDetail.JDEmpGradeId,
                JDEmpLevelId: vm.empJobDetail.JDEmpLevelId,
                JDIsOT: vm.empJobDetail.JDIsOT,
                SingleOT: vm.empJobDetail.SingleOT,
                JDDoubleOT: vm.empJobDetail.JDDoubleOT,
                JDSingleOTRate: vm.empJobDetail.JDSingleOTRate,
                DoubleOTRate: vm.empJobDetail.DoubleOTRate
            }
            var savingObj = _setupSaving(job)
            pageService.editPageData(vm.param.pageId, JSON.stringify(savingObj)).then(_updateSuccessResult, _updateErrorResult)
            //  }
        }
        function _updateSuccessResult(result) {
            //   alert(JSON.stringify(result))
            $scope.showMsg('success', 'Update Successfully', 'Add En');

        }
        function _updateErrorResult(error) {
            alert(JSON.stringify(error))
        }
        _loadController();
    }
})();
