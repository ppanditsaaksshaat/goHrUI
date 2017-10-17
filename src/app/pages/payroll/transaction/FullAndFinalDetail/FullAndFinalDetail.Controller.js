/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.FullAndFinalDetail')
    .controller('payFullAndFinalDetailController', payFullAndFinalDetailController);

  /** @ngInject */
  function payFullAndFinalDetailController($scope, $state, pageService) {
    var vm = this;
    vm.pageId = 471;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.close = _close;
    vm.queryId = 586;
    $scope.weekGridOptions = { enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false, paginationPageSize: 10 }



    // $scope.showEditForm = true;
    $scope.selectedDesignDept = _selectedDesignDept;
    $scope.getEmpFullAndFinal = _getEmpFullAndFinal;
    $scope.calculatedEmpSalary = _calculatedEmpSalary;

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
      debugger;
      $scope.showEditForm = true;
    }

    function _selectedDesignDept() {
      $scope.entity.FAFDDate = $scope.entity.selectedEmp.RDRelievingDate;
      $scope.entity.SUName = $scope.entity.selectedEmp.SUName;
      $scope.entity.designName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.deptName = $scope.entity.selectedEmp.DeptName;


    }

    function _getEmpFullAndFinal() {
      console.log($scope.entity.selectedEmp.value)
      if ($scope.entity.selectedEmp.value !== undefined && $scope.entity.selectedEmp.value != '') {
        if ($scope.entity.FAFDDate !== undefined && $scope.entity.FAFDDate != '') {


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


      $scope.entity.FAFDPresentDays = result[0][0].CurrentMonthPresentDay
      $scope.entity.FAFDCurrentYearEL = result[0][0].ELCurrent
      $scope.entity.FAFDELOpeninig = result[0][0].ELOpen
      $scope.entity.FAFDELTaken = result[0][0].ELTaken
      $scope.entity.FAFDELEncashable = result[0][0].ENcashmentEL
      $scope.entity.FAFDGratuity = result[0][0].GratuityAmount
      $scope.entity.FAFDELBalance = result[0][0].ELTaken
      // $scope.entity = result[0][0].TotalPresentDaysInYear
      $scope.entity.FAFDJoinYear = result[0][0].YearJoin

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
      console.log('col')
      for (var row = 0; row < $scope.weekGridOptions.data.length; row++) {
        var rowData = $scope.weekGridOptions.data[row];
        // rowData.SalaryAmount = rowData.SalAmount
        var salaryRate = rowData.SalAmount;
        var salaryData = (salaryRate * 15) / 30;
        rowData.SalaryAmount = salaryData;

      }

    }
  }

})();
