/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.loanmanagement')
    .controller('OrgMastersListController', OrgMastersListController);

  /** @ngInject */
  function OrgMastersListController($scope, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore) {


    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

    var vm = this;
    vm.pageId = 109;
    vm.table = { rows: [] }
    vm.page = {};
    $scope.isLoading = true;
    $scope.isLoaded = false;
    vm.templateUrlPath = '';
    vm.tempName = $stateParams.name;
    vm.templateUrlPath = "app/pages/loan/loanmanagement"
      + vm.tempName + "/" + vm.tempName + "-list.html?" + rndValu2 + "=" + rndValu;
    vm.listTemplateUrlPath = 'app/pages/loan/loanmanagement/list/table-list.html';

    vm.refreshData = function () {
      $scope.rows = [];
      _getTableData();
    }

    function _loadController() {
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      // DJWebStore.SetValue('Page_' + vm.pageId, result)
      $scope.setPage(vm.page)
      _getTableData();
    }
    function _errorGetPage(err) {

    }
    function _getTableData() {
      $scope.isLoaded = false
      $scope.isLoading = true
      var data = {
        searchList: [],
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.page.pageinfo.tableid,
        vm.page.pageinfo.pageid,
        '', '',
        false, data);

      tableData.then(_getTableSuccessResult, _getTableErrorResult)
    }
    function _getTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getTableSuccessResult(result) {
      $scope.isLoaded = true
      $scope.isLoading = false
      console.log(result)
      if (result == 'NoDataFound') {
        // uivm.showMsg('warning', 'No Record Found.');
      } else if (result.Errors !== undefined) {
        // uivm.showMsg('error', result.Message);
        // _startMsgTimer();
      }
      else {
        vm.table.rows = result;
        $scope.rows = result;
        console.log($scope.rows.length)
        // if (uivm.page.gridOptions.data.length == 1)
        //   uivm.showMsg('info', result.length + ' Records found.');
        // else
        //   uivm.showMsg('info', result.length + ' Record found.');

        // _startMsgTimer();
      }
    }
    _loadController();

  }

})();