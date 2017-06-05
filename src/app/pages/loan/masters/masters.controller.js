/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.masters')
    .controller('LoanMastersController1', LoanMastersController1);

  /** @ngInject */
  function LoanMastersController1() {
    console.log('this controller')
    var vm = this;
    vm.navigationCollapsed = true;
    vm.tabs = _getTabs();
    function _getTabs() {
      var mastersMenu = [];
      mastersMenu.push({ name: 'advancetype', text: 'Advance Type Master', id: 257 })
      mastersMenu.push({ name: 'advancerule', text: 'Advance Rule Master ', id: 99 })
      mastersMenu.push({ name: 'advancestatus', text: 'Advance Status Master ', id: 101 })
      mastersMenu.push({ name: 'paymentmode', text: 'Payment Mode Master', id: 296 })
      mastersMenu.push({ name: 'loanprovider', text: 'Loan Prvider Master', id: 103 })
      mastersMenu.push({ name: 'loantype', text: 'Loan Type Master', id: 102 })
      mastersMenu.push({ name: 'loanstatus', text: 'Loan Status Master', id: 256 })
     
      

      return mastersMenu;

    }

  }

})();
