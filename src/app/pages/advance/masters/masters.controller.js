/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.masters')
    .controller('advMastersController1', advMastersController1);

  /** @ngInject */
  function advMastersController1() {
    console.log('this controller')
    var vm = this;
    vm.navigationCollapsed = true;
    vm.tabs = _getTabs();
    function _getTabs() {
      var mastersMenu = [];
      mastersMenu.push({ name: 'Advancetype', text: 'Advance  type ', id: 257 })
    //  mastersMenu.push({ name: 'shiftdetail', text: 'Shift detail ', id: 128 })
  
      
      return mastersMenu;

    }

  }

})();
