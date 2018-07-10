/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfsalary')
        .controller('selfsalaryPageCtrl', selfsalaryPageCtrl);

    /** @ngInject */
    function selfsalaryPageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService, dialogModal) {
        var vm = this;
        $scope.changeFinancialYear = _changeFinancialYear;
        $scope.prints = _print;

        function _changeFinancialYear() {
            if ($scope.financialYear !== undefined) {
                _employeeSalary();
            }
            console.log($scope.financialYear)
        }
        function _loadController() {
            console.log($scope.user.profile.empId)
            if ($scope.financialYear == undefined) {
                var fromYear = 0;
                var toYear = 0;
                var check = moment();
                var month = check.format("M");
                var year = check.format("YYYY");
                console.log(month, year)
                if (month > 4) {
                    fromYear = year - 1;
                    toYear = year;
                } else {
                    fromYear = year;
                    toYear = year + 1;
                }
                $scope.financialYear = fromYear + '-' + toYear;
                console.log(fromYear + '-' + toYear)
                _employeeSalary()
            } else {
                _employeeSalary()
            }
        }

        function _employeeSalary() {
            console.log(moment())
            console.log($scope.financialYear)
            if ($scope.financialYear !== undefined) {
                var searchLists = [];
                searchLists.push({
                    field: 'EmpId',
                    operand: "=",
                    value: $scope.user.profile.empId
                })
                searchLists.push({
                    field: 'FinancialYear',
                    operand: "=",
                    value: $scope.financialYear
                })
                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                pageService.getCustomQuery(data, 642).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            }
        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            console.log(result[0])
            $scope.empCode = result[0][0].EmpCode;
            $scope.empName = result[0][0].EmpName;
            $scope.deptName = result[0][0].DeptName;
            $scope.desgName = result[0][0].DesgName;
            $scope.financialYearList = result[1];
            $scope.empSalaryHead = result[0];

        }

        function _getCustomQueryErrorResult(error) {
            console.log(error);
        }
        _loadController()

        function _print() {
            window.print();
        }

        // $scope.printDiv = function(divName) {
        //     var printContents = document.getElementById(divName).innerHTML;
        //     var originalContents = document.body.innerHTML;        
        //     document.body.innerHTML = printContents;
        //     window.print();
        //     document.body.innerHTML = originalContents;
        // }

    }
})();
