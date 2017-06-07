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
    vm.commonGridOptions = $scope.getGridSetting();
    vm.gridUpdatedOptions = $scope.getGridSetting();
    vm.gridFaliedOptions = $scope.getGridSetting();
    vm.uploader = [];
    $scope.fileResult = undefined;
    vm.showUploderResult = true;



    vm.downloadTemp = _downloadTemp;
    vm.uploadAttendance = _uploadAttendance;
    vm.insert = _insert;
    vm.update = _update
    vm.fail = _fail;




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
    vm.steps1 = true;
    vm.steps2 = false;

    // vm.migrate = {
    //   step1: true, step2: false
    // }


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

    var insertedGridData = [], updatedGridData = [], failedGridData = [];

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
        if (result !== undefined) {
          vm.showUploderResult = false;
          angular.forEach(result.Table1, function (data) {
            if (data.IsInserted) {
              insertedGridData.push(data)
            }
            else if (data.IsUpdated) {
              updatedGridData.push(data)
            }
            else {
              failedGridData.push(data)
            }
          });
          console.log(result.Table2[0].Inserted)
          vm.insertedRow = result.Table2[0].Inserted;
          vm.updatedRow = result.Table2[0].Updated;
          vm.failedRow = result.Table2[0].Failed;
        }

        console.log(result)
      })
    }

    function _insert() {
      vm.commonGridOptions.data = insertedGridData;
    }
    function _update() {
      vm.commonGridOptions.data = updatedGridData;
    }
    function _fail() {
      vm.commonGridOptions.data = failedGridData;
    }

  }

})();
