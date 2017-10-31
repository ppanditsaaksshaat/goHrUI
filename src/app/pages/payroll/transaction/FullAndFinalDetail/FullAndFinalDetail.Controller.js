/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail')
    .controller('payFullAndFinalDetailController', payFullAndFinalDetailController);

  /** @ngInject */
  function payFullAndFinalDetailController($scope, $state, pageService, editFormService) {
    var vm = this;
    vm.pageId = 471;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.close = _close;
    vm.queryId = 586;
    $scope.weekGridOptions = { enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false, paginationPageSize: 10 }
    $scope.pageReport = { reportId: 62 }

    $scope.showGrid = false;
    $scope.showReport = true;
    $scope.showEditForm = true;

    $scope.showOnClick = false;
    $scope.selectedDesignDept = _selectedDesignDept;
    $scope.getEmpFullAndFinal = _getEmpFullAndFinal;
    $scope.calculatedEmpSalary = _calculatedEmpSalary;
    $scope.totalPayDays = _totalPayDays;
    $scope.saveForm = _saveForm;
    $scope.closeForm = _closeForm;
    vm.oldEntity = {};
    var fullNFinalId = 0;
    $scope.closeReport = _closeReport;

    var fullAndFinalSalaryPageId = 473;



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
      customColumns: [{ text: 'Report', type: 'a', name: 'Option', click: _fReport, pin: true }],
      pageResult: _pageResult,
      dataResult: _dataResult
    }
    function _dataResult(result) {
      console.log(result)
    }

    function _pageResult(result) {
      console.log(result);
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

    function _closeReport() {
      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;
    }


    function _addRecord() {
      $scope.entity = {};
      // $scope.showEditForm = false;
      $scope.showGrid = true;
      $scope.showReport = true;
      $scope.showEditForm = false;

      $scope.showOnClick = false;
      $scope.page.refreshData();
    }
    function _closeForm() {
      // $scope.showEditForm = true;

      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;

      $scope.showOnClick = false;
      $scope.page.refreshData();
    }

    function _selectedDesignDept() {
      $scope.entity.FAFDDate = $scope.entity.selectedEmp.RDRelievingDate;
      $scope.entity.SUName = $scope.entity.selectedEmp.SUName;
      $scope.entity.designName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.deptName = $scope.entity.selectedEmp.DeptName;
      $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;


    }

    function _getEmpFullAndFinal() {
      console.log($scope.entity.selectedEmp.value)
      if ($scope.entity.selectedEmp.value !== undefined && $scope.entity.selectedEmp.value != '') {
        if ($scope.entity.FAFDDate !== undefined && $scope.entity.FAFDDate != '') {

          $scope.showOnClick = true;
          var searchLists = [];
          var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
          searchLists.push(searchListData)
          var searchListData = { field: 'FullandFinalDate', operand: '=', value: $scope.entity.FAFDDate }
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
        totalHeadAmountRate += parseFloat(value.SalAmount);
        console.log(totalHeadAmountRate);
        console.log(value.SalAmount)
        console.log(key)
      });


      $scope.entity.FAFDPresentDays = result[0][0].CurrentMonthPresentDay
      $scope.entity.FAFDCurrentYearEL = result[0][0].ELCurrent
      $scope.entity.FAFDELOpeninig = result[0][0].ELOpen
      $scope.entity.FAFDELTaken = result[0][0].ELTaken
      $scope.entity.FAFDELEncashable = result[0][0].ENcashmentEL
      $scope.entity.FAFDGratuity = result[0][0].GratuityAmount
      $scope.entity.FAFDELBalance = result[0][0].ELTaken
      // $scope.entity = result[0][0].TotalPresentDaysInYear
      $scope.entity.FAFDJoinYear = result[0][0].YearJoin
      $scope.entity.LoanOutstanding = result[0][0].LoanOutstanding

      $scope.weekGridOptions.columnDefs = [
        { name: 'SHName', displayName: 'Salary Head', width: 170, enableCellEdit: false },
        { name: 'SalAmount', displayName: 'Head Rate', width: 130, enableCellEdit: false },
        { name: 'SalaryAmount', displayName: 'Salary Amount', width: 130, enableCellEdit: false }
      ]
      $scope.weekGridOptions.data = result[1];
    }

    function _getEmployeeFullAndFinalErrorResult(error) {
      console.log(error);
    }

    function _close() {
      $scope.showEditForm = false;
    }

    function _calculatedEmpSalary() {
      if ($scope.entity.totalPayDays !== undefined && $scope.entity.totalPayDays != '') {
        var totalEarning = 0;
        var totalDeduction = 0;
        var netPayment = 0;

        var earning = 0;
        var deduction = 0;
        var filterData = {
          empId: $scope.entity.selectedEmp.value,
          subUnitId: $scope.entity.subUnitId,
          salDays: $scope.entity.totalPayDays
        }
        console.log(filterData)
        var totalSalAmount = 0;
        pageService.generateFullAndFinalSalary(filterData).then(function (result) {
          console.log(result)
          angular.forEach(result, function (value, key) {

            // totalHeadAmountRate += parseFloat(value.SalAmount);
            console.log(key)
            console.log(value)
            console.log(value.SalaryHeadAmount)
            for (var row = 0; row < $scope.weekGridOptions.data.length; row++) {
              var rowData = $scope.weekGridOptions.data[row];

              console.log(rowData);
              if (rowData.SHId == value.SalaryCode && rowData.SHIsDeduction == 0) {
                rowData.SalaryAmount = value.SalaryHeadAmount;
                console.log(rowData.SalaryAmount);
                earning = parseFloat(value.SalaryHeadAmount);
                console.log(earning);
                totalEarning += earning;
              }
              else if (rowData.SHId == value.SalaryCode && rowData.SHIsDeduction == 1) {
                rowData.SalaryAmount = value.SalaryHeadAmount;
                console.log(rowData.SalaryAmount);
                deduction = parseFloat(value.SalaryHeadAmount);
                totalDeduction += deduction;
              }


              // // rowData.SalaryAmount = rowData.SalAmount
              // var salaryRate = rowData.SalAmount;
              // var salaryData = (salaryRate * 15) / 30;

              // // totalSalAmount += parseFloat(salaryData);
              // // console.log(totalSalAmount);
            }
          });

          console.log(totalEarning);

          $scope.entity.FAFDTotalEarning = parseFloat(totalEarning) + parseFloat($scope.entity.FAFDGratuity);
          $scope.entity.FAFDTotalDeduction = parseFloat(totalDeduction) + parseFloat($scope.entity.LoanOutstanding);
          $scope.entity.FAFDNetPayment = parseFloat($scope.entity.FAFDTotalEarning) - parseFloat($scope.entity.FAFDTotalDeduction);

        })
      }
      else {
        $scope.showMsg('warning', 'Please fill value in pay day');
      }


      console.log('col')

    }

    function _totalPayDays() {
      $scope.entity.totalPayDays = parseInt($scope.entity.payDays) + parseInt($scope.entity.FAFDELEncashable);
    }

    function _saveForm() {
      if ($scope.entity.FAFDTotalEarning !== undefined && $scope.entity.FAFDTotalEarning != '' && $scope.entity.FAFDTotalEarning != null) {
        $scope.entity.FAFEmpId = $scope.entity.selectedEmp.value;
        editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
          $scope.entity.FAFDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
          .then(_saveFormSuccessResult, _saveFormErrorResult)
      }
      else {
        $scope.showMsg("warning", "total earning amount should be more than 0");
      }

    }

    function _saveFormSuccessResult(result) {

      console.log(result);
      console.log(result.entity.FAFDId)
      fullNFinalId = result.entity.FAFDId;
      // $scope.showEditForm = true;

      $scope.showGrid = false;
      $scope.showReport = true;
      $scope.showEditForm = true;

      $scope.showOnClick = false;
      $scope.page.refreshData();
      _saveFullNFinalClick();
    }

    function _saveFormErrorResult(error) {
      console.log(error);
      $scope.showOnClick = false;
    }


    var totalSavingRecord = 0;
    function _saveFullNFinalClick() {

      totalSavingRecord = $scope.weekGridOptions.data.length - 1;

      if ($scope.weekGridOptions.data.length > 0) {
        angular.forEach($scope.weekGridOptions.data, function (row) {
          console.log(row);
          var data = {
            FFSDId: row.FFSDId == null ? undefined : row.FFSDId,
            FFSDFAFDId: fullNFinalId,
            FFSDSHId: row.SHId,
            FFSDSHRate: row.SalAmount,
            FFSDSHAmount: row.SalaryAmount

          }
          console.log(data)
          var form = {}

          if (data.FFSDId == undefined) {
            editFormService.saveForm(fullAndFinalSalaryPageId, data,
              {}, 'create', 'MidNonth', form, false).then(_successFullNFinalResult, _errorFullNFinalResult);
          }
          else {
            editFormService.saveForm(fullAndFinalSalaryPageId, data,
              {}, 'edit', 'MidNonth', form, false).then(_successFullNFinalResult, _errorFullNFinalResult);
          }
        })
      }
      // else {
      //   $scope.showMsg("error", "Please search data then save");
      // }
    }
    function _successFullNFinalResult(result) {
      $scope.showOnClick = false;
      console.log(result)
      $scope.showMsg("success", "Saved Successfully");
      $scope.page.refreshData();
      // benefintSavecount++;
      // console.log(benefintSavecount + ' of ' + totalSavingRecord)
      // if (benefintSavecount == totalSavingRecord) {
      //   $scope.showMsg("success", "Employee Benefit Saved Successfully");
      //   $scope.page.refreshData();
      // }

    }
    function _errorFullNFinalResult(err) {
      $scope.showOnClick = false;
      // alert(JSON.stringify(err))
      console.log(err);
    }

  }

})();
