/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.loan.reports.empLoanDetail')
      .controller('empLoanDetailController', empLoanDetailController);
  
    /** @ngInject */
    function empLoanDetailController($scope) {
      $scope.page = { reportId: 10 }
      
    }
  
  })();
  