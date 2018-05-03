/**
 * @author 
 * created on 23.02.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.dailysummary')
    .controller('attDailySummaryController', attDailySummaryController);

  /** @ngInject */
  function attDailySummaryController($scope, $state, $timeout, pageService, editFormService, DJWebStoreGlobal) {

    var vm = this;
    var currentState = $state.current;

    $scope.showAdmin_Panel = false;
    $scope.showadminremark = false;
    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];
    vm.queryId = 421;
    vm.pageId = 320;
    this.applyFilter = _applyFilter;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {};
    vm.oldEntity = {};
    $scope.page = $scope.createPage();
    $scope.page.pageId = 320;
    $scope.closeForm = _closeForm;

    $scope.showGrid = true;
    $scope.showEditForm = false;
    $scope.isLateOrEarlyExempted = false;
    $scope.isOvertimeApproved = false;
    $scope.isCompOffApproved = false;
    $scope.isApprovedAttendence = false;

    $scope.saveLateEarlyExempted = _saveLateEarlyExempted;
    $scope.saveOTApproved = _saveOTApproved;
    $scope.saveCOffApproved = _saveCOffApproved;
    $scope.approvedData = _approvedData;


    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: true,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      enableAutoRefresh: true,
      showDataOnLoad: true,
      linkColumns: null,
      selectedRowButtons: [{
        text: "Approved",
        icon: '',
        onClick: _approvedAttendance,
        type: "btn-default",
        defaultButton: false
      }, {
        text: "Download",
        icon: '',
        onClick: _downloadData,
        type: "btn-default",
        defaultButton: true
      }],
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      fieldEvents: [{
        name: 'AttDate',
        onChangeEvent: _funcDateChange
      }],
      uploadRecord: _uploadRecord,
      pageResult: _pageResult,
      customColumns: [{
        text: 'Late Or Early Exempted',
        type: 'a',
        name: 'Exempted',
        click: _lateOrEarlyExepted,
        pin: true
      }, {
        text: 'Over Time',
        type: 'a',
        name: 'OverTime',
        click: _overTimeApproved,
        pin: true
      }, {
        text: 'C-Off',
        type: 'a',
        name: 'COff',
        click: _compOffApproved,
        pin: true
      }],

      //defaultEntity: { 'AttDate': moment() }
      // readonlyColumns: ['col1', 'col2']
    }

    function _downloadData() {
      console.log($scope.page)
      DJWebStoreGlobal.JSONToCSVConvertor($scope.page.gridOptions.data, 'AttendanceSheet', false, true, true);
    }

    function _approvedAttendance() {
      $scope.AttApprovedRemark = '';
      $scope.StatusId = '';
      console.log($scope.page.selectedRows);
      $scope.selectedEmpData = $scope.page.selectedRows;
      console.log($scope.selectedEmpData)

      $scope.showGrid = false;
      $scope.showEditForm = false;
      $scope.isLateOrEarlyExempted = false;
      $scope.isOvertimeApproved = false;
      $scope.isCompOffApproved = false;
      $scope.isApprovedAttendence = true;

    }

    function _lateOrEarlyExepted(row) {
      console.log(row)

      // ADSIsLateEarlyExampted,ADSIsOvertimeApproved,ADSIsCompOffApproved

      if (row.entity.ADSIsOvertimeApproved != 1 && row.entity.ADSIsCompOffApproved != 1) {
        $scope.page.isAllowEdit = true;
        $scope.isLateOrEarlyExempted = true;
        $scope.showGrid = false;
        $scope.showEditForm = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        // vm.oldEntity = row.entity;


        $scope.entity = row.entity;
        $scope.entity.IsLateOrEarlyExempted = row.entity.ADSIsLateEarlyExampted;
      } else {
        $scope.showMsg("error", "you have already applied for Overtime/C-Off")
      }





      // $scope.entity = rowEntity;
    }

    function _overTimeApproved(row) {

      // ADSIsLateEarlyExampted,ADSIsOvertimeApproved,ADSIsCompOffApproved

      if (row.entity.ADSIsLateEarlyExampted != 1 && row.entity.ADSIsCompOffApproved != 1) {
        console.log(row)
        $scope.isLateOrEarlyExempted = false;
        $scope.showGrid = false;
        $scope.showEditForm = false;
        $scope.isOvertimeApproved = true;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        $scope.entity = row.entity;
        $scope.entity.IsOverTimeApproved = row.entity.ADSIsOvertimeApproved;
        $scope.entity.OverTimeMinute = row.entity.ADSOTMinute;





        // ADSIsLateEarlyExampted,ADSIsOvertimeApproved,ADSIsCompOffApproved

      } else {
        $scope.showMsg("error", "you have already applied for Late Or Early/C-Off")
      }

      // $scope.entity = rowEntity;
    }

    function _compOffApproved(row) {
      // ADSIsLateEarlyExampted,ADSIsOvertimeApproved,ADSIsCompOffApproved
      if (row.entity.ADSIsOvertimeApproved != 1 && row.entity.ADSIsLateEarlyExampted != 1) {
        console.log(row)
        if (row.entity.ADSHolidayLocationId != 0 || row.entity.ADSLeaveID != 0) {

          $scope.entity = row.entity;
          $scope.entity.IsCompOffApproved = row.entity.ADSIsCompOffApproved;
          $scope.isLateOrEarlyExempted = false;
          $scope.showGrid = false;
          $scope.showEditForm = false;
          $scope.isOvertimeApproved = false;
          $scope.isCompOffApproved = true;
          $scope.isApprovedAttendence = false;
        } else {
          $scope.showMsg("info", "You can not apply c-off.")
        }
      } else {
        $scope.showMsg("error", "you have already applied for Overtime/Late Or Early.")
      }
    }


    function _shiftDuration(entity) {
      $scope.isResetShifAndLunch = true;
      console.log(entity);
      var shiftFrom = moment(entity.InTime, "HH:mm:ss")
      var shiftTo = moment(entity.OutTime, "HH:mm:ss")
      console.log(shiftFrom);
      console.log(shiftTo);
      // var duration = shiftTo.diff(shiftFrom, 'hours')
      var duration = moment.duration(shiftTo.diff(shiftFrom))
      console.log(duration)
      var hours = parseInt(duration.asHours())

      console.log(hours);
      var minutes = parseInt(duration.asMinutes()) - hours * 60;
      console.log(hours + ' hour and ' + minutes + ' minutes')
      console.log(duration, hours)

      var minute = shiftTo.diff(shiftFrom, 'minutes')
      var timeDuration = minute / 60;
      var durations = moment(duration, "HH:mm:ss a")
      $scope.shiftDurations = hours + ' hour and ' + minutes + ' minutes';


      // duration time for minimum hour for full day
      $scope.durationTime = moment(hours + ':' + minutes, 'HH:mm:ss a');
      console.log($scope.durationTime)
      console.log($scope.durationTime.format("HH:mm"))
      $scope.entity.SMMinimumHourForFullDay = $scope.durationTime.format("HH:mm");

      //duration time for minimum hour for half day
      var halfHour = hours / 2;
      var halfMinute = minutes / 2;
      $scope.halfDurationTime = moment(halfHour + ':' + halfMinute, 'HH:mm:ss a');
      $scope.entity.SMMinimumHourForHalfDay = $scope.halfDurationTime.format("HH:mm");
      console.log(halfHour, halfMinute)
      console.log($scope.halfDurationTime, $scope.entity.SMMinimumHourForHalfDay)




      // duration time for minimum hour for half day
      // var halfMinutes = hours / 2;
      // var halfHours = minutes / 2;
      // var durationTimeForHalfDay = moment(halfMinutes + ':' + minutes, 'HH:mm:ss a');
      // $scope.entity.SMMinimumHourForHalfDay = durationTimeForHalfDay.format("HH:mm");
      // console.log(durationTimeForHalfDay,halfMinutes,halfHours)





      console.log(duration, durations, minute, timeDuration)
    }

    function _editRecord(row) {
      console.log(row);
      // row.AttDate = moment(row.AttDate).format("DD-MM-YYYY");
      // console.log(moment(row.AttDate).format("DD-MM-YYYY"));
      $scope.entity = row.entity;

      $scope.showGrid = false;
      $scope.showEditForm = true;
      $scope.isLateOrEarlyExempted = false;
      $scope.isOvertimeApproved = false;
      $scope.isCompOffApproved = false;
      $scope.isApprovedAttendence = false;

      // showEditForm=true;

      //  $scope.entity = angular.copy(row.entity);
      // console.log($scope.entity);
      // _shiftDuration($scope.entity);
      // console.log(row);
      // $scope.showEditForm = true;
      // // $scope.entity = row.entity;
      // $scope.showAdmin_Panel = true;
    }

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.showAdmin_Panel = false;
      $scope.showGrid = false;
      $scope.isLateOrEarlyExempted = false;
      $scope.isOvertimeApproved = false;
      $scope.isCompOffApproved = false;
      $scope.isApprovedAttendence = false;
    }

    function _loadController() {
      var attendanceSheetPageId = 320;
      // $scope.page.searchList.push({
      //   field: 'AttDate',
      //   operand: '=',
      //   value: moment().format('YYYY-MM-DD')
      // })
      // // isAdmin
      // // isManager
      // // empId
      // console.log($scope.user.profile)
      pageService.getPagData(attendanceSheetPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
    }

    function _getPageDataSuccessResult(result) {
      console.log(result)
      $scope.attendanceSheetData = result;
    }

    function _getPageDataErrorResult(error) {
      console.log(error)
    }

    function _pageResult(result) {
      console.log(result)
      angular.forEach(result.pageinfo.filters, function (filter) {

        if (!$scope.user.profile.isAdmin && !$scope.user.profile.isManager) {
          if (filter.name == 'EmpId') {
            filter.value = $scope.user.profile.empId;
            filter.disabled = true;
            console.log(filter.value)
          }
        }
        console.log(filter.name)

      })
    }

    console.log($scope.page)
    $scope.clearFormCommon = _clearFormCommon;
    // $scope.closeForm = _closeForm;
    $scope.saveForm = _saveForm;

    // var fieldEvents = [];
    // fieFldEvents.push({ name: 'AttDate', onChangeEvent: _funcDateChange })
    function _funcDateChange(obj) {
      console.log(obj + 'call')
    }

    function _uploadRecord() {
      $state.go("attendance.transaction.upload");
    }

    function _validateForm(editForm) {
      return true;
    }

    function _saveForm() {
      debugger;
      $scope.entity.AttToDate = $scope.entity.AttDate;
      console.log($scope.entity);
      if (angular.equals($scope.entity, vm.oldEntity)) {
        $scope.entity.StatusId = -1;
      } else {
        $scope.entity.StatusId = 0;
      }

      editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
          $scope.entity.AttId === undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
        .then(_saveFormSuccessResult, _saveFormErrorResult);
    }


    function _saveFormSuccessResult(result) {
      console.log(result);
      $scope.showGrid = true;
      $scope.showEditForm = false;
      $scope.isLateOrEarlyExempted = false;
      $scope.isOvertimeApproved = false;
      $scope.isCompOffApproved = false;
      $scope.isApprovedAttendence = false;
      // _saveLateEarlyExempted();
      $scope.entity = {};
      $scope.page.refreshData();

    }

    function _saveFormErrorResult(error) {
      console.log(error);

    }

    function _resetFormCommon(editForm) {

    }

    function _clearFormCommon(editForm) {

    }

    function _closeForm(editForm) {
      $scope.showGrid = true;
      $scope.showEditForm = false;
      $scope.isLateOrEarlyExempted = false;
      $scope.isOvertimeApproved = false;
      $scope.isCompOffApproved = false;
      $scope.isApprovedAttendence = false;
      $scope.entity = {};
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
    // function _uploadRecord() {
    //   $state.go('organization.employees.upload')
    // }
    function _applyFilter() {
      console.log($scope.page.pageinfo.filters);
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
      console.log($scope.page.pageinfo.filters)

      $scope.page.refreshData();

    }


    function _saveLateEarlyExempted() {
      var searchLists = [];
      searchLists.push({
        field: 'EmpId',
        operand: "=",
        value: $scope.entity.ADSEmpId
      })
      searchLists.push({
        field: 'AttDate',
        operand: "=",
        value: $scope.entity.AttDate
      })
      searchLists.push({
        field: 'IsLateOrEarlyExempted',
        operand: "=",
        value: $scope.entity.IsLateOrEarlyExempted
      })
      searchLists.push({
        field: 'ODReason',
        operand: "=",
        value: $scope.entity.ODReason
      })
      searchLists.push({
        field: 'InTime',
        operand: "=",
        value: $scope.entity.InTime
      })
      searchLists.push({
        field: 'OutTime',
        operand: "=",
        value: $scope.entity.OutTime
      })
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, 622).then(_lateEarlyExemptedSuccessResult, _lateEarlyExemptedErrorResult)
    }

    function _lateEarlyExemptedSuccessResult(result) {

      if (result[0][0].Result == "Save Early Or Late Exempted") {
        console.log(result);
        $scope.showMsg("success", "Save Early Or Late Exempted.");

        console.log(result);
        $scope.showGrid = true;
        $scope.showEditForm = false;
        $scope.isLateOrEarlyExempted = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        $scope.page.refreshData();
      }
    }

    function _lateEarlyExemptedErrorResult(error) {
      console.log(error);
    }


    function _saveOTApproved() {
      console.log($scope.entity)
      var searchLists = [];
      searchLists.push({
        field: 'EmpId',
        operand: "=",
        value: $scope.entity.ADSEmpId
      })
      searchLists.push({
        field: 'AttDate',
        operand: "=",
        value: $scope.entity.AttDate
      })

      searchLists.push({
        field: 'IsOverTimeApproved',
        operand: "=",
        value: $scope.entity.IsOverTimeApproved
      })
      searchLists.push({
        field: 'OverTimeMinute',
        operand: "=",
        value: $scope.entity.OverTimeMinute
      })
      searchLists.push({
        field: 'ODReason',
        operand: "=",
        value: $scope.entity.ODReason
      })
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, 622).then(_oTApprovedSuccessResult, _oTApprovedErrorResult)
    }

    function _oTApprovedSuccessResult(result) {
      if (result[0][0].Result == "Save Overtime") {
        console.log(result);
        $scope.showMsg("success", "Save Overtime.");
        $scope.showGrid = true;
        $scope.showEditForm = false;
        $scope.isLateOrEarlyExempted = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        $scope.page.refreshData();
      }
    }

    function _oTApprovedErrorResult(error) {
      console.log(error);
    }


    function _saveCOffApproved() {
      var searchLists = [];
      searchLists.push({
        field: 'EmpId',
        operand: "=",
        value: $scope.entity.ADSEmpId
      })
      searchLists.push({
        field: 'AttDate',
        operand: "=",
        value: $scope.entity.AttDate
      })
      searchLists.push({
        field: 'IsCompOffApproved',
        operand: "=",
        value: $scope.entity.IsCompOffApproved
      })
      searchLists.push({
        field: 'ODReason',
        operand: "=",
        value: $scope.entity.ODReason
      })
      console.log(searchLists)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, 622).then(_cOffApprovedSuccessResult, _cOffApprovedErrorResult)
    }

    function _cOffApprovedSuccessResult(result) {
      if (result[0][0].Result == "Save C-Off") {
        console.log(result);
        $scope.showMsg("success", "Save C-Off.");
        $scope.showGrid = true;
        $scope.showEditForm = false;
        $scope.isLateOrEarlyExempted = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        $scope.page.refreshData();
      }
      console.log(result)
    }

    function _cOffApprovedErrorResult(error) {
      console.log(error)
    }

    function _validateApprovedData() {
      if ($scope.StatusId == undefined || $scope.StatusId == null) {
        $scope.showMsg("error", "Please Select Status");
        return true;
      }
      if ($scope.AttApprovedRemark == undefined || $scope.AttApprovedRemark == null || $scope.AttApprovedRemark == '') {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }

    function _approvedData() {
      if (!_validateApprovedData()) {
        console.log($scope.page.selectedRows);
        var AttId = '';

        angular.forEach($scope.page.selectedRows, function (data, index) {
          AttId += data.AttId + ',';
        })
        AttId = AttId.substring(0, AttId.length - 1)

        var searchLists = [];

        searchLists.push({
          field: 'AttId',
          operand: "=",
          value: AttId
        })
        searchLists.push({
          field: 'StatusId',
          operand: "=",
          value: $scope.StatusId
        })

        searchLists.push({
          field: 'AttApprovedRemark',
          operand: "=",
          value: $scope.AttApprovedRemark
        })
        console.log(searchLists)


        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, 632).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
      }
    }

    function _getCustomQuerySuccessResult(result) {
      console.log(result)
      if (result[0][0].Result == "Approved Record") {
        $scope.showGrid = true;
        $scope.showEditForm = false;
        $scope.isLateOrEarlyExempted = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        $scope.page.refreshData();
        $scope.showMsg("success", "Approved Attendance")
      } else {
        $scope.showGrid = true;
        $scope.showEditForm = false;
        $scope.isLateOrEarlyExempted = false;
        $scope.isOvertimeApproved = false;
        $scope.isCompOffApproved = false;
        $scope.isApprovedAttendence = false;
        // $scope.page.refreshData();
        $scope.showMsg("info", "Please update Exempted/OT/COff.")
      }
    }

    function _getCustomQueryErrorResult(error) {
      $scope.showMsg("error", error)
    }


    _loadController()
  }

})();