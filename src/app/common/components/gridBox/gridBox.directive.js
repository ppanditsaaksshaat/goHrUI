/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('gridBox', gridBox);
    /** @ngInject */
    function gridBox($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService,
        editFormService, focus, $filter) {
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
                //     //////console.log('ctrl', newValue, OldValue, scope)
                //     //////console.log(scope.page.boxOptions)
                //     //////console.log(scope.page.isLoaded)
                // });

            },
            link: function ($scope, elm, attrs, ctrl) {

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
                    showDialog: false,//show edit box on dialog mode,
                    enableSelection: true,//enable selection on grid
                    enableRefreshAfterUpdate: true,
                    enableAutoRefresh: true,
                    showDataOnLoad: true,
                    showApplyFilter: true,
                    filterOnChange: null,//an event for filter box
                    defaultEntity: {},//providing default values to add form
                    gridStyle: { height: '450px' },
                    noResultMessageText: undefined,
                    customButtons: [],
                    customButtonsWithDefault: [],
                    selectedRowButtons: [],
                    customColumns: [],//for adding additional columns
                    columnDesign: [],//for reordering columns
                    pageResult: null,
                    dataResult: null,
                    saveResult: null,
                    afterCellEdit: null,//external cell edit event
                    onRegisterApi: null,
                    fieldEvents: []
                }

                //customButtons, selectedRowButtons: text, icon, onClick, type:btn-detault
                //customColumns:text,click,type:a|button|text|dd,pin:true|false,
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
                //console.log($scope.page)
                if ($scope.page.gridOptions === undefined) {
                    $scope.page.gridOptions = angular.copy(gridOptions);
                }

                //setting up conditional grid options
                if (!$scope.page.boxOptions.enableSelection) {
                    $scope.page.gridOptions.enableRowSelection = false;
                    $scope.page.gridOptions.enableRowHeaderSelection = false;
                }


                $scope.oldEntity = {};
                var pageInfoWach = $scope.$watch('page.pageinfo', function () {
                    //console.log($scope.page.pageinfo)
                    _setGridColumns();
                    _setupVerticalForm();


                    if ($scope.page.pageinfo) {
                        if ($scope.page.pageinfo.idencolname) {
                            pageInfoWach();
                        }
                    }

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
                $scope.clearForm = _clearForm;


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
                function _addRecord(editForm) {
                    $scope.page.isAllowEdit = true;
                    editForm.isAllowEdit = true;
                    $scope.entity = {};
                    //attaching default values form local controller if any
                    $scope.entity = angular.extend({}, $scope.page.boxOptions.defaultEntity, $scope.entity)

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

                            angular.forEach($scope.page.pageinfo.columns, function (col, idx) {
                                if (col.editable.controltype == 'datepicker') {
                                    $scope.entity[col.name] = moment(row.entity[col.name]).format('DD-MMM-YYYY')
                                }
                                if (col.editable.controltype == 'datetimepicker') {
                                    $scope.entity[col.name] = moment(row.entity[col.name]).format('DD-MMM-YYYY')
                                }
                                if (col.editable.controltype == 'timepicker') {
                                    $scope.entity[col.name] = moment(row.entity[col.name]).format('HH:mm')
                                }
                            })

                            // $scope.entity.InTime = moment(row.entity.InTime).format('HH:mm')
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
                    //////console.log('register grid api')
                    $scope.page.gridApi = gridApi;
                    if ($scope.page.boxOptions.onRegisterApi) {
                        $scope.page.boxOptions.onRegisterApi(gridApi)
                    }

                    //for all select event
                    gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {

                        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
                        // $scope.grid1Api.selection.getSelectedRows().forEach(function (row) {
                        //     //Do something
                        // });
                    });
                    // for individual select event
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {


                        $scope.page.selectedRows = gridApi.selection.getSelectedRows();
                        // if (row.isSelected) {
                        //     //enable edit button

                        //     uivm.currentSelection = uivm.gridApi.selection.getSelectedRows();
                        //     ////////console.log(uivm.currentSelection)
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

                    //allow editing event
                    gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                        if ($scope.page.boxOptions.afterCellEdit) {
                            //calling external change event
                            $scope.page.boxOptions.afterCellEdit(rowEntity, colDef, newValue, oldValue, $scope.page)
                        }

                    })
                }
                function _closeViewRecord() {
                    _closeForm();
                }
                function _closeAddRecord() {
                    _closeForm();
                }
                function _closeForm(editForm) {
                    editForm.isAllowEdit = false;
                    $scope.page.showAddRecord = false;
                    $scope.page.showViewRecord = false;
                    $scope.entity = {};
                    if (editForm) {
                        editForm.$setPristine();
                    }
                }

                function _clearForm(editForm) {

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
                                $scope.page.pageinfo.columns, $scope.page, isEdit, isDelete, isHelp, isEdit,
                                $scope.page.boxOptions.showRowMenu);


                            //re-desiging column as per custom requirements
                            if ($scope.page.boxOptions.columnDesign) {
                                $scope.page.cssClasses = [];
                                var newColumnDefs = [];
                                for (var c = 0; c < $scope.page.boxOptions.columnDesign.length; c++) {
                                    var colDesg = $scope.page.boxOptions.columnDesign[c];
                                    var findCol = $filter('findObj')($scope.page.pageinfo.columns, colDesg.name, 'name')
                                    if (findCol != null) {
                                        var newCol = angular.copy(findCol);
                                        if (colDesg.pinnedRight)
                                            newCol.pinnedRight = true;
                                        if (colDesg.pinnedLeft)
                                            newCol.pinnedLeft = true;
                                        if (colDesg.cellClass) {
                                            var cssCl = {};
                                            cssCl.key = colDesg.name
                                            cssCl.cellClass = colDesg.cellClass;

                                            $scope.page.cssClasses.push(cssCl)
                                            newCol["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {

                                                var findCss = $filter('findObj')($scope.page.cssClasses, col.name, 'key')
                                                if (findCss != null) {
                                                    return findCss.cellClass;
                                                }
                                                return '';
                                            }
                                        }

                                        if (colDesg.visible !== undefined)
                                            newCol['visible'] = colDesg.visible;

                                        if (colDesg.width !== undefined)
                                            newCol['width'] = colDesg.width;

                                        if (colDesg.cellTemplate !== undefined)
                                            newCol['cellTemplate'] = colDesg.cellTemplate;

                                        if (colDesg.cellTemplate !== undefined)
                                            newCol['cellTemplate'] = colDesg.cellTemplate;

                                        if (colDesg.cellEditableCondition !== undefined){
                                            newCol['cellEditableCondition'] = colDesg.cellEditableCondition;
                                            // newCol['enableCellEdit'] = true;
                                        }

                                        
                                        newColumnDefs.push(newCol)
                                    }
                                }

                                if (newColumnDefs.length > 0) {
                                    $scope.page.gridOptions.columnDefs = [];
                                    $scope.page.gridOptions.columnDefs = newColumnDefs;
                                }
                            }
                            //console.log($scope.page)
                            if ($scope.page.boxOptions.customColumns) {
                                if ($scope.page.boxOptions.customColumns != null) {
                                    angular.forEach($scope.page.boxOptions.customColumns, function (col) {

                                        $scope.page[col.name + "_click"] = col.click;

                                        var custColumn = {};
                                        var cellTemplate = "<div class='ui-grid-cell-contents' title='" + col.text + "'><a ng-click='grid.appScope.page." + col.name + "_click(row)' style='cursor:pointer'>" + col.text + "</a></div>"
                                        custColumn.name = col.name
                                        custColumn.field = col.name
                                        custColumn.cellTemplate = '';
                                        custColumn['cellTemplate'] = cellTemplate;
                                        custColumn['visible'] = true;
                                        custColumn["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                                            if (row.entity.StatusBGClass !== undefined) {
                                                return 'status-bg ' + row.entity.StatusBGClass;
                                            }
                                        }
                                        if (col.pin)
                                            custColumn.pinnedRight = true;
                                        if (col.width)
                                            custColumn.width = col.width;
                                        else
                                            custColumn.width = 100;

                                        //console.log($scope.page.gridOptions.columnDefs);
                                        $scope.page.gridOptions.columnDefs.push(custColumn);

                                    })
                                }
                            }
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
                    $scope.page.pageIsLoaded = false;
                    $scope.page.pageIsLoading = true;
                    $timeout(function () {
                        //////console.log($scope.page);
                        pageService.getPagData($scope.page.pageId).then(_getPageSuccessResult, _getPageErrorResult)
                    });
                }
                function _getPageSuccessResult(result) {
                    //console.log(result)
                    var isErrored = false;
                    if (result.error_message) {
                        $scope.isErrorOccured = true;
                        if (result.error_message.Message) {
                            $scope.errorText = result.error_message.Message
                        }
                    }
                    else {
                        $scope.page = angular.extend({}, $scope.page, result);
                        //console.log(result)
                        //console.log($scope.page)
                        $scope.page.pageIsLoaded = true;
                        $scope.page.pageIsLoading = false;
                        if ($scope.page.boxOptions.pageResult) {
                            if ($scope.page.boxOptions.pageResult != null) {
                                $scope.page.boxOptions.pageResult(result);
                            }
                        }
                        angular.forEach($scope.page.pageinfo.fields, function (field) {
                            var customField = $filter('findObj')($scope.page.boxOptions.fieldEvents, field.name, 'name')
                            //console.log(customField)
                            if (customField) {
                                if (customField.changeEvent) {
                                    field.onChangeEvent = customField.changeEvent;
                                    //console.log(field.onChangeEvent)
                                }
                            }
                        });

                        if ($scope.page.boxOptions.showDataOnLoad)
                            _refreshData();
                    }
                }
                function _getPageErrorResult(err) {
                    $scope.page.pageIsLoaded = true;
                    $scope.page.pageIsLoading = false;
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
                            var oldSearch = $filter('findObj')($scope.page.searchList, link.name, 'field')
                            if (oldSearch == null)
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
                    $scope.page.dataIsLoaded = false
                    $scope.page.dataIsLoading = true
                    $scope.page.gridOptions.data = []
                    tableData.then(_getTableSuccessResult, _getTableErrorResult)
                }
                function _getTableErrorResult(err) {
                    //console.log(err)
                    $scope.page.dataIsLoaded = true;
                    $scope.page.dataIsLoading = false;
                }
                function _getTableSuccessResult(result) {
                    //console.log(result)
                    $scope.page.dataIsLoaded = true;
                    $scope.page.dataIsLoading = false;

                    if (result == 'NoDataFound') {
                        $scope.page.boxOptions.noResultMessageText = 'No data found.'
                        // uivm.showMsg('warning', 'No Record Found.');
                    } else if (result.Errors !== undefined) {
                        // uivm.showMsg('error', result.Message);
                        // _startMsgTimer();
                    }
                    else {

                        $scope.page.gridOptions.data = result;
                    }

                    if ($scope.page.boxOptions.dataResult) {
                        if ($scope.page.boxOptions.dataResult != null) {
                            $scope.page.boxOptions.dataResult(result);
                        }
                    }
                }
                //end get table data 

                function _validateForm(form) {
                    var valid = true;
                    //////console.log(form)
                    if (!form['$valid']) {
                        if (form['$error'] !== undefined) {
                            var err = form['$error'];
                            if (err.required) {
                                if (err.required.length > 0) {
                                    var fieldName = err.required[0].$name;
                                    err.required[0].$setTouched();
                                    err.required[0].$setDirty();
                                    //////console.log(err)
                                    focus(fieldName);
                                    valid = false;
                                }
                            }

                            //////console.log(err)
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
                                //////console.log(err['pattern'])
                                alert('invalid pattern')
                                valid = false
                            }
                        }
                    }
                    return valid;
                }
                function _saveForm(form) {
                    $scope.currentForm = form;
                    if (_validateForm(form)) {
                        editFormService.saveForm($scope.page.pageinfo.pageid, $scope.entity,
                            $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
                            .then(_saveFormSuccess, _saveFormError)
                    }
                }

                function _saveFormSuccess(result) {
                    $rootScope.showMsg('success', $scope.page.pageinfo.tagline + " saved successfully.")
                    if (result.entity[$scope.page.pageinfo.idencolname] !== undefined) {
                        if ($scope.page.boxOptions !== undefined) {
                            if ($scope.page.boxOptions.enableAutoRefresh !== undefined) {
                                if ($scope.page.boxOptions.enableAutoRefresh) {
                                    _refreshData()
                                }
                            }
                        }
                        _closeForm($scope.currentForm);
                    }
                }
                function _saveFormError(err) {
                    //console.log(err)
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
                    // $timeout(function () {
                    //     pageService.findEntity($scope.page.pageinfo.tableid, $scope.page.pkId, undefined).then(
                    //         _findEntitySuccessResult, _findEntityErrorResult);
                    // });
                }
                function _findEntitySuccessResult(result) {
                    $scope.form.isLoaded = true;
                    $scope.form.isLoading = false;
                    $scope.entity = result;
                    //////console.log($scope.entity)
                    $scope.oldEntity = angular.copy(result)
                }
                function _findEntityErrorResult(err) {
                    $scope.form.isLoaded = true;
                    $scope.form.isLoading = false;
                }
                $scope.$on('form-success', function (successEvent, result) {

                })
                $scope.$on('apply-filter', function (successEvent, searchList) {

                    // //console.log(searchList)
                    // //console.log('from gridbox', $scope.page)
                    if (searchList) {
                        $scope.page.searchList = searchList;
                        // //console.log(searchList)
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