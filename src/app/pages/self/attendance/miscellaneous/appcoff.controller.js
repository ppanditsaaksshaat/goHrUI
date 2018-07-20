/**
 * @author NKM
 * created on 19.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('applyCOffController', applyCOffController);

    /** @ngInject */
    function applyCOffController($scope, $rootScope, $state, pageService, entity) {
        console.log('apply coff')
        // $scope.selects = selects;
        $scope.entity = entity;
    }
})();