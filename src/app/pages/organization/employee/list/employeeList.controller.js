/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employee')
    .controller('OrgEmployeesListController', OrgEmployeesListController);

  /** @ngInject */
  function OrgEmployeesListController($scope, $stateParams, mailMessages, addModal, pageService, editableOptions, editableThemes) {
    var vm = this;
    vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
    vm.pageId = $stateParams.pageId;
    vm.table = { rows: [] }
    vm.page = {};
   
    // $scope.templateUrl = function () {    
    //   return "app/pages/organization/employee/templates/" + vm.tempFile + "/" + vm.tempFile + "-list.html"
    // }
    function _setupColumns() {
      if (vm.pageId == 25) {
        vm.tempFile = 'employee'
      }
       else if (vm.pageId == 35) {
         vm.tempFile = 'personal';
       }
    //   else if (vm.pageId == 29) {
    //     vm.tempFile = 'department';
    //   }
    //   else if (vm.pageId == 30) {
    //     vm.tempFile = 'designation';
    //   }
    //   else if (vm.pageId == 47) {
    //     vm.tempFile = 'grades';
    //   }
    //   else if (vm.pageId == 48) {
    //     vm.tempFile = 'levels';
    //   }                                                                                 
    }
    function _loadController() {
      _setupColumns();
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)

    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      // vm.table = {};
      // vm.table.columns = [];
      // vm.page.pageinfo.columns.forEach(function (col) {
      //   if (!col.name.endsWith('Id')) {
      //     vm.table.columns.push(col);
      //   }
      // }, this);

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
        alert(JSON.stringify(result))
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
