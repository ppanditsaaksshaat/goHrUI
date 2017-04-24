/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('AttendanceMastersDetailController', AttendanceMastersDetailController);

  /** @ngInject */
  function AttendanceMastersDetailController($stateParams, mailMessages) {
    var vm = this;
    vm.mail = mailMessages.getMessageById($stateParams.id);
    vm.label = $stateParams.label;
  }

})();
