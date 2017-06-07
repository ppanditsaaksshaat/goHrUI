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
    $uibModal, pageService, $q, DJWebStore, $window, DJWebStoreGlobal, toastr, toastrConfig) {
    console.log('attTransuploadController')

    /**Local Variable */
    var vm = this;
    vm.gridOptions = $scope.getGridSetting();
    vm.uploader = [];
    $scope.fileResult = undefined;



    vm.downloadTemp = _downloadTemp;
    vm.uploadAttendance = _uploadAttendance;




    var toastOption = {};
    var defaultConfig = angular.copy(toastrConfig);
    var openedToasts = [];
    toastOption = {
      autoDismiss: false,
      positionClass: 'toast-top-center',
      type: 'success',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: true,
      tapToDismiss: true,
      progressBar: true,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
      title: "",
      msg: ""
    };

    /**
     * 
     * @param {*} type 
     * @param {*} msg 
     * @param {*} title 
     */
    function _showToast(type, msg, title) {
      toastOption.type = type;
      angular.extend(toastrConfig, toastOption);
      openedToasts.push(toastr[toastOption.type](msg, title));
    }

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
        fieldRow: vm.gridOptions.data,
        groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }
      pageService.commonUploder(data).then(function (result) {

        var errorMsg = "";
        console.log(result)
        angular.forEach(result.Table1, function (data,index) {
          if (data.IsFailed) {
            errorMsg +="In row "+index+" "+data.RESULT
          }       
        })
        console.log(errorMsg)
        if (errorMsg != "") {
          _showToast('error', errorMsg, "")
        }
       
        console.log(result)
      })
    }
  }

})();
