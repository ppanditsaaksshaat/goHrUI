

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empRoleController', empRoleController);

    /** @ngInject */
    function empRoleController($scope, $timeout, $stateParams, pageService, editFormService, param) {


        // global variable declaration

        var empId = $stateParams.empid;
        var tableId = 26;
        var pageId = 21;
        var columnIds = ['112'];

        $scope.change = _change;
        function _loadController() {
            $timeout(function () {
                pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            });
        }
        function _getAllSelectSuccessResult(result) {
            $scope.roles = result[0];

            var searchLists = [];
            var searchListData = {
                field: 'LinkUserEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(tableId, pageId, '', '', false, data).then(_getTableSuccessResult, _getTableErrorResult)
        }
        function _getAllSelectErrorResult(err) {
            console.log(err)
        }
        function _getTableSuccessResult(result) {
            $scope.oldEntity = angular.copy(result[0]);
            $scope.entity = result[0];

        }
        function _getTableErrorResult(err) {
            console.log(err)
        }

        function _change(entity, editForm) {

            editFormService.saveForm(pageId, entity, $scope.oldEntity,
                "edit", "", editForm, false)
                .then(_successResult, _errorResult)
        }


        function _successResult(result) {
            console.log(result)
            if (result.success_message == "Record Updated.") {
                $scope.showMsg("success", "Role Updated")
                $scope.modalInstance.close();
            }
        }
        function _errorResult(err) {
            console.log(err)
        }

        _loadController();
    }
})()