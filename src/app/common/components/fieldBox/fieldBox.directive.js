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
                // var ngModel = $ctrl[0];
                // if (!ngModel)
                //     return;

                // $elm.bind('click', function (evt) {
                //     // var ngModel = $ctrl[0][$scopecol.name];
                //     var col = $scope.col;
                //     var form = $scope.editForm;
                // })


                // $scope.hasSuccess = function () {
                //     if (!ngModel) {
                //         return false;
                //     }
                //     return (!ngModel.$isEmpty(ngModel.$modelValue) && ngModel.$valid && ngModel.$dirty)
                // };

                // $scope.hasError = function () {
                //     if (!ngModel) {
                //         return false;
                //     }
                //     return ngModel.$invalid && !ngModel.$pristine;
                // };
                // $scope.hasWarning = function () {
                //     return false;
                // }
                // $scope.hasRequired = function () {
                //     // return ngModel.$error.required
                //     return $scope.col.required && !$scope.hasSuccess() && !$scope.hasError() && !$scope.hasWarning();
                // };

                // ngModel.$parsers.push(function (value) {
                //     debugger;
                //     var blacklist = 'coconuts,bananas,pears'.split(',');
                //     console.log(value);
                //     ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
                //     return value;
                // });

                // console.log(ngModel)



                function ValidateAADHARNo(aadharNo) {
                    var strAadharNo = aadharNo.toString();

                    if (strAadharNo.length < 12)
                        return false;
                    else {
                        if (strAadharNo.startsWith('0')) {
                            return false;
                        }
                        else {

                            if (strAadharNo == '999999999999') {
                                return false;
                            }
                            //if (strAadharNo.startsWith('9999')) {
                            //    return false;
                            //}
                            //if (strAadharNo.startsWith('1234')) {
                            //    return false;
                            //}
                            //if (strAadharNo.startsWith('7890')) {
                            //    return false;
                            //}
                            //if (strAadharNo.startsWith('1212')) {
                            //    return false;
                            //}
                            //if (strAadharNo.startsWith('2323')) {
                            //    return false;
                            //}
                            ////ends with
                            //if (strAadharNo.endsWith('2323')) {
                            //    return false;
                            //}
                            //if (strAadharNo.endsWith('1212')) {
                            //    return false;
                            //}
                            //if (strAadharNo.endsWith('1234')) {
                            //    return false;
                            //}
                            //if (strAadharNo.endsWith('9999')) {
                            //    return false;
                            //}
                            //if (strAadharNo.endsWith('7890')) {
                            //    return false;
                            //}
                            //if (strAadharNo.endsWith('8888')) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('0000') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('1111') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('2222') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('3333') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('4444') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('5555') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('6666') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('7777') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('8888') > 0) {
                            //    return false;
                            //}
                            //if (strAadharNo.indexOf('9999') > 0) {
                            //    return false;
                            //}
                            var result = validateAadhaar(strAadharNo)
                            return result;
                        }
                    }
                }

                // multiplication table d
                var d = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
                    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
                    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
                    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
                    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
                    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
                    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
                    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
                    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
                ];

                // permutation table p
                var p = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
                ];

                // inverse table inv
                var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

                // converts string or number to an array and inverts it
                function invArray(array) {

                    if (Object.prototype.toString.call(array) === "[object Number]") {
                        array = String(array);
                    }

                    if (Object.prototype.toString.call(array) === "[object String]") {
                        array = array.split("").map(Number);
                    }

                    return array.reverse();

                }

                // generates checksum
                function generate(array) {

                    var c = 0;
                    var invertedArray = invArray(array);

                    for (var i = 0; i < invertedArray.length; i++) {
                        c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
                    }

                    return inv[c];
                }

                // validates checksum
                function validateAadhaar(array) {
                    var c = 0;
                    var invertedArray = invArray(array);
                    console.log(invertedArray)
                    for (var i = 0; i < invertedArray.length; i++) {
                        c = d[c][p[(i % 8)][invertedArray[i]]];
                    }

                    return (c === 0);
                }
            }
        };
    }

})();