/**
 * @author 
 * created on 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.paySlips')
    .controller('paySlipchallanControllers', paySlipchallanControllers);

  /** @ngInject */
  function paySlipchallanControllers($scope, $state) {
    // $scope.page = {
    //   reportId: 19
    // }
    console.log('pay slip')

    var currentState = $state.current;
    $scope.entity = {}
    // debugger;
    $scope.page = $scope.createPage();
    $scope.isDate = true;
    console.log($scope.page)
    $scope.page.reportId = 19;
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
      filterOnChange: _filterChange,
      afterCellEdit: null,
      pageResult: _pageResult
    }

    console.log($scope.page)

    // pageinfo.filters[4]

    function _loadController() {
      if ($scope.page.pageinfo !== undefined) {
        angular.forEach($scope.page.pageinfo.filters, function (filter) {
          console.log(filter)
        })
      }
    }

    _loadController();


    // function _pageResult(result) {
    //   console.log(result)
    //   angular.forEach(result.pageinfo.filters, function (filter) {
    //     if (filter.name == 'Month') {
    //       filter.value = parseInt(moment().format('MM'));
    //     }
    //     if (filter.name == 'Year') {
    //       filter.value = parseInt(moment().format('YYYY'));
    //     }
    //     if (filter.name == 'VADepartmentId') {
    //       filter.value = -1;
    //       filter.disabled = true;
    //     }
    //   })
    // }

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

        // if (filter.name == 'EmpId') {
        //   filter.value = $scope.user.profile.empId;
        //   filter.disabled = true;
        //   console.log(filter.value)
        // }
      }

    }

    function _filterChange(filter) {
      console.log($scope.page.filterData)
      console.log(filter.name)

      var searchList = [];
      if (filter.name == 'EmpId') {
        searchList.push({
          value: 7,
          operand: '=',
          field: 'EmpId'
        })
      }

      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        // if(col.name=='EmpId')
        console.log(col)
      })
    }

  }

})();