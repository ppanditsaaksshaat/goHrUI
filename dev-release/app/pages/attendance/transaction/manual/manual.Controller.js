/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manual')
    .controller('attTransManualController', attTransManualController);

  /** @ngInject */
  function attTransManualController($scope, $state, $timeout, pageService) {

    var vm = this;
    var currentState = $state.current;


    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];

    this.applyFilter = _applyFilter;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = 320;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: true,
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
      fieldEvents: [{ name: 'AttDate', onChangeEvent: _funcDateChange }],
      uploadRecord: _uploadRecord
      // readonlyColumns: ['col1', 'col2']
    }

    console.log($scope.page)

    $scope.clearFormCommon = _clearFormCommon;
    $scope.closeForm = _closeForm;
    $scope.saveForm = _saveForm;

    // var fieldEvents = [];
    // fieFldEvents.push({ name: 'AttDate', onChangeEvent: _funcDateChange })
    function _funcDateChange(obj) {
      console.log(obj + 'call')
    }




    function _uploadRecord() {
      $state.go("attendance.transaction.upload");
    }
    function _validateForm(editForm) {
      return true;
    }
    function _saveForm(editForm) {
      if (_validateForm(editForm)) {
        console.log($scope.entity)
      }
    }
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
      var empId = row.entity.EmpId;
      $state.go("organization.employees.edit", { action: 'edit', empId: empId });
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
  }

})();
