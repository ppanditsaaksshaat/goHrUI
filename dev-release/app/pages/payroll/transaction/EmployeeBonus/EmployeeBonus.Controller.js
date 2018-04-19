/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.EmployeeBonus')
    .controller('payEmployeeBonusController', payEmployeeBonusController);

  /** @ngInject */
  function payEmployeeBonusController($scope, $state, editFormService, pageService) {
    console.log('payEmployeeBonusController')

    var vm = this;
    var pageId = 96;

    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();


    console.log($scope.page)
    $scope.page.pageId = 475;
    var bonusPageId = 475;



    $scope.oldEntity = {};

    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      filterOpened: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: null,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      showDataOnLoad: false,
      pageResult: _pageResult,
      dataResult: _dataResult
    }

    function _dataResult(result) {
      console.log(result)
    }

    function _pageResult(result) {
      console.log(result);
    }

    $scope.page.boxOptions.customButtons = [];
    $scope.page.boxOptions.customButtons.push({ text: 'Save', icon: 'ion-refresh', onClick: _saveMidMonthClick, type: 'btn-danger' })

    function _addRecord() {
      $scope.showEditForm = true;
      $scope.entity = {};
      $scope.newEntity = {};
    }

    var totalSavingRecord = 0;
    function _saveMidMonthClick() {
      if ($scope.page.gridOptions.data.length > 0) {
        var upload = {
          fieldRow: $scope.page.gridOptions.data,
          // groupName: 'Attendance'
        }
        var postData = JSON.stringify(upload);
        console.log(upload)
        console.log(postData)
        var compressed = LZString.compressToEncodedURIComponent(postData);
        var data = { lz: true, data: compressed }
        pageService.employeeBonusUpload(data).then(function (result) {
          console.log(result)
          if (result.successList.length > 0) {
            $scope.showMsg("success", "Bonus Saved Successfully");
          }
          else {
            $scope.showMsg("error", result);
          }
        })
      }
      else {
        $scope.showMsg("success", "Please filter data and then save record");
      }



      // totalSavingRecord = $scope.page.gridOptions.data.length - 1;

      // if ($scope.page.gridOptions.data.length > 0) {
      //   angular.forEach($scope.page.gridOptions.data, function (row) {
      //     //                    console.log(row)

      //     var data = {
      //       EBDId: row.EBDId == null ? undefined : row.EBDId,
      //       EBDEmpId: row.EBDEmpId,
      //       EBDAmount: row.EBDAmount,
      //       EBDTotalBonus: row.EBDTotalBonus,
      //       FromYear: row.EBDFromYear,
      //       ToYear: row.EBDToYear,
      //       EBDTotalYearWorkingDay: row.EBDTotalYearWorkingDay

      //     }
      //     console.log(data)
      //     var form = {}


      //     if (data.EBDEmpId != undefined) {
      //       editFormService.saveForm(bonusPageId, data,
      //         {}, 'create', 'Bonus', form, false).then(_successMidMonthResult, _errorMidMonthResult);
      //     }
      //     else {
      //       editFormService.saveForm(bonusPageId, data,
      //         {}, 'edit', 'Bonus', form, false).then(_successMidMonthResult, _errorMidMonthResult);
      //     }
      //   })
      // }
      // else {
      //   $scope.showMsg("error", "Please search data then save");
      // }
    }
    function _successMidMonthResult(result) {
      console.log(result)
      $scope.showMsg("success", "Bonus Saved Successfully");
      $scope.page.refreshData();


    }
    function _errorMidMonthResult(err) {
      // alert(JSON.stringify(err))
      console.log(err);
    }
  }

})();
