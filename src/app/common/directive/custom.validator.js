angular.module('BlurAdmin.common').directive('noSpecialChar', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                //console.log(scope, element, attrs, modelCtrl)
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
}).directive('validText', function ($compile) {
    return {
        require: 'ngModel',
        restrict: 'AE',
        scope: {
            col: '=ngColumn',
            ngModel: '=ngModel'
        },
        controller: function ($scope, $timeout) {
            $scope.dateTimeNow = function () {
                $scope.date = new Date();
            };
            $scope.dateTimeNow();

            $scope.toggleMinDate = function () {
                var minDate = new Date();
                var maxDate = new Date();
                // set to yesterday
                minDate.setDate(minDate.getDate() - 1);
                maxDate.setDate(maxDate.getDate() + 3);
                $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : minDate;
                //    $scope.dateOptions.maxDate = $scope.dateOptions.maxDate ? null : maxDate;
            };

            $scope.dateOptions = {
                showWeeks: false,
                startingDay: 0
            };

            $scope.toggleMinDate();

            // Disable weekend selection
            $scope.disabled = function (calendarDate, mode) {
                return mode === 'day' && (calendarDate.getDay() === 0 || calendarDate.getDay() === 6);
            };

            $scope.open = function ($event, opened) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.dateOpened = true;
            };

            $scope.dateOpened = false;
            $scope.hourStep = 1;
            $scope.format = "dd-MMM-yyyy";
            $scope.minuteStep = 15;
            // add min-time="minTime" to datetimepicker to use this value 
            $scope.minTime = new Date(0, 0, 0, Math.max(1, $scope.date.getHours() - 2), 0, 0, 0);

            $scope.timeOptions = {
                hourStep: [1, 2, 3],
                minuteStep: [1, 5, 10, 15, 25, 30]
            };

            $scope.showMeridian = false;
            $scope.timeToggleMode = function () {
                $scope.showMeridian = !$scope.showMeridian;
            };

            $scope.$watch("date", function (date) {
                // read date value
            }, true);

            $scope.resetHours = function () {
                $scope.date.setHours(1);
            };
        },
        link: function (scope, element, attrs, modelCtrl) {
            if (!scope.col)
                return;

            var column = scope.col;

            if (column.type == 'datepicker') {

                var dtPicTemplate = '<datetimepicker hour-step="hourStep" minute-step="minuteStep" ng-model="ngModel" show-meridian="showMeridian" date-format="{{format}}" ' +
                    '                date-options="dateOptions" date-disabled="disabled(date, mode)" datepicker-append-to-body="false" readonly-date="true" ' +
                    '                disabled-date="false"`` hidden-time="true" hidden-date="false" name="datetimepicker" show-spinners="true" ``readonly-time="false" ' +
                    '                date-opened="dateOpened" show-button-bar="false" min-date="minDate" max-date="maxDate"> ' +
                    '</datetimepicker>'
                element.append($compile(dtPicTemplate)(scope));//addding compiled element
            }


            var regexPattern = undefined;
            var matchPattern = undefined;
            if (column.match) {
                matchPattern = column.match.split(',');
            }
            if (column.pattern) {
                regexPattern = new RegExp(column.pattern, 'g')
            }
            console.log(column)

            function ValidatePAN(panNo) {
                var strPanNo = panNo.toString().toUpperCase();
                //console.log(strPanNo)
                if (strPanNo.length < 10) {
                    return false;
                }
                else {
                    var panPat = regexPattern.pan;
                    var code = /([C,P,H,F,A,T,B,L,J,G])/;
                    var code_chk = strPanNo.substring(3, 4);
                    if (strPanNo.search(panPat) == -1) {
                        //console.log('ptrn failed')
                        return false;
                    }
                    if (code.test(code_chk) == false) {
                        //console.log('chk failed')
                        return false;
                    }
                }
                return true;
            }

            scope.$watch(function () {
                return modelCtrl.$viewValue;
            }, function (newVal, oldVal) {
                scope.$parent.$parent.ngModel = modelCtrl;
                console.log('from validText', newVal, oldVal)
            });

            //textbox|email|mobile|aadharno|pancard|zipcode|placename_alpha|placename_alphanum|name_nospace|name_withspace

            switch (column.type) {
                case "textbox":
                    break;
                case "alphanum_nospace":
                case "alphanum_space":
                case "alpha_nospace":
                case "alpha_space":
                case "pincode":
                case "zipcode":
                case "number_plus":
                case "number_dash_plus":
                case "number_dash":
                case "number_decimal":
                case "number_nodecimal":
                    modelCtrl.$parsers.push(function (inputValue) {
                        if (regexPattern) {
                            var cleanInputValue = inputValue.replace(regexPattern, '');
                            var re = regexPattern
                            var result = re.test(inputValue);
                            console.log(result)
                            modelCtrl.$setValidity(column.type, result);
                        }

                        return inputValue;
                    });


                    element.bind('keypress', function (e) {
                        if (matchPattern) {


                            var result = validKeypress(e, matchPattern);
                            modelCtrl.$setValidity(column.type, result);
                        }
                        else if (regexPattern) {
                            var char = String.fromCharCode(e.which || e.charCode || e.keyCode);
                            var result = (char.search(regexPattern) == -1)
                            if (result) {
                                e.preventDefault();
                                return false;
                            }
                        }
                    });

                    break;

                case "pancard"://pk:22
                    modelCtrl.$parsers.push(function (inputValue) {

                        var cleanInputValue = inputValue.toUpperCase()
                        if (cleanInputValue != inputValue) {
                            modelCtrl.$setViewValue(cleanInputValue);
                            modelCtrl.$render();
                        }
                        var panResult = true;
                        if (regexPattern) {
                            if (cleanInputValue.length < 10) {
                                panResult = false;
                            }
                            else {
                                var panPat = regexPattern;
                                var code = /([C,P,H,F,A,T,B,L,J,G])/;
                                var code_chk = cleanInputValue.substring(3, 4);
                                if (cleanInputValue.search(panPat) == -1) {
                                    //console.log('ptrn failed')
                                    panResult = false;
                                }
                                if (code.test(code_chk) == false) {
                                    //console.log('chk failed')
                                    panResult = false;
                                }
                            }
                        }

                        modelCtrl.$setValidity('pan', panResult);

                        return cleanInputValue;
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
                case "email"://pk:13
                    modelCtrl.$parsers.push(function (inputValue) {
                        if (regexPattern) {
                            // var cleanInputValue = inputValue.replace(regexPattern, '');
                            // var re = regexPattern
                            var result = regexPattern.test(inputValue);
                            if (!result) {
                                var cleanInputValue = inputValue.toUpperCase();
                                if (cleanInputValue.endsWith('.IN'))
                                    result = true;
                                if (cleanInputValue.endsWith('.ORG'))
                                    result = true;
                            }
                            modelCtrl.$setValidity('emailError', result);
                        }

                        return inputValue;
                    });
                    break;
                case "mobile"://pk:17
                    modelCtrl.$parsers.push(function (inputValue) {
                        var mobileResult = (inputValue.length > 17)

                        modelCtrl.$setValidity('mobile', !mobileResult);
                        return inputValue;
                    });
                    element.bind('keypress', keypressOnlyNumericWithPlus);
                    break;
                case "phoneno"://pk:34
                    modelCtrl.$parsers.push(function (inputValue) {
                        //  (inputValue.length > column.minLength)

                        // modelCtrl.$setValidity('phone', !mobileResult);
                        return inputValue;
                    });
                    element.bind('keypress', keypressOnlyNumericWithPlusDash);
                    break;
                case "currency":
                case "currency_2decimal":
                case "currency_3decimal":
                    var format = {
                        prefix: '',
                        centsSeparator: '.',
                        thousandsSeparator: '',
                        centsLimit: 0
                    };
                    if (column.type == 'currency_2decimal') {
                        format.centsLimit = 2;
                    }
                    if (column.type == 'currency_3decimal') {
                        format.centsLimit = 3;
                    }

                    modelCtrl.$parsers.unshift(function (value) {
                        element.priceFormat(format);
                        console.log('parsers', element[0].value);
                        return element[0].value;
                    });

                    modelCtrl.$formatters.unshift(function (value) {
                        element[0].value = modelCtrl.$modelValue * 100;
                        element.priceFormat(format);
                        console.log('formatters', element[0].value);
                        return elem[0].value;
                    })
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
            //==============================================
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
            //Numeric + decimal
            function keypressOnlyNumericWithDecimal(e) {
                var validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
                var result = validKeypress(e, validValues);
                modelCtrl.$setValidity('numericDecimal', !result);
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
}).directive('validCurrency', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
            col: '=ngColumn'
        },
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            if (!scope.col) return;
            var column = scope.col;
            scope.$watch(function () {
                return modelCtrl.$viewValue;
            }, function (newVal, oldVal) {
                scope.$parent.$parent.ngModel = modelCtrl;
                //console.log('from child', newVal, oldVal)
            });


        }
    };
}]);
