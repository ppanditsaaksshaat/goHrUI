/**
 * @author pardeep.pandit
 * created on 04/09/2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common')
        .controller('browseModalController', browseModalController);

    /** @ngInject */
    function browseModalController($scope, $stateParams, $rootScope, $timeout, DJWebStore, pageService, editFormService,$uibModal) {
        var vm = this;

        $scope.gridOptions = [];
        $scope.uploader = [];
        $scope.fileResult = undefined;


        /**
         * private function
         */
        $scope.upload = _upload;
        function _upload() {

            if ($scope.gridOptions.data != undefined) {
                $rootScope.$broadcast('uploadGridData', $scope.gridOptions);
                $rootScope.modalInstance.dismiss();
            }
            else {
                $scope.showMsg("error", "Please Browse your file")
            }
        }
    }
})();