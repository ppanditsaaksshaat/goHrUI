/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('legalController', legalController);

    /** @ngInject */
    function legalController($scope, dialogModal, editFormService, pageService, $state, $filter, $rootScope, $uibModal) {
        //    console.log($state)
        var vm = this;

        $scope.companyList = [];
        var entity = { company: {}, incomeTax: {}, pFDetail: {}, esiDetail: {} };
        var oldEntity = angular.copy(entity);

        $scope.addCompany = _addCompany;
        $scope.addIncomeTax = _addIncomeTax;
        $scope.addPFDetail = _addPFDetail;
        $scope.addESIDetail = _addESIDetail;

        $scope.editSignatoryDetail = _editSignatoryDetail;
        $scope.editBankDetail = _editBankDetail;

        $scope.countryOnChange = _counrtyOnChange;
        $scope.stateOnChange = _stateOnChange;

        var companyPageId = 347;
        var companyTableId = 343;

        var incomeTaxPageId = 497;
        var incomeTaxTableId = 500;

        var pfPageId = 498;
        var pfTableId = 501;

        var esiPageId = 499;
        var esiTableId = 502;

        var bankTableId = 494;
        var bankPageId = 494;

        var signatoryTableId = 499;
        var signatoryPageId = 496;



        $scope.companyList.push({ name: 'Saaksshaat Infotech' });

        $rootScope.$on("CallParentMethod", function () {
            _loadController()
        });

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

            pageService.getTableData(pfTableId, pfPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(esiTableId, esiPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(signatoryTableId, signatoryPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getTableData(bankTableId, bankPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            pageService.getPagData(companyPageId).then(_getPageSuccessResult, _getPageErrorResult)
        }

        function _getTableDataSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;
            if (result.length > 0) {
                if (result[0].CCOId != undefined) {
                    entity.company = result[0]
                   
                    // $scope.oldEntity.company = result[0];
                }
                if (result[0].ITDId != undefined) {
                    entity.incomeTax = result[0]
                    // $scope.oldEntity.editIncomeTax = result[0];
                    // console.log($scope.oldEntity.editIncomeTax)
                }
                if (result[0].PFDId != undefined) {
                    entity.pFDetail = result[0]
                    // $scope.oldEntity.pFDetail = result[0];

                }
                if (result[0].ESIId != undefined) {
                    entity.esiDetail = result[0];
                    // $scope.oldEntity.esiDetail = result[0];
                }

                if (result[0].ASDId != undefined) {
                    $scope.employeeList = result;
                    // $scope.oldEntity.esiDetail = result[0];
                    console.log($scope.employeeList)
                }

                if (result[0].BADId != undefined) {
                    $scope.bankList = result;
                }
                oldEntity = angular.copy(entity);

                $scope.entity = entity;
                $scope.oldEntity = oldEntity;
            }
            // entity.company.CountryId = 1
            // $scope.entity = entity;

        }

        function _getTableDataErrorResult(err) {
            console.log(err)
        }

        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;
            
            $scope.stateList = $scope.pageInfo.selects.StateId;
            $scope.cityList = $scope.pageInfo.selects.CCOCityId;

        }

        function _getPageErrorResult(err) {
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
                size: 'top-center-600',
                controller: 'signatureController',
            })
        }

        $scope.addBankAccount = function () {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-bank-account.html',
                size: 'top-center-600',
                controller: 'bankAccountController',
            })
        }

        $scope.updateEntity = function () {
            $scope.modalInstance.$dismiss();
        }

        function _validateForm(form) {
            return true;
        }

        function _addCompany() {
            console.log('save record')
            console.log(entity)
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(companyPageId, entity.company, $scope.oldEntity.company,
                entity.company.CCOId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
            // }

            // editFormService.saveForm(pageId, newEntity, vm.oldEntity,
            //     entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
            //     .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
        }

        function _addIncomeTax() {
            console.log('save record')
            console.log(entity)
            editFormService.saveForm(incomeTaxPageId, entity.incomeTax, $scope.oldEntity.incomeTax,
                entity.incomeTax.ITDId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
        }

        function _addPFDetail() {
            console.log('save record')
            console.log(entity)
            editFormService.saveForm(pfPageId, entity.pFDetail, $scope.oldEntity.pFDetail,
                entity.pFDetail.PFDId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
        }
        function _addESIDetail() {
            editFormService.saveForm(esiPageId, entity.esiDetail, $scope.oldEntity.esiDetail,
                entity.esiDetail.ESIId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
        }

        function _saveFormSuccess(result) {
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $rootScope.showMsg("success", "Record Save Successfully");
            }
            else {
                if (result.success_message == "Record Updated.") {
                    $rootScope.showMsg("success", "Record Updated");
                }
            }
            _loadController();
            // $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }

        function _editSignatoryDetail(row) {
            console.log(row)
            console.log('emp upload')

            var modal = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-signatory.html',
                size: 'top-center-600',
                controller: 'signatureController',
                param: row
            });
            // modal.result.then(function (data) {
            //     console.log(data)
            //     if (data == "success") {
            //         // _loadController();
            //         // $scope.showMsg('success', 'Address Detail Updated');
            //     }
            // })
        }

        function _editBankDetail(row) {
            console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/configuration/company/legal/edit-bank-account.html',
                size: 'top-center-600',
                controller: 'bankAccountController',
                param: row
            });
        }

        function _counrtyOnChange(countryId) {
            $scope.stateList = [];
            $scope.cityList = [];
            var stateList = $filter("findAll")($scope.pageInfo.selects.StateId, countryId, "CountryId");
            if (stateList != null) {
                $scope.stateList = stateList;
            }
        }

        function _stateOnChange(stateId) {
            $scope.cityList = [];
            var cityList = $filter("findAll")($scope.pageInfo.selects.CCOCityId, stateId, 'StateId');
            if (cityList != null) {
                $scope.cityList = cityList;
            }
        }

        _loadController();
    }

})();
