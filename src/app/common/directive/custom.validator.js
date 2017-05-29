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
            var column = scope.col;
            console.log(column)
            var regexPattern = {
                email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                pan: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/,
                alpha_space: /^[a-zA-Z ]*$/,
                alpha_nospace: /^[a-zA-Z]*$/,
                alphanum_space: /^[a-zA-Z0-9\-\s]+$/,
                alphanum_nospace: /^[a-zA-Z0-9]+$/,
                mobile: '',
                phone: '',
                telephone: ''
            }

            function ValidatePAN(panNo) {
                var strPanNo = panNo.toString().toUpperCase();
                console.log(strPanNo)
                if (strPanNo.length < 10) {
                    return false;
                }
                else {
                    var panPat = regexPattern.pan;
                    var code = /([C,P,H,F,A,T,B,L,J,G])/;
                    var code_chk = strPanNo.substring(3, 4);
                    if (strPanNo.search(panPat) == -1) {
                        console.log('ptrn failed')
                        return false;
                    }
                    if (code.test(code_chk) == false) {
                        console.log('chk failed')
                        return false;
                    }
                }
                return true;
            }

            scope.$watch(function () {
                return modelCtrl.$viewValue;
            }, function (newVal, oldVal) {
                scope.$parent.$parent.ngModel = modelCtrl;
                console.log('from child', newVal, oldVal)
            });

            //textbox|email|mobile|aadharno|pancard|zipcode|placename_alpha|placename_alphanum|name_nospace|name_withspace

            switch (column.type) {
                case "textbox":
                    break;
                case "name_withspace"://pk:26
                    element.bind('keypress', keypressAlphaWithSpace);
                    break;
                case "name_nospace"://pk:25
                    element.bind('keypress', keypressAlphaNoSpace);
                    break;
                case "placename_alpha"://pk:23
                    element.bind('keypress', keypressAlphaWithSpace);
                    break;
                case "placename_alphanum"://pk:24
                    element.bind('keypress', keypressAlphaNumWithSpace);
                    break;
                case "pancard"://pk:22
                    modelCtrl.$parsers.push(function (inputValue) {
                        var panResult = ValidatePAN(inputValue);
                        modelCtrl.$setValidity('pan', panResult);
                        return inputValue;
                    });
                    break;
                case "aadharno"://pk21
                    modelCtrl.$parsers.push(function (inputValue) {

                        if (inputValue != '') {
                            var aadharResult = ValidateAadharNo(inputValue);
                            modelCtrl.$setValidity('aadhar', aadharResult);
                        }
                        else
                            modelCtrl.$setValidity('aadhar', true);
                        return inputValue;
                    });
                    element.bind('keypress', keypressOnlyNumeric);
                    break;
                case "zipcode"://pk:20
                    modelCtrl.$parsers.push(function (inputValue) {
                        var zipcode = (inputValue.length > 5)

                        modelCtrl.$setValidity('zipcode', !zipcode);
                        return inputValue;
                    });
                    element.bind('keypress', keypressOnlyNumeric);
                    break;


                case "email":
                    modelCtrl.$parsers.push(function (inputValue) {
                        var re = regexPattern.email
                        var emailResult = re.test(inputValue);
                        modelCtrl.$setValidity('emailError', emailResult);

                        return inputValue;
                    });
                    break;
                case "mobile":
                    modelCtrl.$parsers.push(function (inputValue) {
                        var mobileResult = (inputValue.length > 17)

                        modelCtrl.$setValidity('mobile', !mobileResult);
                        return inputValue;
                    });
                    element.bind('keypress', keypressOnlyNumericWithPlus);
                    break;

            }
            //Alpha + Numeric + No Space
            function keypressAlphaNumNoSpace(e) {
                var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                var result = (char.search(regexPattern.alphanum_nospace) == -1)
                if (result) {
                    e.preventDefault();
                    return false;
                }
                modelCtrl.$setValidity('alphanum_nospace', !result);
            }
            //Alpha + No Space
            function keypressAlphaNoSpace(e) {
                var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                var result = (char.search(regexPattern.alpha_nospace) == -1)
                if (result) {
                    e.preventDefault();
                    return false;
                }
                modelCtrl.$setValidity('alpha_nospace', !result);
            }
            //Alpha + Numeric + Space
            function keypressAlphaNumWithSpace(e) {
                var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                var result = (char.search(regexPattern.alphanum_space) == -1)
                if (result) {
                    e.preventDefault();
                    return false;
                }
                modelCtrl.$setValidity('alphanum_space', !result);
            }
            //Alpha + Space
            function keypressAlphaWithSpace(e) {
                var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                var result = (char.search(regexPattern.alpha_space) == -1)
                if (result) {
                    e.preventDefault();
                    return false;
                }
                modelCtrl.$setValidity('alpha_space', !result);
            }
            //Numeric  Only
            function keypressOnlyNumeric(e) {
                var validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                var result = validKeypress(e, validValues);
                //modelCtrl.$setValidity('numeric', !result);
            }
            //Numeric + dash
            function keypressOnlyNumericWithDash(e) {
                var validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-']
                var result = validKeypress(e, validValues);
                modelCtrl.$setValidity('numericDash', !result);
            }
            //Numeric + plus
            function keypressOnlyNumericWithPlus(e) {
                var validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+']
                var result = validKeypress(e, validValues);
                modelCtrl.$setValidity('numericPlus', !result);
            }
            //Numeric + plush + dash
            function keypressOnlyNumericWithPlusDash(e) {
                var validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+']
                var result = validKeypress(e, validValues);
                modelCtrl.$setValidity('numericPlusDash', !result);
            }
            //common keypress
            function validKeypress(e, validValues) {
                var char = String.fromCharCode(e.which || e.charCode || e.keyCode), matches = [];
                angular.forEach(validValues, function (value, key) {
                    if (char === value) matches.push(char);
                }, matches);
                if (matches.length == 0) {
                    e.preventDefault();
                    return false;
                }
                return true;
            }

        }
    }
})