/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('signatureController', signatureController);

    /** @ngInject */
    function signatureController($scope, dialogModal, editFormService) {
        //    console.log($state)

        $scope.saveSignatory = _saveForm;
        $scope.companyList = [];
        $scope.oldEntity = {};

        function _saveForm() {
            console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(494, $scope.entity,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
            // }
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {

            $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }
    }

})();
