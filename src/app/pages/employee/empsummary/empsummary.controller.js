/**
 * @author pardeep.pandit
 * created on 19.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empsummary')
        .controller('empSummaryController', empSummaryController);

    /** @ngInject */
    function empSummaryController($scope, $state, $stateParams, pageService, localStorageService) {

        var empId = $stateParams.empid;

        function _loadController() {
            //   $scope.empBaicDetail = localStorageService.get("empBasicDetailKey");   

            var searchLists = [];
            searchLists.push({ field: 'EmpId', operand: '=', value: empId })
            searchLists.push({ field: 'Type', operand: '=', value: 'Summary' })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 651).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                $scope.empTeam = result[0];
                $scope.empExperience = result[1];
                $scope.empEducation = result[2];
                $scope.empProfessional = result[3];


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }


        _loadController();
    }
})();
