/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('miscellaneousController', miscellaneousController);
    function miscellaneousController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        vm.monthlySummery = {};
        vm.monthlySummery.monthlyAttDetail = [];
        function _loadController() {

        }

        function _employeeSalary() {
            var searchLists = [];
            searchLists.push({
                field: 'Month',
                operand: "=",
                value: '3'
            })
            searchLists.push({
                field: 'Year',
                operand: "=",
                value: '2018'
            })
            searchLists.push({
                field: 'SubUnitId',
                operand: "=",
                value: '2'
            })
            searchLists.push({
                field: 'EmpId',
                operand: "=",
                value: 5
            })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 646).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            console.log(result[0])
            console.log(result[1])
            $scope.monthlyAttDetails = result[1];
        }

        function _getCustomQueryErrorResult(error) {
            console.log(error);
        }

        _employeeSalary();
    }
})();