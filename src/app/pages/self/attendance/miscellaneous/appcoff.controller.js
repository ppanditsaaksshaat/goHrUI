/**
 * @author NKM
 * created on 19.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('applyCOffController', applyCOffController);

    /** @ngInject */
    function applyCOffController($scope, $rootScope, $state, pageService, entity, editFormService) {
        console.log('apply coff')
        var vm = this;
        vm.oldEntity = {};
        var pageId = 127;
        $scope.page = $scope.createPage();
        // $scope.selects = selects;
        $scope.entity = entity;
        $scope.entity.COAttnDate = moment(entity.DATE).format('DD-MMM-YYYY');
        console.log($scope.entity)
        $scope.newEntity = {};

        $scope.addCoff = addCoff;

        function _childmethod() {
            $rootScope.$emit("CallParentMethod", {});
        }

        function _validateApprovedData() {
            if ($scope.entity.COAttnDate == undefined || $scope.entity.COAttnDate == null || $scope.entity.COAttnDate == '') {
                $scope.showMsg("error", "Please Enter Date");
                return true;
            }
            if ($scope.entity.COTimeIn == undefined || $scope.entity.COTimeIn == null || $scope.entity.COTimeIn == '') {
                $scope.showMsg("error", "Please Enter In Time");
                return true;
            }
            if ($scope.entity.COTimeOut == undefined || $scope.entity.COTimeOut == null || $scope.entity.COTimeOut == '') {
                $scope.showMsg("error", "Please Enter Out Time");
                return true;
            }
            if ($scope.entity.COReson == undefined || $scope.entity.COReson == null || $scope.entity.COReson == '') {
                $scope.showMsg("error", "Please Enter Comment");
                return true;
            }
            return false;
        }

        function addCoff() {
            if (!_validateApprovedData()) {
                var newEntity = {};
                $scope.newEntity.EmpId = 5;
                $scope.newEntity.COAttnDate = $scope.entity.COAttnDate;
                $scope.newEntity.COTimeIn = $scope.entity.COTimeIn;
                $scope.newEntity.COTimeOut = $scope.entity.COTimeOut;
                $scope.newEntity.COReson = $scope.entity.COReson;
                $scope.newEntity.COAppDate = moment()

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