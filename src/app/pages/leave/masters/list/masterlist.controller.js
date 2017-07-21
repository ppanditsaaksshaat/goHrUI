/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters')
    .controller('LeaveMastersListController1', LeaveMastersListController1);

  /** @ngInject */
  function LeaveMastersListController1($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = $stateParams.pageId;
    vm.queryId = 528;
    var groupIds = [];
    var tempName = $stateParams.name;
    var currentState = $state.current;
    vm.oldEntity = {};
    $scope.entity = {};

    $scope.saveForm = _saveForm;
    $scope.getTotalTenure = _getTotalTenure;
    $scope.selectGroup = _selectGroup;
    $scope.daysDiff = _daysDiff;
    $scope.groupOnChange = _groupOnChange;


    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.closeForm = _closeForm;
    console.log($scope.page)

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

    if ($scope.page.pageId == 445) {
      $scope.page.boxOptions.addRecord = _addRecord;
      $scope.page.boxOptions.editRecord = _editRecord;
    }

    // $scope.page.boxOptions.customColumns.push({
    //   text: 'Approve', click: _rowApprove, type: 'a', pin: true, name: 'approve', width: 80
    // });

    function _groupOnChange(Value, isSelected) {
      console.log(Value)
      if (Value == 0) {
        if (isSelected) {
          angular.forEach($scope.groupList, function (data) {
            data.isSelected = true;
          })


        }
        else {
          angular.forEach($scope.groupList, function (data) {
            data.isSelected = false;
          })

        }

      }

    }

    function _daysDiff() {
      $scope.entity.LRCWEFDate;
      $scope.entity.LRCToDate;
      // console.log($scope.entity.LRCWEFDate)
      // console.log($scope.entity.LRCToDate)
      if ($scope.entity.LRCWEFDate != undefined && $scope.entity.LRCToDate != undefined) {
        var wefDate = moment($scope.entity.LRCWEFDate);
        var toDate = moment($scope.entity.LRCToDate);
        var diff = toDate.diff(wefDate, "days") + 1
        $scope.entity.calculateDays = diff;
        

        console.log(diff)
      }


    }
    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getCustomQuery(data, vm.queryId).then(getCustomQuerySuccessResult, getCustomQueryErrorResult)
    }
    function getCustomQuerySuccessResult(result) {
      $scope.groupList = result;
      $scope.groupList.splice(0, 0, { 'GMCId': 0, 'GMCName': 'All' })

    }
    function getCustomQueryErrorResult(eerr) {

    }

    function _rowApprove(row) {

      console.log(row)
    }
    $scope.$watch(function () {
      return $scope.yearRange

    }, function (newVal, oldVal) {
      if ($scope.yearRange) {
        if ($scope.yearRange == 'calc') {
          // if ($scope.entity.LCROnCalendarYear !== undefined) {
          //   $scope.entity.LCROnCalendarYear = true;
          // }
          // if ($scope.entity.LCROnFinanceYear !== undefined) {
          //   $scope.entity.LCROnFinanceYear = true;
          // }
          // if ($scope.entity.LCRIsDayWise !== undefined) {
          //   $scope.entity.LCRIsDayWise = true;
          // }

          $scope.entity.LCROnCalendarYear = true;
          $scope.entity.LCROnFinanceYear = false;
          $scope.entity.LCRIsDayWise = false;
        } else if ($scope.yearRange == 'fiscal') {
          $scope.entity.LCROnCalendarYear = false;
          $scope.entity.LCROnFinanceYear = true;
          $scope.entity.LCRIsDayWise = false;
        } else if ($scope.yearRange == 'days') {
          $scope.entity.LCROnCalendarYear = false;
          $scope.entity.LCROnFinanceYear = false;
          $scope.entity.LCRIsDayWise = true;
        }
      }

    })

    // $scope.$watch(function () {
    //   return $scope.absentPresentDays

    // }, function (newVal, oldVal) {
    //   if ($scope.absentPresentDays) {
    //     if ($scope.absentPresentDays == 'presentD') {
    //       $scope.entity.LTRIsPresentDays = true;
    //       $scope.entity.LCRIsTreatAsAbsent = false;

    //     }
    //     else if ($scope.absentPresentDays == 'absentD') {
    //       $scope.entity.LTRIsPresentDays = false;
    //       $scope.entity.LCRIsTreatAsAbsent = true;
    //     }
    //   }
    // })


    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = true;
        angular.forEach($scope.groupList, function (group) {
          group.isSelected = false;
        })
    }
    function _editRecord(row) {
      $scope.showEditForm = true;
      $scope.page.isAllowEdit = true;
      if (row.entity.LRCGroupIds != undefined) {
        var ids = row.entity.LRCGroupIds.split(",");

        angular.forEach(ids, function (id) {
          angular.forEach($scope.groupList, function (group) {
            if (group.GMCId == id)
              group.isSelected = true;
          })
        })
      }
      if (row.entity.LRCCarryFwdMonthly == true || row.entity.LRCCarryFwdYearly == true || row.entity.LRCMaxCarryDays != undefined) {
        $scope.allowCarryForward = true;
      }
      else {
        $scope.allowCarryForward = false;
      }

      vm.oldEntity = angular.copy(row.entity)
      $scope.entity = row.entity;
    }

    // function _validateForm(form) {
    //   if (angular.equals($scope.oldEntity, $scope.entity)) {
    //     _showToast('info', 'Nothing to save', '');
    //     return false;
    //   }

    //   return true;
    // }

    function _validateForm(editForm) {

      var valid = editFormService.validateForm(editForm)
      return valid;

    }

    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }

    function _saveForm(editForm) {
      if (_validateForm(editForm)) {

        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLeaveApp, _errorLeaveApp);


        // console.log($scope.page.pageinfo.pageid, )
        // console.log($scope.entity)
        // console.log($scope.oldEntity, )
        // console.log($scope.page.action)
        // console.log($scope.page.pageinfo.tagline)
        // $scope.showEditForm = false;
      }
    }

    function _successLeaveApp(result) {
      console.log(result)
      if (result.success_message == 'Added New Record.') {
        $scope.showEditForm = false;
        // editForm.$setPristine();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showEditForm = false;
      }
      else
        $scope.showEditForm = true;
    }

    function _errorLeaveApp() {

    }

    // $scope.$on('form-success', function (successEvent, result) {
    //   console.log(result)
    //   if (result.success_message == 'Added New Record.') {
    //     console.log(result.success_message)
    //     $scope.showEditForm = false;
    //   }
    //   else if (result.success_message == 'Record Updated.') {
    //     $scope.showEditForm = false;
    //   }
    //   else {
    //     $scope.showEditForm = true;
    //   }
    //   console.log(result)

    // })

    if ($scope.page.pageId == 261) {
      $scope.page.boxOptions.editRecord = _editRecord;
    }



    // function _editRecord(row) {

    //   console.log(row)

    //   $scope.entity = row.entity;
    //   $scope.oldEntity = angular.copy(row.entity);

    //   $scope.showEditForm = true;
    // }



    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }


    $scope.isLoading = true;
    $scope.isLoaded = false;


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

    function _selectGroup(groupId) {
      groupIds.push(groupId);


    }

    function _getTotalTenure() {
      console.log(isNaN($scope.entity.LRCCRDaysInInterval))
      if ($scope.entity.LRCNoOfDaysInCycle != undefined && $scope.entity.LRCCycleIntervalDays != undefined && $scope.entity.LRCCRDaysInInterval != undefined) {

        var value = $scope.entity.LRCNoOfDaysInCycle / $scope.entity.LRCCycleIntervalDays;
        if (!isNaN($scope.entity.LRCCRDaysInInterval))
          $scope.entity.totalTenure = parseInt(value) * $scope.entity.LRCCRDaysInInterval;
        else
          $scope.showMsg("error", "Please enter numeric value in Number Of Leave Field");
      }
      else if ($scope.entity.totalTenure != undefined) {
        $scope.entity.totalTenure = "";
      }
    }


    $scope.saveWizardForm = function (entity, editForm) {
      var selectedGroups = '';
      angular.forEach($scope.groupList, function (group) {
        if (group.isSelected) {
          selectedGroups += group.GMCId + ',';
        }
      })
      if (selectedGroups.length > 1) {
        selectedGroups = selectedGroups.substring(0, selectedGroups.length - 1);
        entity.LRCGroupIds = selectedGroups;
      }
      editFormService.saveForm(pageId, entity, vm.oldEntity,
        entity.LRCId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
        .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
    }

    function _saveWizardFormSuccessResult(result) {
      $scope.page.refreshData();
      $scope.showEditForm = false;
      $scope.showMsg("success", "Record Saved Successfully");
    }
    function _saveWizardFormErrorResult(err) {

    }

    _loadController();
  }

})();