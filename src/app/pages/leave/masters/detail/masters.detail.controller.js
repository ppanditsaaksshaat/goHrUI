/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters')
    .controller('LeaveMastersDetailController', LeaveMastersDetailController);

  /** @ngInject */
  function LeaveMastersDetailController($stateParams, mailMessages) {
    var vm = this;
    vm.mail = mailMessages.getMessageById($stateParams.id);
    vm.label = $stateParams.label;
  }

})();
