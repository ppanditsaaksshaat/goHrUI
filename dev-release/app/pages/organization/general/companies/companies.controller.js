/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.general.companies')
    .controller('companiesController', companiesController);

  /** @ngInject */
  function companiesController($scope, pageService) {
    console.log('this controller')
    var vm = this;
    var companyPageId = 347;
    var locationPageId = 34;
    var branchPageId = 109;
    var subUnitPageId = 111;
    $scope.entity = {};

    $scope.saveWizardForm = _saveWizardForm;

    function _loadController() {

      pageService.getPagData(companyPageId).then(_successCompanyGetPageData, _errorCompanyGetPageData)
      pageService.getPagData(locationPageId).then(_successLocationGetPageData, _errorLocationGetPageData)
      pageService.getPagData(branchPageId).then(_successBranchGetPageData, _errorBranchGetPageData)
      pageService.getPagData(subUnitPageId).then(_successSubUnitGetPageData, _errorSubUnitGetPageData)
    }
    function _successCompanyGetPageData(result) {
      console.log(result);
      $scope.companyPage = result;
      $scope.companyPage.isAllowEdit = true;
    }
    function _errorCompanyGetPageData(err) {

    }
    function _successLocationGetPageData(result) {
      console.log(result);
      $scope.locationPage = result;
      $scope.locationPage.isAllowEdit = true;
    }
    function _errorLocationGetPageData(err) {

    }
    function _successBranchGetPageData(result) {
      console.log(result);
      $scope.branchPage = result;
      $scope.branchPage.isAllowEdit = true;
    }
    function _errorBranchGetPageData(err) {

    }
    function _successSubUnitGetPageData(result) {
      console.log(result)
      $scope.subUnitPage = result;
      $scope.subUnitPage.isAllowEdit = true;
    }
    function _errorSubUnitGetPageData(err) {

    }

    function _saveWizardForm(entity) {
      alert('satyendra')
    }
    _loadController();
  }
})();
