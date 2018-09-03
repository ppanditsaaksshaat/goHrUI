
/**
 * @author NKM
 * created on 07.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard')
        .controller('dashboardCtrl', dashboardCtrl);

    /** @ngInject */
    function dashboardCtrl(baConfig, layoutPaths, $scope, $state, $timeout, pageService, $filter, $uibModal, dialogModal, baUtil) {

        // $scope.periodAttList = [];
        // $scope.periodAttList.push({ Id: '1', Name: 'Current Month' });
        // $scope.periodAttList.push({ Id: '2', Name: 'Previous Month' });
        // $scope.periodAttList.push({ Id: '3', Name: 'Quarterly' });
        // $scope.periodAttList.push({ Id: '4', Name: 'Half-Yearly' });
        // $scope.periodAttList.push({ Id: '5', Name: 'Yearly' });

        // $scope.datePriod = 'Current Month';
        // $scope.Current Month=Current Month


        $scope.viewList = _viewList;
        $scope.holiday = _holiDay;
        $scope.birthDay = _birthDay;
        $scope.teamBirthDay = _teamBirthDay;
        $scope.teamLeave = _teamLeave;



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
            $scope.upComingTeamBirthDay = result[6];
            $scope.pendingApprovel = result[7];

            $scope.teamEmpList = result[8];
            console.log($scope.upComingLeaveListOfTeam)

            console.log($scope.upComingBirthDayList)
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

        function _viewList() {
            // console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/selfdashboard/list/pendingapprovel/pendingapprovel.html',
                size: 'top-center-450',
                controller: 'pendingApprovelController',
                param: $scope.pendingApprovel
            });
        }

        function _teamBirthDay() {
            // console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/selfdashboard/list/teambirthday/teambirthday.html',
                size: 'top-center-450',
                controller: 'teamBirthController',
                param: $scope.upComingTeamBirthDay
            });
        }

        function _birthDay() {
            // console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/selfdashboard/list/birthday/birthday.html',
                size: 'top-center-450',
                controller: 'birthDayController',
                param: $scope.teamEmpList
            });
        }

        function _teamLeave() {
            // console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/selfdashboard/list/teamleavelist/teamleavelist.html',
                size: 'top-center-450',
                controller: 'teamLeaveController',
                param: $scope.upComingLeaveListOfTeam
            });
        }

        function _holiDay() {
            // console.log(row)
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/selfdashboard/list/upcomingholiday/upcomingholiday.html',
                size: 'top-center-450',
                controller: 'holidayController',
                param: $scope.UpComingHolidayList
            });
        }

        _loadController();



        //Line Map Start
        var layoutColors = baConfig.colors;
        // svg path for target icon
        var targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z';
        // svg path for plane icon
        var planeSVG = 'M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z';
        $timeout(function () {
            var map = AmCharts.makeChart('map-lines', {
                type: 'map',
                theme: 'blur',
                dataProvider: {
                    map: 'worldLow',
                    linkToObject: 'london',
                    images: [{
                        id: 'london',
                        svgPath: targetSVG,
                        title: 'london',
                        latitude: 51.5002,
                        longitude: -0.1262,
                        scale: 1.5,
                        zoomLevel: 2.74,
                        zoomLongitude: -20.1341,
                        zoomLatitude: 49.1712,

                        lines: [{
                            latitudes: [51.5002, 50.4422],
                            longitudes: [-0.1262, 30.5367]
                        }, {
                            latitudes: [51.5002, 46.9480],
                            longitudes: [-0.1262, 7.4481]
                        }, {
                            latitudes: [51.5002, 59.3328],
                            longitudes: [-0.1262, 18.0645]
                        }, {
                            latitudes: [51.5002, 40.4167],
                            longitudes: [-0.1262, -3.7033]
                        }, {
                            latitudes: [51.5002, 46.0514],
                            longitudes: [-0.1262, 14.5060]
                        }, {
                            latitudes: [51.5002, 48.2116],
                            longitudes: [-0.1262, 17.1547]
                        }, {
                            latitudes: [51.5002, 44.8048],
                            longitudes: [-0.1262, 20.4781]
                        }, {
                            latitudes: [51.5002, 55.7558],
                            longitudes: [-0.1262, 37.6176]
                        }, {
                            latitudes: [51.5002, 38.7072],
                            longitudes: [-0.1262, -9.1355]
                        }, {
                            latitudes: [51.5002, 54.6896],
                            longitudes: [-0.1262, 25.2799]
                        }, {
                            latitudes: [51.5002, 64.1353],
                            longitudes: [-0.1262, -21.8952]
                        }, {
                            latitudes: [51.5002, 40.4300],
                            longitudes: [-0.1262, -74.0000]
                        }],

                        images: [{
                            label: 'Flights from London',
                            svgPath: planeSVG,
                            left: 100,
                            top: 45,
                            labelShiftY: 5,
                            labelShiftX: 5,
                            color: layoutColors.defaultText,
                            labelColor: layoutColors.defaultText,
                            labelRollOverColor: layoutColors.defaultText,
                            labelFontSize: 20
                        }, {
                            label: 'show flights from Vilnius',
                            left: 106,
                            top: 70,
                            labelColor: layoutColors.defaultText,
                            labelRollOverColor: layoutColors.defaultText,
                            labelFontSize: 11,
                            linkToObject: 'vilnius'
                        }]
                    },

                    {
                        id: 'vilnius',
                        svgPath: targetSVG,
                        title: 'Vilnius',
                        latitude: 54.6896,
                        longitude: 25.2799,
                        scale: 1.5,
                        zoomLevel: 4.92,
                        zoomLongitude: 15.4492,
                        zoomLatitude: 50.2631,

                        lines: [{
                            latitudes: [54.6896, 50.8371],
                            longitudes: [25.2799, 4.3676]
                        },
                        {
                            latitudes: [54.6896, 59.9138],
                            longitudes: [25.2799, 10.7387]
                        }, {
                            latitudes: [54.6896, 40.4167],
                            longitudes: [25.2799, -3.7033]
                        }, {
                            latitudes: [54.6896, 50.0878],
                            longitudes: [25.2799, 14.4205]
                        }, {
                            latitudes: [54.6896, 48.2116],
                            longitudes: [25.2799, 17.1547]
                        }, {
                            latitudes: [54.6896, 44.8048],
                            longitudes: [25.2799, 20.4781]
                        }, {
                            latitudes: [54.6896, 55.7558],
                            longitudes: [25.2799, 37.6176]
                        }, {
                            latitudes: [54.6896, 37.9792],
                            longitudes: [25.2799, 23.7166]
                        }, {
                            latitudes: [54.6896, 54.6896],
                            longitudes: [25.2799, 25.2799]
                        }, {
                            latitudes: [54.6896, 51.5002],
                            longitudes: [25.2799, -0.1262]
                        }, {
                            latitudes: [54.6896, 53.3441],
                            longitudes: [25.2799, -6.2675]
                        }],

                        images: [{
                            label: 'Flights from Vilnius',
                            svgPath: planeSVG,
                            left: 100,
                            top: 45,
                            labelShiftY: 5,
                            labelShiftX: 5,
                            color: layoutColors.defaultText,
                            labelColor: layoutColors.defaultText,
                            labelRollOverColor: layoutColors.defaultText,
                            labelFontSize: 20
                        }, {
                            label: 'show flights from London',
                            left: 106,
                            top: 70,
                            labelColor: layoutColors.defaultText,
                            labelRollOverColor: layoutColors.defaultText,
                            labelFontSize: 11,
                            linkToObject: 'london'
                        }]
                    }, {
                        svgPath: targetSVG,
                        title: 'Brussels',
                        latitude: 50.8371,
                        longitude: 4.3676
                    }, {
                        svgPath: targetSVG,
                        title: 'Prague',
                        latitude: 50.0878,
                        longitude: 14.4205
                    }, {
                        svgPath: targetSVG,
                        title: 'Athens',
                        latitude: 37.9792,
                        longitude: 23.7166
                    }, {
                        svgPath: targetSVG,
                        title: 'Reykjavik',
                        latitude: 64.1353,
                        longitude: -21.8952
                    }, {
                        svgPath: targetSVG,
                        title: 'Dublin',
                        latitude: 53.3441,
                        longitude: -6.2675
                    }, {
                        svgPath: targetSVG,
                        title: 'Oslo',
                        latitude: 59.9138,
                        longitude: 10.7387
                    }, {
                        svgPath: targetSVG,
                        title: 'Lisbon',
                        latitude: 38.7072,
                        longitude: -9.1355
                    }, {
                        svgPath: targetSVG,
                        title: 'Moscow',
                        latitude: 55.7558,
                        longitude: 37.6176
                    }, {
                        svgPath: targetSVG,
                        title: 'Belgrade',
                        latitude: 44.8048,
                        longitude: 20.4781
                    }, {
                        svgPath: targetSVG,
                        title: 'Bratislava',
                        latitude: 48.2116,
                        longitude: 17.1547
                    }, {
                        svgPath: targetSVG,
                        title: 'Ljubljana',
                        latitude: 46.0514,
                        longitude: 14.5060
                    }, {
                        svgPath: targetSVG,
                        title: 'Madrid',
                        latitude: 40.4167,
                        longitude: -3.7033
                    }, {
                        svgPath: targetSVG,
                        title: 'Stockholm',
                        latitude: 59.3328,
                        longitude: 18.0645
                    }, {
                        svgPath: targetSVG,
                        title: 'Bern',
                        latitude: 46.9480,
                        longitude: 7.4481
                    }, {
                        svgPath: targetSVG,
                        title: 'Kiev',
                        latitude: 50.4422,
                        longitude: 30.5367
                    }, {
                        svgPath: targetSVG,
                        title: 'Paris',
                        latitude: 48.8567,
                        longitude: 2.3510
                    }, {
                        svgPath: targetSVG,
                        title: 'New York',
                        latitude: 40.43,
                        longitude: -74
                    }
                    ]
                },

                areasSettings: {
                    unlistedAreasColor: layoutColors.info
                },

                imagesSettings: {
                    color: layoutColors.warningLight,
                    selectedColor: layoutColors.warning
                },

                linesSettings: {
                    color: layoutColors.warningLight,
                    alpha: 0.8
                },


                backgroundZoomsToTop: true,
                linesAboveImages: true,

                export: {
                    'enabled': true
                },
                pathToImages: layoutPaths.images.amMap
            });
        }, 100);

        //Line Map End


    }


})();
