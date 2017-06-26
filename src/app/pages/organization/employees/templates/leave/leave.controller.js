/**
 * @author deepak.jain
 * created on 122.06.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('empEditLeaveDetail', empEditLeaveDetail);

    /** @ngInject */
    /** @ngInject */
    function empEditLeaveDetail($scope, $stateParams,
        pageService, $timeout, $filter) {
        $scope.leaveBalance = [];
        var vm = this;
        var empId = $stateParams.empId;
        var queryId = 530;
        function _loadController() {
            var data = {};
            data.searchList = [{ 'field': 'ELTEmpId', operand: '=', value: empId }]
            data.orderByList = []
            pageService.getCustomQuery(data, queryId).then(_querySuccessResult, _queryErrorResult)
        }

        function _querySuccessResult(result) {
            console.log(result);
            $scope.leaveBalance = result;
        }
        function _queryErrorResult(result) {

        }

        $scope.getTotal = function (name) {
            var total = 0;
            for (var i = 0; i < $scope.leaveBalance.length; i++) {
                var leave = $scope.leaveBalance[i][name];
                if (leave)
                    total += leave;
            }
            return total;
        }
        $scope.viewStatement = function (typeId, statType) {
            var stateTableId = 418;
            var statePageId = 443;

            var data = {
                searchList: [],
                orderByList: []
            }

            var tableData = pageService.getTableData(
                stateTableId,
                statePageId,
                '', '',
                false, data);
            tableData.then(_getStatementSuccess, _getStatementError)

        }
        function _getStatementError(err) {

        }
        function _getStatementSuccess(result) {
            console.log(result )
            if (result == 'NoDataFound') {

            } else if (result.Errors !== undefined) {

            }
            else {
                $scope.statementDetail = result;
            }
        }
        _loadController();

    }
})();
