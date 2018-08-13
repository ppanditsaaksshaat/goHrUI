/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.general')
        .controller('generalController', generalController);

    /** @ngInject */
    function generalController($scope, editFormService, fileUpload, pageService, $rootScope) {
        //    console.log($state)

        $scope.save = _saveForm;
        $scope.companyList = [];
        $scope.entity = {};
        $scope.oldEntity = {};

        function _loadController() {
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getTableData(498, 495, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }

        function _getTableDataSuccessResult(result) {
            console.log(result)
            if (result != 'NoDataFound') {
                $scope.entity = result[0];
                $scope.oldEntity = angular.copy($scope.entity);
            }
        }

        function _getTableDataErrorResult(err) {
            console.log(err)
        }

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
            // editFormService.saveForm(495, $scope.entity,
            //     $scope.oldEntity, 'create', 'Save')
            //     .then(_saveFormSuccess, _saveFormError)
            // }
            editFormService.saveForm(495, $scope.entity, $scope.oldEntity,
                $scope.entity.GSMId == undefined ? "create" : "edit", 'Save', undefined, true)
                .then(_saveFormSuccess, _saveFormError)
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $rootScope.showMsg("success", "Record Save Successfully");
            }
            else {
                if (result.success_message == "Record Updated.") {
                    $rootScope.showMsg("success", "Record Updated");
                }
            }
            // $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }

        _loadController();
    }
})();
