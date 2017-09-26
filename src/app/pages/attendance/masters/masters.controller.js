/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attMastersController1', attMastersController1);

  /** @ngInject */
  function attMastersController1() {
    console.log('this controller')
    var vm = this;
    vm.navigationCollapsed = true;
    vm.tabs = _getTabs();
    function _getTabs() {
      var mastersMenu = [];
      mastersMenu.push({ name: 'shiftset', text: 'Shift Set ', id: 289 })
      // mastersMenu.push({ name: 'shiftdetail', text: 'Shift detail ', id: 128 })
      mastersMenu.push({ name: 'holidaymaster', text: 'holiday master ', id: 291 })
      mastersMenu.push({ name: 'holidaylocationmap', text: 'holiday by Location ', id: 292 })
      mastersMenu.push({ name: 'weekoff', text: 'Shift Weekly OFF ', id: 455 })
      // mastersMenu.push({ name: 'ShiftGroupconfigure', text: 'Shift Group configure ', id: 293 })

      return mastersMenu;

    }

  }

})();
