/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('OrgMastersListController1', OrgMastersListController1);

  /** @ngInject */
  function OrgMastersListController1($scope, $state, $stateParams, $timeout, pageService, dialogModal) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;

    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    var locationPageId = 34;
    var branchPageId = 109;
    var subUnitPageId = 111;
    var bankBranchPageId = 37;


    $scope.page = $scope.createPage();
    $scope.page.pageId = $stateParams.pageId;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      gridHeight: 450,
      enableAutoRefresh: true,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null,
      buttonPermission: true
    }



    function _loadController() {
      pageService.getPagData(locationPageId).then(
        _getLocationPageDataSuccessResult, _getLocationPageDataErrorResult);
    }

    function _getLocationPageDataSuccessResult(result) {
      if (result.pageinfo.selects.CountryId[1].IsDefault) {
        $scope.countryId = result.pageinfo.selects.CountryId[1].value
      }
      if (result.pageinfo.selects.StateId[1].IsDefault) {
        $scope.stateId = result.pageinfo.selects.StateId[1].value
      }
      if (result.pageinfo.selects.LocationCityId[1].IsDefault) {
        $scope.cityId = result.pageinfo.selects.LocationCityId[1].value
      }
      if (result.pageinfo.selects.LocationCCOId[0].IsDefault) {
        $scope.companyId = result.pageinfo.selects.LocationCCOId[0].value
      }

      pageService.getPagData(branchPageId).then(
        _getBranchPageDataSuccessResult, _getBranchPageDataErrorResult);
    }

    function _getLocationPageDataErrorResult(result) {

    }

    function _getBranchPageDataSuccessResult(result) {
      if (result.pageinfo.selects.BRLocationId[2].IsDefault) {
        $scope.branchLocationId = result.pageinfo.selects.BRLocationId[2].value
      }

      pageService.getPagData(bankBranchPageId).then(
        _getBankPageDataSuccessResult, _getBankPageDataErrorResult);

    }

    function _getBranchPageDataErrorResult(error) {

    }

    function _getBankPageDataSuccessResult(result) {
      if (result.pageinfo.selects.BranchAreaId[1].IsDefault) {
        $scope.branchAreaId = result.pageinfo.selects.BranchAreaId[1].value
      }
      if (result.pageinfo.selects.CityId[1].IsDefault) {
        $scope.cityId = result.pageinfo.selects.CityId[1].value
      }


      pageService.getPagData(subUnitPageId).then(
        _getSubUnitPageDataSuccessResult, _getSubUnitDataErrorResult);

    }

    function _getBankPageDataErrorResult(error) {

    }


    function _getSubUnitPageDataSuccessResult(result) {

      if (result.pageinfo.selects.LocationId[2].IsDefault) {
        $scope.subUnitLocationId = result.pageinfo.selects.LocationId[2].value
      }
      if (result.pageinfo.selects.SUBranchId[2].IsDefault) {
        $scope.branchId = result.pageinfo.selects.SUBranchId[2].value
      }

      $scope.page.boxOptions.defaultEntity = {
        'CountryId': $scope.countryId,
        'StateId': $scope.stateId,
        'LocationCityId': $scope.cityId,
        'BRLocationId': $scope.branchLocationId,
        'LocationId': $scope.subUnitLocationId,
        'SUBranchId': $scope.branchId,
        'LocationCCOId': $scope.companyId,
        'BranchAreaId': $scope.branchAreaId,
        'CityId': $scope.cityId

      }
    }

    function _getSubUnitDataErrorResult(errorResult) {

    }




    function _applyFilter() {
      console.log($scope.page.pageinfo.filters);
      vm.searchList = [];
      angular.forEach($scope.page.pageinfo.filters, function (filter) {

        if (filter.showFilter !== undefined) {
          if (filter.showFilter) {
            if (filter.value !== undefined) {
              var search = {};
              search.field = filter.name;
              search.operand = filter.operator;
              search.value = filter.value;
              vm.searchList.push(search)
            }
          }
        }
      })

      this.refreshData();

    }

    _loadController();
  }

})();