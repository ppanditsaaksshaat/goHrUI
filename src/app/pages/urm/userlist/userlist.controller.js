/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.urm.permission')
        .controller('userListController', userListController);

    /** @ngInject */
    function userListController($scope, $state, $stateParams, pageService, editFormService, dialogModal) {



        $scope.entity = {};

        var passRegx = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$');

        $scope.addRecord = _addRecord;
        $scope.userRegister = _userRegister;
        $scope.refresh = _refresh;
        $scope.close = _close;
        $scope.newPassword = _newPassword;
        $scope.editRecord = _editRecord;
        $scope.userUpdate = _userUpdate;

        $scope.gridOptions = {
            enableCellEditOnFocus: true,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false
        }
        function _loadController() {
            $scope.gridOptions.columnDefs = [
                { name: 'UserName', displayName: 'UserName', width: 130, enableCellEdit: false },
                { name: 'FirstName', displayName: 'FirstName', width: 130, enableCellEdit: false },
                { name: 'LastName', displayName: 'LastName', width: 130, enableCellEdit: false },
                { name: 'UserSystemEmail', displayName: 'Email', width: 130, enableCellEdit: false },
                { name: 'Mobile', displayName: 'Mobile', width: 130, enableCellEdit: false },
                {
                    name: 'Edit',
                    width: 50,
                    cellEditableCondition: false,
                    cellTemplate: '<button class="btn btn-xs btn-primary" ng-click="grid.appScope.editRecord(row)">Edit</button>'
                },
                {
                    name: '-',
                    width: 130,
                    cellEditableCondition: false,
                    cellTemplate: '<button class="btn btn-xs btn-primary" ng-click="grid.appScope.newPassword(row)"> New Password</button>'
                }
            ]
            var searchList = [];
            searchList.push({ field: "UserEmpId", operand: "=", value: 0 })
            var data = {
                searchList: searchList,
                orderByList: []
            }

            pageService.getCustomQuery(data, 603).then(_customQuerySuccessResult, _customQueryErrorResult)
        }
        function _customQuerySuccessResult(result) {
            console.log(result)
            if (result != "NoDataFound") {
                $scope.gridOptions.data = result;
            }
        }
        function _customQueryErrorResult(err) {

        }

        function _getUserRole() {
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getCustomQuery(data, 15).then(_roleCustomQuerySuccessResult, _roleCustomQueryErrorResult)
        }
        function _roleCustomQuerySuccessResult(result) {
            if (result != "NoDataFound") {
                $scope.userRole = result;
            }
        }
        function _roleCustomQueryErrorResult(err) {

        }


        function _addRecord() {
            $scope.userlist = true;
            $scope.entity = {};
        }

        function _userRegister(entity) {

            if (_validate(entity, false)) {
                pageService.userRegister(entity).then(_userRegisteSuccess, _userRegisterError)
            }
        }

        function _userRegisteSuccess(result) {
            $scope.showMsg("success", "User Saved Successfull");
            $scope.userlist = false;
            $scope.entity = {};
            _loadController();
        }
        function _userRegisterError(err) {
            $scope.showMsg("error", (err.data.ModelState[""][0] != undefined ? err.data.ModelState[""][0] : "") + (err.data.ModelState[""][1] != undefined ? err.data.ModelState[""][1] : ""));
        }
        function _validate(entity, update) {
            var emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
            if (entity.FirstName == undefined || entity.FirstName == '') {
                $scope.showMsg("error", "First name is required");
                return false;
            }
            if (entity.LastName == undefined || entity.LastName == '') {
                $scope.showMsg("error", "Last name is required");
                return false;
            }
            if (entity.Email == undefined || entity.Email == '') {
                $scope.showMsg("error", "Email is required");
                return false;
            }
            if (entity.Mobile == undefined || entity.Mobile == '') {
                $scope.showMsg("error", "Mobile is required");
                return false;
            }
            if (entity.UserName == undefined || entity.UserName == '') {
                $scope.showMsg("error", "UserName is required");
                return false;
            }
            if (entity.Password == undefined || entity.Password == '') {
                $scope.showMsg("error", "Password is required");
                return false;
            }
            if (entity.ConfirmPassword == undefined || entity.ConfirmPassword == '') {
                $scope.showMsg("error", "Confirm password is required");
                return false;
            }
            if (entity.Role == undefined || entity.Role == '') {
                $scope.showMsg("error", "Please Select Role");
                return false;
            }

            var email = emailRegx.test(entity.Email)
            if (!email) {
                $scope.showMsg("error", "Please enter valid email");
                return false
            }
            if (!(entity.Mobile.length >= 10 && entity.Mobile.length <= 17)) {
                $scope.showMsg("error", "Mobile must be contain 10 to 17 Numeric long");
                return false
            }
            if (!(entity.UserName.length >= 6 && entity.UserName.length <= 10)) {
                $scope.showMsg("error", "UserName must be contain 6 to 10 Characters long");
                return false
            }
            var pwd = passRegx.test(entity.Password)
            if (!pwd && !update) {
                $scope.showMsg("error", "Password must contain at least one uppercase character,  one special symbol,  one digit and minimum length 6")
                return false
            }
            if (entity.Password != entity.ConfirmPassword && !update) {
                $scope.showMsg("error", "Password and confirm password is not match");
                return false
            }
            return true;

        }
        function _refresh() {
            _loadController();
        }
        function _close() {
            $scope.userlist = false;
            $scope.entity = {};
        }

        function _editRecord(row) {
            $scope.userlist = true;
            $scope.saveUpdateButton = true;
            $scope.userPwd = true;
            $scope.entity = row.entity;
            $scope.entity.Email = row.entity.UserSystemEmail;
            $scope.entity.Password = row.entity.UserPassword;
            $scope.entity.ConfirmPassword = row.entity.UserPassword;
            $scope.oldEntity = angular.copy($scope.entity);
        }
        function _newPassword(row) {

            var param = {
                AspNetUserId: row.entity.AspNetUserId
            }
            var options = {
                url: "app/pages/urm/userlist/password.modal.html",
                controller: "newPasswordController",
                controllerAs: "",
                param: param
            }
            dialogModal.open(options)
        }
        function _userUpdate(entity) {
            if (_validate(entity, true)) {
                if (!(angular.equals(entity, $scope.oldEntity))) {
                    pageService.updateUser(entity).then(_userUpdateSuccessResult, _userUpdateErrorResult)
                }
                else {
                    $scope.showMsg("info", "Nothing to update");
                }
            }
        }

        function _userUpdateSuccessResult(result) {
            $scope.showMsg("success", "Your user profile updated successfully")
        }
        function _userUpdateErrorResult(err) {
            $scope.showMsg("error", (err.data.ModelState[""][0] != undefined ? err.data.ModelState[""][0] : ""));
        }

        _loadController();
        _getUserRole();
    }
})();


