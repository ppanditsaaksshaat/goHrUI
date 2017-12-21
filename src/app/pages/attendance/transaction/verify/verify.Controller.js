/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verify')
    .controller('attTransverifyController', attTransverifyController);

  /** @ngInject */
  function attTransverifyController($scope, $state, $timeout, pageService, dialogModal, toastr, toastrConfig, $filter, DJWebStoreGlobal) {

    var vm = this;
    var currentState = $state.current;
    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    vm.pageId = 444;
    vm.tableId = 419;
    vm.queryId = 520;
    vm.showVerifyAttendance = true;


    this.applyFilter = _applyFilter;


    // this.uploadRecord = _uploadRecord


    /**For all list of verify attendance grid setting */
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    // $scope.page.searchList = [];
    // $scope.page.searchList.push({ field: 'Month', operand: '=', value: moment().format('MM') })
    // $scope.page.searchList.push({ field: 'VAYear', operand: '=', value: moment().format('YYYY') })
    // $scope.page.searchList.push({ field: 'VADepartmentId', operand: '=', value: -1 })
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showDataOnLoad: false,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
      showRowMenu: true,
      showCustomView: true,
      showUpload: true,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      noResultMessageText: 'Please use filter to show data.',
      enableAutoRefresh: true,
      selectedRowButtons: [{ text: "Verify", icon: '', onClick: _verifyAttendance, type: "btn-default", defaultButton: false }],
      customButtonsWithDefault: [{ text: "Download Template", icon: 'ion-archive', onClick: _downloadTemplate, type: "btn-default", defaultButton: false }],
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult,
      uploadRecord: _uploadRecord,
      columnDesign: []
      // readonlyColumns: ['col1', 'col2']
    }

    $scope.page.boxOptions.columnDesign.push({ name: 'EmpName', visible: true, pinnedLeft: true })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalDays', visible: true, cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT', width: 80 })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalPresentDays', visible: true, cellEditableCondition: true, cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalWeekoff', visible: true, cellEditableCondition: true, width: 80, cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalHolidays', visible: true, cellEditableCondition: true, cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'AbsentDays', visible: true, cellEditableCondition: true, cellClass: 'PINK-50 GRID-CELL-TEXT-RIGHT' })

    $scope.page.boxOptions.columnDesign.push({ name: 'TotalLeaves', visible: true, cellEditableCondition: true, cellClass: 'PURPLE-50 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalLWP', visible: true, cellEditableCondition: true, cellClass: 'PURPLE-50 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'DeductableLateCount', visible: true, cellEditableCondition: true, cellClass: 'RED-100 GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'DeductableLateDays', visible: true, cellEditableCondition: true, cellClass: 'RED-100 GRID-CELL-TEXT-RIGHT' })

    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalDeductableDays', visible: true, cellClass:
        function (grid, row, col, rowRenderIndex, colRenderIndex) {
          console.log(grid, row, col, rowRenderIndex, colRenderIndex)
          var totDays = parseFloat(row.entity.TotalDeductableDays);
          console.log(totDays)
          if (totDays > 0) {
            return 'RED-500 GRID-CELL-TEXT-RIGHT';
          }
          else {
            return 'GREEN-300 GRID-CELL-TEXT-RIGHT'
          }
        }
    })

    $scope.page.boxOptions.columnDesign.push({ name: 'WeekOffPresent', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'HolidayPresent', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalWeekOffComp', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'TotalHolidayComp', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'IncentiveDays', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })

    $scope.page.boxOptions.columnDesign.push({ name: 'DoubleOvertimeMin', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'SingleOvertimeMin', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'DoubleOvertimeHours', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })
    $scope.page.boxOptions.columnDesign.push({ name: 'SingleOvertimeHours', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })

    $scope.page.boxOptions.columnDesign.push({ name: 'TotalLateCount', visible: true, cellClass: 'GRID-CELL-TEXT-RIGHT' })

    $scope.page.boxOptions.columnDesign.push({ name: 'TotalSalaryDays', visible: true, pinnedRight: true, cellClass: 'GRID-CELL-BIG-FONT GRID-CELL-FONT-WHITE GRID-CELL-TEXT-RIGHT GREEN-300' })




    /**End of For all list of verify attendance grid setting */

    // $scope.page.boxOptions.customColumns = [];
    // $scope.page.boxOptions.customColumns.push({ text: 'Verify', name:'verify', click: _verifyRow, type: 'a', pin: false })


    $scope.editPage = $scope.createPage();
    $scope.editPage.pageId = 320;

    $scope.editPage.boxOptions = {
      selfLoading: true,
      showRefresh: false,
      showFilter: false,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      enableAutoRefresh: true,
      showDataOnLoad: true,
      customButtons: [{ text: "Close", icon: '', onClick: _close, type: "btn-danger" }],
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      // readonlyColumns: ['col1', 'col2']
    }



    $scope.resetFormCommon = _resetFormCommon;
    $scope.clearFormCommon = _clearFormCommon;
    $scope.closeForm = _closeForm;
    $scope.saveForm = _saveForm;




    function _pageResult(result) {
      angular.forEach(result.pageinfo.filters, function (filter) {
        if (filter.name == 'Month') {
          filter.value = parseInt(moment().format('MM'));
        }
        if (filter.name == 'Year') {
          filter.value = parseInt(moment().format('YYYY'));
        }
        if (filter.name == 'VADepartmentId') {
          filter.value = -1;
          filter.disabled = true;
        }
      })
    }

    function _dataResult(result) {
      if (result.length > 0) {
        $scope.gridDataCount = result.length;
      }
      if (result[0].Error == "Salary Cycle not found") {
        $scope.page.gridOptions.data = [];
        $scope.page.boxOptions.noResultMessageText = result[0].Error;
      }
    }
    function _downloadTemplate() {

      // the Workbook object gives you more control and stores multiple sheets 
      var Workbook = require('xlsx-workbook').Workbook;

      var workbook = new Workbook();

      var sales = workbook.add("Sales");
      var costs = workbook.add("Costs");

      sales[0][0] = 304.50;
      sales[1][0] = 159.24;
      sales[2][0] = 493.38;

      costs[0][0] = 102.50;
      costs[1][0] = 59.14;
      costs[2][0] = 273.32;

      // automatically appends the '.xlsx' extension 
      workbook.save("Revenue-Summary");


      // /* this line is only needed if you are not adding a script tag reference */
      // if (typeof XLSX == 'undefined') XLSX = require('xlsx');


      // // /* original data */
      // // // // var data = [[1, 2, 3], [true, false, null, "sheetjs"], ["foo", "bar", "0.3"], ["baz", null, "qux"]]
      // var ws_name = "SheetJS";

      // // /* require XLSX */
      // // // var XLSX = require('xlsx')

      // // /* set up workbook objects -- some of these will not be required in the future */
      // var wb = {}
      // wb.Sheets = {};
      // wb.Props = {};
      // wb.SSF = {};
      // wb.SheetNames = [];

      // // /* create worksheet: */
      // var ws = {}

      // /* the range object is used to keep track of the range of the sheet */
      // var range = { s: { c: 0, r: 0 }, e: { c: 50, r: 1 } };


      // for (var R = 0; R != $scope.page.gridOptions.columnDefs.length; ++R) {

      //   var cell_address = { c: R, r: 1 };

      //   cell_address.v = $scope.page.gridOptions.columnDefs[R].displayName;

      //   var cell_ref = XLSX.utils.encode_cell(cell_address);

      //   /* add to structure */
      //   ws[cell_ref] = cell_address;
      // }
      // // /* Iterate through each element in the structure */
      // // for (var R = 0; R != $scope.page.gridOptions.data.length; ++R) {
      // //   var dataRow = $scope.page.gridOptions.data[R]



      // //   if (range.e.r < R) range.e.r = R;


      // //   for (var C = 0; C != data[R].length; ++C) {
      // //     if (range.e.c < C) range.e.c = C;

      // //     /* create cell object: .v is the actual data */
      // //     var cell = { v: dataRow[C] };
      // //     if (cell.v == null) continue;

      // //     /* create the correct cell reference */
      // //     var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      // //     /* determine the cell type */
      // //     if (typeof cell.v === 'number') cell.t = 'n';
      // //     else if (typeof cell.v === 'boolean') cell.t = 'b';
      // //     else cell.t = 's';

      // //     /* add to structure */
      // //     ws[cell_ref] = cell;
      // //   }
      // // }

      // ws['!ref'] = XLSX.utils.encode_range(range);

      // /* add worksheet to workbook */
      // wb.SheetNames.push(ws_name);
      // wb.Sheets[ws_name] = ws;


      // var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      // var dataBinary = s2ab(wbout);
      // // saveFileAs(dataBinary, contentType, filename)
      // saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "sheetjs.xlsx");


      // /* write file */
      // XLSX.writeFile(wb, 'test.xlsx');

      return;
      console.log($scope.page)
      var tempColumns = [];
      if ($scope.page.gridOptions.data.length > 0) {
        angular.forEach($scope.page.gridOptions.data, function (data) {

          var row = {
            'EmployeeCode': data.EmpCode,
            'EmployeeName': data.EmpName,
            'Department': data.Department,
            'TotalWeekOff': data.TotalWeekoff,
            'WeekOffPresent': data.WeekOffPresent,
            'TotalDays': data.TotalDays,
            'TotalPresentDays': data.TotalPresentDays,
            'TotalHolidays': data.TotalHolidays,
            'HolidayPresent': data.HolidayPresent,
            'TotalLeaves': data.TotalLeaves,
            'TotalLWP': data.TotalLWP,
            'TotalSalaryDays': data.TotalSalaryDays,
            'LateCount': data.DeductableLateCount,
            'LateDays': data.DeductableLateDays,
            'AbsentDays': data.AbsentDays,
            'IncentiveDays': data.IncentiveDays,
            'SingleOTMinute': data.SingleOvertimeMin,
            'SingleOTHours': data.SingleOvertimeHours,
            'DoubleOTMinute': data.DoubleOvertimeMin,
            'DoubleOTHours': data.DoubleOvertimeHours
          }
          tempColumns.push(row);
        })
        DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'Verify', false, true, true);
      }
      else {
        $scope.showMsg("error", "Please use filter to show data.")
      }
      //return

      // var row = {
      //   'EmployeeCode': '',
      //   'TotalWeekOff': '',
      //   'WeekOffPresent': '',
      //   'TotalDays': '',
      //   'TotalPresentDays': '',
      //   'TotalHolidays': '',
      //   'HolidayPresent': '',
      //   'TotalLeaves': '',
      //   'TotalLWP': '',
      //   'TotalSalaryDays': '',
      //   'LateCount': '',
      //   'LateDays': '',
      //   'AbsentDays': '',
      //   'IncentiveDays': '',
      //   'SingleOTMinute': '',
      //   'SingleOTHours': '',
      //   'DoubleOTMinute': '',
      //   'DoubleOTHours': '',

      // }
      // tempColumns.push(row)

    }
    function _uploadRecord() {



      //pageService.getAttSummaryFile();

      var options = {
        url: "app/common/forms/browseModal/browseModal.html",
        controller: "",
        controllerAs: "",
      }
      dialogModal.open(options)

    }
    /* generate a download */
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    $scope.$on('uploadGridData', _upload)
    function _upload(evt, uploadGridData) {

      var flag = false;

      if ($scope.page.gridOptions.data.length > 0) {
        angular.forEach(uploadGridData.data, function (newEmpDetail) {
          var oldEmpDetail = $filter("findObj")($scope.page.gridOptions.data, newEmpDetail.EmployeeCode, "EmpCode")
          if (oldEmpDetail != null) {

            oldEmpDetail.TotalWeekoff = parseInt(newEmpDetail.TotalWeekOff);
            oldEmpDetail.TotalDays = newEmpDetail.TotalDays;
            oldEmpDetail.TotalPresentDays = newEmpDetail.TotalPresentDays;
            oldEmpDetail.TotalHolidays = newEmpDetail.TotalHolidays;
            oldEmpDetail.HolidayPresent = newEmpDetail.HolidayPresent;
            oldEmpDetail.TotalLeaves = newEmpDetail.TotalLeaves;
            oldEmpDetail.TotalLWP = newEmpDetail.TotalLWP;
            oldEmpDetail.TotalSalaryDays = newEmpDetail.TotalSalaryDays;
            oldEmpDetail.DeductableLateCount = newEmpDetail.LateCount;
            oldEmpDetail.DeductableLateDays = newEmpDetail.LateDays;
            oldEmpDetail.AbsentDays = parseInt(newEmpDetail.AbsentDays);
            oldEmpDetail.IncentiveDays = parseInt(newEmpDetail.IncentiveDays);
            oldEmpDetail.SingleOvertimeMin = parseFloat(newEmpDetail.SingleOTMinute);
            oldEmpDetail.SingleOvertimeHours = parseFloat(newEmpDetail.SingleOTHours);
            oldEmpDetail.DoubleOvertimeMin = parseFloat(newEmpDetail.DoubleOTMinute);
            oldEmpDetail.DoubleOvertimeHours = parseFloat(newEmpDetail.DoubleOTHours);
            flag = true;

          }
          else {

          }
        })
        if (flag) {
          $scope.showMsg("success", "Your file uploaded successfully")
        }
      }
    }


    /**Close edit list */
    function _close() {
      vm.showVerifyAttendance = true;
    }

    /**
     * 
     */
    function _validateForm(editForm) {
      _resetFormCommon()
      return true;
    }
    /**
     * 
     * @param {*kk} editForm 
     */
    function _saveForm(editForm) {
      if (_validateForm(editForm)) {

      }
    }
    /**
     * Reset all controls value 
     * @param {*from name from view} editForm 
     */
    function _resetFormCommon(editForm) {

    }
    function _clearFormCommon(editForm) {

    }
    function _closeForm(editForm) {
      $scope.showEditForm = false;
      $scope.entity = {};
    }
    function _addRecord() {
      // $state.go("attendance.transaction.add", "{action:'create'}");
      $scope.showEditForm = true;
    }
    function _editRecord(row) {

      console.log(row)
      /**For list of edit verify attendance grid setting */
      vm.showVerifyAttendance = false
      var startDate = "", endDate = "";
      if ($scope.page.filterData === undefined) {
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate = moment().endOf('month').format('YYYY-MM-DD');

      }
      else {

        var sDate = $scope.page.filterData.Month.value + "-" + 1 + "-" + $scope.page.filterData.Year.value;
        startDate = moment(sDate).startOf('month').format('YYYY-MM-DD');
        endDate = moment(sDate).endOf('month').format('YYYY-MM-DD');
      }

      $scope.editPage.searchList = [{ field: "EmpId", operand: "=", value: row.entity.EmpId }, { field: "AttDate", operand: ">=", value: startDate }, { field: "AttDate", operand: "<=", value: endDate }];
      $scope.editPage.orderByList = [{ column: 'AttDate', isDesc: false }]
      $scope.editPage.refreshData();
    }
    function _updateRecord(row) {
      var empId = row.entity.EmpId;
      alert('_updateRecord called:' + empId)
    }
    function _deleteRecord(row) {
      var empId = row.entity.EmpId;
      alert('_deleteRecord called:' + empId)
    }
    function _viewRecord(row) {
      var empId = row.entity.EmpId;
      alert('_viewRecord called:' + empId)
    }
    function _openView() {
      alert('view opened')
    }

    function _applyFilter() {

      $scope.page.searchList = [];
      angular.forEach($scope.page.pageinfo.filters, function (filter) {

        if (filter.showFilter !== undefined) {
          if (filter.showFilter) {
            if (filter.value !== undefined) {
              var search = {};
              search.field = filter.name;
              search.operand = filter.operator;
              search.value = filter.value;
              $scope.page.searchList.push(search)
            }
          }
        }
      })

      $scope.page.refreshData();

    }

    function _verifyRow(row) {

    }
    /**Verify attendance according to row selection */
    function _verifyAttendance() {
      console.log($scope.page.selectedRows);
      var finalVerifyData = [];
      var negitiveCount = 0;
      if ($scope.page.selectedRows != undefined && $scope.page.selectedRows.length > 0) {
        if ($scope.page.selectedRows.length == 1 && $scope.page.selectedRows[0].StatusBGClass != "") {
          finalVerifyData = angular.copy($scope.page.selectedRows)
          alert("you are not allowed to verify this attendance");
          return;
        }
        else {
          if ($scope.gridDataCount == $scope.page.selectedRows.length) {
            if ($scope.page.selectedRows[0].SMAllowedNegitiveVerify) {
              finalVerifyData = angular.copy($scope.page.selectedRows)
            }
            else {
              angular.forEach($scope.page.selectedRows, function (data, index) {
                if (data.StatusBGClass == "") {
                  finalVerifyData.push(data);
                  //  delete $scope.page.selectedRows[index];
                }
                else {
                  negitiveCount++;
                }

              })
              if ($scope.page.selectedRows.length == negitiveCount) {
                alert("you are not allowed to verify this attendance");
                finalVerifyData = [];
                return
              }
            }
          }
          else {
            angular.forEach($scope.page.selectedRows, function (data, index) {
              if (data.StatusBGClass == "") {
                finalVerifyData.push(data);
              }
              else {
                negitiveCount++;
              }

            })
            if ($scope.page.selectedRows.length == negitiveCount) {
              alert("you are not allowed to verify this attendance");
              finalVerifyData = [];
              return
            }
          }
        }


        var searchLists = [];
        var startDate = "";
        var endDate = "";

        if ($scope.page.filterData === undefined) {
          startDate = moment().startOf('month').format('YYYY-MM-DD');
          endDate = moment().endOf('month').format('YYYY-MM-DD');
        }
        else {

          var sDate = $scope.page.filterData.Month.value + "-" + 1 + "-" + $scope.page.filterData.Year.value;
          startDate = moment(sDate).startOf('month').format('YYYY-MM-DD');
          endDate = moment(sDate).endOf('month').format('YYYY-MM-DD');
        }

        var searchListData = {
          field: 'VerifyAttendance',
          operand: "table",
          value: LZString.compressToEncodedURIComponent(JSON.stringify(finalVerifyData))
        }
        searchLists.push(searchListData)
        searchListData = {
          field: 'FromDate',
          operand: '=',
          value: startDate

        }
        searchLists.push(searchListData)
        searchListData = {
          field: 'EndDate',
          operand: '=',
          value: endDate
        }
        searchLists.push(searchListData)

        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, vm.queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
      }

    }
    function _getCustomQuerySuccessResult(result) {
      console.log(result);

      $scope.showMsg("success", "Verify Successfully");
      $scope.page.refreshData();



      // if (result. == { emp = 1, sum = 1 }) {
      //  
      //   $scope.page.refreshData();
      // }
    }
    function _getCustomQueryErrorResult(err) {

    }
    /**End of Verify attendance according to row selection */
  }

})();
