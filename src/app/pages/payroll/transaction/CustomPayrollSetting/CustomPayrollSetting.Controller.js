/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.CustomPayrollSetting')
    .controller('CustomPayrollSettingController', CustomPayrollSettingController);

  /** @ngInject */
  function CustomPayrollSettingController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 430;

    var currentState = $state.current;

    $scope.entity = {}
    $scope.page = $scope.createPage();



    console.log($scope.page)
    $scope.page.pageId = 430;

    $scope.isGenerateSalary = false;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
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
    $scope.page.boxOptions.customButtons = [];
    $scope.page.boxOptions.customButtons.push({ text: 'Pending', icon: 'ion-refresh', onClick: _pendingClick, type: 'btn-danger' })
    $scope.page.boxOptions.customButtons.push({ text: 'Hold', icon: 'fa fa-plus-circle', onClick: _holdClick, type: 'btn-warning' })
    function _addRecord() {
      $scope.showEditForm = true;
    }
    function _pendingClick() {
      console.log($scope.page.searchList);
    }
    function _holdClick() {
      alert('hold clicked')
    }
  }
})();
