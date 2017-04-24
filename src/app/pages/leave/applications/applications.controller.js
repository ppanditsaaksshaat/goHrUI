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
    vm.ucvOnChange = _ucvOnChange;
    console.log(vm.ucvlist)
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
      console.log(vm.page.pageinfo);

    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      DJWebStore.SetValue('Page_' + vm.page.pageinfo.pageid, vm.page)
      console.log(vm.page.pageinfo)
      vm.ucvlist = vm.page.pageinfo.ucvlist;
      console.log(vm.ucvlist)

      // vm.table = {};
      // vm.table.columns = [];
      // vm.page.pageinfo.columns.forEach(function (col) {
      //   if (!col.name.endsWith('Id')) {
      //     vm.table.columns.push(col);
      //   }
      // }, this);

      _getTableData([], []);
    }
    function _errorGetPage(err) {

    }
    function _getTableData(searchList, orderbyList) {

      var data = {
        searchList: searchList,
        orderByList: orderbyList
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

    function _ucvOnChange(item) {

      console.log(item)
      var searchList = [], orderbyList = [];

      var comData = LZString.decompressFromEncodedURIComponent(item.data);
      var userData = angular.fromJson(comData);
      console.log(userData)
      // SettingVisibleColumns(item)
      angular.forEach(userData.filters, function (filter, fdx) {
        var operator = '=';
        var userValue = ''
        if (filter.selectedOperator.value == '=') {
          operator = '=';
        }
        else if (filter.selectedOperator.value == 'notempty') {
          operator = '<>';
        }
        else if (filter.selectedOperator.value == 'empty') {
          operator = '=';
        }
        else {
          operator = filter.selectedOperator.value;
        }

        if (filter.userValue == 'self') {
          userValue = uivm.auth.profile.userId;
        }
        else if (filter.userValue == 'notempty') {
          userValue = ''
        }
        else if (filter.userValue == 'empty') {
          userValue = ''
        }
        else if (filter.userValue === undefined) {
          userValue = '';
        }
        else {
          userValue = filter.userValue;
        }

        var searchFields = {
          field: filter.selectedColumn.name, operand: operator, value: userValue
        };
        //console.log(searchFields)
        searchList.push(searchFields)
      })
      //console.log(userData.orderby)
      userData.orderby.forEach(function (order) {
        if (order.selectedColumn !== undefined) {
          var orderitem = {
            column: order.selectedColumn.name,
            isDesc: order.isDesc
          }

          orderbyList.push(orderitem)
        }
      })

      _getTableData(searchList, orderbyList)
    }
   
    _loadController();

  }
})();



