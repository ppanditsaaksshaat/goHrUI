/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advance.transaction.midMonth')
    .controller('midMonthController', midMonthController);

  /** @ngInject */
  function midMonthController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr) {

    var vm = this;
    var pageId = 96;

    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;
    $scope.entity = {}
    $scope.page = $scope.createPage();


    console.log($scope.page)
    $scope.page.pageId = 451;
    var advancePageId = 96;



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
      filterOnChange: _filterChange,
    }

    function _filterChange() {
      var currentDay;
      var currentDate = new Date();
      var aAMonth = $scope.page.filterData.Month.value - 1
      var aAYear = $scope.page.filterData.Year.value
      currentDay = currentDate.getDate();
      console.log(currentDay)
      var aADate = new Date(aAYear, aAMonth, currentDay);
      $scope.entity.advanceDate = moment(aADate).format("YYYY-MM-DD");
      console.log($scope.entity.advanceDate)
      // 'yyyy-MM-dd'

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

      totalSavingRecord = $scope.page.gridOptions.data.length - 1;

      if ($scope.page.gridOptions.data.length > 0) {
        angular.forEach($scope.page.gridOptions.data, function (row) {
          //                    console.log(row)

          var data = {
            // EBDId: row.EBDId == null ? undefined : row.EBDId,
            // EBDAccountNumber: row.EBDAccountNumber,
            // EBDBenefitId: row.EBDBenefitId,
            // EBDEmpId: row.EBDEmpId,
            // EBDIsOnPercentage: row.EBDIsOnPercentage,
            // EBDFiexedAmount: row.EBDFiexedAmount,
            // EBDPercentage: row.EBDPercentage,
            // EBDIsCalOnBasic: row.EBDIsCalOnBasic

            AAId: row.AAId == null ? undefined : row.AAId,
            AAEmpId: row.EBDEmpId,
            AAAmount: row.MidMonth,
            AAIsGiven: 1,
            AADate: $scope.entity.advanceDate
          }
          console.log(data)
          var form = {}

          // editFormService.saveForm(advancePageId, data,
          //   {}, 'create', 'Benefit', form, false).then(_successMidMonthResult, _errorMidMonthResult);

          if (data.AAId == undefined) {
            editFormService.saveForm(advancePageId, data,
              {}, 'create', 'MidNonth', form, false).then(_successMidMonthResult, _errorMidMonthResult);
          }
          else {
            editFormService.saveForm(advancePageId, data,
              {}, 'edit', 'MidNonth', form, false).then(_successMidMonthResult, _errorMidMonthResult);
          }
        })
      }
      else {
        $scope.showMsg("error", "Please search data then save");
      }
    }
    function _successMidMonthResult(result) {
      console.log(result)
      $scope.showMsg("success", "Advance Saved Successfully");
      $scope.page.refreshData();
      // benefintSavecount++;
      // console.log(benefintSavecount + ' of ' + totalSavingRecord)
      // if (benefintSavecount == totalSavingRecord) {
      //   $scope.showMsg("success", "Employee Benefit Saved Successfully");
      //   $scope.page.refreshData();
      // }

    }
    function _errorMidMonthResult(err) {
      // alert(JSON.stringify(err))
      console.log(err);
    }





  }

})();
