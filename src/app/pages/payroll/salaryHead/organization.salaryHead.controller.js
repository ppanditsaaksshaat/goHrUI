/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.payRoll.salaryHead')
    .controller('salaryHeadController', salaryHeadController);

  /** @ngInject */
  function salaryHeadController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 132;
    var currentState = $state.current;

    $scope.entity = {}
    $scope.page = $scope.createPage();
    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 132;


    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: false,
      filterOpened: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      showDataOnLoad: true
    }
    $scope.saveForm = _saveForm;
    $scope.closeForm = _closeForm;
    $scope.resetForm = _resetForm;
    $scope.clearForm = _clearForm;
    $scope.changeHeadType = _changeHeadType;
    $scope.changeHeadCat = _changeHeadCat;

    function _addRecord() {
      $scope.page.showCustomEditView = true;
      $scope.entity = {};
      $scope.oldEntity = {};
    }
    function _editRecord(row) {
      $scope.page.showCustomEditView = true;
      $scope.entity = row.entity;
      $scope.oldEntity = angular.copy(row.entity)
      console.log($scope.entity)

      if ($scope.entity.SHIsForEmployer) {
        $scope.entity.headType = "3";
      }
      else if ($scope.entity.SHIsDeduction) {
        $scope.entity.headCat = "1";
      }
      else if (!$scope.entity.SHIsDeduction) {
        $scope.entity.headType = "2";
      }


      if ($scope.entity.SHIsGrossSalary)
        $scope.entity.headCat = "1";
      else if ($scope.entity.SHIsBasic)
        $scope.entity.headCat = "2";
      else if ($scope.entity.SHIsAllowance)
        $scope.entity.headCat = "3";
      else if ($scope.entity.SHIsSpecielAllowance)
        $scope.entity.headCat = "4";
      else if ($scope.entity.SHIsBonus)
        $scope.entity.headCat = "5";
      else if ($scope.entity.SHIsReimbursement)
        $scope.entity.headCat = "6";
      else if ($scope.entity.SHIsESIC)
        $scope.entity.headCat = "7";
      else if ($scope.entity.SHIsEPF)
        $scope.entity.headCat = "8";
      else if ($scope.entity.SHIsTds)
        $scope.entity.headCat = "9";
      else if ($scope.entity.SHIsLoan)
        $scope.entity.headCat = "10";
      else if ($scope.entity.SHIsAdvanceSalary)
        $scope.entity.headCat = "11";
      else if ($scope.entity.SHIsOvertime)
        $scope.entity.headCat = "12";
      else if ($scope.entity.SHIsLeave)
        $scope.entity.headCat = "13";
      else if ($scope.entity.SHIsAbsence)
        $scope.entity.headCat = "14";
      else if ($scope.entity.SHIsSingleOT)
        $scope.entity.headCat = "15";
      else if ($scope.entity.SHIsBenefit)
        $scope.entity.headCat = "16";
    }
    function _closeForm(editForm) {
      $scope.page.showCustomEditView = false;
      $scope.entity = {};
    }
    function _resetForm(editForm) {

    }
    function _clearForm(editForm) {

    }
    function _validateForm(editForm) {
      return true;
    }
    function _saveForm(editForm) {
      $scope.currentForm = editForm;
      if (_validateForm(editForm)) {
        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
          $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
          .then(_saveFormSuccess, _saveFormError)
      }
    }

    function _saveFormSuccess(result) {
      $scope.showMsg('success', $scope.page.pageinfo.tagline + " saved successfully.")

      _closeForm($scope.currentForm);

    }
    function _saveFormError(err) {
      $scope.showMsg('error', 'Unable to save ' + $scope.page.pageinfo.tagline + ", Something went wrong.")
      console.log(err)
    }

    function _changeHeadType(headType) {
      if (headType == "1") {
        $scope.entity.SHIsDeduction = true;
        $scope.entity.SHIsForEmployer = false;
      }
      else if (headType == "2") {
        $scope.entity.SHIsDeduction = false;
        $scope.entity.SHIsForEmployer = false;
      }
      else if (headType == "3") {
        $scope.entity.SHIsDeduction = false;
        $scope.entity.SHIsForEmployer = true;
      }
    }

    function _changeHeadCat(headCat) {
      $scope.entity.SHIsGrossSalary = false;
      $scope.entity.SHIsBasic = false;
      $scope.entity.SHIsAllowance = false;
      $scope.entity.SHIsSpecielAllowance = false;
      $scope.entity.SHIsBonus = false;
      $scope.entity.SHIsReimbursement = false;
      $scope.entity.SHIsESIC = false;
      $scope.entity.SHIsEPF = false;
      $scope.entity.SHIsTds = false;

      $scope.entity.SHIsLoan = false;
      $scope.entity.SHIsAdvanceSalary = false;
      $scope.entity.SHIsOvertime = false;

      $scope.entity.SHIsLeave = false;
      $scope.entity.SHIsAbsence = false;
      $scope.entity.SHIsSingleOT = false;

      $scope.entity.SHIsLeave = false;
      $scope.entity.SHIsAbsence = false;
      $scope.entity.SHIsSingleOT = false;

      var catId = parseInt(headCat);
      switch (catId) {
        case 1:
          $scope.entity.SHIsGrossSalary = true;
          break;
        case 2:
          $scope.entity.SHIsBasic = true;
          break;
        case 3:
          $scope.entity.SHIsAllowance = true;
          break;
        case 4:
          $scope.entity.SHIsSpecielAllowance = true;
          break;
        case 5:
          $scope.entity.SHIsBonus = true;
          break;
        case 6:
          $scope.entity.SHIsReimbursement = true;
          break;
        case 7:
          $scope.entity.SHIsESIC = true;
          break;
        case 8:
          $scope.entity.SHIsEPF = true;
          break;
        case 9:
          $scope.entity.SHIsTds = true;
          break;
        case 10:
          $scope.entity.SHIsLoan = true;
          break;
        case 11:
          $scope.entity.SHIsAdvanceSalary = true;
          break;
        case 12:
          $scope.entity.SHIsOvertime = true;
          break;
        case 13:
          $scope.entity.SHIsLeave = true;
          break;
        case 14:
          $scope.entity.SHIsAbsence = true;
          break;
        case 15:
          $scope.entity.SHIsSingleOT = true;
          break;
        case 100:
          break;
      }
    }
  }
})();
