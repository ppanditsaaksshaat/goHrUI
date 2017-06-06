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

    /**Local Variable */
    var vm = this;
    vm.gridOptions = $scope.getGridSetting();
    vm.uploader = [];
    $scope.fileResult = undefined;



    vm.downloadTemp = _downloadTemp;
    vm.uploadAttendance = _uploadAttendance;

    /**
     * DownLoad Excel Template for Attendance
     */
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

    /**
     * Upload Attendance List from Excel
     */
    function _uploadAttendance() {

      console.log(vm.gridOptions.data)
      var upload = {
        uploadData: vm.gridOptions.data,
        groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }
      pageService.commonUploder(data).then(function (result) {
      })
    }
  }

})();
