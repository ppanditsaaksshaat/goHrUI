/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetailTz')
    .controller('payFullAndFinalDetailTzController', payFullAndFinalDetailTzController);

  /** @ngInject */
  function payFullAndFinalDetailTzController($scope, $state, pageService, editFormService, $filter) {
    console.log('payFullAndFinalDetailTzController')

    var vm = this;
    vm.pageId = 472;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.showGrid = false;
    $scope.showReport = true;
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
    $scope.pWorkigDay = _pWorkigDay;
    $scope.severanceDays = _severanceDays;
    $scope.unpaidLeaveDays = _unpaidLeaveDays;
    $scope.normalOTHours = _normalOTHours;
    $scope.holidayOTHours = _holidayOTHours;
    $scope.disabledEmp = false;
    $scope.showStatus = false;
    $scope.overTimeAllowed = _overTimeAllowed;
    $scope.holidayOverTimeAllowed = _holidayOverTimeAllowed;

    $scope.closeReport = _closeReport;

    $scope.pageReport = { reportId: 61 }

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
      customColumns: [{ text: 'Report', type: 'a', name: 'Option', click: _fReport, pin: true }, { text: 'Verify', type: 'a', name: 'Verify', click: _FNFTZVerify, pin: true }],
      updateRecord: null,
      viewRecord: _viewRecord,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult
    }
    function _dataResult(result) {
      console.log(result)
    }

    function _viewRecord(row) {
      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');



        if (!$scope.status.isApproved) {
          if (!$scope.status.isRejected) {
            if (!$scope.status.isOnHold) {
              // $scope.entity = angular.copy(row.entity);
              // $scope.showEditForm = true;
              // $scope.showSanctionForm = true;
              // $scope.showForm = false;
              // $scope.entity = row.entity

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

    function _pageResult(result) {
      console.log(result);
    }

    function _closeReport() {
      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;
    }

    function _fReport(row) {
      console.log(row.entity.FFDTZEmpId)

      // $scope.pageReport = { reportId: 19 }
      // $state.go(row.entity.FFDTZEmpId);
      // $scope.page = { reportId: 61 }
      $scope.showGrid = true;
      $scope.showReport = false;
      $scope.showEditForm = true;

    }

    function _addRecord() {
      $scope.showStatus = false;
      $scope.disabledEmp = false;
      $scope.entity = {};
      $scope.showGrid = true;
      $scope.showReport = true;
      $scope.showEditForm = false;

      $scope.page.refreshData();
    }
    function _closeForm() {
      $scope.showStatus = false;
      $scope.entity = {};
      // $scope.showEditForm = true;
      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;
      $scope.page.refreshData();
    }

    function _validateSave() {
      var trueVal = angular.equals($scope.entity, vm.oldEntity);
      return trueVal;
    }

    function _editRecord(row) {
      $scope.page.isAllowEdit = true;
      $scope.showStatus = false;
      $scope.disabledEmp = true;
      console.log(row)
      $scope.entity = row.entity;
      $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.FFDTZEmpId, row.entity.FFDTZEmpId, 'value')
      $scope.entity.SUName = row.entity.selectedEmp.SUName;
      $scope.entity.designName = row.entity.selectedEmp.DesgName;
      $scope.entity.deptName = row.entity.selectedEmp.DeptName;
      $scope.entity.SMOverTimeAllowed = row.entity.selectedEmp.SMOverTimeAllowed;
      vm.oldEntity = angular.copy(row.entity);
      $scope.showGrid = true;
      $scope.showReport = true;
      $scope.showEditForm = false;
    }

    function _selectedDesignDept() {
      $scope.entity.FFDTZDate = $scope.entity.selectedEmp.RDRelievingDate;
      $scope.entity.SUName = $scope.entity.selectedEmp.SUName;
      $scope.entity.designName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.deptName = $scope.entity.selectedEmp.DeptName;
      $scope.entity.SMOverTimeAllowed = $scope.entity.selectedEmp.SMOverTimeAllowed;
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
          $scope.entity.SHIsEPF = value.SHName;
          if ($scope.entity.ifPPFORNSSF == 1) {
            $scope.entity.FFDTZNSSF = value.SalAmount;
          }

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


      console.log($scope.entity.FFDTZPWorkingDay)

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
        if ($scope.entity.FFDTZPayeeCalc !== undefined && $scope.entity.FFDTZPayeeCalc != '' && $scope.entity.FFDTZPayeeCalc != null) {
          _payeTaxDeduction();
        }
      }
      else {
        $scope.showMsg("warning", "Gross salary does not exist");
      }
    }

    function _payeTaxDeduction() {
      var searchLists = [];
      var searchListData = { field: 'TotalIncome', operand: '=', value: $scope.entity.FFDTZPayeeCalc }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, payeTaxDeductionQueryId).then(_payeTaxDeductionResult, _payeTaxDeductionErrorResult)
    }

    function _payeTaxDeductionResult(result) {
      console.log(result)
      console.log(result[0][0].TaxAmount)
      $scope.entity.FFDTZPAYE = result[0][0].TaxAmount;
    }

    function _payeTaxDeductionErrorResult() {

    }


    function _saveForm() {
      if ($scope.entity.FFDTZNetAmount !== undefined && $scope.entity.FFDTZNetAmount != '' && $scope.entity.FFDTZNetAmount != null) {


        if ($scope.showStatus) {
          if (!_validateSanctionForm()) {
            if (!_validateSave()) {
              $scope.entity.FFDTZEmpId = $scope.entity.selectedEmp.value;
              editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
                $scope.entity.FFDTZId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
                .then(_saveFormSuccessResult, _saveFormErrorResult)
            }
            else {
              $scope.showMsg("info", "Nothing to save");
            }

          }
        }
        else {
          if (!_validateSave()) {
            $scope.entity.StatusId = 0
            $scope.entity.FFDTZEmpId = $scope.entity.selectedEmp.value;
            editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
              $scope.entity.FFDTZId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
              .then(_saveFormSuccessResult, _saveFormErrorResult)
          }
          else {
            $scope.showMsg("info", "Nothing to save");
          }
        }
      }
      else {
        $scope.showMsg("warning", "total earning amount should be more than 0");
      }

    }

    function _saveFormSuccessResult(result) {

      // console.log(result);
      // console.log(result.entity.FAFDId)
      // fullNFinalId = result.entity.FAFDId;
      // $scope.showEditForm = true;
      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;
      $scope.page.refreshData();
    }

    function _saveFormErrorResult(error) {
      console.log(error);
    }


    function _FNFTZVerify(row) {
      $scope.page.isAllowEdit = true;
      console.log(row)
      var status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
      console.log(status)
      if (status == null) {
        status = {};
        status.isRejected = false;
        status.isCancelRequest = false;
      }
      if (!status.isRejected && !status.isApproved) {
        if (!status.isCancelRequest && !status.isCancelApproved && !status.isCancelRejected && !status.isCancelOnHold) {
          $scope.showStatus = true;
          $scope.disabledEmp = true;
          console.log(row)
          $scope.entity = row.entity;
          $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.FFDTZEmpId, row.entity.FFDTZEmpId, 'value')
          $scope.entity.SUName = row.entity.selectedEmp.SUName;
          $scope.entity.designName = row.entity.selectedEmp.DesgName;
          $scope.entity.deptName = row.entity.selectedEmp.DeptName;
          $scope.showGrid = true;
          $scope.showReport = true;
          $scope.showEditForm = false;
        }
        else {
        }
      }
      else {
        $scope.showMsg("error", "You can view this Application only")
      }
    }

    function _validateSanctionForm() {
      if ($scope.entity.StatusId == "0" || $scope.entity.StatusId == undefined) {
        $scope.showMsg("error", "Status should be sanctioned/onhold/reject");
        return true;
      }
      if ($scope.entity.FFDTZComment == undefined || $scope.entity.FFDTZComment == '' || $scope.entity.FFDTZComment == null) {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }

    function _overTimeAllowed() {
      if ($scope.entity.SMOverTimeAllowed) {
        $scope.entity.FFDTZNOTHours = $scope.entity.FFDTZNOTHours;
      }
      else {
        $scope.entity.FFDTZNOTHours = 0.0;
        $scope.showMsg("warning", "This employee not applicable for OT");
      }
    }

    function _holidayOverTimeAllowed() {
      if ($scope.entity.SMOverTimeAllowed) {
        $scope.entity.FFDTZHOTHours = $scope.entity.FFDTZHOTHours;
      }
      else {
        $scope.entity.FFDTZHOTHours = 0.0;
        $scope.showMsg("warning", "This employee not applicable for Holiday OT");
      }
    }

    function _pWorkigDay() {
      var pFDTZPWorkingDay = parseFloat($scope.entity.FFDTZPWorkingDay);
      // _isNumberKey(pFDTZPWorkingDay);
    }



    function _unpaidLeaveDays() {
      var pFDTZPWorkingDay = parseFloat($scope.entity.FFDTZPWorkingDay);
      _isNumberKey(pFDTZPWorkingDay);
    }

    function _severanceDays() {
      var sFFDTZSeveranceDays = parseFloat($scope.entity.FFDTZSeveranceDays);
      _isNumberKey(sFFDTZSeveranceDays);
    }

    function _normalOTHours() {
      var nFFDTZNOTHours = parseFloat($scope.entity.FFDTZNOTHours);
      _isNumberKey(nFFDTZNOTHours);
    }


    function _holidayOTHours() {
      var hFFDTZHOTHours = parseFloat($scope.entity.FFDTZHOTHours);
      _isNumberKey(hFFDTZHOTHours);
    }

    function _isNumberKey(key) {
      //getting key code of pressed key
      var keycode = (key.which) ? key.which : key.keyCode;
      //comparing pressed keycodes

      if (keycode > 31 && (keycode < 48 || keycode > 57) && keycode != 47) {
        alert(" You can enter only characters 0 to 9 ");
        return false;
      }
      else return true;
    }
  }

})();
