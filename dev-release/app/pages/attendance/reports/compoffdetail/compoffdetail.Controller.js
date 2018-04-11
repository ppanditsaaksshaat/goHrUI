/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.compoffdetail')
    .controller('cOffdetailController', cOffdetailController);

  /** @ngInject */
  function cOffdetailController($scope) {
    $scope.page = { reportId: 65 }
    console.log('cOffdetailController')
  }

})();
