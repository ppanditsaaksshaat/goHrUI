/**
 * @author pardeep pandit
 * created on 4.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('documentUploadController', documentUploadController);

    /** @ngInject */
    /** @ngInject */
    function documentUploadController($scope, $stateParams,
        pageService, $timeout, $filter, editFormService, $state, dialogModal,pageService) {

        /**
         * local variable declaration
         */
        var documentTypePageId = 415;
        var documentTypeTableId = 386;


        /**
         * private funtion
         */

        $scope.upload = _upload;

        function _upload() {
            console.log($scope.file)
            pageService.saveFileAttach($scope.file,documentTypePageId,documentTypeTableId)

        }


    }
})();
