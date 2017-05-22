/**
 * @author santosh.kushwaha
 * created on 20/05/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.reports', [
     'BlurAdmin.pages.attendance.reports.attendancedetail' ,
     'BlurAdmin.pages.attendance.reports.attendancemuster',
     'BlurAdmin.pages.attendance.reports.absentreport',
     'BlurAdmin.pages.attendance.reports.employeeattendance',     
     'BlurAdmin.pages.attendance.reports.otsummarydetail',
     'BlurAdmin.pages.attendance.reports.emplateattendance'     
       ])
    .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('attendance.reports', {
        url: '/reports',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'reports',
        sidebarMeta: {
          icon: 'ion-gear-a',
          order: 100,
        },
      })
  }

})();
