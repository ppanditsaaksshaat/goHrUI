/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.reports')
        .controller('cOffDetailController', cOffDetailController);
    function cOffDetailController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
        var vm = this;
        $scope.entity = {};
        // $scope.downLoadPdf = _downLoadPdf;
        $scope.downLoadPdf = _getSearchData;
        function _validateApprovedData() {
            if ($scope.entity.SubUnitId == undefined || $scope.entity.SubUnitId == null || $scope.entity.SubUnitId == '') {
                $scope.showMsg("warning", "Please Select SubUnit");
                return true;
            }
            if ($scope.entity.FromDate == undefined || $scope.entity.FromDate == null || $scope.entity.FromDate == '') {
                $scope.showMsg("warning", "Please Select From Date");
                return true;
            }
            if ($scope.entity.ToDate == undefined || $scope.entity.ToDate == null || $scope.entity.ToDate == '') {
                $scope.showMsg("warning", "Please Select To Date");
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
                if ($scope.entity.COffStatusId == undefined) {
                    $scope.entity.COffStatusId = 0;
                }
                var searchLists = [];
                $scope.columnList = [];
                searchLists.push({
                    field: 'ReportType',
                    operand: "=",
                    value: 'COff'
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
                    field: 'COffStatusId',
                    operand: "=",
                    value: $scope.entity.COffStatusId
                })
                searchLists.push({
                    field: 'FromDate',
                    operand: "=",
                    value: $scope.entity.FromDate
                })
                searchLists.push({
                    field: 'ToDate',
                    operand: "=",
                    value: $scope.entity.ToDate
                })
                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                var data = {
                    data: $scope.pdfRowsData,
                    companyName: $scope.companyName,
                    address: $scope.address,
                    reportType: 'Job Detail',
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
