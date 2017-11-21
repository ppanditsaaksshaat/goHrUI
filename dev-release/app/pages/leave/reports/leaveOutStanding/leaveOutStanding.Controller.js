/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.reports.leaveOutStanding')
    .controller('leaveOutStandingController', leaveOutStandingController);

  /** @ngInject */
  function leaveOutStandingController($scope) {
    // $scope.page = { reportId: 49 }
    $scope.page = { reportId: 10 }
  }

})();
