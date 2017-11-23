/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('OrgEmpSubMenuController', OrgEmpSubMenuController);

  /** @ngInject */
  function OrgEmpSubMenuController(composeModal, mailMessages, pageService) {
   
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
      mastersMenu.push({ name: 'basic', text: 'Employee Basics', id: 25 })
      mastersMenu.push({ name: 'personal', text: 'Personal Details', id: 35 })
      mastersMenu.push({ name: 'contact', text: 'Contact Details', id: 36 })
      mastersMenu.push({ name: 'job', text: 'Job Description', id: 114 })
      mastersMenu.push({ name: 'resign', text: 'Resignation Details', id: 360 })
      mastersMenu.push({ name: 'sign', text: 'Signature Details', id: 192 })
   //   mastersMenu.push({ name: 'level', text: 'Levels', id: 48 })
      return mastersMenu;

    }

  }

})();
