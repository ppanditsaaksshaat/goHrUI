

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empRelationController', empRelationController);

    /** @ngInject */
    function empRelationController($scope, $rootScope, $stateParams, pageService, editFormService) {

        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        var relTableId = 56;
        var relPageId = 52;
        var columnIds = ['267', '4255'];
        $scope.grid = true;
        $scope.entity = {};
        $scope.editentity = {};

        $scope.add = _add;
        $scope.editRecord = _editRecord;
        $scope.update = _update;
        $scope.save = _save;
        $scope.close = _close;

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            columnDefs: [
                { name: 'RelationshipName', displayName: 'Relation', width: 100, enableCellEdit: false },
                { name: 'FdName', displayName: 'Name', width: 100, enableCellEdit: false },
                { name: 'FdEmail', displayName: 'Email', width: 100, enableCellEdit: false },
                { name: 'FdMobile', displayName: 'Mobile', width: 110, enableCellEdit: false },
                { name: 'GenderName', displayName: 'Gender', width: 100, enableCellEdit: false },
                {
                    name: 'Edit',
                    width: 70,
                    cellEditableCondition: false,
                    cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='Edit' tooltip-placement='right' href><i class='fa fa-edit fa-lg'></i></a></div>"
                },

            ],
            data: []
        }

        function _loadController() {

            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {
                $scope.dropDownLists = result;
            }
            function _getAllSelectErrorResult(err) {
                console.log(err)
            }
        
            var searchLists = [];
            var searchListData = {
                field: 'FdEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(relTableId, relPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            function _getTableDataSuccessResult(result) {
                console.log(result)
                $scope.gridOptions.data = angular.copy(result);
            }
            function _getTableDataErrorResult(err) {
                console.log(err)
            }
        }

        function _add() {
            $scope.entity = {};
        }

        function _editRecord(row) {
            $scope.grid = false;
            $scope.addForm = false;
            $scope.editForm = true;
            $scope.editentity = angular.copy(row.entity);
            $scope.oldEntity = angular.copy(row.entity);

        }

        function _save(entity, form) {
            entity.FdEmpId = empId
            _formSaveUpdate(entity, relPageId, 'create', {}, form, false)
        }
        function _update(entity, form) {
            _formSaveUpdate(entity, relPageId, 'edit', $scope.oldEntity, form, false)
        }

        function _formSaveUpdate(entity, pageId, action, oldEntity, editForm, showConfirmation) {
            editFormService.saveForm(pageId, entity, oldEntity,
                action, "", editForm, showConfirmation)
                .then(_successResult, _errorResult)
        }
        function _successResult(result) {
            console.log(result)
            if (result.success_message == "Record Updated." || result.success_message == "Added New Record.") {
                $scope.grid = true;
                $scope.addForm = false;
                $scope.editForm = false;
                if (result.success_message == "Record Updated.") {
                    _loadController();
                    $scope.showMsg("success", "Education Detail Updated")
                }
                else {
                    _loadController();
                    $scope.showMsg("success", "Education Detail Added")
                }
            }
        }
        function _errorResult(err) {
            console.log(err)
        }

        function _close() {
            $scope.modalInstance.close("success");
        }

        _loadController();
    }
})();