/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('OrgMastersAddController1', OrgMastersAddController1);

  /** @ngInject */
  function OrgMastersAddController1($scope, $stateParams, $timeout, DJWebStore, pageService, editFormService) {
    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    vm.saveForm = _saveForm;
    vm.oldEntity = {};
    vm.templateUrlPath = '';

    function _loadController() {
      // debugger;
      vm.pageId = $stateParams.pageId;
      vm.tempName = $stateParams.name;
      vm.action = $stateParams.action;
      vm.pkId = 0;
      if ($stateParams.pkId !== undefined) {
        vm.pkId = $stateParams.pkId;
      }

      vm.formrows = [];
      vm.page = $scope.getPage(vm.pageId)
      if (vm.page !== undefined) {
        if (vm.page.pageinfo.pageid == vm.pageId) {
          //find tabs
          angular.forEach(vm.page.pageinfo.viewform, function (tab) {
            //find rows
            angular.forEach(tab.rows, function (row) {
              //find columns
              angular.forEach(row, function (col) {
                if (col.name != vm.page.pageinfo.idencolname) {
                  vm.formrows.push(col);
                }
              })
            })
          })
        }
      }

      vm.templateUrlPath = '';
      vm.templateUrlPath = "app/pages/organization/employees/masters/templates/"
        + vm.tempName + "/" + vm.tempName + "-add.html?" + rndValu2 + "=" + rndValu;

      vm.selects = vm.page.pageinfo.selects;
      if (vm.pkId > 0)
        _findEntity()
    }
    function _findEntity() {
      vm.isLoaded = false;
      vm.isLoading = true;
      $timeout(function () {
        pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });
    }
    function _findEntitySuccessResult(result) {
      vm.isLoaded = true;
      vm.isLoading = false;
      vm.entity = result;
      console.log(vm.entity)
      vm.oldEntity = angular.copy(result)
    }
    function _findEntityErrorResult(err) {
      vm.isLoaded = true;
      vm.isLoading = false;
    }
    function _validateForm(form) {
      return true;
    }
    function _saveForm(form) {
      if (_validateForm(form)) {

        var boolData = vm.entity.DesgIsAdministrator;
        console.log(boolData);
        editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)
      }
    }


    _loadController();
  }
})();