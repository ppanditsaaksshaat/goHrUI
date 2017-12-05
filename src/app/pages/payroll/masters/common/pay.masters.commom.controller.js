/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.masters')
    .controller('PayMastersController', PayMastersController);

  /** @ngInject */
  function PayMastersController($scope, $filter, pageService) {

    var vm = this;


    vm.tabs = _getTabs();

    function _loadController() {
      var tabKeys = ''
      angular.forEach(vm.tabs, function (tab) {
        tabKeys += tab.name + ',';
      })
      tabKeys = tabKeys.substr(0, tabKeys.length - 1)
      console.log(tabKeys)
      var postData = JSON.stringify(tabKeys);

      console.log(postData)
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }
      pageService.getTranslateData(data).then(_getSuccessTranslateData, _getErrorTranslateData)

    }

    function _getSuccessTranslateData(result) {
      console.log(result[0]);
      angular.forEach(vm.tabs, function (tab) {
        var resKey = $filter('findObj')(result[0], tab.name, 'ResourceKey')
        console.log(resKey)
        if (resKey != null) {
          tab.text = resKey.ResourceText;
          console.log(tab.text)
        }
      })
    }

    function _getErrorTranslateData(error) {
      console.log(error);
    }

    function _getTabs() {

      var mastersMenu = [];
      mastersMenu.push({ name: 'PayrollSetting', text: 'Payroll Setting', id: 331 })
      mastersMenu.push({ name: 'BonusSetting', text: 'Bonus Setting', id: 474 })
      // mastersMenu.push({ name: 'ESIRule', text: 'ESI Rule', id: 345 })
      // mastersMenu.push({ name: 'OT Rule', text: 'OT Rule', id: 321 })
      // mastersMenu.push({ name: 'SalaryCycleMaster', text: 'Salary Cycle Master', id: 329 })
      // mastersMenu.push({ name: 'LinkSalaryCycleDetail', text: 'Link Salary Cycle Detail', id: 331 })
      // mastersMenu.push({ name: 'PayrollSetting', text: 'Payroll Setting', id: 323 })
      // mastersMenu.push({ name: 'SalaryEntitlement', text: 'Salary Entitlement', id: 132 })
      // mastersMenu.push({ name: 'PayBandMaster', text: 'Pay Band  Master', id: 133 })
      // mastersMenu.push({ name: 'PayBandDetail', text: 'Pay Band Detail', id:136 })
      // mastersMenu.push({ name: 'PayBandRule', text: 'Pay Band  Rule', id: 134 })
      // mastersMenu.push({ name: 'PayBandSlab', text: 'Pay Band Slab', id: 135 })
      // mastersMenu.push({ name: 'EmployeeEntitlement', text: 'Employee Entitlement', id: 183 })

      return mastersMenu;

    }

  }

})();
