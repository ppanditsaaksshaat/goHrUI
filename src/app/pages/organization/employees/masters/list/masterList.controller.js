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

    this.refreshData = _refreshData;
    this.addRecord = _addRecord;
    this.editRecord = _editRecord;
    this.updateRecord = _updateRecord;
    this.viewRecord = _viewRecord;
    this.deleteRecord = _deleteRecord;
    this.openView = _openView;
    this.applyFilter = _applyFilter;
    this.uploadRecord = _uploadRecord;

    $scope.page = {}
    $scope.page.gridOptions = $scope.getGridSetting();
    $scope.gridStyle = { width: 500, height: 450 }
    $scope.boxSetting = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false
    }

    function _loadController() {
      $timeout(function () {
        pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      });
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
      var param = { name: tempName, action: 'create', pageId: pageId };
      var options = {
        url: 'app/pages/organization/employees/masters/add/add-vertical.html',
        controller: 'OrgMastersAddController1', controllerAs: 'addCtrl',
        param: param
      }
      dialogModal.open(options);
    }
    function _editRecord(row) {
      var entity = row.entity;

      var param = { name: tempName, action: 'edit', pageId: pageId, pkId: entity[$scope.page.pageinfo.idencolname] };
      var options = {
        url: 'app/pages/organization/employees/masters/add/add-vertical.html',
        controller: 'OrgMastersAddController1', controllerAs: 'addCtrl',
        param: param
      }
      dialogModal.open(options);
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
      var entity = row.entity;

      var param = { name: tempName, action: 'edit', pageId: pageId, pkId: entity[$scope.page.pageinfo.idencolname] };
      var options = {
        url: 'app/pages/organization/employees/masters/detail/detail.html',
        controller: 'OrgMastersAddController1', controllerAs: 'addCtrl',
        param: param
      }
      dialogModal.openCorner(options);
    }
    function _openView() {
      alert('view opened')
    }
    function _uploadRecord() {
      $state.go('organization.employees.upload')
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
