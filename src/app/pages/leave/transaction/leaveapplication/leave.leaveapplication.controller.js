/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.leaveapplication')
    .controller('LeaveAppController', LeaveAppController);

  /** @ngInject */
  function LeaveAppController($scope, $state, $timeout, pageService) {

    var vm = this;
    var pageId = 157;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = 155;
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
      editRecord: true,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }
    function _addRecord() {
      $scope.showEditForm = true;
    }


  }

})();
