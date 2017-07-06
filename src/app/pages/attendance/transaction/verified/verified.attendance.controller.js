/**
 * @author Pardeep Pandit
 * created on 01.01.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.verified')
    .controller('attTransVerifiedController', attTransVerifiedController);

  /** @ngInject */
  function attTransVerifiedController($scope, $state, $timeout, pageService, dialogModal, toastr, toastrConfig) {

    var vm = this;
    var currentState = $state.current;
    vm.pageId = 446;

    /**For all list of verify attendance grid setting */
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.page.searchList = [];
    $scope.page.searchList.push({ field: 'AMSTIsVarified', operand: '=', value: true })
    // $scope.page.searchList.push({ field: 'VAYear', operand: '=', value: moment().format('YYYY') })
    // $scope.page.searchList.push({ field: 'VADepartmentId', operand: '=', value: -1 })
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
      requiredFilter: false,
      showAdd: false,
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
      viewRecord: null,
      deleteRecord: null,
     
      // readonlyColumns: ['col1', 'col2']
    }
    /**End of For all list of verify attendance grid setting */
  }

})();
