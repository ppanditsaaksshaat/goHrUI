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

                $scope.dynamicPopover = {
                    content: 'Hello, World!',
                    templateUrl: 'myPopoverTemplate.html',
                    title: 'Title'
                };

                $scope.ngModel = {};

                $scope.$watch(
                    function () {
                        return $scope.ngModel.$viewValue;
                    },
                    function (newVal, oldVal) {
                        console.log('from fieldBox', $scope.ngModel)
                        if ($scope.ngModel.$viewValue == '') {
                            $scope.col.errorText = '';
                            $scope.col.showError = false;
                        }
                        else {
                            if ($scope.ngModel.$error) {
                                if ($scope.ngModel.$error.onlydigitanddash) {
                                    $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> ' +
                                        'Only 0-9 and - are allowed for ' + $scope.col.text;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.pan) {
                                    $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> Please enter valid '
                                        + $scope.col.text;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.emailError) {
                                    $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> Please enter valid '
                                        + $scope.col.text;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.aadhar) {
                                    $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> Please enter valid '
                                        + $scope.col.text;
                                    $scope.col.showError = true;
                                }
                                else if ($scope.ngModel.$error.minlength) {
                                    $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> '
                                        + $scope.col.text + ' is to short.'
                                    $scope.col.showError = true;
                                }

                                else {
                                    $scope.col.errorText = '';
                                    $scope.col.showError = false;
                                }
                            }
                        }
                        //console.log('from field box', $scope.ngModel)
                        //console.log('new val from field', newVal, 'old val', oldVal);
                    });

                $scope.$watch(function () {
                    return $ctrl[0].$submitted;
                }, function (newVal, oldVal) {
                    if ($ctrl[0].$submitted) {
                        // $scope.col.errorText = '<i class="fa fa-exclamation-triangle fa-lg font-red" aria-hidden="true"></i> ' +
                        //     $scope.col.text + ' is required.'
                        // $scope.col.showError = true;

                    }
                })
                // if (!$scope.entity)
                //     return;
                // console.log($scope.entity)
                // if (!editForm[$scope.col.name])
                //     return;

                // var ngModel = $ctrl[0];
                // if (!ngModel) 
                //     return;

                // $elm.bind('click', function (evt) {
                //     // var ngModel = $ctrl[0][$scopecol.name];
                //     var col = $scope.col;
                //     var form = $scope.editForm;
                //     console.log(col, form, $scope.entity)
                //     console.log($ctrl)
                // })

                function _validModel() {
                    if (!$scope.ngModel) {
                        return false;
                    }
                    if (!$scope.ngModel.$modelValue) {
                        return false;
                    }
                    return true;
                }
                $scope.hasSuccess = function () {
                    if (!_validModel())
                        return false;
                    return (!$scope.ngModel.$isEmpty($scope.ngModel.$modelValue)
                        && $scope.ngModel.$valid && $scope.ngModel.$dirty)
                };

                $scope.hasError = function () {
                    if (!_validModel())
                        return false;

                    return $scope.ngModel.$invalid && !$scope.ngModel.$pristine;
                };
                $scope.hasWarning = function () {
                    if (!_validModel())
                        return false;
                    return false;
                }
                $scope.hasRequired = function () {

                    var isSubmitted = false;
                    if ($ctrl[0])
                        isSubmitted = $ctrl[0].$submitted;
                    return !isSubmitted && $scope.col.required && !$scope.hasSuccess()
                        && !$scope.hasError() && !$scope.hasWarning();
                };

                // ngModel.$parsers.push(function (value) {
                //     debugger;
                //     var blacklist = 'coconuts,bananas,pears'.split(',');
                //     console.log(value);
                //     ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
                //     return value;
                // });

                // console.log(ngModel)




            }
        };
    }

})();