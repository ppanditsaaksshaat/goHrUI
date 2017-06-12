/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('gridBox', gridBox);
    /** @ngInject */
    function gridBox($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService, editFormService, focus) {
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
                //     ////console.log('ctrl', newValue, OldValue, scope)
                //     ////console.log(scope.page.boxOptions)
                //     ////console.log(scope.page.isLoaded)
                // });

            },
            link: function ($scope, elm, attrs, ctrl) {

                var boxSetting = {
                    selfLoading: true,
                    showRefresh: true,
                    filterOpened: false,
                    requiredFilter: false,
                    showFilter: undefined,
                    showAdd: true,
                    showRowMenu: true,
                    showCustomView: true,
                    showUpload: false,
                    showDialog: false,
                    showDataOnLoad: true,
                    gridStyle: { height: '450px' },
                    customButtons: []
                }

                //customButtons: text, icon, onClick, type:btn-detault

                var gridOptions = $rootScope.getGridSetting();
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
                console.log($scope.page)
                if ($scope.page.gridOptions === undefined) {
                    $scope.page.gridOptions = angular.copy(gridOptions);
                }
                $scope.oldEntity = {};
                $scope.$watch('page.pageinfo', function () {
                    // //console.log($scope.page.pageinfo)
                    _setGridColumns();
                    _setupVerticalForm();
                    ////console.log('from watch')
                });
                $scope.form = {};
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
                $scope.page.getPageData = _getPageData;
                $scope.page.refreshData = _refreshData;
                $scope.page.addRecord = _addRecord;
                $scope.page.editRecord = _editRecord;
                $scope.page.updateRecord = _updateRecord;
                $scope.page.viewRecord = _viewRecord;
                $scope.page.deleteRecord = _deleteRecord;
                $scope.page.openView = _openView;
                $scope.page.clearSelected = _clearSelected;
                $scope.page.uploadRecord = _uploadRecord;
                $scope.page.closeViewRecord = _closeViewRecord;
                $scope.page.closeAddRecord = _closeAddRecord;
                $scope.page.closeForm = _closeForm;
                $scope.page.goBack = _goBack;
                $scope.page.gridOptions.onRegisterApi = _onRegisterApi;
                $scope.saveForm = _saveForm;
                $scope.resetForm = _resetForm;
                $scope.closeForm = _closeForm;

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
                function _goBack() {
                    if ($scope.page.boxOptions.goBack == null) {
                        alert('not implemented')
                    }
                    else
                        $scope.page.boxOptions.goBack();
                }
                //====================================================================
                //button functions
                function _addRecord() {

                    $scope.entity = {};

                    angular.forEach($scope.page.boxOptions.linkColumns, function (link) {
                        $scope.entity[link.name] = link.value;
                    });

                    $scope.page.action = 'create';
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

                            // if ($scope.page.selectedRows !== undefined) {
                            //     if ($scope.page.selectedRows.length > 0)
                            //         $scope.entity = $scope.page.selectedRows[0];
                            //     else
                            //         $scope.entity = {};
                            // }
                            $scope.page.showAddRecord = true;
                        }
                    }
                    else
                        $scope.page.boxOptions.addRecord();
                }
                function _editRecord(row) {
                    $scope.page.action = 'edit';
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
                            $scope.entity = row.entity;
                            $scope.oldEntity = angular.copy(row.entity);
                            $scope.page.pkId = row.entity[$scope.page.pageinfo.idencolname];
                            _findEntity();
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
                    ////console.log('register grid api')
                    $scope.page.gridApi = gridApi;

                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
                        // if (row.isSelected) {
                        //     //enable edit button

                        //     uivm.currentSelection = uivm.gridApi.selection.getSelectedRows();
                        //     //////console.log(uivm.currentSelection)
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
                function _closeForm(editForm) {
                    $scope.page.showAddRecord = false;
                    $scope.page.showViewRecord = false;
                    $scope.entity = {};
                    if (editForm) {
                        editForm.$setPristine();
                    }
                }
                //END: button function  
                //====================================================================
                //setup grid columns from pageinfo
                function _setGridColumns() {
                    if ($scope.page.pageinfo !== undefined) {
                        if ($scope.page.pageinfo != null) {
                            var isCreate = false, isEdit = false, isDelete = false, isUpdate = false,
                                isExport = false, isRefresh = false, isHelp = false, isColSetting = false;
                            if ($scope.page.pageinfo.buttons !== undefined) {
                                var buttons = $scope.page.pageinfo.buttons;
                                if (buttons.create !== undefined)
                                    isCreate = buttons.create.isvisible;
                                if (buttons.delete !== undefined)
                                    isDelete = buttons.delete.isvisible;
                                if (buttons.edit !== undefined)
                                    isEdit = buttons.edit.isvisible;
                                if (buttons.export !== undefined)
                                    isExport = buttons.export.isvisible;
                                if (buttons.refresh !== undefined)
                                    isRefresh = buttons.refresh.isvisible;
                                if (buttons.help !== undefined)
                                    isHelp = buttons.help.isvisible;
                                if (buttons.colsetting !== undefined)
                                    isColSetting = buttons.colsetting.isvisible;
                            }
                            $scope.page.gridOptions = $rootScope.gridSetupColumns($scope.page.gridOptions,
                                $scope.page.pageinfo.columns, $scope.page, isEdit, isDelete, isHelp, isEdit);
                            console.log($scope.page.gridOptions)

                        }
                    }
                }
                //setup vertical form
                function _setupVerticalForm() {
                    $scope.page.editFormUrl = 'app/common/components/gridBox/formVertical.html';
                    $scope.page.isVerticalForm = true;
                    $scope.page.formrows = [];
                    if ($scope.entity === undefined)
                        $scope.entity = {};
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
                                        angular.forEach($scope.page.boxOptions.linkColumns, function (link) {
                                            if (col.name == link.name) {
                                                $scope.entity[col.name] = link.value;
                                                isValid = false;
                                            }
                                        })

                                        angular.forEach($scope.page.boxOptions.readonlyColumns, function (rcol) {
                                            if (col.name == rcol) {
                                                col.viewonly = true;
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
                        ////console.log($scope.page);
                        pageService.getPagData($scope.page.pageId).then(_getPageSuccessResult, _getPageErrorResult)
                    });
                }
                function _getPageSuccessResult(result) {
                    console.log(result)
                    $scope.page = angular.extend($scope.page, result);
                    // $scope.setPage(result)
                    ////console.log('from getpage')
                    _setGridColumns();
                    if ($scope.page.boxOptions.showDataOnLoad)
                        _refreshData();
                }
                function _getPageErrorResult(err) {

                }
                //end get page data
                //====================================================================
                //get table data
                function _getTableData() {

                    if (!$scope.page.boxOptions.showDataOnLoad && $scope.page.boxOptions.requiredFilter) {
                        if ($scope.page.searchList && $scope.page.searchList.length <= 0) {
                            $rootScope.showMsg('warning', 'Please use any one filter.')
                            return;
                        }
                    }
                    if ($scope.page.boxOptions.linkColumns !== undefined) {
                        if ($scope.page.searchList === undefined)
                            $scope.page.searchList = []
                        angular.forEach($scope.page.boxOptions.linkColumns, function (link) {
                            var search = {};
                            search.field = link.name;
                            search.operand = '=';
                            search.value = link.value;
                            $scope.page.searchList.push(search)
                        })
                    }
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

                function _validateForm(form) {
                    var valid = true;
                    ////console.log(form)
                    if (!form['$valid']) {
                        if (form['$error'] !== undefined) {
                            var err = form['$error'];
                            if (err.required) {
                                if (err.required.length > 0) {
                                    var fieldName = err.required[0].$name;
                                    err.required[0].$setTouched();
                                    err.required[0].$setDirty();
                                    ////console.log(err)
                                    focus(fieldName);
                                    valid = false;
                                }
                            }

                            ////console.log(err)
                            if (err['emailError']) {
                                alert('email failed');
                                valid = false;
                            }
                            if (err['email'] !== undefined) {
                                alert('invalid email');
                                valid = false;
                            }
                            if (err['maxlength'] !== undefined) {
                                alert('invalid length')
                                valid = false
                            }
                            if (err['pattern'] !== undefined) {
                                ////console.log(err['pattern'])
                                alert('invalid pattern')
                                valid = false
                            }
                        }
                    }
                    return valid;
                }
                function _saveForm(form) {

                    if (_validateForm(form)) {
                        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
                            $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
                    }
                }
                function _resetForm(editForm) {
                    if (editForm) {
                        editForm.$setPristine();
                    }
                    $scope.entity = angular.copy($scope.oldEntity);
                }

                //find entity
                function _findEntity() {
                    $scope.form.isLoaded = false;
                    $scope.form.isLoading = true;
                    $timeout(function () {
                        pageService.findEntity($scope.page.pageinfo.tableid, $scope.page.pkId, undefined).then(
                            _findEntitySuccessResult, _findEntityErrorResult);
                    });
                }
                function _findEntitySuccessResult(result) {
                    $scope.form.isLoaded = true;
                    $scope.form.isLoading = false;
                    $scope.entity = result;
                    ////console.log($scope.entity)
                    $scope.oldEntity = angular.copy(result)
                }
                function _findEntityErrorResult(err) {
                    $scope.form.isLoaded = true;
                    $scope.form.isLoading = false;
                }
                $scope.$on('form-success', function (successEvent, result) {
                    if (result.entity[$scope.page.pageinfo.idencolname] !== undefined) {
                        if ($scope.page.boxOptions !== undefined) {
                            if ($scope.page.boxOptions.enableAutoRefresh !== undefined) {
                                if ($scope.page.boxOptions.enableAutoRefresh) {
                                    _refreshData()
                                }
                            }
                        }
                        _closeForm();
                    }
                })
                $scope.$on('apply-filter', function (successEvent, searchList) {
                    
                    // console.log(searchList)
                    // console.log('from gridbox', $scope.page)
                    if (searchList) {
                        $scope.page.searchList = searchList;
                        // console.log(searchList)
                        _refreshData();
                    }
                })
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