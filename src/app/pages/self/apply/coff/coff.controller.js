/**
 * @author NKM
 * created on 26.07.2018
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.self.apply.coff')
      .controller('cOffApplyController', cOffApplyController);
  
    /** @ngInject */
    function cOffApplyController($scope,$rootScope, $state, $timeout, pageService, editFormService, $filter) {
      var vm = this;
      vm.pageId = 127;
      vm.tableId = 134;
      var currentState = $state.current;
      $scope.showEditForm = true;
      $scope.showGridData = false;
      $scope.verifyCancelRequestForm = true;
      $scope.verifySanctionForm = true;
      // this.uploadRecord = _uploadRecord;
  
      $scope.attDateChange = _attDateChange;
      // $scope.empChange = _empChange;
      $scope.close = _close;
      // $scope.udateForm = _updateForm;
      $scope.closeSanction = _closeSanction;
  
      $scope.entity = {}
      vm.oldEntity = {}
      $scope.closeForm = _closeForm;
      $scope.page = $rootScope.createPage();
      $scope.page.pageId = vm.pageId;
      $scope.showInOutTime = false;
      $scope.saveForm = _saveForm;
      $scope.showSanctionForm = true;
      $scope.cOffSanction = _cOffSanction;
      $scope.closeVerifyCancelRequestForm = _closeVerifyCancelRequestForm;
      $scope.closeViewSanctionForm = _closeViewSanctionForm
      $scope.cancelLeave = _cancelLeave;
      $scope.replyOnCancelLoan = _replyOnCancelLoan;
  
      var sanctionLoanPageId = 466;
      var sanctinLoanTableId = 448;
      var sanctionCOffPageId = 466;
      $scope.sanctionEntity = {};
  
  
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
        enableAutoRefresh: true,
        showDataOnLoad: true,
        linkColumns: null,
        gridHeight: 450,
        getPageData: null,
        refreshData: null,
        addRecord: _addRecord,
        editRecord: _editRecord,
        updateRecord: null,
        viewRecord: _viewRecord,
        // customColumns: [{ text: 'Verify', type: 'a', name: 'Option', click: _cOffVerify, pin: true }],
        deleteRecord: null,
        pageResult: _pageResult,
        dataResult: _dataResult
      }
  
      function _dataResult(result) {
        console.log(result)
      }
  
      function _pageResult(result) {
        console.log(result);
      }
      function _closeSanction() {
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData();
      }
  
      function _closeViewSanctionForm() {
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData();
      }
  
      function _closeVerifyCancelRequestForm() {
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData();
      }
  
      function _validateSanctionForm() {
        if ($scope.sanctionEntity.StatusId == "0") {
          $rootScope.showMsg("error", "Please Select Status");
          return true;
        }
        if ($scope.sanctionEntity.ACODReson == undefined || $scope.sanctionEntity.ACODReson == null || $scope.sanctionEntity.ACODReson == '') {
          $rootScope.showMsg("error", "Please Enter Comment");
          return true;
        }
        // if ($scope.sanctionEntity.ACODIsApplyHalfDay == undefined || $scope.sanctionEntity.ACODIsApplyHalfDay == null || $scope.sanctionEntity.ACODIsApplyHalfDay == '' || $scope.sanctionEntity.ACODIsApplyFullDay == undefined || $scope.sanctionEntity.ACODIsApplyFullDay == null || $scope.sanctionEntity.ACODIsApplyFullDay == '') {
        //   $rootScope.showMsg("error", "Please select full day Or half day");
        //   return true;
        // }
        return false;
      }
  
  
      function _cOffSanction() {
      
        if (!_validateSanctionForm()) {
          var santionLeave = {
            ACODId: $scope.sanctionEntity.ACODId == undefined ? undefined : $scope.sanctionEntity.ACODId,
            ACODCOId: $scope.entity.COId,
            ACODIsApplyHalfDay: $scope.entity.COIsApplyHalfDay,
            ACODIsApplyFullDay: $scope.entity.COIsApplyFullDay,
            ACODReson: $scope.sanctionEntity.ACODReson,
            StatusId: $scope.sanctionEntity.StatusId,
          }
        }
  
        if ($scope.sanctionEntity.ACODId == undefined) {
          _formSave(santionLeave, sanctionCOffPageId, 'create', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
        else {
          _formSave(santionLeave, sanctionCOffPageId, 'edit', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
      }
  
  
      function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation, title) {
  
        editFormService.saveForm(pageId, entity, oldEntity,
          action, title, editForm, showConfirmation)
          .then(_saveSuccessResult, _saveErrorResult)
      }
  
      function _saveSuccessResult(result) {
  
        if (result.success_message == 'Added New Record.') {
          $rootScope.showMsg("success", "Record Saved Successfully")
        }
        else {
          $rootScope.showMsg("success", "Record Saved Successfully")
        }
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
  
        $scope.page.refreshData();
      }
      function _saveErrorResult(err) {
        $rootScope.showMsg("error", err)
      }
  
  
      function _cOffVerify(row) {
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
  
  
  
            $scope.showEditForm = true;
            $scope.showGridData = true;
            $scope.showSanctionForm = false;
            $scope.verifyCancelRequestForm = true;
            $scope.verifySanctionForm = true;
  
  
            //Get page of SanctionLeave 
            pageService.getPagData(sanctionLoanPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
            $scope.entity = row.entity;
            $scope.sanctionEntity.ACODIsApplyHalfDay = row.entity.COIsApplyHalfDay;
            $scope.sanctionEntity.ACODIsApplyFullDay = row.entity.COIsApplyFullDay;
          }
          else {
  
            $scope.showEditForm = true;
            $scope.showGridData = true;
            $scope.showSanctionForm = true;
            $scope.verifyCancelRequestForm = false;
            $scope.verifySanctionForm = true;
  
  
            pageService.getPagData(cancelRequestPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
            // $scope.cancelRequestEntity.EmpName = row.entity.EmpName;
            console.log(row.entity)
            $scope.entity = angular.copy(row.entity);
            console.log($scope.entity)
            $scope.cancelRequestEntity = angular.copy(row.entity);
            console.log($scope.entity)
            var searchList = [];
            var searchFields = {
              field: 'COCDCOId',
              operand: '=',
              value: row.entity.COId
            }
            searchList.push(searchFields)
  
            _commonFindEntity(cancelRequestTableId, searchList)
  
          }
        }
        else {
  
          $rootScope.showMsg("error", "You can view this App only")
  
        }
  
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
            field: 'ACODCOId',
            operand: '=',
            value: $scope.entity.COId
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
          $scope.sanctionEntity.LADRemark = result.LADRemark;
        }
        else {
          $scope.sanctionEntity.LADId = undefined;
        }
      }
  
      function _findEntityErrorResult(err) {
  
      }
  
      function _getPageDataErrorResult(err) {
  
      }
  
      function _loadController() {
        $scope.entity.COAttnDate = moment();
        $scope.entity.COAppDate = moment();
      }
  
      function _addRecord() {
        $scope.entity = {};
        $scope.entity.COAttnDate = moment();
        $scope.entity.COAppDate = moment();
        $scope.showInOutTime = false;
        $scope.showEditForm = false;
        $scope.showGridData = true;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
  
      }
      function _closeForm() {
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
        $scope.page.refreshData();
      }
      /**
       * handler for attendance date field box on change event
       * @param {object} event 
       * @param {object} element 
       * @param {object} modelCtrl 
       * @param {object} column 
       */
      // function _empChange(event, element, modelCtrl, column) {
  
      //   // var attDate = $scope.entity.COAttnDate;//modelCtrl.$modelValue;
      //   var EmpId = $scope.entity.EmpId;
      //   var COAttnDate = moment($scope.entity.COAttnDate);
      // }
      /**
       * On Change Event for Employee Dropdown
       * @param {object} event 
       * @param {object} element 
       * @param {object} modelCtrl 
       * @param {object} column 
       */
      function _attDateChange(event, element, modelCtrl, column) {
         console.log($scope.page.pageinfo)
        var EmpId = $scope.entity.EmpId;
        var COAttnDate = moment($scope.entity.COAttnDate);
        $scope.dayFromDate = COAttnDate.format('dddd');
        console.log($scope.dayFromDate)
  
        var searchLists = [];
        var searchListData = {
          field: 'EmpId',
          operand: '=',
          value: $scope.entity.EmpId
        }
        searchLists.push(searchListData)
  
        searchListData = {
          field: 'AttDate',
          operand: '=',
          value: $scope.entity.COAttnDate
  
        }
        searchLists.push(searchListData)
        var data = {
          searchList: searchLists,
          orderByList: []
        }
  
        var queryId = 514;
        pageService.getCustomQuery(data, queryId).then(function (result) {
          console.log(result);
          console.log(result[0][0].ERROR)
          if (result[0][0].ERROR == 'You can not apply C-Off') {
            $rootScope.showMsg("warning", result[0][0].ERROR)
            $scope.showInOutTime = false;
            $scope.entity = {};
            $scope.entity.COAttnDate = moment();
            $scope.entity.COAppDate = moment();
            // $scope.entity.COTimeIn = {};
            // $scope.entity.COTimeOut = {};
            // $scope.entity.COTotalWrTmInHour = {};
            // $scope.entity.COReson = {};
          }
          else {
            $scope.entity.COTimeIn = result[0][0].Intime;
            $scope.entity.COTimeOut = result[0][0].OutTime;
            $scope.entity.COTotalWrTmInHour = result[0][0].TotallHours;
            console.log(result[0][0].TotallHours)
            $scope.showInOutTime = true;
          }
  
        })
  
      }
  
      var cancelRequestTableId = 449;
      /** View Compensentory Record */
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
              field: 'COCDCOId',
              operand: '=',
              value: row.entity.COId
            }
            searchList.push(searchFields)
            _commonFindEntity(cancelRequestTableId, searchList, row.entity);
            $scope.entity = angular.copy(row.entity);
            console.log($scope.entity)
            console.log(row.entity)
            $scope.showEditForm = true;
            $scope.showGridData = true;
            $scope.showSanctionForm = true;
            $scope.verifyCancelRequestForm = true;
            $scope.verifySanctionForm = false;
            $scope.cancelRequestEntity.COCDCOId = row.entity.COId;
            $scope.cancelRequestEntity.COCDId = row.entity.COCDId;
            $scope.cancelRequestEntity.StatusId = row.entity.StatusId;
  
          }
          else {
            if ($scope.isCancelRequest) {
              $rootScope.showMsg("error", "You are not allowed to view this leave application beacause this leave application is already in processing for approval")
            }
            else {
              $rootScope.showMsg("error", "Your application already sanctioned/rejected/onhold")
            }
          }
        }
  
      }
  
      function _commonFindEntity(tableId, searchList) {
  
        pageService.findEntity(tableId, undefined, searchList).then(_cancelRequestSuccessResult, _cancelRequestErrorResult)
      }
      function _cancelRequestSuccessResult(result) {
  
  
        $scope.cancelRequestOldEntity = angular.copy(result);
        // $scope.entity = angular.copy(result);
  
        console.log($scope.entity)
  
  
  
        if (result.COCDId != undefined) {
          $scope.cancelRequestEntity.COCDId = result.COCDId;
          $scope.cancelRequestEntity.COCDReson = result.COCDReson;
        }
        else {
          // $scope.cancelRequestEntity.CRComment = '';
        }
      }
      function _cancelRequestErrorResult(err) {
  
      }
  
      function _editRecord(row) {
        console.log(row)
        $scope.showEditForm = false;
        $scope.entity = row.entity;
        $scope.showGridData = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
  
      }
  
      /**Close View Compensentory Record */
      function _close() {
  
        $scope.showEditForm = true;
      }
  
  
      function _saveForm() {
        console.log($scope.entity)
        editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
          $scope.entity.COId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
          .then(_saveFormSuccessResult, _saveFormErrorResult)
      }
  
      function _saveFormSuccessResult(result) {
        console.log(result)
        $scope.showEditForm = true;
        $scope.showGridData = false;
        $scope.showSanctionForm = true;
        $scope.verifyCancelRequestForm = true;
        $scope.verifySanctionForm = true;
  
        $scope.entity = {};
        $scope.showInOutTime = false;
        $scope.entity.COAttnDate = moment();
        $scope.entity.COAppDate = moment();
        $scope.page.refreshData();
  
      }
  
      function _saveFormErrorResult(error) {
        console.log(error);
  
      }
  
  
      // function _updateForm(entity, editForm) {
      //   pageService.updateField(vm.tableId, $scope.page.pageinfo.idencolname, entity.COId, "StatusId", entity.StatusId).then(_updateSuccessResult, _updateErrorResult)
      // }
  
      // function _updateSuccessResult(result) {
  
      //   if (result.success_message == "Updated")
      //     $rootScope.showMsg("success", "Record Updated")
  
      // }
      // function _updateErrorResult(err) {
      //   alert(err)
      // }
      var cancelRequestPageId = 467;
      $scope.cancelRequestEntity = {};
  
      function _cancelLeave() {
  
        if ($scope.cancelRequestEntity.COCDReson != undefined && $scope.cancelRequestEntity.COCDReson != '') {
          var cancelRequest = {
            COCDCOId: $scope.entity.COId,
            COCDIsApplyHalfDay: $scope.entity.COIsApplyHalfDay,
            COCDIsApplyFullDay: $scope.entity.COIsApplyFullDay,
            COCDEmpId: $scope.entity.EmpId,
            COCDReson: $scope.cancelRequestEntity.COCDReson
            //  LCDId       LCDLAId     LCDLAAmount           LCDEmpId    LCDRemark  
          }
          if ($scope.entity.COCDId == undefined) {
            _formSave(cancelRequest, cancelRequestPageId, 'create', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, true, 'Cancel Request');
          }
          else {
            _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
          }
        }
        else {
          $rootScope.showMsg("error", "Please comment before loan cancel");
        }
      }
  
      function _replyOnCancelLoan(cancelRequestEntity) {
  
        if (cancelRequestEntity.StatusId != undefined && cancelRequestEntity.COCDReson != undefined) {
          var cancelRequest = {
            // CREmpId: cancelRequestEntity.CREmpId,
  
            COCDId: $scope.cancelRequestEntity.COCDId,
            COCDCOId: $scope.entity.COId,
            COCDIsApplyHalfDay: $scope.cancelRequestEntity.COIsApplyHalfDay,
            COCDIsApplyFullDay: $scope.cancelRequestEntity.COIsApplyFullDay,
            COCDEmpId: $scope.cancelRequestEntity.EmpId,
            COCDReson: $scope.cancelRequestEntity.COCDReson,
            StatusId: $scope.cancelRequestEntity.StatusId
  
          }
          console.log(cancelRequest)
          _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
        }
        else {
          if (cancelRequestEntity.StatusId == undefined) {
            $rootScope.showMsg("error", "Please select status");
          } else if (cancelRequestEntity.CRCommentAfterCanReq == undefined) {
            $rootScope.showMsg("error", "Please enter comment");
          }
        }
  
      }
  
  
  
      _loadController();
    }
  
  })();
  