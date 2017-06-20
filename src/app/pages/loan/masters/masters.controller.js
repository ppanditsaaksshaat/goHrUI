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
      
      
      mastersMenu.push({ name: 'loanprovider', text: 'Loan Provider Master', id: 103 })
      mastersMenu.push({ name: 'loantype', text: 'Loan Type Master', id: 102 })
      mastersMenu.push({ name: 'loanstatus', text: 'Loan Status Master', id: 256 })
      mastersMenu.push({ name: 'loancategoryrulemaster', text: 'Loan Category Rule Master', id: 104 })
     
      

      return mastersMenu;

    }

  }

})();
