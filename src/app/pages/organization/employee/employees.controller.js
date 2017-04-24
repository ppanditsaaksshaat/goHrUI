/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employee')
    .controller('OrgEmployeesController', OrgEmployeesController);

  /** @ngInject */
 /** @ngInject */
  function OrgEmployeesController($scope, $stateParams, mailMessages, addModal, pageService, editableOptions, editableThemes) {
    var vm = this;
    vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
    vm.pageId = 25;
    vm.table = { rows: [] }
    vm.page = {};
   
    function _loadController() { 
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
  
      console.log(result)
      vm.page = result;
      _getTableData();
    }
    function _errorGetPage(err) {

    }
    function _getTableData() {

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

    }
    function _getTableSuccessResult(result) {
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
