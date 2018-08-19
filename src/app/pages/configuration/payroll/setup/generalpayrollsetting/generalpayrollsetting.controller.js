/**
 * @author NKM
 * created on 16.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.setup')
        .controller('generalPayrollSettingController', generalPayrollSettingController);

    /** @ngInject */
    function generalPayrollSettingController($scope, $rootScope, $state, $filter, pageService, dialogModal, editFormService, param) {


        var vm = this;
        var pageId = 331;
        // var tempName = $stateParams.name;
        // var currentState = $state.current;

        if (param != undefined) {
            $scope.edit = true;
            $scope.entity = param;
            $scope.oldEntity = angular.copy($scope.entity)
        }

        $scope.clearEntity = _clearEntity;
        $scope.closeForm = _closeForm;
        $scope.oldEntity = {};
        $scope.saveForm = _saveForm;
        $scope.clearAllEntity = true;
        $scope.changeMonthType = _changeMonthType;

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }


        $scope.salaryCalculatedOn = _salaryCalculatedOn;

        function _loadController() {
            pageService.getPagData(331).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.page = result.pageinfo.fields;
            $scope.pageInfo = result.pageinfo;

        }

        function _getPageErrorResult(err) {
            console.log(err)
        }


        function _salaryCalculatedOn(value) {
            if (value == 1) {
                $scope.entity.LSCFixDay = 0
                $scope.entity.LSCTotalDayInCycle = 1
                $scope.entity.LSCTotalWorkingDay = 0
            }
            else if (value == 2) {
                $scope.entity.LSCFixDay = 0
                $scope.entity.LSCTotalDayInCycle = 0
                $scope.entity.LSCTotalWorkingDay = 1
            }
            else {
                $scope.entity.LSCFixDay = 1
                $scope.entity.LSCTotalDayInCycle = 0
                $scope.entity.LSCTotalWorkingDay = 0
            }
        }

        function _clearEntity() {
            console.log($scope.clearAllEntity)
            if ($scope.page.action != 'edit') {
                $scope.clearAllEntity = true;
            }
            if ($scope.clearAllEntity) {
                var oldData = $scope.entity.LSCSCDId;
                console.log($scope.entity)
                $scope.entity = {};
                $scope.entity.LSCSCDId = oldData;
            }

        }

        function _editRecord(row) {

            $scope.clearAllEntity = false;
            console.log(row)

            $scope.entity = row.entity;
            $scope.oldEntity = angular.copy(row.entity);
            console.log(row.entity)
            console.log($scope.entity)

            $scope.showEditForm = true;
            if ($scope.entity.LSInBetMonthId) {
                $scope.entity.monthType = "2";
            }
            else if ($scope.entity.LSCEndOfMonth) {
                $scope.entity.monthType = "1";
            }

            if ($scope.entity.LSCFixDay) {
                $scope.entity.salaryCalOn = 3
            }
            else if ($scope.entity.LSCTotalWorkingDay) {
                $scope.entity.salaryCalOn = 2
            }
            else if ($scope.entity.LSCTotalDayInCycle) {
                $scope.entity.salaryCalOn = 1
            }

            $scope.entity.LSCFixDay = 0
            $scope.entity.LSCTotalDayInCycle = 1
            $scope.entity.LSCTotalWorkingDay = 0

        }
        function _closeForm(editForm) {
            $scope.showEditForm = false;
        }

        function _changeMonthType(monthType) {
            if (monthType == "1") {
                $scope.entity.LSCEndOfMonth = true;
                $scope.entity.LSInBetMonthId = false;
                $scope.entity.LSCFromDay = 0;
                $scope.entity.LSCToDay = 0
            }
            else if (monthType == "2") {
                $scope.entity.LSCEndOfMonth = false;
                $scope.entity.LSInBetMonthId = true;
            }
        }

        function _saveForm(editForm) {
            console.log('save record');
            if (_validateForm(editForm)) {
                editFormService.saveForm(pageId, $scope.entity,
                    $scope.oldEntity, $scope.entity.LSCId == undefined ? "create" : "edit", 'Save', undefined, true).then(_successSalarySetting, _errorSalarySetting);
                // (496, $scope.entity, $scope.oldEntity,
                //     $scope.entity.BADId == undefined ? "create" : "edit", 'Save', undefined, true)
                // $scope.page.refreshData();
                console.log(pageId + 'pageid')
                console.log($scope.entity)
                console.log($scope.oldEntity)
                console.log($scope.page.action + 'edit')
            }
        }


        function _successSalarySetting(result) {
            console.log(result)
            if (result.success_message == 'Added New Record.') {
                $rootScope.showMsg("success", "Record save successfully.")
            }
            else if (result.success_message == 'Record Updated.') {
                $rootScope.showMsg("success", "Record Updated.")
            }
            _childmethod()
            $scope.$close();

        }

        function _errorSalarySetting(error) {
            _childmethod()
            $scope.$close();

        }
        function _validateForm(editForm) {
            // console.log(editFormService)
            // var valid = editFormService.validateForm(editForm)
            // return valid;
            return true;

        }


        _loadController()

    }
})();