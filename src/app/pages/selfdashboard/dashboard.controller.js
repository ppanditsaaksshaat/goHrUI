
/**
 * @author NKM
 * created on 07.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard')
        .controller('dashboardCtrl', dashboardCtrl);

    /** @ngInject */
    function dashboardCtrl($scope, $state, $timeout, pageService, $filter, $uibModal, dialogModal, baConfig, baUtil) {

        // $scope.periodAttList = [];
        // $scope.periodAttList.push({ Id: '1', Name: 'Current Month' });
        // $scope.periodAttList.push({ Id: '2', Name: 'Previous Month' });
        // $scope.periodAttList.push({ Id: '3', Name: 'Quarterly' });
        // $scope.periodAttList.push({ Id: '4', Name: 'Half-Yearly' });
        // $scope.periodAttList.push({ Id: '5', Name: 'Yearly' });

        // $scope.datePriod = 'Current Month';
        // $scope.Current Month=Current Month

      

        
        
        console.log('dashboard');
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var DalaLength = 0;
        $scope.charts = [{
            color: pieColor,
            description: 'C Present',
            // stats: $scope.totalDays,
            stats: 10,
            icon: 'person',
        }, {
            color: pieColor,
            description: '30 Present',
            // stats: $scope.totalDays,
            stats: 15,
            icon: 'money',

        }, {
            color: pieColor,
            description: '180 Present',
            // stats: $scope.totalDays,
            stats: 30,
            icon: 'face',
        }, {
            color: pieColor,
            description: '365 Present',
            // stats: $scope.totalDays,
            stats: 100,
            icon: 'refresh',
        }
        ];

        function getRandomArbitrary(min, max) {
            // console.log("random " + Math.random() * (max - min) + min)
            // return Math.random() * (max - min) + min;
            return min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        // console.log("percentage " + percent)
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(
                    // $scope.presentList[index].Percentage
                    10, 100));
            });
        }

        // if (DalaLength == 10) {
        //     $timeout(function () {
        //         // _loadController();
        //         loadPieCharts();
        //         updatePieCharts();
        //     }, 1000);
        //     console.log('10')
        // }


        function _loadController() {
            var searchLists = [];
            searchLists.push({
                field: 'EmpId',
                operand: "=",
                value: $scope.user.profile.empId
            })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 643).then(_getDashBoardSuccessData, _getDashBoardErrorData)
        }

        function _getDashBoardSuccessData(result) {
            console.log(result)

            $scope.presentList = result[0];
            console.log($scope.presentList)

            // $scope.totalDays = result[0][0].TotalDay;
            // $scope.cPresent = result[0][0].TotalPresent;
            // $scope.thirtyPresent = result[0][1].TotalPresent;
            // $scope.oneEightyPresent = result[0][2].TotalPresent;
            // $scope.threrSixtyPresent = result[0][3].TotalPresent;


            $scope.percentage = result[0][0].Percentage;
            $scope.percentage = 20;
            console.log($scope.totalDays, $scope.present, $scope.percentage)

            $scope.leaveList = result[1];
            $scope.upComingBirthDayList = result[3];
            $scope.UpComingHolidayList = result[2];
            $scope.upComingLeaveListOfTeam = result[4];
            console.log($scope.upComingLeaveListOfTeam)

            console.log($scope.leaveList)
            if (result != undefined) {
                DalaLength = 10;
            }




            $scope.charts = [{
                color: "#0074D9",
                description: '30 Present',
                stats: $scope.cPresent,
                icon: 'person',
            }, {
                color: "#FF4136",
                description: '90 Present',
                stats: $scope.thirtyPresent,
                icon: 'money',

            }, {
                color: "#2ECC40",
                description: '180 Present',
                stats: $scope.oneEightyPresent,
                icon: 'face',
            }, {
                color: "#FF851B",
                description: '365 Present',
                stats: $scope.threrSixtyPresent,
                icon: 'refresh',
            }
            ];
            // loadPieCharts();
            // updatePieCharts();
            $timeout(function () {
                // _loadController();
                loadPieCharts();
                updatePieCharts();
            }, 1000);
        }

        function _getDashBoardErrorData(error) {
            console.log(error);
        }


        _loadController();
    }


})();
