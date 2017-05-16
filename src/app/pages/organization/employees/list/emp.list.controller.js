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

    var vm = this;
    var pageId = 25;
    var currentState = $state.current;


    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];

    this.refreshData = _refreshData;
    this.addRecord = _addRecord;
    this.editRecord = _editRecord;
    this.updateRecord = _updateRecord;
    this.viewRecord = _viewRecord;
    this.deleteRecord = _deleteRecord;
    this.openView = _openView;
    this.applyFilter = _applyFilter;

    $scope.page = {}
    $scope.page.gridOptions = $scope.getGridSetting();
    $scope.gridStyle = { width: 500, height: 450 }
    $scope.boxSetting = {
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true
    }

    function _loadController() {
      $timeout(function () {
        pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      });

      // vm.filterOpt.textbox = [];
      // vm.filterOpt.textbox.push({ value: '=', name: 'equal' });
      // vm.filterOpt.textbox.push({ value: '!=', name: 'not equal' });
      // vm.filterOpt.textbox.push({ value: 'like', name: 'like' });
      // vm.filterOpt.textbox.push({ value: 'notlike', name: 'not like' });
      // vm.filterOpt.textbox.push({ value: 'start', name: 'starts with' });
      // vm.filterOpt.textbox.push({ value: 'end', name: 'ends with' });
      // vm.filterOpt.textbox.push({ value: 'start', name: 'start with' });
      // vm.filterOpt.textbox.push({ value: 'isempty', name: 'empty' });
      // vm.filterOpt.textbox.push({ value: 'isnotempty', name: 'not empty' });

      // vm.filterOpt.select = [];
      // vm.filterOpt.select.push({ value: '=', name: 'equal' });
      // vm.filterOpt.select.push({ value: '!=', name: 'not equal' });
      // vm.filterOpt.select.push({ value: 'isempty', name: 'empty' });
      // vm.filterOpt.select.push({ value: 'isnotempty', name: 'not empty' });

    }
    function _successGetPage(result) {
      console.log(result)
      $scope.page = angular.extend($scope.page, result);
      console.log($scope.page)
      $scope.setPage(result)
      $scope.pageTitleText = $scope.page.pageinfo.title;
      $scope.page.gridOptions = $scope.gridSetupColumns($scope.page.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _getTableData();
    }
    function _errorGetPage(err) {
    }
    function _getTableData() {
      console.log(new Date())
      var data = {
        searchList: vm.searchList,
        orderByList: vm.orderByList
      }
      var tableData = pageService.getTableData(
        $scope.page.pageinfo.tableid,
        $scope.page.pageinfo.pageid,
        '', '',
        false, data);
      $scope.page.isLoaded = false
      $scope.page.isLoading = true
      $scope.page.gridOptions.data = []
      tableData.then(_getTableSuccessResult, _getTableErrorResult)
    }
    function _getTableErrorResult(err) {
      $scope.page.isLoaded = true
      $scope.page.isLoading = false
    }
    function _getTableSuccessResult(result) {
      console.log(new Date())
      $scope.page.isLoaded = true
      $scope.page.isLoading = false
      if (result == 'NoDataFound') {
        // uivm.showMsg('warning', 'No Record Found.');
      } else if (result.Errors !== undefined) {
        // uivm.showMsg('error', result.Message);
        // _startMsgTimer();
      }
      else {
        $scope.rows = result;
        $scope.page.gridOptions.data = result;
        console.log(new Date())
      }
    }
    function _refreshData() {
      _getTableData();
    }
    function _addRecord() {
      alert('add record called')
    }
    function _editRecord(row) {
      var empId = row.entity.EmpId;
      alert('_editRecord called:' + empId)
    }
    function _updateRecord(row) {
      var empId = row.entity.EmpId;
      alert('_updateRecord called:' + empId)
    }
    function _deleteRecord(row) {
      var empId = row.entity.EmpId;
      alert('_deleteRecord called:' + empId)
    }
    function _viewRecord(row) {
      var empId = row.entity.EmpId;
      alert('_viewRecord called:' + empId)
    }
    function _openView() {
      alert('view opened')
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
    $scope.onRowHover = function (row) {
      console.log(row)
    }
    _loadController();
  }

})();
