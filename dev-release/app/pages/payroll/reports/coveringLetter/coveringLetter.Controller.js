/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.reports.coveringLetter')
    .controller('coveringLetterController', coveringLetterController);

  /** @ngInject */
  function coveringLetterController($scope) {
    $scope.page = { reportId: 23 }
  }

})();
