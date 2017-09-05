/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.absentreport')
    .controller('attreportabsentreportController', attreportabsentreportController);

  /** @ngInject */
  function attreportabsentreportController($scope) {
    $scope.page = { reportId: 17 }
    console.log('attreportabsentreportController')
  }

})();
