/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters')
    .controller('LeaveMastersController', LeaveMastersController);

  /** @ngInject */
  function LeaveMastersController(composeModal, mailMessages, pageService) {
   
    var vm = this;
    vm.navigationCollapsed = true;
    vm.showCompose = function (subject, to, text) {
      composeModal.open({
        subject: subject,
        to: to,
        text: text
      })
    };

    vm.tabs = _getTabs();

    function _getTabs() {

      var mastersMenu = [];
      mastersMenu.push({ name: 'DayCriteria', text: 'DayCriteria', id: 262 })
      mastersMenu.push({ name: 'LeaveType', text: 'LeaveType', id: 260 })
      mastersMenu.push({ name: 'leaveapplication', text: 'leaveapplication', id: 157 })
      return mastersMenu;

    }

  }

})();
