/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.leaves.holidayconfbylocation')
        .controller('holidayconfbylocationEditController', holidayconfbylocationEditController);

    /** @ngInject */
    function holidayconfbylocationEditController($scope, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        $scope.selects = $stateParams.param.selects;
        $scope.entity = $stateParams.param.entity;
        $scope.pageid = $stateParams.param.pageid;
        $scope.id = $stateParams.param.id;
        $scope.isEdit = false;
        $scope.oldEntity = angular.copy($stateParams.param.entity);
        $scope.saveForm = _saveForm;
        $scope.action = 'create';
        $scope.locationOnChange = _locationOnChange;
        $scope.branchOnChange = _brachOnChange;

        console.log($scope.selects)

        if ($stateParams.param.id > 0) {
            $scope.isEdit = true;
            $scope.action = 'edit';
            $scope.branchList = $scope.selects.BRId;
            $scope.subUnitList = $scope.selects.HDCBLSubUnitId;
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

        // $scope.GetSelectedCountry = function () {
        //     $scope.strCountry = $scope.countrySrc;
        // };
        // $scope.GetSelectedState = function () {
        //     $scope.strState = $scope.stateSrc;
        // };

        function _saveForm(form) {
            $scope.currentForm = form;
            if (_validateForm(form)) {
                editFormService.saveForm($scope.pageid, $scope.entity,
                    $scope.oldEntity, $scope.action, '')
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

        function _locationOnChange(locationId) {
            $scope.branchList = [];
            $scope.subUnitList = [];
            var branchList = $filter("findAll")($scope.selects.BRId, locationId, "LocationId");
            if (branchList != null) {
                $scope.branchList = branchList;
            }
        }

        function _brachOnChange(brachId) {
            $scope.subUnitList = [];
            var subUnitList = $filter("findAll")($scope.selects.HDCBLSubUnitId, brachId, 'BRId');
            if (subUnitList != null) {
                $scope.subUnitList = subUnitList;
            }
        }
    }
})();