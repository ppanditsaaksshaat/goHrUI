/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters')
    .controller('attMastersDetailController', attMastersDetailController);

  /** @ngInject */
  function attMastersDetailController($stateParams, mailMessages) {
    var vm = this;

    function _loadController() {
      vm.page = param.page;
      vm.page.action = param.action;
      vm.page.linkColumns = param.linkColumns;
      vm.pkId = 0;
      if (param.action != 'create')
        if (param.entity !== undefined) {
          vm.page.pkId = param.entity[vm.page.pageinfo.idencolname];
          vm.page.entity = param.entity;
        }
    }
    _loadController();
  }

})();
