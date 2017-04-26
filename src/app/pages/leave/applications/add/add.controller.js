/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.applications')
    .controller('ApplicationAddController', ApplicationAddController);

  /** @ngInject */
  function ApplicationAddController($scope, $stateParams, DJWebStore, pageService, $timeout, editFormService) {

    $scope.open = open;
    $scope.opened = false;
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.options = {
      showWeeks: false
    }

    function open() {
      $scope.opened = true;
    }

    var vm = this;
    vm.pageId = 157;
    vm.page = DJWebStore.GetValue('Page_' + vm.pageId);
    vm.selects = vm.page.pageinfo.selects;

    console.log(vm.selects)
    vm.entity = {};
    vm.action = 0;
    vm.entity.LEADEmpId;
    vm.oldEntity = {};
    vm.pageId = $stateParams.pageId;
    vm.action = $stateParams.action;
    //  vm.tempName = $stateParams.name;
    vm.pkId = 0;

    vm.employeeOnChange = _employeeOnChange;

    console.log($stateParams.pageId, $stateParams.action, $stateParams.name)

    if ($stateParams.pkId !== undefined) {
      vm.pkId = $stateParams.pkId;
    }

    function _loadController() {
      vm.page = DJWebStore.GetValue('Page_' + vm.pageId)
      //    vm.selects = vm.page.pageinfo.selects;
      if (vm.pkId > 0)
        _findEntity()
      // _employeeOnChange()
    }
    function _findEntity() {
      vm.isLoaded = false;
      vm.isLoading = true;
      $timeout(function () {
        pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });
    }
    function _findEntitySuccessResult(result) {
      vm.isLoaded = true;
      vm.isLoading = false;
      vm.entity = result;
      vm.oldEntity = angular.copy(result)
    }
    function _findEntityErrorResult(err) {
      vm.isLoaded = true;
      vm.isLoading = false;
    }


    // var employeeLeaveDataDetail = vm.selects.LEADEmpId;
    // var employeeLeaveDataDetailList = []
    // angular.forEach(employeeLeaveDataDetail, function (val, key) {
    //   var empData = {
    //     id: val.value,
    //     name: val.name
    //   }
    //   employeeLeaveDataDetailList.push(empData)
    //   console.log(empData)
    // })




    vm.pageData = {};
    vm.template = {};
    vm.param = {};


    vm.param = { LEADId: 0, entity: {} };

    vm.assign = {};
    vm.leaveTransactionTableId = 279;
    vm.leaveTransactionPageId = 270;
    vm.leaveTransactionList = [];
    vm.selectEmployeeList = [];
    vm.template = { leaveTypeData: [], employeeData: [], errorList: [] };
    var searchEmployeeLeaveTransactionList = [];
    var leaveTypeTableId = 279;
    var leaveTypePageId = 270;
    var employeeTableId = 30;
    var employeePageId = 25;
    vm.leaveTypeHeadingList = [];
    vm.leaveTypeDataList = [];
    vm.saveForm = _saveForm;

    function _validateForm(form) {
      return true;
    }

    function _saveForm(form) {
      debugger;
      if (_validateForm(form)) {

        if (vm.entity.LEADEmpId != "" && vm.entity.LEADEmpId !== undefined) {

          if(vm.entity.LEADDateFrom===undefined){
            vm.entity.LEADDateFrom="";
          }
           if(vm.entity.LEADDateTo===undefined){
            vm.entity.LEADDateTo="";
          }
          var firstdate = vm.entity.LEADDateFrom;
          var seconddate = vm.entity.LEADDateTo;

          var splitFirstDate = firstdate.split(' ')[0];
          var splitSecondDate = seconddate.split(' ')[0];
          console.log(splitFirstDate, splitSecondDate)
          var dt1 = splitFirstDate.split('/')
          var dt2 = splitSecondDate.split('/')

          var one = new Date(dt1[2], dt1[0] - 1, dt1[1])
          var two = new Date(dt2[2], dt2[0] - 1, dt2[1]);

          if (two >= one) {
            var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var millisBetween = two.getTime() - one.getTime();
            var days = millisBetween / millisecondsPerDay;
            console.log(days)
            Math.floor(days);

            var totalCredit = 0;
            var totalDebit = 0;
            var balanceLeave = 0;
            var leaveType = vm.entity.LEADLTId;

            console.log(vm.entity.LEADLTId)
            if (searchEmployeeLeaveTransactionList === undefined) {
              vm.searchEmployeeLeaveTransactionList = [];

            }
            vm.searchEmployeeLeaveTransactionList = [];
            _employeeOnChange()
            searchEmployeeLeaveTransactionList = vm.leaveTypeDataList;
            console.log(searchEmployeeLeaveTransactionList)
            var leaveCredit = parseInt(value.ELTLeaveCr);
            var leaveDebit = parseInt(value.ELTLeaveDr);

            var totalCredit = parseInt(vm.searchEmployeeLeaveTransactionList.Creadit);
            var totalDebit = parseInt(vm.searchEmployeeLeaveTransactionList.Debit);

            if (totalCredit >= totalDebit) {
              debugger;
              balanceLeave = totalCredit - totalDebit;
              if (balanceLeave >= days) {
                vm.oldEntity = {};
                vm.action = 'create';
                console.log(vm.entity, vm.oldEntity, vm.action)
                editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)
              }
              else {
                alert('You Can Not Apply Leave.')
              }
            }
            else {
              alert('Your leave is exta leave according to your balance Leave')
            }
            console.log(totalCredit)
            console.log(totalDebit)
          }
          else {
            alert('to date should be greater than from date')
          }

        }
        else {
          alert('Please Select Employee Name And Leave Type')
        }



      }
    }


    function _employeeOnChange() {
      vm.isLeaveTransactionTable = false;

      var searchLists = [];
      var searchListData = {
        field: 'ELTEmpId',
        operand: '=',
        value: vm.entity.LEADEmpId
      }
      searchLists.push(searchListData)
      var data = {
        searchList:searchLists,
        orderByList: []
      }

      var queryId = 494;
      // pageService.getTableData(leaveTypeTableId, leaveTypePageId, '', '', true, data).then(function (result) {
      //   console.log(result);

      pageService.getCustomQuery(data, queryId).then(function (result) {
        console.log(result);
        if (result == 'NoDataFound') {
          alert('No Leave Type Avaible')
          vm.isLeaveTransactionTable = false;

        }
        else {
          vm.leaveTypeDataList = result;
          vm.isLeaveTransactionTable = true;
        }




      });
    }






    console.log(vm.leaveTypeDataList);

    //public methods
  


    _loadController();
    
  }
})();