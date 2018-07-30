

/**
 * @author pardeep.pandit
 * created on 30.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empJobController', empJobController);

    /** @ngInject */
    function empJobController($scope, $state, $rootScope, $stateParams, pageService) {


        // global variable declaration
        var jobTableId = 121;
        var jobPageId = 114;
        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        alert(empId)
        function _loadController() {
            pageService.getPagData(jobPageId).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            var searchLists = [];
            var searchListData = {
                field: 'JDEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(jobTableId, jobPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }
        function _getPageErrorResult(err) {
            console.log(err)
        }
        function _getTableDataSuccessResult(result) {
            $scope.entity = result[0];
        }
        function _getTableDataErrorResult(err) {

        }
        _loadController();
    }
})()