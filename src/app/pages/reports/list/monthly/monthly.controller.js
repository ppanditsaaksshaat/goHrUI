/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('monthlyController', monthlyController);
    function monthlyController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
        var vm = this;
        $scope.entity = {};
        // $scope.downLoadPdf = _downLoadPdf;
        $scope.downLoadPdf = _getSearchData;
        function _validateApprovedData() {
            if ($scope.entity.SubUnitId == undefined || $scope.entity.SubUnitId == null || $scope.entity.SubUnitId == '') {
                $scope.showMsg("warning", "Please Select SubUnit");
                return true;
            }
            if ($scope.entity.Year == undefined || $scope.entity.Year == null || $scope.entity.Year == '') {
                $scope.showMsg("warning", "Please Select Year");
                return true;
            }
            if ($scope.entity.Month == undefined || $scope.entity.Month == null || $scope.entity.Month == '') {
                $scope.showMsg("warning", "Please Select Month");
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
                
                var searchLists = [];
                $scope.columnList = [];
                searchLists.push({
                    field: 'ReportType',
                    operand: "=",
                    value: 'VerifiedAttendance'
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
                    field: 'Year',
                    operand: "=",
                    value: $scope.entity.Year
                })
                searchLists.push({
                    field: 'Month',
                    operand: "=",
                    value: $scope.entity.Month
                })
                searchLists.push({
                    field: 'EmpId',
                    operand: "=",
                    value: $scope.entity.EmpId
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
                    reportType: 'Monthly Verified Attendance',
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
