/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .controller('commonAddVerticalFormController', commonAddVerticalFormController);

  /** @ngInject */
  function commonAddVerticalFormController($scope, $stateParams, $timeout, DJWebStore, pageService, editFormService, param) {
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