/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction.advanceapplication')
    .controller('AdvanceAppController', AdvanceAppController);

  /** @ngInject */
  function AdvanceAppController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 96;

    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();


    console.log($scope.page)
    $scope.page.pageId = 96;



    $scope.oldEntity = {};
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
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
      $scope.newEntity = {};
    }





  }

})();
