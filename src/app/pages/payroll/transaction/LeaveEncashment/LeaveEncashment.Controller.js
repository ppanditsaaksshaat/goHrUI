/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.payroll.transaction.LeaveEncashment')
    .controller('payLeaveEncashmentController', payLeaveEncashmentController);

  /** @ngInject */
  function payLeaveEncashmentController($scope, $state, pageService, $filter, editFormService) {
    console.log('payLeaveEncashmentController')

    var vm = this;
    $scope.showEditForm = true;

    vm.pageId = 469;
    var currentState = $state.current;
    $scope.page = $scope.createPage();
    $scope.page.pageId = vm.pageId;
    $scope.closeForm = _closeForm;
    $scope.entity = {};
    $scope.selectedDesignDept = _selectedDesignDept;
    $scope.getEmpFullAndFinal = _getEmpFullAndFinal;
    vm.queryId = 591;
    $scope.saveForm = _saveForm;
    vm.oldEntity = {};
    var encashLeaveMaxAllow = 0;
    $scope.maxApplyEl = _maxApplyEl;
    var grossSalary = 0;
    var monthDays = 0;
    $scope.enableShowButton = true;
    $scope.disabledEmp = false;
    $scope.showStatus = false;
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
      enableAutoRefresh: true,
      showDataOnLoad: true,
      linkColumns: null,
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      customColumns: [{ text: 'Verify', type: 'a', name: 'Option', click: _lEVerify, pin: true }],
      viewRecord: _viewRecord,
      deleteRecord: null,
      pageResult: _pageResult,
      dataResult: _dataResult
    }
    function _dataResult(result) {
      console.log(result)
    }

    function _pageResult(result) {
      console.log(result);
    }

    function _selectedDesignDept() {
      // $scope.entity.LEDDate = $scope.entity.selectedEmp.RDRelievingDate;
      $scope.entity.SUName = $scope.entity.selectedEmp.SUName;
      $scope.entity.designName = $scope.entity.selectedEmp.DesgName;
      $scope.entity.deptName = $scope.entity.selectedEmp.DeptName;
      $scope.entity.subUnitId = $scope.entity.selectedEmp.JDSubUnitID;


    }

    function _editRecord(row) {
      $scope.showStatus = false;
      $scope.disabledEmp = true;
      console.log(row)
      $scope.enableShowButton = false;
      $scope.entity = row.entity;



      $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.LEDEmpId, row.entity.LEDEmpId, 'value')
      $scope.entity.SUName = row.entity.selectedEmp.SUName;
      $scope.entity.designName = row.entity.selectedEmp.DesgName;
      $scope.entity.deptName = row.entity.selectedEmp.DeptName;
      console.log($scope.entity.selectedEmp);
      $scope.showEditForm = false;
      $scope.showOnClick = true;
    }

    function _addRecord() {
      console.log(moment());
      $scope.showStatus = false;
      $scope.enableShowButton = true;
      $scope.disabledEmp = false;
      $scope.entity = {};
      $scope.entity.LEDDate = moment().format("DD/MM/YYYY")
      console.log(moment(new Date(), "DD/MM"))
      $scope.showEditForm = false;
      $scope.showOnClick = false;
    }

    function _closeForm() {
      $scope.showStatus = false;
      $scope.showEditForm = true;
      $scope.showOnClick = false;
      $scope.page.refreshData();
    }

    function _getEmpFullAndFinal() {
      console.log($scope.entity.selectedEmp)
      if ($scope.entity.selectedEmp !== undefined && $scope.entity.selectedEmp != '') {
        if ($scope.entity.selectedEmp.value !== undefined && $scope.entity.selectedEmp.value != '') {
          if ($scope.entity.LEDDate !== undefined && $scope.entity.LEDDate != '') {

            // monthDays = moment($scope.entity.LEDDate).daysInMonth();
            monthDays = 30

            $scope.showOnClick = true;
            var searchLists = [];
            var searchListData = { field: 'EmpId', operand: '=', value: $scope.entity.selectedEmp.value }
            searchLists.push(searchListData)
            var searchListData = { field: 'FullandFinalDate', operand: '=', value: $scope.entity.LEDDate }
            searchLists.push(searchListData)
            var data = {
              searchList: searchLists,
              orderByList: []
            }
            pageService.getCustomQuery(data, vm.queryId).then(_getEmployeeFullAndFinalResult, _getEmployeeFullAndFinalErrorResult)
          }
          else {
            $scope.showMsg("warning", "Please Select Date")
          }
        }
        else {
          $scope.showMsg("warning", "Please Select Employee")
        }
      }
      else {
        $scope.showMsg("warning", "Please Select Employee")
      }

    }

    function _getEmployeeFullAndFinalResult(result) {
      console.log(result);
      console.log(result[0][0].EmpId);
      var totalHeadAmountRate = 0;

      $scope.entity.FAFDPresentDays = result[0][0].CurrentMonthPresentDay
      $scope.entity.LEDCurrentYearEL = result[0][0].ELCurrent
      $scope.entity.LEDELOpeninig = result[0][0].ELOpen
      $scope.entity.LEDELTaken = result[0][0].ELTaken
      $scope.entity.LEDELEncashable = result[0][0].ENcashmentEL
      $scope.entity.LEDELBalance = result[0][0].ELTaken
      $scope.entity.LEDPayDays = result[0][0].YearJoin

      angular.forEach(result[1], function (value, key) {
        if (value.SHIsGross == 1) {
          $scope.entity.FFDTZGross = value.SalAmount;
          grossSalary = parseFloat($scope.entity.FFDTZGross);
        }


        totalHeadAmountRate += parseFloat(value.SalAmount);
        console.log(totalHeadAmountRate);
        console.log(value.SalAmount)
        console.log(key)
        console.log(value)
      });

      encashLeaveMaxAllow = result[2][0].LRCEncashableDaysAllowed;
      console.log(encashLeaveMaxAllow);



    }

    function _getEmployeeFullAndFinalErrorResult(error) {
      console.log(error);
    }

    function _saveForm() {
      if ($scope.entity.LEDEncashAmount !== undefined && $scope.entity.LEDEncashAmount != '' && $scope.entity.LEDEncashAmount != null) {
        if ($scope.entity.LEDEncashAmount > 0) {
          if ($scope.showStatus) {
            if (!_validateSanctionForm()) {
              $scope.entity.LEDEmpId = $scope.entity.selectedEmp.value;
              editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
                $scope.entity.LEDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
                .then(_saveFormSuccessResult, _saveFormErrorResult)
            }
          }
          else {
            $scope.entity.LEDEmpId = $scope.entity.selectedEmp.value;
            $scope.entity.StatusId = 0
            editFormService.saveForm(vm.pageId, $scope.entity, vm.oldEntity,
              $scope.entity.LEDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, $scope.editForm, true)
              .then(_saveFormSuccessResult, _saveFormErrorResult)
          }
        }
        else {
          $scope.showMsg("warning", "total earning amount should be more than 0");
        }
      }
      else {
        $scope.showMsg("warning", "total earning amount should be more than 0");
      }

    }

    function _saveFormSuccessResult(result) {

      console.log(result);
      $scope.showEditForm = true;
      $scope.showOnClick = false;
      $scope.page.refreshData();
    }

    function _saveFormErrorResult(error) {
      console.log(error);
      $scope.showOnClick = false;
    }

    function _maxApplyEl() {
      var ELEDTotalEncashableLeave = parseFloat($scope.entity.LEDTotalEncashableLeave);
      if (isNaN(ELEDTotalEncashableLeave))
        ELEDTotalEncashableLeave = 0;


      if (ELEDTotalEncashableLeave <= encashLeaveMaxAllow) {
        if ($scope.entity.LEDELEncashable >= ELEDTotalEncashableLeave) {
          $scope.entity.LEDTotalEncashableLeave = ELEDTotalEncashableLeave;
          $scope.entity.LEDEncashAmount = ((grossSalary * ELEDTotalEncashableLeave) / monthDays).toFixed(2);;
        }
        else {
          $scope.entity.LEDTotalEncashableLeave = 0;
          $scope.entity.LEDEncashAmount = 0;
          $scope.showMsg("warning", "total EL balace is " + $scope.entity.LEDELEncashable);
        }
      }
      else {
        $scope.entity.LEDTotalEncashableLeave = 0;
        $scope.entity.LEDEncashAmount = 0;
        $scope.showMsg("warning", "total encashable EL should less than max balance " + encashLeaveMaxAllow);
        // ELEDTotalEncashableLeave = 0;
      }
    }

    function _viewRecord(row) {
      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');



        if (!$scope.status.isApproved) {
          if (!$scope.status.isRejected) {
            if (!$scope.status.isOnHold) {
              // $scope.entity = angular.copy(row.entity);
              // $scope.showEditForm = true;
              // $scope.showSanctionForm = true;
              // $scope.showForm = false;
              // $scope.entity = row.entity

            }
            else {
              $scope.showMsg("error", "Your application has been onhold")
            }
          }
          else {
            $scope.showMsg("error", "Your application has been rejected")
          }
        }
        else {
          $scope.showMsg("error", "Your application has been sanctioned")
        }
      }
    }

    function _lEVerify(row) {
      console.log(row)
      var status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
      console.log(status)
      if (status == null) {
        status = {};
        status.isRejected = false;
        status.isCancelRequest = false;
      }
      if (!status.isRejected) {
        if (!status.isCancelRequest && !status.isCancelApproved && !status.isCancelRejected && !status.isCancelOnHold) {
          $scope.showStatus = true;
          $scope.disabledEmp = true;
          console.log(row)
          $scope.enableShowButton = false;
          $scope.entity = row.entity;
          $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.LEDEmpId, row.entity.LEDEmpId, 'value')
          $scope.entity.SUName = row.entity.selectedEmp.SUName;
          $scope.entity.designName = row.entity.selectedEmp.DesgName;
          $scope.entity.deptName = row.entity.selectedEmp.DeptName;
          console.log($scope.entity.selectedEmp);
          $scope.showEditForm = false;
          $scope.showOnClick = true;
        }
        else {

          // $scope.showStatus = true;
          // $scope.disabledEmp = true;
          // console.log(row)
          // $scope.enableShowButton = false;
          // $scope.entity = row.entity;
          // $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.LEDEmpId, row.entity.LEDEmpId, 'value')
          // $scope.entity.SUName = row.entity.selectedEmp.SUName;
          // $scope.entity.designName = row.entity.selectedEmp.DesgName;
          // $scope.entity.deptName = row.entity.selectedEmp.DeptName;
          // console.log($scope.entity.selectedEmp);
          // $scope.showEditForm = false;
          // $scope.showOnClick = true;

        }
      }
      else {
        $scope.showMsg("error", "You can view this App only")
      }
    }

    function _validateSanctionForm() {
      if ($scope.entity.StatusId == "0" || $scope.entity.StatusId == undefined) {
        $scope.showMsg("error", "Status should be sanctioned/onhold/reject");
        return true;
      }
      if ($scope.entity.LEDComment == undefined || $scope.entity.LEDComment == '' || $scope.entity.LEDComment == null) {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }
      return false;
    }

  }

})();
