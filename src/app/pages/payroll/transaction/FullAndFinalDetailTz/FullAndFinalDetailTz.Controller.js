/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetailTz')
    .controller('payFullAndFinalDetailTzController', payFullAndFinalDetailTzController);

  /** @ngInject */
  function payFullAndFinalDetailTzController($scope, $state, pageService, editFormService) {
    console.log('payFullAndFinalDetailTzController')

    var vm = this;
    vm.pageId = 472;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.showEditForm = true;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      enableAutoRefresh: true,
      showDataOnLoad: true,
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult
    }
    function _dataResult(result) {
      console.log(result)
    }

    function _pageResult(result) {
      console.log(result);
    }

    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = false;
      $scope.page.refreshData();
    }
    function _closeForm() {
      $scope.showEditForm = true;
      $scope.showOnClick = false;
      $scope.page.refreshData();
    }

  }

})();
