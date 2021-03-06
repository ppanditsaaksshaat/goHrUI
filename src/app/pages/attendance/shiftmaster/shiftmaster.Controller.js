
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
    $scope.cOffConverted = _cOffConverted;
    $scope.validityLeaveAgCOff = _validityLeaveAgCOff;
    $scope.calOnBasicOrGross = _calOnBasicOrGross;
    $scope.calAfterLeaveAndOTMargin = _calAfterLeaveAndOTMargin;

    function _hideNumberOfLeave() {
      $scope.numberOfLV = false;
      console.log($scope.numberOfLV)
    }

    $scope.minWorkForWeekOff = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6
    };


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
    console.log($scope.page)
    $scope.page.pageId = pageId;
    console.log($scope.page.pageinfo)
    console.log($scope.page)


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
      uploadRecord: null,
      pageResult: _pageResult
    }

    function _pageResult(result) {
      console.log(result)
    }


    $scope.$watch('entity.SMFromTime', function (newVal, oldVal) {
      // debugger;
      if (newVal) {
        if (!$scope.entity.SMToTime) {
          var shiftFrom = moment($scope.entity.SMFromTime, "DD-MM-YYYY HH:mm:ss a")
          $scope.entity.SMToTime = shiftFrom.add(24, 'h');
        }
        else {
          var shiftFrom = moment($scope.entity.SMFromTime, "DD-MM-YYYY HH:mm:ss a")
          var shiftTo = moment($scope.entity.SMToTime, "DD-MM-YYYY HH:mm:ss a")
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
          var shiftFrom = moment($scope.entity.SMFromTime, "DD-MM-YYYY HH:mm:ss a")
          var shiftTo = moment($scope.entity.SMToTime, "DD-MM-YYYY HH:mm:ss a")

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

        // var shFrmTime = moment($scope.entity.SMFromTime,'HH:mm:ss');


        var shiftFrom = moment($scope.entity.SMFromTime, "DD-MM-YYYY HH:mm:ss a")
        var shiftTo = moment($scope.entity.SMToTime, "DD-MM-YYYY HH:mm:ss a")
        var fromLunchTime = moment($scope.entity.SMLunchTime, "DD-MM-YYYY HH:mm:ss a")
        var fromDiff = fromLunchTime.diff(shiftFrom);
        var toDiff = shiftTo.diff(fromLunchTime);
        //checking whether lunch from time is greather than from shift time and less than shift to time by compairing miliseconds diff
        //
        // if (toDiff > 0 && fromDiff > 0) {
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
        // }
        // else {
        //   $scope.showMsg('warning', 'Lunch from time must be between shift timings.')
        //   $scope.entity.SMLunchTime = oldVal;
        // }
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

      if ($scope.entity.SMIsCompOffLeave) {
        $scope.entity.compOffCash = "2";
      }
      else if ($scope.entity.SMIsCompOffCash) {
        $scope.entity.compOffCash = "1";
      }

      if ($scope.entity.SMCompOffLeaveValidAsInDays) {
        $scope.entity.cOffInDaySameMonth = "2";
      }
      else if ($scope.entity.SMCompOffLeaveValidAsEndOfSameMonth) {
        $scope.entity.cOffInDaySameMonth = "1";
      }

      if ($scope.entity.SMIsOTCalculatedOnGrossSalary) {
        $scope.entity.basicOrGross = "2";
      }
      else if ($scope.entity.SMIsOTCalculatedOnBasicSalary) {
        $scope.entity.basicOrGross = "1";
      }

      if ($scope.entity.SMIsAllowOverTimeMargin) {
        $scope.entity.allowOverTimeMargin = "2";
      }
      else if ($scope.entity.SMIsCalulatedAfterLeaveDuration) {
        $scope.entity.allowOverTimeMargin = "1";
      }
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

      if (hours < 0) {
        //handling minus time for less than time
        hours = hours + 24;
      }

      if (minutes < 0) {
        minutes = minutes + 60;
      }

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

    // function _saveForm(editForm, entity) {

    //   if (!_validateShiftForm()) {
    //     var splitValMinimumHourForHalfDay = entity.SMMinimumHourForHalfDay.split(' ');
    //     var spMinHour = splitValMinimumHourForHalfDay[0];

    //     var splitValMinimumHourForFullDay = entity.SMMinimumHourForFullDay.split(' ');
    //     var spMaxHour = splitValMinimumHourForFullDay[0];

    //     console.log(spMinHour, spMaxHour)
    //     var SMMinimumHourForHalfDays = moment.duration(spMinHour).asMinutes();
    //     var SMMinimumHourForFullDays = moment.duration(spMaxHour).asMinutes();
    //     console.log(SMMinimumHourForHalfDays, SMMinimumHourForFullDays)

    //     entity.SMMinimumHourForHalfDay = SMMinimumHourForHalfDays;
    //     entity.SMMinimumHourForFullDay = SMMinimumHourForFullDays;
    //     console.log(entity.SMMinimumHourForHalfDay, entity.SMMinimumHourForFullDay)



    //     console.log($scope.groupList)
    //     var selectedGroups = '';
    //     angular.forEach($scope.groupList, function (group) {
    //       if (group.isSelected) {
    //         selectedGroups += group.GMCId + ',';
    //         console.log(selectedGroups)
    //       }
    //     })

    //     if (selectedGroups.length > 0) {
    //       selectedGroups = selectedGroups.substring(0, selectedGroups.length - 1);
    //       entity.SHGroupId = selectedGroups;
    //     }
    //     (entity.SHGroupId, selectedGroups)
    //     var pkId = 0;
    //     var searchLists = [];
    //     var queryId = 553;
    //     searchLists.push({ field: 'SMId', operand: '!=', value: pkId })
    //     searchLists.push({ field: 'SHGroupId', operand: 'IN', value: entity.SHGroupId })
    //     var data = {
    //       searchList: searchLists,
    //       orderByList: []
    //     }
    //     console.log(searchLists)
    //     var groupName = "";
    //     var isNotDuplicateGroupId = true;
    //     pageService.getCustomQuery(data, queryId).then(function (result) {
    //       if ($scope.page.action != 'edit') {
    //         angular.forEach($scope.groupList, function (group) {
    //           angular.forEach(result, function (groupId) {
    //             if (groupId.SHGroupId == group.GMCId) {
    //               groupName += group.GMCName + ',';
    //               isNotDuplicateGroupId = false;
    //             }
    //             console.log($scope.groupList)
    //           })
    //           console.log('duplicate record exist' + groupName)
    //         })
    //       }
    //       if (isNotDuplicateGroupId == false) {
    //         $scope.showMsg("warning", "duplicate record  " + groupName);
    //       }
    //       if (isNotDuplicateGroupId) {
    //         console.log(entity)
    //         editFormService.saveForm(pageId, entity, vm.oldEntity,
    //           entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
    //           .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
    //       }
    //     })

    //     //   console.log(entity)
    //     //   editFormService.saveForm(pageId, entity, vm.oldEntity,
    //     //     entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
    //     //     .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
    //   }
    // }

    function _saveForm() {
      if (_validateShiftForm()) {
        var newEntity = {};


        var splitValMinimumHourForHalfDay = $scope.entity.SMMinimumHourForHalfDay.split(' ');
        var spMinHour = splitValMinimumHourForHalfDay[0];

        var splitValMinimumHourForFullDay = $scope.entity.SMMinimumHourForFullDay.split(' ');
        var spMaxHour = splitValMinimumHourForFullDay[0];

        console.log(spMinHour, spMaxHour)
        var SMMinimumHourForHalfDays = moment.duration(spMinHour).asMinutes();
        var SMMinimumHourForFullDays = moment.duration(spMaxHour).asMinutes();
        console.log(SMMinimumHourForHalfDays, SMMinimumHourForFullDays)

        $scope.entity.SMMinimumHourForHalfDay = SMMinimumHourForHalfDays;
        $scope.entity.SMMinimumHourForFullDay = SMMinimumHourForFullDays;
        console.log($scope.entity.SMMinimumHourForHalfDay, $scope.entity.SMMinimumHourForFullDay)



        console.log($scope.groupList)
        var selectedGroups = '';
        angular.forEach($scope.groupList, function (group) {
          if (group.isSelected) {
            selectedGroups += group.GMCId + ',';
            console.log(selectedGroups)
          }
        })

        if (selectedGroups.length > 0) {
          selectedGroups = selectedGroups.substring(0, selectedGroups.length - 1);
          $scope.entity.SHGroupId = selectedGroups;
        }
        ($scope.entity.SHGroupId, selectedGroups)
        var pkId = 0;
        var searchLists = [];
        var queryId = 553;
        searchLists.push({ field: 'SMId', operand: '!=', value: pkId })
        searchLists.push({ field: 'SHGroupId', operand: 'IN', value: $scope.entity.SHGroupId })
        var data = {
          searchList: searchLists,
          orderByList: []
        }
        console.log(searchLists)
        var groupName = "";
        var isNotDuplicateGroupId = true;
        newEntity = angular.copy($scope.entity);
        if ($scope.page.action != 'edit') {
          pageService.getCustomQuery(data, queryId).then(function (result) {
            console.log(result)

            // if (result != 'NoDataFound') {
            //   angular.forEach($scope.groupList, function (group) {
            //     angular.forEach(result, function (groupId) {
            //       if (groupId.SHGroupId == group.GMCId) {
            //         groupName += group.GMCName + ',';
            //         isNotDuplicateGroupId = false;
            //       }
            //       console.log($scope.groupList)
            //     })
            //     console.log('duplicate record exist' + groupName)
            //   })
            // }
            // else {
            console.log($scope.entity)
            editFormService.saveForm(pageId, newEntity, vm.oldEntity,
              $scope.entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
              .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
            // }
            if (isNotDuplicateGroupId == false) {
              $scope.showMsg("warning", "duplicate record  " + groupName);
              $scope.entity.SMMinimumHourForHalfDay = $scope.halfDurationTime.format("HH:mm");
              $scope.entity.SMMinimumHourForFullDay = $scope.durationTime.format("HH:mm");
            }
            if (isNotDuplicateGroupId) {
            }
          })
        }
        else {
          editFormService.saveForm(pageId, $scope.entity, vm.oldEntity,
            $scope.entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
            .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
        }
      }
    }


    // function _successDuplicateGroup(result, editForm, entity) {
    //   if (!_validateShiftForm()) {
    //     var splitValMinimumHourForHalfDay = entity.SMMinimumHourForHalfDay.split(' ');
    //     var spMinHour = splitValMinimumHourForHalfDay[0];

    //     var splitValMinimumHourForFullDay = entity.SMMinimumHourForFullDay.split(' ');
    //     var spMaxHour = splitValMinimumHourForFullDay[0];

    //     console.log(spMinHour, spMaxHour)
    //     var SMMinimumHourForHalfDays = moment.duration(spMinHour).asMinutes();
    //     var SMMinimumHourForFullDays = moment.duration(spMaxHour).asMinutes();
    //     console.log(SMMinimumHourForHalfDays, SMMinimumHourForFullDays)

    //     entity.SMMinimumHourForHalfDay = SMMinimumHourForHalfDays;
    //     entity.SMMinimumHourForFullDay = SMMinimumHourForFullDays;
    //     console.log(entity.SMMinimumHourForHalfDay, entity.SMMinimumHourForFullDay)



    //     console.log($scope.groupList)
    //     var selectedGroups = '';
    //     angular.forEach($scope.groupList, function (group) {
    //       if (group.isSelected) {
    //         selectedGroups += group.GMCId + ',';
    //         console.log(selectedGroups)
    //       }
    //     })

    //     if (selectedGroups.length > 0) {
    //       selectedGroups = selectedGroups.substring(0, selectedGroups.length - 1);
    //       entity.SHGroupId = selectedGroups;
    //     }
    //     (entity.SHGroupId, selectedGroups)
    //     var pkId = 0;
    //     var searchLists = [];
    //     var queryId = 553;
    //     searchLists.push({ field: 'SMId', operand: '!=', value: pkId })
    //     searchLists.push({ field: 'SHGroupId', operand: 'IN', value: entity.SHGroupId })
    //     var data = {
    //       searchList: searchLists,
    //       orderByList: []
    //     }
    //     console.log(searchLists)
    //     var groupName = "";
    //     var isNotDuplicateGroupId = true;
    //     if ($scope.page.action != 'edit') {
    //       angular.forEach($scope.groupList, function (group) {
    //         angular.forEach(result, function (groupId) {
    //           if (groupId.SHGroupId == group.GMCId) {
    //             groupName += group.GMCName + ',';
    //             isNotDuplicateGroupId = false;
    //           }
    //           console.log($scope.groupList)
    //         })
    //         console.log('duplicate record exist' + groupName)
    //       })
    //     }
    //     if (isNotDuplicateGroupId == false) {
    //       $scope.showMsg("warning", "duplicate record  " + groupName);
    //     }
    //     if (isNotDuplicateGroupId) {
    //       console.log(entity)
    //       editFormService.saveForm(pageId, entity, vm.oldEntity,
    //         entity.SMId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
    //         .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
    //     }
    //   }
    // }

    // function _errorDuplicateGroup(result) {

    // }

    function _validateShiftForm() {
      if ($scope.entity.SMMinimumHourForHalfDay == undefined || $scope.entity.SMMinimumHourForHalfDay == null || $scope.entity.SMMinimumHourForHalfDay == '') {
        $scope.showMsg("error", "Please Enter Minimum Hour For Half Day");
        return false;
      }
      if ($scope.entity.SMMinimumHourForFullDay == undefined || $scope.entity.SMMinimumHourForFullDay == null || $scope.entity.SMMinimumHourForFullDay == '') {
        $scope.showMsg("error", "Please Enter Maximum Hour For Half Day");
        return false;
      }

      return true;
    }

    function _saveWizardFormSuccessResult(result) {
      console.log(result)
      $scope.page.refreshData();
      $scope.showEditForm = false;
      $scope.showMsg("success", "Record Saved Successfully");
      $scope.shiftDurations = '00:00:00';
      $scope.lunchDurations = '00:00:00';
    }
    function _saveWizardFormErrorResult(err) {

    }

    function _loadController() {
      $scope.shiftDurations = '00:00:00';
      $scope.lunchDurations = '00:00:00';


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

    function _cOffConverted(compOffCash) {
      if (compOffCash == "1") {
        $scope.entity.SMIsCompOffCash = true;
        $scope.entity.SMIsCompOffLeave = false;
        $scope.entity.cOffInDaySameMonth = false;
        entity.SMNumberOfLeaveForCompOffLeave = 0
      }
      else if (compOffCash == "2") {
        $scope.entity.SMIsCompOffCash = false;
        $scope.entity.SMIsCompOffLeave = true;
        $scope.entity.cOffInDaySameMonth = false;
        $scope.entity.SMNumberOfLeaveForCompOffLeave = 0;
      }
    }

    function _validityLeaveAgCOff(cOffInDaySameMonth) {
      if (cOffInDaySameMonth == "1") {
        $scope.entity.SMCompOffLeaveValidAsEndOfSameMonth = true;
        $scope.entity.SMCompOffLeaveValidAsInDays = false;
        $scope.entity.SMNumberOfLeaveForCompOffLeave = 0
      }
      else if (cOffInDaySameMonth == "2") {
        $scope.entity.SMCompOffLeaveValidAsEndOfSameMonth = false;
        $scope.entity.SMCompOffLeaveValidAsInDays = true;
      }
    }

    function _calOnBasicOrGross(basicOrGross) {
      if (basicOrGross == 1) {
        $scope.entity.SMIsOTCalculatedOnBasicSalary = true;
        $scope.entity.SMIsOTCalculatedOnGrossSalary = false;
      }
      else if (basicOrGross == 2) {
        $scope.entity.SMIsOTCalculatedOnBasicSalary = false;
        $scope.entity.SMIsOTCalculatedOnGrossSalary = true;
      }
    }

    function _calAfterLeaveAndOTMargin(allowOverTimeMargin) {
      if ($scope.entity.allowOverTimeMargin == "1") {
        $scope.entity.SMIsCalulatedAfterLeaveDuration = true;
        $scope.entity.SMIsAllowOverTimeMargin = false;
        $scope.entity.SHApplicableOverTimeAfterMinute = 0;
      }
      else if ($scope.entity.allowOverTimeMargin == "2") {
        $scope.entity.SMIsCalulatedAfterLeaveDuration = false;
        $scope.entity.SMIsAllowOverTimeMargin = true;
      }
    }
  }

})();