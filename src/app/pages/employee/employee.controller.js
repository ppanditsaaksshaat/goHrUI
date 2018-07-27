/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee')
        .controller('employeeController', employeeController);

    /** @ngInject */
    function employeeController($scope, $state,$stateParams, pageService, localStorageService) {

        var empId = $stateParams.empid;
        function _loadController() {

            //  $scope.empBaicDetail = localStorageService.get("empBasicDetailKey");    
            var searchLists = [];
         
            searchLists.push({ field: 'EmpId', operand: '=', value: empId })

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 650).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            function _getCustomQuerySuccessResult(result) {
                console.log(result);
                $scope.empBaicDetail = result[0][0];

            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }
        _loadController();
    }
})()