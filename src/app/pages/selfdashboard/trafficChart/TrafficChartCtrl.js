/**
 * @author NKM
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard.trafficChart')
        .controller('TrafficChartCtrl', TrafficChartCtrl);

    /** @ngInject */
    function TrafficChartCtrl($scope, $rootScope,baConfig, colorHelper, pageService) {
        var vm = this;
        vm.piChart = {};
        $scope.getAttData = _getAttData;

        function _getAttData() {
            vm.piChart = {}
            $scope.doughnutData = [];
            if ($scope.datePriod !== undefined) {
                if ($scope.datePriod != null) {
                    _loadController();
                }
            }
        }

        $scope.periodAttList = [];
        $scope.datePriod = 1;
        $scope.periodAttList = [{ value: 1, name: 'Current Month' },
        { value: 2, name: 'Previous Month' },
        { value: 3, name: 'Quarterly' },
        { value: 4, name: 'Half-Yearly' },
        { value: 5, name: 'Yearly' }]

        console.log($scope.datePriod)
        console.log($scope.periodAttList)

        function _loadController() {
            var searchLists = [];
            searchLists.push({
                field: 'EmpId',
                operand: "=",
                value: $rootScope.user.profile.empId
            })
            searchLists.push({
                field: 'DateTypeId',
                operand: "=",
                value: $scope.datePriod
            })

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            console.log(data)
            pageService.getCustomQuery(data, 644).then(_getDashBoardSuccessData, _getDashBoardErrorData)
        }

        function _getDashBoardSuccessData(result) {
            console.log(result)
            $scope.totalDay = result[5][0].TotalDay
            vm.piChart.totalPresent = result[5][0].TotalPresent
            vm.piChart.totalHoliDay = result[5][0].TotalHoliDay
            vm.piChart.totalLeave = result[5][0].TotalLeave
            vm.piChart.totalWeekOff = result[5][0].TotalWeekOff
            vm.piChart.totalAbsent = result[5][0].TotalAbsent

            vm.piChart.prTotalPresent = result[5][1].TotalPresent
            vm.piChart.prTotalHoliDay = result[5][1].TotalHoliDay
            vm.piChart.prTotalLeave = result[5][1].TotalLeave
            vm.piChart.prTotalWeekOff = result[5][1].TotalWeekOff
            vm.piChart.prTotalAbsent = result[5][1].TotalAbsent
            // console.log(vm.piChart.totalDay, $scope.totalPresent, $scope.totalHoliDay, $scope.totalLeave, $scope.totalWeekOff, $scope.totalAbsent)
            // console.log($scope.prTotalPresent, $scope.prTotalHoliDay)

            $scope.transparent = baConfig.theme.blur;
            var dashboardColors = baConfig.colors.dashboard;
            console.log(dashboardColors)
            console.log(baConfig.colors)
            $scope.doughnutData = {
                labels: [
                    'Present',
                    'Holiday',
                    'Leave',
                    'Week-Off',
                    'Absent'
                ],
                datasets: [
                    {
                        // data: [2000, 1500, 1000, 1200, 400],
                        data: [
                            vm.piChart.totalPresent,
                            vm.piChart.totalHoliDay,
                            vm.piChart.totalLeave,
                            vm.piChart.totalWeekOff,
                            vm.piChart.totalAbsent],
                        backgroundColor: [
                            baConfig.colors.success,
                            dashboardColors.blueStone,
                            baConfig.colors.info,
                            dashboardColors.silverTree,
                            baConfig.colors.danger
                            // dashboardColors.white,
                            // dashboardColors.blueStone,
                            // dashboardColors.surfieGreen,
                            // dashboardColors.silverTree,
                            // dashboardColors.gossip

                        ],
                        hoverBackgroundColor: [
                            colorHelper.shade(baConfig.colors.success, 15),
                            colorHelper.shade(dashboardColors.blueStone, 15),
                            colorHelper.shade(baConfig.colors.info, 15),
                            colorHelper.shade(dashboardColors.silverTree, 15),
                            colorHelper.shade(baConfig.colors.danger, 15)
                        ],
                        percentage: [vm.piChart.prTotalPresent + '% (' + vm.piChart.totalPresent + ' Day)', vm.piChart.prTotalHoliDay + '% (' + vm.piChart.totalHoliDay + ' Day)',
                        vm.piChart.prTotalLeave + '% (' + vm.piChart.totalLeave + ' Day)', vm.piChart.prTotalWeekOff + '% (' + vm.piChart.totalWeekOff + ' Day)',
                        vm.piChart.prTotalAbsent + '% (' + vm.piChart.totalAbsent + ' Day)']
                    }]
            };
            console.log($scope.doughnutData)
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

        function _getDashBoardErrorData(error) {
            console.log(error);
        }
        _loadController()
        // $scope.transparent = baConfig.theme.blur;
        // var dashboardColors = baConfig.colors.dashboard;
        // $scope.doughnutData = {
        //     labels: [
        //         'Present',
        //         'Holiday',
        //         'Leave',
        //         'Week-Off',
        //         'Absent'
        //     ],
        //     datasets: [
        //         {
        //             // data: [2000, 1500, 1000, 1200, 400],
        //             data: [$scope.totalDay,     
        //                 $scope.totalPresent ,
        //                 $scope.totalHoliDay ,
        //                 $scope.totalLeave  , 
        //                 $scope.totalWeekOff, 
        //                 $scope.totalAbsent]  ,
        //             backgroundColor: [
        //                 dashboardColors.white,
        //                 dashboardColors.blueStone,
        //                 dashboardColors.surfieGreen,
        //                 dashboardColors.silverTree,
        //                 dashboardColors.gossip

        //             ],
        //             hoverBackgroundColor: [
        //                 colorHelper.shade(dashboardColors.white, 15),
        //                 colorHelper.shade(dashboardColors.blueStone, 15),
        //                 colorHelper.shade(dashboardColors.surfieGreen, 15),
        //                 colorHelper.shade(dashboardColors.silverTree, 15),
        //                 colorHelper.shade(dashboardColors.gossip, 15)
        //             ],
        //             percentage: [87, 22, 70, 38, 17]
        //         }]
        // };

        // var ctx = document.getElementById('chart-area').getContext('2d');
        // window.myDoughnut = new Chart(ctx, {
        //     type: 'doughnut',
        //     data: $scope.doughnutData,
        //     options: {
        //         cutoutPercentage: 64,
        //         responsive: true,
        //         elements: {
        //             arc: {
        //                 borderWidth: 0
        //             }
        //         }
        //     }
        // });

    }
})();