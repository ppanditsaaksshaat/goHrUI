

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empExperienceController', empExperienceController);

    /** @ngInject */
    function empExperienceController($scope, $state, $rootScope, $stateParams, pageService, dialogModal, param, editFormService) {

        var empId = $stateParams.empid
        var sdt = new Date('1950-01-30');
        var difdt = new Date(new Date() - sdt);
        //  alert((difdt.toISOString().slice(0, 4) - 1970) + " Year " + (difdt.getMonth() + 1) + " Month " + difdt.getDate() + "Day");
        var expTableId = 62;
        var expPageId = 56;

        $scope.grid = true;

        $scope.add = _add;
        $scope.editRecord = _editRecord;
        $scope.update = _update;

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
            var searchList = [];
            var searchField = {
                field: 'WEEmpId',
                operand: "=",
                value: empId
            }
            searchList.push(searchField);
            pageService.findEntity(expTableId, undefined, searchList).then(_findEntitySuccessResult, _findEntityErrorResult)

            function _findEntitySuccessResult(result) {
                console.log(result)
                // angular.forEach(result, function (data) {
                //     data.WEFrom = angular.copy(moment(data.WEFrom).format("DD-MMM-YYYY"));
                //     data.WETo = angular.copy(moment(data.WETo).format("DD-MMM-YYYY"));

                // })
                $scope.gridOptions.data = angular.copy(result);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
            //    $scope.entity = param;
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
                $scope.gridOptions.data = [];

                //    _loadController();
                if (result.success_message == "Record Updated.") {
                    $scope.gridOptions.data = angular.copy(result.entity);
                    $scope.showMsg("success", "Work Experience Detail Updated")
                }
                else {
                    $scope.gridOptions.data.push(angular.copy(result.entity));
                    $scope.showMsg("success", "Work Experience Detail Added")
                }
            }
        }
        function _errorResult(err) {
            console.log(err)
        }
        _loadController();
    }
})()