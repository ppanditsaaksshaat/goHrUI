/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee')
        .controller('employeeController', employeeController);

    /** @ngInject */
    function employeeController($scope, $rootScope, $stateParams, pageService, dialogModal) {

        var empId = $stateParams.empid;
        if (empId == undefined) {
            $scope.myProfile = true;
            empId = $rootScope.user.profile.empId;
        }
        else {
            $scope.myProfile = false;
        }
        $scope.userPassword = _userPassword;
        $scope.userRole = _userRole;

        function _loadController() {

            //  $scope.empBaicDetail = localStorageService.get("empBasicDetailKey");    
            var searchLists = [];

            searchLists.push({ field: 'EmpId', operand: '=', value: empId })

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 650).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            function _getCustomQuerySuccessResult(result) {
                console.log(result);
                $scope.empBaicDetail = result[0][0];
                //   $state.go("employee.summary")

            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }


        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.addEventListener('change', handleImage, false);
            fileInput.click();

        };
        function handleImage(e) {
            var reader = new FileReader();
            console.log(e)
            reader.readAsDataURL(e.target.files[0], $scope);
            reader.onload = function (event) {
                $scope.picture = reader.result;
            }
        }

        function _userPassword() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/emppassword/password.html',
                size: 'top-center-600',
                controller: 'empPasswordController',
            })

        }
        function _userRole() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/emprole/role.html',
                size: 'top-center-600',
                controller: 'empRoleController',
            })
        }
        _loadController();
    }
})()