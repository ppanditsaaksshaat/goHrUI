/**
 * @author pardeep.pandit
 * created on 22.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('fieldBox', fieldBox);
    /** @ngInject */
    function fieldBox($location, $state, $compile, $rootScope) {
        return {
            restrict: 'E',
            require: ['^form'],
            templateUrl: 'app/common/components/fieldBox/fieldBox.html',
            scope: {
                col: '=ngColumn',
                entity: '=ngEntity',
                editForm: '=form'
            },
            link: function ($scope, $elm, $attrs, $ctrl) {


                $elm.bind('click', function (evt) {
                    var ngModel = $ctrl[0][$scope.col.name];
                    var col = $scope.col;
                    var form = $scope.editForm;
                })


                $scope.hasSuccess = function () {
                    var ngModel = $ctrl[0][$scope.col.name];
                    if (!ngModel) {
                        return false;
                    }
                    return (!ngModel.$isEmpty(ngModel.$modelValue) && ngModel.$valid && ngModel.$dirty)
                };

                $scope.hasError = function () {
                    var ngModel = $ctrl[0][$scope.col.name];
                    if (!ngModel) {
                        return false;
                    }
                    return ngModel.$invalid && !ngModel.$pristine;
                };
                $scope.hasWarning = function () {
                    return false;
                }
                $scope.hasRequired = function () {
                    return $scope.col.required && !$scope.hasSuccess() && !$scope.hasError() && !$scope.hasWarning();
                };
            }
        };
    }

})();