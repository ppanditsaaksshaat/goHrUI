/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.masters')
    .controller('advMastersController1', advMastersController1);

  /** @ngInject */
  function advMastersController1($scope, $filter, pageService) {
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
      mastersMenu.push({ name: 'advancetype', text: 'Advance Type Master', id: 257 })
      mastersMenu.push({ name: 'advancerule', text: 'Advance Rule Master ', id: 99 })
      mastersMenu.push({ name: 'advancestatus', text: 'Advance Status Master ', id: 101 })
      return mastersMenu;
    }

    _loadController();

  }

})();
