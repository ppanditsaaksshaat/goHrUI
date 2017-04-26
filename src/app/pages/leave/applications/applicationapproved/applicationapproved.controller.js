/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.applications')
    .controller('ApprovedAppController', ApprovedAppController);

  /** @ngInject */
  function ApprovedAppController($scope, $stateParams, DJWebStore, pageService, $timeout, editFormService) {

    $scope.open = open;
    $scope.opened = false;
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.options = {
      showWeeks: false
    };

    function open() {
      $scope.opened = true;
    }

    var vm = this;
    vm.leaveApprovalPageId = 285;
    vm.page = DJWebStore.GetValue('Page_' + vm.leaveApprovalPageId);
    //  // vm.selects = vm.page.pageinfo.selects;
    // // vm.page.pageinfo.pageid
    console.log(vm.page)
    vm.entity = {};
    vm.action = 0;
    vm.entity.LEADEmpId;


    vm.pageId = $stateParams.pageId;
    vm.action = $stateParams.action;
    //  vm.tempName = $stateParams.name;
    vm.pkId = 0;

    console.log($stateParams.pageId, $stateParams.action, $stateParams.name)

    if ($stateParams.pkId !== undefined) {
      vm.pkId = $stateParams.pkId;
    }
    vm.oldEntity = {};

    function _loadController() {
      vm.page = DJWebStore.GetValue('Page_' + vm.pageId)
      //    vm.selects = vm.page.pageinfo.selects;
      if (vm.pkId > 0)
        _findEntity()
      console.log($scope.employeeLeaveAppDetailList)
      //_getEmployeeSancationData();
    }


    // function _getEmployeeSancationData() {
    //   pageService.getPagData(vm.leaveApprovalPageId).then(_successGetPage, _errorGetPage)
    // }
    // function _successGetPage(result) {
    //   console.log(result)
    //   vm.pageData = result;
    //   vm.selects = vm.pageData.pageinfo.selects;
    //   console.log(vm.selects)

    // }
    // function _errorGetPage(err) {

    // }

    vm.findEntity = _findEntity;
    function _findEntity() {
      vm.isLoaded = false;
      vm.isLoading = true;
      $timeout(function () {
        pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });
    }
    $scope.employeeLeaveAppDetailList = [];
    function _findEntitySuccessResult(result) {
      vm.isLoaded = true;
      vm.isLoading = false;
      vm.entity = result;
      $scope.employeeLeaveAppDetailList = result;
      vm.entity.ELSDSanctionFromDate = $scope.employeeLeaveAppDetailList.LEADDateFrom;
      vm.entity.ELSDSanctionToDate = $scope.employeeLeaveAppDetailList.LEADDateTo;
      console.log($scope.employeeLeaveAppDetailList.EmpName)

      console.log(vm.entity);
      vm.oldEntity = angular.copy(result)
    }

    function _findEntityErrorResult(err) {
      vm.isLoaded = true;
      vm.isLoading = false;
    }
    vm.pageData = {};













    vm.saveForm = _saveForm;

    function _validateForm(form) {
      return true;
    }

    function _saveForm(form) {
      if (_validateForm(form)) {

        vm.leaveSanctionPageId = 285;
        vm.oldEntity = {};
        vm.action = 'create';

        console.log(vm.entity, vm.oldEntity, vm.action)
        editFormService.saveForm(vm.leaveSanctionPageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)

      }
    }
    vm.showLeaveDate = _showLeaveDate;
    function _showLeaveDate() {
      vm.isLeaveDate = true;
    }
    _loadController()


  }
})();