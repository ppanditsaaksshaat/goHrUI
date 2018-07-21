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

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

        function _addAttendance() {
            if (!_validateApprovedData()) {
                var newEntity = {};
                $scope.newEntity.EmpId = 5;
                $scope.newEntity.AttDate = $scope.entity.DATE;
                $scope.newEntity.InTime = $scope.entity.InTime;
                $scope.newEntity.OutTime = $scope.entity.OutTime;
                $scope.newEntity.ODReason = $scope.entity.ODReason;

                newEntity = $scope.newEntity;
                console.log($scope.newEntity)
                console.log(newEntity)
                editFormService.saveForm(pageId, newEntity, vm.oldEntity,
                    $scope.entity.AttId == undefined ? "create" : "edit", 'Apply Attendance', $scope.editForm, true)
                    .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
            }
        }
        console.log($scope.user.profile.empId)
        function _validateApprovedData() {
            if ($scope.entity.DATE == undefined || $scope.entity.DATE == null || $scope.entity.DATE == '') {
                $scope.showMsg("error", "Please Enter Date");
                return true;
            }
            if ($scope.entity.InTime == undefined || $scope.entity.InTime == null || $scope.entity.InTime == '') {
                $scope.showMsg("error", "Please Enter In Time");
                return true;
            }
            if ($scope.entity.OutTime == undefined || $scope.entity.OutTime == null || $scope.entity.OutTime == '') {
                $scope.showMsg("error", "Please Enter Out Time");
                return true;
            }
            if ($scope.entity.ODReason == undefined || $scope.entity.ODReason == null || $scope.entity.ODReason == '') {
                $scope.showMsg("error", "Please Enter Comment");
                return true;
            }
            return false;
        }

        function _saveWizardFormSuccessResult(result) {
            console.log(result)
            $scope.$close();
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $scope.showMsg("success", "Record Save Successfully.")
                _childmethod();
            }
        }

        function _saveWizardFormErrorResult() {
            $scope.$close();
        }

    }
})();