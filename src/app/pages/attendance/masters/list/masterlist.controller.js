/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attMastersListController1', attMastersListController1);

  /** @ngInject */
  function attMastersListController1($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    vm.queryId = 528;
    $scope.saveForm = _saveForm;
    vm.oldEntity = {};
    $scope.entity = {};
    $scope.shiftDuration = _shiftDuration;
    $scope.lunchDuration = _lunchDuration;
    $scope.closeForm = _closeForm;
    $scope.resetShiftDuration = _resetShiftDuration;
    $scope.resetLunchDuration = _resetLunchDuration;


    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      gridHeight: 450,
      linkColumns: [],
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null
    }

    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = true;
    }

    function _editRecord(row) {
      $scope.showEditForm = true;

      if (row.entity.SHGroupId != undefined) {
        var ids = row.entity.SHGroupId.split(",");

        angular.forEach(ids, function (id) {
          angular.forEach($scope.groupList, function (group) {
            if (group.GMCId == id)
              group.isSelected = true;
          })
        })
      }

      console.log(row.entity)
      vm.oldEntity = angular.copy(row.entity)
      $scope.entity = row.entity;
    }

    function _shiftDuration(entity) {
      var shiftFrom = moment(entity.SMFromTime, "HH:mm:ss a")
      var shiftTo = moment(entity.SMToTime, "HH:mm:ss a")
      // var duration = shiftTo.diff(shiftFrom, 'hours')
      var duration = moment.duration(shiftTo.diff(shiftFrom))
      var hours = parseInt(duration.asHours())
      var minutes = parseInt(duration.asMinutes()) - hours * 60;
      console.log(hours + ' hour and ' + minutes + ' minutes')
      console.log(duration, hours)

      var minute = shiftTo.diff(shiftFrom, 'minutes')
      var timeDuration = minute / 60;
      var durations = moment(duration, "HH:mm:ss a")
      $scope.shiftDurations = hours + ' hour and ' + minutes + ' minutes';
      // $scope.shiftDurations = '0' + hours + ':' + minutes + ':00';

      console.log(duration, durations, minute, timeDuration)
    }

    function _resetShiftDuration(entity) {
      entity.SMFromTime = entity.SMFromTime
      entity.SMToTime = entity.SMFromTime;
    }

    function _resetLunchDuration(entity) {
      entity.SMLunchTime = entity.SMLunchTime
      entity.SMLunchToTime = entity.SMLunchTime;
    }

    function _lunchDuration(entity) {
      var lunchFrom = moment(entity.SMLunchTime, "HH:mm:ss a")
      var lunchTo = moment(entity.SMLunchToTime, "HH:mm:ss a")


      var duration = moment.duration(lunchTo.diff(lunchFrom))
      var hours = parseInt(duration.asHours())
      var minutes = parseInt(duration.asMinutes()) - hours * 60;
      var minute = lunchTo.diff(lunchFrom, 'minutes')
      var timeDuration = minute / 60;
      var durations = moment(duration, "HH:mm:ss a")
      $scope.lunchDurations = hours + ' hour and ' + minutes + ' minutes';
    }

    function _saveForm(editForm, entity) {
      console.log(entity)
      var selectedGroups = '';
      angular.forEach($scope.groupList, function (group) {
        if (group.isSelected) {
          selectedGroups += group.GMCId + ',';
          console.log(selectedGroups)
        }
      })
      if (selectedGroups.length > 0) {
        selectedGroups = selectedGroups.substring(0, selectedGroups.length - 1);
        entity.SHGroupId = selectedGroups;
      }
      editFormService.saveForm(pageId, entity, vm.oldEntity,
        entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
        .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
    }

    function _saveWizardFormSuccessResult(result) {
      $scope.page.refreshData();
      $scope.showEditForm = false;
      $scope.showMsg("success", "Record Saved Successfully");
    }
    function _saveWizardFormErrorResult(err) {

    }

    function _loadController() {
      $scope.shiftDurations = '00:00:00';
      $scope.lunchDurations = '00:00:00'


      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(getCustomQuerySuccessResult, getCustomQueryErrorResult)
    }
    function getCustomQuerySuccessResult(result) {
      $scope.groupList = result;
      console.log(result)
    }
    function getCustomQueryErrorResult(eerr) {
      console.log(eerr)

    }
    _loadController();

    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }
  }

})();