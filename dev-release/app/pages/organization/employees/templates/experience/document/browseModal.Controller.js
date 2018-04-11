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
    function documentUploadController($scope, pageService, param) {
        //alert(param)
        /**
         * local variable declaration
         */
        console.log(param)

        var documentTypePageId = 415;
        var documentTypeTableId = 386;


        /**
         * private funtion
         */

        $scope.downloadFile = _downloadFile;


        function _downloadFile() {
            console.log(param)
            pageService.getFile(param.id, 'attach');

        }


    }
})();
