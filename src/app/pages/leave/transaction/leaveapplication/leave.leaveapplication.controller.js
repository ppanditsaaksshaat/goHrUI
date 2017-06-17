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
      // $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
      $scope.isLeaveApprovedDet = true;
      $scope.showSave = false;

    }

    // function _saveForm(editForm) {
    //   // alert('save')
    //   // debugger;
    //   // if (_validateForm(editForm)) {
    //   if ($scope.entity.LEADEmpId != "" && $scope.entity.LEADEmpId !== undefined) {
    //     if ($scope.entity.LEADLTId != "" && $scope.entity.LEADLTId !== undefined) {
    //       console.log($scope.entity.LEADDateFrom)
    //       console.log($scope.entity.LEADDateTo)
    //       if (($scope.entity.LEADDateFrom != "" && $scope.entity.LEADDateFrom !== undefined) && ($scope.entity.LEADDateTo != "" && $scope.entity.LEADDateTo !== undefined)) {
    //         debugger;
    //         if ($scope.entity.LEADDateFrom === undefined) {
    //           $scope.entity.LEADDateFrom = "";
    //         }
    //         if ($scope.entity.LEADDateTo === undefined) {
    //           $scope.entity.LEADDateTo = "";
    //         }
    //         // // var firstdate = $scope.entity.LEADDateFrom;
    //         // // var seconddate = $scope.entity.LEADDateTo;
    //         // // var one = new Date(firstdate)
    //         // // var two = new Date(seconddate);
    //         // // if (two >= one) {
    //         // // var millisecondsPerDay = 1000 * 60 * 60 * 24;
    //         // // var millisBetween = two.getTime() - one.getTime();
    //         // // $scope.day = millisBetween / millisecondsPerDay;
    //         // // console.log(day)
    //         // // Math.floor(day);
    //         // _getLeaveTypeAccordingLeaveControl()
    //         // // if ($scope.isValiddate) {
    //         //   var balanceLeave = 0;
    //         //   var leaveType = $scope.entity.LEADLTId;
    //         //   console.log($scope.entity.LEADLTId)
    //         //   // if ($scope.totalCredit >= $scope.totalDebit) {
    //         //   // debugger;
    //         //   // balanceLeave = $scope.totalCredit - $scope.totalDebit;
    //         //   // if (balanceLeave >= $scope.day) {
    //           editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
    //             $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
    //           console.log($scope.page.pageinfo.pageid, $scope.entity,
    //             $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
    //         //   $scope.showEditForm = false;
    //         //   // }
    //         //   // else {
    //         //   //   $scope.showMsg('error', 'You Can Not Apply Leave because your leave is exta leave according to your balance Leave..');
    //         //   //   // alert('You Can Not Apply Leave.')
    //         //   // }
    //         //   // }
    //         //   // else {
    //         //   //   $scope.showMsg('error', 'Your leave is exta leave according to your balance Leave.');
    //         //   //   // alert('Your leave is exta leave according to your balance Leave')
    //         //   // }
    //         // // }
    //         // // else {
    //         // //   $scope.showMsg('error', 'you have not apply more than 3 leave.');
    //         // // }
    //         // // }
    //         // // else {
    //         // //   // alert('to date should be greater than from date')
    //         // //   $scope.showMsg('error', 'To date should be greater than from date.');
    //         // // }
    //       }
    //       else {
    //         $scope.showMsg('error', 'Please Select to date and from Date..');
    //       }
    //     }
    //     else {
    //       $scope.showMsg('error', 'Please Select Leave Type.');
    //     }
    //   }
    //   else {
    //     $scope.showMsg('error', 'Please Select Employee Name And Leave Type.');
    //     // alert('Please Select Employee Name And Leave Type')
    //   }
    //   // }
    // }

    // function _saveForm(editForm) {
    //   if (_onChangeDate()) {
    //     //save

    //   }
    //   else {
    //     //not save
    //   }

    // }


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
                    editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
                    editForm.$setPristine();
                  }

                }
                else if (result[0].Massage != 'Valid Leave Apply') {
                  $scope.showMsg('error', result[0].Massage);
                  $scope.showEditForm = true;
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

    $scope.$on('form-success', function (successEvent, result) {
      if (result.success_message == 'Added New Record.') {
        $scope.showEditForm = false;
        // editForm.$setPristine();
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


    // function _getLeaveTypeAccordingLeaveControl() {
    //   $scope.isValiddate = false;
    //   if ($scope.entity.LEADDateFrom === undefined) {
    //     $scope.entity.LEADDateFrom = "";
    //   }
    //   if ($scope.entity.LEADDateTo === undefined) {
    //     $scope.entity.LEADDateTo = "";
    //   }
    //   var one = new Date($scope.entity.LEADDateFrom)
    //   var two = new Date($scope.entity.LEADDateTo);
    //   if (two >= one) {
    //     var millisecondsPerDay = 1000 * 60 * 60 * 24;
    //     var millisBetween = two.getTime() - one.getTime();
    //     var days = millisBetween / millisecondsPerDay;
    //     var balanceLeaves = 0;
    //     var searchLists = [];
    //     var searchListData = {
    //       field: 'LCRLTId',
    //       operand: '=',
    //       // value: $scope.entity.LCRLTId
    //       value: 1
    //     }
    //     searchLists.push(searchListData)
    //     var data = {
    //       searchList: searchLists,
    //       orderByList: []
    //     }
    //     pageService.getTableData(leaveControlTableId, leaveControlPageId, '', '', true, data).then(function (result) {
    //       console.log(result);
    //       console.log(result[0].BRId)
    //       console.log(result[0].LCRMaxDays)
    //       // debugger;
    //       if (days <= result[0].LCRMaxDays) {
    //         console.log(result[0].LCRMaxDays)
    //         if ($scope.totalCredit >= $scope.totalDebit) {
    //           balanceLeaves = $scope.totalCredit - $scope.totalDebit;
    //           if (balanceLeaves >= days) {
    //             return $scope.isValiddate = true;
    //           }
    //           else {
    //             alert('No more leave available in your accout');
    //           }
    //         }
    //       }
    //       else {
    //         alert('You have not permission more than' + result[0].LCRMaxDays + 'leave')
    //       }
    //     })
    //   }
    //   else {
    //     alert('Your from date should be less than OR equel ')
    //   }
    // }

    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    function _approvedLeave() {
      debugger;
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
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      }

      // editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity, 
      // $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)

      // $scope.showEditForm = false;
    }

    // _getLeaveTypeAccordingLeaveControl()
  }
})();
