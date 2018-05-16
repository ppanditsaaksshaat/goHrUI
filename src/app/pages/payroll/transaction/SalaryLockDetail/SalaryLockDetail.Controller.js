
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.SalaryLockDetail')
    .controller('SalaryLockDetailController', SalaryLockDetailController);

  /** @ngInject */
  function SalaryLockDetailController($scope, $state, pageService, editFormService, $filter) {
    // alert("controller")

    var queryId = 635;
    $scope.lock = {};
    $scope.locks = _locks;
    $scope.unLocks = _unLocks;
    $scope.lockUnlock = _lockUnlock;
    $scope.isLockData = false;
    $scope.isUnLockData = false;

    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _getCustomQuerySuccessResult(result) {
      console.log(result)
      $scope.subUnitList = result[0];
      console.log($scope.subUnitList)
      $scope.processTypeList = result[1];
      $scope.monthList = result[2];
      $scope.yearList = result[3];
      console.log($scope.processTypeList)
    }
    function _getCustomQueryErrorResult(err) {
      console.log(err)
    }


    function _locks() {
      console.log($scope.user.profile.empId)
      if ($scope.lock.subUnit !== undefined && $scope.lock.subUnit != '') {
        if ($scope.lock.processType !== undefined && $scope.lock.processType != '') {
          if ($scope.lock.month !== undefined && $scope.lock.month != '') {
            if ($scope.lock.year !== undefined && $scope.lock.year != '') {
              var searchLists = [];
              var lockQueryId = 636;
              var searchListData = { field: 'SubUnitId', operand: '=', value: $scope.lock.subUnit }
              searchLists.push(searchListData)
              var searchListData = { field: 'type', operand: '=', value: $scope.lock.processType }
              searchLists.push(searchListData)
              var searchListData = { field: 'month', operand: '=', value: $scope.lock.month }
              searchLists.push(searchListData)
              var searchListData = { field: 'year', operand: '=', value: $scope.lock.year }
              searchLists.push(searchListData)
              var searchListData = { field: 'islock', operand: '=', value: '9999' }
              searchLists.push(searchListData)

              var data = {
                searchList: searchLists,
                orderByList: []
              }
              pageService.getCustomQuery(data, lockQueryId).then(_locksSuccessResult, _locksErrorResult)
            }
            else {
              $scope.showMsg("warning", "Please Select Year")
            }
          }
          else {
            $scope.showMsg("warning", "Please Select Month")
          }
        }
        else {
          $scope.showMsg("warning", "Please Select Process Type")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select SubUnit")
      }
    }

    function _locksSuccessResult(result) {
      console.log(result);
    }

    function _locksErrorResult(error) {
      console.log(error)
    }


    function _unLocks() {
      console.log($scope.user.profile.empId)
      if ($scope.lock.subUnit !== undefined && $scope.lock.subUnit != '') {
        if ($scope.lock.processType !== undefined && $scope.lock.processType != '') {
          if ($scope.lock.month !== undefined && $scope.lock.month != '') {
            if ($scope.lock.year !== undefined && $scope.lock.year != '') {
              var searchLists = [];
              var lockQueryId = 636;
              var searchListData = { field: 'SubUnitId', operand: '=', value: $scope.lock.subUnit }
              searchLists.push(searchListData)
              var searchListData = { field: 'type', operand: '=', value: $scope.lock.processType }
              searchLists.push(searchListData)
              var searchListData = { field: 'month', operand: '=', value: $scope.lock.month }
              searchLists.push(searchListData)
              var searchListData = { field: 'year', operand: '=', value: $scope.lock.year }
              searchLists.push(searchListData)
              var searchListData = { field: 'islock', operand: '=', value: '0' }
              searchLists.push(searchListData)

              var data = {
                searchList: searchLists,
                orderByList: []
              }
              pageService.getCustomQuery(data, lockQueryId).then(_unLocksSuccessResult, _unLocksErrorResult)
            }
            else {
              $scope.showMsg("warning", "Please Select Year")
            }
          }
          else {
            $scope.showMsg("warning", "Please Select Month")
          }
        }
        else {
          $scope.showMsg("warning", "Please Select Process Type")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select SubUnit")
      }
    }

    function _unLocksSuccessResult(result) {
      console.log(result);
    }

    function _unLocksErrorResult(error) {
      console.log(error)
    }

    function _lockUnlock() {
      console.log($scope.user.profile.empId)
      if ($scope.lock.subUnit !== undefined && $scope.lock.subUnit != '') {
        if ($scope.lock.processType !== undefined && $scope.lock.processType != '') {
          if ($scope.lock.month !== undefined && $scope.lock.month != '') {
            if ($scope.lock.year !== undefined && $scope.lock.year != '') {
              var searchLists = [];
              var lockUnlocak = 637;
              var searchListData = { field: 'SubUnitId', operand: '=', value: $scope.lock.subUnit }
              searchLists.push(searchListData)
              var searchListData = { field: 'type', operand: '=', value: $scope.lock.processType }
              searchLists.push(searchListData)
              var searchListData = { field: 'month', operand: '=', value: $scope.lock.month }
              searchLists.push(searchListData)
              var searchListData = { field: 'year', operand: '=', value: $scope.lock.year }
              searchLists.push(searchListData)


              var data = {
                searchList: searchLists,
                orderByList: []
              }
              pageService.getCustomQuery(data, lockUnlocak).then(_lockUnSuccessResult, _lockUnErrorResult)
            }
            else {
              // $scope.showMsg("warning", "Please Select Year")
            }
          }
          else {
            // $scope.showMsg("warning", "Please Select Month")
          }
        }
        else {

          // $scope.showMsg("warning", "Please Select Process Type")
        }
      }
      else {
        // $scope.showMsg("warning", "Please Select SubUnit")
      }
    }

    function _lockUnSuccessResult(result) {
      console.log(result);
      if (result[0][0].isLock == 0) {
        $scope.isLockData = true;
        $scope.isUnLockData = false;
      }
      else if (result[0][0].isLock == 9999) {
        $scope.isLockData = false;
        $scope.isUnLockData = true;
      }
      else {
        $scope.showMsg("info", "No Data Found.")
        $scope.isLockData = false;
        $scope.isUnLockData = false;
      }

    }

    function _lockUnErrorResult(error) {
      console.log(error)
    }
  }
});
