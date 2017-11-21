/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.reports.loanOutStanding')
    .controller('loanOutStandingController', loanOutStandingController);

  /** @ngInject */
  function loanOutStandingController($scope) {
    $scope.page = { reportId: 49 }
    // $scope.page = { reportId: 50 }
  }

})();
