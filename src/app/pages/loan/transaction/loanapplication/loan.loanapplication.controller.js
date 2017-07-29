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
    $scope.showSanctionForm = true;
    $scope.verifyCancelRequestForm = true;
    $scope.verifySanctionForm = true;
    $scope.closeSanction = _closeSanction;
    var cancelRequestPageId = 456;
    var cancelRequestTableId = 436;

    var sanctionLoanPageId = 144;
    var loanTableId = 109;
    var sanctinLoanTableId = 150;

    $scope.saveForm = _saveForm;
    $scope.approvedLoan = _approvedLoan;
    $scope.onLoanTypeChange = _onLoanTypeChange;
    $scope.loanApplyAmount = _loanApplyAmount;
    $scope.intallmentAmount = _intallmentAmount;
    $scope.onChangeLoanEmployee = _onChangeLoanEmployee;
    $scope.onChangeInstallmentDate = _onChangeInstallmentDate;
    $scope.onControlClick = _onControlClick;
    $scope.leaveSanction = _leaveSanction;
    $scope.closeViewSanctionForm = _closeViewSanctionForm
    $scope.closeVerifyCancelRequestForm = _closeVerifyCancelRequestForm;
    $scope.cancelLeave = _cancelLeave;
    var sanctionLonPageId = 285;
    $scope.cancelRequestEntity = {};
    $scope.sanctionEntity = {};
    $scope.replyOnCancelLoan = _replyOnCancelLoan;


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
      customColumns: [{ text: 'Verify', type: 'a', name: 'Option', click: _loanVerify, pin: true }],
      deleteRecord: null,
    }

    //loan verify detail
    function _loanVerify(row) {
      console.log(row)
      var status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
      console.log(status)
      if (status == null) {
        status = {};
        status.isRejected = false;
        status.isCancelRequest = false;
      }
      if (!status.isRejected) {
        if (!status.isCancelRequest && !status.isCancelApproved && !status.isCancelRejected && !status.isCancelOnHold) {
          $scope.leaveDetails = [];
          $scope.entity = [];
          $scope.showEditLv = true;
          $scope.showEditGrid = true;
          $scope.showEditForm = true;
          $scope.showSanctionForm = false;
          $scope.verifyCancelRequestForm = true;
          $scope.verifySanctionForm = true;

          //Get page of SanctionLeave 
          pageService.getPagData(sanctionLoanPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
          var transaction = row.entity.LEADTransation;
          if (transaction != null && transaction != undefined && transaction != '') {
            var rows = transaction.split(',');

            angular.forEach(rows, function (row) {

              var data = row.split('|');
              if (parseInt(data[0]) != 0) {
                var leaveType = $filter('findObj')($scope.page.pageinfo.selects.LEADLTId, parseInt(data[0]), 'value').name;
                var leaveDetail = {
                  type: leaveType == null ? "" : leaveType,
                  balance: data[1]
                }
              }
              else {
                var leaveDetail = {
                  type: "LWP",
                  balance: data[1]
                }
              }
              $scope.leaveDetails.push(leaveDetail)
            })
          }
          else {
            $scope.leaveDetails = undefined;
          }
          if (row.entity.LEADDateFrom != undefined)
            row.entity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
          if (row.entity.LEADDateTo != undefined)
            row.entity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
          if (row.entity.LEADFromHalfDayId != null && row.entity.LEADFromHalfDayId != undefined) {
            if (row.entity.LEADFromHalfDayId == 0) {
              row.entity.fromHalf = 'First Half';
            }
            else if (row.entity.LEADFromHalfDayId == 1) {
              row.entity.fromHalf = 'Second Half';
            }
            else {
              row.entity.fromHalf = '';
            }
          }
          if (row.entity.LEADToHalfDayId != null && row.entity.LEADToHalfDayId != undefined) {
            if (row.entity.LEADToHalfDayId == 0) {
              row.entity.toHalf = 'First Half'
            }
            else if (row.entity.LEADFromHalfDayId == 1) {
              row.entity.toHalf = 'Second Half';
            }
            else {
              row.entity.toHalf = '';
            }
          }
          $scope.entity = row.entity;
        }
        else {
          $scope.showEditLv = true;
          $scope.showEditGrid = true;
          $scope.showEditForm = true;
          $scope.showSanctionForm = true;
          $scope.verifyCancelRequestForm = false;
          $scope.verifySanctionForm = true;


          pageService.getPagData(cancelRequestPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
          // $scope.cancelRequestEntity.EmpName = row.entity.EmpName;
          console.log(row.entity)
          $scope.entity = angular.copy(row.entity);
          $scope.cancelRequestEntity = angular.copy(row.entity);
          console.log($scope.entity)
          var searchList = [];
          var searchFields = {
            field: 'LCDLAId',
            operand: '=',
            value: row.entity.LAId
          }
          searchList.push(searchFields)

          _commonFindEntity(cancelRequestTableId, searchList)
        }
      }
      else {
        $scope.showMsg("error", "You can view this leave only")
      }

    }

    function _commonFindEntity(tableId, searchList) {

      pageService.findEntity(tableId, undefined, searchList).then(_cancelRequestSuccessResult, _cancelRequestErrorResult)
    }
    function _cancelRequestSuccessResult(result) {


      $scope.cancelRequestOldEntity = angular.copy(result);
      // $scope.entity = angular.copy(result);

      console.log($scope.entity)

      if (result.LCDId != undefined) {
        $scope.cancelRequestEntity.LCDId = result.LCDId;
        $scope.cancelRequestEntity.LCDRemark = result.LCDRemark;
      }
      else {
        // $scope.cancelRequestEntity.CRComment = '';
      }
    }
    function _cancelRequestErrorResult(err) {

    }

    function _getPageDataSuccessResult(result) {
      if (parseInt(result.pageinfo.pageid) == parseInt(cancelRequestPageId)) {
        $scope.cancelRequestPage = result;
      }
      if (parseInt(result.pageinfo.pageid) == parseInt(sanctionLoanPageId)) {
        $scope.sanctionPage = result;
        //Get entity of sanctionleave  
        var searchList = [];
        var searchFields = {
          field: 'LADLAId',
          operand: '=',
          value: $scope.entity.LAId
        }
        searchList.push(searchFields);
        pageService.findEntity(sanctinLoanTableId, undefined, searchList).then(_findEntitySuccessResult, _findEntityErrorResult)
      }
    }

    function _findEntitySuccessResult(result) {
      $scope.sectionOldEntity = angular.copy(result);
      console.log(result)
      if (result.LADId != undefined) {
        $scope.sanctionEntity.LADId = result.LADId;
      }
      else {
        $scope.sanctionEntity.LADId = undefined;
      }
    }
    function _findEntityErrorResult(err) {

    }
    function _getPageDataErrorResult(err) {

    }

    //close loan verify
    function _closeSanction() {
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
      $scope.showEditForm = true;
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
    }

    function _validateSanctionForm() {
      if ($scope.sanctionEntity.StatusId == "0") {
        $scope.showMsg("error", "Please Select Status");
        return true;
      }
      if ($scope.sanctionEntity.LADRemark == undefined || $scope.sanctionEntity.LADRemark == null || $scope.sanctionEntity.LADRemark == '') {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }

    function _leaveSanction() {

      if (!_validateSanctionForm()) {
        var santionLeave = {
          LADId: $scope.sanctionEntity.LADId == undefined ? undefined : $scope.sanctionEntity.LADId,
          LADLAId: $scope.entity.LAId,
          LADApprovedAmount: $scope.entity.LAApplyAmount,
          LADApprovedAmountWithPercentage: $scope.entity.LAAmount,
          LADInstalmentAmount: $scope.entity.LAInstallment,
          LADAprvdNoOfInstamt: $scope.entity.LANoOfInstallment,
          LADApprovalLoanClDate: $scope.entity.LADate,
          LADApprovedOn: moment(),
          LADApprovedInstallmentAmount: $scope.entity.LAInstallment,
          StatusId: $scope.sanctionEntity.StatusId
        }
      }

      if ($scope.sanctionEntity.LADId == undefined) {
        _formSave(santionLeave, sanctionLoanPageId, 'create', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
      }
      else {
        _formSave(santionLeave, sanctionLoanPageId, 'edit', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
      }
    }


    function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation, title) {

      editFormService.saveForm(pageId, entity, oldEntity,
        action, title, editForm, showConfirmation)
        .then(_saveSuccessResult, _saveErrorResult)
    }

    function _saveSuccessResult(result) {

      if (result.success_message == 'Added New Record.') {
        $scope.showMsg("success", "Record Saved Successfully")
      }
      else {
        $scope.showMsg("success", "Record Saved Successfully")
      }
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
      $scope.showEditForm = true;
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
      $scope.page.refreshData();
    }
    function _saveErrorResult(err) {
      $scope.showMsg("error", err)
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
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
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
            $scope.entity.LANoOfInstallment = '';
            $scope.entity.LAInstallment = '';

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


    // function _viewRecord(row) {
    //   console.log(row)
    //   $scope.showEditForm = true;
    //   $scope.showEditLv = true;
    //   $scope.showEditGrid = false;
    //   $scope.showSanctionForm = true;
    //   $scope.verifyCancelRequestForm = true;

    //   $scope.editPage.searchList = [{ field: "LILoanId", operand: "=", value: row.entity.LAId }];
    //   console.log($scope.editPage.searchList)
    //   $scope.editPage.orderByList = [{ column: 'LIInstallmentDate', isDesc: true }]
    //   $scope.editPage.refreshData();
    // }

    function _addRecord() {
      $scope.showEditForm = false;
      $scope.showEditLv = true;
      $scope.showEditGrid = true;
      $scope.isLeaveApprovedDet = false;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
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
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;

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
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.showSanctionForm = true;
        $scope.page.refreshData()
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;

        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData()
      }
      else {
        $scope.showEditForm = false;
        $scope.showEditLv = true;
        $scope.showEditGrid = true;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
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
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
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
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData()
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = true;
        $scope.showEditLv = false;
        $scope.showEditGrid = true;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData()
      }
      else {
        $scope.showEditForm = false;
        $scope.showEditLv = true;
        $scope.showEditGrid = true;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
      }

    }

    function _errorLoanApproved() {

    }

    function _viewRecord(row) {
      console.log(row)

      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
        if (!$scope.status.isCancelRequest && !$scope.status.isCancelApproved && !$scope.status.isCancelRejected && !$scope.status.isCancelOnHold) {
          var searchList = [];
          var searchFields = {
            field: 'LCDLAId',
            operand: '=',
            value: row.entity.LAId
          }
          searchList.push(searchFields)
          _commonFindEntity(cancelRequestTableId, searchList, row.entity);
          $scope.entity = angular.copy(row.entity);
          console.log(row.entity)
          $scope.showEditForm = true;
          $scope.showEditLv = true;
          $scope.showEditGrid = true;
          $scope.showSanctionForm = true;
          $scope.verifyCancelRequestForm = true;
          $scope.verifySanctionForm = false;
          $scope.cancelRequestEntity.LCDLAId = row.entity.LAId;
          $scope.cancelRequestEntity.LCDId = row.entity.LCDId;
          $scope.cancelRequestEntity.StatusId = row.entity.StatusId;

        }
        else {
          if ($scope.isCancelRequest) {
            $scope.showMsg("error", "You are not allowed to view this leave application beacause this leave application is already in processing for approval")
          }
          else {
            $scope.showMsg("error", "Your application already sanctioned/rejected/onhold")
          }
        }
      }

    }

    function _cancelLeave() {

      if ($scope.cancelRequestEntity.LCDRemark != undefined && $scope.cancelRequestEntity.LCDRemark != '') {
        var cancelRequest = {
          LCDLAId: $scope.entity.LAId,
          LCDLAAmount: $scope.entity.LAAmount,
          LCDEmpId: $scope.entity.LAEmpId,
          LCDRemark: $scope.cancelRequestEntity.LCDRemark
          //  LCDId       LCDLAId     LCDLAAmount           LCDEmpId    LCDRemark  
        }
        if ($scope.entity.LCDId == undefined) {
          _formSave(cancelRequest, cancelRequestPageId, 'create', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, true, 'Cancel Request');
        }
        else {
          _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
        }
      }
      else {
        $scope.showMsg("error", "Please comment before leave cancel");
      }
    }

    function _replyOnCancelLoan(cancelRequestEntity) {

      if (cancelRequestEntity.StatusId != undefined && cancelRequestEntity.LCDRemark != undefined) {
        var cancelRequest = {
          // CREmpId: cancelRequestEntity.CREmpId,
          LCDId: $scope.cancelRequestEntity.LCDId,
          LCDLAId: $scope.entity.LAId,
          LCDLAAmount: $scope.cancelRequestEntity.LAAmount,
          LCDEmpId: $scope.cancelRequestEntity.LAEmpId,
          LCDRemark: $scope.cancelRequestEntity.LCDRemark

        }
        console.log(cancelRequest)
        _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
      }
      else {
        if (cancelRequestEntity.StatusId == undefined) {
          $scope.showMsg("error", "Please select status");
        } else if (cancelRequestEntity.CRCommentAfterCanReq == undefined) {
          $scope.showMsg("error", "Please enter comment");
        }
      }

    }

    function _closeViewSanctionForm() {
      $scope.showEditForm = true;
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
      $scope.page.refreshData();
    }


    function _closeVerifyCancelRequestForm() {
      $scope.showEditForm = true;
      $scope.showEditLv = false;
      $scope.showEditGrid = true;
      $scope.showSanctionForm = true;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
      $scope.page.refreshData();
    }




    // _onLoanCategory();

  }
})();
