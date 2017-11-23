/**
 * @author deepak.jain
 * created on 122.06.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('reportingController', reportingController);

    /** @ngInject */
    /** @ngInject */
    function reportingController($scope, $stateParams,
        pageService, $timeout, $filter) {     
        var vm = this;
        vm.empPKId = $stateParams.empId;
        vm.queryId = 187;


        function _loadController() {

          
        }

      



        _loadController();

    }
})();
