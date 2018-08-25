/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.locations.location')
        .controller('locationEditController', locationEditController);

    /** @ngInject */
    function locationEditController($scope, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        $scope.selects = $stateParams.param.selects;
        $scope.entity = $stateParams.param.entity;
        $scope.pageid = $stateParams.param.pageid;
        $scope.id = $stateParams.param.id;
        $scope.isEdit = false;
        $scope.oldEntity = angular.copy($stateParams.param.entity);
        $scope.saveForm = _saveForm;
        $scope.action = 'create';
        $scope.countryOnChange = _counrtyOnChange;
        $scope.stateOnChange = _stateOnChange;

        console.log($scope.selects)

        if ($stateParams.param.id > 0) {
            $scope.isEdit = true;
            $scope.action = 'edit';
            $scope.stateList = $scope.selects.StateId;
            $scope.cityList = $scope.selects.LocationCityId;
        }
        $scope.selects.StateList = $scope.selects.StateId;

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }
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
            if (result.success_message == "Added New Record.") {
                $rootScope.showMsg("success", "Record Save Successfully");
            }
            else {
                if (result.success_message == "Record Updated.") {
                    $rootScope.showMsg("success", "Record Updated");
                }
            }
            _childmethod()
            $scope.$close();
            // $state.go('configuration.company.locations.location')
        }

        function _saveFormError(err) {
            alert('error')
        }

        function _counrtyOnChange(countryId) {
            $scope.stateList = [];
            $scope.cityList = [];
            var stateList = $filter("findAll")($scope.selects.StateId, countryId, "CountryId");
            if (stateList != null) {
                $scope.stateList = stateList;
            }
        }

        function _stateOnChange(stateId) {
            $scope.cityList = [];
            var cityList = $filter("findAll")($scope.selects.LocationCityId, stateId, 'StateId');
            if (cityList != null) {
                $scope.cityList = cityList;
            }
        }
    }
})();