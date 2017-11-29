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
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, $filter) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    var shiftWeekOffPageId = 141;
    var groupQueryId = 528;
    var weekOffSetDetailPageId = 455;
    var weekOffSetDetailTableId = 435;


    var isWeekOffEdit = false;

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
    $scope.WEFChange = _WEFChange;


    //change WET date on change of WEF
    function _WEFChange(WEFDate) {
      var date = new Date(WEFDate)
      $scope.entity.WOSWET = "31-Dec-" + date.getFullYear();
    }

    $scope.weekGridOptions = { enableCellEditOnFocus: true, enableRowSelection: false, enableHorizontalScrollbar: 0, enableVerticalScrollbar: 0, enableScrollbars: false }
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
      uploadRecord: null,
      dataResult: _dataResult
    }
    if (pageId == 455) {
      $scope.page.boxOptions.addRecord = _addRecord;
      $scope.page.boxOptions.editRecord = _editRecord;
    }

    function _dataResult(row) {
      $scope.oldData = angular.copy(row);
      console.log($scope.oldData);
    }

    function _addRecord() {
      isWeekOffEdit = false;
      $scope.entity = [];
      angular.forEach($scope.weekGridOptions.data, function (data) {
        data.SGWDFirst = -1;
        data.SGWDSecond = -1;
        data.SGWDThird = -1;
        data.SGWDFourth = -1;
        data.SGWDFifth = -1;
      })
      // $scope.weekGridOptions.data = [];
      // _loadController();
      $scope.showWeeklyOffList = true;
    }
    function _editRecord(row) {
      debugger
      isWeekOffEdit = true;
      $scope.showWeeklyOffList = true;
      var multiSelect = {
        lz: false,
        parent: {
          tableid: $scope.weekOffSetPage.pageinfo.tableid,
          pkValue: row.entity.WOSId
        },
        child: [{
          tableid: $scope.weekOffPage.pageinfo.tableid,
          linkColumn: 'SGWDWeekOffSetId',
          orderByList: []
        }]
      }
      console.log(multiSelect)
      pageService.getMultiEntity(multiSelect).then(_getMultiEntitySuccessResult, _getMultiEntityErrorResult);
    }

    function _getMultiEntitySuccessResult(result) {


      var _groupIds = result.WOSGroupId;

      var groupIds = _groupIds.split(',');
      result.WOSGroupId = [];
      for (var c = 0; c < groupIds.length; c++) {
        var selectedGroup = $filter('findObj')($scope.groups, groupIds[c], 'GMCId');
        if (selectedGroup != null) {
          result.WOSGroupId.push(selectedGroup);
        }
      }
      $scope.entity = result;
      angular.forEach(result.child, function (child) {
        $scope.weekGridOptions.data = child.rows;
      })

    }
    function _getMultiEntityErrorResult(err) {
      console.log(err)
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
      result.pageinfo.selects.SGWDFirst.splice(0, 0, { value: -2, name: "None" });
      $scope.weekGridOptions.columnDefs = [
        { name: 'name', displayName: 'Day', width: 130, enableCellEdit: false },
        {
          name: result.pageinfo.fields.SGWDFirst.name, displayName: result.pageinfo.fields.SGWDFirst.text, width: 130,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"

        },
        {
          name: result.pageinfo.fields.SGWDSecond.name, displayName: result.pageinfo.fields.SGWDSecond.text, width: 130,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"
        },
        {
          name: result.pageinfo.fields.SGWDThird.name, displayName: result.pageinfo.fields.SGWDThird.text, width: 130,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFourth.name, displayName: result.pageinfo.fields.SGWDFourth.text, width: 130,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFifth.name, displayName: result.pageinfo.fields.SGWDFifth.text, width: 130,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        }
      ];

      $scope.weekGridOptions.data = result.pageinfo.selects.SGWDWeekDayId;
      console.log($scope.weekGridOptions.data)

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
      $scope.weekOffSetPage.isAllowEdit = true;

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

    function _validateWeekOff(entity) {
      console.log(entity)
      var errorMsg = "";
      var gridErrorMsg = "";
      var newWEF = moment(entity.WOSWEF);
      var newWET = moment(entity.WOSWET);
      if (entity.WOSName == undefined || entity.WOSName == "") {
        $scope.showMsg("error", "Please enter Set Name");
        return false;
      }
      // alert(entity.WOSGroupId)
      if (entity.WOSGroupId != undefined) {
        if (entity.WOSGroupId.length == 0) {
          $scope.showMsg("error", "Please select atleast one group");
          return false;
        }
      } else {
        $scope.showMsg("error", "Please select atleast one group");
        return false;
      }
      if (entity.WOSWEF == undefined || entity.WOSWEF == "") {
        $scope.showMsg("error", "Please select With Effect From");
        return false;
      }
      if (entity.WOSWET == undefined || entity.WOSWET == "") {
        $scope.showMsg("error", "Please select With Effect To");
        return false;
      }
      if ($scope.weekGridOptions.data.length > 0) {
        for (var i = 0; i < $scope.weekGridOptions.data.length; i++) {
          var row = $scope.weekGridOptions.data[i];
          if ((row.SGWDFirst != -1 && row.SGWDFirst != -2) || (row.SGWDSecond != -1 && row.SGWDSecond != -2) || (row.SGWDThird != -1 && row.SGWDThird != -2) || (row.SGWDFourth != -1 && row.SGWDFourth != -2) || (row.SGWDFifth != -1 && row.SGWDFifth != -2)) {
            gridErrorMsg = "";
            break;
          }
          else {
            gridErrorMsg = "Please select atleast one weekoff from grid";
          }
        }
      }
      if (gridErrorMsg != "") {
        $scope.showMsg("error", gridErrorMsg);
        return false;
      }
      if ($scope.oldData != "NoDataFound") {
        var groupExist = false;
        angular.forEach($scope.oldData, function (data) {
          var groupIds = data.WOSGroupId.split(',');
          angular.forEach(entity.WOSGroupId, function (newGroupId) {
            angular.forEach(groupIds, function (oldGroupId) {
              if (newGroupId.GMCId == oldGroupId) {
                groupExist = true;
              }
            })
          })
          if (groupExist) {
            //  var selectedGroupId = entity.WOSGroupId.GMCId;
            var oldWEF = moment(data.WOSWEF);
            var oldWET = moment(data.WOSWET);
            newWEF.isBetween(oldWEF, oldWET);
            newWET.isBetween(oldWEF, oldWET);
            if (newWEF.isBetween(oldWEF, oldWET) || moment(data.WOSWEF).format('DD/MMMM/YYYY') == moment(entity.WOSWEF).format('DD/MMMM/YYYY') || moment(data.WOSWET).format('DD/MMMM/YYYY') == moment(entity.WOSWEF).format('DD/MMMM/YYYY')) {
              errorMsg += moment(data.WOSWEF).format('DD/MMMM/YYYY') + " " + "to " + moment(data.WOSWET).format('DD/MMMM/YYYY');
            }
          }
        });

      }

      if (errorMsg != "" && !isWeekOffEdit) {
        $scope.showMsg("error", "WeekOff already present from " + errorMsg);
        return false;
      }

      if (parseInt(newWET.diff(newWEF, 'days')) < 30) {
        $scope.showMsg("error", "Atleast 1 month difference between with effect from and with effect to");
        return false;
      }
      return true;

    }

    function _weekOffSave(editForm, entity) {
      
      if (_validateWeekOff(entity)) {
        var groupIds = "";
        var groupNames = "";
        angular.forEach($scope.entity.WOSGroupId, function (group) {
          groupIds += group.GMCId + ",";
          groupNames += group.GMCName + ",";
        })
        groupIds = groupIds.substring(0, groupIds.length - 1);
        groupNames = groupNames.substring(0, groupNames.length - 1);
        var weekOffSet = {
          WOSId: $scope.entity.WOSId == undefined ? undefined : $scope.entity.WOSId,
          WOSName: $scope.entity.WOSName,
          WOSGroupId: groupIds,
          WOSGroupName: groupNames,
          WOSWEF: $scope.entity.WOSWEF,
          WOSWET: $scope.entity.WOSWET
        }
        $scope.multiEntity = {};
        $scope.multiEntity.parent = {
          newEntity: weekOffSet,
          oldEntity: {},
          action: $scope.entity.WOSId == undefined ? 'create' : 'edit',
          tableid: $scope.weekOffSetPage.pageinfo.tableid,
          pageid: $scope.weekOffSetPage.pageinfo.pageid
        }
        $scope.multiEntity.child = [];
        var child = {
          tableid: $scope.weekOffPage.pageinfo.tableid,
          pageid: $scope.weekOffPage.pageinfo.pageid,
          parentColumn: $scope.weekOffSetPage.pageinfo.idencolname,
          linkColumn: 'SGWDWeekOffSetId',
          idenColName: $scope.weekOffPage.pageinfo.idencolname,
          rows: []
        }
        for (var i = 0; i < $scope.weekGridOptions.data.length; i++) {
          var col = {
            SGWDId: $scope.weekGridOptions.data[i].SGWDId == undefined ? 0 : $scope.weekGridOptions.data[i].SGWDId,
            SGWDWeekDayId: $scope.weekGridOptions.data[i].value == undefined ? $scope.weekGridOptions.data[i].SGWDWeekDayId : $scope.weekGridOptions.data[i].value,
            SGWDFirst: $scope.weekGridOptions.data[i].SGWDFirst == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFirst,
            SGWDSecond: $scope.weekGridOptions.data[i].SGWDSecond == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDSecond,
            SGWDThird: $scope.weekGridOptions.data[i].SGWDThird == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDThird,
            SGWDFourth: $scope.weekGridOptions.data[i].SGWDFourth == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFourth,
            SGWDFifth: $scope.weekGridOptions.data[i].SGWDFifth == -2 ? -1 : $scope.weekGridOptions.data[i].SGWDFifth,
          }
          console.log($scope.weekGridOptions.data[i].SGWDFirst)
          child.rows.push(col);
        }
        console.log($scope.multiEntity)
        $scope.multiEntity.child.push(child);
        $scope.multiEntity.lz = false;
        pageService.multiSave($scope.multiEntity).then(function (result) {
          console.log(result)
          if (result == "done") {
            $scope.showMsg("success", "Record Saved Successfully");
            $scope.showWeeklyOffList = false;
            $scope.page.refreshData();
          }
        }, function (err) {
          console.log(err)
        })
      }
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