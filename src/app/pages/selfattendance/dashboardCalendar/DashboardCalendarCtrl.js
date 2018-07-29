/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.selfattendance')
    .controller('DashboardCalendarCtrl', DashboardCalendarCtrl);

  /** @ngInject */
  function DashboardCalendarCtrl(baConfig) {
   
    var dashboardColors = baConfig.colors.dashboard;

    var $element = $('#calendar').fullCalendar({
      //height: 335,
      // viewRender: function(currentView){
      //   var minDate = moment(),
      //   maxDate = moment().add(2,'weeks');
      //   // Past
      //   if (minDate >= currentView.start && minDate <= currentView.end) {
      //     $(".fc-prev-button").prop('disabled', true); 
      //     $(".fc-prev-button").addClass('fc-state-disabled'); 
      //   }
      //   else {
      //     $(".fc-prev-button").removeClass('fc-state-disabled'); 
      //     $(".fc-prev-button").prop('disabled', false); 
      //   }
      //   // Future
      //   if (maxDate >= currentView.start && maxDate <= currentView.end) {
      //     $(".fc-next-button").prop('disabled', true); 
      //     $(".fc-next-button").addClass('fc-state-disabled'); 
      //   } else {
      //     $(".fc-next-button").removeClass('fc-state-disabled'); 
      //     $(".fc-next-button").prop('disabled', false); 
      //   }
      // },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate:  moment(),
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
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-07-12',
          color: dashboardColors.silverTree,
          id:1

        },
        {
          title: 'Test Event',
          start: '2018-07-12',
          color: dashboardColors.silverTree,
          id:1

        },
        {
          title: 'Long Event',
          start: '2018-07-15',
          end: '2016-07-18',
          color: dashboardColors.blueStone,
        },
        {
          title: 'Dinner',
          start: '2018-07-01',
        
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2018-08-01T07:00:00',
          color: dashboardColors.gossipDark
        }
      ]
    });

    // For Calender Previous Event
    $('.fc-prev-button').click(function () {
      alert('prev is clicked, do something');
    });

    // For Calender Next Event
    $('.fc-next-button').click(function () {
      alert('next button is clicked');
    });
  }
})();