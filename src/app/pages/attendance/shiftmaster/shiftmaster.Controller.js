
/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.shiftmaster')
    .controller('shiftMasterController', shiftMasterController);

  /** @ngInject */
  function shiftMasterController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService) {

      
    var vm = this;
    // var pageId = $stateParams.pageId;
    var pageId = 128;
    
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
    $scope.isResetShifAndLunch = false;
    $scope.entity.SMCOffAllowed = 'true';

    $scope.hideNumberOfLeave = _hideNumberOfLeave;

    function _hideNumberOfLeave() {
      $scope.numberOfLV = false;
      console.log($scope.numberOfLV)
    }


    // if ($scope.isResetShifAndLunch) {
    //   $scope.resetShiftDuration = _resetShiftDuration;
    // }

    // if ($scope.isResetShifAndLunch) {
    //   $scope.resetLunchDuration = _resetLunchDuration;
    // }

    // if ($scope.isResetShifAndLunch) {
    //   $scope.shiftDuration = _shiftDuration;
    // }

    // if ($scope.isResetShifAndLunch) {  
    //   $scope.lunchDuration = _lunchDuration;
    // }


    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
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

    $scope.$watch('entity.SMFromTime', function (newVal, oldVal) {
      // debugger;
      if (newVal) {
        if (!$scope.entity.SMToTime) {
          $scope.entity.SMToTime = $scope.entity.SMFromTime
        }
        else {
          var shiftFrom = moment($scope.entity.SMFromTime, "HH:mm:ss a")
          var shiftTo = moment($scope.entity.SMToTime, "HH:mm:ss a")
          var timeDiff = shiftTo.diff(shiftFrom);
          if (timeDiff < 0) {
            $scope.entity.SMToTime = $scope.entity.SMFromTime
          }
        }
      }
    })

    $scope.$watch('entity.SMToTime', function (newVal, oldVal) {
      // debugger;
      if (newVal) {

        if ($scope.entity.SMFromTime) {
          var shiftFrom = moment($scope.entity.SMFromTime, "HH:mm:ss a")
          var shiftTo = moment($scope.entity.SMToTime, "HH:mm:ss a")

          var timeDiff = shiftTo.diff(shiftFrom);
          if (timeDiff < 0) {
            $scope.showMsg('warning', 'To time can not be less than from time.')
            $scope.entity.SMToTime = oldVal;
          }
        }
      }
    })

    //from lunch time
    $scope.$watch('entity.SMLunchTime', function (newVal, oldVal) {
      if (newVal) {
        var shiftFrom = moment($scope.entity.SMFromTime, "HH:mm:ss a")
        var shiftTo = moment($scope.entity.SMToTime, "HH:mm:ss a")
        var fromLunchTime = moment($scope.entity.SMLunchTime, "HH:mm:ss a")
        var fromDiff = fromLunchTime.diff(shiftFrom);
        var toDiff = shiftTo.diff(fromLunchTime);
        //checking whether lunch from time is greather than from shift time and less than shift to time by compairing miliseconds diff
        //
        if (toDiff > 0 && fromDiff > 0) {
          if (!$scope.entity.SMLunchToTime) {
            $scope.entity.SMLunchToTime = $scope.entity.SMLunchTime
          }
          else {
            var toLunchTime = moment($scope.entity.SMLunchToTime, "HH:mm:ss a")
            var lunchDiff = toLunchTime.diff(fromLunchTime);
            if (lunchDiff < 0) {
              $scope.entity.SMLunchToTime = $scope.entity.SMLunchTime
            }
          }
        }
        else {
          $scope.showMsg('warning', 'Lunch from time must be between shift timings.')
          $scope.entity.SMLunchTime = oldVal;
        }
      }
    })


    $scope.$watch('entity.SMLunchToTime', function (newVal, oldVal) {
      if (newVal) {
        var shiftFrom = moment($scope.entity.SMFromTime, "HH:mm:ss a")
        var shiftTo = moment($scope.entity.SMToTime, "HH:mm:ss a")
        var toLunchTime = moment($scope.entity.SMLunchToTime, "HH:mm:ss a")
        var fromDiff = toLunchTime.diff(shiftFrom);
        var toDiff = shiftTo.diff(toLunchTime);
        //checking whether lunch from time is greather than from shift time and less than shift to time by compairing miliseconds diff
        //
        if (toDiff > 0 && fromDiff > 0) {
          if (!$scope.entity.SMLunchTime) {
            //updating lunch from time if undefined or not selected
            $scope.entity.SMLunchTime = $scope.entity.SMLunchToTime
          }
          else {
            var fromLunchTime = moment($scope.entity.SMLunchTime, "HH:mm:ss a")
            var lunchDiff = toLunchTime.diff(fromLunchTime);
            if (lunchDiff < 0) {
              //checking lunch timing with miliseconds, 
              $scope.showMsg('warning', 'Lunch To time can not be less than Lunch from time.')
              $scope.entity.SMLunchToTime = oldVal;
            }
          }
        }
        else {
          $scope.showMsg('warning', 'Lunch from time must be between shift timings.')
          $scope.entity.SMLunchToTime = oldVal;
        }
      }
    })

    function _getDateDiff() {
      var shiftFrom = moment(entity.SMFromTime, "HH:mm:ss a")
      var shiftTo = moment(entity.SMToTime, "HH:mm:ss a")
      var duration = moment.duration(shiftTo.diff(shiftFrom))
      var hours = parseInt(duration.asHours())

      var timeDiff = shiftTo.diff(shiftFrom, 'hours');
      console.log(daysDiff)
      return timeDiff;
    }


    function _addRecord() {
      $scope.entity.SMCOffAllowed = true;
      $scope.entity = {};
      $scope.showEditForm = true;
      $scope.isResetShifAndLunch = true;
    }

    function _editRecord(row) {
      $scope.showEditForm = true;
      // $scope.isResetShifAndLunch = true;
      console.log(row)
      var formatMaxHour = row.entity.SMMinimumHourForHalfDay;
      var formatMinHour = row.entity.SMMinimumHourForFullDay;

      var formatMaxHourMinute = parseInt(formatMaxHour);
      var formatMinHourMinute = parseInt(formatMinHour);

      var formatMaxHourSecond = formatMaxHourMinute * 60;
      var formatMinHourSecond = formatMinHourMinute * 60;

      var parseMaxHourMinute = parseInt(formatMaxHourSecond);
      var parseMinHourMinute = parseInt(formatMinHourSecond);
      console.log(parseMaxHourMinute, parseMinHourMinute);

      var formatMinTimeHHMM = Math.floor(moment.duration(parseMaxHourMinute, 'seconds').asHours()) + ':' + moment.duration(parseMaxHourMinute, 'seconds').minutes();
      var formatMaxTimeHHMM = Math.floor(moment.duration(parseMinHourMinute, 'seconds').asHours()) + ':' + moment.duration(parseMinHourMinute, 'seconds').minutes();


      console.log(formatMinTimeHHMM, formatMaxTimeHHMM);

      row.entity.SMMinimumHourForHalfDay = formatMinTimeHHMM;
      row.entity.SMMinimumHourForFullDay = formatMaxTimeHHMM;

      var seconds = 2000; // or "2000"
      seconds = parseInt(seconds) //because moment js dont know to handle number in string format
      var format = Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' + moment.duration(seconds, 'seconds').minutes();
      console.log(format)

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
      $scope.isResetShifAndLunch = false;
    }

    function _shiftDuration(entity) {
      $scope.isResetShifAndLunch = true;

      var shiftFrom = moment(entity.SMFromTime, "HH:mm:ss a")
      var shiftTo = moment(entity.SMToTime, "HH:mm:ss a")
      // var duration = shiftTo.diff(shiftFrom, 'hours')
      var duration = moment.duration(shiftTo.diff(shiftFrom))
      console.log(duration)
      var hours = parseInt(duration.asHours())
      var minutes = parseInt(duration.asMinutes()) - hours * 60;
      console.log(hours + ' hour and ' + minutes + ' minutes')
      console.log(duration, hours)

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