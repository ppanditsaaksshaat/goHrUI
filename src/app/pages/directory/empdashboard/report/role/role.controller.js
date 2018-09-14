/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('roleController', roleController);
    function roleController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
        var vm = this;
            $scope.entity = {};
            // $scope.downLoadPdf = _downLoadPdf;
            $scope.downLoadPdf = _getSearchData;
            function _validateApprovedData() {
                if ($scope.entity.RoleId == undefined || $scope.entity.RoleId == null || $scope.entity.RoleId == '') {
                    $scope.showMsg("warning", "Please Select Role");
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
                        value: 'Role'
                    })
                    searchLists.push({
                        field: 'RoleId',
                        operand: "=",
                        value: $scope.entity.RoleId
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
                    var data = {
                        data: $scope.pdfRowsData,
                        companyName: $scope.companyName,
                        address: $scope.address,
                        reportType: 'Employee Role',
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
