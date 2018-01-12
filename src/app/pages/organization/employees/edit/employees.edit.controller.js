/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('empEditController', empEditController);

  /** @ngInject */
  /** @ngInject */
  function empEditController($scope, $stateParams,
    pageService, $timeout, $filter) {

    var vm = this;
    vm.pkId = $stateParams.empId;
    vm.tableid = 30;
    vm.tempFile = "profile";
    vm.empBasicDetail = {};

    function _loadController() {
      console.log('emp load controller')
      $timeout(function () {
        pageService.findEntity(vm.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });

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

    function _findEntitySuccessResult(result) {
      console.log(result)
      vm.picture = $filter('appImage')('theme/no-photo.png');
      // alert(result.EmpPhoto1_64URL)
      //vm.picture=result.EmpPhoto1_64URL;
      vm.empBasicDetail = result;
    }
    function _findEntityErrorResult(error) {


    }
    $scope.headerUrlPath = function () {

      return "app/pages/organization/employees/edit/employeeHeader.html";
    }

    $scope.templateUrl = function () {

      return "app/pages/organization/employees/templates/" + vm.tempFile + "/" + vm.tempFile + "-view.html";
    }
    // $scope.temalateUrl1 = function () {
    //   return "app/pages/organization/employee/templates/employeeSideMenu.html";
    // }
    vm.tabs = _getTabs();

    function _getTabs() {
      var mastersMenu = [];
      mastersMenu.push({ name: 'job', text: 'Job', id: 114 })
      mastersMenu.push({ name: 'personal', text: 'Personal', id: 35 })
      mastersMenu.push({ name: 'address', text: 'Address', id: 36 })
      mastersMenu.push({ name: 'family', text: 'Family', id: 52 })
      mastersMenu.push({ name: 'nominee', text: 'Nominee', id: 438 })
      mastersMenu.push({ name: 'identity', text: 'Identity', id: 442 })
      mastersMenu.push({ name: 'account', text: 'Account', id: 125 })
      mastersMenu.push({ name: 'experience', text: 'Experience', id: 56 })
      mastersMenu.push({ name: 'qualification', text: 'Qualification', id: 112 })
      mastersMenu.push({ name: 'skill', text: 'Skill', id: 439 })
      mastersMenu.push({ name: 'salary', text: 'Salary', id: 'entitlement' })
      mastersMenu.push({ name: 'immigration', text: 'Immigration', id: 119 })
      mastersMenu.push({ name: 'document', text: 'Document', id: 188 })
      mastersMenu.push({ name: 'leave', text: 'Leave Detail', id: 36 })
      //mastersMenu.push({ name: 'benefit', text: 'Benefit', id: 448 })
      mastersMenu.push({ name: 'resignation', text: 'Resignation', id: 360 })
      mastersMenu.push({ name: 'role', text: 'Role', id: 21 })
      mastersMenu.push({ name: 'user', text: 'User', id: 'register' })
      mastersMenu.push({ name: 'roster', text: 'Roster', id: 481 })
      // mastersMenu.push({ name: 'report', text: 'Reporting', id: 21 })
      return mastersMenu;

    }

    _loadController();


  }
})();
