/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters')
    .controller('LeaveMastersController1', LeaveMastersController1);

  /** @ngInject */
  function LeaveMastersController1() {
    console.log('this controller')
    var vm = this;
    vm.navigationCollapsed = true;
    vm.tabs = _getTabs();
    function _getTabs() {
      var mastersMenu = [];
      mastersMenu.push({ name: 'daycriteria', text: 'Day Criteria Master ', id: 262 })
      mastersMenu.push({ name: 'leavetype', text: 'Leave Type ', id: 260 })
      mastersMenu.push({ name: 'leavecontrol', text: 'Leave Control Master', id: 261 })
      // mastersMenu.push({ name: 'leavetransaction', text: 'Leave Transaction Detail', id: 270 })
      // mastersMenu.push({ name: 'employeeleavedetail', text: 'Employee Leave Transaction', id: 284 })
      // mastersMenu.push({ name: 'leavestatement', text: 'Leave Statement', id: 443 })
      mastersMenu.push({ name: 'employeeleaveentitlement', text: 'Leave Entitlement', id: 265 })



      return mastersMenu;

    }

  }

})();
