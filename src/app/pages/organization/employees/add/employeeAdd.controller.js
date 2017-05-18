

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('AddEmployeeController', AddEmployeeController);

    /** @ngInject */
    /** @ngInject */
    function AddEmployeeController($scope, $stateParams, pageService, $timeout, $state) {
        var vm = this;
        var columnIds = ['132', '667', '674', '192', '668', '743', '744'];
        vm.empAdd = {};
        vm.saveForm = _saveForm;
        vm.clear = _clear;

       function _clear()
       {
           vm.empAdd=[];
       }

        $scope.open = open;
        $scope.opened = false;
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.options = {
            showWeeks: false
        };

        function open() {
            $scope.opened = true;
        }

        function _loadController() {
            $timeout(function () {

                pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
                pageService.getFieldSetting(25).then(_getFieldSettingSuccessResult, _getFieldSettingErrorResult)
            });
        }
        function _getFieldSettingSuccessResult(result) {
            vm.EmpCode = result.colvalue;
            //alert(JSON.stringify(result))
        }
        function _getFieldSettingErrorResult(error) {

        }
        function _getAllSelectSuccessResult(result) {
            console.log(result)
            vm.title = result[0];
            vm.department = result[1];
            vm.designation = result[2];
            vm.gender = result[3];
            vm.employeeType = result[4];
            vm.grade = result[5];
            vm.level = result[6];
        }
        function _getAllSelectErrorResult(error) {
            alert(JSON.stringify(error))
        }
        function _validateField(form) {

            if (vm.empAdd.EmpTitleId == undefined) {
                $scope.showMsg('error', 'Please Select Title', 'Requried')
                return false;
            }
            if (vm.empAdd.EmpFirstName == undefined || vm.empAdd.EmpFirstName == '') {
                $scope.showMsg('error', 'Please Enter FirstName', 'Requried')
                return false;
            }

            if (vm.empAdd.PdGenderId == undefined) {
                $scope.showMsg('error', 'Please Select Gender', 'Requried')
                return false;
            }
            if (vm.empAdd.JDDate == undefined || vm.empAdd.JDDate == "") {
                $scope.showMsg('error', 'Please Select Date Of Joining', 'Requried')
                return false;
            }
            if (vm.empAdd.PdMobileNo == undefined || vm.empAdd.PdMobileNo == '') {
                $scope.showMsg('error', 'Please Enter Mobile', 'Requried')
                return false;
            }

            if (vm.empAdd.JDDeptId == undefined) {
                $scope.showMsg('error', 'Please Select Department', 'Requried')
                return false;
            }
            if (vm.empAdd.JDDesgId == undefined) {
                $scope.showMsg('error', 'Please Select Designation', 'Requried')
                return false;
            }
            if (vm.empAdd.JDEmploymentId == undefined) {
                $scope.showMsg('error', 'Please Select EmployeeType', 'Requried')
                return false;
            }
            if (vm.empAdd.JDEmpGradeId == undefined) {
                $scope.showMsg('error', 'Please Select Grade', 'Requried')
                return false;
            }
            if (vm.empAdd.JDEmpLevelId == undefined) {
                $scope.showMsg('error', 'Please Select Level', 'Requried')
                return false;
            }
            return true;


        }
        function _saveForm() {
        //    alert(vm.empAdd.JDDate)
            var date=new Date(vm.empAdd.JDDate);
            var month=date.getMonth()+1;
            var doj=month +"/"+date.getDate()+"/" +date.getFullYear();

            if (_validateField()) {

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
                    JDDate:doj,
                    JDDeptId: vm.empAdd.JDDeptId,
                    JDDesgId: vm.empAdd.JDDesgId,
                    JDEmploymentId: vm.empAdd.JDEmploymentId,
                    JDEmpGradeId: vm.empAdd.JDEmpGradeId,
                    JDEmpLevelId: vm.empAdd.JDEmpLevelId,
                }
                var personal = {
                    PdGenderId: vm.empAdd.PdGenderId,
                    PdMobileNo: vm.empAdd.PdMobileNo,
                    PDOtherNumber:vm.empAdd.PDOtherNumber
                }
                var employeeData = { basic: basic, job: job, personal: personal };
                pageService.create(JSON.stringify(employeeData)).then(_createSuccessResult, _createErrorResult)
            }
        }
        function _createSuccessResult(result) {
            //   alert(JSON.stringify(result))
            $scope.showMsg('success', 'Employee Saved Successfully');
            $state.go('organization.employees.list');
        }
        function _createErrorResult(error) {

        }
        _loadController();
    }
})();
