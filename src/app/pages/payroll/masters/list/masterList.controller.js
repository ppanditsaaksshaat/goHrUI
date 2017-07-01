/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters')
    .controller('payMastersListController', payMastersListController);

  /** @ngInject */
  function payMastersListController($scope, $state, $stateParams,
    pageService, DJWebStore, dialogModal, editFormService) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    $scope.clearEntity = _clearEntity;
    $scope.closeForm = _closeForm;
    $scope.oldEntity = {};
    $scope.saveForm = _saveForm;
    $scope.clearAllEntity = true;


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
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null
    }

    function _addRecord() {
      $scope.entity = {};
      $scope.showEditForm = true;
    }

    function _clearEntity() {
      console.log($scope.clearAllEntity)
      if ($scope.page.action != 'edit') {
        $scope.clearAllEntity = true;
      }
      if ($scope.clearAllEntity) {
        var oldData = $scope.entity.LSCSCDId;
        console.log($scope.entity)
        $scope.entity = {};
        $scope.entity.LSCSCDId = oldData;
      }

    }

    function _editRecord(row) {

      $scope.clearAllEntity = false;
      console.log(row)

      $scope.entity = row.entity;
      $scope.oldEntity = angular.copy(row.entity);
      console.log(row.entity)
      console.log($scope.entity)

      $scope.showEditForm = true;

    }
    function _closeForm(editForm) {
      $scope.showEditForm = false;
    }

    function _saveForm(editForm) {
      if (_validateForm(editForm)) {

        editFormService.saveForm(pageId, $scope.entity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successSalarySetting, _errorSalarySetting);
        console.log(pageId + 'pageid')
        console.log($scope.entity)
        console.log($scope.oldEntity)
        console.log($scope.page.action + 'edit')

      }
      // console.log($scope.page.pageinfo.pageid, $scope.entity,
      //   $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)

    }


    function _successSalarySetting(result) {
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

    function _errorSalarySetting() {

    }
    function _validateForm(editForm) {
      console.log(editFormService)
      var valid = editFormService.validateForm(editForm)
      return valid;

    }
  }
})();