/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.transaction.compoffApply')
    .controller('attTranscompoffApplyController', attTranscompoffApplyController);

  /** @ngInject */
  function attTranscompoffApplyController($scope, $state, $timeout, pageService) {
    var vm = this;
    var pageId = 127;
    var currentState = $state.current;
    // this.uploadRecord = _uploadRecord;

    $scope.attDateChange = _attDateChange;
    $scope.empChange = _empChange;

    $scope.entity = {}
    $scope.closeForm = _closeForm;
    $scope.page = $scope.createPage();
    $scope.page.pageId = 127;
    $scope.page.boxOptions = {
      selfLoading: true,
      showRefresh: true,
      showFilter: true,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      showDialog: false,
      enableRefreshAfterUpdate: true,
      enableAutoRefresh: true,
      showDataOnLoad: true,
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: null,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
    }
    function _addRecord() {
      $scope.showEditForm = true;
    }
    function _closeForm() {

      $scope.showEditForm = false;
    }
    /**
     * handler for attendance date field box on change event
     * @param {object} event 
     * @param {object} element 
     * @param {object} modelCtrl 
     * @param {object} column 
     */
    function _attDateChange(event, element, modelCtrl, column) {
      var attDate = modelCtrl.$modelValue;
      var EmpId = $scope.entity.EmpId;
      var COAttnDate = moment($scope.entity.COAttnDate);
      console.log(attDate, column, modelCtrl, $scope.entity)
    }
    /**
     * On Change Event for Employee Dropdown
     * @param {object} event 
     * @param {object} element 
     * @param {object} modelCtrl 
     * @param {object} column 
     */
    function _empChange(event, element, modelCtrl, column) {
      var EmpId = modelCtrl.$modelValue;
      var COAttnDate = moment($scope.entity.COAttnDate);
      console.log(EmpId, column, modelCtrl, $scope.entity)
    }


  }

})();
