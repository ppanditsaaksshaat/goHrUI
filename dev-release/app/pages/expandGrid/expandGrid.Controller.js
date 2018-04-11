/**
 * @author pardeep.pandit
 * created on 08.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .controller('expandGridController', expandGridController);

    /** @ngInject */
    function expandGridController($scope, $rootScope,
        pageService, DJWebStore, dialogModal, $timeout, $filter, $http, param) {

        $scope.expandedGridOptions = param.expandedGridOptions;
        $scope.title = 'Expanded Grid';
        if (param.title) {
            $scope.title = param.title;
        }
        console.log(param)

        $scope.close = function(){
            console.log($rootScope.modalInstance)
            $rootScope.modalInstance.dismiss();
        }
    }
})();
