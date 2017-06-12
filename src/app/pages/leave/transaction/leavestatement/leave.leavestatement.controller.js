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
      if ($scope.creditAndDebitCR == 'credits') {
        $scope.entity.ELTLeaveDr = 0;
        $scope.newEntity.ELTEmpId = $scope.entity.ELTEmpId;
        $scope.newEntity.ELTLCRId = $scope.entity.ELTLCRId;
        $scope.newEntity.ELTLeaveCr = $scope.entity.ELTLeaveCr;

      }
      else {
        $scope.entity.ELTLeaveCr = 0;
        $scope.newEntity.ELTEmpId = $scope.entity.ELTEmpId;
        $scope.newEntity.ELTLCRId = $scope.entity.ELTLCRId;
        $scope.newEntity.ELTLeaveDr = $scope.entity.ELTLeaveDr;
      }
      editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
        $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
        

      console.log($scope.page.pageinfo.pageid, $scope.entity,
        $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      // $scope.showEditForm = false;
      // $scope.entity = {};

    }


    function _successsResult(result) {
      console.log(result)

    }
    function _errorRessult(err) {
      
    }
    $scope.$on('form-success', function (successEvent, result) {
      console.log(result)
    })



    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }




  }

})();
