/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.upload')
    .controller('attTransuploadController', attTransuploadController);

  /** @ngInject */
  function attTransuploadController($scope, $sce, $filter, $http, uiGridConstants, $interval, $timeout,
    $uibModal, pageService, $q, DJWebStore, $window, DJWebStoreGlobal) {
    console.log('attTransuploadController')

    var vm = this;

    vm.downloadTemp = _downloadTemp;

    //DownLoad Excel Template for Attendance
    function _downloadTemp() {
      var tempColumns = [];
      var row = {
        EmployeeCode: 'EmpCode',
        AttendanceDate: 'MM/dd/yyyy',
        InTime: '(hh:mm)(24 Hr Format)',
        OutTime: '(hh:mm)(24 Hr Format)',
        Remarks: '',
      }
      tempColumns.push(row)
      DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'AttendanceList', false, true, true);
    }
  }

})();
