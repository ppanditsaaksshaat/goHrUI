

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empEducationController', empEducationController);

    /** @ngInject */
    function empEducationController($scope, $stateParams, pageService, editFormService) {

        var empId = $stateParams.empid
        var eduTableId = 119;
        var eduPageId = 112;
        var columnIds = ['653'];
        $scope.grid = true;
        $scope.entity = {};
        $scope.editentity = {};

        $scope.add = _add;
        $scope.save = _save;
        $scope.editRecord = _editRecord;
        $scope.update = _update;
        $scope.close = _close;

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            columnDefs: [
                { name: 'QualificationName', displayName: 'Qualification', width: 100, enableCellEdit: false },
                { name: 'QualInstititeName', displayName: 'Board', width: 100, enableCellEdit: false },
                { name: 'QualMajorSpecialization', displayName: 'Specialization', width: 100, enableCellEdit: false },
                { name: 'QualStartDate', displayName: 'FromDate', width: 100, enableCellEdit: false },
                { name: 'QualEndDate', displayName: 'EndDate', width: 100, enableCellEdit: false },
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
                console.log(result)
                $scope.dropDownLists = result;

            }
            function _getAllSelectErrorResult(err) {

            }

            var searchLists = [];
            var searchListData = {
                field: 'QualiEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(eduTableId, eduPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            function _getTableDataSuccessResult(result) {

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
            entity.QualiEmpId = empId
            _formSaveUpdate(entity, eduPageId, 'create', {}, form, false)
        }
        function _update(entity, form) {
            _formSaveUpdate(entity, eduPageId, 'edit', $scope.oldEntity, form, false)
        }

        function _formSaveUpdate(entity, pageId, action, oldEntity, editForm, showConfirmation) {
            editFormService.saveForm(pageId, entity, oldEntity,
                action, "", editForm, showConfirmation)
                .then(_successResult, _errorResult)
        }
        function _successResult(result) {

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
})()