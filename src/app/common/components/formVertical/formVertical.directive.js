/**
 * @author deepak.jain
 * created on 17.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('formVertical', formVertical);
    /** @ngInject */
    function formVertical($rootScope, $location, $state, $timeout, editFormService, pageService) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/formVertical/formVertical.html',
            scope: {
                page: '='
            },
            link: function (scope, elm, attrs) {
                console.log($rootScope.modalInstance)
                scope.modalInstance = $rootScope.modalInstance;
                scope.entity = {};
                scope.form = {};
                scope.page.formrows = [];
                scope.oldEntity = {};

                if (scope.page !== undefined) {

                    //find tabs
                    angular.forEach(scope.page.pageinfo.viewform, function (tab) {
                        //find rows
                        angular.forEach(tab.rows, function (row) {
                            //find columns
                            angular.forEach(row, function (col) {
                                if (col.name != scope.page.pageinfo.idencolname) {
                                    scope.page.formrows.push(col);
                                }
                            })
                        })
                    })
                }

                if (scope.page.pkId !== undefined) {
                    if (scope.page.pkId > 0) {
                        _findEntity();
                    }
                }

                scope.saveForm = _saveForm;

                function _findEntity() {
                    scope.form.isLoaded = false;
                    scope.form.isLoading = true;
                    $timeout(function () {
                        pageService.findEntity(scope.page.pageinfo.tableid, scope.page.pkId, undefined).then(
                            _findEntitySuccessResult, _findEntityErrorResult);
                    });
                }
                function _findEntitySuccessResult(result) {
                    scope.form.isLoaded = true;
                    scope.form.isLoading = false;
                    scope.entity = result;
                    console.log(scope.entity)
                    scope.oldEntity = angular.copy(result)
                }
                function _findEntityErrorResult(err) {
                    scope.form.isLoaded = true;
                    scope.form.isLoading = false;
                }
                function _validateForm(form) {
                    return true;
                }
                function _saveForm(form) {
                    if (_validateForm(form)) {
                        editFormService.saveForm(scope.page.pageinfo.pageid, scope.entity,
                            scope.oldEntity, scope.page.action, scope.page.pageinfo.tagline)
                    }
                }

                scope.$on('form-success', function (successEvent, result) {
                    if (result.entity[scope.page.pageinfo.idencolname] !== undefined) {
                        scope.modalInstance.dismiss('cancel');
                    }
                })
            }
        };
    }

})();