/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leavecarryforward')
    .controller('carrryForwardController', carrryForwardController);

  /** @ngInject */
  function carrryForwardController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    vm.pageId = 483;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    console.log($scope.page)
    $scope.entity = {}
    console.log($scope.page)
    //$scope.page.pageId = 483;
    $scope.getEmployeeList = _getEmployeeList;
    vm.carryForwardQueryId = 613;
    $scope.gridLine = false;
    $scope.saveCarryForward = _saveCarryForward;
    $scope.approvedCarry = _approvedCarry;
    var selectedRowData = [];
    $scope.isApproved = false;
    $scope.trueVal = false;



    //Carry Forward Leave All Function
    $scope.carryForwordGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      enablePaginationControls: false,
      onRegisterApi: _carryForwardOnRegisterApi,
      cellEditableCondition: _carryForwardCellEditableCondition
    }

    function _carryForwardCellEditableCondition(scope) {
      console.log(scope.col.name)

      if (scope.col.name == 'CarryForward') {
        if (scope.row.entity.ApplicationStatus == 'Approved') {
          return false;
        }
        else {
          return true;
        }
      }
    }

    function _carryForwardOnRegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

        console.log(rowEntity, 'rowEntity', colDef, 'colDef', newValue, 'newValue', oldValue, 'oldValue')
        // var headLimitAmount = parseFloat(rowEntity.THLDLimitAmount)
        // var cellAmount = rowEntity.Amount;
        // rowEntity.EnterAmount = rowEntity.Amount;
        var newvalues = newValue;
        if (isNaN(newvalues))
          newvalues = 0;

        var maxCarryForwardLeave = $scope.entity.maxCarryForwardLeave;
        if (isNaN(maxCarryForwardLeave))
          maxCarryForwardLeave = 0;
          

        var balanceLeave = rowEntity.Balance
        if (isNaN(balanceLeave))
          balanceLeave = 0;

        var oldValues = oldValue;
        if (isNaN(oldValues))
          oldValues = 0;

        if (newvalues <= balanceLeave) {
          if (newvalues <= maxCarryForwardLeave) {
            rowEntity.CarryForward = newvalues
            rowEntity.RemainingBalance = balanceLeave - newvalues;
          }
          else {
            rowEntity.CarryForward = $scope.entity.carryForwardLeave;
          }
        }
        else {
          rowEntity.CarryForward = $scope.entity.carryForwardLeave;
        }
      })

      gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
        selectedRowData = [];

        $scope.trueVal = false;
        for (var rows = 0; rows < row.length; rows++) {
          if (row[0].isSelected) {
            var r = row[rows];
            selectedRowData.push(r.entity);
            $scope.trueVal = true;
            $scope.isApproved = true;

            $scope.page.selectedRows = gridApi.selection.getSelectedRows();
          }
          else {
            $scope.isApproved = false;
          }
        }
      });

      // for individual select event
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        // debugger;
        console.log(row)

        if (row.isSelected) {
          selectedRowData.push(row.entity);
          $scope.trueVal = true;
          $scope.isApproved = true;
        }
        else {
          selectedRowData.splice(row, 1);
          $scope.isApproved = false;
        }


        console.log(selectedRowData)
        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
        if ($scope.page.selectedRows.length > 0) {

        }
        else {
          //DJWebStoreGlobal.ClearPageMenu();
        }
      });
    }

    // function _approvedCarry() {

    //   for (var row = 0; row < selectedRowData.length; row++) {
    //     var rowData = selectedRowData[row];
    //     // console.log(rowData)
    //     for (var col = 0; col < $scope.carryForwordGridOptions.columnDefs.length; col++) {
    //       var colData = $scope.carryForwordGridOptions.columnDefs[col];
    //       // if (colData.name != 'EmpId' && colData.name != 'EmpName' && colData.name != 'Sno' && colData.name != 'ShifOutTime' && colData.name != 'ShiftInTime') {
    //       //   if (rowData[colData.name] == 'A') {
    //       //     rowData[colData.name] = 'P';
    //       //   }
    //       // }
    //       console.log(colData)
    //       console.log(rowData)
    //     }
    //   }
    //   // selectedRowData = [];
    // }

    function _getEmployeeList() {
      _getCarryForwardLeave();
    }

    function _getCarryForwardLeave() {


      if ($scope.entity.yearId !== undefined && $scope.entity.yearId != '') {
        if ($scope.entity.leaveTypeId !== undefined && $scope.entity.leaveTypeId != '') {
          if ($scope.entity.subUnitId !== undefined && $scope.entity.subUnitId != '') {
            var searchLists = [];
            if ($scope.entity.subUnitId.value == -1) {
              $scope.entity.subUnitId.value = 0;
            }
            searchLists.push({ field: 'LeaveTypeId', operand: '=', value: $scope.entity.leaveTypeId.value },
              { field: 'SubUnitId', operand: '=', value: $scope.entity.subUnitId.value },
              { field: 'DeptId', operand: '=', value: 0 },
              { field: 'YearId', operand: '=', value: $scope.entity.yearId.value }
            )
            console.log(searchLists)
            var data = {
              searchList: searchLists,
              orderByList: []
            }
            pageService.getCustomQuery(data, vm.carryForwardQueryId).then(_getCarryForwardLeaveSuccessResult, _getCarryForwardLeaveErrorResult)

          }
          else {
            $scope.showMsg("warning", "Please Select SubUnit")
          }
        }
        else {
          $scope.showMsg("warning", "Please Select Leave Type")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select Year")
      }
    }

    function _getCarryForwardLeaveSuccessResult(result) {
      console.log(result)
      console.log(result[0][0].RESULT)
      if (result[0][0].RESULT == 'SUCCESS LIST') {
        $scope.gridLine = true;
        console.log(result)
        $scope.entity.maxCarryForwardLeave = result[1][0].LRCMaxCarryDays;
        $scope.entity.carryForwardLeave = result[1][0].CarryForward;
        $scope.carryForwordGridOptions.columnDefs = [
          { name: 'EmpName', displayName: 'Employee Name', width: 200, enableCellEdit: false },
          { name: 'EmpCode', displayName: 'Employee Code', width: 125, enableCellEdit: false },
          { name: 'DeptName', displayName: 'Department', width: 200, enableCellEdit: false, },
          { name: 'DesgName', displayName: 'Designation', width: 150, enableCellEdit: false },
          // { name: 'LocationName', displayName: 'Location', width: 200, enableCellEdit: true, },
          // { name: 'BRName', displayName: 'Branch', width: 130, enableCellEdit: false, },
          { name: 'Balance', displayName: 'OutStanding', width: 130, enableCellEdit: false, },
          { name: 'CarryForward', displayName: 'Max Carry Forward', width: 130, enableCellEdit: true, },
          { name: 'RemainingBalance', displayName: 'Remaining', width: 130, enableCellEdit: false, },
          { name: 'ApplicationStatus', displayName: 'Status', width: 130, enableCellEdit: false, }
        ]
        $scope.carryForwordGridOptions.data = result[1];

        if (result[1][0].CFLDId == 0) {
          _saveCarryForward()
        }
        // if ($scope.carryForwordGridOptions.data.length > 0) {
        //   // _saveCarryForward();
        // }
      }
      else {
        $scope.gridLine = false;
        // $scope.showMsg("Error", result[0][0].RESULT)
        $scope.showMsg("error", result[0][0].RESULT);
      }
    }
    function _getCarryForwardLeaveErrorResult(error) {
      $scope.showMsg("error", error)
    }

    function _saveCarryForward(editForm, entity) {

      var count = 0;
      $scope.multi = {
        parentRows: [],
        delRecords: []
      };
      $scope.ruleMulti = {};
      $scope.ruleMulti.parentRows = [];

      angular.forEach($scope.carryForwordGridOptions.data, function (row, rdx) {
        var multiEntity = {}
        var actionCreateOrEdit = '';
        var gridRowData = {
          CFLDId: row.CFLDId,
          CFLDEmpId: row.ELTEmpId,
          CFLDLTId: row.LTId,
          CFLDLRCIdFrom: row.ELTLCRId,
          CFLDLRCIdTo: 0,
          CFLDFromYearId: $scope.entity.yearId.value,
          CFLDBalanceAsOnLeave: row.Balance,
          CFLDMaxAllowedLeave: row.LRCMaxCarryDays,
          CFLDLeaveApproved: row.Balance,
          CFLDRemaing: row.RemainingBalance,
          CFLDLRCId: row.ELTLCRId,
          // StatusId: 1
        }
        $scope.multiEntity = {}
        // if ($scope.trueVal) {
        //   // multiEntity = $scope.selectRowValue;
        //   $scope.multiEntity.parent = {
        //     newEntity: $scope.selectRowValue,
        //     oldEntity: {},
        //     action: 'edit',
        //     tableid: 473,
        //     pageid: 483
        //   }
        // }
        // else {
        // multiEntity = gridRowData;
        $scope.multiEntity.parent = {
          newEntity: gridRowData,
          oldEntity: {},
          action: 'create',
          tableid: 473,
          pageid: 483
          // }
        }

        console.log(multiEntity)
        // return;


        $scope.multiEntity.child = [];
        // $scope.multi.parentRows.push(multiEntity);
        $scope.ruleMulti.parentRows.push($scope.multiEntity);
      })
      $scope.multi.parentRows.push($scope.ruleMulti);
      console.log($scope.multi)


      var postData = JSON.stringify($scope.multi);
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }

      pageService.multiSaveRows(data).then(function (result) {
        $scope.gridLine = true;
        console.log(result)
        if (result == "done") {
          $scope.showMsg("success", "Record Saved Successfully");
          employeeEnt = [];
        }

      }, function (err) {
        $scope.gridLine = true;
        console.log(err)
      })

    }


    function _approvedCarry() {
      var count = 0;
      $scope.multi = {
        parentRows: [],
        delRecords: []
      };
      $scope.ruleMulti = {};
      $scope.ruleMulti.parentRows = [];

      angular.forEach(selectedRowData, function (row, rdx) {
        $scope.selectRowValue = {
          CFLDId: row.CFLDId,
          CFLDEmpId: row.CFLDEmpId,
          CFLDLTId: row.LTId,
          CFLDLRCIdFrom: row.ELTLCRId,
          CFLDLRCIdTo: 0,
          CFLDFromYearId: $scope.entity.yearId.value,
          CFLDBalanceAsOnLeave: row.Balance,
          CFLDMaxAllowedLeave: row.LRCMaxCarryDays,
          CFLDLeaveApproved: row.Balance,
          CFLDRemaing: row.RemainingBalance,
          CFLDLRCId: row.ELTLCRId,
          StatusId: 1
        }
        $scope.multiEntity = {}

        $scope.multiEntity.parent = {
          newEntity: $scope.selectRowValue,
          oldEntity: {},
          action: 'edit',
          tableid: 473,
          pageid: 483
        }

        // console.log(multiEntity)
        // return;


        $scope.multiEntity.child = [];
        // $scope.multi.parentRows.push(multiEntity);
        $scope.ruleMulti.parentRows.push($scope.multiEntity);
      })
      $scope.multi.parentRows.push($scope.ruleMulti);
      console.log($scope.multi)


      var postData = JSON.stringify($scope.multi);
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }

      pageService.multiSaveRows(data).then(function (result) {
        $scope.gridLine = true;
        console.log(result)
        if (result == "done") {
          $scope.showMsg("success", "Record Saved Successfully");
          employeeEnt = [];
        }

      }, function (err) {
        $scope.gridLine = true;
        console.log(err)
      })

      // _saveCarryForward()

    }

  }

})();
