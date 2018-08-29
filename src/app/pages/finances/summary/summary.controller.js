

/**
 * @author NKM
 * created on 29.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.summary')
        .controller('summaryController', summaryController);

    /** @ngInject */
    function summaryController($scope, pageService, $rootScope) {
        console.log('summary controller load')
        $scope.isNoSalarySlip = false;
        var d = moment();
        $scope.month = d.month();
        $scope.years = d.year();
        $scope.monthName = moment($scope.month, 'M').format('MMMM');

        function _loadController() {
            $scope.monthName = moment($scope.month, 'M').format('MMMM');
            var searchLists = [];
            searchLists.push({
                field: 'SalYear',
                operand: "=",
                value: $scope.years
            })
            searchLists.push({
                field: 'SalMonth',
                operand: '=',
                value: $scope.month
            })
            searchLists.push({
                field: 'EmpId',
                operand: '=',
                value: $rootScope.user.profile.empId
            })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            console.log(data)
            pageService.getCustomQuery(data, 665).then(_getSummarySuccessResult, _getSummaryErrorResult)
        }

        function _getSummarySuccessResult(result) {
            $scope.earningHead = {};
            $scope.deductionHead = {};
            $scope.amount = [];
            // $scope.loanDetail = {}

            if (result[0].length > 0) {
                $scope.isNoSalarySlip = false;
                $scope.earningHead.SHC0001 = result[2][0].SHC0001;
                $scope.earningHead.SHC0002 = result[2][0].SHC0002;
                $scope.earningHead.SHC0003 = result[2][0].SHC0003;
                $scope.earningHead.SHC0004 = result[2][0].SHC0004;
                $scope.earningHead.SHC0005 = result[2][0].SHC0005;
                $scope.earningHead.totalEarning = result[2][0].SHC0038;

                $scope.deductionHead.SHC0021 = result[2][0].SHC0021;
                $scope.deductionHead.SHC0022 = result[2][0].SHC0022;
                $scope.deductionHead.SHC0023 = result[2][0].SHC0023;
                $scope.deductionHead.SHC0024 = result[2][0].SHC0024;
                $scope.deductionHead.SHC0025 = result[2][0].SHC0025;
                $scope.deductionHead.totalDeduction = result[2][0].SHC0039;

                $scope.roundOff = result[2][0].SHC0042;
                $scope.netPay = result[2][0].SHC0040;
                $scope.amount = result[0][0];
            }
            else {
                $scope.isNoSalarySlip = true;
            }
            $scope.loanDetailss = result[4];

            console.log($scope.loanDetailss)
            console.log(result)
        }

        function _getSummaryErrorResult(error) {
            console.log(error);
        }
        _loadController();


    }
})();