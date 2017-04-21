/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.applications')
    .controller('LeaveApplicationController', LeaveApplicationController);

  /** @ngInject */
  function LeaveApplicationController($scope, $stateParams, mailMessages, addModal,
    pageService, editableOptions, editableThemes, DJWebStore) {

    var vm = this;
    vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
    vm.pageId = 157;
    vm.table = { rows: [] }
    vm.page = {};
    vm.showAdd = function () {
      addModal.open({
        subject: 'subject',
        to: 'to',
        text: 'text'
      })
    };
    // $scope.templateUrl = function () {
    //   return "app/pages/leave/masters/templates/" + vm.tempFile + "/" + vm.tempFile + "-list.html"
    // }
    // function _setupColumns() {
    //   if (vm.pageId == 262) {
    //     vm.tempFile = 'DayCriteria'
    //   }
    //   else if (vm.pageId == 260) {
    //     vm.tempFile = 'LeaveType';
    //   }
    //   else if (vm.pageId == 157) {
    //     vm.tempFile = 'leaveapplication';
    //   }

    // }


    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);



    function _loadController() {

      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)


    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      DJWebStore.SetValue('Page_' + vm.page.pageinfo.pageid, vm.page)
      console.log(vm.page)

      
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



