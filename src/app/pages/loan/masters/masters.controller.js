/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.masters')
    .controller('LoanMastersController1', LoanMastersController1);

  /** @ngInject */
  function LoanMastersController1($scope, $filter, pageService) {
    console.log('this controller')
    var vm = this;
    vm.navigationCollapsed = true;
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


      mastersMenu.push({ name: 'loanprovider', text: 'Loan Provider Master', id: 103 })
      mastersMenu.push({ name: 'loantype', text: 'Loan Type Master', id: 102 })
      // mastersMenu.push({ name: 'loanstatus', text: 'Loan Status Master', id: 256 })
      mastersMenu.push({ name: 'loancategoryrulemaster', text: 'Loan Category Rule Master', id: 104 })



      return mastersMenu;

    }

    _loadController();

  }

})();
