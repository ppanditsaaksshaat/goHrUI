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
        $scope.setPassword = _setPassword;

        $rootScope.$on("CallParentMethod", function () {
            _loadController()
        });


        function _loadController() {
            var userData = {
                searchList: [{ field: 'UserEmpId', operand: '=', value: empId }],
                orderByList: []
            }
            pageService.getTableData(24, 19, '', '', false, userData)
                .then(function (result) {
                    console.log(result)
                    $scope.userResultData = result;
                })

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

        function _setPassword() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empoyeepas/empoyeepas.html',
                size: 'top-center-600',
                controller: 'employeePasContoller',
            })
        }
        _loadController();
    }
})();