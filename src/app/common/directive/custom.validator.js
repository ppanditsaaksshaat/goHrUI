angular.module('BlurAdmin.common').directive('noSpecialChar', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                console.log(scope, element, attrs, modelCtrl)
                if (inputValue == null)
                    return ''
                cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
}).directive('numericOnly', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''

                cleanInputValue = inputValue.replace(/[^0-9]+/g, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
}).directive('textOnly', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''

                cleanInputValue = inputValue.replace(/[^a-zA-Z]+/g, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
}).directive('textOnlyWithSpace', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''

                cleanInputValue = inputValue.replace(/[^a-z A-Z]+/g, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
}).directive('textToUpperCase', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''

                cleanInputValue = inputValue.toUpperCase()
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
}).directive('checkValidEmail', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            callBackMethod: '&callback',
            onChange: '$'
        },
        link: function (scope, element, attrs, modelCtrl) {
            $scope.on('blur', function (inputValue) {
                // if ($scope.onChange !== undefined || $scope.onChange !== null) {
                //     $scope.onChange(changeEvent);
                // }
                // else {
                //     //directive self todo code here
                // }
                 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                console.log(inputValue)
                console.log(re.test(inputValue))
                /* send an object to the function */
                scope.callBackMethod({ mustBeTheSame: re.test(inputValue) });
            })
            // modelCtrl.$parsers.push(function (inputValue) {
            //     if (inputValue == null)
            //         return ''
            //     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //     console.log(inputValue)
            //     console.log(re.test(inputValue))
            //     /* send an object to the function */
            //     scope.callBackMethod({ mustBeTheSame: re.test(inputValue) });
            //     //  return  re.test(inputValue);
            //     // cleanInputValue = inputValue.toUpperCase()
            //     // if (cleanInputValue != inputValue) {
            //     //     modelCtrl.$setViewValue(cleanInputValue);
            //     //     modelCtrl.$render();
            //     // }
            //     // return cleanInputValue;
            // });
        }
    }
});