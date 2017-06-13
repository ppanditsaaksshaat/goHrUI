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
            require: '^form',
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
                console.log(parent)
                if (parent) {
                    $scope.$watch(function () {
                        return parent.isAllowEdit;
                    }, function (newVal) {
                        $scope.isAllowEdit = parent.isAllowEdit;
                    })
                }

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

                $scope.editForm = _editForm;
                $scope.resetForm = _resetForm;
                $scope.clearForm = _clearForm;
                $scope.closeForm = _closeForm;
                $scope.openList = _openList;

                $scope.isShowEdit = _isShowEdit;
                $scope.isShowSave = _isShowSave;
                $scope.isShowReset = _isShowReset;
                $scope.isShowClear = _isShowClear;
                $scope.isShowClose = _isShowClose;
                $scope.isShowList = _isShowList;

                function _isShowEdit() {
                    return !$scope.isAllowEdit;
                }
                function _isShowSave() {
                    return $scope.showSave && $scope.isAllowEdit;
                }
                function _isShowReset() {
                    return $scope.showReset && $scope.isAllowEdit;
                }
                function _isShowClear() {
                    return $scope.showClear && $scope.isAllowEdit;
                }
                function _isShowClose() {
                    return $scope.showClose;
                }
                function _isShowList() {
                    return $scope.showList;
                }

                function _editForm() {
                    parent.isAllowEdit = true;
                    $scope.isAllowEdit = true;
                }

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