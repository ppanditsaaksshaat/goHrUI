/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.masters')
    .controller('empMastersController', empMastersController);

  /** @ngInject */
  function empMastersController($scope) {

    // $scope.config.setHeight = 450;
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
      mastersMenu.push({ name: 'grades', text: 'Grade', id: 47 })
      mastersMenu.push({ name: 'levels', text: 'Level', id: 48 })
      mastersMenu.push({ name: 'titles', text: 'Title', id: 24 })
      mastersMenu.push({ name: 'gender', text: 'Gender', id: 31 })
      mastersMenu.push({ name: 'marital', text: 'Marital Status', id: 32 })
      mastersMenu.push({ name: 'emptype', text: 'Employment', id: 115 })
      mastersMenu.push({ name: 'category', text: 'Category', id: 46 })
      mastersMenu.push({ name: 'empstat', text: 'Employee Status', id: 54 })
      mastersMenu.push({ name: 'relationship', text: 'Relationship ', id: 51 })
      mastersMenu.push({ name: 'bank-branch', text: 'Bank Branch ', id: 37 })
      mastersMenu.push({ name: 'qualification', text: 'Qualification ', id: 38 })
      mastersMenu.push({ name: 'other-qualification', text: 'Other Qualification ', id: 43 })
      mastersMenu.push({ name: 'skill', text: 'Skill ', id: 45 })
      mastersMenu.push({ name: 'benefit', text: 'Benefit ', id: 447 })
      mastersMenu.push({ name: 'identity', text: 'Identity ', id: 476 })
      return mastersMenu;

    }

  }

})();
