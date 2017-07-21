/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.EmployeeIncentive')
    .controller('payEmployeeIncentiveController', payEmployeeIncentiveController);

  /** @ngInject */
  function payEmployeeIncentiveController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {
    var vm = this;
    // var pageId = 96;

    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();


    console.log($scope.page)
    $scope.page.pageId = 452;
    var incentivePageId = 452;
    var entitlementHeadPageId = 178;

    $scope.oldEntity = {};

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
      showAdd: true,
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
      showDataOnLoad: false
    }

    $scope.page.boxOptions.customButtons = [];
    $scope.page.boxOptions.customButtons.push({ text: 'Save', icon: 'ion-refresh', onClick: _saveIncentiveClick, type: 'btn-success' })
    $scope.page.boxOptions.customButtons.push({ text: 'Reset', icon: 'ion-refresh', onClick: _updateEmployeeEntitlementClick, type: 'btn-danger' })


    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
      $scope.newEntity = {};
    }

    var totalSavingRecord = 0;
    function _saveIncentiveClick() {

      totalSavingRecord = $scope.page.gridOptions.data.length - 1;

      if ($scope.page.gridOptions.data.length > 0) {
        angular.forEach($scope.page.gridOptions.data, function (row) {
          console.log(row)

          var entitleData = {
            EEHId: row.EEHId == null ? undefined : row.EEHId,
            EEHEmpId: row.EEHEmpId,
            EEHSHId: row.EEHSHId,
            EEHFixedAmount: row.EEHFixedAmount
          }


          console.log(entitleData)
          var form = {}
          if (entitleData.EEHId == undefined) {
            editFormService.saveForm(entitlementHeadPageId, entitleData,
              {}, 'create', 'Entitlement', form, false).then(_successEntitlementResult, _errorEntitlementResult);
          }
          else {
            editFormService.saveForm(entitlementHeadPageId, entitleData,
              {}, 'edit', 'Entitlement', form, false).then(_successEntitlementResult, _errorEntitlementResult);
          }

          var incentiveData = {
            SIDEmpId: row.EEHEmpId,
            SIDSHId: row.EEHSHId,
            SIDAmount: row.EEHFixedAmount
          }
          console.log(incentiveData)
          editFormService.saveForm(incentivePageId, incentiveData,
            {}, 'create', 'Entitlement', form, false).then(_successIncentiveResult, _errorIncentivetResult);
        })
      }
      else
        $scope.showMsg("success", "Please filter data and then save record");
    }
    function _successEntitlementResult(result) {
      console.log(result)
      $scope.showMsg("success", "Advance Saved Successfully");
      // $scope.page.refreshData();


    }
    function _errorEntitlementResult(err) {
      // alert(JSON.stringify(err))
      console.log(err);
    }

    function _successIncentiveResult(result) {
      console.log(result)
      $scope.showMsg("success", "Advance Saved Successfully");
      // $scope.page.refreshData();
    }

    function _errorIncentivetResult(err) {
      console.log(err);
    }

    function _updateEmployeeEntitlementClick() {
      var searchLists = [];
      console.log($scope.entity);
      console.log($scope.page.pageinfo.filters);
      console.log($scope.page.pageinfo.filters[0].name)

      angular.forEach($scope.page.pageinfo.filters, function (col, cdx) {
        if (col.name == 'SIDMonth')
          searchLists.push({
            field: col.name,
            operand: '=',
            value: col.value,
          })
        if (col.name == 'SIDYear')
          searchLists.push({
            field: col.name,
            operand: '=',
            value: col.value,
          })
        if (col.name == 'SIDSHId')
          searchLists.push({
            field: col.name,
            operand: '=',
            value: col.value,
          })
      })
      console.log($scope.page.searchList)


      // var searchListData = {
      //   field: $scope.page.pageinfo.filters[0].name,
      //   operand: '=',
      //   value: $scope.page.pageinfo.filters[0].value
      // }
      // searchLists.push(searchListData)
      // searchListData = {
      //   field: $scope.page.pageinfo.filters[1].name,
      //   operand: '=',
      //   value: $scope.page.pageinfo.filters[1].value
      // }
      // searchLists.push(searchListData)
      // searchListData = {
      //   field: $scope.page.pageinfo.filters[2].name,
      //   operand: '=',
      //   value: $scope.page.pageinfo.filters[2].value
      // }

      // searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      console.log(searchLists)
      var queryId = 545;
      pageService.getCustomQuery(data, queryId).then(function (result) {
        console.log(result)
        $scope.page.refreshData();
      });
    }
  }

})();
