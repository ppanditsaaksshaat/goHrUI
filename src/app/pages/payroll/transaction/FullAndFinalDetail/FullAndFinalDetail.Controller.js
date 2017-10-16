/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail')
    .controller('payFullAndFinalDetailController', payFullAndFinalDetailController);

  /** @ngInject */
  function payFullAndFinalDetailController($scope, $state) {
    var vm = this;
    vm.pageId = 471;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.close = _close;
    $scope.weekGridOptions = { enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false, paginationPageSize: 10 }



    // $scope.showEditForm = true;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
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
      debugger;
      $scope.showEditForm = true;
    }

    function _close() {
      $scope.showEditForm = false;
    }
  }

})();
