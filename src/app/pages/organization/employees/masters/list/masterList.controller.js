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
      uploadRecord: null
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
  }

})();
