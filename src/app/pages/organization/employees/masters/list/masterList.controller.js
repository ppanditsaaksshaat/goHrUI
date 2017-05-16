/**
 * @author deepak.jain
 * created on 16/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('OrgMastersListController1', OrgMastersListController1);

  /** @ngInject */
  function OrgMastersListController1($scope, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore) {
    var vm = this;

    var currentState = $state.current;
    vm.ucvOnChange = _ucvOnChange;
    vm.pageId = $stateParams.pageId;

    vm.filterOpt = {};
    vm.searchList = [];
    vm.orderByList = [];

    this.refreshData = _refreshData;
    this.addRecord = _addRecord;
    this.editRecord = _editRecord;
    this.updateRecord = _updateRecord;
    this.viewRecord = _viewRecord;
    this.deleteRecord = _deleteRecord;
    this.openView = _openView;
    // this.applyFilter = _applyFilter;
    this.uploadRecord = _uploadRecord;

    $scope.page = {}
    $scope.page.gridOptions = $scope.getGridSetting();
    $scope.gridStyle = { width: 500, height: 450 }
    $scope.boxSetting = {
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: true
    }


    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);




    vm.table = { rows: [] }
    vm.page = {};
    $scope.isLoading = true;
    $scope.isLoaded = false;
    vm.templateUrlPath = '';
    vm.tempName = $stateParams.name;
    vm.templateUrlPath = "app/pages/organization/employees/masters/templates/"
      + vm.tempName + "/" + vm.tempName + "-list.html?" + rndValu2 + "=" + rndValu;
    vm.listTemplateUrlPath = 'app/pages/organization/employees/masters/list/table-list.html';

    function _refreshData() {
      $scope.rows = [];
      _getTableData([], [])
    }

    function _loadController() {

      $scope.gridOption = { columns: [] }
      $scope.setPage(undefined)
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
      $scope.setPage(result)
      $scope.page = result;

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