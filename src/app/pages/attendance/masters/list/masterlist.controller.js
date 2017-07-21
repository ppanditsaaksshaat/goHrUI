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
<<<<<<< HEAD
    vm.queryId = 528;
    $scope.saveForm = _saveForm;
    vm.oldEntity = {};
    $scope.entity = {};
    $scope.shiftDuration = _shiftDuration;
    $scope.lunchDuration = _lunchDuration;
    $scope.closeForm = _closeForm;
    $scope.resetShiftDuration = _resetShiftDuration;
    $scope.resetLunchDuration = _resetLunchDuration;
=======
    var shiftWeekOffPageId = 141;
    var groupQueryId = 528;
    $scope.gridOptions = {};
    $scope.entity = {};
>>>>>>> 020998a7493971a87c5d8c9d4af64fe6d8a80763



    $scope.weekOffSave = _weekOffSave;

    $scope.showWeeklyOffList = false;
    $scope.weekClick = _weekClick;
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
    if (pageId == 290) {
      $scope.page.boxOptions.addRecord = _addRecord;
    }

    function _weekClick(id) {
      alert(id)
    }

    function _addRecord() {

      $scope.showWeeklyOffList = true;
      $scope.gridOptions.columnDefs = [
        { name: 'name', displayName: 'Name', width: '20%' },
        {
          name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%',
          cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
            { id: 1, gender: 'male' },
            { id: 2, gender: 'female' }
          ]
        },
        { name: 'company', displayName: 'Company', width: '30%' },
        {
          name: 'size', displayName: 'Clothes Size', width: '20%', editableCellTemplate: 'ui-grid/dropdownEditor',
          cellFilter: 'mapSize', editDropdownValueLabel: 'size', editDropdownRowEntityOptionsArrayPath: 'sizeOptions'
        }
      ];


<<<<<<< HEAD
    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = true;
    }
=======
    }
    vm.ucvOnChange = _ucvOnChange;
>>>>>>> 020998a7493971a87c5d8c9d4af64fe6d8a80763

    function _editRecord(row) {
      $scope.showEditForm = true;

      if (row.entity.SHGroupId != undefined) {
        var ids = row.entity.SHGroupId.split(",");

<<<<<<< HEAD
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
=======
    function _loadController() {


      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getPagData(shiftWeekOffPageId).then(_successShiftWeekOffCustomQuery, _errorShiftWeekOffCustomQuery)
      pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      pageService.getCustomQuery(data, groupQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _successShiftWeekOffCustomQuery(result) {
      console.log(result)
      result.pageinfo.selects.SGWDWeekDayId.splice(0, 1);
      result.pageinfo.selects.SGWDFirst.splice(0, 0, { id: -1, name: "--Select--" });
      $scope.weekDays = result.pageinfo.selects.SGWDWeekDayId;
      angular.forEach($scope.weekDays, function (data) {
        data.dayType = result.pageinfo.selects.SGWDFirst;
      })
      console.log($scope.weekDays)

      // alert(JSON.stringify($scope.days))

    }
    function _errorShiftWeekOffCustomQuery(err) {
      $scope.showMsg("error", err);
    }
    function _successGetPage(result) {
      console.log(result)
      $scope.page = angular.extend($scope.page, result);
      $scope.setPage(result)
      $scope.page.gridOptions = $scope.gridSetupColumns($scope.page.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _getTableData([], []);
>>>>>>> 020998a7493971a87c5d8c9d4af64fe6d8a80763
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
<<<<<<< HEAD
=======
    function _getCustomQuerySuccessResult(result) {
      $scope.groups = result;

    }
    function _getCustomQueryErrorResult(err) {

    }
    function _getTableData(searchList, orderByList) {
      $scope.isLoaded = false
      $scope.isLoading = true
      var data = {
        searchList: searchList,
        orderByList: orderByList
      }
      var tableData = pageService.getTableData(
        $scope.page.pageinfo.tableid,
        $scope.page.pageinfo.pageid,
        '', '',
        false, data);
>>>>>>> 020998a7493971a87c5d8c9d4af64fe6d8a80763

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


<<<<<<< HEAD
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
=======
    // function _addRecord() {
    //   if ($scope.page.pageinfo.pageid == 1) {

    //   }
    //   else {
    //     var param = {
    //       action: 'create',
    //       page: $scope.page,
    //       linkColumns: []
    //     };
    //     var options = {
    //       param: param
    //     }
    //     dialogModal.openFormVertical(options);
    //   }
    // }
    // function _editRecord(row) {
    //   var param = {
    //     action: 'create',
    //     page: $scope.page,
    //     entity: row.entity,
    //     linkColumns: []
    //   };
    //   var options = {
    //     param: param
    //   }
    //   dialogModal.openFormVertical(options);
    // }
>>>>>>> 020998a7493971a87c5d8c9d4af64fe6d8a80763

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

    function _weekOffSave(editForm, entity) {
      console.log(entity)
    }

    _loadController();

    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }
  }

})();