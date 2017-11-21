/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees.report')
    .controller('empReportsController', empReportsController);

  /** @ngInject */
  function empReportsController() {
   console.log('empReportsController controller')
    var vm = this;
    
    $scope.page = { reportId: 10 }

  }

})();
