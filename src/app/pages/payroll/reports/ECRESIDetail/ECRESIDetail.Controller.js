/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.ECRESIDetail')
    .controller('ECRESIDetailController', ECRESIDetailController);

  /** @ngInject */

  function ECRESIDetailController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr, DJWebStoreGlobal) {

    var vm = this;
    var pageId = 367;
    var currentState = $state.current;

    $scope.entity = {}
    $scope.page = $scope.createPage();



    console.log($scope.page)
    $scope.page.pageId = 367;





    $scope.oldEntity = {};
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
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      showDataOnLoad: false,
      customButtons: [{
        text: 'Download',
        icon: 'ion-archive',
        onClick: _downloadData,
        type: 'btn-info'
      }]
    }




    $scope.$watch('page.gridOptions.data', function (data) {
      console.log($scope.page.gridOptions)
    })

    function _downloadData() {
      console.log($scope.page)
      DJWebStoreGlobal.JSONToCSVConvertor($scope.page.gridOptions.data, 'ECREPFDetail', false, true, true);
    }


  }

})();