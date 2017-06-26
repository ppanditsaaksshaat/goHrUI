/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.employeeleaveapplication')
    .controller('EmpLeaveAppController', EmpLeaveAppController);

  /** @ngInject */
  function EmpLeaveAppController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr, $filter) {

    var vm = this;
    var pageId = 157;
    var queryId = 530;
    var sanctionLeavePageId = 285;
    var leaveControlTableId = 273;
    var leaveControlPageId = 261;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.validate = _validate;
    $scope.appliedDays = _appliedDays;
    // $scope.getLeaveTypeAccordingLeaveControl = _getLeaveTypeAccordingLeaveControl;

    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 157;

    // $scope.saveForm = _saveForm;
    // $scope.approvedLeave = _approvedLeave;
    // $scope.employeeOnChange = _employeeOnChange;
    $scope.oldEntity = {};
    var leaveTableId = 163;

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
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }

    function _loadController() {
      $scope.entity.LEADFromHalfDayId = 2;
      $scope.entity.LEADToHalfDayId = 2;

    }

    function _appliedDays() {
      var appliedDays = 0;
      var isFromHalfDay = false;
      var isToHalfDay = false;
      if ($scope.entity.LEADDateFrom != undefined && $scope.entity.LEADDateTo != undefined && $scope.entity.LEADToHalfDayId != undefined && $scope.entity.LEADToHalfDayId != undefined) {

        var fromDate = moment($scope.entity.LEADDateFrom);
        var toDate = moment($scope.entity.LEADDateTo);
        appliedDays = toDate.diff(fromDate, 'days') + 1;
        if ($scope.entity.LEADFromHalfDayId == 0 || $scope.entity.LEADFromHalfDayId == 1) {
          appliedDays = appliedDays - 0.5;
          isFromHalfDay = true;
        }
        else {
          if (isFromHalfDay) {
            appliedDays = appliedDays + 0.5;
            isFromHalfDay = false;
          }
        }
        if ($scope.entity.LEADToHalfDayId == 0 || $scope.entity.LEADToHalfDayId == 1) {
          appliedDays = appliedDays - 0.5;
          isToHalfDay = true;
        }
        else {
          if (isToHalfDay) {
            appliedDays = appliedDays + 0.5;
            isToHalfDay = false;
          }
        }
        vm.appliedDays = appliedDays;
      }
    }
    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
      $scope.isLeaveTransactionTable = false;
      $scope.isLeaveApprovedDet = false;


    }

    function _validate() {


      var searchLists = [];
      var searchListData = {
        field: 'ELTEmpId',
        operand: '=',
        value: $scope.entity.selectedEmp.value
      }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _getCustomQueryErrorResult(err) {
      alert(err)
    }
    function _getCustomQuerySuccessResult(result) {
      queryId = 534;
      $scope.showLeave = result;
      console.log(result)
      if (result != "NoDataFound") {

        var searchLists = [];
        var searchListData = {
          field: 'LRCGroupIds',
          operand: '=',
          value: $scope.entity.selectedEmp.EmpGroupId
        }
        searchLists.push(searchListData)
        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, queryId).then(_getLeaveDebitSuccessResult, _getLeaveCreditErrorResult)
      }
      else {
        vm.validateEmployee = false;
      }
    }

    function _getLeaveDebitSuccessResult(result) {
      console.log(result)
      if (result != "NoDataFound") {
        var balLeave = vm.appliedDays;
        angular.forEach($scope.showLeave, function (leave) {
          angular.forEach(result, function (groupLeave) {
            if (leave.LTName == groupLeave.LTName) {
              if (leave.LeaveBalance > 0) {
                 for(var bal=0; bal<baleave; balLeave++){
                     if(groupLeave.LRCDRMinDays>=baleave){

                     }   
                 }
              }

            }
          })

        })
      }

    }
    function _getLeaveCreditErrorResult(err) {
      alert(JSON.stringify(err));
    }

    _loadController();

  }
})();
