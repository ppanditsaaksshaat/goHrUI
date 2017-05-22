/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('orgMastersDetailController', orgMastersDetailController);

  /** @ngInject */
  function orgMastersDetailController($scope, $stateParams, $timeout, DJWebStore, pageService, editFormService, param) {
    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    // vm.saveForm = _saveForm;
    vm.oldEntity = {};
    vm.templateUrlPath = '';
    $scope.totalFormRows = 0;
    function _loadController() {

      vm.pageId = param.pageId;
      vm.tempName = param.name;
      vm.page = param.page;
      vm.page.action = param.action;
      vm.pkId = 0;
      if (param.pkId !== undefined) {
        vm.page.pkId = param.pkId;
      }

      if (param.entity !== undefined) {
        vm.entity = param.entity;

        //find tabs
        angular.forEach(vm.page.pageinfo.viewform, function (tab) {
          //find rows
          angular.forEach(tab.rows, function (row) {
            $scope.totalFormRows++;
          })
        })
      }
    }
    _loadController();
  }
})();