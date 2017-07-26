/**
 * @author SBP
 * created on 25.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.company')
        .controller('addCompanyController', addCompanyController);

    /** @ngInject */
    function addCompanyController($scope, pageService, editFormService, $state) {
        console.log('this controller')
        var vm = this;
        var companyPageId = 347;
        $scope.entity = {};

        $scope.saveCompany = _saveCompany;

        function _loadController() {
            pageService.getPagData(companyPageId).then(_successCompanyGetPageData, _errorCompanyGetPageData)

        }
        function _successCompanyGetPageData(result) {
            console.log(result);
            $scope.companyPage = result;
            $scope.companyPage.isAllowEdit = true;
        }
        function _errorCompanyGetPageData(err) {

        }
        function _saveCompany(entity, editForm) {
            // console.log(entity);
            _formSave(entity, $scope.companyPage.pageinfo.pageid, 'create', {}, editForm, true, $scope.companyPage.pageinfo.title)

        }

        function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation, title) {
            editFormService.saveForm(pageId, entity, oldEntity,
                action, title, editForm, showConfirmation)
                .then(_saveSuccessResult, _saveErrorResult)
        }
        function _saveSuccessResult(result) {
            console.log(result);
            $scope.showMsg("success",result.success_message);
            $state.go("organization.company.list");
        }
        function _saveErrorResult(err) {
            console.log(err);
        }
        _loadController();
    }
})();
