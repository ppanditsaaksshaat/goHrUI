/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leaveapplication')
    .controller('LeaveAppController', LeaveAppController);

  /** @ngInject */
  function LeaveAppController($scope, $state, $timeout, pageService) {

    var vm = this;
    var pageId = 157;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 157;

    $scope.saveForm = _saveForm;
    $scope.employeeOnChange = _employeeOnChange;
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
      editRecord: true,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }

    function _addRecord() {
      $scope.showEditForm = true;
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
          alert('No Leave Type Avaible')
          $scope.isLeaveTransactionTable = false;
        }
        else {
          $scope.leaveTypeDataList = result;
          console.log(result)
          $scope.isLeaveTransactionTable = true;
        }
      });
    }

    function _validateForm(editForm) {
      return true;
    }

    function _saveForm(editForm) {
      debugger;
      if (_validateForm(editForm)) {

        if ($scope.entity.LEADEmpId != "" && $scope.entity.LEADEmpId !== undefined) {

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

            var totalCredit = 0;
            var totalDebit = 0;
            var balanceLeave = 0;
            var leaveType = $scope.entity.LEADLTId;

            console.log($scope.entity.LEADLTId)
            if ($scope.searchEmployeeLeaveTransactionList === undefined) {
              $scope.searchEmployeeLeaveTransactionList = [];

            }
            $scope.searchEmployeeLeaveTransactionList = [];
            _employeeOnChange()
            $scope.searchEmployeeLeaveTransactionList = $scope.leaveTypeDataList;
            console.log($scope.searchEmployeeLeaveTransactionList)
            // var leaveCredit = parseInt(value.ELTLeaveCr);
            // var leaveDebit = parseInt(value.ELTLeaveDr);

            var totalCredit = parseInt($scope.searchEmployeeLeaveTransactionList.Creadit);
            var totalDebit = parseInt($scope.searchEmployeeLeaveTransactionList.Debit);

            if (totalCredit >= totalDebit) {
              // debugger;
              balanceLeave = totalCredit - totalDebit;
              if (balanceLeave >= days) {
                $scope.oldEntity = {};
                $scope.action = 'create';
                console.log($scope.entity, $scope.oldEntity, $scope.action)
                editFormService.saveForm($scope.pageId, $scope.entity, $scope.oldEntity, $scope.action, $scope.page.pageinfo.tagline)
              }
              else {
                alert('You Can Not Apply Leave.')
              }
            }
            else {
              alert('Your leave is exta leave according to your balance Leave')
            }
            console.log(totalCredit)
            console.log(totalDebit)
          }
          else {
            alert('to date should be greater than from date')
          }

        }
        else {
          alert('Please Select Employee Name And Leave Type')
        }



      }
    }
  }

})();
