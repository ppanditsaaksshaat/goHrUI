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
      mastersMenu.push({ name: 'EPFRule', text: 'EPF Rule', id: 344 })
      mastersMenu.push({ name: 'ESIRule', text: 'ESI Rule', id: 345 })
      mastersMenu.push({ name: 'OT Rule', text: 'OT Rule', id: 321 })
      mastersMenu.push({ name: 'SalaryCycleMaster', text: 'Salary Cycle Master', id: 329 })
      mastersMenu.push({ name: 'LinkSalaryCycleDetail', text: 'Link Salary Cycle Detail', id: 331 })
      mastersMenu.push({ name: 'PayrollSetting', text: 'Payroll Setting', id: 323 })
      mastersMenu.push({ name: 'SalaryEntitlement', text: 'Salary Entitlement', id: 132 })
      mastersMenu.push({ name: 'PayBandMaster', text: 'Pay Band  Master', id: 133 })
      mastersMenu.push({ name: 'PayBandDetail', text: 'Pay Band Detail', id:136 })
      mastersMenu.push({ name: 'PayBandRule', text: 'Pay Band  Rule', id: 134 })
      mastersMenu.push({ name: 'PayBandSlab', text: 'Pay Band Slab', id: 135 })
      
      return mastersMenu;

    }

  }

})();
