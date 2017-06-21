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
    var tempName = $stateParams.name;
    var currentState = $state.current;
    $scope.oldEntity = {};
    $scope.entity = {};

    $scope.saveForm = _saveForm;
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
    }

    // $scope.page.boxOptions.customColumns.push({
    //   text: 'Approve', click: _rowApprove, type: 'a', pin: true, name: 'approve', width: 80
    // });
    


    function _rowApprove(row) {
      alert('row clicked')
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
      // var options = {
      //   url: 'app/pages/leave/masters/templates/leavecontrol/leavecontrol-add.html',
      //   controller: 'LeaveControlMasterAddController',
      //   controlerAs: 'leaveCtrl',
      //   size: 'top-center-800',
      //   param: { page: $scope.page }
      // }
      // dialogModal.open(options)
      $scope.showEditForm = true;
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



    function _editRecord(row) {

      console.log(row)

      $scope.entity = row.entity;
      $scope.oldEntity = angular.copy(row.entity);

      $scope.showEditForm = true;
    }



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


  }

})();