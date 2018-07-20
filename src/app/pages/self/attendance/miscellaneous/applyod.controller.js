/**
 * @author NKM
 * created on 20.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('applyODController', applyODController);

    /** @ngInject */
    function applyODController($scope, $rootScope, $state, pageService, entity, editFormService) {
        console.log('apply coff')
        var vm = this;
        vm.oldEntity = {};
        var pageId = 294;
        $scope.page = $scope.createPage();
        // $scope.selects = selects;
        $scope.entity = entity;
        $scope.entity.FDAFromDate = moment(entity.DATE).format('DD-MMM-YYYY');
        console.log($scope.entity)
        $scope.newEntity = {};

        $scope.addAttendance = _addAttendance;

        function _addAttendance() {
            var newEntity = {};
            $scope.newEntity.FADEmpId = 5;
            $scope.newEntity.FDAFromDate = $scope.entity.FDAFromDate;
            $scope.newEntity.FDAToDate = $scope.entity.FDAFromDate;
            $scope.newEntity.FADInTime = $scope.entity.FADInTime;
            $scope.newEntity.FDAOutTime = $scope.entity.FDAOutTime;
            $scope.newEntity.FDARemark = $scope.entity.FDARemark;
            $scope.newEntity.FADAppDate = moment();

            newEntity = $scope.newEntity;
            console.log($scope.newEntity)
            console.log(newEntity)
            // console.log(newEntity.EmpId)
            editFormService.saveForm(pageId, newEntity, vm.oldEntity,
                $scope.entity.FDAId == undefined ? "create" : "edit", 'Apply Attendance', $scope.editForm, true)
                .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
        }

        function _saveWizardFormSuccessResult(result) {
            console.log(result)
            // $dismiss();
        }

        function _saveWizardFormErrorResult() {

        }

    }
})();