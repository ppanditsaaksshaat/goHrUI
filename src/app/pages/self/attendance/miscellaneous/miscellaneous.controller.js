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
        var isSearchingData = false;

        $scope.entity = {}

        console.log($scope.page)

        var d = moment();
        var month = d.month();
        var year = d.year();
        $scope.month = month + 1;
        $scope.years = d.year();
        console.log(month, year)
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 490;

        $rootScope.$on("CallParentMethod", function () {
            $scope.employeeSalary = _employeeSalary();
        });



        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: false,
            filterOpened: false,
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
            showApplyFilter: false,
            filterOnChange: null,
            showDataOnLoad: true,
            viewRecord: _viewRecord
            // currentState: 'configuration.company.locations.location'
        }

        $scope.page.searchList.push({
            field: 'Month',
            operand: '>=',
            value: $scope.month
        })
        $scope.page.searchList.push({
            field: 'Year',
            operand: '<=',
            value: $scope.years
        })
        $scope.page.searchList.push({
            field: 'EmpId',
            operand: '=',
            value: $rootScope.user.profile.empId
            // value: $scope.user.profile.empId
        })

        function _viewRecord(row) {
            console.log('view')
            console.log(row)
            console.log(row.entity.DayStatus.substring(0, 7))
            // $location.hash('bottom');
            // // call $anchorScroll()
            // $anchorScroll();
            // console.log(monthSummery)
            if (row.entity.DayStatus == 'Absent') {
                $scope.apply = true;
                $scope.applyCOf = false;
            }

            // var str = "Hello world!";
            // var res = str.substring(1, 4);

            else if (row.entity.DayStatus == 'Holiday' || row.entity.DayStatus == 'Weekoff' || row.entity.DayStatus.substring(0, 7) == 'Holiday') {
                $scope.apply = false;
                $scope.applyCOf = true;
            }
            else {
                $rootScope.showMsg("info", "You can take any kind of request when day status is /holiday/weekoff/od/leave");
                $scope.apply = false;
                $scope.applyCOf = false;
            }
            $scope.applyDate = moment(row.entity.DATE).format('dd-MMM-yyyy');

            $scope.holeObject = row.entity;
            console.log('ng click work')
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

        function _employeeSalary() {
            var currentMonth = (moment().month()) + 1;
            var currentYear = moment().year();
            if ($scope.years <= currentYear) {
                if ($scope.month <= currentMonth) {
                    if (isSearchingData) {
                        _searchAttendance()
                    }
                    isSearchingData = true;

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
                else {
                    $rootScope.showMsg("info", "Month and year should be less than or equal to current month and year");
                }
            }
            else {
                $rootScope.showMsg("info", "Year should be less than or equal to current year");
            }
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

        function _searchAttendance() {
            $scope.page.searchList = [];
            $scope.page.searchList.push({
                field: 'Month',
                operand: '>=',
                value: $scope.month
            })
            $scope.page.searchList.push({
                field: 'Year',
                operand: '<=',
                value: $scope.years
            })
            $scope.page.searchList.push({
                field: 'EmpId',
                operand: '=',
                value: $rootScope.user.profile.empId
                // value: $scope.user.profile.empId
            })
            $scope.page.refreshData()
        }






        function _loadController() {
        }






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


        _employeeSalary();
    }
})();