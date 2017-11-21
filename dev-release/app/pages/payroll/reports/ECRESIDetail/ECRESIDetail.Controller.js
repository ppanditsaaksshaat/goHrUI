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
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

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
      showFilter: false,
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
      showDataOnLoad: true
    }


  

    $scope.$watch('page.gridOptions.data', function (data) {
      console.log($scope.page.gridOptions)
    })


  }

})();
