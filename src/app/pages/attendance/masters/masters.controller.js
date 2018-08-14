/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attMastersController1', attMastersController1);

  /** @ngInject */
  function attMastersController1($scope, $filter, pageService) {
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
      mastersMenu.push({ name: 'shiftset', text: 'Shift Set ', id: 289 })
      // mastersMenu.push({ name: 'shiftdetail', text: 'Shift detail ', id: 128 })
      mastersMenu.push({ name: 'holidaymaster', text: 'Holiday Master ', id: 291 })
      mastersMenu.push({ name: 'holidaylocationmap', text: 'holiday by location ', id: 292 })
      mastersMenu.push({ name: 'weekoff', text: 'Shift Weekly OFF ', id: 455 })
      // mastersMenu.push({ name: 'ShiftGroupconfigure', text: 'Shift Group configure ', id: 293 })

      return mastersMenu;

    }

    _loadController();

  }

})();
