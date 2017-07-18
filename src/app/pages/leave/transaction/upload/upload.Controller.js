/**
 * @author 
 * created on 15.07.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.upload')
    .controller('leaveUploadController', leaveUploadController);

  /** @ngInject */
  function leaveUploadController($scope, $sce, $filter, $http, uiGridConstants, $interval, $timeout,
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
    vm.resultGridOptions = $scope.getGridSetting();
    vm.resultGridOptions.exporterMenuCsv = true;
    vm.succesResultGridOptions = $scope.getGridSetting();
    vm.succesResultGridOptions.exporterMenuCsv = true;
    vm.gridOptions = $scope.getGridSetting();



    /**Private Function */
    vm.downloadTemp = _downloadTemp;
    vm.uploadAttendance = _uploadAttendance;
    vm.insert = _insert;
    vm.update = _update
    vm.fail = _fail;
    vm.resetBrowse = _resetBrowse;
    vm.close = _close;
    vm.showPreviewClick = _showPreviewClick;



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
     * DownLoad Excel Template for Leave Upload
     */
    function _downloadTemp() {
      var tempColumns = [];
      var row = {
        EmpCode:'',
        CLOpening: '',
        ELOpening: '',
        CLConsume: '',
        ELConsume: '',
        Year: '',
        Remarks: '',
      }
      tempColumns.push(row)
      DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'LeaveList', false, true, true);
    }

    /**
     * Upload Leave List from Excel
     */
    function _uploadAttendance() {
      // angular.forEach(vm.gridOptions.data, function (data, index) {
      //   // data.AttDataBaseType = 5;
      // })


      console.log(vm.gridOptions.data)

      var upload = {
        fieldRow: vm.gridOptions.data,
        // groupName: 'Attendance'
      }
      var postData = JSON.stringify(upload);
      console.log(upload)
      console.log(postData)
      var compressed = LZString.compressToEncodedURIComponent(postData);
      var data = { lz: true, data: compressed }
      pageService.leaveTypeUpload(data).then(function (result) {
        console.log(result)
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

          vm.insertedRow = result.successList.length;
          vm.updatedRow = result.skipList.length;
          var successDataLength = result.successList.length;
          var skipListDataLength = result.skipList.length;
          var successData = parseInt(successDataLength)
          var skipData = parseInt(skipListDataLength)

          vm.totalRecord = successData + skipData
          vm.failedRow = vm.totalRecord;
          if (vm.updatedRow != 0) {
            vm.gridUpHeading = "Skip Preview Data"
            vm.commonGridOptions.data = updatedGridData;
          }
          else {
            vm.gridUpHeading = "Inserted Preview Data"
            vm.commonGridOptions.data = insertedGridData;
          }

          vm.skipDataList = result.skipList;
          vm.addedDataList = result.successList;

          console.log(vm.skipDataList)

          if (vm.skipDataLists === undefined) {
            vm.skipDataLists = [];

          }

          if (vm.skipDataList.length > 0) {
            vm.resultGridOptions.columnDefs = [];
            vm.resultGridOptions.columnDefs.push({
              name: '$$result',
              field: '$$result',
              displayName: 'Result',
              width: 200,
              visible: true,
              enableFiltering: true

            });
            angular.forEach(vm.gridOptions.columnDefs, function (col, cdx) {
              var colRowHeader = {
                name: col.name,
                field: col.field,
                displayName: col.displayName,
                width: 150,
                visible: true,
                enableFiltering: true

              };
              vm.resultGridOptions.columnDefs.push(colRowHeader);
            })

            vm.resultGridOptions.data = vm.skipDataList;
          }


          if (result.successList.length > 0) {
            vm.succesResultGridOptions.columnDefs = [];

            vm.succesResultGridOptions.columnDefs.push({
              name: 'EmpCode',
              field: 'EmpCode',
              displayName: 'Employee Code',
              width: 250,
              visible: true,
              enableFiltering: true
            });
            vm.succesResultGridOptions.columnDefs.push({
              name: 'EmpFirstName',
              field: 'EmpFirstName',
              displayName: 'First Name',
              width: 250,
              visible: true,
              enableFiltering: true
            });
            vm.succesResultGridOptions.columnDefs.push({
              name: 'EmpMiddleName',
              field: 'EmpMiddleName',
              displayName: 'Middle Name',
              width: 230,
              visible: true,
              enableFiltering: true
            });
            vm.succesResultGridOptions.columnDefs.push({
              name: 'EmpLastName',
              field: 'EmpLastName',
              displayName: 'Last Name',
              width: 230,
              visible: true,
              enableFiltering: true
            });
            vm.succesResultGridOptions.columnDefs.push({
              name: 'EMPCodeAutometic',
              field: 'EMPCodeAutometic',
              displayName: 'Employee Auto Code',
              width: 230,
              visible: true,
              enableFiltering: true
            });
            // vm.succesResultGridOptions.columnDefs.push(colRowHeaders);



            vm.succesResultGridOptions.data = result.successList;
            console.log(result.successList)
          }

        }
        _showToast("success", "Data Uploaded Successfully", "")

        console.log(result)
      })
    }

    /**Show How Many Attendance Data Inserted   */
    function _insert() {
      vm.gridUpHeading = "Inserted Data"
      vm.commonGridOptions.data = insertedGridData;
    }
    /**Show How Many Attendance Data Updated   */
    function _update() {
      vm.gridUpHeading = "Skip Preview Data"
      vm.commonGridOptions.data = vm.succesResultGridOptions;
    }
    /**Show How Many Attendance Data Failed   */
    function _fail() {
      // vm.gridUpHeading = "Total Preview Data"
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

    function _showPreviewClick() {
      // angular.forEach(vm.gridOptions.data, function (data) {
      //   data.AttendanceDate = moment(data.AttendanceDate).format("DD/MMM/YYYY");
      //   console.log(data.AttendanceDate)
      // })
      // console.log(vm.gridOptions.data)
    }



    _loadController();
  }

})();
