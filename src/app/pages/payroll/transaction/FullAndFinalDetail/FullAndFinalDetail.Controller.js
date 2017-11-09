/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail')
    .controller('payFullAndFinalDetailController', payFullAndFinalDetailController);

  /** @ngInject */
  function payFullAndFinalDetailController($scope, $state, pageService, editFormService, $filter) {
    var vm = this;
    vm.pageId = 471;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.close = _close;
    vm.queryId = 586;
    $scope.weekGridOptions = {
      enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false, paginationPageSize: 10
      // , onRegisterApi: function (gridApi) { $scope.gridApi = gridApi }
    }
    $scope.pageReport = { reportId: 62 }

    $scope.showGrid = false;
    $scope.showReport = true;
    $scope.showEditForm = true;
    $scope.disabledEmp = false;

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
    $scope.entity = {};

    $scope.showStatus = false;

    var fullAndFinalSalaryPageId = 473;
    var getFullAndFinalQueryId = 594;



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
      viewRecord: _viewRecord,
      deleteRecord: null,
      customColumns: [{ text: 'Report', type: 'a', name: 'Option', click: _fReport, pin: true }, { text: 'Verify', type: 'a', name: 'Verify', click: _fNFerify, pin: true }],
      pageResult: _pageResult,
      dataResult: _dataResult
    }
    function _dataResult(result) {
      console.log(result)
    }

    function _pageResult(result) {
      console.log(result);
    }

    function _editRecord(row) {
      $scope.page.isAllowEdit = true;
      $scope.showStatus = false;
      $scope.disabledEmp = true;
      console.log(row)
      $scope.enableShowButton = false;
      $scope.entity = row.entity;
      console.log(row)


      $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.FAFEmpId, row.entity.FAFEmpId, 'value')
      console.log($scope.entity.selectedEmp)
      $scope.entity.SUName = row.entity.selectedEmp.SUName;
      $scope.entity.designName = row.entity.selectedEmp.DesgName;
      $scope.entity.deptName = row.entity.selectedEmp.DeptName;
      $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;
      console.log($scope.entity.selectedEmp);
      // vm.oldEntity = angular.copy(row.entity);


      var searchLists = [];
      var searchListData = { field: 'FAFDId', operand: '=', value: row.entity.FAFDId }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, getFullAndFinalQueryId).then(_getEmployeeFullAndFinalOnEditResult, _getEmployeeFullAndFinalOnEditErrorResult)



      $scope.showOnClick = true;
    }

    function _getEmployeeFullAndFinalOnEditResult(result) {
      console.log(result)
      // $scope.entity = result[0];

      $scope.entity.FAFDTotalEarning = result[0][0].FAFDTotalEarning
      $scope.entity.FAFDTotalDeduction = result[0][0].FAFDTotalDeduction
      $scope.entity.FAFDNetPayment = result[0][0].FAFDNetPayment
      vm.oldEntity = result[0];
      // $scope.entity.FAFDLoanOutstanding = result[0][0].FAFDLoanOutstanding
      $scope.entity.totalPayDays = (parseFloat(result[0][0].FAFDPayDays) + parseFloat(result[0][0].FAFDELEncashable)).toFixed(2);

      $scope.weekGridOptions.columnDefs = [
        { name: 'SHName', displayName: 'Salary Head', width: 170, enableCellEdit: false },
        { name: 'FFSDSHRate', displayName: 'Head Rate', width: 130, enableCellEdit: false },
        { name: 'FFSDSHAmount', displayName: 'Salary Amount', width: 130, enableCellEdit: false }
      ]
      $scope.weekGridOptions.data = result[1];


      $scope.showGrid = true;
      $scope.showReport = true;
      $scope.showEditForm = false;
    }

    function _getEmployeeFullAndFinalOnEditErrorResult(error) {
      console.log(error)
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
      $scope.showStatus = false;
      $scope.enableShowButton = true;
      $scope.entity = {};
      // $scope.showEditForm = false;
      $scope.showGrid = true;
      $scope.showReport = true;
      $scope.showEditForm = false;
      $scope.disabledEmp = false;

      $scope.showOnClick = false;
      $scope.page.refreshData();
    }
    function _closeForm() {
      // $scope.showEditForm = true;
      $scope.showStatus = false;
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
      $scope.entity.FAFDLoanOutstanding = result[0][0].LoanOutstanding

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

              if ((rowData.SHId == undefined && rowData.FFSDSHId == value.SalaryCode) || (rowData.FFSDSHId == undefined && rowData.SHId == value.SalaryCode) && (rowData.SHIsDeduction == 0)) {
                // if ((rowData.SHId == undefined ? rowData.FFSDSHId : rowData.SHId == value.SalaryCode) && rowData.SHIsDeduction == 0) {
                // $scope.weekGridOptions.data[row].push(value.SalaryHeadAmount)

                rowData.SalaryAmount = value.SalaryHeadAmount;
                rowData.FFSDSHAmount = value.SalaryHeadAmount;
                console.log(rowData.SalaryAmount);

                earning = parseFloat(value.SalaryHeadAmount);
                console.log(earning);
                totalEarning += earning;
              }
              else if ((rowData.SHId == undefined && rowData.FFSDSHId == value.SalaryCode) || (rowData.FFSDSHId == undefined && rowData.SHId == value.SalaryCode) && (rowData.SHIsDeduction == 1)) {
                // else if (rowData.SHId == value.SalaryCode && rowData.SHIsDeduction == 1) {
                // $scope.weekGridOptions.data[row].push(value.SalaryHeadAmount)

                rowData.SalaryAmount = value.SalaryHeadAmount;
                rowData.FFSDSHAmount = value.SalaryHeadAmount;
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
            // $scope.gridApi.core.refresh();
          });

          console.log(totalEarning);

          $scope.entity.FAFDTotalEarning = parseFloat(totalEarning) + parseFloat($scope.entity.FAFDGratuity);
          $scope.entity.FAFDTotalDeduction = parseFloat(totalDeduction) + parseFloat($scope.entity.FAFDLoanOutstanding);
          $scope.entity.FAFDNetPayment = parseFloat($scope.entity.FAFDTotalEarning) - parseFloat($scope.entity.FAFDTotalDeduction);

        })
      }
      else {
        $scope.showMsg('warning', 'Please fill value in pay day');
      }


      console.log('col')

    }

    function _totalPayDays() {
      var PFAFDPayDays = parseFloat($scope.entity.FAFDPayDays);
      if (isNaN(PFAFDPayDays))
        PFAFDPayDays = 0;
      $scope.entity.FAFDPayDays = PFAFDPayDays;

      $scope.entity.totalPayDays = (parseFloat($scope.entity.FAFDPayDays) + parseFloat($scope.entity.FAFDELEncashable)).toFixed(2);
    }

    function _validateSave() {
      var trueVal = angular.equals($scope.entity, vm.oldEntity);
      return trueVal;
    }

    function _saveForm() {





      if ($scope.entity.FAFDTotalEarning !== undefined && $scope.entity.FAFDTotalEarning != '' && $scope.entity.FAFDTotalEarning != null) {


        if ($scope.showStatus) {
          if (!_validateSanctionForm()) {
            if (!_validateSave()) {
              $scope.entity.FAFEmpId = $scope.entity.selectedEmp.value;
              editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
                $scope.entity.FAFDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
                .then(_saveFormSuccessResult, _saveFormErrorResult)

            }
            else {
              $scope.showMsg("info", "Nothing to save.")
            }
          }
        }
        else {
          if (!_validateSave()) {
            $scope.entity.FAFEmpId = $scope.entity.selectedEmp.value;
            $scope.entity.StatusId = 0
            $scope.entity.FAFEmpId = $scope.entity.selectedEmp.value;
            editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
              $scope.entity.FAFDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
              .then(_saveFormSuccessResult, _saveFormErrorResult)
          }
          else {
            $scope.showMsg("info", "Nothing to save.")
          }

        }



      }
      else {
        $scope.showMsg("warning", "total earning amount should be more than 0");
      }

    }

    function _validateSanctionForm() {
      if ($scope.entity.StatusId == "0" || $scope.entity.StatusId == undefined) {
        $scope.showMsg("error", "Status should be sanctioned/onhold/reject");
        return true;
      }
      if ($scope.entity.FAFDComment == undefined || $scope.entity.FAFDComment == '' || $scope.entity.FAFDComment == null) {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
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
            FFSDSHId: row.SHId == undefined ? row.FFSDSHId : row.SHId,
            FFSDSHRate: row.SalAmount == undefined ? row.FFSDSHRate : row.SalAmount,
            FFSDSHAmount: row.SalaryAmount == undefined ? row.FFSDSHAmount : row.SalaryAmount,

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
      $scope.showMsg("success", "Record Saved Successfully");
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

    function _viewRecord(row) {
      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');



        if (!$scope.status.isApproved) {
          if (!$scope.status.isRejected) {
            if (!$scope.status.isOnHold) {

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

    function _fNFerify(row) {
      // $scope.page.isAllowEdit = true;
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
          $scope.page.isAllowEdit = true;
          $scope.disabledEmp = true;
          console.log(row)
          $scope.enableShowButton = false;
          $scope.entity = row.entity;
          console.log(row)
          $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.FAFEmpId, row.entity.FAFEmpId, 'value')
          console.log($scope.entity.selectedEmp)
          $scope.entity.SUName = row.entity.selectedEmp.SUName;
          $scope.entity.designName = row.entity.selectedEmp.DesgName;
          $scope.entity.deptName = row.entity.selectedEmp.DeptName;
          $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;
          console.log($scope.entity.selectedEmp);

          var searchLists = [];
          var searchListData = { field: 'FAFDId', operand: '=', value: row.entity.FAFDId }
          searchLists.push(searchListData)
          var data = {
            searchList: searchLists,
            orderByList: []
          }
          pageService.getCustomQuery(data, getFullAndFinalQueryId).then(_getEmployeeFullAndFinalOnEditResult, _getEmployeeFullAndFinalOnEditErrorResult)



          $scope.showOnClick = true;
        }
        else {

        }
      }
      else {
        $scope.showMsg("error", "You can view this Application only")
      }
    }

  }

})();
