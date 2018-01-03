// import { parse } from "path";


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
    vm.taxDeductionQuery = 604;
    $scope.getTaxComputation = _getWeekGridOptions;
    $scope.calculateAmount = _calculateAmount;
    var minimumAmount = 0;
    var eightyCfinalTotal = 0;
    var sixAFinalTotal = 0;
    $scope.gridLine = false;
    // $scope.weekGridOptions.columnDefs = [];
    $scope.selectedDesignDept = _selectedDesignDept;
    var taxComEmpHeaderPageId = 479;
    var taxComCalAmtPageId = 480;
    $scope.taxComSave = _taxComSave;
    $scope.closeForm = _closeForm;
    var TDSTacComEmpHeaderAndCalAmount = 606;
    var categoryQueryId = 607;
    $scope.showGrid = true;
    vm.oldEntity = {};


    // var TDSTacComEmpHeaderAndCalAmount


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
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      pageResult: null,
      dataResult: null
    }

    //loadController
    function _loadController() {


      pageService.getPagData(vm.pageId).then(function (result) {
        console.log(result)
        $scope.manualAttendance = result;
        // var currentDate = moment().format('YYYY-MM-DD');
        // console.log(currentDate)

        console.log($scope.manualAttendance)
        // console.log(page.pageinfo.selects)

      })
      pageService.getPagData(taxComEmpHeaderPageId).then(_successTaxComHedResult, _errorTaxComHedResult)
      pageService.getPagData(taxComCalAmtPageId).then(_successTaxComCalAmtResult, _errorTaxComCalAmtResult)
    }
    function _successTaxComHedResult(result) {
      $scope.taxComEmpHeaderPage = result;
      console.log(result)
    }
    function _errorTaxComHedResult(error) {
      $scope.showMsg("error", error)
    }
    function _successTaxComCalAmtResult(result) {
      $scope.taxComCalAmtPage = result;
      console.log(result)
    }
    function _errorTaxComCalAmtResult(error) {
      $scope.showMsg("error", error)
    }
    //End loadController

    //WeekGridOptions All Function
    $scope.weekGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      // paginationPageSize: 10,
      cellEditableCondition: _weekGridCellEditableCondition,
      onRegisterApi: _weekGridOnRegisterApi,
      enablePaginationControls: false
      // afterCellEdit: _afterCellEdit
    }
    function _getWeekGridOptions() {
      $scope.isYear = true;
      $scope.isCalculated = false;
      console.log($scope.entity.yearId)
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: $scope.entity.yearId.value }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 0 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
      searchLists.push(searchListData)


      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(__getWeekGridOptionsResult, __getWeekGridOptionsErrorResult)
    }
    function __getWeekGridOptionsResult(result) {
      // $scope.gridLine = true;
      console.log(result)
      $scope.weekGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'HRA Exemption Calculation', width: 300, enableCellEdit: false },
        { name: 'TGLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]
      if (result[0].length > 0) {
        $scope.weekGridOptions.data = result[0];
        if (result[0][0].THDIsBasic == 1) {
          $scope.basicSalary = result[0][0].Amount;
          console.log($scope.basicSalary)
        }
        if (isNaN($scope.basicSalary)) {
          $scope.basicSalary = 0;
        }
        if ($scope.basicSalary > 0) {
          _getSecEightC()
          $scope.gridLine = true;
        }
        else {
          $scope.gridLine = false;
          $scope.showMsg("error", "Employee basic salary does not exist.")
        }
      }
      else {
        $scope.showMsg("error", "No data found in this financial year.")
        $scope.gridLine = false;
        $scope.isYear = false;
      }
      console.log(result[0].length)
      minimumAmount = Math.min.apply(Math, $scope.weekGridOptions.data.map(function (item) { return item.Amount; }));
      console.log(minimumAmount);
      vm.hraMinAmount = minimumAmount;
      $scope.hraMinAmounts = minimumAmount;
      // console.log($scope.weekGridOptions.data)
      if ($scope.weekGridOptions.data.length > 0) {
        // angular.forEach(uploadGridData.data, function (newEmpDetail) {
        //   var oldEmpDetail = $filter("findObj")($scope.weekGridOptions.data, newEmpDetail.EmpId, "EmpId")
        // })
      }
    }
    function __getWeekGridOptionsErrorResult(error) {
      $scope.showMsg("error", error)
    }
    function _weekGridCellEditableCondition(scope) {
      console.log(scope.row.entity)
      if (scope.col.name == 'Amount') {
        if (scope.row.entity.THDIsBasic == 1) {
          return false;
        }
        else if (scope.row.entity.THDIsHra == 1) {
          return false;
        }
        else if (scope.row.entity.THDDisplayIndex == 3) {
          return false;
        }
        else {
          return true;
        }

      }

    }
    function _weekGridOnRegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

        console.log(rowEntity, 'rowEntity', colDef, 'colDef', newValue, 'newValue', oldValue, 'oldValue')
        var headLimitAmount = parseFloat(rowEntity.THLDLimitAmount)
        var cellAmount = rowEntity.Amount;
        rowEntity.EnterAmount = rowEntity.Amount;





        // var actualRentReceived;
        if (rowEntity.THDDisplayIndex == 2) {
          if (headLimitAmount < cellAmount && headLimitAmount != 0) {
            rowEntity.Amount = headLimitAmount
          }
          else {
            rowEntity.Amount = cellAmount
            $scope.actualRentReceived = cellAmount;

            // $scope.basicSalary
            if (isNaN($scope.basicSalary)) {
              $scope.basicSalary = 0;
            }

            angular.forEach($scope.weekGridOptions.data, function (row, rdx) {
              if (rdx == 3) {
                if (row.THDDisplayIndex == 3) {
                  if (isNaN($scope.actualRentReceived)) {
                    $scope.actualRentReceived = 0;
                  }
                  if ($scope.actualRentReceived > 0) {
                    if ($scope.basicSalary !== undefined) {
                      if ($scope.basicSalary != '') {
                        if ($scope.basicSalary != null) {
                          var tenPerOfBasic = $scope.actualRentReceived - ($scope.basicSalary / 10);
                          row.Amount = tenPerOfBasic;
                          _minAmount();
                        }
                        else {
                          $scope.showMsg("warning", "Employee basic salary does not exist.")
                        }
                      }
                      else {
                        $scope.showMsg("warning", "Employee basic salary does not exist.")
                      }
                    }
                    else {
                      $scope.showMsg("warning", "Employee basic salary does not exist.")
                    }
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
      minimumAmount = Math.min.apply(Math, $scope.weekGridOptions.data.map(function (item) { return item.Amount; }));
      console.log(minimumAmount);
      vm.hraMinAmount = minimumAmount;
    }
    //End WeekGridOptions



    //EightyCGridOption All Function
    $scope.eightyCGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      cellEditableCondition: _eightCCellEditableCondition,
      onRegisterApi: _eightCOnRegisterApi,
      enablePaginationControls: false
    }
    function _getSecEightC() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: $scope.entity.yearId.value }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 1 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
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
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.eightyCGridOptions.data = result[0];
      $scope.eightyCGridSecLimitAmount = result[0][0].TGLDLimitAmount;
      angular.forEach($scope.eightyCGridOptions.data, function (row, rdx) {
        if (row.Amount !== undefined)
          eightyCfinalTotal += parseInt(row.Amount);
      })
      vm.eightyCTotalAmount = eightyCfinalTotal;
      $scope.eightyCTotalAmounts = eightyCfinalTotal;

      _getSecSixA()
    }
    function _getSecEightCErrorResult(error) {
      $scope.showMsg("error", error)
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
        eightyCfinalTotal = 0;
        var groupHeadLimitAmount = parseFloat(rowEntity.TGLDLimitAmount)
        var eightCCellAmount = rowEntity.Amount;
        rowEntity.EnterAmount = rowEntity.Amount;
        angular.forEach($scope.eightyCGridOptions.data, function (row, rdx) {
          if (row.Amount !== undefined)
            eightyCfinalTotal += parseInt(row.Amount);
        })
        vm.eightyCTotalAmount = eightyCfinalTotal;
        var bal = eightyCfinalTotal - eightCCellAmount;

        console.log(eightyCfinalTotal)

        if (rowEntity.THDDisplayIndex == 5 || rowEntity.THDDisplayIndex == 6) {
          if (groupHeadLimitAmount >= eightCCellAmount) {
            if (groupHeadLimitAmount >= eightyCfinalTotal) {
              rowEntity.Amount = eightCCellAmount;
            }
            else {
              $scope.showMsg('warning', 'Amount should be less than ' + groupHeadLimitAmount);
              rowEntity.Amount = groupHeadLimitAmount - bal;
            }
          }
          else {
            $scope.showMsg('warning', 'Amount should be less than ' + groupHeadLimitAmount);
            rowEntity.Amount = groupHeadLimitAmount - bal;
            console.log(rowEntity.Amount)
          }
        }
        console.log(eightyCfinalTotal)
      })

    }
    //End EightCGridOption


    //SixAGridOption All Function
    $scope.sixAGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      onRegisterApi: _sixARegisterApi,
      enablePaginationControls: false
    }
    function _getSecSixA() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: $scope.entity.yearId.value }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 2 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
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
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.sixAGridOptions.data = result[0];
      sixAFinalTotal = 0;
      angular.forEach($scope.sixAGridOptions.data, function (row, rdx) {
        if (row.Amount !== undefined)
          sixAFinalTotal += parseInt(row.Amount);
      })
      vm.sixATotalAmount = sixAFinalTotal;
      $scope.sixATotalAmounts = sixAFinalTotal;

      _getASvenA();
    }
    function _getSecSixAErrorResult() {
      $scope.showMsg("error", error)
    }
    function _sixARegisterApi(gridApi) {
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
        var sixALimitAmount = parseFloat(rowEntity.THLDLimitAmount);
        var sixAAmount = parseFloat(rowEntity.Amount);
        rowEntity.EnterAmount = rowEntity.Amount;
        if (rowEntity.THDDisplayIndex == 7 || rowEntity.THDDisplayIndex == 8 || rowEntity.THDDisplayIndex == 9 || rowEntity.THDDisplayIndex == 10 || rowEntity.THDDisplayIndex == 11) {
          if (sixALimitAmount >= sixAAmount) {
            rowEntity.Amount = sixAAmount;
          }
          else {
            $scope.showMsg('warning', 'Amount should be less than ' + sixALimitAmount);
            rowEntity.Amount = sixALimitAmount;
          }
        }
        sixAFinalTotal = 0;
        angular.forEach($scope.sixAGridOptions.data, function (row, rdx) {
          if (row.Amount !== undefined)
            sixAFinalTotal += parseInt(row.Amount);
        })
        vm.sixATotalAmount = sixAFinalTotal;
        console.log(sixAFinalTotal)
      })
    }
    //End SixAGridOptions


    //SevenAGridOption All Function
    $scope.sevenAGridOptions = {
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: 0,
      enableScrollbars: false,
      paginationPageSize: 10,
      enablePaginationControls: false
    }
    function _getASvenA() {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: $scope.entity.yearId.value }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 2 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
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
        { name: 'TDName', displayName: 'Sec 87 A', width: 600, enableCellEdit: false },
        // { name: 'TSDAmount', displayName: 'Tax Credit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.sevenAGridOptions.data = result[1];

    }
    function _getSevenAErrorResult(error) {
      $scope.showMsg("error", error)
    }
    //End SevenAGridOption

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
        grossSalary = 0;
      $scope.entity.SalAmount = grossSalary * 12;

      console.log($scope.entity.selectedEmp.PdDateOfBirth)
      var birthDate = moment($scope.entity.selectedEmp.PdDateOfBirth).format('DD/MM/YYYY');
      var startDate = moment(birthDate, "DD/MM/YYYY");
      var endDate = moment(new Date(), "DD/MM/YYYY");
      var totalAge = endDate.diff(startDate, 'years');
      // console.log(result)

      if (totalAge !== undefined) {
        if (totalAge != '') {
          var searchLists = [];
          searchLists.push({ field: 'EmpAge', operand: '=', value: totalAge })
          var data = {
            searchList: searchLists,
            orderByList: []
          }
          pageService.getCustomQuery(data, categoryQueryId).then(_getCategorySuccessResult, _getCategoryErrorResult)
        }
      }
    }

    function _getCategorySuccessResult(result) {
      console.log(result)
      $scope.entity.Category = result[0][0].Category;
    }

    function _getCategoryErrorResult(error) {
      $scope.showMsg("error", error);
      console.log(error)
    }


    function _calculateAmount() {
      $scope.isCalculated = true;
      $scope.entity.totalDeductionBenefits = vm.hraMinAmount + vm.sixATotalAmount + vm.eightyCTotalAmount;

      if (isNaN(vm.hraMinAmount)) {
        vm.hraMinAmount = 0;
      }

      if (isNaN(vm.sixATotalAmount)) {
        vm.sixATotalAmount = 0;
      }

      if (isNaN(vm.eightyCTotalAmount)) {
        vm.eightyCTotalAmount = 0;
      }

      console.log(vm.hraMinAmount, vm.sixATotalAmount, vm.eightyCTotalAmount)
      $scope.entity.taxableAmount = $scope.entity.SalAmount - ($scope.entity.totalDeductionBenefits);

      if ($scope.entity.taxableAmount != undefined) {
        _calculateSevenAGridOption();
      }
    }
    function _calculateSevenAGridOption() {

      var searchLists = [];
      var searchListData = { field: 'TotalIncome', operand: '=', value: $scope.entity.taxableAmount }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.taxDeductionQuery).then(_getTDSTaxDeductionSuccessResult, _getTDSTaxDeductionErrorResult)



    }
    function _getTDSTaxDeductionSuccessResult(result) {
      console.log(result[0]);
      // TDOrderIndex
      angular.forEach($scope.sevenAGridOptions.data, function (row, rdx) {
        console.log(row)
        console.log(result[0].Surcharge)
        console.log(result[0][0].Surcharge)
        if (row.TDOrderIndex == 0) {
          row.Amount = result[0][0].Surcharge;
        }
        else if (row.TDOrderIndex == 1) {
          row.Amount = result[0][0].EducationCess;
        }
        else if (row.TDOrderIndex == 2) {
          row.Amount = result[0][0].TaxCredit;
        }
        // TaxAmount
        // TotalTaxLiability
      })

      var taxAmount = result[0][0].TaxCredit;
      if (isNaN(taxAmount)) {
        taxableAmount = 0;
      }
      else {
        $scope.entity.taxOnTotalIncome = result[0][0].TaxAmount;
      }



      var surCharge = parseFloat(result[0][0].Surcharge)
      if (isNaN(surCharge)) {
        surCharge = 0;
      }
      else {
        $scope.entity.taxWithSurcharge = surCharge;
      }

      var educationCess = parseFloat(result[0][0].EducationCess)
      if (isNaN(educationCess)) {
        educationCess = 0;
      }


      $scope.entity.taxWithCess = surCharge + educationCess;

      console.log($scope.entity.taxWithCess)

      var totTaxLiability = result[0][0].TotalTaxLiability;
      if (isNaN(totTaxLiability)) {
        totTaxLiability = 0;
      }
      else {
        $scope.entity.taxLiabilityMonthly = (totTaxLiability / 12).toFixed(2);;
        $scope.entity.taxableAmountYearly = totTaxLiability;
      }
    }
    function _getTDSTaxDeductionErrorResult(error) {
      $scope.showMsg("error", error)
    }


    //Save Record
    function _validateTaxComp() {
      if ($scope.entity.selectedEmp == undefined || $scope.entity.selectedEmp == "") {
        $scope.showMsg("error", "Please select employee name.");
        return false;
      }
      if ($scope.entity.yearId == undefined || $scope.entity.yearId == "") {
        $scope.showMsg("error", "Please select year.");
        return false;
      }
      if ($scope.entity.monthId == undefined || $scope.entity.monthId == "") {
        $scope.showMsg("error", "Please select month.");
        return false;
      }
      return true;
    }


    function _taxComSaves() {


      if (_validateTaxComp()) {

        var taxComEmpHeaderDt = {
          TCEHDId: $scope.entity.TCEHDId == undefined ? undefined : $scope.entity.TCEHDId,
          TCEHDEmpId: $scope.entity.selectedEmp.value,
          TCEHDFiscalId: $scope.entity.yearId.value,
          TCEHDMonthId: $scope.entity.monthId.value,
          TCEHDDepId: $scope.entity.selectedEmp.JDDeptId,
          TCEHDDesgId: $scope.entity.selectedEmp.JDDesgId,
          TCEHDGrossIncome: $scope.entity.SalAmount,
          TCEHDTotalDedOrBenefit: $scope.entity.totalDeductionBenefits,
          TCEHDTaxableAmount: $scope.entity.taxableAmount,
          TCEHDTaxOnTotalIncome: $scope.entity.taxOnTotalIncome,
          TCEHDTaxWithSurcharge: $scope.entity.taxWithSurcharge,
          TCEHDTaxWithCess: $scope.entity.taxWithCess,
          TCEHDTaxLiablityMonthly: $scope.entity.taxLiabilityMonthly,
          TCCADtaxableAmountYearly: $scope.entity.taxableAmountYearly,
          TCCADHRAMinAmount: vm.hraMinAmount,
          TCCADEightCTotalAmount: vm.eightyCTotalAmount,
          TCCADSixATotalAmount: vm.sixATotalAmount
        }

        $scope.multiEntity = {};
        $scope.multiEntity.parent = {
          newEntity: taxComEmpHeaderDt,
          oldEntity: {},
          action: $scope.entity.TCEHDId == undefined ? 'create' : 'edit',
          tableid: $scope.taxComEmpHeaderPage.pageinfo.tableid,
          pageid: $scope.taxComEmpHeaderPage.pageinfo.pageid
        }
        $scope.multiEntity.child = [];
        var child = {
          tableid: $scope.taxComCalAmtPage.pageinfo.tableid,
          pageid: $scope.taxComCalAmtPage.pageinfo.pageid,
          parentColumn: $scope.taxComCalAmtPage.pageinfo.idencolname,
          linkColumn: 'TCCADTCHDId',
          idenColName: $scope.taxComCalAmtPage.pageinfo.idencolname,
          rows: []
        }
        // for (var i = 0; i < $scope.weekGridOptions.data.length; i++) {
        //   var col = {
        //     SGWDId: $scope.weekGridOptions.data[i].SGWDId == undefined ? 0 : $scope.weekGridOptions.data[i].SGWDId,
        //     SGWDWeekDayId: $scope.weekGridOptions.data[i].value == undefined ? $scope.weekGridOptions.data[i].SGWDWeekDayId : $scope.weekGridOptions.data[i].value,
        //     SGWDFirst: $scope.weekGridOptions.data[i].SGWDFirst == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFirst,
        //     SGWDSecond: $scope.weekGridOptions.data[i].SGWDSecond == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDSecond,
        //     SGWDThird: $scope.weekGridOptions.data[i].SGWDThird == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDThird,
        //     SGWDFourth: $scope.weekGridOptions.data[i].SGWDFourth == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFourth,
        //     SGWDFifth: $scope.weekGridOptions.data[i].SGWDFifth == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFifth,
        //   }
        //   console.log($scope.weekGridOptions.data[i].SGWDFirst)
        //   child.rows.push(col);
        // }

        angular.forEach($scope.weekGridOptions.data, function (row, rdx) {
          var rowData = {
            TCCADId: row.TCCADId == undefined ? 0 : row.TCCADId,
            TCCADTHDId: row.THDId,
            TCCADAmount: row.Amount,
            TCCADTHGMId: row.THGMId,
            TCCADEnterAmount: row.EnterAmount
          }
          console.log(row, rdx)
          child.rows.push(rowData);
        })

        angular.forEach($scope.eightyCGridOptions.data, function (row, rdx) {
          var rowData = {
            TCCADId: row.TCCADId == undefined ? 0 : row.TCCADId,
            TCCADTHDId: row.THDId,
            TCCADAmount: row.Amount,
            TCCADTHGMId: row.THGMId,
            TCCADEnterAmount: row.EnterAmount
          }
          console.log(row, rdx)
          child.rows.push(rowData);
        })

        angular.forEach($scope.sixAGridOptions.data, function (row, rdx) {
          var rowData = {
            TCCADId: row.TCCADId == undefined ? 0 : row.TCCADId,
            TCCADTHDId: row.THDId,
            TCCADAmount: row.Amount,
            TCCADTHGMId: row.THGMId,
            TCCADEnterAmount: row.EnterAmount
          }
          console.log(row, rdx)
          child.rows.push(rowData);
        })

        angular.forEach($scope.sevenAGridOptions.data, function (row, rdx) {
          var rowData = {
            TCCADId: row.TCCADId == undefined ? 0 : row.TCCADId,
            TCCADTHDId: row.TDId,
            TCCADAmount: row.Amount,
            TCCADTHGMId: row.THGMId
          }
          console.log(row, rdx)
          child.rows.push(rowData);
        })


        console.log($scope.multiEntity)
        $scope.multiEntity.child.push(child);
        $scope.multiEntity.lz = false;
        pageService.multiSave($scope.multiEntity).then(function (result) {
          console.log(result)
          if (result == "done") {
            $scope.showMsg("success", "Record Saved Successfully");
            $scope.showWeeklyOffList = false;
            $scope.page.refreshData();
          }
          else if (result.error_message.Message == "Record Already Added.") {
            $scope.showMsg("error", "Record Already Added.");
          }
        }, function (err) {
          $scope.showMsg("error", err);
          console.log(err)
        })
      }
    }
    //End Save Record

    function _addRecord() {
      // gridLine
      $scope.gridLine = false;
      $scope.disabledEmp = false;
      $scope.entity = {};
      $scope.showGrid = false;
      // $scope.showEditForm = true;

      $scope.isCalculated = false;
      $scope.isYear = false;

      $scope.page.refreshData();
    }
    function _closeForm() {

      $scope.showGrid = true;

    }
    function _editRecord(row) {
      $scope.page.isAllowEdit = true;
      $scope.showGrid = false;
      // $scope.isCalculated = true;
      $scope.isYear = true;
      console.log(row)

      $scope.disabledEmp = true;
      $scope.entity = row.entity;
      $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.TCEmpId, row.entity.TCEHDEmpId, 'value')
      $scope.entity.JDDate = row.entity.selectedEmp.JDDate;
      $scope.entity.EmpCode = row.entity.selectedEmp.EmpCode;
      $scope.entity.JDCategory = row.entity.selectedEmp.CategoryName;
      $scope.entity.DesgName = row.entity.selectedEmp.DesgName;
      $scope.entity.DeptName = row.entity.selectedEmp.DeptName;
      $scope.entity.GenderName = row.entity.selectedEmp.GenderName;
      $scope.entity.PdDateOfBirth = row.entity.selectedEmp.PdDateOfBirth

      $scope.entity.yearId = $filter('findObj')($scope.page.pageinfo.selects.TCFinancialYearId, row.entity.TCEHDFiscalId, 'value')
      $scope.entity.monthId = $filter('findObj')($scope.page.pageinfo.selects.MonthId, row.entity.TCEHDMonthId, 'value')
      console.log($scope.entity.yearId, $scope.entity.monthId)

      console.log(row.entity)

      console.log($scope.entity.selectedEmp)
      $scope.headId = row.entity.TCEHDId;

      vm.oldEntity = angular.copy(row.entity);

      // var multiSelect = {
      //   lz: false,
      //   parent: {
      //     tableid: $scope.taxComEmpHeaderPage.pageinfo.tableid,
      //     pkValue: row.entity.TCEHDId
      //   },
      //   child: [{
      //     tableid: $scope.taxComCalAmtPage.pageinfo.tableid,
      //     linkColumn: 'TCCADTCHDId',
      //     orderByList: []
      //   }]
      // }
      // console.log(multiSelect)
      // pageService.getMultiEntity(multiSelect).then(_getMultiEntitySuccessResult, _getMultiEntityErrorResult);

      var searchLists = [];
      var searchListData = { field: 'TCEHDId', operand: '=', value: row.entity.TCEHDId }
      searchLists.push(searchListData)
      var searchListData = { field: 'DiplayIndex', operand: '=', value: 0 }
      searchLists.push(searchListData)
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, TDSTacComEmpHeaderAndCalAmount).then(_getMultiEntitySuccessResult, _getMultiEntityErrorResult)

    }
    function _getMultiEntitySuccessResult(result) {

      // $scope.entity = result[0][0];
      console.log($scope.entity);
      console.log(result[0][0])
      console.log($scope.entity.taxOnTotalIncome);
      $scope.entity.SalAmount = result[0][0].SalAmount
      $scope.entity.totalDeductionBenefits = result[0][0].totalDeductionBenefits
      $scope.entity.taxableAmount = result[0][0].taxableAmount
      $scope.entity.taxOnTotalIncome = result[0][0].taxOnTotalIncome
      $scope.entity.taxWithSurcharge = result[0][0].taxWithSurcharge
      $scope.entity.taxWithCess = result[0][0].taxWithCess
      $scope.entity.taxLiabilityMonthly = result[0][0].taxLiabilityMonthly
      $scope.entity.taxableAmountYearly = result[0][0].taxableAmountYearly

      console.log(result);
      $scope.weekGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'HRA Exemption Calculation', width: 300, enableCellEdit: false },
        { name: 'TGLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]
      $scope.weekGridOptions.data = result[1];

      _minAmount();
      _editEightyC()
      // angular.forEach(result.child, function (child) {
      //   $scope.weekGridOptions.data = child.rows;
      // })

    }
    function _getMultiEntityErrorResult(err) {
      $scope.showMsg("error", error)
    }


    //Get edtiEightCGrid
    function _editEightyC() {
      var searchLists = [];
      var searchListData = { field: 'TCEHDId', operand: '=', value: $scope.headId }
      searchLists.push(searchListData)
      var searchListData = { field: 'DiplayIndex', operand: '=', value: 1 }
      searchLists.push(searchListData)
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, TDSTacComEmpHeaderAndCalAmount).then(_editEightyCSuccessResult, _editEightyCErrorResult)
    }
    function _editEightyCSuccessResult(result) {
      console.log(result)
      $scope.eightyCGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'Deduction Under Chapter VI (Sec-80C)', width: 300, enableCellEdit: false },
        { name: 'TGLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.eightyCGridOptions.data = result[1];
      console.log(result[1][0].TGLDLimitAmount)
      $scope.eightyCGridSecLimitAmount = result[1][0].TGLDLimitAmount;
      console.log(result[3][0].BasicAmount)

      if (result[3][0].BasicAmount !== undefined) {
        $scope.basicSalary = result[3][0].BasicAmount;
        console.log($scope.basicSalary);
      }

      angular.forEach($scope.eightyCGridOptions.data, function (row, rdx) {
        if (row.Amount !== undefined)
          eightyCfinalTotal += parseInt(row.Amount);
      })
      vm.eightyCTotalAmount = eightyCfinalTotal;


      _editSecSixA()
    }
    function _editEightyCErrorResult(error) {
      $scope.showMsg("error", error)
    }
    //End edtiEightCGrid


    //Get editSecSixAGrid
    function _editSecSixA() {
      var searchLists = [];
      var searchListData = { field: 'TCEHDId', operand: '=', value: $scope.headId }
      searchLists.push(searchListData)
      var searchListData = { field: 'DiplayIndex', operand: '=', value: 2 }
      searchLists.push(searchListData)
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, TDSTacComEmpHeaderAndCalAmount).then(_editSecSixASuccessResult, _editSecSixAErrorResult)
    }
    function _editSecSixASuccessResult(result) {
      console.log(result)
      $scope.gridLine = true;
      console.log(result)
      $scope.sixAGridOptions.columnDefs = [
        { name: 'THDName', displayName: 'Deduction Under Chapter VI-A', width: 300, enableCellEdit: false },
        { name: 'THLDLimitAmount', displayName: 'Limit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: true, },
        { name: 'EnterAmount', displayName: 'Enter Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.sixAGridOptions.data = result[1];
      sixAFinalTotal = 0;
      angular.forEach($scope.sixAGridOptions.data, function (row, rdx) {
        if (row.Amount !== undefined)
          sixAFinalTotal += parseInt(row.Amount);
      })
      vm.sixATotalAmount = sixAFinalTotal;
      $scope.isCalculated = true;
      _editSevenA();
    }
    function _editSecSixAErrorResult(error) {
      $scope.showMsg("error", error)
    }
    //End editSecSixAGrid

    //Get editSevenAGrid
    function _editSevenA() {
      var searchLists = [];
      var searchListData = { field: 'TCEHDId', operand: '=', value: $scope.headId }
      searchLists.push(searchListData)
      var searchListData = { field: 'DiplayIndex', operand: '=', value: 0 }
      searchLists.push(searchListData)
      console.log(searchLists)
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, TDSTacComEmpHeaderAndCalAmount).then(_editSevenASuccessResult, _editSevenErrorResult)
    }
    function _editSevenASuccessResult(result) {
      $scope.gridLine = true;
      console.log(result)
      $scope.sevenAGridOptions.columnDefs = [
        { name: 'TDName', displayName: 'Sec 87 A', width: 600, enableCellEdit: false },
        // { name: 'TSDAmount', displayName: 'Tax Credit Amount', width: 130, enableCellEdit: false },
        { name: 'Amount', displayName: 'Amount', width: 130, enableCellEdit: false, }
      ]

      $scope.sevenAGridOptions.data = result[2];
    }
    function _editSevenErrorResult(error) {
      $scope.showMsg("error", error)
    }
    //End 



    function _taxComSave(editForm, entity) {
      var searchLists = [];
      var searchListData = { field: 'FinacialYear', operand: '=', value: 0 }
      searchLists.push(searchListData)
      var searchListData = { field: 'DisplayIndex', operand: '=', value: 0 }
      searchLists.push(searchListData)
      var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(_getTDSAmountSuccessResult, _getTDSAmountErrorResult)
    }

    function _getTDSAmountSuccessResult(result) {
      var empPayBandRuleTableId = 437
      console.log(result);
      console.log(result[2].length);
      if (result[2].length > 0) {
        if ($scope.entity.taxLiabilityMonthly !== undefined) {
          if ($scope.entity.taxLiabilityMonthly != '') {
            var pkName = 'EPBRId'
            var pkId = result[2][0].EPBRId
            var field = 'EPBRAmount'
            var fieldValue = $scope.entity.taxLiabilityMonthly
            console.log(fieldValue)
            pageService.updateField(empPayBandRuleTableId, pkName, pkId, field, fieldValue).then(_updateTDSAmountSuccessResult, _updateTDSAmountErrorResult)
          }
          else {
            $scope.showMsg("error", "TDS monthly amount not available.");
          }
        }
        else {
          $scope.showMsg("error", "TDS monthly amount not available.");
        }
      }
      else {
        $scope.showMsg("error", "TDS head not available in employee salary head");
      }
    }

    function _updateTDSAmountSuccessResult(result) {
      console.log(result)
      if (result.success_message == 'Updated') {
        _taxComSaves()
      }
      else {
        $scope.showMsg("error", result.error_message);
      }
    }

    function _updateTDSAmountErrorResult(error) {
      $scope.showMsg("error", error);
      console.log(error)
    }

    function _getTDSAmountErrorResult(error) {
      console.log(error)
    }




    _loadController()

  }

})();
