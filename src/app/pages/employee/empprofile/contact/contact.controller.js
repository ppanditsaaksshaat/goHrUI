

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empContactController', empContactController);

    /** @ngInject */
    function empContactController($scope, $state, $stateParams, pageService, dialogModal, param) {
      
        function _loadController() {
            $scope.entity = param;
        }
        _loadController();
    }
})()