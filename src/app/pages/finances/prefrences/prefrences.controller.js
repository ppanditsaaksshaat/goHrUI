

/**
 * @author NKM
 * created on 29.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.prefrences')
        .controller('prefrencesController', prefrencesController);

    /** @ngInject */
    function prefrencesController($scope, pageService, $rootScope) {
        console.log('summary controller load')
        $scope.onChangePaySlip = _loadController;

        $scope.isNoSalarySlip = false;

        var d = moment();
        $scope.month = d.month() + 1;
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
            
            $scope.frefencesList = result[7][0]
            console.log(result)
        }

        function _getSummaryErrorResult(error) {
            console.log(error);
        }
        _loadController();


    }
})();