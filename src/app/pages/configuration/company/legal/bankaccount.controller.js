/**
 * @author NKM
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('bankAccountController', bankAccountController);

    /** @ngInject */
    function bankAccountController($scope, dialogModal, editFormService, pageService, $rootScope) {
        //    console.log($state)
        var vm = this;

        $scope.addBankAccount = _saveForm;
        $scope.companyList = [];
        $scope.oldEntity = {};
        $scope.entity = {};

        var bankPageId = 496;

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }



        function _loadController() {
            pageService.getPagData(bankPageId).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;

        }

        function _getPageErrorResult(err) {
            console.log(err)
        }

        function _saveForm() {
            console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(496, $scope.entity,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
            // }
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $rootScope.showMsg("success", "Record Save Successfully");
            }
            _childmethod();
            $scope.$close();
            // $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            $scope.$close();
            alert('error')
        }
        _loadController()
    }

})();
