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

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

        

        $scope.addOD = _addOD;
        function _validateApprovedData() {
            if ($scope.entity.FDAFromDate == undefined || $scope.entity.FDAFromDate == null || $scope.entity.FDAFromDate == '') {
                $scope.showMsg("error", "Please Enter Date");
                return true;
            }
            if ($scope.entity.FADInTime == undefined || $scope.entity.FADInTime == null || $scope.entity.FADInTime == '') {
                $scope.showMsg("error", "Please Enter In Time");
                return true;
            }
            if ($scope.entity.FDAOutTime == undefined || $scope.entity.FDAOutTime == null || $scope.entity.FDAOutTime == '') {
                $scope.showMsg("error", "Please Enter Out Time");
                return true;
            }
            if ($scope.entity.FDARemark == undefined || $scope.entity.FDARemark == null || $scope.entity.FDARemark == '') {
                $scope.showMsg("error", "Please Enter Remark");
                return true;
            }
            return false;
        }

        function _addOD() {
            if (!_validateApprovedData()) {
                var newEntity = {};
                $scope.newEntity.FADEmpId = $rootScope.user.profile.empId;
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