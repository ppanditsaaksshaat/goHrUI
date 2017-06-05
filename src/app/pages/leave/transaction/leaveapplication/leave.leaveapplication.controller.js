/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leaveapplication')
    .controller('LeaveAppController', LeaveAppController);

  /** @ngInject */
  function LeaveAppController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 157;
    var sanctionLeavePageId = 285;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.closeForm = _closeForm;

    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 157;

    $scope.saveForm = _saveForm;
    $scope.approvedLeave = _approvedLeave;
    $scope.employeeOnChange = _employeeOnChange;
    $scope.oldEntity = {};
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
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
    }

    function _editRecord() {
      $scope.entity = row.entity;
      // $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
      // $state.go("leave.transaction.add", "{action:'create'}");
    }

    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }

    function _employeeOnChange() {
      $scope.isLeaveTransactionTable = false;
      var searchLists = [];
      var searchListData = {
        field: 'ELTEmpId',
        operand: '=',
        value: $scope.entity.LEADEmpId
        // value: 5
      }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      var queryId = 494;
      pageService.getCustomQuery(data, queryId).then(function (result) {
        console.log(result);
        if (result == 'NoDataFound') {

          // _showToast('info', ' Any leave type not avaible.', '');
          //  alert('No Leave Type Avaible')

          $scope.showMsg('error', 'Any leave type not avaible.');
          $scope.isLeaveTransactionTable = false;
        }
        else {
          $scope.leaveTypeDataList = result;
          $scope.totalCredit = parseInt(result[0].Creadit);
          $scope.totalDebit = parseInt(result[0].Debit);
          console.log(result)
          $scope.isLeaveTransactionTable = true;
        }
      });
    }

    function _validateForm(form) {
      if (angular.equals($scope.oldEntity, $scope.entity)) {
        _showToast('info', 'Nothing to save', '');
        return false;
      }

      return true;
    }

    function _editRecord(row) {

      console.log(row)

      $scope.entity = row.entity;
      // $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
      $scope.isLeaveApprovedDet = true;

    }

    function _saveForm(editForm) {
      // alert('save')
      // debugger;
      // if (_validateForm(editForm)) {

      // if ($scope.entity.LEADEmpId != "" && $scope.entity.LEADEmpId !== undefined) {

      if ($scope.entity.LEADDateFrom === undefined) {
        $scope.entity.LEADDateFrom = "";
      }
      if ($scope.entity.LEADDateTo === undefined) {
        $scope.entity.LEADDateTo = "";
      }
      var firstdate = $scope.entity.LEADDateFrom;
      var seconddate = $scope.entity.LEADDateTo;

      // var splitFirstDate = firstdate.split(' ')[0];
      // var splitSecondDate = seconddate.split(' ')[0];
      // console.log(splitFirstDate, splitSecondDate)
      // var dt1 = splitFirstDate.split('-')
      // var dt2 = splitSecondDate.split('-')
      // var one = new Date(dt1[2], dt1[0] - 1, dt2[1])
      // var two = new Date(dt2[2], dt2[0] - 1, dt2[1]);

      var one = new Date(firstdate)
      var two = new Date(seconddate);

      if (two >= one) {
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;
        console.log(days)
        Math.floor(days);

        // var totalCredit = 0;
        // var totalDebit = 0;
        var balanceLeave = 0;
        var leaveType = $scope.entity.LEADLTId;

        console.log($scope.entity.LEADLTId)
        if ($scope.searchEmployeeLeaveTransactionList === undefined) {
          $scope.searchEmployeeLeaveTransactionList = [];

        }
        $scope.searchEmployeeLeaveTransactionList = [];
        // _employeeOnChange()
        // $scope.searchEmployeeLeaveTransactionList = $scope.leaveTypeDataList;
        // console.log($scope.searchEmployeeLeaveTransactionList)
        // var leaveCredit = parseInt(value.ELTLeaveCr);
        // var leaveDebit = parseInt(value.ELTLeaveDr);

        // totalCredit = parseInt($scope.leaveTypeDataList.Creadit);
        // totalDebit = parseInt($scope.leaveTypeDataList.Debit);

        if ($scope.totalCredit >= $scope.totalDebit) {
          // debugger;
          balanceLeave = $scope.totalCredit - $scope.totalDebit;
          if (balanceLeave >= days) {
            // $scope.oldEntity = {};
            // $scope.action = 'create';
            // console.log($scope.entity, $scope.oldEntity, $scope.action)
            editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
              $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
            console.log($scope.page.pageinfo.pageid, $scope.entity,
              $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
            // $scope.showEditForm = false;
            // editFormService.saveForm($scope.pageId, $scope.entity, $scope.oldEntity, $scope.action, $scope.page.pageinfo.tagline)
          }
          else {
            $scope.showMsg('error', 'You Can Not Apply Leave because your leave is exta leave according to your balance Leave..');
            // alert('You Can Not Apply Leave.')
          }
        }
        else {
          $scope.showMsg('error', 'Your leave is exta leave according to your balance Leave.');
          // alert('Your leave is exta leave according to your balance Leave')
        }
        // console.log(totalCredit)
        // console.log(totalDebit)
      }
      else {
        // alert('to date should be greater than from date')
        $scope.showMsg('error', 'To date should be greater than from date.');
      }


      // else {
      //   $scope.showMsg('error', 'Please Select Employee Name And Leave Type.');

      //   // alert('Please Select Employee Name And Leave Type')
      // }



      // }
    }

    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    function _approvedLeave() {
      // $scope.entity.LEADId
      $scope.newEntity = {};

      alert('APPROVED');
      $scope.newEntity.ELSDELAId = $scope.entity.LEADId;
      $scope.newEntity.ELSDSanctionFromDate = $scope.entity.LEADDateFrom;
      $scope.newEntity.ELSDSanctionToDate = $scope.entity.LEADDateTo;

      console.log($scope.entity)
      console.log($scope.newEntity)
      $scope.page.action = 'create';


      // ELSDELAId; LEADId
      // ELSDSanctionFromDate; LEADDateFrom
      // ELSDSanctionToDate; LEADDateTo

      editFormService.saveForm(sanctionLeavePageId, $scope.newEntity,
        $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      $scope.showEditForm = false;
    }
  }

})();
