/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee')
        .controller('employeeController', employeeController);

    /** @ngInject */
    function employeeController($scope, $state, pageService, localStorageService) {

        function _loadController() {
         //   console.log($stateParam.entity)
             $scope.empBaicDetail = localStorageService.get("empBasicDetailKey");         
        }
        _loadController();
    }
})()