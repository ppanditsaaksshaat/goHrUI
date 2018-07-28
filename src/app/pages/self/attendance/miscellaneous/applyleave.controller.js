/**
 * @author NKM
 * created on 20.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.miscellaneous')
        .controller('appLeaveController', appLeaveController);

    /** @ngInject */
    function appLeaveController($scope, $rootScope, $state, pageService, entity, editFormService) {
        console.log('apply coff')
        var vm = this;
        vm.oldEntity = {};
        var pageId = 157;
        $scope.page = $scope.createPage();
        // $scope.selects = selects;
        $scope.entity = entity;
        $scope.entity.leaveFromDate = moment(entity.DATE).format('DD-MMM-YYYY');
        console.log($scope.entity)
        $scope.newEntity = {};

        $scope.addLeave = _addLeave;

        function _childmethod() {
            $rootScope.$broadcast("CallParentMethod", {});
        }

        function _validateApprovedData() {
            if ($scope.entity.leaveFromDate == undefined || $scope.entity.leaveFromDate == null || $scope.entity.leaveFromDate == '') {
                $scope.showMsg("error", "Please Enter Date");
                return true;
            }
            if ($scope.entity.leaveTypes == undefined || $scope.entity.leaveTypes == null || $scope.entity.leaveTypes == '') {
                $scope.showMsg("error", "Please Select Leave Type");
                return true;
            }
            if ($scope.entity.LeadComment == undefined || $scope.entity.LeadComment == null || $scope.entity.LeadComment == '') {
                $scope.showMsg("error", "Please Enter Comment");
                return true;
            }
            return false;
        }

        function _addLeave() {
            if (!_validateApprovedData()) {
                var newEntity = {};
                var leaveType = parseInt($scope.entity.leaveTypes)
                var leaveTransaction = leaveType + '|1';
                console.log(leaveTransaction)
                $scope.newEntity.LEADEmpId = 5;
                $scope.newEntity.LEADDateFrom = $scope.entity.leaveFromDate;
                $scope.newEntity.LEADDateTo = $scope.entity.leaveFromDate;
                $scope.newEntity.LeadHalfDay = 0;
                $scope.newEntity.LeadComment = $scope.entity.LeadComment;
                $scope.newEntity.LEADFromHalfDayId = 2;
                $scope.newEntity.LEADToHalfDayId = 2;
                $scope.newEntity.LEADTransation = leaveTransaction;

                newEntity = $scope.newEntity;
                console.log($scope.newEntity)
                console.log(newEntity)
                // console.log(newEntity.EmpId)
                editFormService.saveForm(pageId, newEntity, vm.oldEntity,
                    $scope.entity.AttId == undefined ? "create" : "edit", 'Apply Attendance', $scope.editForm, true)
                    .then(_saveWizardFormSuccessResult, _saveWizardFormErrorResult)
            }
        }

        function _saveWizardFormSuccessResult(result) {
            $scope.$close();
            console.log(result)
            if (result.success_message == "Added New Record.") {
                $scope.showMsg("success", "Record Save Successfully.")
                _childmethod();
            }
        }

        function _saveWizardFormErrorResult(error) {
            $scope.$close();
        }

        function _showEmpLeave() {
            var searchLists = [];
            var searchListData = {
                field: 'EmpId',
                operand: '=',
                value: 5
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 649).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
        }

        function _getCustomQuerySuccessResult(result) {
            $scope.showBalanceLeave = result[0];
            $scope.LeaveType = result[0];
            console.log(result)
            console.log($scope.showBalanceLeave)
        }

        function _getCustomQueryErrorResult(error) {

        }
        _showEmpLeave();

    }
})();














