/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attMastersListController1', attMastersListController1);

  /** @ngInject */
  function attMastersListController1($scope, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore) {


    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

    var vm = this;
    vm.ucvOnChange = _ucvOnChange;
    vm.pageId = $stateParams.pageId;

    vm.table = { rows: [] }
    vm.page = {};
    $scope.isLoading = true;
    $scope.isLoaded = false;
    vm.templateUrlPath = '';
    vm.tempName = $stateParams.name;
    vm.templateUrlPath = "app/pages/attendance/masters/templates/"
      + vm.tempName + "/" + vm.tempName + "-list.html?" + rndValu2 + "=" + rndValu;
    vm.listTemplateUrlPath = 'app/pages/attendance/masters/list/table-list.html';

    vm.refreshData = function () {
      $scope.rows = [];
      // _getTableData();
      _getTableData([], [])
    }

    function _loadController() {
      
      $scope.gridOption = {columns: [] }
     
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      // DJWebStore.SetValue('Page_' + vm.pageId, result)
      $scope.setPage(vm.page)
      // $scope.$emit("designGrid");
      
      $scope.$broadcast('designGrid');

      _getTableData([], []);
    }
    function _errorGetPage(err) {

    }
    function _getTableData(searchList, orderByList) {
      $scope.isLoaded = false
      $scope.isLoading = true
      var data = {
        searchList: searchList,
        orderByList: orderByList
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