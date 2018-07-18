/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.locations.location')
        .controller('locationEditController', locationEditController);

    /** @ngInject */
    function locationEditController($scope, $rootScope, $state, pageService, entity, selects) {
        
        $scope.selects = selects;
        $scope.entity = entity;
    }
})();