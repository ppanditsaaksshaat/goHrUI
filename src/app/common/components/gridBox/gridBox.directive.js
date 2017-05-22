/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('gridBox', gridBox);
    /** @ngInject */
    function gridBox($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/gridBox/gridBox.html',
            require: ['^ngController', 'ngModel'],
            replace: true,
            scope: {
                page: '=ngModel'
            },
            controller: function ($scope, $timeout) {
                // $scope.$watch("page.pageinfo", function (newValue, OldValue, scope) {
                //     console.log('ctrl', newValue, OldValue, scope)
                //     console.log(scope.page.boxOptions)
                //     console.log(scope.page.isLoaded)
                // });

            },
            link: function ($scope, elm, attrs, ctrl) {

                var boxSetting = {
                    selfLoading: true,
                    showRefresh: true,
                    showFilter: false,
                    showAdd: true,
                    showRowMenu: true,
                    showCustomView: true,
                    showUpload: false,
                    showDialog: false,
                    gridStyle: { height: '450px' }
                }
                var gridOptions = $rootScope.getGridSetting();
                if ($scope.page.boxOptions === undefined)
                    $scope.page.boxOptions = angular.copy(boxSetting);
                if (!$scope.page.boxOptions.showFilter) {
                    $scope.page.showFilter = false;
                }

                if ($scope.page.gridOptions === undefined) {
                    $scope.page.gridOptions = angular.copy(gridOptions);
                }

                $scope.$watch('page.pageinfo', function () {
                    _setGridColumns();
                    _setupVerticalForm();
                    console.log('from watch')
                });

                _loadDirective();

                // $scope.scroll_config = {
                //     autoHideScrollbar: false,
                //     theme: '3d-dark',
                //     advanced: {
                //         updateOnContentResize: true
                //     },
                //     setHeight: 500,
                //     scrollInertia: 0,
                //     axis: 'y'
                // } 

                $scope.page.editFormUrl = 'app/common/components/gridBox/formVertical.html';
                $scope.page.isVerticalForm = true;
                $scope.page.viewFormUrl = 'app/common/components/gridBox/viewHorizontal.html';
                $scope.page.isVerticalView = false;

                $scope.page.selectedRows = [];
                $scope.page.addPageTempUrl = 'app/common/forms/formVertical/formVertical.html';
                $scope.getPageData = _getPageData;
                $scope.refreshData = _refreshData;
                $scope.addRecord = _addRecord;
                $scope.editRecord = _editRecord;
                $scope.updateRecord = _updateRecord;
                $scope.viewRecord = _viewRecord;
                $scope.deleteRecord = _deleteRecord;
                $scope.openView = _openView;
                $scope.clearSelected = _clearSelected;
                $scope.uploadRecord = _uploadRecord;
                $scope.closeViewRecord = _closeViewRecord;
                $scope.closeAddRecord = _closeAddRecord;
                $scope.closeForm = _closeForm;
                $scope.page.gridOptions.onRegisterApi = _onRegisterApi;

                function _loadDirective() {
                    if ($scope.page.boxOptions.selfLoading) {
                        _getPageData();
                    }
                }
                function _getPageData() {
                    if ($scope.page.boxOptions.getPageData == null) {
                        _getPage();
                    }
                    else
                        $scope.page.boxOptions.getPageData();
                }
                function _refreshData() {
                    if ($scope.page.boxOptions.refreshData == null) {
                        _getTableData();
                    }
                    else
                        $scope.page.boxOptions.refreshData();
                }
                //====================================================================
                //button functions
                function _addRecord() {
                    if ($scope.page.boxOptions.addRecord == null) {

                        if ($scope.page.boxOptions.showDialog) {
                            var param = {
                                action: 'create',
                                page: $scope.page,
                                linkColumns: $scope.page.boxOptions.linkColumns
                            };
                            var options = {
                                param: param
                            }
                            dialogModal.openFormVertical(options);
                        }
                        else {
                            $scope.page.showAddRecord = true;
                        }
                    }
                    else
                        $scope.page.boxOptions.addRecord();
                }
                function _editRecord(row) {
                    if ($scope.page.boxOptions.editRecord == null) {

                        if ($scope.page.boxOptions.showDialog) {
                            var param = {
                                action: 'edit',
                                page: $scope.page,
                                entity: row.entity,
                                linkColumns: $scope.page.boxOptions.linkColumns
                            };
                            var options = {
                                param: param
                            }
                            dialogModal.openFormVertical(options);
                        }
                        else {
                            $scope.page.showAddRecord = true;
                        }
                    }
                    else
                        $scope.page.boxOptions.editRecord(row);
                }
                function _updateRecord(row) {
                    $scope.page.boxOptions.updateRecord(row);
                }
                function _viewRecord(row) {
                    if ($scope.page.boxOptions.viewRecord == null) {

                        $scope.entity = row.entity;
                        if ($scope.page.boxOptions.showDialog) {
                            var param = {
                                action: 'edit',
                                page: $scope.page,
                                entity: row.entity,
                                linkColumns: []
                            };

                            var options = {
                                url: 'app/pages/organization/employees/masters/detail/detail.html',
                                controller: 'orgMastersDetailController', controllerAs: 'detailCtrl',
                                size: 'top-center-800',
                                param: param
                            }
                            dialogModal.open(options);
                        }
                        else {
                            $scope.page.showViewRecord = true;
                        }
                    }
                    else
                        $scope.page.boxOptions.viewRecord(row);
                }
                function _deleteRecord(row) {
                    $scope.page.boxOptions.deleteRecord(row);
                }
                function _openView(row) {
                    $scope.page.boxOptions.openView(row);
                }
                function _clearSelected() {
                    $scope.page.gridApi.selection.clearSelectedRows();
                    $scope.page.selectedRows = [];
                }
                function _uploadRecord() {
                    $scope.page.boxOptions.uploadRecord();
                }
                function _onRegisterApi(gridApi) {
                    console.log('register grid api')
                    $scope.page.gridApi = gridApi;

                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
                        // if (row.isSelected) {
                        //     //enable edit button

                        //     uivm.currentSelection = uivm.gridApi.selection.getSelectedRows();
                        //     //console.log(uivm.currentSelection)
                        //     if (uivm.currentSelection.length > 0) {
                        //         uivm.selectedRow = row;
                        //     }
                        // }

                        if ($scope.page.selectedRows.length > 0) {

                        }
                        else {
                            //DJWebStoreGlobal.ClearPageMenu();
                        }
                    });
                }
                function _closeViewRecord() {
                    _closeForm();
                }
                function _closeAddRecord() {
                    _closeForm();
                }
                function _closeForm() {
                    $scope.page.showAddRecord = false;
                    $scope.page.showViewRecord = false;
                }
                //END: button function 
                //====================================================================
                //setup grid columns from pageinfo
                function _setGridColumns() {
                    if ($scope.page.pageinfo !== undefined) {
                        var isCreate = false, isEdit = false, isDelete = false, isUpdate = false,
                            isExport = false, isRefresh = false, isHelp = false, isColSetting = false;
                        if ($scope.page.pageinfo.buttons !== undefined) {
                            var buttons = $scope.page.pageinfo.buttons;
                            isCreate = buttons.create.isvisible;
                            isDelete = buttons.delete.isvisible;
                            isEdit = buttons.edit.isvisible;
                            isExport = buttons.export.isvisible;
                            isRefresh = buttons.refresh.isvisible;
                            isHelp = buttons.help.isvisible;
                            isColSetting = buttons.colsetting.isvisible;
                        }
                        $scope.page.gridOptions = $rootScope.gridSetupColumns($scope.page.gridOptions,
                            $scope.page.pageinfo.columns, $scope.page, isEdit, isDelete, isHelp, isEdit);
                    }

                }
                //setup vertical form
                function _setupVerticalForm() {
                    $scope.page.editFormUrl = 'app/common/components/gridBox/formVertical.html';
                    $scope.page.isVerticalForm = true;
                    $scope.page.formrows = [];
                    //find tabs
                    if ($scope.page.pageinfo !== undefined) {
                        angular.forEach($scope.page.pageinfo.viewform, function (tab) {
                            //find rows
                            angular.forEach(tab.rows, function (row) {
                                //find columns
                                angular.forEach(row, function (col) {
                                    if (col.name != $scope.page.pageinfo.idencolname) {
                                        var isValid = true;
                                        //find any link column with parent
                                        angular.forEach($scope.page.linkColumns, function (link) {
                                            if (col.name == link.name) {
                                                $scope.entity[col.name] = link.value;
                                                isValid = false;
                                            }
                                        })
                                        if (isValid)
                                            $scope.page.formrows.push(col);
                                    }
                                })
                            })
                        })
                    }
                }
                //====================================================================
                //get page data
                function _getPage() {
                    $timeout(function () {
                        pageService.getPagData($scope.page.pageId).then(_getPageSuccessResult, _getPageErrorResult)
                    });
                }
                function _getPageSuccessResult(result) {
                    $scope.page = angular.extend($scope.page, result);
                    // $scope.setPage(result)
                    console.log('from getpage')
                    _setGridColumns();
                    _refreshData();
                }
                function _getPageErrorResult(err) {

                }
                //end get page data
                //====================================================================
                //get table data
                function _getTableData() {
                    var data = {
                        searchList: $scope.page.searchList,
                        orderByList: $scope.page.orderByList
                    }
                    var tableData = pageService.getTableData(
                        $scope.page.pageinfo.tableid,
                        $scope.page.pageinfo.pageid,
                        '', '',
                        false, data);
                    $scope.page.isLoaded = false
                    $scope.page.isLoading = true
                    $scope.page.gridOptions.data = []
                    tableData.then(_getTableSuccessResult, _getTableErrorResult)
                }
                function _getTableErrorResult(err) {
                    $scope.page.isLoaded = true
                    $scope.page.isLoading = false
                }
                function _getTableSuccessResult(result) {
                    $scope.page.isLoaded = true
                    $scope.page.isLoading = false
                    if (result == 'NoDataFound') {
                        // uivm.showMsg('warning', 'No Record Found.');
                    } else if (result.Errors !== undefined) {
                        // uivm.showMsg('error', result.Message);
                        // _startMsgTimer();
                    }
                    else {
                        $scope.page.gridOptions.data = result;
                    }
                }
                //end get table data
                $scope.getGridHeight = function () {
                    var rowHeight = 30;
                    var headerHeight = 30;
                    var defaultHeight = 450;
                    if ($scope.page.gridOptions.data.length < 10) {
                        defaultHeight = ($scope.page.gridOptions.data.length * rowHeight + headerHeight);
                    }
                    return {
                        height: defaultHeight + "px"
                    };
                };
            }
        };
    }

})();