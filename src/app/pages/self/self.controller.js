/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self')
        .controller('selfController', selfController);

    /** @ngInject */
    function selfController($scope, $state) {
        console.log($scope)
        console.log($scope.user)

    }
})();
