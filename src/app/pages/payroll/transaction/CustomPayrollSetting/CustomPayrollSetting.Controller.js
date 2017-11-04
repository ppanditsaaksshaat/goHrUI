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
      showRefresh: false,
      showFilter: true,
      filterOpened: true,
      showAdd: false,
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
      showApplyFilter: false,
      filterOnChange: _filterChange,
      afterCellEdit: _afterCellEdit,
      pageResult: _pageResult
    }

    function _pageResult(result) {
      console.log(result)
      if (result.pageinfo.uibuttons.pending.IsAllowed == "True" || ($scope.user.profile.isAdmin && $scope.user.profile.isManager))
        $scope.page.boxOptions.customButtons.push({ text: 'Pending', icon: 'ion-refresh', onClick: _pendingClick, type: 'btn-danger' })
      if (result.pageinfo.uibuttons.ready.IsAllowed == "True" || ($scope.user.profile.isAdmin && $scope.user.profile.isManager))
        $scope.page.boxOptions.customButtons.push({ text: 'Ready', icon: 'fa fa-plus-circle', onClick: _readyClick, type: 'btn-warning' })
      if (result.pageinfo.uibuttons.regenerate.IsAllowed == "True" || ($scope.user.profile.isAdmin && $scope.user.profile.isManager))
        $scope.page.boxOptions.customButtons.push({ text: 'ReGenerate', icon: 'ion-refresh', onClick: _reGenerateClick, type: 'btn-danger' })
      if (result.pageinfo.uibuttons.saveandregenrate.IsAllowed == "True" || ($scope.user.profile.isAdmin && $scope.user.profile.isManager))
        $scope.page.boxOptions.customButtons.push({ text: 'Save & Generate Salary', icon: 'btn-primary', onClick: _saveAndGenerateSalaryClick, type: 'btn-warning' })
    }

    function _afterCellEdit(rowEntity, colDef, newValue, oldValue) {
      console.log(rowEntity, colDef, newValue, oldValue)
      var presentDays = parseInt(rowEntity.SADPresentDays);
      console.log(presentDays)
      var salaryDays = parseInt(rowEntity.SADSalaryDays)
      var leaveDays = parseInt(rowEntity.SADLeaveDays)
      var absent = parseInt(rowEntity.SADLwpDays)
      console.log(absent)
      var weekOff = parseInt(rowEntity.SADHolidays)
      var workingHoliday = parseInt(rowEntity.SADPresentOnHolidays)
      var singleOT = parseInt(rowEntity.SADSingleOTHours)
      var onHold = parseInt(rowEntity.SADOnHold)
      var doubleOT = parseInt(rowEntity.SADDoubleOTHours)
      var incentiveOTHour = parseInt(rowEntity.SADIncentiveOTHour)


      //================Update Present Days ========================
      if (colDef.name == 'SADPresentDays') {


        if (presentDays < salaryDays || presentDays < 24) {
          //update field
          var salaryDay = presentDays + weekOff + workingHoliday + leaveDays;
          console.log(salaryDay);
          console.log(salaryDays);

          var updateAbsent = salaryDay - salaryDays;
          console.log(updateAbsent)
          if (updateAbsent <= absent) {
            var minusLeave = absent - updateAbsent;
            console.log(minusLeave)
            rowEntity.SADLwpDays = minusLeave;
            rowEntity.SADSalaryDays = salaryDay;

            var tableId = 195;
            var pkName = 'SADId';
            pkId = rowEntity.SADId;
            var fieldList = [];
            fieldList.push({ SADSalaryDays: rowEntity.SADSalaryDays })
            fieldList.push({ SADLwpDays: rowEntity.SADLwpDays })
            fieldList.push({ SADPresentDays: rowEntity.SADPresentDays })

            console.log(fieldList)

            pageService.updateMultiField(tableId, pkName, pkId, fieldList).then(function (result) {
              console.log(result)
            })

          }
          else {
            rowEntity.SADPresentDays = oldValue;
          }
        }
        else {
          rowEntity.SADPresentDays = oldValue;
        }
      }

      //=============Update Holiday=============
      if (colDef.name == 'SADHolidays') {
        if (weekOff < salaryDays) {
          //Update Field
          var salaryDay = presentDays + weekOff + workingHoliday + leaveDays;
          console.log(salaryDay)
          var updateSalaryDays = salaryDay - salaryDays;
          console.log(updateSalaryDays)
          var totalSalaryDays = salaryDays + updateSalaryDays;
          console.log(totalSalaryDays)
          if (updateSalaryDays <= absent) {
            var addAbsent = salaryDay - salaryDays;

            var totalAbsent = absent - addAbsent;
            rowEntity.SADLwpDays = totalAbsent;
            rowEntity.SADSalaryDays = totalSalaryDays;
            var tableId = 195;
            var pkName = 'SADId';
            var pkId = rowEntity.SADId;
            var fieldList = [];
            fieldList.push({ SADLwpDays: rowEntity.SADLwpDays })
            fieldList.push({ SADSalaryDays: rowEntity.SADSalaryDays })
            fieldList.push({ SADHolidays: rowEntity.SADHolidays })



            console.log(fieldList)

            pageService.updateMultiField(tableId, pkName, pkId, fieldList).then(function (result) {
              console.log(result)
            })
          }
          else {
            rowEntity.SADHolidays = oldValue;
          }

        }
        else {
          rowEntity.SADHolidays = oldValue;
        }

      }
    }
    //  console.log($scope.page)
    console.log($scope.pending)

    function _pendingClick() {
      $scope.page.searchList = [];


      // alert('pending');
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
          displayName: col.displayName,
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

      var undefinedData = [];
      var isValidateData = false;
      angular.forEach($scope.page.searchList, function (col, cdx) {
        if (col.field == "SubUnitId") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalMonth") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalYear") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "fromdate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
        else if (col.field == "todate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
      })
      if (isValidateData) {
        $scope.showMsg('warning', 'Please choose option from ' + undefinedData);
      }
      else {
        console.log($scope.page.searchList);
        $scope.page.refreshData()
        console.log($scope.page)
        console.log($scope.page.searchList)
      }
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
      // debugger;
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
          // $scope.acFromDate = getFromDate;
          // $scope.acToDate = getToDate;
          $scope.showAcFromDate = moment(getFromDate).format("DD-MMM-YYYY");
          $scope.showAcToDate = moment(getToDate).format("DD-MMM-YYYY");;

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
          $scope.acFromDate = moment(getFromDate).format("DD-MMM-YYYY");
          $scope.acToDate = moment(getToDate).format("DD-MMM-YYYY");;
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
      $scope.page.searchList = [];
      var colList = [];
      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        colList = {
          field: col.name,
          operand: '=',
          value: col.value,
          displayName: col.displayName,
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

      var undefinedData = [];
      var isValidateData = false;
      angular.forEach($scope.page.searchList, function (col, cdx) {
        if (col.field == "SubUnitId") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalMonth") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalYear") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "fromdate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
        else if (col.field == "todate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
      })
      if (isValidateData) {
        $scope.showMsg('warning', 'Please choose option from ' + undefinedData);
      }
      else {
        console.log($scope.page.searchList);
        $scope.page.refreshData()
        console.log($scope.page)
        console.log($scope.page.searchList)
      }
    }

    function _reGenerateClick() {
      $scope.page.searchList = [];
      var colList = [];
      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        colList = {
          field: col.name,
          operand: '=',
          value: col.value,
          displayName: col.displayName,
        }
        $scope.page.searchList.push(colList)
      })

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

      var undefinedData = [];
      var isValidateData = false;
      angular.forEach($scope.page.searchList, function (col, cdx) {
        if (col.field == "SubUnitId") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalMonth") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "SalYear") {
          if (col.value === undefined) {
            undefinedData.push(col.displayName)
            isValidateData = true;
          }
        }
        else if (col.field == "fromdate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
        else if (col.field == "todate") {
          if (col.value === undefined) {
            undefinedData.push(col.field)
            isValidateData = true;
          }
        }
      })
      if (isValidateData) {
        $scope.showMsg('warning', 'Please choose option from ' + undefinedData);
      }
      else {
        console.log($scope.page.searchList);
        $scope.page.refreshData()
        console.log($scope.page)
        console.log($scope.page.searchList)
      }
    }


    function _saveAndGenerateSalaryClick() {
      var colList = [];
      var filterData = {};
      var undefinedData = [];
      var isValidateData = false;
      console.log($scope.page.searchList)
      // angular.forEach($scope.page.searchList, function (col, cdx) {
      //   if (col.field == "SubUnitId") {
      //     if (col.value != undefined) {
      //       filterData.subUnitId.push(col.value)
      //     }
      //     else {
      //       undefinedData.push(col.displayName)
      //       isValidateData = true;
      //     }
      //   }
      //   else if (col.field == "SalMonth") {
      //     if (col.value != undefined) {
      //       filterData.salMonth.push(col.value)
      //     }
      //     else {
      //       undefinedData.push(col.displayName)
      //       isValidateData = true;
      //     }
      //   }
      //   else if (col.field == "SalYear") {
      //     if (col.value != undefined) {
      //       filterData.salYear.push(col.value)
      //     }
      //     else {
      //       undefinedData.push(col.displayName)
      //       isValidateData = true;
      //     }
      //   }
      // })

      var filterData = {
        subUnitId: $scope.page.searchList[0].value,
        salMonth: $scope.page.searchList[1].value,
        salYear: $scope.page.searchList[2].value
      }
      console.log(filterData)
      if (isValidateData) {
        $scope.showMsg('warning', 'Please choose option from ' + undefinedData);
      }
      else {
        pageService.generateSalary(filterData).then(function (result) {
          console.log(result)
          if (result.success_message == 'Salary Generate And Save') {
            $scope.showMsg('success', 'Salary generate and save.', '');
          }
          else {
            var empData = result.error_message;
            $scope.showMsg('error', empData, '');
            console.log(empData)
          }
        });
      }

    }

    function _addRecord() {
      $scope.showEditForm = true;
    }

  }
})();
