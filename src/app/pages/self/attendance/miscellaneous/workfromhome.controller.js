/**
 * @author NKM
 * created on 23.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('workFromHomeController', workFromHomeController);

    /** @ngInject */
    function workFromHomeController($scope, $rootScope, entity, editFormService) {
        console.log('apply coff')
        var vm = this;
        vm.oldEntity = {};
        var pageId = 500;
        $scope.page = $scope.createPage();
        // $scope.selects = selects;
        $scope.entity = entity;
        $scope.entity.WFHFromDate = moment(entity.DATE).format('DD-MMM-YYYY');
        console.log($scope.entity)
        $scope.newEntity = {};

        $scope.addWorkFromHome = _addWorkFromHome;

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

        function _validateApprovedData() {
            if ($scope.entity.WFHFromDate == undefined || $scope.entity.WFHFromDate == null || $scope.entity.WFHFromDate == '') {
                $scope.showMsg("error", "Please Enter Date");
                return true;
            }
            if ($scope.entity.WFHInTime == undefined || $scope.entity.WFHInTime == null || $scope.entity.WFHInTime == '') {
                $scope.showMsg("error", "Please Enter In Time");
                return true;
            }
            if ($scope.entity.WFHOutTime == undefined || $scope.entity.WFHOutTime == null || $scope.entity.WFHOutTime == '') {
                $scope.showMsg("error", "Please Enter Out Time");
                return true;
            }
            if ($scope.entity.WFHReson == undefined || $scope.entity.WFHReson == null || $scope.entity.WFHReson == '') {
                $scope.showMsg("error", "Please Enter Comment");
                return true;
            }
            return false;
        }

        function _addWorkFromHome() {
            if (!_validateApprovedData()) {
                var newEntity = {};
                $scope.newEntity.WFHEmpId = $rootScope.user.profile.empId;
                $scope.newEntity.WFHFromDate = $scope.entity.WFHFromDate;
                $scope.newEntity.WFHToDate=$scope.entity.WFHFromDate
                $scope.newEntity.WFHInTime = $scope.entity.WFHInTime;
                $scope.newEntity.WFHOutTime = $scope.entity.WFHOutTime;
                $scope.newEntity.WFHReson = $scope.entity.WFHReson;

                newEntity = $scope.newEntity;
                console.log($scope.newEntity)
                console.log(newEntity)
                // console.log(newEntity.WFHEmpId)
                editFormService.saveForm(pageId, newEntity, vm.oldEntity,
                    $scope.entity.WFHId == undefined ? "create" : "edit", 'Apply Attendance', $scope.editForm, true)
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