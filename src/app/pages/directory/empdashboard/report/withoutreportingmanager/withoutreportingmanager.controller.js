/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('withOutReportingController', withOutReportingController);
        function withOutReportingController($scope, $rootScope, $state, $filter, pageService, createPdfReport) {
            var vm = this;
            $scope.entity = {};
            $scope.downLoadPdf = _downLoadPdf;
            function _validateApprovedData() {
                if ($scope.entity.SubUnitId == undefined || $scope.entity.SubUnitId == null || $scope.entity.SubUnitId == '') {
                    $scope.showMsg("warning", "Please Select SubUnit");
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
    
            function _downLoadPdf() {
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
                        value: 'WithOutReportingManager'
                    })
                    searchLists.push({
                        field: 'SubUnitId',
                        operand: "=",
                        value: $scope.entity.SubUnitId
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
                    pageService.getCustomQuery(data, 667).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
                }
            }
    
            function _getCustomQuerySuccessResult(result) {
                var pdfRows = [];
                var pdfHeader = [];
                console.log(result)
                console.log(result[0])
                var leaveStatementData = result[0];
                if (leaveStatementData.length > 0) {
                    angular.forEach($scope.selectedDropDown.pageinfo.fields, function (columns) {
                        var output = Object.entries(result[0][0]).map(([key, value]) => ({ key, value }));
                        console.log(output)
                        var col = $filter("findObj")(output, columns.name, "key");
                        if (col != null) {
                            var colValue = {
                                name: columns.name,
                                displayName: columns.text
                            }
                            $scope.columnList.push(colValue)
                        }
                    })
                    console.log($scope.columnList)
                    if (result[1].length > 0) {
                        $scope.companyName = result[1][0].CCOName;
                        $scope.address = result[1][0].CCOAddress;
                        pdfRows.push([{
                            text: result[0][0].EmpName + ',  ' + 'Department -' + result[0][0].DeptName + ',  ' + 'Designation -' + result[0][0].DesgName,
                            style: 'tableHeader', colSpan: 10
                        }, {}, {}, {}, {}, {}, {}, {}, {}, {}])
                    }
                    angular.forEach($scope.columnList, function (col) {
                        var pdfCell = {};
                        pdfCell.text = col.displayName;
                        pdfCell.style = 'filledHeader';
                        pdfHeader.push(pdfCell);
                    })
                    pdfRows.push(pdfHeader);
    
                    angular.forEach(leaveStatementData, function (row) {
                        console.log(row)
                        var pdfRow = [];
                        angular.forEach($scope.columnList, function (col) {
                            var pdfCell = {};
                            // if(row.)
                            pdfCell.text = row[col.name];
                            pdfCell.style = 'tableLabel';
                            pdfRow.push(pdfCell);
                        })
                        pdfRows.push(pdfRow);
                    });
                    console.log(pdfRows)
                    $scope.pdfRowsData = pdfRows;
                    _getSearchData()
                }
                else {
                    $scope.showMsg("warning", "Data Not found");
                }
    
            }
    
            function _getSearchData() {
                var data = {
                    data: $scope.pdfRowsData,
                    companyName: $scope.companyName,
                    address: $scope.address,
                    reportType: 'Reporting Manager',
                    pageOrientationType: 'landscape',
                    pageSize: 'A4'
                }
                createPdfReport.createPdf(data)
            }
    
            function _getCustomQueryErrorResult(error) {
                console.log(error);
            }
            _loadController()
        }
})();
