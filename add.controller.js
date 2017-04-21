/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters')
    .controller('OrgMastersAddController', OrgMastersAddController);

  /** @ngInject */
  function OrgMastersAddController($scope, $stateParams, DJWebStore, pageService) {
    var vm = this;
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

    vm.templateUrl = _templateUrl;
    vm.pageId = $stateParams.pageId;
    function _templateUrl() {
      if (vm.pageId == 109) {
        vm.tempFile = 'branch'
      }
      else if (vm.pageId == 111) {
        vm.tempFile = 'sub-unit';
      }
      else if (vm.pageId == 29) {
        vm.tempFile = 'department';
      }
      else if (vm.pageId == 30) {
        vm.tempFile = 'designation';
      }
      else if (vm.pageId == 47) {
        vm.tempFile = 'grades';
      }
      else if (vm.pageId == 48) {
        vm.tempFile = 'levels';
      }
      return "app/pages/organization/masters/templates/" + vm.tempFile + "/" + vm.tempFile + "-add.html?" + rndValu2 + "=" + rndValu
    }
  }
})();