/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.payroll.payrollsetting')
        .controller('payrollController', payrollController);

    /** @ngInject */
    function payrollController($scope, $state, $stateParams,$rootScope,
        pageService, DJWebStore, dialogModal, editFormService) {
    
        var vm = this;
        // var pageId = $stateParams.pageId;
        var pageId = 331;
        var tempName = $stateParams.name;
        var currentState = $state.current;
        $scope.clearEntity = _clearEntity;
        $scope.closeForm = _closeForm;
        $scope.oldEntity = {};
        $scope.saveForm = _saveForm;
        $scope.clearAllEntity = true;
    
        $scope.changeMonthType = _changeMonthType;
    
    
        $scope.salaryCalculatedOn = _salaryCalculatedOn;
    
    
        function _salaryCalculatedOn(value) {
          if (value == 1) {
            $scope.entity.LSCFixDay = 0
            $scope.entity.LSCTotalDayInCycle = 1
            $scope.entity.LSCTotalWorkingDay = 0
          }
          else if (value == 2) {
            $scope.entity.LSCFixDay = 0
            $scope.entity.LSCTotalDayInCycle = 0
            $scope.entity.LSCTotalWorkingDay = 1
          }
          else {
            $scope.entity.LSCFixDay = 1
            $scope.entity.LSCTotalDayInCycle = 0
            $scope.entity.LSCTotalWorkingDay = 0
          }
        }
    
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = pageId;
        $scope.page.boxOptions = {
          selfLoading: true,
          showRefresh: true,
          showFilter: false,
          showAdd: true,
          showRowMenu: true,
          showCustomView: true,
          showUpload: false,
          showDialog: false,
          enableRefreshAfterUpdate: true,
          gridHeight: 450,
          linkColumns: [],
          getPageData: null,
          refreshData: null,
          addRecord: null,
          editRecord: null,
          updateRecord: null,
          viewRecord: null,
          deleteRecord: null,
          uploadRecord: null
        }
    
        if ($scope.page.pageId == 331) {
          $scope.page.boxOptions.addRecord = _addRecord;
          $scope.page.boxOptions.editRecord = _editRecord;
        }
    
        function _addRecord() {
          $scope.entity = {};
          $scope.showEditForm = true;
        }
    
        function _clearEntity() {
          console.log($scope.clearAllEntity)
          if ($scope.page.action != 'edit') {
            $scope.clearAllEntity = true;
          }
          if ($scope.clearAllEntity) {
            var oldData = $scope.entity.LSCSCDId;
            console.log($scope.entity)
            $scope.entity = {};
            $scope.entity.LSCSCDId = oldData;
          }
    
        }
    
        function _editRecord(row) {
    
          $scope.clearAllEntity = false;
          console.log(row)
    
          $scope.entity = row.entity;
          $scope.oldEntity = angular.copy(row.entity);
          console.log(row.entity)
          console.log($scope.entity)
    
          $scope.showEditForm = true;
          if ($scope.entity.LSInBetMonthId) {
            $scope.entity.monthType = "2";
          }
          else if ($scope.entity.LSCEndOfMonth) {
            $scope.entity.monthType = "1";
          }
    
          if ($scope.entity.LSCFixDay) {
            $scope.entity.salaryCalOn = 3
          }
          else if ($scope.entity.LSCTotalWorkingDay) {
            $scope.entity.salaryCalOn = 2
          }
          else if ($scope.entity.LSCTotalDayInCycle) {
            $scope.entity.salaryCalOn = 1
          }
    
          $scope.entity.LSCFixDay = 0
          $scope.entity.LSCTotalDayInCycle = 1
          $scope.entity.LSCTotalWorkingDay = 0
    
        }
        function _closeForm(editForm) {
          $scope.showEditForm = false;
        }
    
        function _changeMonthType(monthType) {
          if (monthType == "1") {
            $scope.entity.LSCEndOfMonth = true;
            $scope.entity.LSInBetMonthId = false;
            $scope.entity.LSCFromDay = 0;
            $scope.entity.LSCToDay = 0
          }
          else if (monthType == "2") {
            $scope.entity.LSCEndOfMonth = false;
            $scope.entity.LSInBetMonthId = true;
          }
        }
    
        function _saveForm(editForm) {
          if (_validateForm(editForm)) {
    
            editFormService.saveForm(pageId, $scope.entity,
              $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline).then(_successSalarySetting, _errorSalarySetting);
            $scope.page.refreshData();
            console.log(pageId + 'pageid')
            console.log($scope.entity)
            console.log($scope.oldEntity)
            console.log($scope.page.action + 'edit')
    
          }
          // console.log($scope.page.pageinfo.pageid, $scope.entity,
          //   $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
    
        }
    
    
        function _successSalarySetting(result) {
          console.log(result)
          if (result.success_message == 'Added New Record.') {
            $scope.showEditForm = false;
            $scope.page.refreshData();
            // editForm.$setPristine();
          }
          else if (result.success_message == 'Record Updated.') {
            $scope.showEditForm = false;
            $scope.page.refreshData();
          }
          else
            $scope.showEditForm = true;
        }
    
        function _errorSalarySetting() {
    
        }
        function _validateForm(editForm) {
          console.log(editFormService)
          var valid = editFormService.validateForm(editForm)
          return valid;
    
        }
    
    
    
    
      }
})();