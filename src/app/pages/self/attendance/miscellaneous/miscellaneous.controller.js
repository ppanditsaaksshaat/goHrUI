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
        $scope.miscelAttendanceSummery = {};
        $scope.monthlySummery = {};
        $scope.employeeSalary = _employeeSalary;
        $scope.applyRequest = _applyRequest;
        $scope.goApplyReguest = _goApplyReguest;
        $scope.applyAttendance = _applyAttendance;
        $scope.applyOD = _applyOD;
        $scope.applyCOff = _applyCOff;

        function _goApplyReguest() {
            $state.go('selfdir.attendance.miscellaneous.leave')
            console.log($scope.monthSummery)
            console.log($scope.atttttt)
        }

        function _applyAttendance() {
            $state.go('selfdir.attendance.miscellaneous.attendance')
        }

        function _applyOD() {
            $state.go('selfdir.attendance.miscellaneous.od')
        }

        function _applyCOff() {
            $state.go('selfdir.attendance.miscellaneous.coff', {
                id: $scope.applyDate,
                entity: $scope.holeObject
            })
        }


        function _applyRequest(monthSummery) {
            console.log(monthSummery)
            $scope.applyDate = monthSummery.DATE;
            $scope.apply = true;
            $scope.holeObject = monthSummery;
            console.log('ng click work')
        }
        function _loadController() {
        }

        function _employeeSalary() {
            var d = moment();
            var month = d.month();
            var year = d.year();
            $scope.month = month;
            $scope.years = d.year();
            console.log(month, year)

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
            $scope.miscelAttendanceSummery.monthlyAttDetails = result[1];
            $scope.monthlySummery.summery = result[2];
            $scope.empCode = result[0][0].EmpCode;
            $scope.empName = result[0][0].EmpName;
            $scope.monthlySummery.yearList = result[3]
            $scope.monthlySummery.monthList = result[4]
        }

        function _getCustomQueryErrorResult(error) {
            console.log(error);
        }

        _employeeSalary();
    }
})();