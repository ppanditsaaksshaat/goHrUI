

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employee')
    .controller('OrgEmployeeTabController', OrgEmployeeTabController);

  /** @ngInject */
  /** @ngInject */
  function OrgEmployeeTabController($scope, $stateParams, mailMessages, addModal, pageService, editableOptions,
    editableThemes, $timeout, $uibModal, baProgressModal) {

    var vm = this;
    vm.navigationCollapsed = true;
    vm.pageId = $stateParams.pageId;
    vm.empPKId = $stateParams.empId;
    vm.tempName = $stateParams.name;
    vm.tableId = 0;
    vm.empBasicDetail = {};
    vm.empPersonalDetail = {};
    vm.empContactDetail = {};
    vm.empJobDetail = {};
    vm.empResignDetail = {};
    vm.empSignDetail = {};
    vm.empAccountDetail = {};
    vm.oldEntity = {};
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

    vm.updateForm = _updateForm;
    vm.jobEmploymentOnChange = _jobEmploymentOnChange;
    vm.accountSalaryModeOnChange = _accountSalaryModeOnChange;


    function _loadController() {

      vm.templateUrlPath = "app/pages/organization/employee/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
      _getTableId();
      $timeout(function () {
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
      $timeout(function () {
        pageService.getPagData(52).then(
          _getfamilyDetailSuccessResult, _getfamilyDetailErrorResult);
      });
    }
    function _getfamilyDetailSuccessResult(result) {
      console.log(result)
      $scope.page = result;
      $scope.setPage($scope.page)
      $scope.setGrid(
        {
          columns: ['FdName', 'FdDateOfBirth'],//list of columns
          enableTitleFilter: true,//show title filter
          enableGlobalFilter: true,//show global filter
          enbleColumnFilter: false,//show each column filter
          enableSrNo: true,//show serial no column
          enableAction: true,//show action column
          enablePagination: true,//enable pagination
          paginationLength: 10,//length of rows per page,
          pageId: 52  //page id for which grid to be design
        }
      )
      console.log($scope.gridObject)

      _getTableData();
    }
    function _getfamilyDetailErrorResult(error) {
      alert(error);
    }
    function _getPageDataSuccessResult(result) {
      console.log(result)
      var field = "";
      if (vm.tempName == 'basic') {
        pageService.findEntity(vm.tableId, parseInt(vm.empPKId), undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      }
      else if (vm.tempName == 'personal') {
        vm.gender = result.pageinfo.selects.PdGenderId;
        vm.maritalStatus = result.pageinfo.selects.PdMaritalId;
        vm.nationality = result.pageinfo.selects.PdNationalityId;
        field = 'PdEmpId';
      }
      else if (vm.tempName == 'contact') {
        vm.country = result.pageinfo.selects.CountryId;
        vm.state = result.pageinfo.selects.StateId;
        vm.city = result.pageinfo.selects.CityId;
        vm.area = result.pageinfo.selects.CDAreaId;
        field = 'CDEmpId';
      }
      else if (vm.tempName == 'job') {
        vm.grade = result.pageinfo.selects.JDEmpGradeId;
        vm.level = result.pageinfo.selects.JDEmpLevelId;
        vm.location = result.pageinfo.selects.LocationId;
        vm.branch = result.pageinfo.selects.BRId;
        vm.subUnit = result.pageinfo.selects.JDSubUnitID;
        vm.department = result.pageinfo.selects.JDDeptId;
        vm.designation = result.pageinfo.selects.JDDesgId;
        vm.employeeType = result.pageinfo.selects.JDEmploymentId;
        vm.employee = result.pageinfo.selects.JDEmpId;

        field = 'JDEmpId';
      }
      else if (vm.tempName == 'resign') {
        vm.leavingType = result.pageinfo.selects.RDLeavingTypeId;
        field = 'RDEmpId';
        _findEntity(field);
      }
      else if (vm.tempName == 'sign') {
        vm.signatureType = result.pageinfo.selects.SGSTId;
        field = 'SDEmpId';
        _findEntity(field);
      }
      else if (vm.tempName == 'account') {
        console.log(result)
        vm.salaryMode = result.pageinfo.selects.ADSalaryModeId;
        vm.salary = result.pageinfo.selects.ADSalaryID;
        vm.bankName = result.pageinfo.selects.BankId;
        field = 'ADEmpId';
        _findEntity(field);
      }
      if (vm.tempName != 'basic') {
        var searchList = [];
        var searchFields = {
          field: field,
          operand: '=',
          value: vm.empPKId
        }
        searchList.push(searchFields);

        pageService.findEntity(vm.tableId, undefined, searchList).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      }

    }
    function _findEntity(field) {

    }
    // function _getTableData(field){

    // }
    function _getPageDataErrorResult(error) {

    }
    function _findEntitySuccessResult(result) {
      if (vm.tempName == 'basic') {
        vm.empBasicDetail = result;
      }
      else if (vm.tempName == 'personal') {
        vm.oldEntity = result;
        vm.empPersonalDetail = result;
      }
      else if (vm.tempName == 'contact') {
        vm.empContactDetail = result;
      }
      else if (vm.tempName == 'job') {
        if (result.JDEmploymentId == 3) {
          vm.contractBase = true;
        }
        console.log(result);
        vm.oldEntity = result;
        vm.empJobDetail = result;
      }
      else if (vm.tempName == 'resign') {
        console.log(result);
        vm.empResignDetail = result;
      }
      else if (vm.tempName == 'sign') {
        console.log(result);
        vm.empSignDetail = result;
      }
      else if (vm.tempName == 'account') {
        console.log(result);
        vm.oldEntity = result;
        vm.empAccountDetail = result;
        if (result.ADSalaryModeId == 3)
          vm.bankDetail = true;
        else
          vm.bankDetail = false;

      }

      vm.templateUrlPath = "app/pages/organization/employee/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
    }
    function _findEntityErrorResult(error) {

    }
    function _getTableId() {
      if (vm.tempName == 'basic') {
        vm.tableId = 30;
      }
      if (vm.tempName == 'personal') {
        vm.tableId = 43;
      }
      if (vm.tempName == 'contact') {
        vm.tableId = 45;
      }
      if (vm.tempName == 'job') {
        vm.tableId = 121;
      }
      if (vm.tempName == 'resign') {
        vm.tableId = 346;
      }
      if (vm.tempName == 'sign') {
        vm.tableId = 202;
      }
      if (vm.tempName == 'account') {
        vm.tableId = 131;
      }
      if (vm.tempName == 'workexperience') {
        vm.tableId = 62;
      }

    }
    function _setupSaving(dataObject, action) {
      var data = {
        oldEntity: vm.oldEntity,
        newEntity: dataObject,
        pageCode: vm.pageId,
        activity: action
      }
      alert(JSON.stringify(data))
      return data;
    }
    function _updateForm() {

      if (vm.tempName == 'job') {
        var job = {
          JDEmpId: vm.empPKId,
          JDId: vm.empJobDetail.JDId,
          JDDate: vm.empJobDetail.JDDate,
          JDDeptId: vm.empJobDetail.JDDeptId,
          JDDesgId: vm.empJobDetail.JDDesgId,
          JDEmploymentId: vm.empJobDetail.JDEmploymentId,
          JDEmpGradeId: vm.empJobDetail.JDEmpGradeId,
          JDEmpLevelId: vm.empJobDetail.JDEmpLevelId,
          JDIsOT: vm.empJobDetail.JDIsOT,
          SingleOT: vm.empJobDetail.SingleOT,
          JDDoubleOT: vm.empJobDetail.JDDoubleOT,
          JDSingleOTRate: vm.empJobDetail.JDSingleOTRate,
          DoubleOTRate: vm.empJobDetail.DoubleOTRate
        }

        _editPage(job, 'edit');
      }
      if (vm.tempName == 'personal') {
        var personal = {
          PdEmpId: vm.empPKId,
          PdId: vm.empPersonalDetail.PdId,
          PdEmail: vm.empPersonalDetail.PdEmail,
          PdMobileNo: vm.empPersonalDetail.PdMobileNo,
          PdGenderId: vm.empPersonalDetail.PdGenderId,
          PdMaritalId: vm.empPersonalDetail.PdMaritalId,
          PdNationalityId: vm.empPersonalDetail.PdNationalityId,
          PdDateOfBirth: vm.empPersonalDetail.PdDateOfBirth,
          PdNickName: vm.empPersonalDetail.PdNickName
        }
        _editPage(personal, 'edit');
      }
      if (vm.tempName == 'account') {
        if (vm.bankDetail == false) {
          var account = {
            ADId: vm.empAccountDetail.ADId == undefined ? undefined : vm.empAccountDetail.ADId,
            ADEmpId: vm.empPKId,
            ADSalaryModeId: vm.empAccountDetail.ADSalaryModeId
          }
          if (vm.empAccountDetail.ADId == undefined) {
            _editPage(account, 'create');
          }
          else {
            _editPage(account, 'edit');
          }
        }
        else {
          var account = {
            ADId: vm.empAccountDetail.ADId == undefined ? undefined : vm.empAccountDetail.ADId,
            ADEmpId: vm.empPKId,
            ADSalaryModeId: vm.empAccountDetail.ADSalaryModeId,
            BankId: vm.empAccountDetail.BankId,
            BankAccountNo: vm.empAccountDetail.BankAccountNo,
            PFPPFMemberDate: vm.empAccountDetail.PFPPFMemberDate,
            PFPPFAccountNo: vm.empAccountDetail.PFPPFAccountNo,
            ESIMemeberDate: vm.empAccountDetail.ESIMemeberDate,
            ESIMemeberNo: vm.empAccountDetail.ESIMemeberNo,
            PFPPFIsActive: vm.empAccountDetail.PFPPFIsActive,
            ESIIsActive: vm.empAccountDetail.ESIIsActive,
            ADBranchName: vm.empAccountDetail.ADBranchName,
            ADIFSCCode: vm.empAccountDetail.ADIFSCCode,
            ADChequeNo: vm.empAccountDetail.ADChequeNo,
            ADSalaryID: vm.empAccountDetail.ADSalaryID
          }
          alert(JSON.stringify(account))
          if (vm.empAccountDetail.ADId == undefined) {
            _editPage(account, 'create');
          }
          else {

            _editPage(account, 'edit');
          }
        }

        // var account = {
        //   PdEmpId: vm.empPKId,
        //   PdId: vm.empPersonalDetail.PdId,
        //   PdEmail: vm.empPersonalDetail.PdEmail,
        //   PdMobileNo: vm.empPersonalDetail.PdMobileNo,
        //   PdGenderId: vm.empPersonalDetail.PdGenderId,
        //   PdMaritalId: vm.empPersonalDetail.PdMaritalId,
        //   PdNationalityId: vm.empPersonalDetail.PdNationalityId,
        //   PdDateOfBirth: vm.empPersonalDetail.PdDateOfBirth,
        //   PdNickName: vm.empPersonalDetail.PdNickName
        // }
        //  _editPage(account);
      }
    }

    function _editPage(objectData, action) {
      alert(JSON.stringify(objectData))
      var savingObj = _setupSaving(objectData, action);
      pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_updateSuccessResult, _updateErrorResult)
    }
    function _updateSuccessResult(result) {
      //   alert(JSON.stringify(result))
      $scope.showMsg('success', 'Employee Updated Successfully');

    }
    function _updateErrorResult(error) {
      alert(JSON.stringify(error))
    }

    function _jobEmploymentOnChange(value) {
      if (value == 3) {
        vm.contractBase = true;
      }
      else {
        vm.contractBase = false;
      }
    }
    function _accountSalaryModeOnChange(value) {
      if (value == 3) {
        vm.bankDetail = true;
      }
      else {
        vm.bankDetail = false;
      }
    }

    // $scope.addFamily = function () {
    //   alert("hi")
    // }

    function _temaplateURL(tempName, action) {
      vm.templateUrlPath = "app/pages/organization/employee/templates/" + tempName + "/" + tempName + "-" + action + ".html?" + rndValu2 + "=" + rndValu;
    }

    $scope.addFamily = function (page, size) {
      var param = { FdId: "", Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: 'addEmployeeFamilyDetails',
        size: size,
        resolve: {
          param: function () {
            return param;
          }
        }
      });
    };

    $scope.editFamily = function (page, size, FdId, action) {
      var param = { FdId: FdId, Action: action }
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: 'addEmployeeFamilyDetails',
        size: size,
        resolve: {
          param: function () {
            return param;
          }
        }
      });
    };
    $scope.openProgressDialog = baProgressModal.open;

    function _getTableData() {
      var search = [];
      var searchFields = {
        field: "FdEmpId",
        operand: "=",
        value: 85
      }
      search.push(searchFields);
      var data = {
        searchList: search,
        orderByList: []
      }
      var tableData = pageService.getTableData(
        56,
        52,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getTableSuccessResult, _getTableErrorResult)
    }
    function _getTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getTableSuccessResult(result) {
      $scope.isLoaded = true
      $scope.isLoading = false
      if (result == 'NoDataFound') {
        // uivm.showMsg('warning', 'No Record Found.');
      } else if (result.Errors !== undefined) {
        // uivm.showMsg('error', result.Message);
        // _startMsgTimer();
      }
      else {
        console.log(result)
        //  $scope.table.rows = result;
        $scope.rows = result;


      }
    }


    _loadController();

  }
})();
