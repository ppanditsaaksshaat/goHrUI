/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.masters')
    .controller('LoanMastersListController1', LoanMastersListController1);

  /** @ngInject */
  function LoanMastersListController1($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = $stateParams.pageId;
    var tempName = $stateParams.name;
    var currentState = $state.current;
    $scope.showGrid = true;
    $scope.categoryRule = false;
    $scope.page = $scope.createPage();
    $scope.page.pageId = pageId;
    $scope.closeForm = _closeForm;
    $scope.saveForm = _saveForm;
    $scope.oldEntity = {};
    $scope.percentage = _percentage;
    $scope.maxLimit = _maxLimit;
    $scope.maxDuration = _maxDuration;

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
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
      uploadRecord: null,
      buttonPermission: true
    }

    if ($scope.page.pageId == 104) {
      $scope.page.boxOptions.addRecord = _addRecord;
      $scope.page.boxOptions.editRecord = _editRecord;
    }

    function _addRecord() {
      $scope.entity = {};
      $scope.categoryRule = true;
      $scope.showGrid = false;
    }

    function _editRecord(row) {
      console.log(row)
      $scope.oldEntity = angular.copy(row.entity);
      $scope.entity = row.entity;
      $scope.categoryRule = true;
      $scope.showGrid = false;
    }

    function _closeForm() {
      $scope.showGrid = true;
      $scope.categoryRule = false;
    }

    function _saveForm(editForm) {
      if (_validateForm(editForm)) {
        editFormService.saveForm(pageId, $scope.entity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successLaonCategoryRuleResult, _errorLaonCategoryRuleResult);
        $scope.page.refreshData();
        console.log(pageId + 'pageid')
        console.log($scope.entity)
        console.log($scope.oldEntity)
        console.log($scope.page.action + 'edit')
      }
    }

    function _successLaonCategoryRuleResult(result) {
      console.log(result)
      if (result.success_message == 'Added New Record.') {
        $scope.showGrid = true;
        $scope.categoryRule = false;
        $scope.showMsg("success", "Record Save Successfully.")
        $scope.page.refreshData();
      }
      else if (result.success_message == 'Record Updated.') {
        $scope.showGrid = true;
        $scope.categoryRule = false;
        $scope.showMsg("success", "Record Successfully Updated.")
        $scope.page.refreshData();
      }
      else
        $scope.showGrid = true;
      $scope.categoryRule = false;
    }

    function _errorLaonCategoryRuleResult() {

    }

    function _validateForm(editForm) {
      console.log(editFormService)
      var valid = editFormService.validateForm(editForm)
      return valid;
    }

    function _percentage() {
      console.log('max limit')
      var percentageAmount = parseFloat($scope.entity.LTRInstallmentPercentage)
      if (isNaN(percentageAmount)) {
        percentageAmount = 0;
        $scope.entity.LTRInstallmentPercentage = 0;
      }
      else {
        // $scope.entity.LTRInstallmentPercentage = percentageAmount;
        // if(percentageAmount)
        if (percentageAmount <= 99.99) {
          $scope.entity.LTRInstallmentPercentage = percentageAmount;
        }
        else {
          $scope.entity.LTRInstallmentPercentage = 0;
        }
        console.log(percentageAmount.toString().length)
      }
    }

    function _maxLimit() {
      var maxLimitAmount = parseFloat($scope.entity.LTRMaxLimit)
      if (isNaN(maxLimitAmount)) {
        maxLimitAmount = 0;
        $scope.entity.LTRMaxLimit = 0;
      }
      else {
        if (maxLimitAmount <= 99999999.99) {
          $scope.entity.LTRMaxLimit = maxLimitAmount;
        }
        else {
          $scope.entity.LTRMaxLimit = 0;
        }
      }
    }

    function _maxDuration() {
      var maxDur = parseInt($scope.entity.LTRMaxDuration)
      if (isNaN(maxDur)) {
        maxDur = 0;
        $scope.entity.LTRMaxDuration = 0;
      }
      else {
        if (maxDur <= 99) {
          $scope.entity.LTRMaxDuration = maxDur;
        }
        else {
          $scope.entity.LTRMaxDuration = 0;
        }
      }
    }
  }
})();