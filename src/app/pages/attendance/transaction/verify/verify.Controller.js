/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verify')
    .controller('attTransverifyController', attTransverifyController);

  /** @ngInject */
  function attTransverifyController($scope, $state, $timeout, pageService, dialogModal, toastr, toastrConfig) {

    var vm = this;
    var currentState = $state.current;
    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    vm.pageId = 444;
    vm.tableId = 419;
    vm.queryId = 520;
    vm.showVerifyAttendance = true;

    this.applyFilter = _applyFilter;


    // this.uploadRecord = _uploadRecord;



    /**For all list of verify attendance grid setting */
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    // $scope.page.searchList = [];
    // $scope.page.searchList.push({ field: 'Month', operand: '=', value: moment().format('MM') })
    // $scope.page.searchList.push({ field: 'VAYear', operand: '=', value: moment().format('YYYY') })
    // $scope.page.searchList.push({ field: 'VADepartmentId', operand: '=', value: -1 })
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showDataOnLoad: false,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      noResultMessageText: 'Please use filter to show data.',
      enableAutoRefresh: true,
      selectedRowButtons: [{ text: "Verify", icon: '', onClick: _verifyAttendance, type: "btn-default", defaultButton: false }],
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult


      // readonlyColumns: ['col1', 'col2']
    }
    /**End of For all list of verify attendance grid setting */

    // $scope.page.boxOptions.customColumns = [];
    // $scope.page.boxOptions.customColumns.push({ text: 'Verify', name:'verify', click: _verifyRow, type: 'a', pin: false })


    $scope.editPage = $scope.createPage();
    $scope.editPage.pageId = 320;

    $scope.editPage.boxOptions = {
      selfLoading: true,
      showRefresh: false,
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
      customButtons: [{ text: "Close", icon: '', onClick: _close, type: "btn-danger" }],
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

    function _pageResult(result) {
      angular.forEach(result.pageinfo.filters, function (filter) {
        if (filter.name == 'Month') {
          filter.value = parseInt(moment().format('MM'));
        }
        if (filter.name == 'Year') {
          filter.value = parseInt(moment().format('YYYY'));
        }
        if (filter.name == 'VADepartmentId') {
          filter.value = -1;
          filter.disabled = true;
        }
      })
    }

    function _dataResult(result) {
      if (result[0].Error == "Salary Cycle not found") {
        $scope.page.gridOptions.data = [];
        $scope.page.boxOptions.noResultMessageText = result[0].Error;
      }
    }


    /**Close edit list */
    function _close() {
      vm.showVerifyAttendance = true;
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

      console.log(row)
      /**For list of edit verify attendance grid setting */
      vm.showVerifyAttendance = false
      var startDate = "", endDate = "";
      if ($scope.page.filterData === undefined) {
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate = moment().endOf('month').format('YYYY-MM-DD');

      }
      else {

        var sDate = $scope.page.filterData.Month.value + "-" + 1 + "-" + $scope.page.filterData.Year.value;
        startDate = moment(sDate).startOf('month').format('YYYY-MM-DD');
        endDate = moment(sDate).endOf('month').format('YYYY-MM-DD');
      }

      $scope.editPage.searchList = [{ field: "EmpId", operand: "=", value: row.entity.EmpId }, { field: "AttDate", operand: ">=", value: startDate }, { field: "AttDate", operand: "<=", value: endDate }];
      $scope.editPage.orderByList = [{ column: 'AttDate', isDesc: false }]
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

    function _verifyRow(row) {

    }
    /**Verify attendance according to row selection */
    function _verifyAttendance() {

      var searchLists = [];
      var empIds = "";
      var startDate = "";
      var endDate = "";

      angular.forEach($scope.page.selectedRows, function (data) {
        empIds += data.EmpId + ",";
      });

      var empId = empIds.substring(0, empIds.length - 1)
      if ($scope.page.filterData === undefined) {
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate = moment().endOf('month').format('YYYY-MM-DD');
      }
      else {

        var sDate = $scope.page.filterData.Month.value + "-" + 1 + "-" + $scope.page.filterData.Year.value;
        startDate = moment(sDate).startOf('month').format('YYYY-MM-DD');
        endDate = moment(sDate).endOf('month').format('YYYY-MM-DD');
      }
      var searchListData = {
        field: 'EmpIds',
        operand: '=',
        value: empId
      }
      searchLists.push(searchListData)
      searchListData = {
        field: 'FromDate',
        operand: '=',
        value: startDate

      }
      searchLists.push(searchListData)
      searchListData = {
        field: 'EndDate',
        operand: '=',
        value: endDate
      }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }


      pageService.getCustomQuery(data, vm.queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _getCustomQuerySuccessResult(result) {

      if (result[0].emp == 1 && result[0].sum == 1) {
        $scope.showMsg("success", "Verify Successfully")
        $scope.page.refreshData();
      }
    }
    function _getCustomQueryErrorResult(err) {

    }
    /**End of Verify attendance according to row selection */
  }

})();
