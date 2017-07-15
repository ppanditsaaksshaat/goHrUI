/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.transaction.employeeleaveapplication')
    .controller('EmpLeaveAppController', EmpLeaveAppController);

  /** @ngInject */
  function EmpLeaveAppController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr, $filter, $timeout) {

    $scope.fromSlider = {
      minValue: 1,
      maxValue: 3,
      options: {
        floor: 1,
        ceil: 3,
        step: 1,
        minRange: 1,
        maxRange: 3,
        pushRange: true,
        showTicks: true,
        translate: function (value, sliderId, label) {
          if (label == 'high') {
            var labelText = '';
            if ($scope.fromSlider.minValue == 1 && $scope.fromSlider.maxValue == 2) {
              $scope.entity.LEADFromHalfDayId = 0;
              labelText = 'First Half'
            } else if ($scope.fromSlider.minValue == 2 && $scope.fromSlider.maxValue == 3) {
              $scope.entity.LEADFromHalfDayId = 1;
              labelText = 'Second Half'
            }
            else if ($scope.fromSlider.minValue == 1 && $scope.fromSlider.maxValue == 3) {
              $scope.entity.LEADFromHalfDayId = 2;
              labelText = 'Full day';
            }
            _appliedDays();
            return labelText;

          }
          else {
            return '';
          }
        }
      }
    };
    $scope.toSlider = {
      minValue: 1,
      maxValue: 3,
      options: {
        floor: 1,
        ceil: 3,
        step: 1,
        minRange: 1,
        maxRange: 3,
        pushRange: true,
        showTicks: true,
        translate: function (value, sliderId, label) {
          if (label == 'high') {
            var labelText = '';
            if ($scope.toSlider.minValue == 1 && $scope.toSlider.maxValue == 2) {
              $scope.entity.LEADToHalfDayId = 0;
              labelText = 'First Half'
            } else if ($scope.toSlider.minValue == 2 && $scope.toSlider.maxValue == 3) {
              $scope.entity.LEADToHalfDayId = 1;
              labelText = 'Second Half'
            }
            else if ($scope.toSlider.minValue == 1 && $scope.toSlider.maxValue == 3) {
              $scope.entity.LEADToHalfDayId = 2;
              labelText = 'Full day';
            }
            _appliedDays();
            return labelText;

          }
          else {
            return '';
          }
        }
      }
    };
    $scope.value = 150;
    $scope.showToSlider = true;
    var vm = this;
    var pageId = 157;
    var queryId = 530;
    var sanctionLeavePageId = 285;
    var sanctinLeaveTableId = 295;
    var leaveControlTableId = 273;
    var leaveControlPageId = 261;
    var cancelRequestPageId = 453;
    var cancelRequestTableId = 433;
    var currentState = $state.current;



    // this.uploadRecord = _uploadRecord;
    $scope.showLeave = []
    $scope.leaveRuleList = [];
    $scope.leaveDetails = [];
    $scope.entity = { LEADToHalfDayId: 2, LEADFromHalfDayId: 2 }
    $scope.page = $scope.createPage();
    $scope.fetchDetail = _fetchLeaveDetail;
    $scope.appliedDays = _appliedDays;
    $scope.getTotal = _getTotal;
    $scope.onLeaveChange = _onLeaveChange;
    $scope.getOptions = _getOptions;
    $scope.calculateDays = _calculateDays;
    $scope.onLeaveDrChange = _onLeaveDrChange;
    $scope.onHalfDayChange = _onHalfDayChange;
    $scope.onConditionalLeaveTypeChange = _onConditionalLeaveTypeChange;
    $scope.onConditionalCheckbox = _onConditionalCheckbox;
    $scope.closeForm = _closeForm;
    $scope.leaveSanction = _leaveSanction;
    $scope.closeSanction = _closeSanction;
    $scope.deleteForm = _deleteForm;
    $scope.closeViewSanctionForm = _closeViewSanctionForm;
    $scope.cancelRequest = _cancelRequest;
    // $scope.getLeaveTypeAccordingLeaveControl = _getLeaveTypeAccordingLeaveControl;

    console.log($scope.page)
    // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
    // console.log($scope.selectEmployeeData)
    $scope.page.pageId = 157;

    $scope.saveForm = _saveForm;
    // $scope.approvedLeave = _approvedLeave;
    // $scope.employeeOnChange = _employeeOnChange;
    $scope.oldEntity = {};
    var leaveTableId = 163;

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
      gridHeight: 450,
      getPageData: null,
      refreshData: null,
      addRecord: _addRecord,
      editRecord: _editRecord,
      updateRecord: null,
      viewRecord: _viewRecord,
      deleteRecord: _deleteForm,
      customColumns: [{ text: 'Verify', type: 'a', name: 'Option', click: _leaveVerify, pin: true }]
    }

    function _leaveVerify(row) {
      console.log($scope.entity)
      console.log(row)
      $scope.leaveDetails = [];
      $scope.entity = [];
      $scope.showSanctionForm = true;
      //Get page of SanctionLeave 
      pageService.getPagData(sanctionLeavePageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
      var transaction = row.entity.LEADTransation;
      if (transaction != null && transaction != undefined && transaction != '') {
        var rows = transaction.split(',');
        // console.log($scope.page.pageinfo.selects.LEADLTId)
        angular.forEach(rows, function (row) {

          var data = row.split('|');
          if (parseInt(data[0]) != 0) {
            var leaveType = $filter('findObj')($scope.page.pageinfo.selects.LEADLTId, parseInt(data[0]), 'value').name;
            var leaveDetail = {
              type: leaveType == null ? "" : leaveType,
              balance: data[1]
            }
          }
          else {
            var leaveDetail = {
              type: "LWP",
              balance: data[1]
            }
          }
          $scope.leaveDetails.push(leaveDetail)
        })
      }
      else {
        $scope.leaveDetails = undefined;
      }
      if (row.entity.LEADDateFrom != undefined)
        row.entity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
      if (row.entity.LEADDateTo != undefined)
        row.entity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
      if (row.entity.LEADFromHalfDayId != null && row.entity.LEADFromHalfDayId != undefined) {
        if (row.entity.LEADFromHalfDayId == 0) {
          row.entity.fromHalf = 'First Half';
        }
        else if (row.entity.LEADFromHalfDayId == 1) {
          row.entity.fromHalf = 'Second Half';
        }
        else {
          row.entity.fromHalf = '';
        }
      }
      if (row.entity.LEADToHalfDayId != null && row.entity.LEADToHalfDayId != undefined) {
        if (row.entity.LEADToHalfDayId == 0) {
          row.entity.toHalf = 'First Half'
        }
        else if (row.entity.LEADFromHalfDayId == 1) {
          row.entity.toHalf = 'Second Half';
        }
        else {
          row.entity.toHalf = '';
        }
      }
      $scope.entity = row.entity;
    }

    function _getPageDataSuccessResult(result) {

      $scope.sanctionPage = result.pageinfo;
      $scope.entity.ELSDSanctionFromDate = $scope.entity.LEADDateFrom;
      $scope.entity.ELSDSanctionToDate = $scope.entity.LEADDateTo;
      //Get entity of sanctionleave  
      var searchList = [];
      var searchFields = {
        field: 'ELSDELAId',
        operand: '=',
        value: $scope.entity.LEADId
      }
      searchList.push(searchFields);
      pageService.findEntity(sanctinLeaveTableId, undefined, searchList).then(_findEntitySuccessResult, _findEntityErrorResult)
      //End entity of sanctionleave 
      // $scope.entity.StatusId = $scope.sanctionPage.statuslist[0].value;
    }
    function _getPageDataErrorResult(err) {

    }
    function _findEntitySuccessResult(result) {
      $scope.sectionOldEntity = angular.copy(result);
      console.log(result)
      if (result.ELSDId != undefined) {
        $scope.entity.ELSDId = result.ELSDId;
        $scope.entity.ELSDSanctionFromDate = result.ELSDSanctionFromDate;
        $scope.entity.ELSDSanctionToDate = result.ELSDSanctionToDate;
        $scope.entity.ELSDComment = result.ELSDComment;
        $scope.entity.StatusId = parseInt(result.StatusId);
      }
    }
    function _findEntityErrorResult(err) {

    }
    function _validateSanctionForm() {

      if ($scope.entity.ELSDSanctionFromDate == undefined && $scope.entity.ELSDSanctionToDate == null) {
        $scope.showMsg("error", "Please Enter Sanction FromDate");
        return true;
      }
      if ($scope.entity.ELSDSanctionToDate == undefined && $scope.entity.ELSDSanctionToDate == null) {
        $scope.showMsg("error", "Please Enter Sanction ToDate");
        return true;
      }
      if ($scope.entity.StatusId == "0") {
        $scope.showMsg("error", "Please Select Status");
        return true;
      }
      if ($scope.entity.ELSDComment == undefined && $scope.entity.ELSDComment == null) {
        $scope.showMsg("error", "Please Enter Comment");
        return true;
      }

      return false;
    }


    function _leaveSanction() {
      console.log($scope.entity)
      if (!_validateSanctionForm()) {
        var santionLeave = {
          ELSDId: $scope.entity.ELSDId == undefined ? undefined : $scope.entity.ELSDId,
          ELSDELAId: $scope.entity.LEADId,
          ELSDSanctionFromDate: $scope.entity.ELSDSanctionFromDate,
          ELSDSanctionToDate: $scope.entity.ELSDSanctionToDate,
          StatusId: $scope.entity.StatusId,
          ELSDComment: $scope.entity.ELSDComment,
          ELSDSanctionLeaveDate: moment()
        }
        if ($scope.entity.ELSDId == undefined) {
          _formSave(santionLeave, sanctionLeavePageId, 'create', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
        else {
          _formSave(santionLeave, sanctionLeavePageId, 'edit', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
        }
      }
    }
    function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation, title) {

      editFormService.saveForm(pageId, entity, oldEntity,
        action, title, editForm, showConfirmation)
        .then(_saveSuccessResult, _saveErrorResult)
    }

    function _saveSuccessResult(result) {

      if (result.success_message == 'Added New Record.') {
        $scope.showMsg("success", "Record Saved Successfully")
      }
      else {
        $scope.showMsg("success", "Record Saved Successfully")
      }
      $scope.showSanctionForm = false;
      $scope.verifySanctionForm = false;
      $scope.page.refreshData();
    }
    function _saveErrorResult(err) {
      $scope.showMsg("error", err)
    }
    function _closeSanction() {
      $scope.page.refreshData();
      $scope.showSanctionForm = false;
    }

    $scope.$watch('entity.LEADDateFrom', function (newVal, oldVal) {
      if (newVal) {
        if (!$scope.entity.LEADDateTo) {
          $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
          _appliedDays();
        }
        else {
          var daysDiff = _getDateDiff();
          if (daysDiff < 0) {
            $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
            _appliedDays();
          }
        }
      }
    })
    $scope.$watch('entity.LEADDateTo', function (newVal, oldVal) {
      if (newVal) {

        if ($scope.entity.LEADDateFrom) {
          var daysDiff = _getDateDiff();
          if (daysDiff < 0) {
            $scope.showMsg('warning', 'To date can not be less than from date.')
            $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
            _appliedDays();
          }
          else if (daysDiff == 0) {
            $scope.showToSlider = false;
          }
          else {
            $scope.showToSlider = true;
          }
        }
      }
    })

    function _getDateDiff() {
      var fromDate = moment($scope.entity.LEADDateFrom);
      var toDate = moment($scope.entity.LEADDateTo);
      var daysDiff = toDate.diff(fromDate, 'days');
      return daysDiff;
    }
    function _loadController() {
      $scope.disabledEmp = false;
      $scope.entity.LEADFromHalfDayId = 2;
      $scope.entity.LEADToHalfDayId = 2;
    }
    function _appliedDays() {
      var appliedDays = 0;
      var isFromHalfDay = false;
      var isToHalfDay = false;
      if ($scope.entity.LEADDateFrom != undefined && $scope.entity.LEADDateTo != undefined && $scope.entity.LEADFromHalfDayId != undefined && $scope.entity.LEADToHalfDayId != undefined) {

        var fromDate = moment($scope.entity.LEADDateFrom);
        var toDate = moment($scope.entity.LEADDateTo);
        appliedDays = toDate.diff(fromDate, 'days') + 1;
        if ($scope.entity.LEADFromHalfDayId == 0 || $scope.entity.LEADFromHalfDayId == 1) {
          appliedDays = appliedDays - 0.5;
          isFromHalfDay = true;
        }
        else {
          if (isFromHalfDay) {
            appliedDays = appliedDays + 0.5;
            isFromHalfDay = false;
          }
        }
        if ($scope.entity.LEADToHalfDayId == 0 || $scope.entity.LEADToHalfDayId == 1) {
          appliedDays = appliedDays - 0.5;
          isToHalfDay = true;
        }
        else {
          if (isToHalfDay) {
            appliedDays = appliedDays + 0.5;
            isToHalfDay = false;
          }
        }
        vm.appliedDays = appliedDays;
      }

      _calculateDays();
    }
    function _addRecord() {
      $scope.disabledEmp = false;
      $scope.entity = [];
      $scope.showLeave = [];
      vm.validateLeave = false;
      $scope.showSlider = true;
      $scope.isSavingLeave = false;
      $scope.showEditForm = true;
      $scope.isLeaveTransactionTable = false;
      $scope.isLeaveApprovedDet = false;
      $scope.entity = { LEADToHalfDayId: 2, LEADFromHalfDayId: 2 }
    }
    function _editRecord(row) {
      console.log(row)
      if (row.entity.StatusId == 0) {
        $scope.disabledEmp = true;
        $scope.entity = row.entity;
        $scope.showEditForm = true;
        $scope.isSavingLeave = false;
        $scope.page.isAllowEdit = true;
        $scope.entity.LEADDateFrom = moment(row.entity.LEADDateFrom)
        $scope.entity.LEADDateTo = moment(row.entity.LEADDateTo)
        $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.LEADEmpId, row.entity.LEADEmpId, 'value')

        var transation = $scope.entity.LEADTransation.split(',');
        console.log(transation);

        _fetchLeaveDetail();
        vm.validateLeave = true
      }
      else {
        $scope.showMsg("error", "You are not allowed for edit because this leave allowed sanctioned");
      }
    }
    function _closeForm() {
      $scope.showEditForm = false;
      $scope.page.refreshData();
    }
    function _viewRecord(row) {
      console.log(row)
      if (row.entity.StatusId == 0) {
        _editRecord(row);
      }
      else {
        var searchList = [];
        var searchFields = {
          field: 'CREmpId',
          operand: '=',
          value: row.entity.LEADEmpId
        }
        searchList.push(searchFields)

        pageService.findEntity(cancelRequestTableId, undefined, searchList).then(_cancelRequestSuccessResult, _cancelRequestErrorResult)
        $scope.verifySanctionForm = true;
        row.entity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
        row.entity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
        row.entity.ELSDSanctionFromDate = moment(row.entity.ELSDSanctionFromDate).format("DD/MMMM/YYYY");
        row.entity.ELSDSanctionToDate = moment(row.entity.ELSDSanctionToDate).format("DD/MMMM/YYYY");
        $scope.entity = row.entity;
      }

    }
    function _cancelRequestSuccessResult(result) {
      console.log(result)
      $scope.cancelRequestOldEntity = angular.copy(result);
      if (result.CRId != undefined) {
        $scope.entity.CRId = result.CRId;
        $scope.entity.CRComment = result.CRComment;

      }
    }
    function _cancelRequestErrorResult(err) {

    }

    function _closeViewSanctionForm() {
      $scope.verifySanctionForm = false;
      $scope.page.refreshData();
    }
    function _cancelRequest() {
      console.log($scope.entity)
      if ($scope.entity.StatusId != 55) {
        if ($scope.entity.CRComment != undefined) {
          var cancelRequest = {
            CREmpId: $scope.entity.LEADEmpId,
            CRTotalLeave: $scope.entity.TotalLeaveDays123,
            CRLeaveFromDate: $scope.entity.LEADDateFrom,
            CRLeaveToDate: $scope.entity.LEADDateTo,
            CRSactionFromDate: $scope.entity.ELSDSanctionFromDate,
            CRSanctionToDate: $scope.entity.ELSDSanctionToDate,
            CRSanctionBy: $scope.entity.LEADEmpId,
            CRSanctionDate: $scope.entity.CreatedOn,
            CRComment: $scope.entity.CRComment,
            CRLEADId: $scope.entity.LEADId,
            StatusId: 54
          }
          if ($scope.entity.CRId == undefined) {
            _formSave(cancelRequest, cancelRequestPageId, 'create', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, true, 'Cancel Request');
          }
          else {
            _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
          }
        }
        else {
          $scope.showMsg("error", "Please comment before leave cancel");
        }
      }
      else {
        $scope.showMsg("error", "You can not cancel this leave beacause this leave already in cancel process");
      }
    }

    function _fetchLeaveDetail() {

      $scope.entity.LEADEmpId = $scope.entity.selectedEmp.value;

      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      }, 2000);

      $scope.showSlider = true;
      queryId = 530;
      vm.validateLeave = true;
      var searchLists = [];
      var searchListData = {
        field: 'ELTEmpId',
        operand: '=',
        value: $scope.entity.selectedEmp.value
      }
      searchLists.push(searchListData)
      var data = {
        searchList: searchLists,
        orderByList: []
      }
      pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

      _fetchPendingLeave();
    }
    function _calculateDays() {
      if (vm.appliedDays === undefined) {
        return;
      }
      var balLeave = vm.appliedDays;
      //loop on current leave balance 
      var leaveBalList = angular.copy($scope.showLeave);
      angular.forEach(leaveBalList, function (leave, index) {

        leave.leaveDr = 0;
        leave.isDisabled = false;
        var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
        if (leaveRule != null) {
          leave.minDays = leaveRule.LRCDRMinDays;
          leave.maxDays = leaveRule.LRCDrMaxDays;
          leave.isUnpaid = false;
        }
        if (leave.LeaveBalance > 0 && balLeave > 0) {

          if (leaveRule != null) {

            if (vm.appliedDays < leaveRule.LRCDRMinDays) {
              leave.isDisabled = true;
            }
            else if (leaveRule.LRCDRMinDays <= balLeave && leaveRule.LRCDrMaxDays >= balLeave) {
              //check available leave 
              if (leave.LeaveBalance <= balLeave) {
                var halfDay = (leave.LeaveBalance % 1);
                leave.leaveDr = leave.LeaveBalance - halfDay;
                leave.halfDay = halfDay;

                balLeave = balLeave - leave.LeaveBalance;
              }
              else if (leave.LeaveBalance > balLeave) {
                var halfDay = (balLeave % 1);
                leave.leaveDr = balLeave - halfDay;
                leave.halfDay = halfDay;
                balLeave = 0;
              }
            }
            else if (leaveRule.LRCDRMinDays > balLeave) {
              // if (leave.LeaveBalance <= balLeave) {
              //   leave.leaveDr = leave.LeaveBalance;
              //   balLeave = balLeave - leave.LeaveBalance;
              // }
              // else if (leave.LeaveBalance > balLeave) {
              //   leave.leaveDr = balLeave;
              //   balLeave = 0;
              // }
            }
            else if (leaveRule.LRCDrMaxDays < balLeave) {
              if (leave.LeaveBalance <= leaveRule.LRCDrMaxDays) {
                var halfDay = (leave.LeaveBalance % 1);
                leave.leaveDr = leave.LeaveBalance - halfDay;
                leave.halfDay = halfDay;
                balLeave = balLeave - leave.LeaveBalance;
              }
              else if (leave.LeaveBalance > balLeave) {
                var halfDay = (leave.maxDays % 1);
                leave.leaveDr = leave.maxDays - halfDay;
                leave.halfDay = halfDay;
                balLeave = balLeave - leaveRule.LRCDrMaxDays;
              }
            }

            leave.isHalfDay = (leave.halfDay > 0);
          }
        }

        //calculating days for dropdown

        var optList = [];

        if (leave && $scope.leaveRuleList) {

          if (leaveRule !== null) {
            var maxCounter = 0;
            if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
              maxCounter = leave.LeaveBalance;
            }
            else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
              maxCounter = leaveRule.LRCDrMaxDays;
            }

            if (vm.appliedDays < maxCounter) {

              maxCounter = vm.appliedDays
            }

            for (var i = 0; i <= maxCounter; i++) {
              if (i == 0 || i >= leaveRule.LRCDRMinDays) {
                optList.push({ id: i, name: i.toString() + ' Days' })
              }
            }
          }
          else {
            optList.push({ id: 0, name: '0 Day' })
            optList.push({ id: 1, name: '1 Day' })
          }
        }
        leave.days = optList;


      })
      //compairing and updating unpaid leave
      var unpaidLeave = $filter('findObj')(leaveBalList, true, 'isUnpaid')
      var unpaid = { leaveDr: balLeave, LeaveBalance: 0, LTName: 'LWP', isUnpaid: true, halfDay: 0 }
      if (unpaidLeave != null) {
        leaveBalList.splice(leaveBalList.length - 1, 1)
      }

      leaveBalList.push(unpaid);
      $scope.showLeave = angular.copy(leaveBalList);


    }
    function _getCustomQueryErrorResult(err) {
      alert(err)
    }
    function _getCustomQuerySuccessResult(result) {

      queryId = 534;
      $scope.showLeave = result;
      console.log(result)
      if (result != "NoDataFound") {

        var searchLists = [];
        var searchListData = {
          field: 'LRCGroupIds',
          operand: '=',
          value: $scope.entity.selectedEmp.JDGroupId
        }
        searchLists.push(searchListData)
        var data = {
          searchList: searchLists,
          orderByList: []
        }
        pageService.getCustomQuery(data, queryId).then(_getLeaveDebitSuccessResult, _getLeaveCreditErrorResult)
      }
      else {
        vm.validateEmployee = false;
      }
    }
    function _getLeaveDebitSuccessResult(result) {
      // console.log(result)
      // console.log($scope.showLeave)
      if (result != "NoDataFound") {
        var balLeave = vm.appliedDays;
        $scope.leaveRuleList = result;
        _calculateDays();
      }
      else {
        $scope.showMsg('error', 'No Leave Rule Found.')
      }
    }
    function _getLeaveCreditErrorResult(err) {
      alert(JSON.stringify(err));
    }
    function _getTotal(name) {

      var total = 0;
      var i = 0;
      for (i = 0; i < $scope.showLeave.length; i++) {
        var val = parseFloat($scope.showLeave[i][name]);
        if (!isNaN(val))
          total += val;
        if (name == 'leaveDr') {
          var halfDay = parseFloat($scope.showLeave[i]['halfDay']);
          if (!isNaN(halfDay))
            total += halfDay
        }
      }
      return total;
    }
    function _onLeaveChange(leave) {
      console.log(leave)
    }
    function _getOptions(leave) {
      var optList = [];

      if (leave && $scope.leaveRuleList) {

        var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
        if (leaveRule !== null) {
          var maxCounter = 0;
          if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
            maxCounter = leave.LeaveBalance;
          }
          else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
            maxCounter = leaveRule.LRCDrMaxDays;
          }

          if (vm.appliedDays < maxCounter) {

            maxCounter = vm.appliedDays
          }

          for (var i = 0; i <= maxCounter; i++) {
            if (i == 0 || i >= leaveRule.LRCDRMinDays) {
              optList.push({ id: i, name: i.toString() + ' Days' })
            }
          }
        }
        else {
          optList.push({ id: 0, name: '0 Day' })
          optList.push({ id: 1, name: '1 Day' })
        }
      }
      // console.log(optList)
      return optList;
    }
    function _onLeaveDrChange(leave, oldDays) {
      var unpaidLeave = $filter('findObj')($scope.showLeave, true, 'isUnpaid')

      var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
      if (leave.LeaveBalance <= leave.leaveDr) {
        $scope.showMsg('error', 'No more balance.')
        leave.leaveDr = parseInt(oldDays)
      }
      else if (leaveRule.LRCDrMaxDays < leave.leaveDr) {
        $scope.showMsg('error', 'No more leave allowed in ' + leaveRule.LTName)
        leave.leaveDr = parseInt(oldDays)
      }
      else if (leave.leaveDr < oldDays) {

        if (unpaidLeave != null) {

          var unpaid = { leaveDr: unpaidLeave.leaveDr + (parseInt(oldDays) - leave.leaveDr), LeaveBalance: 0, LTName: 'LWP', isUnpaid: true, halfDay: 0 }

          $scope.showLeave.splice($scope.showLeave.length - 1, 1)
        }

        $scope.showLeave.push(unpaid);
      }
      else {
        var difLeave = leave.leaveDr - parseInt(oldDays);

        if (unpaidLeave.leaveDr < difLeave) {
          $scope.showMsg('warning', 'First, reduce days in any leave type')
          leave.leaveDr = parseInt(oldDays);
        }
        else {
          var unpaid = { leaveDr: unpaidLeave.leaveDr - difLeave, LeaveBalance: 0, LTName: 'LWP', isUnpaid: true, halfDay: 0 }
          $scope.showLeave.splice($scope.showLeave.length - 1, 1)
          $scope.showLeave.push(unpaid);
        }
      }

    }

    function _onHalfDayChange(leave, oldIsHalfDay) {

      var unpaidLeave = $filter('findObj')($scope.showLeave, true, 'isUnpaid')
      if (leave.isHalfDay) {

        var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
        if (leave.LeaveBalance <= leave.leaveDr) {
          $scope.showMsg('error', 'No more balance.')
          leave.isHalfDay = false;
        }
        else if (leaveRule.LRCDrMaxDays <= leave.leaveDr) {
          $scope.showMsg('error', 'No more leave allowed in ' + leaveRule.LTName)
          leave.isHalfDay = false;
        }
        else if (unpaidLeave.leaveDr >= 0.5) {
          leave.halfDay = .5;

          var unpaid = { leaveDr: unpaidLeave.leaveDr - .5, LeaveBalance: 0, LTName: 'LWP', isUnpaid: true, halfDay: 0 }
          $scope.showLeave.splice($scope.showLeave.length - 1, 1)
          $scope.showLeave.push(unpaid);

        }
        else {
          $scope.showMsg('warning', 'Half day not allowed')
          leave.isHalfDay = false;
        }
      }
      else {
        leave.halfDay = 0;
        var unpaid = { leaveDr: unpaidLeave.leaveDr + .5, LeaveBalance: 0, LTName: 'LWP', isUnpaid: true, halfDay: 0 }
        $scope.showLeave.splice($scope.showLeave.length - 1, 1)
        $scope.showLeave.push(unpaid);
      }
    }
    function _onConditionalLeaveTypeChange() {
      var leaveRule = $filter('findObj')($scope.leaveRuleList, $scope.entity.conditinalLeaveTypeId, 'LRCLeaveTypeId')
      console.log(leaveRule)
      if (leaveRule == null) {
        $scope.showMsg('err', 'No leave rule defined.')
      }
      else {

        var leave = {
          leaveDr: 0, LeaveBalance: leaveRule.LRCDrMaxDays, LTName: leaveRule.LTName, isUnpaid: false, halfDay: 0,
          minDays: leaveRule.LRCDRMinDays, maxDays: leaveRule.LRCDrMaxDays, isCondLeave: true, LRCLeaveTypeId: $scope.entity.conditinalLeaveTypeId
        }

        var optList = [];

        if (leave && $scope.leaveRuleList) {

          if (leaveRule !== null) {
            var maxCounter = 0;
            if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
              maxCounter = leave.LeaveBalance;
            }
            else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
              maxCounter = leaveRule.LRCDrMaxDays;
            }

            if (vm.appliedDays < maxCounter) {

              maxCounter = vm.appliedDays
            }

            for (var i = 0; i <= maxCounter; i++) {
              if (i == 0 || i >= leaveRule.LRCDRMinDays) {
                optList.push({ id: i, name: i.toString() + ' Days' })
              }
            }
          }
          else {
            optList.push({ id: 0, name: '0 Day' })
            optList.push({ id: 1, name: '1 Day' })
          }
        }
        leave.days = optList;

        var found = $filter('findObj')($scope.showLeave, true, 'isCondLeave')
        if (found != null) {
          $scope.showLeave.splice(0, 1)
        }

        $scope.showLeave.splice(0, 0, leave)

      }
      _calculateDays();
    }

    function _onConditionalCheckbox() {
      if ($scope.entity.isConditiaonal) {

      }
      else {
        var found = $filter('findObj')($scope.showLeave, true, 'isCondLeave')
        if (found != null) {
          $scope.showLeave.splice(0, 1)
        }
        _calculateDays();
      }
    }
    function _validateForm(form) {

      var valid = editFormService.validateForm(form)
      if (valid) {
        $scope.entity.LEADTransation = ''
        angular.forEach($scope.showLeave, function (leave, idx) {

          if (leave.leaveDr) {
            if (leave.leaveDr > 0 || leave.isHalfDay) {
              if (leave.LTName == "LWP" && leave.leaveDr != 0) {
                leave.LRCLeaveTypeId = 0;
              }
              var strLeave = leave.LRCLeaveTypeId + '|' + leave.leaveDr + ((leave.isHalfDay) ? .5 : '')
              $scope.entity.LEADTransation += strLeave + ',';
            }
          }
        })
        if ($scope.entity.LEADTransation != '') {
          if ($scope.entity.LEADTransation.length > 2)
            $scope.entity.LEADTransation = $scope.entity.LEADTransation.substr(0, $scope.entity.LEADTransation.length - 1)
        }
        console.log($scope.entity)
        var cQueryId = 536;

        var searchList = [];

        searchList.push({
          field: 'empId',
          operand: '=',
          value: $scope.entity.LEADEmpId
        })

        searchList.push({
          field: 'from',
          operand: '<=',
          value: moment($scope.entity.LEADDateFrom).format('YYYY-MM-DD')
        })

        searchList.push({
          field: 'to',
          operand: '>=',
          value: moment($scope.entity.LEADDateTo).format('YYYY-MM-DD')
        })
        var data = {
          searchList: searchList,
          orderByList: []
        }
        console.log(data)
        var tableData = pageService.getCustomQuery(data, cQueryId);
        tableData.then(_getLeaveCountSuccess, _getLeaveCountError)
      }
      return valid;
    }


    function _getLeaveCountSuccess(result) {

      if (result == "NoDataFound") {

        $scope.isSavingLeave = true;
        _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
      }
      else {
        if ($scope.entity.LEADId != undefined) {
          console.log($scope.page.action)
          $scope.isSavingLeave = true;
          _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
        }
        else {
          $scope.showMsg('info', 'You have already applied leave for given date.')
        }

      }
    }
    function _getLeaveCountError(err) {
      console.log(err)
    }
    function _deleteForm(row) {

      _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, 'delete', $scope.page.pageinfo.tagline)
    }
    function _commonSaveForm(pageId, newEntity, oldEntity, action, pageTagLine ) {
      editFormService.saveForm(pageId, newEntity,
        oldEntity, action, pageTagLine)
        .then(_saveFormSuccess, _saveFormError)
    }

    function _fetchPendingLeave() {

      var cQueryId = 536;

      var searchList = [];

      searchList.push({
        field: 'LEADEmpId ',
        operand: '=',
        value: $scope.entity.LEADEmpId
      })

      searchList.push({
        field: 'CreatedOn',
        operand: '>=',
        value: moment().add(-1, 'year').format('YYYY-MM-DD')
      })

      searchList.push({
        field: 'CreatedOn',
        operand: '<=',
        value: moment().format('YYYY-MM-DD')
      })

      searchList.push({
        field: 'IsRejected',
        operand: '<>',
        value: 1
      })

      var data = {
        searchList: searchList,
        orderByList: []
      }

      var tableData = pageService.getTableData($scope.page.pageinfo.tableid,
        $scope.page.pageinfo.pageid,
        '', '',
        false, data);
      tableData.then(_fetchPendingLeaveSuccess, _fetchPendingLeaveError)
    }
    function _fetchPendingLeaveSuccess(result) {
      console.log(result)
      //ADD CONDITION FOR NODATAFOUND
      $scope.prevLeaveList = [];
      angular.forEach(result, function (leave) {
        var prev = {
          status: leave.ApplicationStatus,
          appDate: moment(leave.CreatedOn).format('DD-MMM-YYYY'),
          from: moment(leave.LEADDateFrom).format('DD-MMM-YYYY'),
          to: moment(leave.LEADDateTo).format('DD-MMM-YYYY'),
          days: moment(leave.LEADDateFrom).diff(moment(leave.LEADDateTo), 'days' + 1),
          distribution: leave.transation
        }
        $scope.prevLeaveList.push(prev);

        if (leave.IsPending) {
          var leaveDest = leave.transation.splice(',')
        }
      })


    }
    function _fetchPendingLeaveError(err) {

    }
    function _saveForm(form) {

      if (_validateForm(form)) {

      }
    }
    function _saveFormSuccess(result) {
      $scope.isSavingLeave = false;
      $scope.isLeaveSaved = true;
      $scope.showMsg('success', $scope.page.pageinfo.tagline + " saved successfully.")
      $scope.showEditForm = false;
      $scope.page.refreshData();
    }
    function _saveFormError(err) {
      console.log(err)
      $scope.isSavingLeave = false;
    }

    _loadController();


  }
})();
