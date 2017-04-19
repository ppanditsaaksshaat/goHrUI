/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employee')
    .controller('OrgEmployeesController', OrgEmployeesController);

  /** @ngInject */
  function OrgEmployeesController(composeModal, mailMessages, pageService) {
   
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
      mastersMenu.push({ name: 'branch', text: 'Branch', id: 109 })
      mastersMenu.push({ name: 'unit', text: 'Sub Unit', id: 111 })
      mastersMenu.push({ name: 'depart', text: 'Departments', id: 29 })
      mastersMenu.push({ name: 'design', text: 'Designation', id: 30 })
      mastersMenu.push({ name: 'grade', text: 'Grades', id: 47 })
      mastersMenu.push({ name: 'level', text: 'Levels', id: 48 })
      return mastersMenu;

    }

  }

})();
