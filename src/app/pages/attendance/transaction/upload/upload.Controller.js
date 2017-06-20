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
    vm.uploader = [];
    $scope.fileResult = undefined;
    var insertedGridData = [], updatedGridData = [], failedGridData = [];
    vm.showUploderResult = true;
    vm.btnResetBrowse = true;



    /**Private Function */
    vm.downloadTemp = _downloadTemp;
    vm.uploadAttendance = _uploadAttendance;
    vm.insert = _insert;
    vm.update = _update
    vm.fail = _fail;
    vm.resetBrowse = _resetBrowse;
    vm.close = _close;



    /**Toaster Option Setting */
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


    function _resetBrowse() {
      vm.showPreview = false;
      if (!vm.btnResetBrowse) {
        vm.btnResetBrowse = true;
        _loadController();
      }
      //listen watch on gridOptions.data and assign to variable for destroy
      var dataListner = $scope.$watch(function () {
        //returning the object changes occurred
        return vm.gridOptions.data;
      }, function (newVal, oldVal) {
        //comairing for undefined, on first load this will be undefined
        if (newVal) {
          if (vm.gridOptions.data.length > 0) {
            //comairing our required condition
            if (vm.gridOptions.data[0].EmployeeCode == "EmpCode" || vm.gridOptions.data[0].AttendanceDate == "dd-MMM-yyyy") {
              //removing required row
              vm.gridOptions.data.splice(0, 1)
            }
            dataListner();//distroy $watch after requirement furnished
          }
        }

      })

    }

    /**
     * DownLoad Excel Template for Attendance
     */
    function _downloadTemp() {
      var tempColumns = [];
      var row = {
        EmployeeCode: 'EmpCode',
        AttendanceDate: 'dd-MMM-yyyy',
        InTime: '(HH:mm)(24 Hr Format)',
        OutTime: '(HH:mm)(24 Hr Format)',
        Remarks: '',
      }
      tempColumns.push(row)
      DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'AttendanceList', false, true, true);
    }

    /**
     * Upload Attendance List from Excel
     */
    function _uploadAttendance() {
      angular.forEach(vm.gridOptions.data, function (data, index) {
        vm.gridOptions.data[index].AttDataBaseType = 5;
      })
      alert(JSON.stringify(vm.gridOptions.data))
      var upload = {
        fieldRow: vm.gridOptions.data,
        groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }
      pageService.commonUploder(data).then(function (result) {
        insertedGridData = []; updatedGridData = []; failedGridData = [];
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

          vm.insertedRow = result.Table2[0].Inserted;
          vm.updatedRow = result.Table2[0].Updated;
          vm.failedRow = result.Table2[0].Failed;
          if (vm.failedRow != 0) {
            vm.gridUpHeading = "Failed Preview Data"
            vm.commonGridOptions.data = failedGridData;
          }
          else {
            if (vm.insertedRow != 0) {
              vm.gridUpHeading = "Inserted Preview Data"
              vm.commonGridOptions.data = insertedGridData;
            }
            else {
              vm.gridUpHeading = "Updated Preview Data"
              vm.commonGridOptions.data = updatedGridData;
            }
          }
        }
        _showToast("success", "Data Uploaded Successfully", "")

        console.log(result)
      })
    }

    /**Show How Many Attendance Data Inserted   */
    function _insert() {
      vm.gridUpHeading = "Inserted Preview Data"
      vm.commonGridOptions.data = insertedGridData;
    }
    /**Show How Many Attendance Data Updated   */
    function _update() {
      vm.gridUpHeading = "Updated Preview Data"
      vm.commonGridOptions.data = updatedGridData;
    }
    /**Show How Many Attendance Data Failed   */
    function _fail() {
      vm.gridUpHeading = "Failed Preview Data"
      vm.commonGridOptions.data = failedGridData;
    }

    function _loadController() {
      var dataListner = $scope.$watch(function () {
        //returning the object changes occurred
        return vm.gridOptions.data;
      }, function (newVal, oldVal) {
        //comairing for undefined, on first load this will be undefined
        if (newVal) {
          if (vm.gridOptions.data.length > 0) {
            vm.btnResetBrowse = false;
            //comairing our required condition
            if (vm.gridOptions.data[0].EmployeeCode == "EmpCode" || vm.gridOptions.data[0].AttendanceDate == "dd-MMM-yyyy") {
              //removing required row
              vm.gridOptions.data.splice(0, 1)
            }
            dataListner();//distroy $watch after requirement furnished
          }
        }

      })
    }
    function _close() {

      vm.showPreview = false;
      _loadController();
    }
    _loadController();
  }

})();
