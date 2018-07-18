/**
 * @author NKM 
 * created on 16.07.2018
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.self.attendance.daywise')
      .directive('daywiseCalendar', daywiseCalendar);

  /** @ngInject */
  function daywiseCalendar() {
    return {
      restrict: 'E',
      controller: 'daywiseCalendarCtrl',
      templateUrl: 'app/pages/self/attendance/daywise/daywiseCalendar/daywiseCalendar.html'
    };
  }
})();