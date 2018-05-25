/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.ECREPFDetail')
    .controller('ECREPFDetailController', ECREPFDetailController);

  /** @ngInject */

  function ECREPFDetailController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr,DJWebStoreGlobal) {

    var vm = this;
    var pageId = 359;
    var currentState = $state.current;
    $scope.entity = {}
    $scope.page = $scope.createPage();

    
    
    console.log($scope.page)
    $scope.page.pageId = 359;




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
      customButtons: [{
        text: 'Download',
        icon: 'ion-archive',
        onClick: _downloadData,
        type: 'btn-info'
      }],
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      showDataOnLoad: false
    }




    function _downloadData() {
      console.log($scope.page)
      DJWebStoreGlobal.JSONToCSVConvertor($scope.page.gridOptions.data, 'ECREPFDetail', false, true, true);
    }

    $scope.$watch('page.gridOptions.data', function (data) {
      console.log($scope.page.gridOptions)
    })


  }

})();