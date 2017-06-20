/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.outdoorapply')
    .controller('attTransoutdoorapplyController', attTransoutdoorapplyController);

  /** @ngInject */
  function attTransoutdoorapplyController($scope, $state, $timeout, pageService) {
    var vm = this;
    var pageId = 294;
    vm.tableId=305;
    var currentState = $state.current;
    $scope.showEditForm = false;
    // this.uploadRecord = _uploadRecord;
    $scope.close = _close;
    $scope.updateForm=_updateForm;
    $scope.entity = {}
    $scope.page = $scope.createPage();
    $scope.page.pageId = 294;
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
      enableAutoRefresh: true,
      showDataOnLoad: true,
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: _viewRecord,
      deleteRecord: null,
    }
    /**View OutDoor Record */
    function _viewRecord(row) {
      $scope.showEditForm = true;
      $scope.entity = row.entity
    }
    /**Close View OutDoor Record */
    function _close() {
      $scope.showEditForm = false;
    }
 function _updateForm(entity) {
      pageService.updateField(vm.tableId, $scope.page.pageinfo.idencolname, entity.FDAId,"StatusId",entity.StatusId).then(_updateSuccessResult, _updateErrorResult)
    }

    function _updateSuccessResult(result) {
      if(result.success_message=="Updated")
       $scope.showMsg("success", "Record Updated")

    }
    function _updateErrorResult(err) {

    }

  }

})();
