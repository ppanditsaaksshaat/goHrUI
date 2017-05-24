/**
 * @author deepak.jain
 * created on 23.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('editPanelHead', editPanelHead);
    /** @ngInject */

    function editPanelHead($location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/panelHead/panelHead.html',
            scope: {
                ngPageTitle: '=pageTitle',
                // ngSaveForm: '&saveForm',
                ngResetForm: '&resetForm',
                ngClearForm: '&clearForm',
                ngCondition: '=condition'
            },
            link: function ($scope, elm, attrs, parent) {

                $scope.$watch('ngPageTitle', function (title) {
                    if ($scope.ngPageTitle !== undefined) {
                        $scope.pageTitle = $scope.ngPageTitle;
                    }
                })

               // $scope.saveForm = _saveForm;
                $scope.resetForm = _resetForm;
                $scope.clearForm = _clearForm;
                $scope.employeeList=_employeeList

                // function _saveForm() {
                //     if ($scope.ngSaveForm !== undefined) {
                //         $scope.ngSaveForm();
                //     }
                //     else {
                //         alert('Not Implemented')
                //     }
                // }

                function _resetForm() {
                    if ($scope.ngResetForm !== undefined) {
                        $scope.ngResetForm();
                    }
                    else {
                        alert('Not Implemented')
                    }
                }
                function _clearForm() {
                    if ($scope.ngClearForm !== undefined) {
                        $scope.ngClearForm();
                    }
                    else {
                        alert('Not Implemented')
                    }
                }
                function _employeeList()
                {
                   
                    $state.go("organization.employees.list");
                }
            }
        };
    }

})();