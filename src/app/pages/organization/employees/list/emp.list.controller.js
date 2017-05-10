/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.list')
    .controller('emplistController', emplistController);

  /** @ngInject */
  function emplistController($scope, $state, $timeout, pageService) {
    console.log('emplistController controller')
    var vm = this;
    var pageId = 25;
    var currentState = $state.current;
    $scope.gridOptions = {};
    $scope.pageTitleText = currentState.sidebarMeta.pageTitle;
    $scope.refreshData = _refreshData;
    $scope.addRecord = _addRecord;
    $scope.editRecord = _editRecord;
    $scope.openView = _openView;
    $scope.gridOptions = $scope.getGridSetting();

    function _loadController() {
      $timeout(function () {
        pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      });
    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      $scope.setPage(result)
      $scope.pageTitleText = vm.page.pageinfo.title;
      $scope.gridOptions = $scope.gridSetupColumns($scope.gridOptions, result.pageinfo.columns, result);
      console.log($scope.gridOptions)
      _getTableData();
    }
    function _errorGetPage(err) {


    }
    function _getTableData() {

      var data = {
        searchList: [],
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.page.pageinfo.tableid,
        vm.page.pageinfo.pageid,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getTableSuccessResult, _getTableErrorResult)
    }
    function _getTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getTableSuccessResult(result) {
      $scope.isLoaded = true
      $scope.isLoading = false
      if (result == 'NoDataFound') {
        // uivm.showMsg('warning', 'No Record Found.');
      } else if (result.Errors !== undefined) {
        // uivm.showMsg('error', result.Message);
        // _startMsgTimer();
      }
      else {
        $scope.rows = result;
        $scope.gridOptions.data = result;
      }
    }

    function _refreshData() {
      _getTableData();
    }
    function _addRecord() {
      alert('add record called')
    }
    function _editRecord(row) {
      alert('edit called')
    }
    function _openView() {
      alert('view opened')
    }

    _loadController();
  }

})();
