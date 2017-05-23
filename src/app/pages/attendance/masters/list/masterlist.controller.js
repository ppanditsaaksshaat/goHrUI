/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attMastersListController1', attMastersListController1);

  /** @ngInject */
  function attMastersListController1($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;


    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      gridHeight: 450,
      linkColumns: [],
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      uploadRecord: null
    }

    vm.ucvOnChange = _ucvOnChange;

    $scope.isLoading = true;
    $scope.isLoaded = false;

    function _refreshData() {
      _getTableData([], [])
    }

    function _loadController() {
      pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
      console.log(result)
      $scope.page = angular.extend($scope.page, result);
      $scope.setPage(result)
      $scope.page.gridOptions = $scope.gridSetupColumns($scope.page.gridOptions, result.pageinfo.columns, result, true, true, true, true);
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
        $scope.page.pageinfo.tableid,
        $scope.page.pageinfo.pageid,
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

        $scope.page.gridOptions.data = result;

      }
    }

    function _addRecord() {
      if ($scope.page.pageinfo.pageid == 1) {

      }
      else {
        var param = {
          action: 'create',
          page: $scope.page,
          linkColumns: []
        };
        var options = {
          param: param
        }
        dialogModal.openFormVertical(options);
      }
    }
    function _editRecord(row) {
      var param = {
        action: 'create',
        page: $scope.page,
        entity: row.entity,
        linkColumns: []
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
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