/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('gridBox', gridBox);
    /** @ngInject */
    function gridBox($location, $state, $compile) {
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
                    showFilter: true,
                    showAdd: true,
                    showRowMenu: true,
                    showCustomView: true
                }
                if (scope.boxOptions === undefined)
                    scope.boxOptions = angular.copy(boxSetting);
                if (!scope.boxOptions.showFilter) {
                    scope.page.showFilter = false;
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
                scope.page.gridOptions.onRegisterApi = _onRegisterApi;

                console.log(scope.page)

                function _refreshData() {
                    parent.refreshData();
                }
                function _addRecord() {
                    parent.addRecord();
                }
                function _editRecord(row) {
                    parent.editRecord(row);
                }
                function _updateRecord(row) {
                    parent.updateRecord(row);
                }
                function _viewRecord(row) {
                    parent.viewRecord(row);
                }
                function _deleteRecord(row) {
                    parent.deleteRecord(row);
                }
                function _openView(row) {
                    parent.openView(row);
                }
                function _clearSelected() {
                    scope.page.gridApi.selection.clearSelectedRows();
                    scope.page.selectedRows = [];
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
            }
        };
    }

})();