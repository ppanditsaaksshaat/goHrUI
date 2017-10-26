/**
 * @author pardeep pandit
 * created on 4.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('employeeDocumentDetail', employeeDocumentDetail);

    /** @ngInject */
    /** @ngInject */
    function employeeDocumentDetail($scope, $stateParams,
        pageService, $timeout, $filter, editFormService, $state, dialogModal, uiGridConstants, $rootScope) {

        /**
         * local variable declaration
         */
        var empPKId = $stateParams.empId;
        $scope.documentList = true;
        $scope.tab = true;
        $scope.actionOption = true;
        var empDocumentTableId = 199;
        var empDocumentPageId = 188;


        $scope.documentOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            multiSelect: false,
            onRegisterApi: _onRegisterApi
        };
        // $scope.documentOptions.

        /**
         * private funtion
         */

        $scope.addRecord = _addRecord;
        $scope.editRecord = _editRecord;
        $scope.refresh = _refresh;
        $scope.list = _list;
        $scope.close = _close;
        $scope.save = _save;
        $scope.downloadFile = _downloadFile;

        function _loadController() {

            pageService.getPagData(empDocumentPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)

        }

        function _getPageDataSuccessResult(result) {
            console.log(result)
            if (result != "NoDataFound") {
                $scope.page = result;
                $scope.documentOptions.columnDefs = []
                angular.forEach($scope.page.pageinfo.columns, function (col) {
                    if (col.name != "EDocDId" && col.name != "EmpName" && col.name != "EDocDEmpId" && col.name != "EDocDDTId" && col.name != "FileId" && col.name != "EDocDDSId" && col.name != "DSName") {
                        var column = { name: col.name, displayName: col.displayName, width: 130, enableCellEdit: false }
                        $scope.documentOptions.columnDefs.push(column)
                    }

                });
                $scope.documentOptions.columnDefs.push({
                    name: '-',
                    enableCellEdit: false,
                    enableFiltering: true,
                    cellTemplate: "<div class='ui-grid-cell-contents dupl' title='Download Attached File' ><a ng-click='grid.appScope.downloadFile(row.entity.CDFileId)'>Download File</a></div>"
                })
                var searchLists = [];
                var searchListData = {
                    field: 'EDocDEmpId',
                    operand: '=',
                    value: empPKId
                }
                searchLists.push(searchListData)

                var data = {
                    searchList: searchLists,
                    orderByList: []
                }

                pageService.getTableData(empDocumentTableId, empDocumentPageId, '', '', false, data).then(tableDataSuccessResult, tableDataErrorResult)

            }
        }
        function _getPageDataErrorResult(err) {
            console.log(err);
        }
        function tableDataSuccessResult(result) {
            console.log(result)
            $scope.documentOptions.data = result;
            // if (result != "NoDataFound") {
            //     console.log(result)
            //     $scope.page = result;
            // }
        }
        function tableDataErrorResult(err) {
            console.log(err);
        }
        function _addRecord() {
            $scope.entity = {};
            $scope.page.isAllowEdit = true;
            $scope.documentList = false;
        }
        function _editRecord() {
            $scope.page.isAllowEdit = true;
            $scope.documentList = false;
        }
        function _refresh() {

        }
        function _list() {
            $state.go("organization.employees.list");
        }
        function _close() {
            $scope.documentList = true;
            $scope.tab = true;
            $scope.actionOption = true;
            $scope.gridApi.selection.clearSelectedRows();
        }
        function _save(entity, editForm) {
            console.log(entity)
            if (_validateForm(entity, $scope.documentOptions.data)) {
                var action = "";
                if (entity.EDocDId == undefined) {
                    action = 'create';
                }
                else {
                    action = 'edit';
                }
                entity.EDocDEmpId = empPKId;
                editFormService.saveForm(empDocumentPageId, entity, {},
                    action, $scope.page.pageinfo.title, editForm, true)
                    .then(_saveSuccessResult, _saveErrorResult)
            }
        }
        function _saveSuccessResult(result) {

            if (result.success_message = "Added New Record.") {
                pageService.saveFileAttach($scope.file, empDocumentPageId, empDocumentTableId, empPKId, result.entity.EDocDDTId)
                $scope.$on("fileUploadComplete", _upload)
                function _upload(evt, data) {
                    if (data.count > 0) {
                        $scope.documentList = true;
                        $scope.showMsg("success", result.success_message)
                        _loadController();
                    }
                    else {
                        $scope.showMsg("error", "Your file is not uploaded")
                    }
                }

            }
            else {
                $scope.showMsg("error", "Your record is not saved")
            }
        }
        function _saveErrorResult(err) {
            console.log(err);
        }
        function _validateForm(entity, oldData) {


            if (entity.EDocDDTId == undefined) {
                $scope.showMsg("error", "Please Select Document Type")
                return false;
            }
            if ($scope.file == undefined) {
                $scope.showMsg("error", "Please Select Your File To Upload")
                return false;
            }
            if (entity.EDocDValidFrom == undefined) {
                $scope.showMsg("error", "Please Select Valid From")
                return false;
            }
            if (entity.EDocValidTo == undefined) {
                $scope.showMsg("error", "Please Select Valid To")
                return false;
            }
            if (entity.EDocDRevivalNxtDt == undefined) {
                $scope.showMsg("error", "Please Select Revival Next Date")
                return false;
            }
            if (entity.EDocDDescription == undefined) {
                $scope.showMsg("error", "Please Enter Description")
                return false;
            }

            var exist = $filter('findObj')(oldData, entity.EDocDDTId, 'EDocDDTId');
            if (exist != null) {
                $scope.showMsg("error", "This docoument type already exist ")
                return false;
            }
            return true;

        }
        function _onRegisterApi(gridApi) {
            //////console.log('register grid api')
            $scope.gridApi = gridApi;

            //for all select event
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.page.selectedRows = gridApi.selection.getSelectedRows();
            });
            // for individual select event
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                console.log(gridApi.selection.getSelectedRows())
                if (gridApi.selection.getSelectedRows().length > 0) {
                    $scope.tab = false;
                    $scope.actionOption = false;
                    $scope.document = row.entity;
                    $scope.entity = row.entity;

                } else {

                    $scope.tab = true;
                    $scope.actionOption = true;
                }
                //  gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);

            });

            //allow editing event
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                if ($scope.page.boxOptions.afterCellEdit) {
                    //calling external change event
                    $scope.page.boxOptions.afterCellEdit(rowEntity, colDef, newValue, oldValue, $scope.page)
                }

            })
        }

        function _downloadFile(id) {

            var file = {
                id: id
            }
            console.log(file)
            var options = {
                url: "app/pages/organization/employees/templates/document/browseModal.html",
                controller: "documentUploadController",
                param: file
            }
            dialogModal.open(options)
        }
        _loadController();


    }
})();
