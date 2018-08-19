/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.level')
        .controller('levelEditController', levelEditController);

    /** @ngInject */
    function levelEditController($scope, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
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

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

      
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
    }
})();