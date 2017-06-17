/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.transaction.loanapplication')
    .controller('LoanAppController', LoanAppController);

  /** @ngInject */
  function LoanAppController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 105;
    var currentState = $state.current;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    console.log($scope.page)
    $scope.page.pageId = 105;
    $scope.closeForm = _closeForm;

    var sanctionLoanPageId = 144;

    $scope.saveForm = _saveForm;
    $scope.approvedLoan = _approvedLoan;

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

    function _editRecord(row) {
      console.log(row)
      $scope.entity = row.entity;
      $scope.showEditForm = true;
      $scope.isLeaveApprovedDet = true;
     
    }

    function _saveForm(editForm) {
      if (_validateForm(editForm)) {
        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
        editForm.$setPristine();
      }
    }

    $scope.$on('form-success', function (successEvent, result) {
      if (result.success_message == 'Added New Record.') {
        $scope.showEditForm = false;
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = false;
      }
      else
        $scope.showEditForm = true;
    })

    function _validateForm(editForm) {
      var valid = editFormService.validateForm(editForm)
      return valid;
    }

    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    function _approvedLoan() {

      /**
       * LLM_LoanApprovelDetail table field
       */
      /*
       LADId       
       LADLAId     
       LADApprovedAmount                                   
       LADApprovedOn           
       LADApprovedBy 
       LADInstalmentAmount                                 
       LADApprovedAmountWithPercentage                    
       LADApprovedInstallmentAmount                        
       LADInstalmentDurationInMonth 
       LADAprvdNoOfInstamt                                 
       LADApplyAmount                                      
       LADFinalAmount                                      
       LADLTId     
       LADInterest                                         
       LADNumberOfInstallment                              
       LADMaxLimit                                         
       LADDate                                             
       LADLoanInstDate                                     
       LADLoanCrDate                                       
       LADRemark                                                                                                                                                                                                                                                     
       LADApprovalLoanClDate   
       LADLoanStausId 
       LADIsInterestCalc
       */

      $scope.newEntity = {};
      $scope.newEntity.LADLAId = $scope.entity.LAId;
      $scope.newEntity.LADApprovedAmount = $scope.entity.LAApplyAmount;
      $scope.newEntity.LADApprovedAmountWithPercentage = $scope.entity.LAAmount;
      $scope.newEntity.LADInstalmentAmount = $scope.entity.LAInstallment;
      $scope.newEntity.LADAprvdNoOfInstamt = $scope.entity.LANoOfInstallment;
      $scope.newEntity.LADApprovalLoanClDate = $scope.entity.LADate;
      $scope.newEntity.LADApprovedOn = $scope.entity.LADate;
      $scope.newEntity.LADLoanStausId = 1;
      // console.log($scope.entity)
      console.log($scope.newEntity)
      $scope.page.action = 'create';
      if (_validateForm(editForm)) {
        editFormService.saveForm(sanctionLoanPageId, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      }
      // editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, 
      // $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      // $scope.showEditForm = false;
    }

  }
})();
