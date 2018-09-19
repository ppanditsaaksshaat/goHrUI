

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('employeePasContoller', employeePasContoller);

    /** @ngInject */
    function employeePasContoller($scope, $timeout, $stateParams, pageService, editFormService, param) {
        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

        $scope.entity = {};
        $scope.newRegister = true;
        var regx = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$');


        // $scope.goToList = _goToList;
        $scope.register = _register;
        $scope.change = _change;


        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'UserEmpId', operand: '=', value: empId })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(24, 19, '', '', false, data).then(_getTableSuccessResult, _getTableErrorResult)
        }
        function _getTableSuccessResult(result) {
            console.log(result)
            if (result != 'NoDataFound') {
                $scope.newRegister = false;
                $scope.entity.UserName = result[0].UserName;
                $scope.entity.AspNetUserId = result[0].AspNetUserId
            }
        }
        function _getTableErrorResult(err) {
            //console.log(err)
        }

        // function _goToList() {
        //     $state.go("organization.employees.list");
        // }

        function _register(entity) {
            if (entity.UserName == undefined) {
                $scope.showMsg("error", "UserName is Required");

            }
            else if (entity.Password == undefined) {
                $scope.showMsg("error", "Password is Required");
            }
            else if (entity.ConfirmPassword == undefined) {
                $scope.showMsg("error", "Confirm Password is Required");
            }
            else if (!(entity.UserName.length >= 6 && entity.UserName.length <= 10)) {
                $scope.showMsg("error", "UserName must be contain 6 to 10 Characters long");
                return false
            }
            else if (entity.Password != entity.ConfirmPassword) {
                $scope.showMsg("error", "Password and confirm password is not match");
            }

            else {
                var validate = regx.test(entity.Password);
                if (validate) {
                    entity.EmpId = empId;
                    entity.Email = empId + '@itsl.in';
                    entity.FirstName = '';
                    entity.LastName = '';
                    entity.Mobile = '';
                    pageService.userRegister(entity).then(_userRegisteSuccess, _userRegisterError)
                }
                else {
                    $scope.showMsg("error", "Password must contain at least one uppercase character,  one special symbol,  one digit and minium length 6")
                }
            }
        }
        function _userRegisteSuccess(result) {
            $scope.newRegister = false;
            _childmethod();
            $scope.showMsg("success", "User Registered Successfully");
            $scope.entity.ConfirmPassword = undefined;

        }
        function _userRegisterError(err) {
            console.log(err)
        }
        function _change(entity) {
            if (entity.NewPassword == undefined) {
                $scope.showMsg("error", "New password is Required");

            }
            else if (entity.ConfirmPassword == undefined) {
                $scope.showMsg("error", "Confirm password is Required");
            }
            else if (entity.NewPassword != entity.ConfirmPassword) {
                $scope.showMsg("error", "New and confirm password is not match");
            }
            else {
                var validate = regx.test(entity.NewPassword);
                if (validate) {
                    entity.EmpId = empId;
                    pageService.setNewPassword(entity).then(_setNewPasswordSuccess, _setNewPasswordError)
                }
                else {
                    $scope.showMsg("error", "Password must contain at least one uppercase character,  one special symbol,  one digit and minium length 6")
                }
            }
        }

        function _setNewPasswordSuccess(result) {
            console.log(result)
            if (result.status == 200) {
                _childmethod();
                $scope.showMsg("success", "New Password Set Successfully");
                $scope.entity.NewPassword = undefined;
                $scope.entity.ConfirmPassword = undefined;

            }

        }
        function _setNewPasswordError(err) {
            console.log(err)
            alert(JSON.stringify(err));

        }

        _loadController();
    }

})();