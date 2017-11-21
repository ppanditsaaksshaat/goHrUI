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

                $scope.reportId = $scope.page.reportId;
                $scope.reset = _reset;
                $scope.callReportPrint = _callReportPrint;
                $scope.showResult = _showResult;


                function _callReportPrint() {
                    window.frames[0].frameElement.contentWindow.outerPrint();
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

            }
        }
    }
})();