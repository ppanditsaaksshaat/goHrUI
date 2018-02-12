/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.manual')
    .controller('attTransManualController', attTransManualController);

  /** @ngInject */
  function attTransManualController($scope, $state, $timeout, pageService, editFormService) {

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
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      fieldEvents: [{ name: 'AttDate', onChangeEvent: _funcDateChange }],
      uploadRecord: _uploadRecord,
      pageResult: _pageResult,
      defaultEntity: { 'AttDate': moment() }
      // readonlyColumns: ['col1', 'col2']
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


      // if (($scope.user.isAdmin) || ($scope.user.isManager))
      // {
      //   $scope.showadminremark = true;
      // }

      console.log(row);
      row.AttDate = moment(row.AttDate).format("DD-MM-YYYY");
      console.log(moment(row.AttDate).format("DD-MM-YYYY"));
      $scope.entity = row.entity;

    //  $scope.entity = angular.copy(row.entity);
      console.log( $scope.entity);
     _shiftDuration($scope.entity);
      console.log(row);
      $scope.showEditForm = true;
      // $scope.entity = row.entity;
      $scope.showAdmin_Panel = true;
    }

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.showAdmin_Panel = false;
    }

    function _loadController() {
      $scope.page.searchList.push({
        field: 'AttDate', operand: '=', value: moment().format('YYYY-MM-DD')
      })

      // isAdmin
      // isManager

      // empId

      console.log($scope.user.profile)

    }

    function _pageResult(result) {
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
      alert('ss');
      $scope.entity.AttToDate = $scope.entity.AttDate;
      alert($scope.entity.AttId);
      console.log($scope.entity);
      editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
        $scope.entity.AttId === undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
        .then(_saveFormSuccessResult, _saveFormErrorResult);
    }

    function _saveFormSuccessResult(result) {

      alert('save');
      console.log(result);
      $scope.showEditForm = false;
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

      $scope.showEditForm = false;
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

    _loadController()
  }

})();
