/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetailTz')
    .controller('payFullAndFinalDetailTzController', payFullAndFinalDetailTzController);

  /** @ngInject */
  function payFullAndFinalDetailTzController($scope, $state, pageService, editFormService,$filter) {
    console.log('payFullAndFinalDetailTzController')

    var vm = this;
    vm.pageId = 472;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.showEditForm = true;
    $scope.selectedDesignDept = _selectedDesignDept;
    $scope.getEmpGrossAmount = _getEmpGrossAmount;
    $scope.calculateAmount = _calculateAmount;
    $scope.saveForm = _saveForm;
    $scope.closeForm = _closeForm;
    vm.oldEntity = {};
    $scope.entity = {};
    vm.queryId = 588;
    var payeTaxDeductionQueryId = 590;

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
      $scope.showEditForm = false;
      $scope.page.refreshData();
    }
    function _closeForm() {
      $scope.entity = {};
      $scope.showEditForm = true;
      $scope.page.refreshData();
    }
    function _editRecord(row) {
      console.log(row)
      $scope.entity = row.entity;
      $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.FFDTZEmpId, row.entity.FFDTZEmpId, 'value')
      $scope.showEditForm = false;
    }

    function _selectedDesignDept() {
      $scope.entity.FFDTZDate = $scope.entity.selectedEmp.RDRelievingDate;
      $scope.entity.SUName = $scope.entity.selectedEmp.SUName;
      $scope.entity.designName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.deptName = $scope.entity.selectedEmp.DeptName;
      // $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;
      _getEmpFullAndFinal();
    }

    function _getEmpFullAndFinal() {
      console.log($scope.entity.selectedEmp.value)
      if ($scope.entity.selectedEmp.value !== undefined && $scope.entity.selectedEmp.value != '') {
        if ($scope.entity.FFDTZDate !== undefined && $scope.entity.FFDTZDate != '') {
          var searchLists = [];
          var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
          searchLists.push(searchListData)
          var searchListData = { field: 'FullandFinalDate', operand: '=', value: $scope.entity.FFDTZDate }
          searchLists.push(searchListData)
          var data = {
            searchList: searchLists,
            orderByList: []
          }
          pageService.getCustomQuery(data, vm.queryId).then(_getEmployeeFullAndFinalResult, _getEmployeeFullAndFinalErrorResult)
        }
        else {
          $scope.showMsg("warning", "Please Select Date")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select Employee")
      }
    }

    function _getEmployeeFullAndFinalResult(result) {
      console.log(result);
      console.log(result[0][0].EmpId);
      console.log(result[1][0].SalAmount)
      var totalHeadAmountRate = 0;

      angular.forEach(result[1], function (value, key) {
        if (value.SHIsBasic == 1) {
          $scope.entity.FFDTZBasic = value.SalAmount;
        }
        else if (value.SHIsGross == 1) {
          $scope.entity.FFDTZGross = value.SalAmount;
        }
        else if (value.SHIsESIC == 1 || value.SHIsEPF == 1) {
          $scope.entity.FFDTZNSSF = value.SalAmount;
        }

        totalHeadAmountRate += parseFloat(value.SalAmount);
        console.log(totalHeadAmountRate);
        console.log(value.SalAmount)
        console.log(key)
        console.log(value)
      });

      var lFFDTZLoan = parseFloat($scope.entity.FFDTZLoan);
      if (isNaN(lFFDTZLoan))
        lFFDTZLoan = 0;
      $scope.entity.FFDTZLoan = lFFDTZLoan

      $scope.entity.FFDTZPWorkingDay = result[0][0].CurrentMonthPresentDay
      $scope.entity.FFDTZSeveranceDays = result[0][0].YearJoin
      $scope.entity.FFDTZUnpaidLeaveDays = result[0][0].ENcashmentEL
      $scope.entity.FFDTZLoan = result[0][0].LoanOutstanding

      // $scope.entity.FAFDCurrentYearEL = result[0][0].ELCurrent
      // $scope.entity.FAFDELOpeninig = result[0][0].ELOpen
      // $scope.entity.FAFDELTaken = result[0][0].ELTaken
      // $scope.entity.FAFDGratuity = result[0][0].GratuityAmount
      // $scope.entity.FAFDELBalance = result[0][0].ELTaken
      // $scope.entity = result[0][0].TotalPresentDaysInYear




    }

    function _getEmployeeFullAndFinalErrorResult(error) {
      console.log(error);
    }
    function _getEmpGrossAmount() {
      console.log($scope.entity.isGetGrossSalary)
      if ($scope.entity.FFDTZGross !== undefined && $scope.entity.FFDTZGross != '' && $scope.entity.FFDTZGross != null) {
        if ($scope.entity.isGetGrossSalary == true) {
          $scope.entity.FFDTZNoticePay = $scope.entity.FFDTZGross;
        }
        else {
          $scope.entity.FFDTZNoticePay = '';
        }
      }
      else {
        $scope.showMsg("warning", "Gross salary does not exist");
      }
    }

    function _calculateAmount() {
      if ($scope.entity.FFDTZGross !== undefined && $scope.entity.FFDTZGross != '' && $scope.entity.FFDTZGross != null) {
        var grossAmount = parseFloat($scope.entity.FFDTZGross);
        var basicAmount = parseFloat($scope.entity.FFDTZBasic);
        var totalDayInMonth = moment($scope.entity.FFDTZDate).daysInMonth();
        console.log(totalDayInMonth);

        var pFDTZPWorkingDay = (parseFloat($scope.entity.FFDTZPWorkingDay)).toFixed(2);
        if (isNaN(pFDTZPWorkingDay))
          pFDTZPWorkingDay = 0;
        $scope.entity.FFDTZPWorkingDayAmount = (pFDTZPWorkingDay * grossAmount) / totalDayInMonth;

        var sFFDTZSeveranceDays = parseFloat($scope.entity.FFDTZSeveranceDays);
        if (isNaN(sFFDTZSeveranceDays))
          sFFDTZSeveranceDays = 0;
        $scope.entity.FFDTZSeveranceAllowance = ((sFFDTZSeveranceDays) * (7) * (basicAmount / 26)).toFixed(2);

        var uFFDTZUnpaidLeaveDays = parseFloat($scope.entity.FFDTZUnpaidLeaveDays);
        if (isNaN(uFFDTZUnpaidLeaveDays))
          uFFDTZUnpaidLeaveDays = 0;
        $scope.entity.FFDTZLeaveEncashment = (uFFDTZUnpaidLeaveDays * grossAmount / totalDayInMonth).toFixed(2);
        // toFixed(2)

        var nFFDTZNOTHours = parseFloat($scope.entity.FFDTZNOTHours);
        if (isNaN(nFFDTZNOTHours))
          nFFDTZNOTHours = 0;
        $scope.entity.FFDTNormalOT = (basicAmount / 195) * 1.5 * nFFDTZNOTHours;

        var hFFDTZHOTHours = parseFloat($scope.entity.FFDTZHOTHours);
        if (isNaN(hFFDTZHOTHours))
          hFFDTZHOTHours = 0;
        $scope.entity.FFDTZHolidayOT = (basicAmount / 195) * 2.0 * hFFDTZHOTHours;

        // console.log(Math.round($scope.entity.FFDTZHolidayOT))


        var lFFDTZLeavePassege = parseFloat($scope.entity.FFDTZLeavePassege);
        if (isNaN(lFFDTZLeavePassege))
          lFFDTZLeavePassege = 0;
        $scope.entity.FFDTZLeavePassege = lFFDTZLeavePassege

        var bFFDTZBonus = parseFloat($scope.entity.FFDTZBonus)
        if (isNaN(bFFDTZBonus))
          bFFDTZBonus = 0;
        $scope.entity.FFDTZBonus = bFFDTZBonus

        var oFFDTZOthersEarn = parseFloat($scope.entity.FFDTZOthersEarn)
        if (isNaN(oFFDTZOthersEarn))
          oFFDTZOthersEarn = 0;
        $scope.entity.FFDTZOthersEarn = oFFDTZOthersEarn

        var nFFDTZNoticePay = parseFloat($scope.entity.FFDTZNoticePay)
        if (isNaN(nFFDTZNoticePay))
          nFFDTZNoticePay = 0;
        $scope.entity.FFDTZNoticePay = nFFDTZNoticePay



        $scope.entity.FFDTZTotalAmount = parseFloat($scope.entity.FFDTZPWorkingDayAmount) + parseFloat($scope.entity.FFDTZLeaveEncashment) + parseFloat($scope.entity.FFDTNormalOT) + parseFloat($scope.entity.FFDTZHolidayOT) + parseFloat($scope.entity.FFDTZLeavePassege) + parseFloat($scope.entity.FFDTZBonus) + parseFloat($scope.entity.FFDTZOthersEarn) + parseFloat($scope.entity.FFDTZNoticePay);

        //------Deduction---------------------------
        var nFFDTZNSSF = parseFloat($scope.entity.FFDTZNSSF);
        if (isNaN(nFFDTZNSSF))
          nFFDTZNSSF = 0;
        $scope.entity.FFDTZNSSF = nFFDTZNSSF

        var pFFDTZPayeeCalc = parseFloat($scope.entity.FFDTZPayeeCalc);
        if (isNaN(pFFDTZPayeeCalc))
          pFFDTZPayeeCalc = 0;
        $scope.entity.FFDTZPayeeCalc = pFFDTZPayeeCalc

        var pAFFDTZPAYE = parseFloat($scope.entity.FFDTZPAYE);
        if (isNaN(pAFFDTZPAYE))
          pAFFDTZPAYE = 0;
        $scope.entity.FFDTZPAYE = pAFFDTZPAYE

        var sAFFDTZSalaryAdvance = parseFloat($scope.entity.FFDTZSalaryAdvance);
        if (isNaN(sAFFDTZSalaryAdvance))
          sAFFDTZSalaryAdvance = 0;
        $scope.entity.FFDTZSalaryAdvance = sAFFDTZSalaryAdvance

        var lFFDTZLoan = parseFloat($scope.entity.FFDTZLoan);
        if (isNaN(lFFDTZLoan))
          lFFDTZLoan = 0;
        $scope.entity.FFDTZLoan = lFFDTZLoan

        var sHFFDTZSalaryHold = parseFloat($scope.entity.FFDTZSalaryHold);
        if (isNaN(sHFFDTZSalaryHold))
          sHFFDTZSalaryHold = 0;
        $scope.entity.FFDTZSalaryHold = sHFFDTZSalaryHold

        var oDFFDTZOthersDeduction = parseFloat($scope.entity.FFDTZOthersDeduction);
        if (isNaN(oDFFDTZOthersDeduction))
          oDFFDTZOthersDeduction = 0;
        $scope.entity.FFDTZOthersDeduction = oDFFDTZOthersDeduction

        var tDFFDTZTotalDeductions = parseFloat($scope.entity.FFDTZTotalDeductions);
        if (isNaN(tDFFDTZTotalDeductions))
          tDFFDTZTotalDeductions = 0;
        $scope.entity.FFDTZTotalDeductions = tDFFDTZTotalDeductions

        var nAFFDTZNetAmount = parseFloat($scope.entity.FFDTZNetAmount);
        if (isNaN(nAFFDTZNetAmount))
          nAFFDTZNetAmount = 0;
        $scope.entity.FFDTZNetAmount = nAFFDTZNetAmount;

        $scope.entity.FFDTZPayeeCalc = $scope.entity.FFDTZTotalAmount - $scope.entity.FFDTZNSSF;


        $scope.entity.FFDTZTotalDeductions = nFFDTZNSSF + pFFDTZPayeeCalc + pAFFDTZPAYE + sAFFDTZSalaryAdvance + lFFDTZLoan + sHFFDTZSalaryHold + oDFFDTZOthersDeduction;
        $scope.entity.FFDTZNetAmount = $scope.entity.FFDTZTotalAmount - $scope.entity.FFDTZTotalDeductions;


      }
      else {
        $scope.showMsg("warning", "Gross salary does not exist");
      }
    }

    function _saveForm() {
      if ($scope.entity.FFDTZNetAmount !== undefined && $scope.entity.FFDTZNetAmount != '' && $scope.entity.FFDTZNetAmount != null) {
        $scope.entity.FFDTZEmpId = $scope.entity.selectedEmp.value;
        editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
          $scope.entity.FFDTZId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
          .then(_saveFormSuccessResult, _saveFormErrorResult)
      }
      else {
        $scope.showMsg("warning", "total earning amount should be more than 0");
      }

    }

    function _saveFormSuccessResult(result) {

      // console.log(result);
      // console.log(result.entity.FAFDId)
      // fullNFinalId = result.entity.FAFDId;
      $scope.showEditForm = true;
      $scope.page.refreshData();
    }

    function _saveFormErrorResult(error) {
      console.log(error);
    }
  }

})();
