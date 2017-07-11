/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leavestatement')
    .controller('LeaveStatementController', LeaveStatementController);

  /** @ngInject */
  function LeaveStatementController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 270;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.closeForm = _closeForm;
    $scope.creditAndDebitValue = _creditAndDebitValue;
    $scope.newEntity = {};
    // $scope.creditAndDebitDR=false;
    // $scope.creaditLeave=false;


    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 270;

    $scope.saveForm = _saveForm;




    $scope.oldEntity = {};
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
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
      showDataOnLoad: false
    }

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
      $scope.newEntity = {};
    }

    function _creditAndDebitValue() {
      alert('sfsd')
      debugger;
      if ($scope.creaditLeave) {
        $scope.creditAndDebitCR = true;

      }
      else {
        $scope.creditAndDebitDR = false;
      }
    }

    // $scope.$watch(function () {
    //   return $scope.creditAndDebit

    // }, function (newVal, oldVal) {
    //   if ($scope.creditAndDebit) {
    //     if ($scope.creditAndDebit == 'credits') {
    //       $scope.entity.isCreadit = true;
    //       $scope.entity.isDebit = false;

    //     }
    //     else if ($scope.creditAndDebit == 'debits') {
    //       $scope.entity.isCredit = false;
    //       $scope.entity.isDebit = true;
    //     }
    //   }
    // })



    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }



    // function _validateForm(form) {
    //   if (angular.equals($scope.oldEntity, $scope.entity)) {
    //     _showToast('info', 'Nothing to save', '');
    //     return false;
    //   }

    //   return true;
    // }

    function _editRecord(row) {

      console.log(row)

      $scope.entity = row.entity;
      $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
      $scope.isLeaveApprovedDet = true;

    }

    function _saveForm(editForm) {
      $scope.newEntity.ELTId = $scope.entity.ELTId === undefined ? undefined : $scope.entity.ELTId;
      if ($scope.creditAndDebitCR == 'credits') {
        $scope.entity.ELTLeaveDr = 0;

        $scope.newEntity.ELTEmpId = $scope.entity.ELTEmpId;
        $scope.newEntity.ELTLCRId = $scope.entity.ELTLCRId;
        $scope.newEntity.ELTLeaveCr = $scope.entity.ELTLeaveCr;
        $scope.newEntity.ELTLeaveDr = $scope.entity.ELTLeaveDr;
        $scope.newEntity.ELTRemark = $scope.entity.ELTRemark;
        $scope.newEntity.ELTPeriodFromDate = $scope.entity.ELTPeriodFromDate;
        $scope.newEntity.ELTPeriodToDate = $scope.entity.ELTPeriodToDate;
      }
      else {
        $scope.entity.ELTLeaveCr = 0;
        $scope.newEntity.ELTEmpId = $scope.entity.ELTEmpId;
        $scope.newEntity.ELTLCRId = $scope.entity.ELTLCRId;
        $scope.newEntity.ELTLeaveDr = $scope.entity.ELTLeaveDr;
        $scope.newEntity.ELTLeaveCr = $scope.entity.ELTLeaveCr;
        $scope.newEntity.ELTRemark = $scope.entity.ELTRemark;
        $scope.newEntity.ELTPeriodFromDate = $scope.entity.ELTPeriodFromDate;
        $scope.newEntity.ELTPeriodToDate = $scope.entity.ELTPeriodToDate;

      }

      if (_validateForm(editForm)) {

        console.log($scope.page.pageinfo.pageid, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)

        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLeaveApp, _errorLeaveApp);

        console.log($scope.page.pageinfo.pageid, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      }



      // console.log($scope.page.pageinfo.pageid, $scope.entity,
      //   $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      // $scope.showEditForm = false;
      // $scope.entity = {};

    }


    function _validateForm(editForm) {

      var valid = editFormService.validateForm(editForm)
      return valid;

    }

    function _successLeaveApp(result) {
      console.log(result)
      if (result.success_message == 'Added New Record.') {
        $scope.showEditForm = false;
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = false;
      }
      else
        $scope.showEditForm = true;
    }

    function _errorLeaveApp() {

    }

    // $scope.$on('form-success', function (successEvent, result) {
    //   if (result.success_message == 'Added New Record.') {
    //     console.log(result.success_message)
    //     $scope.showEditForm = false;
    //   }
    //   else if (result.success_message == 'Record Updated.') {
    //     $scope.showEditForm = false;
    //   }
    //   else {
    //     $scope.showEditForm = true;
    //   }
    //   console.log(result)

    // })



    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    $scope.$watch('page.gridOptions.data', function (data) {
      console.log($scope.page.gridOptions)
    })



  }

})();
