/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.general')
        .controller('generalController', generalController);

    /** @ngInject */
    function generalController($scope, editFormService, fileUpload) {
        //    console.log($state)

        $scope.save = _saveForm;
        $scope.companyList = [];
        $scope.oldEntity = {};

        function _saveForm() {
            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            // var uploadUrl = "/fileUpload";
            var uploadUrl = "/assets/companydirectory/saaksshaat";
            console.log(uploadUrl, file.name)
            fileUpload.uploadFileToUrl(file, 'uploadUrl');
            // $scope.entity.GSMPath = "abc";
            $scope.entity.GSMPath = uploadUrl;
            // $scope.entity.GSMPath = "asdas";
            console.log($scope.entity.GSMPath)
            // console.log(fileUpload.uploadFileToUrl(file, uploadUrl))
            // console.log('save record')
            // $scope.currentForm = form;
            // if (_validateForm(form)) {
            editFormService.saveForm(495, $scope.entity,
                $scope.oldEntity, 'create', 'Save')
                .then(_saveFormSuccess, _saveFormError)
            // }
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {
            console.log(result)
            $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }
    }
})();
