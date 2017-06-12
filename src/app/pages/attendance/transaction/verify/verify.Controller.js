/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verify')
    .controller('attTransverifyController', attTransverifyController);

  /** @ngInject */
  function attTransverifyController($scope, $state, $timeout, pageService, dialogModal) {

    var vm = this;
    var currentState = $state.current;
    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    vm.pageId = 444;
    vm.tableId = 419;
    vm.showVerifyAttendance = true;

    this.applyFilter = _applyFilter;
    // this.uploadRecord = _uploadRecord;

    /**For all list of verify attendance grid setting */
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.page.searchList = [];
    $scope.page.searchList.push({ field: 'VAMonth', operand: '=', value: moment().format('MM') })
    $scope.page.searchList.push({ field: 'VAYear', operand: '=', value: moment().format('YYYY') })
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
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
      addRecord: null,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      // readonlyColumns: ['col1', 'col2']
    }
    /**End of For all list of verify attendance grid setting */

    $scope.editPage = $scope.createPage();
    $scope.editPage.pageId = 320;

    $scope.editPage.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
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
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      // readonlyColumns: ['col1', 'col2']
    }



    $scope.resetFormCommon = _resetFormCommon;
    $scope.clearFormCommon = _clearFormCommon;
    $scope.closeForm = _closeForm;
    $scope.saveForm = _saveForm;


    function _loadController() {
      // var searchList = [];
      // var orderList = [];
      // var search = {};
      // search.field = "VAMonth";
      // search.operand = "=";
      // search.value = 6;

      // searchList.push(search)
      // search = {};
      // search.field = "VAYear";
      // search.operand = "=";
      // search.value = 2017;
      // searchList.push(search)

      // var a = { searchList: searchList, orderByList: orderList }
      // pageService.getTableData(vm.tableId, vm.pageId, undefined, false, undefined, searchList).then(_getTableDataSuccessResult, _getTableDataErrorResult)
    }

    function _getTableDataSuccessResult(result) {
      alert(JSON.stringify(result))
    }
    function _getTableDataErrorResult(error) {
      alert(JSON.stringify(error))
    }

    /**
     * 
     */
    function _validateForm(editForm) {
      _resetFormCommon()
      return true;
    }
    /**
     * 
     * @param {*kk} editForm 
     */
    function _saveForm(editForm) {
      if (_validateForm(editForm)) {
        console.log($scope.entity)
      }
    }
    /**
     * Reset all controls value 
     * @param {*from name from view} editForm 
     */
    function _resetFormCommon(editForm) {

    }
    function _clearFormCommon(editForm) {

    }
    function _closeForm(editForm) {
      $scope.showEditForm = false;
      $scope.entity = {};
    }
    function _addRecord() {
      // $state.go("attendance.transaction.add", "{action:'create'}");
      $scope.showEditForm = true;
    }
    function _editRecord(row) {
      /**For list of edit verify attendance grid setting */
      vm.showVerifyAttendance = false
      $scope.editPage.searchList = [{ field: "EmpId", operand: "=", value: row.entity.EmpId }];
      $scope.editPage.refreshData();
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
    // function _uploadRecord() {
    //   $state.go('organization.employees.upload')
    // }
    function _applyFilter() {
      console.log($scope.page.pageinfo.filters);
      $scope.page.searchList = [];
      angular.forEach($scope.page.pageinfo.filters, function (filter) {

        if (filter.showFilter !== undefined) {
          if (filter.showFilter) {
            if (filter.value !== undefined) {
              var search = {};
              search.field = filter.name;
              search.operand = filter.operator;
              search.value = filter.value;
              $scope.page.searchList.push(search)
            }
          }
        }
      })

      $scope.page.refreshData();

    }
    _loadController();
  }

})();
