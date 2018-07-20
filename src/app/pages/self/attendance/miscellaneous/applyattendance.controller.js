/**
 * @author NKM
 * created on 20.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('applyAttendanceController', applyAttendanceController);

    /** @ngInject */
    function applyAttendanceController($scope, $rootScope, $state, pageService, entity, editFormService) {
        console.log('apply coff')
        var vm = this;
        vm.oldEntity = {};
        var pageId = 320;
        $scope.page = $scope.createPage();
        // $scope.selects = selects;
        $scope.entity = entity;
        $scope.entity.attendanceDate = moment(entity.DATE).format('DD-MMM-YYYY');
        console.log($scope.entity)
        $scope.newEntity = {};

        $scope.addAttendance = _addAttendance;

        function _addAttendance() {
            var newEntity = {};
            $scope.newEntity.EmpId = 5;
            $scope.newEntity.AttDate = $scope.entity.DATE;
            $scope.newEntity.InTime = $scope.entity.InTime;
            $scope.newEntity.OutTime = $scope.entity.OutTime;
            $scope.newEntity.ODReason = $scope.entity.ODReason;

            newEntity = $scope.newEntity;
            console.log($scope.newEntity)
            console.log(newEntity)
            // console.log(newEntity.EmpId)
            editFormService.saveForm(pageId, newEntity, vm.oldEntity,
                $scope.entity.AttId == undefined ? "create" : "edit", 'Apply Attendance', $scope.editForm, true)
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