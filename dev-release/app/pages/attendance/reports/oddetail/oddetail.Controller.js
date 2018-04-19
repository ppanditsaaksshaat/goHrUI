/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports.oddetail')
    .controller('oddetailController', oddetailController);

  /** @ngInject */
  function oddetailController($scope) {
    $scope.page = { reportId: 66 }
    console.log('oddetailController')
  }

})();
