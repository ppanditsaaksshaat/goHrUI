/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.locations.location')
        .controller('locationEditController', locationEditController);

    /** @ngInject */
    function locationEditController($scope, $rootScope, $state, $stateParams, pageService, editFormService) {
        $scope.selects = $stateParams.param.selects;
        $scope.entity = $stateParams.param.entity;
        $scope.pageid = $stateParams.param.pageid;
        $scope.id = $stateParams.param.id;
        $scope.isEdit = false;
        $scope.oldEntity = angular.copy($stateParams.param.entity);
        $scope.saveForm = _saveForm;
        $scope.action = 'create';
        if ($stateParams.param.id > 0) {
            $scope.isEdit = true;
            $scope.action = 'edit';
        }
        $scope.selects.StateList = $scope.selects.StateId;

        $scope.changeState = function () {
            console.log('changeState')
            $scope.selects.StateList = $scope.selects.StateId;

            if ($scope.entity.CountryId) {
                if ($scope.entity.CountryId > 0) {
                    $scope.selects.StateList = $filter('findObj')($scope.selects.StateId, $scope.entity.CountryId, 'CountryId')
                }
            }
            console.log($scope.selects.StateList)
        }

        function _saveForm(form) {
            $scope.currentForm = form;
            if (_validateForm(form)) {
                editFormService.saveForm($scope.pageid, $scope.entity,
                        $scope.oldEntity, $scope.action, 'Save')
                    .then(_saveFormSuccess, _saveFormError)
            }
        }

        function _validateForm(form) {
            return true;
        }

        function _saveFormSuccess(result) {

            $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }
    }
})();