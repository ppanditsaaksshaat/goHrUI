/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters')
    .controller('PayMastersController', PayMastersController);

  /** @ngInject */
  function PayMastersController() {
   
    var vm = this;
   

    vm.tabs = _getTabs();

    function _getTabs() {

      var mastersMenu = [];
      mastersMenu.push({ name: 'location', text: 'Location', id: 34 })
      mastersMenu.push({ name: 'branch', text: 'Branch', id: 109 })
      mastersMenu.push({ name: 'sub-unit', text: 'Sub Unit', id: 111 })
      mastersMenu.push({ name: 'department', text: 'Departments', id: 29 })
      mastersMenu.push({ name: 'designation', text: 'Designation', id: 30 })
      mastersMenu.push({ name: 'grades', text: 'Grades', id: 47 })
      mastersMenu.push({ name: 'levels', text: 'Levels', id: 48 })
      return mastersMenu;

    }

  }

})();
