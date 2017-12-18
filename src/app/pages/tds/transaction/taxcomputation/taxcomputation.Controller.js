
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tds.transaction.taxcomputation')
    .controller('taxcomputationController', taxcomputationController);

  /** @ngInject */
  function taxcomputationController($scope, $state, pageService, editFormService, $filter) {
    console.log('taxcomputationController')
    debugger;
    var vm = this;
    vm.pageId = 478;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    vm.queryId = 602;
    $scope.getTaxComputation = _getEmployeeAttendance
    $scope.calculateAmount = _calculateAmount;
    $scope.weekGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      cellEditableCondition: _cellEditableCondition,
      onRegisterApi: _onRegisterApi,
      // afterCellEdit: _afterCellEdit
    }



    function _cellEditableCondition(scope) {
      if (scope.col.name == 'Amount') {
        if (scope.row.entity.THDIsBasic == 1) {
          return false;
        }
        else if (scope.row.entity.THDIsHra == 1) {
          return false;
        }
        else if (scope.row.entity.THDIsHra == 1) {
          return false;
        }
        else {
          return true;
        }

      }

    }

    function _onRegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

        console.log(rowEntity, 'rowEntity', colDef, 'colDef', newValue, 'newValue', oldValue, 'oldValue')
        var headLimitAmount = parseFloat(rowEntity.THLDLimitAmount)
        var cellAmount = rowEntity.Amount;




        // var actualRentReceived;
        if (rowEntity.THDDisplayIndex == 2) {
          if (headLimitAmount < cellAmount && headLimitAmount != 0) {
            rowEntity.Amount = headLimitAmount
          }
          else {
            rowEntity.Amount = cellAmount
            $scope.actualRentReceived = cellAmount;
            angular.forEach($scope.weekGridOptions.data, function (row, rdx) {
              if (rdx == 3) {
                if (row.THDDisplayIndex == 3) {
                  if (isNaN($scope.actualRentReceived)) {
                    $scope.actualRentReceived = 0;
                  }
                  if ($scope.actualRentReceived > 0) {
                    var tenPerOfBasic = $scope.actualRentReceived - ($scope.basicSalary / 10);
                    row.Amount = tenPerOfBasic;
                    _minAmount();
                  }
                  else {
                    row.Amount = 0;
                  }
                }
              }
              console.log(row, rdx)
            })
          }
        }


      })
    }

    function _minAmount() {
      var minimumAmount = Math.min.apply(Math, $scope.weekGridOptions.data.map(function (item) { return item.Amount; }));
      console.log(minimumAmount);
      vm.hraMinAmount = minimumAmount;
    }

    $scope.eightyCGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      cellEditableCondition: _eightCCellEditableCondition,
      onRegisterApi: _eightCOnRegisterApi
    }

    function _eightCCellEditableCondition(scope) {
      if (scope.col.name == 'Amount') {
        if (scope.row.entity.THDDisplayIndex == 4) {
          return false;
        }
        else {
          return true;
        }
      }
    }

    function _eightCOnRegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
        var finalTotal = 0;
        var groupHeadLimitAmount = parseFloat(rowEntity.TGLDLimitAmount)
        var eightCCellAmount = rowEntity.Amount;
        angular.forEach($scope.eightyCGridOptions.data, function (row, rdx) {
          if (row.Amount !== undefined)
            finalTotal += parseInt(row.Amount);
        })
        vm.eightyCTotalAmount = finalTotal;

        console.log(finalTotal)

        if (rowEntity.THDDisplayIndex == 5 || rowEntity.THDDisplayIndex == 6) {
          if (groupHeadLimitAmount > eightCCellAmount) {
            if (groupHeadLimitAmount > finalTotal) {
              rowEntity.Amount = eightCCellAmount;
            }
            else {
              $scope.showMsg('warning', 'Amount should be less than ' + groupHeadLimitAmount);
              rowEntity.Amount = 0;
            }
          }
          else {
            $scope.showMsg('warning', 'Amount should be less than ' + groupHeadLimitAmount);
            rowEntity.Amount = 0;
          }
        }
        console.log(finalTotal)
      })

    }

    $scope.sixAGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      onRegisterApi: _sixARegisterApi
    }

    function _sixARegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
        var sixALimitAmount = parseFloat(rowEntity.THLDLimitAmount);
        var sixAAmount = parseFloat(rowEntity.Amount);
        if (rowEntity.THDDisplayIndex == 7 || rowEntity.THDDisplayIndex == 8 || rowEntity.THDDisplayIndex == 9 || rowEntity.THDDisplayIndex == 10 || rowEntity.THDDisplayIndex == 11) {
          if (sixALimitAmount > sixAAmount) {
            rowEntity.Amount = sixAAmount;
          }
          else {
            $scope.showMsg('warning', 'Amount should be less than ' + sixALimitAmount);
            rowEntity.Amount = 0;
          }
        }
        var finalTotal = 0;
        angular.forEach($scope.sixAGridOptions.data, function (row, rdx) {
          if (row.Amount !== undefined)
            finalTotal += parseInt(row.Amount);
        })
        vm.sixATotalAmount = finalTotal;
        console.log(finalTotal)
      })
    }

    $scope.sevenAGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10
    }


    $scope.gridLine = false;
    $scope.weekGridOptions.columnDefs = [];

    $scope.selectedDesignDept = _selectedDesignDept;

    function _loadController() {
      pageService.getPagData(vm.pageId).then(function (result) {
        console.log(result)
        $scope.manualAttendance = result;
        // var currentDate = moment().format("DD-MM-YYYY");
        // console.log(currentDate)
      })

    }


    function _selectedDesignDept() {
      $scope.entity.JDDate = $scope.entity.selectedEmp.JDDate;
      $scope.entity.EmpCode = $scope.entity.selectedEmp.EmpCode;
      $scope.entity.JDCategory = $scope.entity.selectedEmp.CategoryName;
      $scope.entity.DesgName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.DeptName = $scope.entity.selectedEmp.DeptName;
      $scope.entity.GenderName = $scope.entity.selectedEmp.GenderName;
      $scope.entity.PdDateOfBirth = $scope.entity.selectedEmp.PdDateOfBirth
      // $scope.entity.SalAmount = $scope.entity.selectedEmp.SalAmount

      var grossSalary = parseFloat($scope.entity.selectedEmp.SalAmount);
      if (isNaN(grossSalary))
        hFFDTZHOTHours = 0;
      $scope.entity.SalAmount = grossSalary * 12;


      // $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;
      // _getEmpFullAndFinal();
    }


    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
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
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      pageResult: null,
      dataResult: null
    }

    function _addRecord() {
      $scope.showStatus = false;
      $scope.disabledEmp = false;
      $scope.entity = {};
      $scope.showGrid = false;
      $scope.showEditForm = true;

      $scope.page.refreshData();
    }

    function _getEmployeeAttendance() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: 4 }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 0 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: 3 }
      searchLists.push(searchListData)


      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(_getEmployeeAttendanceResult, _getEmployeeAttendanceErrorResult)
    }

    function _getEmployeeAttendanceResult(result) {
      $scope.gridLine = true;
      console.log(result)
      $scope.weekGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'HRA Exemption Calculation', width: 300, enableCellEdit: false },
        { name: 'TGLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, }
      ]


      $scope.weekGridOptions.data = result[0];

      if (result[0][0].THDIsBasic == 1) {
        $scope.basicSalary = result[0][0].Amount;
        console.log($scope.basicSalary)
      }


      // console.log($scope.weekGridOptions.data)

      if ($scope.weekGridOptions.data.length > 0) {
        // angular.forEach(uploadGridData.data, function (newEmpDetail) {
        //   var oldEmpDetail = $filter("findObj")($scope.weekGridOptions.data, newEmpDetail.EmpId, "EmpId")
        // })
      }
      _getSecEightC()
    }

    function _getEmployeeAttendanceErrorResult(error) {
      console.log(error)
    }

    function _getSecEightC() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: 4 }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 1 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: 3 }
      searchLists.push(searchListData)

      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(_getSecEightCResult, _getSecEightCErrorResult)
    }

    function _getSecEightCResult(result) {
      $scope.gridLine = true;
      console.log(result)
      $scope.eightyCGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'Deduction Under Chapter VI (Sec-80C)', width: 300, enableCellEdit: false },
        { name: 'TGLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true }
      ]

      $scope.eightyCGridOptions.data = result[0];
      _getSecSixA()
    }

    function _getSecEightCErrorResult(error) {

    }

    function _getSecSixA() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: 4 }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 2 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: 3 }
      searchLists.push(searchListData)

      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(_getSecSixAResult, _getSecSixAErrorResult)
    }

    function _getSecSixAResult(result) {
      $scope.gridLine = true;
      console.log(result)
      $scope.sixAGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'Deduction Under Chapter VI-A', width: 300, enableCellEdit: false },
        { name: 'THLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, }
      ]

      $scope.sixAGridOptions.data = result[0];
      _getASvenA();
    }

    function _getSecSixAErrorResult() {

    }

    function _getASvenA() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: 4 }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 2 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: 3 }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(_getSevenAResult, _getSevenAErrorResult)
    }

    function _getSevenAResult(result) {
      $scope.gridLine = true;
      console.log(result)
      $scope.sevenAGridOptions.columnDefs = [
        { name: 'TDName', displayName: 'Sec 87 A', width: 300, enableCellEdit: false },
        { name: 'TSDAmount', displayName: 'Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, }
      ]

      $scope.sevenAGridOptions.data = result[1];

    }

    function _getSevenAErrorResult(error) {

    }

    function _calculateAmount() {
      $scope.entity.totalDeductionBenefits = vm.hraMinAmount + vm.sixATotalAmount + vm.eightyCTotalAmount;
      console.log(vm.hraMinAmount, vm.sixATotalAmount, vm.eightyCTotalAmount)
    }

    _loadController()

  }

})();
