/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.urm.permission')
        .controller('newPasswordController', newPasswordController);

    /** @ngInject */
    function newPasswordController($scope, $state, $stateParams, pageService, editFormService,$rootScope, param) {


        $scope.entity = {};
        var passRegx = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$');

        $scope.newPassword = _newPassword;

        function _newPassword(entity) {
            if (_validate(entity)) {
                entity.AspNetUserId = param.AspNetUserId;
                pageService.setNewPassword(entity).then(_setNewPasswordSuccess, _setNewPasswordError)
            }
        }
        function _setNewPasswordSuccess(result) {
            $scope.showMsg("success", "New Password Saved Successfully")
            $rootScope.modalInstance.dismiss();
        }
        function _setNewPasswordError(err) {

        }
        function _validate(entity) {
            if (entity.NewPassword == undefined || entity.NewPassword == '') {
                $scope.showMsg("error", "New password is required");
                return false;
            }
            if (entity.ConfirmPassword == undefined || entity.ConfirmPassword == '') {
                $scope.showMsg("error", "Confirm password is required");
                return false;
            }
            var pwd = passRegx.test(entity.NewPassword)
            if (!pwd) {
                $scope.showMsg("error", "Password must contain at least one uppercase character,  one special symbol,  one digit and minimum length 6")
                return false
            }
            if (entity.NewPassword != entity.ConfirmPassword) {
                $scope.showMsg("error", "Password and confirm password is not match");
                return false
            }
            return true;
        }
    }
})();


