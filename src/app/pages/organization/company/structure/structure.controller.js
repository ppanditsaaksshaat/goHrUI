/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.general.structure')
    .controller('structureController', structureController);

  /** @ngInject */
  function structureController() {
  var vm = this;
    vm.navigationCollapsed = true;

    vm.tabs = _getTabs();

    function _getTabs() {
      
      var mastersMenu = [];
      mastersMenu.push({ name: 'location', text: 'Location', id: 34 })
      mastersMenu.push({ name: 'branch', text: 'Branch', id: 109 })
      mastersMenu.push({ name: 'sub-unit', text: 'Sub Unit', id: 111 })
      mastersMenu.push({ name: 'department', text: 'Department', id: 29 })
      mastersMenu.push({ name: 'designation', text: 'Designation', id: 30 })
     
      return mastersMenu;

    }

  }

})();
