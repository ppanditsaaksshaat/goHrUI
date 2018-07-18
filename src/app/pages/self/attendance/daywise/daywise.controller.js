/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.daywise')
        .controller('daywiseController', daywiseController);
    function daywiseController(baConfig, $scope, pageService, colorHelper) {

        $scope.SelectedEvent = null;
        var isFirstTime = true;

        $scope.events = [];
        $scope.eventSources = [$scope.events];
        var dashboardColors = baConfig.colors.dashboard;

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
            pageService.getCustomQuery(data, 645).then(_getDashBoardSuccessData, _getDashBoardErrorData)
        }

        function _getDashBoardSuccessData(result) {
            // var dashboardColors = baConfig.colors.dashboard;
            console.log(result)
            $scope.events.slice(0, $scope.events.length);
            console.log(baConfig.colors)
            angular.forEach(result[0], function (value) {
                console.log(value)
                $scope.events.push(
                    {
                        title: value.InOutTime,
                        start: moment(value.ATTDate).format('YYYY-MM-DD'),
                        color: dashboardColors.white,
                    },
                    {
                        // title: 'Present',
                        start: moment(value.ATTDate).format('YYYY-MM-DD'),
                        color: baConfig.colors.success,
                    },
                    {
                        // title: 'Holiday',
                        start: moment(value.HolidayDate).format('YYYY-MM-DD'),
                        color: dashboardColors.blueStone,
                    }, {
                        // title: 'Leave',
                        start: moment(value.LeaveDate).format('YYYY-MM-DD'),
                        color: baConfig.colors.info
                    },
                    {
                        // title: 'WeekOff',
                        start: moment(value.WODate).format('YYYY-MM-DD'),
                        backgroundColor: dashboardColors.silverTree
                    },
                    {
                        // title: 'Absent',
                        start: moment(value.Absents).format('YYYY-MM-DD'),
                        color: baConfig.colors.danger
                    }
                )
                // backgroundColor: baConfig.colors.info
                console.log($scope.events)
            })


            // var dashboardColors = baConfig.colors.dashboard;
            var $element = $('#calendar').fullCalendar({
                height: 335,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: moment(),
                selectable: false,
                selectHelper: true,
                select: function (start, end) {
                    var title = prompt('Event Title:');
                    var eventData;
                    if (title) {
                        eventData = {
                            title: title,
                            start: start,
                            end: end
                        };
                        $element.fullCalendar('renderEvent', eventData, true); // stick? = true
                    }
                    $element.fullCalendar('unselect');
                },
                dayRender: function (defaultDate, cell) {
                    console.log(cell)
                    // if (defaultDate == moment())
                    // cell.css("background-color", "#ccf3ff");
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: $scope.events,
                // [{
                //         {
                //             title: 'Long Event',
                //             start: '2016-03-07',
                //             end: '2016-03-10',
                //             color: dashboardColors.blueStone
                //         },
                //         {
                //             title: 'Dinner',
                //             start: '2016-03-14T20:00:00',
                //             color: dashboardColors.surfieGreen
                //         },
                //   ]
            });

            // $scope.uiConfig = {
            //     calendar: {
            //         height: 450,
            //         editable: true,
            //         displayEventTime: false,
            //         header: {
            //             left: 'month basicWeek basicDay agendaWeek agendaDay',
            //             center: 'title',
            //             right: 'today prev,next'
            //         },
            //         eventClick: function (event) {
            //             $scope.SelectedEvent = event;
            //         },
            //         eventAfterAllRender: function () {
            //             if ($scope.events.length > 0 && isFirstTime) {
            //                 //Focus first event
            //                 uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
            //             }
            //         }
            //     }
            // };


        }

        function _getDashBoardErrorData(error) {
            console.log(error);
        }


        _loadController();





        // var dashboardColors = baConfig.colors.dashboard;

        // var $element = $('#calendar').fullCalendar({

        //     header: {
        //         left: 'prev,next today',
        //         center: 'title',
        //         right: 'month,agendaWeek,agendaDay'
        //     },
        //     defaultDate: moment(),
        //     selectable: false,
        //     selectHelper: true,
        //     select: function (start, end) {
        //         var title = prompt('Event Title:');
        //         var eventData;
        //         if (title) {
        //             eventData = {
        //                 title: title,
        //                 start: start,
        //                 end: end
        //             };
        //             $element.fullCalendar('renderEvent', eventData, true); // stick? = true
        //         }
        //         $element.fullCalendar('unselect');
        //     },
        //     editable: false,
        //     eventLimit: true, // allow "more" link when too many events
        //     events: [
        //         {
        //             title: colorHelper.shade(baConfig.colors.success, 15),
        //             start: '2018-07-12',
        //             color: dashboardColors.silverTree,
        //         },
        //         {
        //             title: 'Test Event',
        //             start: '2018-07-12',
        //             color: dashboardColors.blueStone,
        //         },
        //     ]
        // });

        //Color for Present,Absent,WeekOff and Holiday
        $scope.doughnutData = {
            labels: [
                'Present',
                'Holiday',
                'Leave',
                'WeekOff',
                'Absent'
            ],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        baConfig.colors.success,
                        dashboardColors.blueStone,
                        baConfig.colors.info,
                        dashboardColors.silverTree,
                        baConfig.colors.danger
                    ],
                    hoverBackgroundColor: [
                        colorHelper.shade(baConfig.colors.success, 15),
                        colorHelper.shade(dashboardColors.blueStone, 15),
                        colorHelper.shade(baConfig.colors.info, 15),
                        colorHelper.shade(dashboardColors.silverTree, 15),
                        colorHelper.shade(baConfig.colors.danger, 15)
                    ]
                }]
        };


    }
})();