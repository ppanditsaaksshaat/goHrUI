

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empExperienceController', empExperienceController);

    /** @ngInject */
    function empExperienceController($scope, $state, $rootScope, $stateParams, pageService, editFormService) {

        var empId = $stateParams.empid
        var expTableId = 62;
        var expPageId = 56;
        $scope.grid = true;
        $scope.entity = {};
        $scope.editentity = {};

        $scope.add = _add;
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
                { name: 'WEOrganizName', displayName: 'Organisation', width: 100, enableCellEdit: false },
                { name: 'WEDesignation', displayName: 'Designation', width: 100, enableCellEdit: false },
                { name: 'WEDomain', displayName: 'Domain', width: 90, enableCellEdit: false },
                { name: 'WEFrom', displayName: 'From', width: 95, enableCellEdit: false },
                { name: 'WETo', displayName: 'To', width: 95, enableCellEdit: false },
                { name: 'WECompanyAddress', displayName: 'Location', width: 90, enableCellEdit: false },
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
            var searchLists = [];
            var searchListData = {
                field: 'WEEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(expTableId, expPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)

            function _getTableDataSuccessResult(result) {

                $scope.gridOptions.data = angular.copy(result);
            }
            function _getTableDataErrorResult(err) {
                console.log(err)
            }
        }

        function _editRecord(row) {
            $scope.grid = false;
            $scope.addForm = false;
            $scope.editForm = true;
            $scope.editentity = angular.copy(row.entity);
            $scope.oldEntity = angular.copy(row.entity);

        }
        function _add(entity, form) {
            entity.WEEmpId = empId
            _formSaveUpdate(entity, expPageId, 'create', {}, form, false)
        }
        function _update(entity, form) {
            _formSaveUpdate(entity, expPageId, 'edit', $scope.oldEntity, form, false)
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
                    $scope.showMsg("success", "Work Experience Detail Updated")
                }
                else {
                    _loadController();
                    $scope.showMsg("success", "Work Experience Detail Added")
                }
            }
        }
        function _errorResult(err) {
            console.log(err)
        }

        function _close() {
            $scope.modalInstance.close("success");
        }

        $scope.$watch('entity.WEFrom', function (value) {

            if ($scope.entity.WEFrom != undefined && $scope.entity.WETo != undefined) {
                var sdt = new Date($scope.entity.WEFrom);
                var difdt = new Date(new Date($scope.entity.WETo) - sdt);
                //  console.log()
                $scope.entity.WEDuration = (difdt.toISOString().slice(0, 4) - 1970) + " Year " + (difdt.getMonth()) + " Month " + difdt.getDate() + " Day";

            }
        });
        $scope.$watch('entity.WETo', function (value) {
            if ($scope.entity.WEFrom != undefined && $scope.entity.WETo != undefined) {
                var sdt = new Date($scope.entity.WEFrom);
                var difdt = new Date(new Date($scope.entity.WETo) - sdt);
                $scope.entity.WEDuration = (difdt.toISOString().slice(0, 4) - 1970) + " Year " + (difdt.getMonth()) + " Month " + difdt.getDate() + " Day";
            }
        });

        $scope.$watch('editentity.WEFrom', function (value) {

            if ($scope.editentity.WEFrom != undefined && $scope.editentity.WETo != undefined) {
                var sdt = new Date($scope.editentity.WEFrom);
                var difdt = new Date(new Date($scope.editentity.WETo) - sdt);
                //  console.log()
                $scope.editentity.WEDuration = (difdt.toISOString().slice(0, 4) - 1970) + " Year " + (difdt.getMonth()) + " Month " + difdt.getDate() + " Day";

            }
        });
        $scope.$watch('editentity.WETo', function (value) {
            if ($scope.editentity.WEFrom != undefined && $scope.editentity.WETo != undefined) {
                var sdt = new Date($scope.editentity.WEFrom);
                var difdt = new Date(new Date($scope.editentity.WETo) - sdt);
                $scope.editentity.WEDuration = (difdt.toISOString().slice(0, 4) - 1970) + " Year " + (difdt.getMonth()) + " Month " + difdt.getDate() + " Day";
            }
        });

        _loadController();
    }
})()