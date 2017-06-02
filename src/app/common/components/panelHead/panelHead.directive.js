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
                ngCondition: '=condition',             
                ngCloseForm: '&closeForm',
                ngOpenList: '&openList',
                showSave: '=?showSave',
                showReset: '=?showReset',
                showClear: '=?showClear',
                showClose: '=?showClose',
                showList: '=?showList',
            },
            link: function ($scope, elm, attrs, parent) {
                if ($scope.showSave === undefined)
                    $scope.showSave = true;

                if ($scope.showReset === undefined)
                    $scope.showReset = true;

                if ($scope.showClear === undefined)
                    $scope.showClear = true;

                if ($scope.showClose === undefined)
                    $scope.showClose = false;

                if ($scope.showList === undefined)
                    $scope.showList = true;

                $scope.$watch('ngPageTitle', function (title) {
                    if ($scope.ngPageTitle !== undefined) {
                        $scope.pageTitle = $scope.ngPageTitle;
                    }
                })

                // $scope.saveForm = _saveForm;
                $scope.resetForm = _resetForm;
                $scope.clearForm = _clearForm;
                $scope.closeForm = _closeForm;
                $scope.openList = _openList;

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
                function _closeForm() {
                    if ($scope.ngCloseForm !== undefined) {
                        $scope.ngCloseForm();
                    }
                    else {
                        alert('Not Implemented')
                    }
                }
                function _openList() {
                    if ($scope.ngOpenList !== undefined) {
                        $scope.ngOpenList();
                    }
                    else {
                        $state.go("organization.employees.list");
                    }

                }
            }
        };
    }

})();