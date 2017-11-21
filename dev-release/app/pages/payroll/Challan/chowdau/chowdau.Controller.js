/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.Challan.chowdau')
    .controller('chowdauController', chowdauController);

  /** @ngInject */
  function chowdauController($scope) {
    $scope.page = { reportId: 56 }
  }

})();
