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


    /**Local Variable */
    var vm = this;
    vm.gridOptions = $scope.getGridSetting();
    vm.commonGridOptions = $scope.getGridSetting();
    vm.uploader = [];
    $scope.fileResult = undefined;
    var insertedGridData = [], updatedGridData = [], failedGridData = [];
    vm.showUploderResult = true;
    vm.btnResetBrowse = true;
    var monthlySummaryQueryId = 582;
    var varifiedAttendance = [];
    var finalaAttendanceList = [];



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
      finalaAttendanceList = [];
      varifiedAttendance = [];
      var isSameMonth = false;
      if ($scope.verifiedAttendance != undefined && $scope.verifiedAttendance != null) {

        var att = $filter("findObj")($scope.verifiedAttendance, "AMSEmpCode")
        // angular.forEach($scope.verifiedAttendance, function (verifiedAtt) {
        angular.forEach(vm.gridOptions.data, function (newAtt) {
          var attFromDate = moment(newAtt.AttendanceDate);
          var month = attFromDate.format('M');
          var year = attFromDate.format('YYYY');
          var empVerifedatt = $filter("findObj")($scope.verifiedAttendance, newAtt.EmployeeCode, "AMSEmpCode")
          if (empVerifedatt != null) {
            if (empVerifedatt.AMSTIsVarified && empVerifedatt.AMSMonth == parseInt(month) && empVerifedatt.AMSYear == parseInt(year)) {
              if (empVerifedatt.AMSMonth == parseInt(month) && empVerifedatt.AMSYear == parseInt(year)) {
                varifiedAttendance.push({ "RESULT": "#verification", "IsInserted": false, "IsUpdated": false, "IsFailed": true, "HashKey": "HashKey", "UniqueFields": "#Verified" })
              }
            }
            else {
              newAtt.AttDataBaseType = 5;
              newAtt.StatusId = 0;
              newAtt.IsDeleted = 0;
              finalaAttendanceList.push(newAtt);
            }
          }
          else {
            newAtt.AttDataBaseType = 5;
            newAtt.StatusId = 0;
            newAtt.IsDeleted = 0;
            finalaAttendanceList.push(newAtt);
          }

        })
        // })
      }
      // return
      // // angular.forEach(vm.gridOptions.data, function (data, index) {
      // //   data.AttDataBaseType = 5;
      // // })
      console.log(vm.gridOptions.data)

      var upload = {
        fieldRow: finalaAttendanceList,
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
              vm.updatedRow = result.Table2[0].Updated;;
              vm.failedRow = result.Table2[0].Failed;;
              vm.insertedRow = result.Table2[0].Inserted;
              insertedGridData.push(data)
            }
            else if (data.IsUpdated) {
              vm.insertedRow = result.Table2[0].Inserted;;
              vm.failedRow = result.Table2[0].Failed;;
              vm.updatedRow = result.Table2[0].Updated;
              updatedGridData.push(data)
            }
            else {
              vm.insertedRow = result.Table2[0].Inserted;
              vm.updatedRow = result.Table2[0].Updated;
              vm.failedRow = result.Table2[0].Failed;
              failedGridData.push(data)
            }
          });

          if (varifiedAttendance.length > 0) {
            vm.failedRow = varifiedAttendance.length;
            failedGridData = varifiedAttendance;
            vm.gridUpHeading = "Failed Preview Data"
            vm.commonGridOptions.data = failedGridData;
            // _showToast("error", "your provided attendance is already verified", "")
          }


          if (vm.failedRow != 0) {
            vm.gridUpHeading = "Failed Preview Data"
            vm.commonGridOptions.data = failedGridData;
          }
          if (vm.updatedRow != 0) {
            vm.gridUpHeading = "Updated Preview Data"
            vm.commonGridOptions.data = updatedGridData;
          }

          if (vm.insertedRow != 0) {
            vm.gridUpHeading = "Inserted Preview Data"
            vm.commonGridOptions.data = insertedGridData;
          }
        }

        if (finalaAttendanceList.length > 0) {
          _showToast("success", "Data Uploaded Successfully", "")
        }
        else {
          if (varifiedAttendance.length > 0) {
            vm.insertedRow = 0;
            vm.updatedRow = 0;
            vm.failedRow = varifiedAttendance.length;
            failedGridData = varifiedAttendance;
            vm.gridUpHeading = "Failed Preview Data"
            vm.commonGridOptions.data = failedGridData;
            _showToast("error", "your provided attendance is already verified", "")
          }
        }

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
      $timeout(function () {

        var data = {
          searchList: [],
          orderByList: []
        }
        var tableData = pageService.getCustomQuery(data, monthlySummaryQueryId);
        tableData.then(_getMonthlySummarySuccess, _getMonthlySummaryError)
      })
    }

    function _getMonthlySummarySuccess(result) {
      if (result != "NoDataFound") {
        $scope.verifiedAttendance = result;
      }
    }
    function _getMonthlySummaryError(err) {

    }
    function _close() {
      vm.showPreview = false;
      _loadController();
    }

    function _showPreviewClick() {
      angular.forEach(vm.gridOptions.data, function (data) {
        data.AttendanceDate = moment(data.AttendanceDate).format("DD/MMM/YYYY");
        console.log(data.AttendanceDate)
      })
      console.log(vm.gridOptions.data)
    }
    _loadController();
  }

})();
