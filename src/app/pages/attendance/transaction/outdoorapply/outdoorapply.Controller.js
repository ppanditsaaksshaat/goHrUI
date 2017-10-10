/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.outdoorapply')
    .controller('attTransoutdoorapplyController', attTransoutdoorapplyController);

  /** @ngInject */
  function attTransoutdoorapplyController($scope, $state, $timeout, pageService, $filter, editFormService) {
    var vm = this;
    // var pageId = 294;
    vm.tableId = 305;
    vm.pageId = 294;
    var currentState = $state.current;
    $scope.showEditForm = false;
    $scope.showSanctionForm = true;
    $scope.showForm = true;
    $scope.closeSanction = _closeSanction;
    var sanctinLoanTableId = 450;
    // this.uploadRecord = _uploadRecord;
    $scope.sanctionEntity = {};
    vm.oldEntity = {}
    $scope.saveForm = _saveForm;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    var sanctionLoanPageId = 468;
    var cancelRequestPageId = 0;
    var cancelRequestTableId = 0;
    $scope.sectionOldEntity = {};
    $scope.cOffSanction = _cOffSanction;
    $scope.close = _close;
    $scope.closeForm = _closeForm;
    $scope.shiftInOutTime = _shiftInOutTime;
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
      customColumns: [{ text: 'Verify', type: 'a', name: 'Option', click: _oDVerify, pin: true }],
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

    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = true;
      $scope.showSanctionForm = true;
      $scope.showForm = false;

    }

    function _shiftInOutTime() {
      // $scope.employeeJoiningDate = $scope.entity.selectedEmp.JDDate;
      $scope.FADInTimes = $scope.entity.FADEmpId.SMFromTime;
      $scope.FDAOutTimes = $scope.entity.FADEmpId.SMToTime;

      if ($scope.FADInTimes != undefined && $scope.FADInTimes != '') {
        if ($scope.FDAOutTimes != undefined && $scope.FDAOutTimes != '') {
          $scope.entity.FADInTime = $scope.FADInTimes;
          $scope.entity.FDAOutTime = $scope.FDAOutTimes;
        }
        else {
          $scope.showMsg("error", "This employee not exist in shift")
        }
      }
      else {
        $scope.showMsg("error", "This employee not exist in shift")
      }

      console.log($scope.entity.FADInTime)

    }


    function _oDVerify(row) {
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
          $scope.sanctionEntity.AFDADFDAFromDate = row.entity.FDAFromDate;
          $scope.sanctionEntity.AFDADFDAToDate = row.entity.FDAToDate;
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
          $scope.sanctionEntity.AFDADFDAFromDate = row.entity.FDAFromDate;
          $scope.sanctionEntity.AFDADFDAToDate = row.entity.FDAToDate;
          console.log(row.entity.FDAFromDate)

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
        $scope.showMsg("error", "You can view this App only")
      }
    }

    function _getPageDataSuccessResult(result) {
      // if (parseInt(result.pageinfo.pageid) == parseInt(cancelRequestPageId)) {
      //   $scope.cancelRequestPage = result;
      // }
      if (parseInt(result.pageinfo.pageid) == parseInt(sanctionLoanPageId)) {
        $scope.sanctionPage = result;
        //Get entity of sanctionleave  
        var searchList = [];
        var searchFields = {
          field: 'AFDADFDAId',
          operand: '=',
          value: $scope.entity.FDAId
        }
        searchList.push(searchFields);
        pageService.findEntity(sanctinLoanTableId, undefined, searchList).then(_findEntitySuccessResult, _findEntityErrorResult)
      }
    }

    function _getPageDataErrorResult(error) {
      console.log(error)
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

    /**View OutDoor Record */
    function _viewRecord(row) {
      debugger;
      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');



        if (!$scope.status.isApproved) {
          if (!$scope.status.isRejected) {
            if (!$scope.status.isOnHold) {
              $scope.entity = angular.copy(row.entity);
              $scope.showEditForm = true;
              $scope.showSanctionForm = true;
              $scope.showForm = false;
              $scope.entity = row.entity

            }
            else {
              $scope.showMsg("error", "Your application has been onhold")
            }
          }
          else {
            $scope.showMsg("error", "Your application has been rejected")
          }
        }
        else {
          $scope.showMsg("error", "Your application has been sanctioned")
        }
      }
    }



    function _saveForm() {


      editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
        $scope.entity.FDAId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
        .then(_saveFormSuccessResult, _saveFormErrorResult)
      console.log($scope.entity)
      console.log(vm.oldEntity)
    }

    function _saveFormSuccessResult(result) {
      console.log(result)
      $scope.showEditForm = false;
      $scope.showSanctionForm = true;
      $scope.showForm = true;

      $scope.entity = {};
      $scope.page.refreshData();

    }

    function _saveFormErrorResult(error) {
      console.log(error);
    }

    function _close() {
      debugger;
      $scope.showEditForm = false;
      $scope.showSanctionForm = true;
      $scope.showForm = true;
    }
    function _closeSanction() {
      $scope.showEditForm = false;
      $scope.showSanctionForm = true;
      $scope.showForm = true;
      $scope.page.refreshData();
    }

    function _closeForm() {
      $scope.showEditForm = false;
      $scope.showSanctionForm = true;
      $scope.showForm = true;
      $scope.page.refreshData();
    }

    function _cOffSanction() {
      debugger;
      if (!_validateSanctionForm()) {
        var santionLeave = {
          AFDADId: $scope.sanctionEntity.AFDADId == undefined ? undefined : $scope.sanctionEntity.AFDADId,
          AFDADFDAId: $scope.entity.FDAId,
          AFDADFDAFromDate: $scope.sanctionEntity.AFDADFDAFromDate,
          AFDADFDAToDate: $scope.sanctionEntity.AFDADFDAToDate,
          AFDADFADInTime: $scope.entity.FADInTime,
          AFDADFDAOutTime: $scope.entity.FDAOutTime,
          StatusId: $scope.sanctionEntity.StatusId,
          AFDADRemark: $scope.sanctionEntity.AFDADRemark
        }
        if ($scope.sanctionEntity.AFDADId == undefined) {
          _formSave(santionLeave, sanctionLoanPageId, 'create', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
        else {
          _formSave(santionLeave, sanctionLoanPageId, 'edit', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
      }


    }

    // function _validateForm() {
    //   if ($scope.entity.FADEmpId == undefined || $scope.entity.FADEmpId == null || $scope.entity.FADEmpId == '') {
    //     $scope.showMsg("error", "Please Enter Minimum Hour For Half Day");
    //     return true;
    //   }
    //   if ($scope.entity.FADAppDate == undefined || $scope.entity.FADAppDate == null || $scope.entity.FADAppDate == '') {
    //     $scope.showMsg("error", "Please Enter Maximum Hour For Half Day");
    //     return true;
    //   }

    //   return false;
    // }

    function _validateSanctionForm() {
      if ($scope.sanctionEntity.StatusId == "0" || $scope.sanctionEntity.StatusId == undefined) {
        $scope.showMsg("error", "Please Select Status");
        return true;
      }
      if ($scope.sanctionEntity.AFDADRemark == undefined || $scope.sanctionEntity.AFDADRemark == null || $scope.sanctionEntity.AFDADRemark == '') {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
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
      $scope.showEditForm = false;
      $scope.showSanctionForm = true;
      $scope.showForm = true;
      $scope.page.refreshData();
      $scope.sanctionEntity = {};


    }
    function _saveErrorResult(err) {
      $scope.showMsg("error", err)
    }

    function _editRecord(row) {
      if (row.entity.StatusId == 0) {
        console.log(row)
        $scope.entity = row.entity;
        $scope.entity.FADEmpId = row.entity.FADEmpId
        console.log($scope.entity.FADEmpId)
        $scope.showEditForm = true;
        $scope.showSanctionForm = true;
        $scope.showForm = false;
      }
    }


  }

})();
