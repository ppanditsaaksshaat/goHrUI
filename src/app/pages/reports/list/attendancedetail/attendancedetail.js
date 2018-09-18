/**
 * @author NKM
 * created on 08.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('attendanceDetailController', attendanceDetailController);
    function attendanceDetailController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
        var vm = this;
        $scope.entity = {};
        // $scope.downLoadPdf = _downLoadPdf;
        $scope.downLoadPdf = _getSearchData;
        function _validateApprovedData() {
            if ($scope.entity.SubUnitId == undefined || $scope.entity.SubUnitId == null || $scope.entity.SubUnitId == '') {
                $scope.showMsg("warning", "Please Select SubUnit");
                return true;
            }
            if ($scope.entity.AttDate == undefined || $scope.entity.AttDate == null || $scope.entity.AttDate == '') {
                $scope.showMsg("warning", "Please Select Date.");
                return true;
            }
            return false;
        }

        function _loadController() {
            pageService.getPagData(509).then(function (result) {
                console.log(result)
                $scope.selectedDropDown = result;
                console.log($scope.selectedDropDown)
            })
        }



        function _getSearchData() {
            if (!_validateApprovedData()) {
                if ($scope.entity.DeptId == undefined) {
                    $scope.entity.DeptId = 0;
                }
                if ($scope.entity.EmpId == undefined) {
                    $scope.entity.EmpId = 0;
                }
                if ($scope.entity.Status == undefined) {
                    $scope.entity.Status = 0;
                }
                var searchLists = [];
                $scope.columnList = [];
                searchLists.push({
                    field: 'ReportType',
                    operand: "=",
                    value: 'AttendanceDetail'
                })
                searchLists.push({
                    field: 'SubUnitId',
                    operand: "=",
                    value: $scope.entity.SubUnitId
                })
                searchLists.push({
                    field: 'DeptId',
                    operand: "=",
                    value: $scope.entity.DeptId
                })
                searchLists.push({
                    field: 'EmpId',
                    operand: "=",
                    value: $scope.entity.EmpId
                })
                searchLists.push({
                    field: 'AttDate',
                    operand: "=",
                    value: $scope.entity.AttDate
                })
                searchLists.push({
                    field: 'UserEmpId',
                    operand: "=",
                    value: $rootScope.user.profile.empId
                })
                searchLists.push({
                    field: 'Status',
                    operand: "=",
                    value: $scope.entity.Status
                })

                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                var data = {
                    data: $scope.pdfRowsData,
                    companyName: $scope.companyName,
                    address: $scope.address,
                    reportType: 'Daily Attendance Detail',
                    pageOrientationType: 'landscape',
                    pageSize: 'A4',
                    isRowHeader: false,
                    searchData: data,
                    queryId: 670,
                    header: $scope.selectedDropDown.pageinfo.fields,
                    isQuery: 'true'
                }
                createPdfReport.createPdf(data)
            }
        }

        _loadController()
    }
})();
