/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.mis.masterReport')
      .controller('masterReportController', masterReportController);
  
    /** @ngInject */
    function masterReportController($scope) {
      $scope.page = { reportId: 9 }
    }
  
  })();
  