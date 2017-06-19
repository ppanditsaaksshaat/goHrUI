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
    var leaveControlTableId = 273;
    var leaveControlPageId = 261;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.closeForm = _closeForm;
    // $scope.onChangeDate = _onChangeDate;
    // $scope.getLeaveTypeAccordingLeaveControl = _getLeaveTypeAccordingLeaveControl;

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
      $scope.isLeaveTransactionTable = false;


    }

    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }



    function _employeeOnChange() {
      $scope.isLeaveTransactionTable = false;
      $scope.entity.LEADDateFrom = "";
      $scope.entity.LEADDateTo = "";
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

          // $scope.showMsg('success', 'No leave type avaible.', '');
          alert('No leave type avaible.')
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


    function _editRecord(row) {

      console.log(row)

      $scope.entity = row.entity;
      // $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
      $scope.isLeaveApprovedDet = true;
      $scope.showSave = false;

    }


    function _saveForm(editForm) {
      if (($scope.entity.LEADEmpId != "") && ($scope.entity.LEADEmpId !== undefined)) {
        if (($scope.entity.LEADLTId != "") && ($scope.entity.LEADLTId !== undefined)) {
          if ((($scope.entity.LEADDateFrom != "") && ($scope.entity.LEADDateFrom !== undefined)) && (($scope.entity.LEADDateTo != "") && ($scope.entity.LEADDateTo !== undefined))) {
            var fromDate = new Date($scope.entity.LEADDateFrom)
            var toDate = new Date($scope.entity.LEADDateTo);
            if (toDate >= fromDate) {
              var searchLists = [];
              var searchListData = {
                field: 'EmpId',
                operand: '=',
                value: $scope.entity.LEADEmpId
              }
              searchLists.push(searchListData)
              searchListData = {
                field: 'LeaveTypeID',
                operand: '=',
                value: $scope.entity.LEADLTId
              }
              searchLists.push(searchListData)
              searchListData = {
                field: 'fromdate',
                operand: '=',
                value: $scope.entity.LEADDateFrom
              }
              searchLists.push(searchListData)
              searchListData = {
                field: 'todate',
                operand: '=',
                value: $scope.entity.LEADDateTo
              }
              searchLists.push(searchListData)
              var data = {
                searchList: searchLists,
                orderByList: []
              }
              console.log(searchLists)
              var queryId = 519;
              pageService.getCustomQuery(data, queryId).then(function (result) {
                console.log(result)
                if (result[0].Massage == 'Valid Leave Apply') {
                  // $scope.showMsg('success', result[0].Massage);
                  // $scope.showEditForm = true;
                  if (_validateForm(editForm)) {
                    editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action,
                      $scope.page.pageinfo.tagline).then(_successLeaveApp, _errorLeaveApp);
                    editForm.$setPristine();
                  }

                }
                else if (result[0].Massage != 'Valid Leave Apply') {
                  $scope.showMsg('error', result[0].Massage);
                  $scope.showEditForm = true;
                  console.log(result[0].Massage)
                }
                else {
                  $scope.showEditForm = true;
                  console.log(result[0].Massage)
                  $scope.showMsg('error', 'this leave is not valid ..');

                }

              });
            }
            else
              $scope.showMsg('error', 'Your from date should be less than or equal..');
          }
          else
            $scope.showMsg('error', 'Please Select to date and from Date..');
        }
        else
          $scope.showMsg('error', 'Please Select Leave Type.');
      }
      else
        $scope.showMsg('error', 'Please Select Employee Name And Leave Type.');
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
    //     $scope.showEditForm = false;
    //     // editForm.$setPristine();
    //   }
    //   else if (result.success_message == 'Record Updated.') {
    //     $scope.showEditForm = false;
    //   }
    //   else
    //     $scope.showEditForm = true;
    // })


    function _validateForm(editForm) {
      var valid = editFormService.validateForm(editForm)
      return valid;
    }




    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    function _approvedLeave() {

      // $scope.entity.LEADId
      $scope.newEntity = {};

      // alert('APPROVED');
      $scope.newEntity.ELSDELAId = $scope.entity.LEADId;
      $scope.newEntity.ELSDSanctionFromDate = $scope.entity.LEADDateFrom;
      $scope.newEntity.ELSDSanctionToDate = $scope.entity.LEADDateTo;
      $scope.newEntity.ELSDLeaveStatusId = 1;
      // console.log($scope.entity)
      console.log($scope.newEntity)
      $scope.page.action = 'create';
      if (_validateForm(editForm)) {
        editFormService.saveForm(sanctionLeavePageId, $scope.newEntity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLeaveApproved, _errorLeaveApproved);
      }

      // editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, 
      // $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)

      // $scope.showEditForm = false;
    }

    function _successLeaveApproved(result) {
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

    function _errorLeaveApproved() {

    }



    // _getLeaveTypeAccordingLeaveControl()
  }
})();
