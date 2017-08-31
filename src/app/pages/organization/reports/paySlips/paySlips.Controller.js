/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.reports.paySlips')
    .controller('paysSlipchallanController', paysSlipchallanController);

  /** @ngInject */
  function paysSlipchallanController($scope) {
    $scope.page = { reportId: 19 }

  }

})();
