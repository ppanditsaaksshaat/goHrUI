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
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    $scope.oldEntity = {};

    $scope.saveForm = _saveForm;
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
      addRecord: null,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null
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

    function _saveForm(editForm) {
      alert('save call');
      editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
        $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)

    }
    // $scope.saveForm(editForm) = _saveForm(editForm);

    function _editRecord(row) {
      console.log(row)

      $scope.entity = row.entity;
      $scope.showEditForm = true;
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