/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.daywise')
        .controller('daywiseController', daywiseController);
    function daywiseController(baConfig, $scope, pageService) {

        $scope.SelectedEvent = null;
        var isFirstTime = true;

        $scope.events = [];
        $scope.eventSources = [$scope.events];

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
            console.log(result)
            $scope.events.slice(0, $scope.events.length);
            angular.forEach(result[0], function (value) {
                console.log(value)
                $scope.events.push({
                    // title: value.Att,
                    // description: value.Description,
                    start: moment(value.AttDate),
                    end: moment(value.AttToDate),
                    // allDay: value.IsFullDay
                });
            })

            
        var dashboardColors = baConfig.colors.dashboard;
        var $element = $('#calendar').fullCalendar({
            //height: 335,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            // defaultDate: '2016-03-08',
            selectable: true,
            selectHelper: true,
            select: function (start, end) {
                var title = prompt('Event Title:');
                var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: '2018-07-05',
                        end: '2018-07-30'
                    };
                    $element.fullCalendar('renderEvent', eventData, true); // stick? = true
                }
                $element.fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events:$scope.events
            // [
            //     // {
            //     //     title: 'All Day Event',
            //     //     start: '2016-03-01',
            //     //     color: dashboardColors.silverTree
            //     // },
            //     // {
            //     //     title: 'Long Event',
            //     //     start: '2016-03-07',
            //     //     end: '2016-03-10',
            //     //     color: dashboardColors.blueStone
            //     // },
            //     // {
            //     //     title: 'Dinner',
            //     //     start: '2016-03-14T20:00:00',
            //     //     color: dashboardColors.surfieGreen
            //     // },
            //     // {
            //     //     title: 'Birthday Party',
            //     //     start: '2016-04-01T07:00:00',
            //     //     color: dashboardColors.gossipDark
            //     // }
            // ]
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


        // Start Data from calender
        // $scope.SelectedEvent = null;
        // var isFirstTime = true;

        // $scope.events = [];
        // $scope.eventSources = [$scope.events];


        //Load events from server
        //     $http.get('/home/getevents', {
        //         cache: true,
        //         params: {}
        //     }).then(function (data) {
        //         $scope.events.slice(0, $scope.events.length);
        //         angular.forEach(data.data, function (value) {
        //             $scope.events.push({
        //                 title: value.Title,
        //                 description: value.Description,
        //                 start: new Date(parseInt(value.StartAt.substr(6))),
        //                 end: new Date(parseInt(value.EndAt.substr(6))),
        //                 allDay: value.IsFullDay
        //             });
        //         });
        //     });

        //     //configure calendar
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

        // }])

        // End data From calender




    }
})();