/**
 * @author deepak.jain
 * created on 19.06.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.leave.masters')
        .controller('LeaveControlMasterAddController', LeaveControlMasterAddController);

    /** @ngInject */
    function LeaveControlMasterAddController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, param) {
        console.log(param)
        console.log($scope)

        $scope.page = param.page;
        console.log($scope)

    }
})();