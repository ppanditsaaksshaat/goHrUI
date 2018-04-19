/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manualmonthlyatt')
    .controller('manualmonthlyattController', manualmonthlyattController);

  /** @ngInject */
  function manualmonthlyattController($scope, $state, $uibModal, $timeout, pageService, DJWebStoreGlobal, dialogModal, $filter, $q) {

    var vm = this;
    vm.pageId = 465;
    $scope.page = $scope.createPage();
    $scope.page.pageId = 465;
    vm.queryId = 580;
    $scope.getEmployeeAttendance = _getEmployeeAttendance;
    $scope.downloadAttendanceDataList = _downloadAttendanceDataList;
    var downloadAtt = false;
    $scope.weekGridOptions = { enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false, paginationPageSize: 10, onRegisterApi: _onRegisterApi }
    // $scope.weekGridOptions.onRegisterApi = _onRegisterApi;
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


    console.log($scope.page)

    function _loadController() {
      pageService.getPagData(vm.pageId).then(function (result) {
        console.log(result)
        $scope.manualAttendance = result;
        // var currentDate = moment().format("DD-MM-YYYY");
        // console.log(currentDate)
      })

    }

    $scope.dropDownForDayStatus = [];

    $scope.dropDownForDayStatus.push({ value: 'P', name: 'P' });
    $scope.dropDownForDayStatus.push({ value: 'A', name: 'A' });
    $scope.dropDownForDayStatus.push({ value: 'WO', name: 'WO' });
    $scope.dropDownForDayStatus.push({ value: 'H', name: 'H' });
    $scope.dropDownForDayStatus.push({ value: 'P/H', name: 'P/H' });
    $scope.dropDownForDayStatus.push({ value: 'N/A', name: 'N/A' });
    $scope.dropDownForDayStatus.push({ value: 'P/W', name: 'P/W' });
    $scope.dropDownForDayStatus.push({ value: 'L', name: 'L' });
    $scope.dropDownForDayStatus.push({ value: '-', name: '-' });


    function _getEmployeeAttendance() {
      console.log($scope.user.profile.empId)
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
            var searchListData = { field: 'SubUnit', operand: '=', value: $scope.entity.SubUnit }
            searchLists.push(searchListData)
            var searchListData = { field: 'Month', operand: '=', value: $scope.entity.Month }
            searchLists.push(searchListData)
            var searchListData = { field: 'Year', operand: '=', value: $scope.entity.Year }
            searchLists.push(searchListData)
            var searchListData = { field: 'EmpId', operand: '=', value: $scope.user.profile.empId }
            searchLists.push(searchListData)
            var data = {
              searchList: searchLists,
              orderByList: []
            }
            pageService.getCustomQuery(data, vm.queryId).then(_getEmployeeAttendanceResult, _getEmployeeAttendanceErrorResult)
          }
          else {
            $scope.showMsg("warning", "Please Select Year")
          }
        }
        else {
          $scope.showMsg("warning", "Please Select Month")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select SubUnit")
      }
    }

    function _getEmployeeAttendanceResult(result) {
      if (result.length > 0) {
        $scope.isLoading = false;
      }
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
      console.log(moment("2012-02", "YYYY-MM").daysInMonth())  // 29
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
      }
      else {
        $scope.showCurrentMonth = false;
      }

      $scope.weekGridOptions.columnDefs = [
        { name: 'Sno', displayName: 'Sno', width: 40, enableCellEdit: false },
        { name: 'EmpName', displayName: 'Name', width: 130, enableCellEdit: false }
      ]
      for (var c = 1; c <= totalDayInMonth; c++) {
        var col = {
          name: 'd' + c,
          displayName: c,
          width: 60,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsFunction: function (rowEntity, colDef) {
            console.log(rowEntity, colDef)
            console.log(rowEntity, colDef);
            var dropdownForSts;
            if (rowEntity[colDef.name] === 'P' || rowEntity[colDef.name] === 'A') {
              return [{ name: 'P', value: 'P' }, { name: 'A', value: 'A' }];
            }
            else if (rowEntity[colDef.name] === 'WO' || rowEntity[colDef.name] === 'P/W') {
              return [{ name: 'WO', value: 'WO' }, { name: 'P/W', value: 'P/W' }];
            }
            else if (rowEntity[colDef.name] === 'H' || rowEntity[colDef.name] === 'P/H') {
              return [{ name: 'H', value: 'H' }, { name: 'P/H', value: 'P/H' }];
            }
          },
          cellEditableCondition: _cellEditableCondition,
          cellFilter: "mapDropdown:grid.appScope.dropDownForDayStatus:'value':'name'"

        }


        $scope.weekGridOptions.columnDefs.push(col)
        if ($scope.callCurrentMonth) {
          for (var i = 0; i < result[0].length; i++) {
            var row = result[0][i];
            // console.log(row);
            if (row != undefined) {
              if (c > getDays) {
                row['d' + c] = '-';
              }
            }
          }
        }

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

          }
          else {

          }
        })
        if (flag) {
          $scope.showMsg("success", "Your file uploaded successfully")
        }
      }
    }

    /**
     * Upload Attendance List from Excel
     */
    function _uploadAttendance() {
      var dateList = [];
      var month = $scope.entity.Month;
      var year = $scope.entity.Year;
      var totalDayInMonth = moment(year + '-' + month, "YYYY-MM").daysInMonth();
      var upload = {
        fieldRow: $scope.weekGridOptions.data,
        totalDayInMonth: totalDayInMonth,
        month: month,
        year: year,
        isAllowUpdate: false,
        groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      console.log(postData)
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }

      _showConfirm('Do you want to upload ' + '?', _confirmClick, _rejectClick, undefined, data)
      // return pageForm.defer.promise

      // pageService.uploadManualAttendance(data).then(function (result) {
      //   console.log(result)
      //   if (result.successRecord == 'Record Save')
      //     $scope.showMsg("success", "Data Uploaded Successfully")
      //   console.log(result)
      // })
    }

    function _confirmClick(pageId, data, title) {
      pageService.uploadManualAttendance(data).then(function (result) {
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

      console.log($scope.resultData)

      for (var i = 0; i < $scope.resultData.length; i++) {
        $scope.dropDownForDayStatus
        var row = $scope.resultData[i];
        console.log($scope.resultData[i])
        if (row[scope.col.name] == 'N/A' || row[scope.col.name] == '-' || row[scope.col.name] == 'L') {
          return false;
        }
        else
          return true;
      }

    }

    function _editDropdownOptionsFunction(rowEntity, colDef) {
      console.log(rowEntity, colDef)
      console.log(rowEntity, colDef);
      var dropdownForSts;
      var dropdownStatus = { id: 3, value: 'Married' };
      if (rowEntity.gender === 1) {
        dropdownForSts = { id: 1, value: 'Bachelor' };
        return [dropdownForSts, dropdownStatus];
      } else {
        dropdownForSts = { id: 2, value: 'Nubile' };
        return $timeout(function () {
          return [dropdownForSts, dropdownStatus];
        }, 100);
      }
    }

    function _onRegisterApi(gridApi) {

      //for all select event

      gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
        selectedRowData = [];
        for (var rows = 0; rows < row.length; rows++) {
          var r = row[rows];
          selectedRowData.push(r.entity);
        }


        // console.log(row)
        // selectedRowData = [];
        // selectedRowData = row.entity;

        $scope.page.selectedRows = gridApi.selection.getSelectedRows();

        // $scope.grid1Api.selection.getSelectedRows().forEach(function (row) {
        //     //Do something
        // });
      });

      // for individual select event
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        // debugger;
        console.log(row)

        if (row.isSelected) {
          selectedRowData.push(row.entity);
        }
        else {
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

        }
        else {
          //DJWebStoreGlobal.ClearPageMenu();
        }
      });


    }

    _loadController();

  }

})();
