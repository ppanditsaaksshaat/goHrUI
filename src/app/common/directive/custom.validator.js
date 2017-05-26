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
        },
        link: function (scope, element, attrs, modelCtrl) {
            console.log(scope)
            console.log(element)
            console.log(attrs)
            console.log(modelCtrl)
            element.on('blur', function (inputValue) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                console.log(inputValue)
                console.log(re.test(inputValue))
                /* send an object to the function */
                scope.callBackMethod({ mustBeTheSame: re.test(inputValue) });
            })

        }
    }
}).directive('validText', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            col: '=ngColumn'
        },
        link: function (scope, element, attrs, modelCtrl) {

            if (!scope.col)
                return;
            console.log(scope.col)
            modelCtrl.$parsers.push(function (inputValue) {
                // debugger;
                var blacklist = 'coconuts,bananas,pears'.split(',');
                console.log(inputValue);
                modelCtrl.$setValidity('blacklist', blacklist.indexOf(inputValue) === -1);
                return inputValue;
            });
        }
    }
})