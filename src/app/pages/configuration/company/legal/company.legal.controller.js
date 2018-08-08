/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('legalController', legalController);

    /** @ngInject */
    function legalController($scope, dialogModal, editFormService, pageService) {
        //    console.log($state)
        var vm = this;

        $scope.companyList = [];
        $scope.entity = {};
        $scope.oldEntity = {};

        $scope.entity.company = {};
        $scope.entity.incomeTax = {};
        $scope.entity.pFDetail = {};
        $scope.entity.esiDetail = {};

        $scope.addCompany = _addCompany;
        $scope.addIncomeTax = _addIncomeTax;
        $scope.addPFDetail = _addPFDetail;
        $scope.addESIDetail = _addESIDetail;

        var companyPageId = 347;
        var companyTableId = 343;

        var incomeTaxPageId = 497;
        var incomeTaxTableId = 500;

        var pfPageId = 498;
        var pfTableId = 501;

        var esiPageId = 499;
        var esiTableId = 502;

        $scope.companyList.push({ name: 'Saaksshaat Infotech' });

        function _loadController() {
            // pageService.getPagData(347).then(_getPageSuccessResult, _getPageErrorResult)
            // pageService.getPagData(497).then(_getPageSuccessResult, _getPageErrorResult)
            // pageService.getPagData(498).then(_getPageSuccessResult, _getPageErrorResult)
            // pageService.getPagData(499).then(_getPageSuccessResult, _getPageErrorResult)
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getTableData(companyTableId, companyPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(incomeTaxTableId, incomeTaxPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(pfPageId, pfTableId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(esiPageId, esiTableId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }

        function _getTableDataSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;
            if (result.pageinfo != undefined) {
                if (result[0].CCOId != 347) {
                    // ITDId
                    // CCOId
                    // PFDId
                    // ESIId

                    $scope.entity.company = result[0]
                    console.log($scope.entity.company)
                }
                if (result[0].ITDId == 497) {
                    $scope.entity.incomeTax = result[0]
                    console.log($scope.entity.company)
                }
                if (result[0].PFDId == 498) {
                    $scope.entity.pFDetail = result[0]
                    console.log($scope.entity.company)
                }
                if (result[0].ESIId == 499) {
                    $scope.entity.esiDetail = result[0];
                    console.log($scope.entity.company)
                }

            }

            // $scope.entity.company = {};
            // $scope.entity.incomeTax = {};
            // $scope.entity.pFDetail = {};
            // $scope.entity.esiDetail = {};
        }

        function _getTableDataErrorResult(err) {
            console.log(err)
        }




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

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {
            $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }

        function _addCompany() {
            console.log('save record')
            console.log($scope.entity)
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(347, $scope.entity.company,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
            // }
        }

        function _addIncomeTax() {
            console.log('save record')
            console.log($scope.entity)
            editFormService.saveForm(497, $scope.entity.incomeTax,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
        }

        function _addPFDetail() {
            console.log('save record')
            console.log($scope.entity)
            editFormService.saveForm(498, $scope.entity.pFDetail,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
        }
        function _addESIDetail() {
            editFormService.saveForm(499, $scope.entity.esiDetail,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
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

        _loadController();
    }

})();
