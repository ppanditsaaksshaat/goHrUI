/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.payregister')
    .controller('payPayregisterController', payPayregisterController);

  /** @ngInject */
  function payPayregisterController($scope,$state) {
    console.log('pay register')
    // $scope.page = {
    //   reportId: 20
    // }

    var currentState = $state.current;
    $scope.entity = {}
    // debugger;
    $scope.page = $scope.createPage();
    $scope.isDate = true;
    console.log($scope.page)
    $scope.page.reportId = 20;
    $scope.isGenerateSalary = false;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: false,
      showFilter: true,
      filterOpened: true,
      showAdd: false,
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
      showApplyFilter: true,
      filterOnChange: null,
      afterCellEdit: null,
      pageResult: _pageResult
    }

    console.log($scope.page)

    function _pageResult(result) {
      console.log(result);
      console.log($scope.user.profile.empId)
      if (!$scope.user.profile.isAdmin && !$scope.user.profile.isManager) {
        angular.forEach(result.filters, function (filter) {
          if (filter.name == 'EmpId') {
            filter.value = $scope.user.profile.empId;
            filter.disabled = true;
          }
        })
      }
    }
  }

})();