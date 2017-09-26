/**
 * @author deepak.jain
 * created on 122.06.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('userDetail', userDetail);

    /** @ngInject */
    /** @ngInject */
    function userDetail($scope, $stateParams,
        pageService, $timeout, $filter) {     
        var vm = this;
        vm.empPKId = $stateParams.empId;
        vm.queryId = 187;


        function _loadController() {

            $scope.gridOptions = $scope.getGridSetting();
            // $scope.gridOptions.onRegisterApi = _onRegisterApi;
            $scope.gridOptions.columnDefs = [];
            $scope.gridOptions.data = [];

            var searchLists = [];
            var searchListData = {
                field: 'EmpId',
                operand: '=',
                value: vm.empPKId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, vm.queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            if (result !== "NoDataFoundemp") {
                var colCreatedOn = { name: 'SHName', field: 'SHName', displayName: 'SHName', width: 100, visible: true };
                var colCreatedBy = { name: 'PaybandRule', field: 'PaybandRule', displayName: 'Payband Rule', width: 100, visible: true };
                var colAssignedUser = { name: 'SalAmount', field: 'SalAmount', displayName: 'Salary Amount', width: 100, visible: true };
                $scope.gridOptions.columnDefs.push(colCreatedOn);
                $scope.gridOptions.columnDefs.push(colCreatedBy);
                $scope.gridOptions.columnDefs.push(colAssignedUser);

                $scope.gridOptions.data = result;
            }
        }
        function _getCustomQueryErrorResult(err) {

        }



        _loadController();

    }
})();
