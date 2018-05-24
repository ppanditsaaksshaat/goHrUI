/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('listReport', listReport);
    /** @ngInject */
    function listReport($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService,
        editFormService, focus, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/listReport/listReport.html',
            require: ['^ngController', 'ngModel'],
            replace: true,
            scope: {
                page: '=ngModel'
            },
            controller: function ($scope, $timeout) {

                // $scope.$watch("page.pageinfo", function (newValue, OldValue, scope) {
                //     ////console.log('ctrl', newValue, OldValue, scope)
                //     ////console.log(scope.page.boxOptions)
                //     ////console.log(scope.page.isLoaded)
                // });

            },
            link: function ($scope, elm, attrs, ctrl) {
                console.log('listReport')
                var reportBaseURL = 'reports/';
                var boxSetting = {
                    selfLoading: true,//gridBox will fetch data from api on its own
                    showRefresh: true,//show refresh button
                    showFilter: true,//show filter toggle button
                    filterOpened: true,//filter box opened on load
                    requiredFilter: false,//filter is required
                    showAdd: true,//show add button
                    showRowMenu: true,//show row click menu
                    showCustomView: true,//enable show custom html view
                    showUpload: false,//show upload button
                    showDialog: false,//show edit box on dialog mode
                    enableRefreshAfterUpdate: true,
                    enableAutoRefresh: true,
                    showDataOnLoad: true,
                    showApplyFilter: true,
                    filterOnChange: null,//an event for filter box
                    gridStyle: { height: '450px' },
                    customButtons: [],
                    selectedRowButtons: [],
                    customColumns: [],
                    pageResult: null,
                    dataResult: null,
                    saveResult: null
                }

                //var gridOptions = $rootScope.getGridSetting();
                if ($scope.page.boxOptions === undefined)
                    $scope.page.boxOptions = angular.copy(boxSetting);
                else {
                    $scope.page.boxOptions = angular.extend({}, boxSetting, $scope.page.boxOptions);
                }
                if (!$scope.page.boxOptions.showFilter) {
                    $scope.page.showFilter = false;
                }

                else if ($scope.page.boxOptions.filterOpened) {
                    $scope.page.showFilter = true;
                }

                $scope.page.gridOptions = getGridSetting();
                $scope.page.gridOptions2 = angular.copy($scope.page.gridOptions);
                $scope.page.gridOptions2.enablePaginationControls = false;

                $scope.reportId = $scope.page.reportId;
                $scope.reset = _reset;
                $scope.callReportPrint = _callReportPrint;
                $scope.showResult = _showResult;


                function getGridSetting() {
                    var gridOptions = {
                        rowHeight: 35,
                        showGridFooter: true,
                        enableColumnResizing: true,
                        enableFiltering: false,
                        enableGridMenu: true,
                        enableRowSelection: true,
                        enableRowHeaderSelection: true,
                        enablePaginationControls: true,
                        paginationPageSizes: [10, 25, 50, 75, 100, 200, 500],
                        paginationPageSize: 50,
                        minRowsToShow: 50,
                        showColumnFooter: false,
                        enableVerticalScrollbar: false,
                        enableHighlighting: true,
                        enablePinning: true,
                        data: [],
                        columnDefs: []
                        // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
                    }
                    return gridOptions;
                }
                function _callReportPrint() {
                    // window.frames[0].frameElement.contentWindow.outerPrint();
                    printReport('djGrid1');
                }
                function _reset() {

                }

                function _showResult() {

                    refreshReport();

                }

                function _loadReport() {
                    $("#progress-bar").hide();
                    $("#print-button").hide();
                    pageService.getListReport($scope.reportId).then(function (result) {

                        $scope.page.pageinfo = result;
                        //setPageTitle(); 
                        console.log($scope.page)
                    }, function (err) {
                        //console.log(err);
                    });
                }
                function refreshReport() {

                    var filterCopy = angular.copy($scope.page.pageinfo.filters)
                    var filterData = {};
                    angular.forEach(filterCopy, function (row, idx) {
                        filterData[row.name] = row.value;
                    })


                    if (filterData === undefined) {
                        alert('Please select any one filter');
                        return;
                    }
                    pageService.getReport($scope.reportId, JSON.stringify(filterData)).then(function (result) {
                        //var result = angular.fromJson(response.data);
                        console.log(result);
                        $scope.page.reportData = result;

                        $scope.page.gridOptions.columnDefs = [];
                        angular.forEach(result.header, function (head) {
                            var colDef = {
                                name: head.name
                                , field: head.name
                                , displayName: head.text
                                , width: 100,
                                visible: true

                            };

                            if (head.type == 'date') {
                                colDef.cellFilter = 'date:\'dd-MMM-yyyy\'';
                            }
                            $scope.page.gridOptions.columnDefs.push(colDef);
                        })

                        if (result.tables) {
                            $scope.page.gridOptions.data = [];
                            angular.forEach(result.tables[0].rows, function (row) {
                                var rowData = {};
                                angular.forEach(row, function (col) {
                                    rowData[col.name] = col.value;
                                })
                                $scope.page.gridOptions.data.push(rowData);
                            })
                        }

                        $scope.page.gridOptions2.columnDefs = angular.copy($scope.page.gridOptions.columnDefs);
                        $scope.page.gridOptions2.data = angular.copy($scope.page.gridOptions.data);

                        console.log($scope.page)
                    }, function (err) {
                        console.log(err);
                    });


                }
                $scope.$on('apply-filter', function (successEvent, searchList) {

                    // console.log(searchList)
                    // console.log('from gridbox', $scope.page)
                    if (searchList) {
                        $scope.page.searchList = searchList;
                        // console.log(searchList)
                        _showResult();
                    }
                })

                $timeout(function () {
                    _loadReport();
                })

                function printReport(report_ID) {
                    var html = $('#' + report_ID).html();

                    var docType = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/loose.dtd">';
                    // var docCnt = styles + table.parent().html();
                    var docHead = '<head><title>ITSL Report</title><style>body{margin:5;padding:0;}</style></head>';
                    var winAttr = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no,width=720,height=600,resizable=yes,screenX=200,screenY=200,personalbar=no,scrollbars=yes";;
                    var newWin = window.open("", "_blank", winAttr);

                    $(newWin.document.body).html(html)
                    return;

                    var rv1 = $('#' + report_ID);

                    var iDoc = rv1.parents('html');

                    // Reading the report styles
                    var styles = iDoc.find("head style[id$='ReportControl_styles']").html();
                    if ((styles == undefined) || (styles == '')) {
                        iDoc.find('head script').each(function () {
                            var cnt = $(this).html();
                            var p1 = cnt.indexOf('ReportStyles":"');
                            if (p1 > 0) {
                                p1 += 15;
                                var p2 = cnt.indexOf('"', p1);
                                styles = cnt.substr(p1, p2 - p1);
                            }
                        });
                    }
                    if (styles == '') { alert("Cannot generate styles, Displaying without styles.."); }
                    styles = '<style type="text/css">' + styles + "</style>";

                    console.log($(rv1).find('ui-grid-render-container-body'))
                    // Reading the report html

                    var table = rv1.getElementsByClassName("ui-grid-render-container-body");
                    console.log(table)
                    if (table == undefined) {
                        alert("Report source not found.");
                        return;
                    }

                    // Generating a copy of the report in a new window
                    var docType = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/loose.dtd">';
                    var docCnt = styles + table.parent().html();
                    var docHead = '<head><title>ITSL Report</title><style>body{margin:5;padding:0;}</style></head>';
                    var winAttr = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no,width=720,height=600,resizable=yes,screenX=200,screenY=200,personalbar=no,scrollbars=yes";;
                    var newWin = window.open("", "_blank", winAttr);

                    $(newWin.document.body).html('deepak jain')
                    // console.log(newWin.document)
                    // writeDoc = newWin.document;
                    // console.log(writeDoc)
                    // writeDoc.open();
                    // writeDoc.write(docType + '<html>' + docHead + '<body onload="window.print();">' + docCnt + '</body></html>');
                    // writeDoc.close();

                    // The print event will fire as soon as the window loads
                    newWin.focus();
                    // uncomment to autoclose the preview window when printing is confirmed or canceled.
                    // newWin.close();
                };
            }
        }
    }
})();