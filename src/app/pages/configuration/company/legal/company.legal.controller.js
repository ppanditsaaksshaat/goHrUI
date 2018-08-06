/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('legalController', legalController);

    /** @ngInject */
    function legalController($scope, dialogModal) {
        //    console.log($state)
        var vm = this;
        var ctrl = this;
        $scope.saveSignatory = _saveForm;
        $scope.companyList = [];
        console.log('legel controller')

        $scope.companyList.push({ name: 'Saaksshaat Infotech' });

        $scope.comp = { name: 'Saaksshaat Infotech' };
        $scope.edtiCompanyName = function () {

            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-company-name.html'
            })

        };
        $scope.addNewSignatory = function () {
            console.log('add signature')
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-signatory.html',
                size: 'top-center-600'
            })
        }
        $scope.addBankAccount = function () {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-bank-account.html',
                size: 'top-center-600'
            })
        }
        $scope.updateEntity = function () {
            $scope.modalInstance.$dismiss();
        }

        function _saveForm() {
            console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm($scope.pageid, $scope.entity,
                $scope.oldEntity, $scope.action, 'Save')
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
