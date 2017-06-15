/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.CustomPayrollSetting')
    .controller('CustomPayrollSettingController', CustomPayrollSettingController);

  /** @ngInject */
  function CustomPayrollSettingController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 430;
    var currentState = $state.current;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.isDate = true;
    console.log($scope.page)
    $scope.page.pageId = 430;
    $scope.isGenerateSalary = false;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
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
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      filterOnChange: _filterChange
    }

    $scope.page.boxOptions.customButtons = [];
    $scope.page.boxOptions.customButtons.push({ text: 'Pending', icon: 'ion-refresh', onClick: _pendingClick, type: 'btn-danger' })
    $scope.page.boxOptions.customButtons.push({ text: 'Ready', icon: 'fa fa-plus-circle', onClick: _readyClick, type: 'btn-warning' })
    $scope.page.boxOptions.customButtons.push({ text: 'ReGenerate', icon: 'ion-refresh', onClick: _reGenerateClick, type: 'btn-danger' })
    $scope.page.boxOptions.customButtons.push({ text: 'Save & Generate Salary', icon: 'btn-primary', onClick: _saveAndGenerateSalaryClick, type: 'btn-warning' })

    function _pendingClick() {

      console.log($scope.page)
      // if ($scope.page.filterData.SubUnitId !== undefined && $scope.page.filterData.SalMonth !== undefined && $scope.page.filterData.SalYear !== undefined) {
      // if ($scope.page.filterData.SubUnitId.value !== undefined && $scope.page.filterData.SalMonth.value !== undefined && $scope.page.filterData.SalYear.value !== undefined) {
      console.log($scope.page.searchList);
      console.log($scope.page.pageinfo.filters);
      // console.log($scope.page.pageinfo.filters[0].value, $scope.page.pageinfo.filters[1].value, $scope.page.pageinfo.filters[2].value)
      var colList = [];
      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        colList = {
          field: col.name,
          operand: '=',
          value: col.value,
        }
        $scope.page.searchList.push(colList)
      })

      $scope.page.searchList.push({
        field: 'SalaryStatus',
        operand: '=',
        value: 'Pending'
      });
      $scope.page.searchList.push({
        field: 'fromdate',
        operand: '=',
        value: $scope.acFromDate
      })
      $scope.page.searchList.push({
        field: 'todate',
        operand: '=',
        value: $scope.acToDate
      })
      $scope.page.refreshData()
      console.log($scope.page)
      console.log($scope.page.searchList)
      // }
      // else
      //   $scope.showMsg('error', 'Month.');
      // }
      // else
      //   $scope.showMsg('error', 'Year.');
    }

    function _filterChange(filter) {
      // var searchList = []
      // if ($scope.filterData.SalMonth && $scope.filterData.SalYear) {
      //   if ($scope.filterData.SalMonth.value && $scope.filterData.SalYear.value) {

      //     //adding month to searcList
      //     searchList.push({
      //       value: filter.value,
      //       operand: '=',
      //       field: 'LSCSUId'
      //     })

      //   }
      // }
      console.log($scope.page.filterData)
      console.log($scope.page.filterData.SubUnitId.value);
      var tableId = 335;
      var searchList = [];
      if (filter.name == 'SalMonth') {
        searchList.push({
          value: $scope.page.filterData.SubUnitId.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      else if (filter.name == 'SalYear') {
        searchList.push({
          value: $scope.page.filterData.SubUnitId.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      else if (filter.name == 'SubUnitId') {
        searchList.push({
          value: $scope.page.filterData.SubUnitId.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      console.log(searchList)
      pageService.findEntity(tableId, undefined, searchList).then(_getSelectedDateSuccessResult, _getSelectedDateErrorResult)
    }

    /*
    // $scope.$watch(
        //   function () {
        //     return $scope.page.pageinfo.filters
        //   }, function (newFilters) {
        //     if (newFilters !== undefined) {
    
        //       var tableId = 335;
        //       var searchList = [];
        //       var colList = [];
        //       angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        //         if (col.name == 'SalMonth') {
        //           colList = {
        //             field: 'LSCSUId',
        //             operand: '=',
        //             value: col.value,
        //           }
        //           searchList.push(colList)
        //         }
        //       })
        //       // $scope.page.pageinfo.filters
        //       // var tableId = 335;
        //       // var searchList = [];
        //       // searchList.push({
        //       //   value: $scope.page.pageinfo.filters[3].value,
        //       //   operand: '=',
        //       //   field: 'LSCSUId'
        //       // })
        //       pageService.findEntity(tableId, undefined, searchList).then(_getSelectedDateSuccessResult, _getSelectedDateErrorResult)
        //     }
        //   })
    
    
        // $scope.$watch(
        //   function () {
        //     return $scope.page.pageinfo.filters
        //   },
        //   function (newFilters) {
        //     if (newFilters !== undefined) {
        //       var tableId = 335;
        //       var searchList = [];
        //       var colList = [];
        //       angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        //         if (col.name == 'SalYear') {
        //           colList = {
        //             field: 'LSCSUId',
        //             operand: '=',
        //             value: col.value,
        //           }
        //           searchList.push(colList)
        //         }
        //       })
        //       // var tableId = 335;
        //       // var searchList = [];
        //       // searchList.push({
        //       //   value: $scope.page.pageinfo.filters[3].value,
        //       //   operand: '=',
        //       //   field: 'LSCSUId'
        //       // })
        //       pageService.findEntity(tableId, undefined, searchList).then(_getSelectedDateSuccessResult, _getSelectedDateErrorResult)
        //     }
        //   })
    
        // $scope.$watch(
        //   function () {
        //     return $scope.page.pageinfo.filters
        //   },
        //   function (newFilters) {
        //     if (newFilters !== undefined) {
        //       var tableId = 335;
        //       var searchList = [];
        //       var colList = [];
        //       angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        //         if (col.name == 'SubUnitId') {
        //           colList = {
        //             field: 'LSCSUId',
        //             operand: '=',
        //             value: col.value,
        //           }
        //           searchList.push(colList)
        //         }
        //       })
        //       console.log(searchList)
        //       // searchList.push({
        //       //   value: $scope.page.pageinfo.filters[2].value,
        //       //   operand: '=',
        //       //   field: 'LSCSUId'
        //       // })
        //       pageService.findEntity(tableId, undefined, searchList).then(_getSelectedDateSuccessResult, _getSelectedDateErrorResult)
        //     }
        //   })
    
    */

    /**
     * Update present days and holiday after cell edit of grid
     */


    /*
      // gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
      //               console.log(newValue, oldValue, colDef, rowEntity)
      //               var presentDays = parseInt(rowEntity.SADPresentDays);
      //               console.log(presentDays)
      //               var salaryDays = parseInt(rowEntity.SADSalaryDays)
      //               var leaveDays = parseInt(rowEntity.SADLeaveDays)
      //               var absent = parseInt(rowEntity.SADLwpDays)
      //               console.log(absent)
      //               var weekOff = parseInt(rowEntity.SADHolidays)
      //               var workingHoliday = parseInt(rowEntity.SADPresentOnHolidays)
      //               var singleOT = parseInt(rowEntity.SADSingleOTHours)
      //               var onHold = parseInt(rowEntity.SADOnHold)
      //               var doubleOT = parseInt(rowEntity.SADDoubleOTHours)
      //               var incentiveOTHour = parseInt(rowEntity.SADIncentiveOTHour)
    
      //               //================Update Present Days ========================
      //               if (colDef.name == 'SADPresentDays') {
      //                   if (presentDays < salaryDays || presentDays < 24) {
      //                       //update field
      //                       var salaryDay = presentDays + weekOff + workingHoliday + leaveDays;
      //                       console.log(salaryDay);
      //                       console.log(salaryDays);
      //                       var updateAbsent = salaryDay - salaryDays;
      //                       console.log(updateAbsent)
      //                       if (updateAbsent <= absent) {
      //                           var minusLeave = absent - updateAbsent;
      //                           console.log(minusLeave)
      //                           rowEntity.SADLwpDays = minusLeave;
      //                           rowEntity.SADSalaryDays = salaryDay;
      //                           var tableId = 195;
      //                           var pkName = 'SADId';
      //                           pm.pkId = rowEntity.SADId;
      //                           var fieldList = [];
      //                           fieldList.push({ SADSalaryDays: rowEntity.SADSalaryDays })
      //                           fieldList.push({ SADLwpDays: rowEntity.SADLwpDays })
      //                           fieldList.push({ SADPresentDays: rowEntity.SADPresentDays })
      //                           console.log(fieldList)
      //                           pageService.updateMultiField(tableId, pkName, pm.pkId, fieldList).then(function (result) {
      //                               console.log(result)
      //                           })
      //                       }
      //                       else {
      //                           rowEntity.SADPresentDays = oldValue;
      //                       }
      //                   }
      //                   else {
      //                       rowEntity.SADPresentDays = oldValue;
      //                   }
      //               }
    
      //               //=============Update Holiday=============
      //               if (colDef.name == 'SADHolidays') {
      //                   if (weekOff < salaryDays) {
      //                       //Update Field
      //                       var salaryDay = presentDays + weekOff + workingHoliday + leaveDays;
      //                       console.log(salaryDay)
      //                       var updateSalaryDays = salaryDay - salaryDays;
      //                       console.log(updateSalaryDays)
      //                       var totalSalaryDays = salaryDays + updateSalaryDays;
      //                       console.log(totalSalaryDays)
      //                       if (updateSalaryDays <= absent) {
      //                           var addAbsent = salaryDay - salaryDays;
      //                           var totalAbsent = absent - addAbsent;
      //                           rowEntity.SADLwpDays = totalAbsent;
      //                           rowEntity.SADSalaryDays = totalSalaryDays;
      //                           var tableId = 195;
      //                           var pkName = 'SADId';
      //                           var pkId = rowEntity.SADId;
      //                           var fieldList = [];
      //                           fieldList.push({ SADLwpDays: rowEntity.SADLwpDays })
      //                           fieldList.push({ SADSalaryDays: rowEntity.SADSalaryDays })
      //                           fieldList.push({ SADHolidays: rowEntity.SADHolidays })
      //                           console.log(fieldList)
      //                           pageService.updateMultiField(tableId, pkName, pkId, fieldList).then(function (result) {
      //                               console.log(result)
      //                           })
      //                       }
      //                       else {
      //                           rowEntity.SADHolidays = oldValue;
      //                       }
      //                   }
      //                   else {
      //                       rowEntity.SADHolidays = oldValue;
      //                   }
      //               }
      //               //console.log(tableId)
      //               console.log(newValue, oldValue, colDef, rowEntity)
      //           });
    */

    function _getSelectedDateSuccessResult(result) {
      console.log(result)
      debugger;
      if (result !== undefined && result != null) {
        if (result.LSInBetMonthId == true) {
          var ACMonth = ($scope.page.filterData.SalMonth.value) - 1;
          var ACYear = $scope.page.filterData.SalYear.value;
          var fromDay = result.LSCFromDay;
          var toDay = result.LSCToDay;
          var fromDate = new Date(ACYear, ACMonth, fromDay);
          var toDate = new Date(ACYear, ACMonth + 1, toDay);
          var getFromDate = (fromDate.getMonth()) + 1 + "-" + fromDate.getDate() + "-" + fromDate.getFullYear();
          var getToDate = (toDate.getMonth()) + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();
          console.log(getFromDate)
          $scope.acFromDate = getFromDate;
          $scope.acToDate = getToDate;
          console.log($scope.acFromDate, $scope.acToDate);
          if (($scope.page.filterData.SubUnitId.value !== undefined && $scope.page.filterData.SalMonth.value != null && $scope.page.filterData.SalYear.value != null) || ($scope.page.filterData.SalMonth.value != null && $scope.page.filterData.SalYear.value != null && $scope.page.filterData.SubUnitId.value !== undefined)) {
            // console.log($scope.filterData.SubUnitId.value, $scope.filterData.SalMonth.value, $scope.filterData.SalYear.value)
            $scope.isDate = false;
          }
        }
        else if (result.LSCEndOfMonth == true) {
          var ACMonth = ($scope.page.filterData.SalMonth.value) - 1;
          var ACYear = $scope.page.filterData.SalYear.value;
          var fromDate = new Date(ACYear, ACMonth, 1)
          var toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
          var getFromDate = (fromDate.getMonth()) + 1 + "-" + fromDate.getDate() + "-" + fromDate.getFullYear();
          var getToDate = (toDate.getMonth()) + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();
          $scope.acFromDate = getFromDate;
          $scope.acToDate = getToDate;
          console.log(getFromDate)
          // $scope.acFromDate = fromDate.getDay() + '-' + fromDate.getMonth() + '-' + fromDate.getFullYear();
          // $scope.acToDate = toDate.getDay() + '-' + toDate.getMonth() + '-' + toDate.getFullYear();
          console.log($scope.acFromDate, $scope.acToDate)
          if (($scope.page.filterData.SubUnitId.value !== undefined && $scope.page.filterData.SalMonth.value != null && $scope.page.filterData.SalYear.value != null) || ($scope.page.filterData.SalMonth.value != null && $scope.page.filterData.SalYear.value != null && $scope.page.filterData.SubUnitId.value !== undefined)) {
            // console.log($scope.filterData.SubUnitId.value, $scope.filterData.SalMonth.value, $scope.filterData.SalYear.value)
            $scope.isDate = false;
          }
        }
      }
    }

    function _getSelectedDateErrorResult(result) {

    }

    function _readyClick() {
      var colList = [];
      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        colList = {
          field: col.name,
          operand: '=',
          value: col.value,
        }
        $scope.page.searchList.push(colList)
      })
      $scope.page.searchList.push({
        field: 'SalaryStatus',
        operand: '=',
        value: 'Ready'
      });
      $scope.page.searchList.push({
        field: 'fromdate',
        operand: '=',
        value: $scope.acFromDate
      })
      $scope.page.searchList.push({
        field: 'todate',
        operand: '=',
        value: $scope.acToDate
      })
      $scope.page.refreshData()
      console.log($scope.page)
    }
    function _reGenerateClick() {
      var colList = [];
      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        colList = {
          field: col.name,
          operand: '=',
          value: col.value,
        }
        $scope.page.searchList.push(colList)
      })
      console.log($scope.page.searchList);
      $scope.page.searchList.push({
        field: 'SalaryStatus',
        operand: '=',
        value: 'ReGenerate'
      });
      $scope.page.searchList.push({
        field: 'fromdate',
        operand: '=',
        value: $scope.acFromDate
      })
      $scope.page.searchList.push({
        field: 'todate',
        operand: '=',
        value: $scope.acToDate
      })
      $scope.page.refreshData()
      console.log($scope.page)
    }
    function _saveAndGenerateSalaryClick() {
      var colList = [];
      // var filterData = [];
      // console.log($scope.page.searchList);
      // angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
      //   colList = {
      //     value: col.value,
      //   }
      //   filterData.push(colList)
      // })

      var filterData = {
        subUnitId: $scope.page.searchList[0].value,
        salMonth: $scope.page.searchList[1].value,
        salYear: $scope.page.searchList[2].value
      }
      console.log(filterData)
      pageService.generateSalary(filterData).then(function (result) {
        if (result.success_message == 'Salary Generate And Save') {
          alert(result.success_message)
        }
        var empData = result;
        console.log(empData)
      });
    }

    function _addRecord() {
      $scope.showEditForm = true;
    }

  }
})();
