

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
              
   
        var vm = this;
         var col={
      text:"Email",
      type:"email",
      propColName:null,
      required:true,
      place:"Email",
      maxLength:50
    }
$scope.email=col;
        var columnIds = ['132', '667', '674', '192', '668', '743', '744'];
        vm.pageId=25;
        vm.empAdd = {};
        //end of local variable

        //private function
        vm.saveForm = _saveForm;
       //end of private function
      

        //page load 
        function _loadController() {
            $timeout(function () {
                pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
                pageService.getFieldSetting(vm.pageId).then(_getFieldSettingSuccessResult, _getFieldSettingErrorResult)
            });
        }
        function _getAllSelectSuccessResult(result) {          
            vm.dropDownList=result;         
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

       
        // save employee form
        function _saveForm(data) {      
            var date=new Date(vm.empAdd.JDDate);
            var month=date.getMonth()+1;
            var doj=month +"/"+date.getDate()+"/" +date.getFullYear();       
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
        function _createSuccessResult(result) {     
            if(result.success_message=='success')
            {
            $scope.showMsg('success', 'Employee Saved Successfully');
            $state.go('organization.employees.list');
            }
            else
            {
            $scope.showMsg('error', result);
            }
        }
        function _createErrorResult(error) {
        }
        // save employee form

        //page load function
        _loadController();
    }
})();
