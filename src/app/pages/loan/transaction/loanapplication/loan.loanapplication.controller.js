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
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr, $filter) {

    var vm = this;
    var pageId = 105;
    var currentState = $state.current;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    console.log($scope.page)
    $scope.page.pageId = 105;
    $scope.closeForm = _closeForm;
    $scope.showEditLv = false;
    $scope.showEditGrid = true;
    $scope.showEditForm = true;

    var sanctionLoanPageId = 144;
    var loanTableId = 109;

    $scope.saveForm = _saveForm;
    $scope.approvedLoan = _approvedLoan;
    $scope.onLoanTypeChange = _onLoanTypeChange;
    $scope.loanApplyAmount = _loanApplyAmount;
    $scope.intallmentAmount = _intallmentAmount;
    $scope.onChangeLoanEmployee = _onChangeLoanEmployee;
    $scope.onChangeInstallmentDate = _onChangeInstallmentDate;
    $scope.onControlClick = _onControlClick;

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
      viewRecord: _viewRecord,
      deleteRecord: null,
    }

    $scope.editPage = $scope.createPage();
    $scope.editPage.pageId = 145;

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
      customButtons: [{ text: "Close", icon: 'ion-refresh', onClick: _closeInstallment, type: "btn-default" }],
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

    function _onControlClick() {
      $scope.userClicked = true;
    }
    function _closeInstallment() {
      $scope.showEditForm = true;
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
    }

    function _onChangeLoanEmployee(e, elm, ctrl, col) {
      if (!$scope.userClicked && $scope.page.action != 'create') {
        return;
      }
      $scope.entity.LPId = '';
      $scope.entity.LALTId = '';
      $scope.entity.LAInterest = '';
      var searchLists = [];
      var searchListData = {
        field: 'EmpId',
        operand: '=',
        value: $scope.entity.LAEmpId
      }
      searchLists.push(searchListData)
      console.log(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      var queryId = 523;
      pageService.getCustomQuery(data, queryId).then(function (result) {
        console.log(result)
        if (result[0].JDEmpGradeId != null && result[0].JDEmpLevelId != null && result[0].JDSubUnitID != null) {
          $scope.jobEmpGradeId = result[0].JDEmpGradeId;
          $scope.jobEmpLeaveId = result[0].JDEmpLevelId;
          $scope.jobEmpSubUnitId = result[0].JDSubUnitID;
          $scope.entity.LPId = '';
          $scope.entity.LALTId = '';
          $scope.entity.LAInterest = '';
          console.log($scope.jobEmpGradeId, $scope.jobEmpLeaveId, $scope.jobEmpSubUnitId)
        }
        else {
          alert('Please Provide this employee Grade,Level and Subunit from employee job description')
          $scope.isEmployeeGradeLevelSubUnit = false;
          $scope.entity.LPId = '';
          $scope.entity.LALTId = '';
          $scope.entity.LAInterest = '';
          $scope.jobEmpGradeId = '';
          $scope.jobEmpLeaveId = '';
          $scope.jobEmpSubUnitId = '';
        }

      });
    }

    function _onChangeInstallmentDate() {
      if (!$scope.userClicked && $scope.page.action != 'create') {
        return;
      }
      if ($scope.editOpening) {
        return;
      }
      if ($scope.entity.LANoOfInstallment !== undefined) {
        if ($scope.entity.LANoOfInstallment != null) {
          var installmentDate = moment($scope.entity.LALoanInstallmetDate)
          $scope.entity.LALastLoanCheckDate = installmentDate.add($scope.entity.LANoOfInstallment, 'M')
        }
        else {
          alert('please provide no. of installment')
        }
      }
      else {
        alert('please provide no. of installment')
      }
    }


    function _loanApplyAmount() {
      if (!$scope.userClicked && $scope.page.action != 'create') {
        return;
      }
      if ($scope.entity.LAEmpId !== undefined && $scope.entity.LPId !== undefined && $scope.entity.LALTId !== undefined) {
        if ($scope.entity.LAEmpId != null && $scope.entity.LPId != null && $scope.entity.LALTId != null) {
          var interest = parseFloat($scope.entity.LAInterest)
          if (parseFloat($scope.maxAmount) >= parseFloat($scope.entity.LAApplyAmount)) {
            var loanApplyAmount = parseFloat($scope.entity.LAApplyAmount);
            var percentageAmount = (loanApplyAmount * interest) / 100
            $scope.entity.LAAmount = percentageAmount + loanApplyAmount;
            $scope.entity.LANoOfInstallment='';
            $scope.entity.LAInstallment='';
            
          }
          else {
            alert('Your max amount limit' + $scope.maxAmount)
            $scope.entity.LAApplyAmount = $scope.maxAmount;
          }
        }
        else {
          alert('please select Employee name')
          $scope.entity.LAApplyAmount = '';
        }
      }
      else {
        $scope.entity.LAApplyAmount = '';
        alert('please select Loan type')
      }
    }

    function _intallmentAmount() {
      if (!$scope.userClicked && $scope.page.action != 'create') {
        return;
      }
      if ($scope.entity.LAAmount !== undefined) {
        if ($scope.entity.LAAmount != null) {
          if (parseFloat($scope.entity.LAAmount) >= parseFloat($scope.entity.LAInstallment)) {
            var installNumber = parseFloat($scope.entity.LAAmount) / parseFloat($scope.entity.LAInstallment)
            var installIntremain = installNumber - parseInt(installNumber);
            if (installIntremain > 0) {
              $scope.entity.LANoOfInstallment = parseInt(installNumber) + 1;
            }
            else {
              $scope.entity.LANoOfInstallment = parseInt(installNumber);
            }



          }
          else {
            alert('your installment amount should less then or equal to ' + $scope.entity.LAAmount)
            $scope.entity.LAInstallment = '';
          }
        }
        else {
          alert('loan amount could not found')
          $scope.entity.LAInstallment = '';
        }
      }
      else {
        alert('loan amount could not fount')
        $scope.entity.LAInstallment = '';
      }
    }

    function _onLoanTypeChange() {
      if (!$scope.userClicked && $scope.page.action != 'create') {
        return;
      }
      var searchLists = [];
      var searchListData = {
        field: 'LTRLTId',
        operand: '=',
        value: $scope.entity.LALTId
      }
      searchLists.push(searchListData)
      var searchListData = {
        field: 'LTRGradeId',
        operand: '=',
        value: $scope.jobEmpGradeId
      }
      searchLists.push(searchListData)
      var searchListData = {
        field: 'LTRLevelId',
        operand: '=',
        value: $scope.jobEmpLeaveId
      }
      searchLists.push(searchListData)
      var searchListData = {
        field: 'LTRSubUnitId',
        operand: '=',
        value: $scope.jobEmpSubUnitId
      }
      searchLists.push(searchListData)
      // $scope.jobEmpGradeId = result[0].JDEmpGradeId;
      // $scope.jobEmpLeaveId = result[0].JDEmpLevelId;
      // $scope.jobEmpSubUnitId = result[0].JDSUId;
      console.log(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      var queryId = 292;
      pageService.getCustomQuery(data, queryId).then(function (result) {
        console.log(result);
        if ($scope.entity.LAEmpId !== undefined && $scope.entity.LPId) {
          if ($scope.entity.LAEmpId != null && $scope.entity.LPId != null) {
            // $scope.maxAmount = parseFloat(result[0].LTRMaxLimit);
            $scope.maxAmount = parseFloat(result[0].LTRMaxLimit);
            $scope.entity.LAInterest = result[0].LTRInstallmentPercentage;
            $scope.maxInstallmentNumber = result[0].LTRMaxDuration;
            if (result[0].LTRInstallmentPercentage == '') {
              $scope.entity.LAInterest = 0;
            }
            else
              $scope.entity.LAInterest = result[0].LTRInstallmentPercentage;
          }
          else {
            alert('please select emp name and loan provider')
            $scope.entity.LALTId = '';
          }
        }
        else {
          alert('please select emp name and loan provider')
          $scope.entity.LALTId = '';
        }
      });
    }


    function _viewRecord(row) {
      console.log(row)
      $scope.showEditForm = true;
      $scope.showEditLv = true;
      $scope.showEditGrid = false;

      $scope.editPage.searchList = [{ field: "LILoanId", operand: "=", value: row.entity.LAId }];
      console.log($scope.editPage.searchList)
      $scope.editPage.orderByList = [{ column: 'LIInstallmentDate', isDesc: true }]
      $scope.editPage.refreshData();
    }

    function _addRecord() {
      $scope.showEditForm = false;
      $scope.showEditLv = true;
      $scope.showEditGrid = true;
      $scope.isLeaveApprovedDet = false;
      $scope.entity = {};
    }

    function _editRecord(row) {
      console.log(row)
      $scope.editOpening = true
      $scope.showEditForm = false;
      $scope.entity = row.entity;
      $scope.editOpening = false
      $scope.showEditLv = true;
      $scope.showEditGrid = true;
      $scope.isLeaveApprovedDet = true;

    }

    function _saveForm(editForm) {
      // if ($scope.isEmployeeGradeLevelSubUnit == false) {
      //   alert('Please Provide this employee Grade,Level and Subunit from employee job description')
      // }
      // else {
      if (_validateForm(editForm)) {
        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLoanApp, _errorLoanApp);
        editForm.$setPristine();
        // }
      }

    }

    function _successLoanApp(result) {
      console.log(result)
      if (result.success_message == 'Added New Record.') {

        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;
        $scope.page.refreshData()
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;
        $scope.page.refreshData()
      }
      else {
        $scope.showEditForm = false;
        $scope.showEditLv = true;
        $scope.showEditGrid = true;
      }

    }

    function _errorLoanApp() {

    }


    function _validateForm(editForm) {
      //
      var valid = editFormService.validateForm(editForm)
      return valid;
    }

    function _closeForm(editForm) {
      $scope.showEditForm = true;
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
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
      var selectedStatus = $filter('findObj')($scope.page.pageinfo.statuslist, $scope.entity.StatusId, 'value')
      console.log(selectedStatus.isApproved)
      if ($scope.entity.StatusId == 41) {

        $scope.newEntity = {};
        $scope.newEntity.LADLAId = $scope.entity.LAId;
        $scope.newEntity.LADApprovedAmount = $scope.entity.LAApplyAmount;
        $scope.newEntity.LADApprovedAmountWithPercentage = $scope.entity.LAAmount;
        $scope.newEntity.LADInstalmentAmount = $scope.entity.LAInstallment;
        $scope.newEntity.LADAprvdNoOfInstamt = $scope.entity.LANoOfInstallment;
        $scope.newEntity.LADApprovalLoanClDate = $scope.entity.LADate;
        $scope.newEntity.LADApprovedOn = $scope.entity.LADate;
        $scope.newEntity.LADApprovedInstallmentAmount = $scope.entity.LAInstallment;



        // console.log($scope.entity)
        console.log($scope.newEntity)
        $scope.page.action = 'create';

        editFormService.saveForm(sanctionLoanPageId, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLoanApproved, _errorLoanApproved);

      }
      else {
        _updateForm()
      }


      // editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, 
      // $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      // $scope.showEditForm = false;
    }

    function _updateForm(entity, editForm) {

      pageService.updateField(loanTableId, $scope.page.pageinfo.idencolname, $scope.entity.LAId, "StatusId", $scope.entity.StatusId).then(_updateSuccessResult, _updateErrorResult)
    }

    function _updateSuccessResult(result) {

      if (result.success_message == "Updated")
        $scope.showMsg("success", "Record Updated")

    }
    function _updateErrorResult(err) {
      alert(err)
    }
    function _successLoanApproved(result) {
      _updateForm()
      console.log(result)
      if (result.success_message == 'Added New Record.') {

        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;
        $scope.page.refreshData()
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;
        $scope.page.refreshData()
      }
      else {
        $scope.showEditForm = false;
        $scope.showEditLv = true;
        $scope.showEditGrid = true;
      }

    }

    function _errorLoanApproved() {

    }




    // _onLoanCategory();

  }
})();
