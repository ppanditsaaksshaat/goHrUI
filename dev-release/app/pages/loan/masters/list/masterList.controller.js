/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.masters')
    .controller('LoanMastersListController1', LoanMastersListController1);

  /** @ngInject */
  function LoanMastersListController1($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    $scope.oldEntity = {};

    $scope.saveForm = _saveForm;
    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.closeForm = _closeForm;
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
      buttonPermission:true
    }

    if ($scope.page.pageId == 261) {
      $scope.page.boxOptions.addRecord = _addRecord;
    }

    $scope.$watch(function () {
      return $scope.yearRange
    }, function (newVal, oldVal) {
      if ($scope.yearRange) {
        if ($scope.yearRange == 'calc') {
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
    function _addRecord() {
      // $state.go("leave.masters.list", "{action:'create'}");
      $scope.showEditForm = true;
    }

    function _validateForm(form) {
      if (angular.equals($scope.oldEntity, $scope.entity)) {
        _showToast('info', 'Nothing to save', '');
        return false;
      }

      return true;
    }
    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }

    function _saveForm(editForm) {
      if (_validateForm) {
        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      }


    }
    // $scope.saveForm(editForm) = _saveForm(editForm);
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