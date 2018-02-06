/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.musterMonthWise')
    .controller('musterMonthWiseController', musterMonthWiseController);

  /** @ngInject */
  function musterMonthWiseController($scope, $state, pageService) {
    $scope.page = { reportId: 16 }

    var currentState = $state.current;
    $scope.entity = {}
    debugger;
    $scope.page = $scope.createPage();
    $scope.isDate = true;
    console.log($scope.page)
    $scope.page.reportId = 16;
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
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      showApplyFilter: true,
      filterOnChange: _filterChange,
      afterCellEdit: null,
    }
    var flag = false;
    function _filterChange(filter) {
      console.log($scope.page.filterData)
      console.log(filter.name)
      var tableId = 335;
      var searchList = [];
      if (filter.name == 'Month') {
        searchList.push({
          value: $scope.page.filterData.SubUnit.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      else if (filter.name == 'Year') {
        searchList.push({
          value: $scope.page.filterData.SubUnit.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      else if (filter.name == 'SubUnit') {
        searchList.push({
          value: $scope.page.filterData.SubUnit.value,
          operand: '=',
          field: 'LSCSUId'
        })
      }
      console.log(searchList)
      pageService.findEntity(tableId, undefined, searchList).then(function (result) {
        if (result !== undefined && result != null) {
          if (result.LSInBetMonthId == true) {
            var ACMonth = ($scope.page.filterData.Month.value) - 1;
            var ACYear = $scope.page.filterData.Year.value;
            var fromDay = result.LSCFromDay;
            var toDay = result.LSCToDay;
            var fromDate = new Date(ACYear, ACMonth, fromDay);
            var toDate = new Date(ACYear, ACMonth + 1, toDay);
            var getFromDate = (fromDate.getMonth()) + 1 + "-" + fromDate.getDate() + "-" + fromDate.getFullYear();
            var getToDate = (toDate.getMonth()) + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();
            console.log(getFromDate)

            $scope.acFromDate = moment(getFromDate).format("DD-MMM-YYYY");
            $scope.acToDate = moment(getToDate).format("DD-MMM-YYYY");

            $scope.showAcFromDate = moment(getFromDate);
            $scope.showAcToDate = moment(getToDate);
            var totalDays = $scope.showAcToDate.diff($scope.showAcFromDate, 'days')
            console.log($scope.acFromDate, $scope.acToDate);

            if (filter.name == 'SubUnit' && !flag) {
              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "From Date",
                filteron: null,
                name: "FromDate",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "FromDate",
                text: "From Date",
                type: 1,
                value: $scope.acFromDate,
                readonly: true,
              })

              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "To Date",
                filteron: null,
                name: "ToDate",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "ToDate",
                text: "To Date",
                type: 1,
                value: $scope.acToDate,
                readonly: true
              })

              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "Total Days",
                filteron: null,
                name: "TotalDays",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "TotalDays",
                text: "Total Days",
                type: 1,
                value: totalDays,
                readonly: true
              })
              flag = true;
            }

            if (filter.name == "Month" || filter.name == "Year" || filter.name == "SubUnit") {
              if (flag) {
                angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
                  if (col.name == "TotalDays") {
                    col.value = totalDays;
                  }
                  if (col.name == "FromDate") {
                    col.value = $scope.acFromDate;
                  }
                  if (col.name == "ToDate") {
                    col.value = $scope.acToDate;
                  }
                })
              }
            }
          }
          else if (result.LSCEndOfMonth == true) {
            var ACMonth = ($scope.page.filterData.Month.value) - 1;
            var ACYear = $scope.page.filterData.Year.value;
            var fromDate = new Date(ACYear, ACMonth, 1)
            var toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
            var getFromDate = (fromDate.getMonth()) + 1 + "-" + fromDate.getDate() + "-" + fromDate.getFullYear();
            var getToDate = (toDate.getMonth()) + 1 + "-" + toDate.getDate() + "-" + toDate.getFullYear();
            $scope.acFromDate = moment(getFromDate).format("DD-MMM-YYYY");
            $scope.acToDate = moment(getToDate).format("DD-MMM-YYYY");;
            console.log(getFromDate)
            $scope.showAcFromDate = moment(getFromDate);
            $scope.showAcToDate = moment(getToDate);
            var totalDays = $scope.showAcToDate.diff($scope.showAcFromDate, 'days')
            if (filter.name == 'SubUnit') {
              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "From Date",
                filteron: null,
                name: "FromDate",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "FromDate",
                text: "From Date",
                type: 1,
                value: $scope.acFromDate,
                disable: true
              })

              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "To Date",
                filteron: null,
                name: "ToDate",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "ToDate",
                text: "To Date",
                type: 1,
                value: $scope.acToDate
              })

              $scope.page.pageinfo.filters.push({
                controlType: "textbox",
                displayName: "Total Days",
                filteron: null,
                name: "TotalDays",
                operator: "=",
                required: true,
                showFilter: false,
                spfield: "TotalDays",
                text: "Total Days",
                type: 1,
                value: totalDays
              })
            }
            console.log($scope.acFromDate, $scope.acToDate)
            if (($scope.page.filterData.SubUnit.value !== undefined && $scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null) || ($scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null && $scope.page.filterData.SubUnit.value !== undefined)) {
              // console.log($scope.filterData.SubUnit.value, $scope.filterData.Month.value, $scope.filterData.Year.value)
              $scope.isDate = false;
            }
          }
        }

      }, function (err) {
        $scope.gridLine = true;
        console.log(err)
      })


      function _getSelectedDateSuccessResult(result) {
        console.log(result)
        // debugger;
        if (result !== undefined && result != null) {
          if (result.LSInBetMonthId == true) {
            var ACMonth = ($scope.page.filterData.Month.value) - 1;
            var ACYear = $scope.page.filterData.Year.value;
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

            $scope.acFromDate = moment(getFromDate).format("DD-MMM-YYYY");
            $scope.acToDate = moment(getToDate).format("DD-MMM-YYYY");;

            console.log($scope.acFromDate, $scope.acToDate);
            if (($scope.page.filterData.SubUnit.value !== undefined && $scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null) || ($scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null && $scope.page.filterData.SubUnit.value !== undefined)) {
              // console.log($scope.filterData.SubUnit.value, $scope.filterData.Month.value, $scope.filterData.Year.value)
              $scope.isDate = false;
            }
          }
          else if (result.LSCEndOfMonth == true) {
            var ACMonth = ($scope.page.filterData.Month.value) - 1;
            var ACYear = $scope.page.filterData.Year.value;
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
            if (($scope.page.filterData.SubUnit.value !== undefined && $scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null) || ($scope.page.filterData.Month.value != null && $scope.page.filterData.Year.value != null && $scope.page.filterData.SubUnit.value !== undefined)) {
              // console.log($scope.filterData.SubUnit.value, $scope.filterData.Month.value, $scope.filterData.Year.value)
              $scope.isDate = false;
            }
          }
        }
      }

      function _getSelectedDateErrorResult(result) {

      }


    }
  }

})();
