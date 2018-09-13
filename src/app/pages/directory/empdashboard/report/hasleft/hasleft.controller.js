/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('hasleftController', hasleftController);
    function hasleftController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
        var vm = this;
            $scope.entity = {};
            // $scope.downLoadPdf = _downLoadPdf;
            $scope.downLoadPdf = _getSearchData;
            function _validateApprovedData() {
                if ($scope.entity.FromDate == undefined || $scope.entity.FromDate == null || $scope.entity.FromDate == '') {
                    $scope.showMsg("warning", "Please Select From Date.");
                    return true;
                }
                if ($scope.entity.ToDate == undefined || $scope.entity.ToDate == null || $scope.entity.ToDate == '') {
                    $scope.showMsg("warning", "Please Select To Date.");
                    return true;
                }
                return false;
            }
    
            function _loadController() {
                pageService.getPagData(505).then(function (result) {
                    console.log(result)
                    $scope.selectedDropDown = result;
                    console.log($scope.selectedDropDown)
                })
            }
    
    
    
            function _getSearchData() {
                if (!_validateApprovedData()) {
                    if ($scope.entity.FromDate == undefined) {
                        $scope.entity.FromDate = '';
                    }
                    if ($scope.entity.ToDate == undefined) {
                        $scope.entity.ToDate = '';
                    }
                    var searchLists = [];
                    $scope.columnList = [];
                    searchLists.push({
                        field: 'ReportType',
                        operand: "=",
                        value: 'SelfShift'
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
                    searchLists.push({
                        field: 'EmpId',
                        operand: "=",
                        value: $rootScope.user.profile.empId
                    })
                    searchLists.push({
                        field: 'LoginEmpId',
                        operand: "=",
                        value: $rootScope.user.profile.empId
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
                        reportType: 'Reporting Manager',
                        pageOrientationType: 'landscape',
                        pageSize: 'A4',
                        isRowHeader: false,
                        searchData: data,
                        queryId: 667,
                        header: $scope.selectedDropDown.pageinfo.fields,
                        isQuery: 'true'
                    }
                    createPdfReport.createPdf(data)
                }
            }
    
            _loadController()
    }
})();
