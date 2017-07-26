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
    var shiftWeekOffPageId = 141;
    var groupQueryId = 528;
    var weekOffSetDetailPageId = 455;




    $scope.entity = {};

    $scope.weekOffSave = _weekOffSave;
    $scope.showWeeklyOffList = false;
    $scope.weekClick = _weekClick;
    $scope.closeWeekOffAdd = _closeWeekOffAdd;

    $scope.weekGridOptions = { enableCellEditOnFocus: true }
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
    if (pageId == 455) {
      $scope.page.boxOptions.addRecord = _addRecord;
      $scope.page.boxOptions.editRecord = _editRecord;
    }

    function _weekClick(id) {

    }

    function _addRecord() {
      $scope.showWeeklyOffList = true;

    }
    function _editRecord(row) {
      $scope.showWeeklyOffList = true;
      var multiSelect = {
        lz: false,
        parent: {tableid:'',pkValue:row.entity.WOSId}
      }
    }
    vm.ucvOnChange = _ucvOnChange;

    $scope.isLoading = true;
    $scope.isLoaded = false;

    function _refreshData() {
      _getTableData([], [])
    }

    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getPagData(shiftWeekOffPageId).then(_successShiftWeekOffCustomQuery, _errorShiftWeekOffCustomQuery)
      pageService.getPagData(weekOffSetDetailPageId).then(_successWeekOffSetCustomQuery, _errorweekOffSetCustomQuery)
      pageService.getPagData(pageId).then(_successGetPage, _errorGetPage)
      pageService.getCustomQuery(data, groupQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _successShiftWeekOffCustomQuery(result) {
      console.log(result)
      $scope.weekOffPage = result;
      result.pageinfo.selects.SGWDWeekDayId.splice(0, 1);
      // result.pageinfo.selects.SGWDFirst.splice(0, 0, { id: -1, name: "--Select--" });
      $scope.weekGridOptions.columnDefs = [
        { name: 'name', displayName: 'Day', width: 150 },
        {
          name: result.pageinfo.fields.SGWDFirst.name, displayName: result.pageinfo.fields.SGWDFirst.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"
        },
        {
          name: result.pageinfo.fields.SGWDSecond.name, displayName: result.pageinfo.fields.SGWDSecond.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'"
        },
        {
          name: result.pageinfo.fields.SGWDThird.name, displayName: result.pageinfo.fields.SGWDThird.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFourth.name, displayName: result.pageinfo.fields.SGWDFourth.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        },
        {
          name: result.pageinfo.fields.SGWDFifth.name, displayName: result.pageinfo.fields.SGWDFifth.text, width: 150,
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownIdLabel: 'value',
          editDropdownValueLabel: 'name',
          editDropdownOptionsArray: result.pageinfo.selects.SGWDFirst,
          cellFilter: "mapDropdown:grid.appScope.weekOffPage.pageinfo.selects.SGWDFirst:'value':'name'",
        }
      ];
      $scope.weekGridOptions.data = result.pageinfo.selects.SGWDWeekDayId;

      // $scope.weekDays = result.pageinfo.selects.SGWDWeekDayId;
      // angular.forEach($scope.weekDays, function (data) {
      //   data.dayType = result.pageinfo.selects.SGWDFirst;
      // })
      console.log($scope.weekDays)

      // alert(JSON.stringify($scope.days))

    }
    function _errorShiftWeekOffCustomQuery(err) {
      $scope.showMsg("error", err);
    }
    function _successWeekOffSetCustomQuery(result) {
      console.log(result)
      $scope.weekOffSetPage = result;
    }
    function _errorweekOffSetCustomQuery(err) {

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
    function _getCustomQuerySuccessResult(result) {
      $scope.groups = result;

    }
    function _getCustomQueryErrorResult(err) {

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

    // function _addRecord() {
    //   if ($scope.page.pageinfo.pageid == 1) {

    //   }
    //   else {
    //     var param = {
    //       action: 'create',
    //       page: $scope.page,
    //       linkColumns: []
    //     };
    //     var options = {
    //       param: param
    //     }
    //     dialogModal.openFormVertical(options);
    //   }
    // }
    // function _editRecord(row) {
    //   var param = {
    //     action: 'create',
    //     page: $scope.page,
    //     entity: row.entity,
    //     linkColumns: []
    //   };
    //   var options = {
    //     param: param
    //   }
    //   dialogModal.openFormVertical(options);
    // }

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

    function _weekOffSave(editForm, entity) {
      console.log($scope.weekGridOptions)
      console.log($scope.weekGridOptions.data)
      var groupIds = "";
      angular.forEach($scope.entity.WOSGroupId, function (group) {
        groupIds += group.GMCId + ",";
      })
      groupIds = groupIds.substring(0, groupIds.length - 1);
      var weekOffSet = {
        WOSName: $scope.entity.WOSName,
        WOSGroupId: groupIds
      }
      $scope.multiEntity = {};
      $scope.multiEntity.parent = {
        newEntity: weekOffSet,
        oldEntity: {},
        action: 'create',
        tableid: $scope.weekOffSetPage.pageinfo.tableid,
        pageid: $scope.weekOffSetPage.pageinfo.pageid
      }
      $scope.multiEntity.child = [];
      var child = {
        tableid: $scope.weekOffPage.pageinfo.tableid,
        pageid: $scope.weekOffPage.pageinfo.pageid,
        parentColumn: $scope.weekOffSetPage.pageinfo.idencolname,
        linkColumn: 'SGWDWOSId',
        idenColName: $scope.weekOffPage.pageinfo.idencolname,
        rows: []
      }
      for (var i = 0; i < $scope.weekGridOptions.data.length; i++) {
        var col = {
          SGWDId: 0,
          SGWDWeekDayId: $scope.weekGridOptions.data[i].value == undefined ? -1 : $scope.weekGridOptions.data[i].value,
          SGWDFirst: $scope.weekGridOptions.data[i].SGWDFirst == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFirst,
          SGWDSecond: $scope.weekGridOptions.data[i].SGWDSecond == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDSecond,
          SGWDThird: $scope.weekGridOptions.data[i].SGWDThird == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDThird,
          SGWDFourth: $scope.weekGridOptions.data[i].SGWDFourth == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFourth,
          SGWDFifth: $scope.weekGridOptions.data[i].SGWDFifth == undefined ? -1 : $scope.weekGridOptions.data[i].SGWDFifth,
        }
        child.rows.push(col);
      }

      $scope.multiEntity.child.push(child);
      $scope.multiEntity.lz = false;
      pageService.multiSave($scope.multiEntity).then(function (result) {
        console.log(result)
      }, function (err) {
        console.log(err)
      })

    }

    function _closeWeekOffAdd() {
      $scope.showWeeklyOffList = false;
    }

    _loadController();

  }

})();