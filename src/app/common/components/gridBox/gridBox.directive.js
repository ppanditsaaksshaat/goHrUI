/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('gridBox', gridBox);
    /** @ngInject */
    function gridBox($location, $state, $compile, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/gridBox/gridBox.html',
            require: "^ngController",
            scope: {
                page: '=',
                boxOptions: '='
            },
            link: function (scope, elm, attrs, parent) {
                var boxSetting = {
                    showRefresh: true,
                    showFilter: false,
                    showAdd: true,
                    showRowMenu: true,
                    showCustomView: true,
                    showUpload: false,
                    gridStyle: { height: '450px' }
                }
                var gridOptions = $rootScope.getGridSetting();

                if (scope.page.boxOptions === undefined)
                    scope.page.boxOptions = angular.copy(boxSetting);
                if (!scope.page.boxOptions.showFilter) {
                    scope.page.showFilter = false;
                }

                if (scope.page.gridOptions === undefined) {
                    scope.page.gridOptions = angular.copy(gridOptions);
                }
                if (scope.page.pageinfo !== undefined) {
                    var isCreate, isEdit, isDelete, isUpdate, isExport, isRefresh, isHelp, isColSetting;

                    if (scope.page.pageinfo.buttons !== undefined) {
                        var buttons = scope.page.pageinfo.buttons;
                        isCreate = buttons.create.isvisible;
                        isDelete = buttons.delete.isvisible;
                        isEdit = buttons.edit.isvisible;
                        isExport = buttons.export.isvisible;
                        isRefresh = buttons.refresh.isvisible;
                        isHelp = buttons.help.isvisible;
                        isColSetting = buttons.colsetting.isvisible;
                    }
                    scope.page.gridOptions = $rootScopescope.gridSetupColumns(scope.page.gridOptions,
                        scope.page.pageinfo.columns, scope.page, isEdit, isDelete, isHelp, isEdit);
                }

                scope.page.selectedRows = [];

                scope.refreshData = _refreshData;
                scope.addRecord = _addRecord;
                scope.editRecord = _editRecord;
                scope.updateRecord = _updateRecord;
                scope.viewRecord = _viewRecord;
                scope.deleteRecord = _deleteRecord;
                scope.openView = _openView;
                scope.clearSelected = _clearSelected;
                scope.uploadRecord = _uploadRecord;
                scope.page.gridOptions.onRegisterApi = _onRegisterApi;

                console.log(scope.page)

                function _refreshData() {
                    console.log('ref')
                    // parent.refreshData();
                    console.log(scope.page.boxOptions);
                    scope.page.boxOptions.refreshData();
                    // console.log(parent[scope.page.boxOptions.refreshData]);
                }
                function _addRecord() {
                    // parent.addRecord();
                    scope.page.boxOptions.addRecord();
                }
                function _editRecord(row) {
                    scope.page.boxOptions.editRecord(row);
                }
                function _updateRecord(row) {
                    scope.page.boxOptions.updateRecord(row);
                }
                function _viewRecord(row) {
                    scope.page.boxOptions.viewRecord(row);
                }
                function _deleteRecord(row) {
                    scope.page.boxOptions.deleteRecord(row);
                }
                function _openView(row) {
                    scope.page.boxOptions.openView(row);
                }
                function _clearSelected() {
                    scope.page.gridApi.selection.clearSelectedRows();
                    scope.page.selectedRows = [];
                }
                function _uploadRecord() {
                    scope.page.boxOptions.uploadRecord();
                }
                function _onRegisterApi(gridApi) {
                    console.log('register grid api')
                    scope.page.gridApi = gridApi;

                    gridApi.selection.on.rowSelectionChanged(scope, function (row) {
                        scope.page.selectedRows = gridApi.selection.getSelectedRows();
                        // if (row.isSelected) {
                        //     //enable edit button

                        //     uivm.currentSelection = uivm.gridApi.selection.getSelectedRows();
                        //     //console.log(uivm.currentSelection)
                        //     if (uivm.currentSelection.length > 0) {
                        //         uivm.selectedRow = row;
                        //     }
                        // }

                        if (scope.page.selectedRows.length > 0) {

                        }
                        else {
                            //DJWebStoreGlobal.ClearPageMenu();
                        }
                    });
                }

                scope.getGridHeight = function () {
                    var rowHeight = 30;
                    var headerHeight = 30;
                    var defaultHeight = 450;
                    if (scope.page.gridOptions.data.length < 10) {
                        defaultHeight = (scope.page.gridOptions.data.length * rowHeight + headerHeight);
                    }
                    return {
                        height: defaultHeight + "px"
                    };
                };
            }
        };
    }

})();