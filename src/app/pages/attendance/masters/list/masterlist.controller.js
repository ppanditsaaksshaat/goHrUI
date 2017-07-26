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
    var shiftWeekOffPageId = 141;
    var groupQueryId = 528;
    var weekOffSetDetailPageId = 455;

    // if ($scope.isResetShifAndLunch) {
    //   $scope.resetLunchDuration = _resetLunchDuration;
    // }

    // if ($scope.isResetShifAndLunch) {
    //   $scope.shiftDuration = _shiftDuration;
    // }

    // if ($scope.isResetShifAndLunch) {  
    //   $scope.lunchDuration = _lunchDuration;
    // }


    $scope.entity = {};

    $scope.weekOffSave = _weekOffSave;
    $scope.showWeeklyOffList = false;
    // $scope.weekClick = _weekClick;
    $scope.closeWeekOffAdd = _closeWeekOffAdd;

    $scope.weekGridOptions = { enableCellEditOnFocus: true }
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
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null
    }
    if (pageId == 455) {
      $scope.page.boxOptions.addRecord = _addRecord;
      $scope.page.boxOptions.editRecord = _editRecord;
    }

    function _addRecord() {
      $scope.showWeeklyOffList = true;
    }
    function _editRecord(row) {
      $scope.showWeeklyOffList = true;
      var multiSelect = {
        lz: false,
        parent: { tableid: '', pkValue: row.entity.WOSId }
      }
    }
    // vm.ucvOnChange = _ucvOnChange;


    // function _addRecord() {
    //   $scope.entity.SMCOffAllowed = true;
    //   $scope.entity = {};
    //   $scope.showEditForm = true;
    //   $scope.isResetShifAndLunch = true;

    //   var timeDiff = shiftTo.diff(shiftFrom, 'hours');
    //   console.log(daysDiff)
    //   return timeDiff;
    // }

    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getPagData(shiftWeekOffPageId).then(_successShiftWeekOffCustomQuery, _errorShiftWeekOffCustomQuery)
      pageService.getPagData(weekOffSetDetailPageId).then(_successWeekOffSetCustomQuery, _errorweekOffSetCustomQuery)
      pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      pageService.getCustomQuery(data, groupQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _successShiftWeekOffCustomQuery(result) {
      console.log(result)
      $scope.weekOffPage = result;
      result.pageinfo.selects.SGWDWeekDayId.splice(0, 1);
      // result.pageinfo.selects.SGWDFirst.splice(0, 0, { id: -1, name: "--Select--" });
      $scope.weekGridOptions.columnDefs = [
        { name: 'name', displayName: 'Day', width: 150 },
        {
          name: result.pageinfo.fields.SGWDFirst.name, displayName: result.pageinfo.fields.SGWDFirst.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"
        },
        {
          name: result.pageinfo.fields.SGWDSecond.name, displayName: result.pageinfo.fields.SGWDSecond.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"
        },
        {
          name: result.pageinfo.fields.SGWDThird.name, displayName: result.pageinfo.fields.SGWDThird.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFourth.name, displayName: result.pageinfo.fields.SGWDFourth.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFifth.name, displayName: result.pageinfo.fields.SGWDFifth.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        }
      ];
      $scope.weekGridOptions.data = result.pageinfo.selects.SGWDWeekDayId;

      // $scope.weekDays = result.pageinfo.selects.SGWDWeekDayId;
      // angular.forEach($scope.weekDays, function (data) {
      //   data.dayType = result.pageinfo.selects.SGWDFirst;
      // })
      console.log($scope.weekDays)
    }
    function _errorShiftWeekOffCustomQuery(err) {
      $scope.showMsg("error", err);
    }
    function _successWeekOffSetCustomQuery(result) {
      console.log(result)
      $scope.weekOffSetPage = result;
    }
    function _errorweekOffSetCustomQuery(err) {

    }
    function _successGetPage(result) {
      console.log(result)
      $scope.page = angular.extend($scope.page, result);
      $scope.setPage(result)
      $scope.page.gridOptions = $scope.gridSetupColumns($scope.page.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      // _getTableData([], []);
    }
    function _errorGetPage(err) {

      var minute = shiftTo.diff(shiftFrom, 'minutes')
      var timeDuration = minute / 60;
      var durations = moment(duration, "HH:mm:ss a")
      $scope.shiftDurations = hours + ' hour and ' + minutes + ' minutes';


      // duration time for minimum hour for full day
      $scope.durationTime = moment(hours + ':' + minutes, 'HH:mm:ss a');
      console.log($scope.durationTime.format("HH:mm"))
      $scope.entity.SMMinimumHourForFullDay = $scope.durationTime.format("HH:mm");



      // duration time for minimum hour for half day
      // var halfMinutes = hours / 2;
      // var halfHours = minutes / 2;
      // var durationTimeForHalfDay = moment(halfMinutes + ':' + minutes, 'HH:mm:ss a');
      // $scope.entity.SMMinimumHourForHalfDay = durationTimeForHalfDay.format("HH:mm");
      // console.log(durationTimeForHalfDay,halfMinutes,halfHours)





      console.log(duration, durations, minute, timeDuration)
    }

    function _getCustomQuerySuccessResult(result) {
      $scope.groups = result;
    }
    function _getCustomQueryErrorResult(er) {

    }
    function _resetShiftDuration(entity) {
      $scope.isResetShifAndLunch = true;

      entity.SMFromTime = entity.SMFromTime
      entity.SMToTime = entity.SMFromTime;

      // var testdurt = moment.duration("12:10").asSeconds();
      // var testdurts = moment.duration("12:10").asMinutes();
      // console.log(testdurt,testdurts)

    }

    function _resetLunchDuration(entity) {
      $scope.isResetShifAndLunch = true;

      entity.SMLunchTime = entity.SMLunchTime
      entity.SMLunchToTime = entity.SMLunchTime;
    }

    function _lunchDuration(entity) {
      $scope.isResetShifAndLunch = true;

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

      var splitValMinimumHourForHalfDay = entity.SMMinimumHourForHalfDay.split(' ');
      var spMinHour = splitValMinimumHourForHalfDay[0];

      var splitValMinimumHourForFullDay = entity.SMMinimumHourForFullDay.split(' ');
      var spMaxHour = splitValMinimumHourForFullDay[0];

      console.log(spMinHour, spMaxHour)
      var SMMinimumHourForHalfDays = moment.duration(spMinHour).asMinutes();
      var SMMinimumHourForFullDays = moment.duration(spMaxHour).asMinutes();
      console.log(SMMinimumHourForHalfDays, SMMinimumHourForFullDays)

      entity.SMMinimumHourForHalfDay = SMMinimumHourForHalfDays;
      entity.SMMinimumHourForFullDay = SMMinimumHourForFullDays;

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


    function _weekOffSave(editForm, entity) {
      console.log($scope.weekGridOptions)
      console.log($scope.weekGridOptions.data)
      var groupIds = "";
      angular.forEach($scope.entity.WOSGroupId, function (group) {
        groupIds += group.GMCId + ",";
      })
      groupIds = groupIds.substring(0, groupIds.length - 1);
      var weekOffSet = {
        WOSName: $scope.entity.WOSName,
        WOSGroupId: groupIds
      }
      $scope.multiEntity = {};
      $scope.multiEntity.parent = {
        newEntity: weekOffSet,
        oldEntity: {},
        action: 'create',
        tableid: $scope.weekOffSetPage.pageinfo.tableid,
        pageid: $scope.weekOffSetPage.pageinfo.pageid
      }
      $scope.multiEntity.child = [];
      var child = {
        tableid: $scope.weekOffPage.pageinfo.tableid,
        pageid: $scope.weekOffPage.pageinfo.pageid,
        parentColumn: $scope.weekOffSetPage.pageinfo.idencolname,
        linkColumn: 'SGWDWOSId',
        idenColName: $scope.weekOffPage.pageinfo.idencolname,
        rows: []
      }
      for (var i = 0; i < $scope.weekGridOptions.data.length; i++) {
        var col = {
          SGWDId: 0,
          SGWDWeekDayId: $scope.weekGridOptions.data[i].value == undefined ? -1 : $scope.weekGridOptions.data[i].value,
          SGWDFirst: $scope.weekGridOptions.data[i].SGWDFirst == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFirst,
          SGWDSecond: $scope.weekGridOptions.data[i].SGWDSecond == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDSecond,
          SGWDThird: $scope.weekGridOptions.data[i].SGWDThird == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDThird,
          SGWDFourth: $scope.weekGridOptions.data[i].SGWDFourth == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFourth,
          SGWDFifth: $scope.weekGridOptions.data[i].SGWDFifth == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFifth,
        }
        child.rows.push(col);
      }

      $scope.multiEntity.child.push(child);
      $scope.multiEntity.lz = false;
      pageService.multiSave($scope.multiEntity).then(function (result) {
        console.log(result)
      }, function (err) {
        console.log(err)
      })

    }

    function _closeWeekOffAdd() {
      $scope.showWeeklyOffList = false;
    }

    // function _loadController() {
    //   $scope.shiftDurations = '00:00:00';
    //   $scope.lunchDurations = '00:00:00'


    //   var data = {
    //     searchList: [],
    //     orderByList: []
    //   }
    //   pageService.getCustomQuery(data, vm.queryId).then(getCustomQuerySuccessResult, getCustomQueryErrorResult)
    // }
    // function getCustomQuerySuccessResult(result) {
    //   $scope.groupList = result;
    //   console.log(result)
    // }
    // function getCustomQueryErrorResult(eerr) {
    //   console.log(eerr)

    // }
    _loadController();
  }
})();