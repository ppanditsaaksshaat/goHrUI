/**
 *
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.emprosterdetail')
    .controller('emprosterdetailController', emprosterdetailController);

  /** @ngInject */
  function emprosterdetailController($scope, $state, $uibModal, $timeout, pageService, DJWebStoreGlobal, dialogModal, $filter, $q) {

    var vm = this;
    vm.pageId = 489;
    $scope.page = $scope.createPage();
    $scope.page.pageId = 489;
    vm.queryId = 633;
    $scope.getEmployeeAttendance = _getEmployeeAttendance;
    $scope.downloadAttendanceDataList = _downloadAttendanceDataList;
    var downloadAtt = false;

    $scope.weekGridOptions = $scope.getGridSetting();
    $scope.weekGridOptions.onRegisterApi = _onRegisterApi;

    // $scope.weekGridOptions = {
    //   enableCellEditOnFocus: true,
    //   enableRowSelection: false,
    //   enableHorizontalScrollbar: 0,
    //   enableVerticalScrollbar: 0,
    //   enableScrollbars: false,
    //   paginationPageSize: 10,
    //   onRegisterApi: _onRegisterApi
    // }



    vm.uploader = [];
    vm.fileResult = undefined;
    $scope.weekGridOptions.columnDefs = [];
    $scope.uploadRecord = _uploadRecord;
    $scope.uploadBulkAttendance = _uploadAttendance;
    $scope.entity = {};
    $scope.markAllPresent = _markAllPresent;
    $scope.showCurrentMonth = false;
    $scope.callCurrentMonth = false;
    $scope.gridLine = false;
    var defer = $q.defer()
    var pageForm = {};
    pageForm.defer = $q.defer();
    defer = $q.defer();
    $scope.isLoading = false;
    var selectedRowData = [];
    $scope.dropDownForDayStatus = [];


    console.log($scope.page)

    function _loadController() {
      pageService.getPagData(vm.pageId).then(function (result) {
        console.log(result)
        $scope.dropDownForDayStatus = [];
        $scope.manualAttendance = result;
        $scope.shiftId = result.pageinfo.selects.SMId;
        console.log($scope.shiftId)

        angular.forEach($scope.manualAttendance.pageinfo.selects.SMId, function (col) {
          $scope.dropDownForDayStatus.push({
            value: col.value,
            name: col.name
          })
        })
        $scope.dropDownForDayStatus.push({
          value: 'WO',
          name: 'WO'
        })
        console.log($scope.dropDownForDayStatus)
      })

    }

    // $scope.dropDownForDayStatus = [];

    console.log($scope.manualAttendance)



    function _getEmployeeAttendance() {
      $scope.weekGridOptions.data = [];
      $scope.isLoading = true;
      $scope.gridLine = false;
      console.log($scope.entity.SubUnit);
      if ($scope.entity.SubUnit !== undefined && $scope.entity.SubUnit != '') {
        if ($scope.entity.Month !== undefined && $scope.entity.Month != '') {
          if ($scope.entity.Year !== undefined && $scope.entity.Year != '') {
            $scope.showAllButton = true

            downloadAtt = true;
            var searchLists = [];
            var searchListData = {
              field: 'SubUnit',
              operand: '=',
              value: $scope.entity.SubUnit
            }
            searchLists.push(searchListData)
            var searchListData = {
              field: 'Month',
              operand: '=',
              value: $scope.entity.Month
            }
            searchLists.push(searchListData)
            var searchListData = {
              field: 'Year',
              operand: '=',
              value: $scope.entity.Year
            }
            searchLists.push(searchListData)
            var searchListData = {
              field: 'EmpId',
              operand: '=',
              value: 0
            }
            searchLists.push(searchListData)
            var searchListData = {
              field: 'DeptId',
              operand: '=',
              value: $scope.entity.DeptId
            }
            searchLists.push(searchListData)
            var data = {
              searchList: searchLists,
              orderByList: []
            }
            console.log(data)
            pageService.getCustomQuery(data, vm.queryId).then(_getEmployeeAttendanceResult, _getEmployeeAttendanceErrorResult)
          } else {
            $scope.showMsg("warning", "Please Select Year")
          }
        } else {
          $scope.showMsg("warning", "Please Select Month")
        }
      } else {
        $scope.showMsg("warning", "Please Select SubUnit")
      }
    }

    function _getEmployeeAttendanceResult(result) {
      if (result.length > 0) {
        $scope.isLoading = false;
      }

      var fromDate = moment(result[0][0].FromDate, "YYYY-MM-DD");
      var toDate = moment(result[0][0].ToDate, "YYYY-MM-DD");
      $scope.totalDay = moment.duration(toDate.diff(fromDate)).asDays();
      $scope.totalDay = $scope.totalDay + 1;


      console.log($scope.totalDay)
      console.log(fromDate, toDate)
      console.log(result[0]);
      $scope.resultData = result[0];
      $scope.attendanceDataList = [];
      $scope.gridLine = true;

      $scope.attendanceDataList = result[0];
      // $scope.weekOffPage = result;
      console.log(result[0][0].EmpId)

      var month = $scope.entity.Month;
      var year = $scope.entity.Year;
      var totalDayInMonth;
      console.log(moment("2012-02", "YYYY-MM").daysInMonth()) // 29
      totalDayInMonth = moment(year + '-' + month, "YYYY-MM").daysInMonth();

      var currentDate = new Date();
      var getCurrentMonth = currentDate.getMonth();
      var getDays = currentDate.getDate();
      console.log(getDays);
      var getCurrentMonths = getCurrentMonth + 1;
      var getCurrentYear = currentDate.getFullYear();
      console.log(getCurrentYear);
      console.log(getCurrentMonths, month);
      if ((getCurrentMonths == month) && (getCurrentYear == year)) {
        $scope.showCurrentMonth = true;
        console.log($scope.showCurrentMonth);
      } else {
        $scope.showCurrentMonth = false;
      }

      $scope.weekGridOptions.columnDefs = [{
          name: 'Sno',
          displayName: 'Sno',
          width: 40,
          enableCellEdit: false,
          pinnedLeft: true,
        },
        {
          name: 'EmpName',
          displayName: 'Name',
          width: 200,
          enableCellEdit: false,
          pinnedLeft: true,
        }
      ]
      // for (var c = 0; c <= totalDayInMonth; c++) {
      for (var c = 1; c <= $scope.totalDay; c++) {
        var date = "";
        var day = "";
        if (c != 1) {
          fromDate = moment(fromDate).add(1, 'days')
        }
        date = fromDate.format('D');
        day = fromDate.format('dddd');




        var cellTemplate = '<div class="ui-grid-cell-contents" style="font-size:10px" >{{row.entity["s"+col.name.substr(1)]}}<br/>{{ row.entity["a"+col.name.substr(1)]}}</div>'

        var col = {
          name: 'd' + date,
          displayName: date + '-(' + day + ')',
          width: 100,
          cellTemplate: cellTemplate,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          //  cellEditableCondition: _cellEditableCondition,
          editDropdownOptionsArray: $scope.dropDownForDayStatus,
          cellFilter: "mapDropdown:grid.appScope.dropDownForDayStatus:'value':'name'",
          cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
            // console.log(grid, row, col, rowRenderIndex, colRenderIndex)
            // console.log(row)
            // console.log(row.entity.d1)
            // console.log(col)
            // if (row.entity[col.field] == 1) {
            //   return 'RED-500'
            // } else if (row.entity[col.field] == 2) {
            //   return 'PINK-300'
            // }
            // console.log(row.entity[col.field])
            var shift = $filter("findObj")($scope.shiftId, row.entity[col.field], "value")
            // console.log(shift)
            if (shift != null) {
              // console.log('shift')
              return shift.StatusBGClass;
            }
          }
        }


        $scope.weekGridOptions.columnDefs.push(col)
        // if ($scope.callCurrentMonth) {
        //   for (var i = 0; i < result[0].length; i++) {
        //     var row = result[0][i];
        //     // console.log(row);
        //     if (row != undefined) {
        //       if (c > getDays) {
        //         row['d' + c] = '-';
        //       }
        //     }
        //   }
        // }

      }
      $scope.weekGridOptions.data = result[0];


      console.log($scope.weekGridOptions.data)
    }

    function _getEmployeeAttendanceErrorResult(error) {

    }

    function _downloadAttendanceDataList() {
      DJWebStoreGlobal.JSONToCSVConvertor($scope.weekGridOptions.data, 'AttendanceList', false, true, true);
    }


    function _uploadRecord() {
      $scope.deepak = 'is my name';
      var options = {
        url: "app/common/forms/browseModal/browseModal.html",
        controller: "",
        controllerAs: "",
      }
      dialogModal.open(options)
    }

    $scope.$on('uploadGridData', _upload)

    function _upload(evt, uploadGridData) {

      var flag = false;

      if ($scope.weekGridOptions.data.length > 0) {
        angular.forEach(uploadGridData.data, function (newEmpDetail) {
          var oldEmpDetail = $filter("findObj")($scope.weekGridOptions.data, newEmpDetail.EmpId, "EmpId")
          if (oldEmpDetail != null) {

            // newEmpDetail.ShiftInTime = oldEmpDetail.ShiftInTime;
            // newEmpDetail.ShifOutTime = oldEmpDetail.ShifOutTime;
            // oldEmpDetail = newEmpDetail;

            oldEmpDetail.d1 = newEmpDetail.d1;
            oldEmpDetail.d2 = newEmpDetail.d2;
            oldEmpDetail.d3 = newEmpDetail.d3;

            oldEmpDetail.d4 = newEmpDetail.d4;
            oldEmpDetail.d5 = newEmpDetail.d5;
            oldEmpDetail.d6 = newEmpDetail.d6;

            oldEmpDetail.d7 = newEmpDetail.d7;
            oldEmpDetail.d8 = newEmpDetail.d8;
            oldEmpDetail.d9 = newEmpDetail.d9;

            oldEmpDetail.d10 = newEmpDetail.d10;
            oldEmpDetail.d11 = newEmpDetail.d11;
            oldEmpDetail.d12 = newEmpDetail.d12;

            oldEmpDetail.d13 = newEmpDetail.d13;
            oldEmpDetail.d14 = newEmpDetail.d14;
            oldEmpDetail.d15 = newEmpDetail.d15;

            oldEmpDetail.d16 = newEmpDetail.d16;
            oldEmpDetail.d17 = newEmpDetail.d17;
            oldEmpDetail.d18 = newEmpDetail.d18;

            oldEmpDetail.d19 = newEmpDetail.d19;
            oldEmpDetail.d20 = newEmpDetail.d20;
            oldEmpDetail.d21 = newEmpDetail.d21;

            oldEmpDetail.d22 = newEmpDetail.d22;
            oldEmpDetail.d23 = newEmpDetail.d23;
            oldEmpDetail.d24 = newEmpDetail.d24;

            oldEmpDetail.d25 = newEmpDetail.d25;
            oldEmpDetail.d26 = newEmpDetail.d26;
            oldEmpDetail.d27 = newEmpDetail.d27;

            oldEmpDetail.d28 = newEmpDetail.d28;
            oldEmpDetail.d29 = newEmpDetail.d29;
            oldEmpDetail.d30 = newEmpDetail.d30;
            oldEmpDetail.d31 = newEmpDetail.d31;



            flag = true;

          } else {

          }
        })
        if (flag) {
          $scope.showMsg("success", "Save data successfully")
        }
      }
    }

    /**
     * Upload Attendance List from Excel
     */
    function _uploadAttendance() {
      console.log($scope.weekGridOptions.data)
      console.log($scope.weekGridOptions)
      var dateList = [];
      var month = $scope.entity.Month;
      var year = $scope.entity.Year;
      var totalDayInMonth = moment(year + '-' + month, "YYYY-MM").daysInMonth();
      var upload = {
        fieldRow: $scope.weekGridOptions.data,
        totalDayInMonth: $scope.totalDay,
        month: month,
        year: year,
        isAllowUpdate: false,
        groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      console.log(postData)
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = {
        lz: true,
        data: compressed
      }

      _showConfirm('Do you want to save ' + '?', _confirmClick, _rejectClick, undefined, data)
      // return pageForm.defer.promise

      // pageService.uploadManualAttendance(data).then(function (result) {
      //   console.log(result)
      //   if (result.successRecord == 'Record Save')
      //     $scope.showMsg("success", "Data Uploaded Successfully")
      //   console.log(result)
      // })
    }

    function _confirmClick(pageId, data, title) {
      pageService.uploadRosterDetail(data).then(function (result) {
        console.log(result)
        if (result.successRecord == 'Record Save')
          $scope.showMsg("success", "Data Save Successfully")
        console.log(result)
      })
    }

    function _rejectClick(pageId, data, title) {
      // pageForm.defer.reject({ data: data, msg: 'Cancelled' })
    }

    function _showConfirm(msg, funcConfirm, funcReject, pageId, data, title) {

      console.log(data)
      var para = {
        pageId: pageId,
        data: data,
        title: title,
        confirmClick: funcConfirm,
        rejectClick: funcReject,
        confirmMessge: msg
      }
      var modalInstance = $uibModal.open({
        template: '<div class="modal-header"><h3 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">Yes</button><button class="btn btn-warning" type="button" ng-click="cancel()">No</button></div>',
        controller: 'ModalConfirmCtrl',
        size: 'sm',
        windowClass: 'confirm-window',
        resolve: {
          param: function () {
            return para;
          }
        }
      });
    }

    /**
     * Mark All Present 
     */
    function _markAllPresent() {

      for (var row = 0; row < selectedRowData.length; row++) {
        var rowData = selectedRowData[row];
        // console.log(rowData)
        for (var col = 0; col < $scope.weekGridOptions.columnDefs.length; col++) {
          var colData = $scope.weekGridOptions.columnDefs[col];
          if (colData.name != 'EmpId' && colData.name != 'EmpName' && colData.name != 'Sno' && colData.name != 'ShifOutTime' && colData.name != 'ShiftInTime') {
            if (rowData[colData.name] == 'A') {
              rowData[colData.name] = 'P';
            }
          }
        }
      }
      // selectedRowData = [];
    }

    function _cellEditableCondition(scope) {

      return true;
      // console.log($scope.resultData)

      // for (var i = 0; i < $scope.resultData.length; i++) {
      //   $scope.dropDownForDayStatus
      //   var row = $scope.resultData[i];
      //   console.log($scope.resultData[i])
      //   if (row[scope.col.name] == 'N/A' || row[scope.col.name] == '-' || row[scope.col.name] == 'L') {
      //     return false;
      //   } else
      //     return true;
      // }

    }

    function _editDropdownOptionsFunction(rowEntity, colDef) {
      console.log(rowEntity, colDef)
      console.log(rowEntity, colDef);
      var dropdownForSts;
      var dropdownStatus = {
        id: 3,
        value: 'Married'
      };
      if (rowEntity.gender === 1) {
        dropdownForSts = {
          id: 1,
          value: 'Bachelor'
        };
        return [dropdownForSts, dropdownStatus];
      } else {
        dropdownForSts = {
          id: 2,
          value: 'Nubile'
        };
        return $timeout(function () {
          return [dropdownForSts, dropdownStatus];
        }, 100);
      }
    }


    function _onRegisterApi(gridApi) {
      console.log('on register', gridApi)
      gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
        // var changeValue;

      //  var shName = 'deepak';
      //  console.log($scope.dropDownForDayStatus)
        //find shift name from list  using


        var shift = $filter("findObj")($scope.dropDownForDayStatus, newValue, "value");
        if (shift != null) {
          rowEntity['s' + colDef.name.substr(1)] = shift.name;
        }
        console.log(colDef, newValue)
        if ($scope.changeValue) {
          if (oldValue != 'SH') {
            colDef[name] = newValue;
            return;
          }
        }
        // angular.forEach(rowEntity, function (col, name) {
        //   // console.log(col)
        //   // console.log(name)
        //   if (name != 'Sno' && name !== 'EmpId' && name != 'EmpName' && name != 'ShiftInTime' && name != 'ShifOutTime' && name != 'JdDate' && name != 'FromDate' && name != 'ToDate') {
        //     // rowEntity[name] = newValue;
        //     $scope.changeValue = true;
        //   }
        // })
        // console.log(rowEntity, colDef, newValue, oldValue)
        // console.log(newValue)
        // console.log(rowEntity.length)
        // console.log(oldValue)
        // console.log(rowEntity[newValue])
        oldValue = newValue;
        // console.log(newValue)

      })

      gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
        selectedRowData = [];
        console.log(row)
        for (var rows = 0; rows < row.length; rows++) {
          var r = row[rows];
          selectedRowData.push(r.entity);
        }
        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
      });

      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        // debugger;
        console.log(row)

        if (row.isSelected) {
          selectedRowData.push(row.entity);
        } else {
          selectedRowData.splice(row, 1);
        }


        console.log(selectedRowData)
        $scope.page.selectedRows = gridApi.selection.getSelectedRows();

        // if (row.isSelected) {
        //     //enable edit button

        //     uivm.currentSelection = uivm.gridApi.selection.getSelectedRows();
        //     ////////console.log(uivm.currentSelection)
        //     if (uivm.currentSelection.length > 0) {
        //         uivm.selectedRow = row;
        //     }
        // }

        if ($scope.page.selectedRows.length > 0) {

        } else {
          //DJWebStoreGlobal.ClearPageMenu();
        }
      });


    }

    _loadController();

  }

})();