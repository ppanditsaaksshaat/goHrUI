/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('OrgMastersAddController1', OrgMastersAddController1);

  /** @ngInject */
  function OrgMastersAddController1($scope, $stateParams, $timeout, DJWebStore, pageService, editFormService, param) {
    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    // vm.saveForm = _saveForm;
    vm.oldEntity = {};
    vm.templateUrlPath = '';

    function _loadController() {
      console.log(param)
      // debugger;
      
      vm.pageId = param.pageId;
      vm.tempName = param.name;
      vm.page = $scope.getPage(vm.pageId)
      vm.page.action = param.action;
      vm.page.linkColumns = param.linkColumns;
      vm.pkId = 0;
      if (param.pkId !== undefined) {
        vm.page.pkId = param.pkId;
      }





      // vm.templateUrlPath = '';
      // vm.templateUrlPath = "app/pages/organization/employees/masters/templates/"
      //   + vm.tempName + "/" + vm.tempName + "-add.html?" + rndValu2 + "=" + rndValu;

      // vm.selects = vm.page.pageinfo.selects;
      // if (vm.pkId > 0)
      //   _findEntity()
    }
    // function _findEntity() {
    //   vm.isLoaded = false;
    //   vm.isLoading = true;
    //   $timeout(function () {
    //     pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
    //       _findEntitySuccessResult, _findEntityErrorResult);
    //   });
    // }
    // function _findEntitySuccessResult(result) {
    //   vm.isLoaded = true;
    //   vm.isLoading = false;
    //   vm.entity = result;
    //   console.log(vm.entity)
    //   vm.oldEntity = angular.copy(result)
    // }
    // function _findEntityErrorResult(err) {
    //   vm.isLoaded = true;
    //   vm.isLoading = false;
    // }
    // function _validateForm(form) {
    //   return true;
    // }
    // function _saveForm(form) {
    //   if (_validateForm(form)) {

    //     var boolData = vm.entity.DesgIsAdministrator;
    //     console.log(boolData);
    //     editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)
    //   }
    // }


    _loadController();
  }
})();