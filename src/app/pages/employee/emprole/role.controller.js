

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
        var columnIds = ['112'];
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
            pageService.getTableData(26, 21, '', '', false, data).then(_findEntitySuccessResult, _findEntityErrorResult)
        }
        function _getAllSelectErrorResult(err) {
            console.log(err)
        }
        function _findEntitySuccessResult(result) {
            console.log(result)
        }
        function _findEntityErrorResult(err) {
            console.log(err)
        }
        _loadController();
    }
})()