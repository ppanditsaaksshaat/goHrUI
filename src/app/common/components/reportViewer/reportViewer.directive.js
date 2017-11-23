(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('reportViewer', reportViewer);
    /** @ngInject */
    function reportViewer($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService,
        editFormService, focus, $sce, DJWebStore) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/reportViewer/reportViewer.html',
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
                // var reportBaseURL = 'http://itsllive.rudra.hrm/';
                var reportBaseURL = 'http://web400.hrms/';
                var host = $location.host();
                var absUrl = $location.absUrl();
                if (absUrl.indexOf('.html') > 0) {
                    absUrl = absUrl.substring(0, absUrl.indexOf('.html'))
                }
                console.log(absUrl);
                var lastIdx = absUrl.lastIndexOf('/');
                var firstIdx = absUrl.indexOf('/');
                var hostIdx = absUrl.indexOf(host);
                reportBaseURL = absUrl.substring(hostIdx + host.length, lastIdx);

                // reportBaseURL = 'http://itsllive.rudra.hrm/';
                //reportBaseURL = 'http://web400.hrms/';
                console.log(reportBaseURL)

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
                $scope.iframeLoadedCallBack = _iframeLoadedCallBack;
                $scope.reset = _reset;
                $scope.callReportPrint = _callReportPrint;
                $scope.showResult = _showResult;


                function _callReportPrint() {
                    window.frames[0].frameElement.contentWindow.outerPrint();
                }
                function _reset() {

                }
                function _iframeLoadedCallBack() {
                    $scope.iFrameIsLoading = false;
                    $("#progress-bar").hide();
                    $("#print-button").show();

                }
                function _showResult() {
                    $("#progress-bar").show();
                    $("#print-button").hide();
                    //$scope.reportUrl = 'app/common/components/reportViewer/blank.html'
                    console.log($scope.page.searchList)
                    if ($scope.page.pageinfo.filters.length > 0) {
                        if ($scope.page.searchList.length <= 0) {
                            $rootScope.showMsg('warning', 'Please select any one filter', '');
                            $("#progress-bar").hide();
                            return;
                        }
                    }

                    var filterCopy = angular.copy($scope.page.pageinfo.filters)
                    console.log(filterCopy)
                    var userFilterData = [];
                    angular.forEach(filterCopy, function (row, idx) {
                        var userFilter = {};
                        userFilter.name = row.name
                        userFilter.nosp = (row.spfield == '')
                        if (row.value !== undefined) {
                            userFilter.selectedValue = row.value;
                        }
                        else {
                            userFilter.selectedValue = '';
                        }
                        userFilterData.push(userFilter);
                    })

                    // var userEmpId = $rootScope.user.profile.empId;
                    // userFilterData.push({
                    //     name: 'UserEmpId',
                    //     nosp: 'UserEmpId',
                    //     selectedValue: userEmpId
                    // })
                    var corpoId = DJWebStore.GetValue('CorpoId');
                    var lang = DJWebStore.GetValue('UserLang');

                    console.log(userFilterData);
                    var data = { reportId: $scope.page.reportId, filterData: userFilterData, userEmpId: $rootScope.user.profile.empId }
                    var uncData = JSON.stringify(data);
                    var compressed = LZString.compressToEncodedURIComponent(uncData);
                    compressed = compressed.toString().replace('+', '!')
                    $scope.iFrameIsLoading = true;

                    var encData = { auth: compressed }
                    pageService.rptHandshake($scope.page.reportId, JSON.stringify(encData)).then(function (result) {
                        //   var result = angular.fromJson(response.data);
                        console.log(result)
                        var rptUrl = reportBaseURL + '/Report/ReportViewer?udr=' + result.Key + '&auth=' + result.OAuth +
                            '&?crid=' + corpoId + '&lang=' + lang
                        console.log(rptUrl)
                        $scope.reportUrl = $sce.trustAsResourceUrl(rptUrl);


                    }, function (err) {
                        console.log(err)
                    })

                    console.log(compressed)

                }

                function _loadReport() {

                    pageService.getListReport($scope.reportId).then(function (result) {

                        $scope.page.pageinfo = result;
                        //setPageTitle();
                        console.log($scope.page)
                    }, function (err) {
                        //console.log(err);
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