/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verify')
    .controller('attTransverifyController', attTransverifyController);

  /** @ngInject */
  function attTransverifyController($scope, $state, $timeout, editFormService,
    pageService, dialogModal, toastr, toastrConfig, $filter, DJWebStoreGlobal) {

    var vm = this;
    var currentState = $state.current;
    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    vm.pageId = 444;
    vm.tableId = 419;
    vm.queryId = 520;
    vm.showVerifyAttendance = true;
    vm.showVerifyAttendances = false;
    vm.showEmpVerifyDetail = false;
    vm.saveVerify = _saveVerifyData;
    $scope.oldEntity = {};
    vm.closeVerify = _closeVerify;

    $scope.presentDays = _presentDays;
    $scope.absentDays = _absentDays;
    $scope.leaveDays = _leaveDays;
    $scope.lateDays = _lateDays;
    $scope.lwpDays = _lwpDays;
    $scope.deductableDays = _deductableDays;
    $scope.carryForwardNextMonth = _carryForwardNextMonth;
    vm.updateVerifyAttendanceQueryId = 619;

    $scope.approvedData = _approvedData;


    this.applyFilter = _applyFilter;


    // this.uploadRecord = _uploadRecord

    $scope.closeView = _closeView;
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
      selectedRowButtons: [{
        text: "Verify",
        icon: '',
        onClick: _verifyAttendance,
        type: "btn-default",
        defaultButton: false
      }, {
        text: "Approved",
        icon: '',
        onClick: _approvedVerifyAttendance,
        type: "btn-default",
        defaultButton: false
      }],
      customButtonsWithDefault: [{
        text: "Download Template",
        icon: 'ion-archive',
        onClick: _downloadTemplate,
        type: "btn-default",
        defaultButton: false
      }],
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: _viewRecord,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult,
      uploadRecord: _uploadRecord,
      columnDesign: []
      // readonlyColumns: ['col1', 'col2']
    }

    $scope.page.boxOptions.columnDesign.push({
      name: 'EmpName',
      visible: true,
      pinnedLeft: true
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalDays',
      visible: true,
      cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT',
      width: 80
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalPresentDays',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalWeekoff',
      visible: true,
      cellEditableCondition: true,
      width: 80,
      cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalHolidays',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'YELLOW-100 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'AbsentDays',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'PINK-50 GRID-CELL-TEXT-RIGHT'
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalLeaves',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'PURPLE-50 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalLWP',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'PURPLE-50 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'DeductableLateCount',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'RED-100 GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'DeductableLateDays',
      visible: true,
      cellEditableCondition: true,
      cellClass: 'RED-100 GRID-CELL-TEXT-RIGHT'
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalDeductableDays',
      visible: true,
      cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
        console.log(grid, row, col, rowRenderIndex, colRenderIndex)
        var totDays = parseFloat(row.entity.TotalDeductableDays);
        console.log(totDays)
        if (totDays > 0) {
          return 'RED-500 GRID-CELL-TEXT-RIGHT';
        } else {
          return 'GREEN-300 GRID-CELL-TEXT-RIGHT'
        }
      }
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'WeekOffPresent',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'HolidayPresent',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalWeekOffComp',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalHolidayComp',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'IncentiveDays',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'DoubleOvertimeMin',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'SingleOvertimeMin',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'DoubleOvertimeHours',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })
    $scope.page.boxOptions.columnDesign.push({
      name: 'SingleOvertimeHours',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalLateCount',
      visible: true,
      cellClass: 'GRID-CELL-TEXT-RIGHT'
    })

    $scope.page.boxOptions.columnDesign.push({
      name: 'TotalSalaryDays',
      visible: true,
      pinnedRight: true,
      cellClass: 'GRID-CELL-BIG-FONT GRID-CELL-FONT-WHITE GRID-CELL-TEXT-RIGHT GREEN-300'
    })




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
      customButtons: [{
        text: "Close",
        icon: '',
        onClick: _close,
        type: "btn-danger"
      }],
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




      // // console.log(Workbook)
      // // // the Workbook object gives you more control and stores multiple sheets 
      // // var Workbook = require('Workbook').Workbook;

      // // var workbook = new Workbook();

      // // var sales = workbook.add("Sales");
      // // var costs = workbook.add("Costs");

      // // sales[0][0] = 304.50;
      // // sales[1][0] = 159.24;
      // // sales[2][0] = 493.38;

      // // costs[0][0] = 102.50;
      // // costs[1][0] = 59.14;
      // // costs[2][0] = 273.32;

      // // // automatically appends the '.xlsx' extension 
      // // workbook.save("Revenue-Summary");


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
      // var range = {
      //   s: {
      //     c: 0,
      //     r: 0
      //   },
      //   e: {
      //     c: 15,
      //     r: 10000
      //   }
      // };


      // // ws['A1'] = {
      // //   v: '2.4.2014',
      // //   t: 's',
      // //   r: '<t>2.4.2014</t>',
      // //   h: '2.4.2014',
      // //   w: '2.4.2014',
      // //   s:
      // //     {
      // //       patternType: 'solid',
      // //       fgColor: { theme: 8, tint: 0.3999755851924192 },
      // //       bgColor: { indexed: 64 }
      // //     }
      // // };

      // // ws['D1'] = { v: $scope.page.gridOptions.columnDefs.length, t: 'n' };
      // // ws['E1'] = { v: 'Month', t: 's' };
      // // ws['F1'] = { v: moment().format('M'), t: 's' };
      // // ws['G1'] = { v: 'Year', t: 's' };
      // // ws['H1'] = { v: moment().format('YYYY'), t: 's' };
      // // ws['I1'] = { v: 'Max. Weekoff', t: 's' };
      // // ws['J1'] = { v: '4', t: 's' };
      // // ws['K1'] = { v: 'Max. Holiday', t: 's' };
      // // ws['L1'] = { v: '3', t: 's' };

      // //WRITE DATA ROW HEADER
      // ws['A1'] = {
      //   v: 'Sno',
      //   t: 's'
      // };
      // ws['B1'] = {
      //   v: 'Code',
      //   t: 's'
      // };
      // ws['C1'] = {
      //   v: 'Name',
      //   t: 's'
      // };
      // ws['D1'] = {
      //   v: 'Total Days',
      //   t: 's'
      // };
      // ws['E1'] = {
      //   v: 'Present Days',
      //   t: 's'
      // };
      // ws['F1'] = {
      //   v: 'Absent',
      //   t: 's'
      // };
      // ws['G1'] = {
      //   v: 'Week Off',
      //   t: 's'
      // };
      // ws['H1'] = {
      //   v: 'Holiday',
      //   t: 's'
      // };
      // ws['I1'] = {
      //   v: 'Leave',
      //   t: 's'
      // };
      // ws['J1'] = {
      //   v: 'LWP',
      //   t: 's'
      // };
      // ws['K1'] = {
      //   v: 'Normal Overtime (Hours)',
      //   t: 's'
      // };
      // ws['L1'] = {
      //   v: 'Holiday Overtime (Days)',
      //   t: 's'
      // };
      // ws['M1'] = {
      //   v: 'Salary Days',
      //   t: 's'
      // };
      // ws['N1'] = {
      //   v: 'Month',
      //   t: 's'
      // };
      // ws['O1'] = {
      //   v: 'Year',
      //   t: 's'
      // };

      // console.log($scope.page.gridOptions.data)
      // for (var i = 0; i < $scope.page.gridOptions.data.length; i++) {
      //   var rowIndex = i + 2;
      //   var row = $scope.page.gridOptions.data[i];
      //   //WRITE DATA ROW HEADER
      //   ws['A' + rowIndex] = {
      //     v: i + 1,
      //     t: 's'
      //   };
      //   ws['B' + rowIndex] = {
      //     v: row['EmpCode'],
      //     t: 's'
      //   }; //Emp Code
      //   ws['C' + rowIndex] = {
      //     v: row['EmpName'],
      //     t: 's'
      //   }; //Emp Name
      //   ws['D' + rowIndex] = {
      //     f: '=DAY(DATE(YEAR(O' + rowIndex + '),N' + rowIndex + '+1,1)-1)',
      //     t: 's',
      //     s: {
      //       alignment: {
      //         textRotation: 90
      //       },
      //       font: {
      //         sz: 14,
      //         bold: true,
      //         color: '#FF00FF'
      //       }
      //     }
      //   }; //Total Days
      //   ws['E' + rowIndex] = {
      //     v: row['TotalPresentDays'],
      //     t: 's'
      //   }; //Present Days
      //   ws['F' + rowIndex] = {
      //     v: row['AbsentDays']
      //   }; //Absent 
      //   ws['G' + rowIndex] = {
      //     v: row['TotalWeekoff'],
      //     t: 's'
      //   }; //Week Off
      //   ws['H' + rowIndex] = {
      //     v: row['TotalHolidays'],
      //     t: 's'
      //   }; //Holiday
      //   ws['I' + rowIndex] = {
      //     v: row['TotalLeaves'],
      //     t: 's'
      //   }; //Leave
      //   ws['J' + rowIndex] = {
      //     v: row['TotalLWP'],
      //     t: 's'
      //   }; //LWP
      //   ws['K' + rowIndex] = {
      //     v: row['SingleOvertimeHours'],
      //     t: 's'
      //   }; //OT
      //   ws['L' + rowIndex] = {
      //     v: row['DoubleOvertimeHours'],
      //     t: 's'
      //   }; //Double OT
      //   ws['M' + rowIndex] = {
      //     f: '=E' + rowIndex + '+I' + rowIndex + '+G' + rowIndex + '+H' + rowIndex, t: 's',
      //     s:
      //       {
      //         patternType: 'solid',
      //         fgColor: { theme: 8, tint: 0.3999755851924192, rgb: '9ED2E0' },
      //         bgColor: { indexed: 64 }
      //       }
      //     }
      //   }; //Salary Days
      //   ws['N' + rowIndex] = {
      //     v: moment().format('MM'),
      //     t: 's'
      //   };
      //   ws['O' + rowIndex] = {
      //     v: moment().format('YYYY'),
      //     t: 's'
      //   };

      // }

      // ws['!ref'] = XLSX.utils.encode_range(range);

      // /* add worksheet to workbook */
      // wb.SheetNames.push(ws_name);
      // wb.Sheets[ws_name] = ws;



      // var wbout = XLSX.write(wb, {
      //   bookType: 'xlsx',
      //   type: 'binary'
      // });
      // var dataBinary = s2ab(wbout);
      // // saveFileAs(dataBinary, contentType, filename)
      // saveAs(new Blob([s2ab(wbout)], {
      //   type: "application/octet-stream"
      // }), "Attendance_" + moment().format('ddMMhhss') + ".xlsx");


      // // /* write file */
      // // XLSX.writeFile(wb, 'test.xlsx');

      // return;
      // console.log($scope.page)
      // var tempColumns = [];
      // if ($scope.page.gridOptions.data.length > 0) {
      //   angular.forEach($scope.page.gridOptions.data, function (data) {

      //     var row = {
      //       'EmployeeCode': data.EmpCode,
      //       'EmployeeName': data.EmpName,
      //       'Department': data.Department,
      //       'TotalWeekOff': data.TotalWeekoff,
      //       'WeekOffPresent': data.WeekOffPresent,
      //       'TotalDays': data.TotalDays,
      //       'TotalPresentDays': data.TotalPresentDays,
      //       'TotalHolidays': data.TotalHolidays,
      //       'HolidayPresent': data.HolidayPresent,
      //       'TotalLeaves': data.TotalLeaves,
      //       'TotalLWP': data.TotalLWP,
      //       'TotalSalaryDays': data.TotalSalaryDays,
      //       'LateCount': data.DeductableLateCount,
      //       'LateDays': data.DeductableLateDays,
      //       'AbsentDays': data.AbsentDays,
      //       'IncentiveDays': data.IncentiveDays,
      //       'SingleOTMinute': data.SingleOvertimeMin,
      //       'SingleOTHours': data.SingleOvertimeHours,
      //       'DoubleOTMinute': data.DoubleOvertimeMin,
      //       'DoubleOTHours': data.DoubleOvertimeHours
      //     }
      //     tempColumns.push(row);
      //   })
      //   DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'Verify', false, true, true);
      // } else {
      //   $scope.showMsg("error", "Please use filter to show data.")
      // }
      // //return

      // // var row = {
      // //   'EmployeeCode': '',
      // //   'TotalWeekOff': '',
      // //   'WeekOffPresent': '',
      // //   'TotalDays': '',
      // //   'TotalPresentDays': '',
      // //   'TotalHolidays': '',
      // //   'HolidayPresent': '',
      // //   'TotalLeaves': '',
      // //   'TotalLWP': '',
      // //   'TotalSalaryDays': '',
      // //   'LateCount': '',
      // //   'LateDays': '',
      // //   'AbsentDays': '',
      // //   'IncentiveDays': '',
      // //   'SingleOTMinute': '',
      // //   'SingleOTHours': '',
      // //   'DoubleOTMinute': '',
      // //   'DoubleOTHours': '',

      // // }
      // // tempColumns.push(row)

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
          var oldEmpDetail = $filter("findObj")($scope.page.gridOptions.data, newEmpDetail['Code'], "EmpCode")
          if (oldEmpDetail != null) {

            var totalDays, presentDays, weekoffDays, holidays, absentDays, salaryDays, holidayPresent, overtimeHours, leaveDays;

            totalDays = parseFloat(newEmpDetail['Total Days'])
            presentDays = parseFloat(newEmpDetail['Present Days'])
            weekoffDays = parseFloat(newEmpDetail['Week Off'])
            holidays = parseFloat(newEmpDetail['Holiday'])
            absentDays = parseFloat(newEmpDetail['Absent'])
            salaryDays = parseFloat(newEmpDetail['Salary Days'])
            holidayPresent = parseFloat(newEmpDetail['Holiday Overtime (Days)'])
            overtimeHours = parseFloat(newEmpDetail['Normal Overtime (Hours)'])
            leaveDays = parseFloat(newEmpDetail['Leave'])

            if (absentDays > totalDays - (presentDays + weekoffDays + holidays + leaveDays)) {
              absentDays = totalDays - (presentDays + weekoffDays + holidays + leaveDays);
              //oldEmpDetail.StatusBGClass = 'RED-500'
            }

            if (salaryDays > totalDays) {
              // salaryDays = totalDays;
              oldEmpDetail.StatusBGClass = 'RED-500'
            }

            if (presentDays > totalDays - (leaveDays + absentDays + holidays + weekoffDays)) {
              // presentDays = totalDays - (leaveDays + absentDays + holidays + weekoffDays)
              oldEmpDetail.StatusBGClass = 'RED-500'
            }

            oldEmpDetail.TotalWeekoff = weekoffDays;
            oldEmpDetail.TotalDays = totalDays;
            oldEmpDetail.TotalPresentDays = presentDays;
            oldEmpDetail.TotalHolidays = holidays;
            oldEmpDetail.HolidayPresent = holidayPresent;
            oldEmpDetail.TotalLeaves = leaveDays;
            oldEmpDetail.TotalLWP = newEmpDetail['LWP'];
            oldEmpDetail.TotalSalaryDays = salaryDays;
            //oldEmpDetail.DeductableLateCount = newEmpDetail.LateCount;
            //oldEmpDetail.DeductableLateDays = newEmpDetail.LateDays;
            oldEmpDetail.AbsentDays = absentDays;
            //oldEmpDetail.IncentiveDays = parseInt(newEmpDetail.IncentiveDays);
            // oldEmpDetail.SingleOvertimeMin = parseFloat(newEmpDetail.SingleOTMinute);
            oldEmpDetail.SingleOvertimeHours = newEmpDetail['Normal Overtime (Hours)'];
            // oldEmpDetail.DoubleOvertimeMin = parseFloat(newEmpDetail.DoubleOTMinute);
            oldEmpDetail.DoubleOvertimeHours = newEmpDetail['Holiday Overtime (Days)'];
            flag = true;

          } else {

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
      vm.showVerifyAttendance = false;
      vm.showVerifyAttendances = true;
      vm.showEmpVerifyDetail = false;

      console.log(row)
      /**For list of edit verify attendance grid setting */
      vm.showDayWise = true;
      vm.showVerifyAttendance = false
      var startDate = "",
        endDate = "";
      if ($scope.page.filterData === undefined) {
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate = moment().endOf('month').format('YYYY-MM-DD');

      } else {

        var sDate = $scope.page.filterData.Month.value + "-" + 1 + "-" + $scope.page.filterData.Year.value;
        startDate = moment(sDate).startOf('month').format('YYYY-MM-DD');
        endDate = moment(sDate).endOf('month').format('YYYY-MM-DD');
      }

      $scope.editPage.searchList = [{
        field: "EmpId",
        operand: "=",
        value: row.entity.EmpId
      }, {
        field: "AttDate",
        operand: ">=",
        value: startDate
      }, {
        field: "AttDate",
        operand: "<=",
        value: endDate
      }];
      $scope.editPage.orderByList = [{
        column: 'AttDate',
        isDesc: false
      }]
      $scope.editPage.refreshData();
    }

    function _updateRecord(row) {
      var empId = row.entity.EmpId;
      alert('_updateRecord called:' + empId)
    }

    function _deleteRecord(row) {
      var empId = row.entity.EmpId;
      // alert('_deleteRecord called:' + empId)
    }

    function _viewRecord(row) {
      console.log($scope.page)
      var empId = row.entity.EmpId;
      console.log(row)
      $scope.emp = row.entity;
      $scope.newEmp = row.entity;
      $scope.orgEnitry = row.entity;
      vm.showVerifyAttendance = false;
      vm.showVerifyAttendances = false;
      vm.showEmpVerifyDetail = true;
      // alert('_viewRecord called:' + empId)
    }

    function _openView() {
      alert('view opened')
    }

    function _closeView() {
      vm.showEmpVerifyDetail = false;
      vm.showVerifyAttendance = true;
      vm.showDayWise = false;
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
        } else {
          if ($scope.gridDataCount == $scope.page.selectedRows.length) {
            if ($scope.page.selectedRows[0].SMAllowedNegitiveVerify) {
              finalVerifyData = angular.copy($scope.page.selectedRows)
            } else {
              angular.forEach($scope.page.selectedRows, function (data, index) {
                if (data.StatusBGClass == "") {
                  finalVerifyData.push(data);
                  //  delete $scope.page.selectedRows[index];
                } else {
                  negitiveCount++;
                }

              })
              if ($scope.page.selectedRows.length == negitiveCount) {
                alert("you are not allowed to verify this attendance");
                finalVerifyData = [];
                return
              }
            }
          } else {
            angular.forEach($scope.page.selectedRows, function (data, index) {
              if (data.StatusBGClass == "") {
                finalVerifyData.push(data);
              } else {
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
        } else {

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

    function _saveVerifyData() {

      // var totalDays,
      //   presentDays, weekoffDays, holidays, absentDays,
      //   leaveDays,
      //   totalLWP,
      //   totalLateCount,
      //   deductableLateCount,
      //   deductableLateDays,
      //   salaryDays;


      // // emp.TotalDays
      // // emp.TotalPresentDays
      // // emp.TotalWeekoff
      // // emp.TotalHolidays
      // // emp.AbsentDays
      // // emp.
      // // emp.
      // // emp.TotalLateCount
      // // emp.TotalLateCount
      // // emp.DeductableLateCount
      // // TotalDeductableDays
      // // emp.DeductableLateDays

      // totalDays = parseFloat($scope.newEmp.TotalDays)
      // presentDays = parseFloat($scope.newEmp.TotalPresentDays)
      // weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      // holidays = parseFloat($scope.newEmp.TotalHolidays)
      // absentDays = parseFloat($scope.newEmp.AbsentDays)
      // leaveDays = parseFloat($scope.newEmp.TotalLWP)
      // totalLWP = parseFloat($scope.newEmp.TotalLeaves)
      // totalLateCount = parseFloat($scope.newEmp.TotalLateCount)
      // deductableLateCount = parseFloat($scope.newEmp.DeductableLateCount)
      // deductableLateDays = parseFloat($scope.newEmp.DeductableLateDays)
      // salaryDays = parseFloat($scope.newEmp.TotalDays)

      // console.log(salaryDays, deductableLateDays)

      // var currentSalaryDay;

      // if (salaryDays > absentDays) {
      //   currentSalaryDay = presentDays + weekoffDays + holidays + leaveDays;
      //   if (currentSalaryDay <= salaryDays) {
      //     salaryDays = currentSalaryDay;
      //   } else {
      //     $scope.showMsg("error", "Total salary days not max current month days")
      //     return;
      //   }

      //   //   absentDays = totalDays - (presentDays + weekoffDays + holidays + leaveDays);
      //   // if (absentDays <= totalDays) {

      //   // } else {
      //   //   $scope.showMsg("error", "Total salary days not max current month days")
      //   // }
      // } else {
      //   $scope.showMsg("error", "Absent days less than Salary days.")
      // }

      // $scope.entity.Amsid = 415
      // // $scope.entity = $scope.emp
      // $scope.entity.AMSTotalDays = $scope.newEmp.TotalDays
      // $scope.entity.AMSTotalPresentDays = $scope.emp.TotalPresentDays
      // $scope.entity.AMSTotalWeekOff = $scope.newEmp.TotalWeekoff
      // $scope.entity.AMSTotalHolidays = $scope.newEmp.TotalHolidays
      // $scope.entity.AMSTotalLeaves = $scope.emp.TotalLeaves
      // $scope.entity.AMSTotalLWP = $scope.emp.TotalLWP
      // // $scope.entity.AMSMonth = $scope.emp
      // // $scope.entity.AMSYear = $scope.emp
      // // $scope.entity.AMSTIsVarified = $scope.emp
      // // $scope.entity.AMSTVarifiedOn = $scope.emp
      // // $scope.entity.AMSTotalSalaryDays = $scope.emp
      // // $scope.entity.AMSHolidayPresent = $scope.emp
      // // $scope.entity.AMSSingleOTHours = $scope.emp
      // // $scope.entity.AMSDoubleOTHours = $scope.emp
      // // $scope.entity.AMSIncentiveDays = $scope.emp
      // // $scope.entity.AMSLateDays = $scope.emp
      // // $scope.entity.AMSSingleOTMinutes = $scope.emp
      // // $scope.entity.AMSDoubleOTMinutes = $scope.emp
      // // $scope.entity.AMSWeekOfPresent = $scope.emp
      // $scope.entity.AMSTotalLateCount = $scope.emp.TotalLateCount
      // $scope.entity.AMSDeductableLateCount = $scope.emp.DeductableLateCount
      // $scope.entity.AMSDeductableLateDays = $scope.emp.DeductableLateDays
      // $scope.entity.AMSAbsentDays = $scope.emp.AbsentDays
      // // $scope.entity.AMSSubUnitId = $scope.emp
      // // $scope.entity.AMSOverTimeMinutes = $scope.emp
      // // $scope.entity.AMSOverTimeHours = $scope.emp
      // // $scope.entity.AMSTotalWeekOffComp = $scope.emp
      // // $scope.entity.AMSHolidayComp = $scope.emp
      // $scope.entity.Org_AMSTotalDays = $scope.orgEnitry.TotalDays
      // $scope.entity.Org_AMSTotalPresentDays = $scope.orgEnitry.TotalPresentDays
      // $scope.entity.Org_AMSTotalWeekOff = $scope.orgEnitry.TotalWeekoff
      // $scope.entity.Org_AMSTotalHolidays = $scope.orgEnitry.TotalHolidays
      // $scope.entity.Org_AMSTotalLeaves = $scope.orgEnitry.TotalLeaves
      // $scope.entity.Org_AMSTotalLWP = $scope.orgEnitry.TotalLWP
      // // $scope.entity.Org_AMSMonth = $scope.orgEnitry
      // // $scope.entity.Org_AMSYear = $scope.orgEnitry
      // // $scope.entity.Org_AMSTIsVarified = $scope.orgEnitry
      // // $scope.entity.Org_AMSTVarifiedOn = $scope.orgEnitry
      // // $scope.entity.Org_AMSTotalSalaryDays = $scope.orgEnitry
      // // $scope.entity.Org_AMSHolidayPresent = $scope.orgEnitry
      // // $scope.entity.Org_AMSSingleOTHours = $scope.orgEnitry
      // // $scope.entity.Org_AMSDoubleOTHours = $scope.orgEnitry
      // // $scope.entity.Org_AMSIncentiveDays = $scope.orgEnitry
      // // $scope.entity.Org_AMSLateDays = $scope.orgEnitry
      // // $scope.entity.Org_AMSSingleOTMinutes = $scope.orgEnitry
      // // $scope.entity.Org_AMSDoubleOTMinutes = $scope.orgEnitry
      // // $scope.entity.Org_AMSWeekOfPresent = $scope.orgEnitry
      // $scope.entity.Org_AMSTotalLateCount = $scope.orgEnitry.TotalLateCount
      // $scope.entity.Org_AMSDeductableLateCount = $scope.orgEnitry.DeductableLateCount
      // $scope.entity.Org_AMSDeductableLateDays = $scope.orgEnitry.DeductableLateDays
      // $scope.entity.Org_AMSAbsentDays = $scope.orgEnitry.AbsentDays
      // // $scope.entity.Org_AMSSubUnitId = $scope.orgEnitry
      // // $scope.entity.Org_AMSOverTimeMinutes = $scope.orgEnitry
      // $scope.entity.Org_AMSOverTimeHours = 50
      // // $scope.entity.Org_AMSTotalWeekOffComp = $scope.orgEnitry
      // // $scope.entity.Org_AMSHolidayComp = $scope.orgEnitry

      // // editFormService.saveForm(446, $scope.entity, $scope.oldEntity, 'edit', $scope.page.pageinfo.tagline).then(_saveVerifySuccessResult, _saveErrorSuccessResult);

      if (!_validateViewRecord()) {
        if (isNaN($scope.newEmp.TotalPresentDays))
          $scope.newEmp.TotalPresentDays = 0
        $scope.newEmp.TotalPresentDays = $scope.newEmp.TotalPresentDays;

        if (isNaN($scope.newEmp.AbsentDays))
          $scope.newEmp.AbsentDays = 0
        $scope.newEmp.AbsentDays = $scope.newEmp.AbsentDays

        if (isNaN($scope.newEmp.TotalLeaves))
          $scope.newEmp.TotalLeaves = 0
        $scope.newEmp.TotalLeaves = $scope.newEmp.TotalLeaves;

        if (isNaN($scope.newEmp.TotalLateCount))
          $scope.newEmp.TotalLateCount = 0
        $scope.newEmp.TotalLateCount = $scope.newEmp.TotalLateCount;

        if (isNaN($scope.newEmp.TotalLWP))
          $scope.newEmp.TotalLWP = 0
        $scope.newEmp.TotalLWP = $scope.newEmp.TotalLWP;

        if (isNaN($scope.newEmp.TotalDeductableDays))
          $scope.newEmp.TotalDeductableDays = 0
        $scope.newEmp.TotalDeductableDays = $scope.newEmp.TotalDeductableDays;

        if (isNaN($scope.newEmp.CarryForwardNextMonth))
          $scope.newEmp.CarryForwardNextMonth = 0
        $scope.newEmp.CarryForwardNextMonth = $scope.newEmp.CarryForwardNextMonth;

        if (isNaN($scope.newEmp.TotalSalaryDays))
          $scope.newEmp.TotalSalaryDays = 0
        $scope.newEmp.TotalSalaryDays = $scope.newEmp.TotalSalaryDays;

        if (isNaN($scope.newEmp.TotalHolidays))
          $scope.newEmp.TotalHolidays = 0
        $scope.newEmp.TotalHolidays = $scope.newEmp.TotalHolidays;

        if (isNaN($scope.newEmp.TotalWeekoff))
          $scope.newEmp.TotalWeekoff = 0
        $scope.newEmp.TotalWeekoff = $scope.newEmp.TotalWeekoff;

        if (isNaN($scope.newEmp.DeductableLateCount))
          $scope.newEmp.DeductableLateCount = 0
        $scope.newEmp.DeductableLateCount = $scope.newEmp.DeductableLateCount;

        // if (isNaN($scope.newEmp.AMSRemark))
        //   $scope.newEmp.AMSRemark = 0
        // $scope.newEmp.AMSRemark = $scope.newEmp.AMSRemark;


        var searchLists = [];
        searchLists.push({
          field: 'Month',
          operand: '=',
          value: $scope.emp.Month
        })

        searchLists.push({
          field: 'Year',
          operand: '=',
          value: $scope.emp.Year
        })
        searchLists.push({
          field: 'EmpId',
          operand: '=',
          value: $scope.emp.EmpId
        })

        searchLists.push({
          field: 'PresentDay',
          operand: '=',
          value: $scope.newEmp.TotalPresentDays
        })
        searchLists.push({
          field: 'Absent',
          operand: '=',
          value: $scope.newEmp.AbsentDays
        })

        searchLists.push({
          field: 'Leave',
          operand: '=',
          value: $scope.newEmp.TotalLeaves
        })
        searchLists.push({
          field: 'LateDays',
          operand: '=',
          value: $scope.newEmp.TotalLateCount
        })

        searchLists.push({
          field: 'LwpDays',
          operand: '=',
          value: $scope.newEmp.TotalLWP
        })
        searchLists.push({
          field: 'DeductableDays',
          operand: '=',
          value: $scope.newEmp.TotalDeductableDays
        })

        searchLists.push({
          field: 'CarryForwardToNextMonth',
          operand: '=',
          value: $scope.newEmp.CarryForwardNextMonth
        })

        searchLists.push({
          field: 'AMSRemark',
          operand: '=',
          value: $scope.newEmp.AMSRemark
        })

        searchLists.push({
          field: 'AMSTotalSalaryDays',
          operand: '=',
          value: $scope.newEmp.TotalSalaryDays
        })

        searchLists.push({
          field: 'AMSDeductableLateCount',
          operand: '=',
          value: $scope.newEmp.DeductableLateCount
        })

        searchLists.push({
          field: 'AMSTotalWeekOff',
          operand: '=',
          value: $scope.newEmp.TotalWeekoff
        })

        searchLists.push({
          field: 'AMSTotalHolidays',
          operand: '=',
          value: $scope.newEmp.TotalHolidays
        })

        searchLists.push({
          field: 'AMSTIsVarified',
          operand: '=',
          value: 1
        })
        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, vm.updateVerifyAttendanceQueryId).then(_saveVerifySuccessResult, _saveErrorSuccessResult)
      }
    }

    function _saveVerifySuccessResult(result) {
      if (result[0][0].result == "Verify Attendance") {
        $scope.showMsg("success", "Verify attendance updated.")
        vm.showVerifyAttendance = true;
        vm.showVerifyAttendances = false;
        vm.showEmpVerifyDetail = false;
      }
      // $scope.page.refreshData();
      console.log(result)
    }

    function _saveErrorSuccessResult(error) {
      console.log(error)
    }

    function _closeVerify() {
      vm.showVerifyAttendance = true;
      vm.showVerifyAttendances = false;
      vm.showEmpVerifyDetail = false;
      vm.showApprovedEmployee = false;
      // $scope.editPage.refreshData();

      // $scope.newEmp = {}
      // $scope.emp = {}
    }

    function _presentDays() {
      var totalDays, weekoffDays, holidays, presenDays, totalDeductableDays, leaveDays, absentDays;
      totalDays = parseFloat($scope.newEmp.TotalDays)
      if (isNaN(totalDays))
        totalDays = 0;
      totalDays = totalDays

      weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      if (isNaN(weekoffDays))
        weekoffDays = 0;
      weekoffDays = weekoffDays

      holidays = parseFloat($scope.newEmp.TotalHolidays)
      if (isNaN(holidays))
        holidays = 0;
      holidays = holidays

      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      totalDeductableDays = $scope.newEmp.TotalDeductableDays;
      if (isNaN(totalDeductableDays))
        totalDeductableDays = 0;
      totalDeductableDays = totalDeductableDays

      leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      if (isNaN(leaveDays))
        leaveDays = 0;
      leaveDays = leaveDays

      absentDays = parseFloat($scope.newEmp.AbsentDays)
      if (isNaN(absentDays))
        absentDays = 0;
      absentDays = absentDays

      var salaryDays = presenDays + weekoffDays + holidays + leaveDays;

      var currentDays = totalDays - weekoffDays - holidays;
      if (currentDays >= presenDays) {
        $scope.newEmp.TotalPresentDays = presenDays;
        $scope.newEmp.AbsentDays = totalDays - salaryDays;
        $scope.newEmp.TotalSalaryDays = salaryDays - totalDeductableDays;
      } else {
        $scope.showMsg("error", "invalid present days")
        $scope.newEmp.TotalPresentDays = 0;
        // $scope.newEmp.TotalSalaryDays = 0;
      }
    }

    function _absentDays() {
      var totalDays, weekoffDays, holidays, presenDays, leaveDays, totalLWP, absentDays, totalDeductableDays;

      var totalDays = parseFloat($scope.newEmp.TotalDays)
      if (isNaN(totalDays))
        totalDays = 0;
      totalDays = totalDays

      weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      if (isNaN(weekoffDays))
        weekoffDays = 0;
      weekoffDays = weekoffDays

      holidays = parseFloat($scope.newEmp.TotalHolidays)
      if (isNaN(holidays))
        holidays = 0;
      holidays = holidays

      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      if (isNaN(leaveDays))
        leaveDays = 0;
      leaveDays = leaveDays

      absentDays = parseFloat($scope.newEmp.AbsentDays)
      if (isNaN(absentDays))
        absentDays = 0;
      absentDays = absentDays

      totalDeductableDays = $scope.newEmp.TotalDeductableDays;
      if (isNaN(totalDeductableDays))
        totalDeductableDays = 0;
      totalDeductableDays = totalDeductableDays

      var salaryDays = presenDays + weekoffDays + holidays + leaveDays;


      var currentAbsentDays = totalDays - (presenDays + weekoffDays + holidays + leaveDays);
      if (currentAbsentDays >= absentDays) {
        $scope.newEmp.AbsentDays = absentDays;
        $scope.newEmp.TotalSalaryDays = salaryDays - totalDeductableDays;
        // $scope.newEmp.TotalSalaryDays = totalDays - (absentDays - leaveDays)
      } else {
        $scope.showMsg("error", "invalid absent days")
        $scope.newEmp.AbsentDays = 0;
      }
    }

    function _leaveDays() {
      var totalDays, weekoffDays, holidays, presenDays, leaveDays, absentDays, totalDeductableDays;

      var totalDays = parseFloat($scope.newEmp.TotalDays)
      if (isNaN(totalDays))
        totalDays = 0;
      totalDays = totalDays

      weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      if (isNaN(weekoffDays))
        weekoffDays = 0;
      weekoffDays = weekoffDays

      holidays = parseFloat($scope.newEmp.TotalHolidays)
      if (isNaN(holidays))
        holidays = 0;
      holidays = holidays

      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      if (isNaN(leaveDays))
        leaveDays = 0;
      leaveDays = leaveDays

      absentDays = parseFloat($scope.newEmp.AbsentDays)
      if (isNaN(absentDays))
        absentDays = 0;
      absentDays = absentDays

      var salaryDays = presenDays + weekoffDays + holidays + leaveDays;

      totalDeductableDays = $scope.newEmp.TotalDeductableDays;
      if (isNaN(totalDeductableDays))
        totalDeductableDays = 0;
      totalDeductableDays = totalDeductableDays


      var currentLeaveDays = totalDays - (presenDays + weekoffDays + holidays);
      if (currentLeaveDays >= leaveDays) {
        $scope.newEmp.TotalLeaves = leaveDays;
        $scope.newEmp.AbsentDays = totalDays - (presenDays + weekoffDays + holidays + leaveDays)
        $scope.newEmp.TotalSalaryDays = salaryDays - totalDeductableDays

      } else {
        $scope.showMsg("error", "invalid leave days")
        $scope.newEmp.TotalLeaves = 0;
      }
    }

    function _lateDays() {
      var presenDays, lateDays, leaveDays;



      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      lateDays = parseFloat($scope.newEmp.TotalLateCount)
      if (isNaN(lateDays))
        lateDays = 0;
      lateDays = lateDays

      // var currentLateDays = lateDays
      if (presenDays <= leaveDays) {
        $scope.newEmp.TotalLateCount = leaveDays;
      } else {
        $scope.showMsg("error", "invalid late count.")
        $scope.newEmp.TotalLateCount = 0;
      }
    }

    function _lwpDays() {
      var totalDays, weekoffDays, holidays, presenDays, leaveDays, totalLWP, absentDays;

      var totalDays = parseFloat($scope.newEmp.TotalDays)
      if (isNaN(totalDays))
        totalDays = 0;
      totalDays = totalDays

      weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      if (isNaN(weekoffDays))
        weekoffDays = 0;
      weekoffDays = weekoffDays

      holidays = parseFloat($scope.newEmp.TotalHolidays)
      if (isNaN(holidays))
        holidays = 0;
      holidays = holidays

      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      if (isNaN(leaveDays))
        leaveDays = 0;
      leaveDays = leaveDays

      absentDays = parseFloat($scope.newEmp.AbsentDays)
      if (isNaN(absentDays))
        absentDays = 0;
      absentDays = absentDays

      totalLWP = parseFloat($scope.newEmp.TotalLWP)
      if (isNaN(totalLWP))
        totalLWP = 0;
      totalLWP = totalLWP

      var currentLwpDays = totalDays - (presenDays + weekoffDays + holidays + absentDays);
      if (currentLwpDays >= totalLWP) {
        $scope.newEmp.TotalLWP = totalLWP;
      } else {
        $scope.showMsg("error", "invalid lwp days")
        $scope.newEmp.TotalLWP = 0;
      }
    }

    function _deductableDays() {
      var totalDays, weekoffDays, holidays, presenDays, leaveDays, totalLWP, totalDeductableDays;

      var totalDays = parseFloat($scope.newEmp.TotalDays)
      if (isNaN(totalDays))
        totalDays = 0;
      totalDays = totalDays

      weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      if (isNaN(weekoffDays))
        weekoffDays = 0;
      weekoffDays = weekoffDays

      holidays = parseFloat($scope.newEmp.TotalHolidays)
      if (isNaN(holidays))
        holidays = 0;
      holidays = holidays

      presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      if (isNaN(presenDays))
        presenDays = 0;
      presenDays = presenDays

      leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      if (isNaN(leaveDays))
        leaveDays = 0;
      leaveDays = leaveDays

      totalDeductableDays = parseFloat($scope.newEmp.totalDeductableDays)
      if (isNaN(totalDeductableDays))
        totalDeductableDays = 0;
      totalDeductableDays = totalDeductableDays



      var currentDeductableDays = totalDays - (presenDays + weekoffDays + holidays + leaveDays);
      if (currentDeductableDays >= totalDeductableDays) {
        $scope.newEmp.TotalDeductableDays = totalDeductableDays;
      } else {
        $scope.showMsg("error", "invalid duductable days")
        $scope.newEmp.TotalDeductableDays = 0;
      }

      // _carryForwardNextMonth();
    }

    function _carryForwardNextMonth() {
      var totalDays, weekoffDays, holidays, presenDays, leaveDays, totalLWP, totalDeductableDays, carryForwardNextMonth;

      // var totalDays = parseFloat($scope.newEmp.TotalDays)
      // if (isNaN(totalDays))
      //   totalDays = 0;
      // totalDays = totalDays

      // weekoffDays = parseFloat($scope.newEmp.TotalWeekoff)
      // if (isNaN(weekoffDays))
      //   weekoffDays = 0;
      // weekoffDays = weekoffDays

      // holidays = parseFloat($scope.newEmp.TotalHolidays)
      // if (isNaN(holidays))
      //   holidays = 0;
      // holidays = holidays

      // presenDays = parseFloat($scope.newEmp.TotalPresentDays)
      // if (isNaN(presenDays))
      //   presenDays = 0;
      // presenDays = presenDays

      // leaveDays = parseFloat($scope.newEmp.TotalLeaves)
      // if (isNaN(leaveDays))
      //   leaveDays = 0;
      // leaveDays = leaveDays


      carryForwardNextMonth = parseFloat($scope.newEmp.CarryForwardNextMonth)
      if (isNaN(carryForwardNextMonth))
        carryForwardNextMonth = 0;
      carryForwardNextMonth = carryForwardNextMonth

      totalDeductableDays = parseFloat($scope.newEmp.TotalDeductableDays)
      if (isNaN(totalDeductableDays))
        totalDeductableDays = 0;
      totalDeductableDays = totalDeductableDays

      if (totalDeductableDays >= carryForwardNextMonth) {
        $scope.newEmp.CarryForwardNextMonth = carryForwardNextMonth;
        $scope.newEmp.TotalDeductableDays = totalDeductableDays - carryForwardNextMonth;
      } else {
        $scope.showMsg("error", "carry-forward should be less than deductable days")
        $scope.newEmp.CarryForwardNextMonth = 0
      }

      $scope.carrryToNextMonth = totalDays - (presenDays + weekoffDays + holidays + leaveDays);
    }


    function _approvedVerifyAttendance() {
      $scope.AMSApprovedRemark = '';
      $scope.StatusId = '';

      console.log($scope.page.selectedRows);
      $scope.selectedEmpData = $scope.page.selectedRows;
      console.log($scope.selectedEmpData)
      // console.log($scope.page.pageinfo)
      // console.log($scope.page.pageinfo.statuslist)

      // console.log($scope.editPage.pageinfo)
      // console.log($scope.editPage.pageinfo.statuslist)

      vm.showApprovedEmployee = true;
      vm.showVerifyAttendance = false;
      vm.showVerifyAttendances = false;
      vm.showEmpVerifyDetail = false;
    }

    function _approvedData() {


      if (!_validateApprovedData()) {
        console.log($scope.page.selectedRows);
        var empIds = '';

        angular.forEach($scope.page.selectedRows, function (data, index) {
          empIds += data.EmpId + ',';

        })

        empIds = empIds.substring(0, empIds.length - 1)
        console.log(empIds)
        console.log($scope.page.filterData.Month.value)
        console.log($scope.page.filterData.Year.value)
        var searchLists = [];
        searchLists.push({
          field: 'Month',
          operand: "=",
          value: $scope.page.filterData.Month.value
        })
        searchLists.push({
          field: 'Year',
          operand: "=",
          value: $scope.page.filterData.Year.value
        })
        searchLists.push({
          field: 'EmpIds',
          operand: "=",
          value: empIds
        })

        searchLists.push({
          field: 'StatusId',
          operand: "=",
          value: $scope.StatusId
        })

        searchLists.push({
          field: 'Remark',
          operand: "=",
          value: $scope.AMSApprovedRemark
        })
        console.log(searchLists)

        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, 621).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
      }


    }

    function _validateViewRecord() {
      if ($scope.newEmp.AMSRemark == undefined || $scope.newEmp.AMSRemark == null || $scope.newEmp.AMSRemark == '') {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }

    function _getCustomQuerySuccessResult(result) {
      console.log(result)
      if (result[0][0].Result == "Approved Record") {
        vm.showVerifyAttendance = true;
        vm.showApprovedEmployee = false;
        vm.showVerifyAttendances = false;
        vm.showEmpVerifyDetail = false;
        $scope.editPage.refreshData();
        $scope.showMsg("success", "Record Approved")
      }
    }

    function _getCustomQueryErrorResult(error) {
      console.log(error);
    }

    function _validateApprovedData() {
      if ($scope.StatusId == undefined || $scope.StatusId == null) {
        $scope.showMsg("error", "Please Select Status");
        return true;
      }
      if ($scope.AMSApprovedRemark == undefined || $scope.AMSApprovedRemark == null || $scope.AMSApprovedRemark == '') {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }


    function _loadController() {
      pageService.getPagData(446).then(_getPageDataSuccessResult, _getPageDataErrorResult)
    }

    function _getPageDataSuccessResult(result) {
      console.log(result)
      $scope.monthlySummaryResultData = result;
    }

    function _getPageDataErrorResult(error) {
      console.log(error)
    }
    _loadController();

  }

})();