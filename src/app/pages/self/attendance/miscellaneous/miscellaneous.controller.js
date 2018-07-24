/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('miscellaneousController', miscellaneousController);
    function miscellaneousController($scope, $rootScope, $state, $filter, pageService, $location, $anchorScroll) {
        var vm = this;
        $scope.miscelAttendanceSummery = {};
        $scope.monthlySummery = {};
        $scope.employeeSalary = _employeeSalary;
        $scope.applyRequest = _applyRequest;
        $scope.goApplyReguest = _goApplyReguest;
        $scope.applyAttendance = _applyAttendance;
        $scope.applyOD = _applyOD;
        $scope.applyCOff = _applyCOff;

        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 490;
        console.log($scope.page)

        var d = moment();
        var month = d.month();
        var year = d.year();
        $scope.month = month + 1;
        $scope.years = d.year();
        console.log(month, year)

        $rootScope.$on("CallParentMethod", function () {
            $scope.employeeSalary = _employeeSalary();
        });


        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: true,
            showAdd: true,
            showRowMenu: false,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: true,
            filterOnChange: null,
            showDataOnLoad: true,
            isVerifyButton: true,
            columnDesign: [],
            pageResult: _pageResult
            // currentState: 'configuration.company.locations.location'
        }

        function _pageResult(result) {
            console.log(result)
        }

        $scope.page.searchList.push({
            field: 'Month',
            operand: '>=',
            value: 3
        })
        $scope.page.searchList.push({
            field: 'Year',
            operand: '<=',
            value: '2018'
        })
        $scope.page.searchList.push({
            field: 'EmpId',
            operand: '=',
            value: 5
            // value: $scope.user.profile.empId
        })


        function _goApplyReguest() {
            $state.go('selfdir.attendance.miscellaneous.leave', {
                id: $scope.applyDate,
                entity: $scope.holeObject
            })
            console.log($scope.monthSummery)
            console.log($scope.atttttt)
        }

        function _applyAttendance() {
            $state.go('selfdir.attendance.miscellaneous.attendance', {
                id: $scope.applyDate,
                entity: $scope.holeObject
            })
            console.log(moment(monthSummery.DATE).format('dd-MMM-yyyy'))
        }

        function _applyOD() {
            $state.go('selfdir.attendance.miscellaneous.od', {
                id: $scope.applyDate,
                entity: $scope.holeObject
            })
        }

        function _applyCOff() {
            $state.go('selfdir.attendance.miscellaneous.coff', {
                id: $scope.applyDate,
                entity: $scope.holeObject
            })
        }


        function _applyRequest(monthSummery) {
            $location.hash('bottom');
            // call $anchorScroll()
            $anchorScroll();
            console.log(monthSummery)
            if (monthSummery.DayStatus == 'Absent') {
                $scope.apply = true;
                $scope.applyCOf = false;
            }
            else {
                $scope.apply = false;
                $scope.applyCOf = true;
            }
            $scope.applyDate = moment(monthSummery.DATE).format('dd-MMM-yyyy');

            $scope.holeObject = monthSummery;
            console.log('ng click work')
        }
        function _loadController() {
        }


        function _employeeSalary() {
            // var d = moment();
            // var month = d.month();
            // var year = d.year();
            // $scope.month = month + 1;
            // $scope.years = d.year();
            // console.log(month, year)

            var searchLists = [];
            searchLists.push({
                field: 'Month',
                operand: "=",
                value: $scope.month
            })
            searchLists.push({
                field: 'Year',
                operand: "=",
                value: $scope.years
            })
            // searchLists.push({
            //     field: 'SubUnitId',
            //     operand: "=",
            //     value: '2'
            // })
            searchLists.push({
                field: 'EmpId',
                operand: "=",
                value: $rootScope.user.profile.empId
                // value: $scope.user.profile.empId
            })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 646).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
        }

        function _getCustomQuerySuccessResult(result) {
            $scope.monthlySummery.summery = [];

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