/**
 * @author NKM
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard.trafficChart')
        .controller('TrafficChartCtrl', TrafficChartCtrl);

    /** @ngInject */
    function TrafficChartCtrl($scope, baConfig, colorHelper,pageService) {



        function _loadController() {
            var searchLists = [];
            searchLists.push({
                field: 'EmpId',
                operand: "=",
                value: 5
            })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 643).then(_getDashBoardSuccessData, _getDashBoardErrorData)
        }

        function _getDashBoardSuccessData(result) {
            console.log(result)
            $scope.cPresent = result[0][0].TotalPresent;
            $scope.thirtyPresent = result[0][1].TotalPresent;
            $scope.oneEightyPresent = result[0][2].TotalPresent;
            $scope.threrSixtyPresent = result[0][3].TotalPresent;
        }

        function _getDashBoardErrorData(error) {
            console.log(error);
        }
        _loadController()
        $scope.transparent = baConfig.theme.blur;
        var dashboardColors = baConfig.colors.dashboard;
        $scope.doughnutData = {
            labels: [
                'Other',
                'Search engines',
                'Referral Traffic',
                'Direct Traffic',
                'Ad Campaigns'
            ],
            datasets: [
                {
                    data: [2000, 1500, 1000, 1200, 400],
                    backgroundColor: [
                        dashboardColors.white,
                        dashboardColors.blueStone,
                        dashboardColors.surfieGreen,
                        dashboardColors.silverTree,
                        dashboardColors.gossip

                    ],
                    hoverBackgroundColor: [
                        colorHelper.shade(dashboardColors.white, 15),
                        colorHelper.shade(dashboardColors.blueStone, 15),
                        colorHelper.shade(dashboardColors.surfieGreen, 15),
                        colorHelper.shade(dashboardColors.silverTree, 15),
                        colorHelper.shade(dashboardColors.gossip, 15)
                    ],
                    percentage: [87, 22, 70, 38, 17]
                }]
        };

        var ctx = document.getElementById('chart-area').getContext('2d');
        window.myDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: $scope.doughnutData,
            options: {
                cutoutPercentage: 64,
                responsive: true,
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        });
        
    }
})();