/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.pfContribution')
    .controller('pfContributionController', pfContributionController);

  /** @ngInject */
  function pfContributionController($scope) {
    $scope.page = { reportId: 29 }
  }

})();
