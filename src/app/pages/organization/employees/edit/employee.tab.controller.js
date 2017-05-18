

/**
 * @author pradeep.pandip
 * created on 16.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('OrgEmployeeTabController', OrgEmployeeTabController);

  /** @ngInject */
  /** @ngInject */
  function OrgEmployeeTabController($scope, $stateParams, pageService, $timeout, $uibModal, baProgressModal) {


    $scope.familyPage = {}
    $scope.familyPage.gridOptions = $scope.getGridSetting();
     $scope.nomineePage = {}
    $scope.nomineePage.gridOptions = $scope.getGridSetting();
    $scope.gridStyle = { width: 500, height: 450 }
    $scope.boxSetting = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false
    }

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
    vm.empEmgContact = {};
    vm.oldEntity = {};
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

    vm.updateForm = _updateForm;
    vm.jobEmploymentOnChange = _jobEmploymentOnChange;
    vm.accountSalaryModeOnChange = _accountSalaryModeOnChange;
    vm.permanentAddress = _permanentAddress;
    vm.saveContact = _saveContact;



    // Permanent Address Same as Current Address        
    function _permanentAddress() {
      if (vm.CDPermanent) {
        vm.empContactDetail.CDPAddLine1 = vm.empContactDetail.CDAddLine1;
        vm.empContactDetail.CDPAddLine2 = vm.empContactDetail.CDAddLine2;
        vm.empContactDetail.CDPPincode = vm.empContactDetail.CDPincode;
        vm.empContactDetail.PCountryId = vm.empContactDetail.CountryId
        vm.empContactDetail.PStateId = vm.empContactDetail.StateId
        vm.empContactDetail.PCityId = vm.empContactDetail.CityId
      }
      else {
        vm.empContactDetail.CDPAddLine1 = '';
        vm.empContactDetail.CDPAddLine2 = '';
        vm.empContactDetail.CDPPincode = '';
        vm.empContactDetail.PCountryId = '';
        vm.empContactDetail.PStateId = '';
        vm.empContactDetail.PCityId = '';
      }
    }
    function _getDate(date) {
      var mmddyyyy = "";
      var date = new Date(date);
      var month = date.getMonth() + 1;
      mmddyyyy = month + "/" + date.getDate() + "/" + date.getFullYear();

      return mmddyyyy;
    }


    function _loadController() {

      vm.templateUrlPath = "app/pages/organization/employees/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
      _getTableId();
      //for according to tab click
      $timeout(function () {
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
      //for emgcontact detail
      $timeout(function () {
        var searchList = [];
        var searchFields = {
          field: 'ECEmpId',
          operand: '=',
          value: vm.empPKId
        }
        searchList.push(searchFields);

        pageService.findEntity(57, undefined, searchList).then(
          _findEMGContactEntitySuccessResult, _findEMGContactEntityErrorResult);
      });
      //for family detail
      $timeout(function () {
        pageService.getPagData(52).then(
          _getfamilyDetailSuccessResult, _getfamilyDetailErrorResult);
      });
      //for nominee detail
      $timeout(function () {
        pageService.getPagData(438).then(
          _getNomineeDetailSuccessResult, _getNomineeDetailErrorResult);
      });
      //for contact detail
      $timeout(function () {
        pageService.getPagData(36).then(
          _getcontactSuccessResult, _getcontactErrorResult);
      });
    }
    function _getNomineeDetailSuccessResult(result) {
      console.log(result)
     $scope.nomineePage = angular.extend($scope.nomineePage, result);
      // $scope.setPage($scope.page)
      console.log($scope.nomineePage);
      $scope.nomineePage.gridOptions = $scope.gridSetupColumns($scope.nomineePage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _getTableData1();
    }
    function _getNomineeDetailErrorResult(error) {
      alert(JSON.stringify(error))
    }
    function _findEMGContactEntitySuccessResult(result) {

      vm.oldEntity = result;
      vm.empEmgContact = result;
    }
    function _findEMGContactEntityErrorResult() {

    }
    function _getcontactSuccessResult(result) {
      console.log(result)
      vm.CountryId = result.pageinfo.selects.CountryId;
      vm.StateId = result.pageinfo.selects.StateId;
      vm.CityId = result.pageinfo.selects.CityId;
      vm.AreaId = result.pageinfo.selects.CDAreaId;
      var searchList = [];
      var searchFields = {
        field: 'CDEmpId',
        operand: '=',
        value: vm.empPKId
      }
      searchList.push(searchFields);
      $timeout(function () {
        pageService.findEntity(45, undefined, searchList).then(
          _findContactEntitySuccessResult, _findContactEntityErrorResult);
      })

    }

    function _getcontactErrorResult(error) {

    }
    function _findContactEntitySuccessResult(result) {
      console.log(result)
      vm.oldEntity = result;
      vm.empContactDetail = result;

    }
    function _findContactEntityErrorResult(result) {

    }
    function _getfamilyDetailSuccessResult(result) {
      console.log(result)
      $scope.familyPage = angular.extend($scope.familyPage, result);
      // $scope.setPage($scope.page)
      console.log($scope.familyPage);
      $scope.familyPage.gridOptions = $scope.gridSetupColumns($scope.familyPage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _getTableData();
    }
    function _getfamilyDetailErrorResult(err) {
      console.log(err)
    }
    function _getPageDataSuccessResult(result) {
      console.log(result)
      var field = "";
      if (vm.tempName == 'personal') {
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

      }
      else if (vm.tempName == 'sign') {
        vm.signatureType = result.pageinfo.selects.SGSTId;
        field = 'SDEmpId';

      }
      else if (vm.tempName == 'account') {
        console.log(result)
        vm.salaryMode = result.pageinfo.selects.ADSalaryModeId;
        vm.salary = result.pageinfo.selects.ADSalaryID;
        vm.bankName = result.pageinfo.selects.BankId;
        field = 'ADEmpId';

      }
      _findEntity(field);

    }

    function _getPageDataErrorResult(error) {

    }
    function _findEntity(field) {
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
    function _findEntitySuccessResult(result) {
      if (vm.tempName == 'basic') {
        vm.empBasicDetail = result;
      }
      else if (vm.tempName == 'personal') {
        vm.oldEntity = result;
        // var dob=new Date(result.PdDateOfBirth)
        // var anniversary=new Date(result.PDAnniversaryDate)
        // $scope.formatdob = $scope.formats[0];
        // $scope.formatanniversary = $scope.formats[0];
        // result.PdDateOfBirth=dob;
        // result.PDAnniversaryDate=anniversary;
        vm.empPersonalDetail = result;
      }
      else if (vm.tempName == 'contact') {
        vm.empContactDetail = result;
      }
      else if (vm.tempName == 'job') {
        if (result.JDEmploymentId == 3) {
          vm.contractBase = true;
        }
        else {
          vm.contractBase = false;
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

      vm.templateUrlPath = "app/pages/organization/employees/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;
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

    function _saveContact() {
      vm.pageId = 36;
      var Address = {
        CDId: vm.empContactDetail.CDAddLine1 == undefined ? undefined : vm.empContactDetail.CDId,
        CDEmpId: vm.empPKId,
        CDAddLine1: vm.empContactDetail.CDAddLine1,
        CDAddLine2: vm.empContactDetail.CDAddLine2,
        CDPincode: vm.empContactDetail.CDPincode,
        CDPAddLine1: vm.empContactDetail.CDPAddLine1,
        CDPAddLine2: vm.empContactDetail.CDPAddLine2,
        CDPPincode: vm.empContactDetail.CDPPincode,
        CountryId: vm.empContactDetail.CountryId,
        StateId: vm.empContactDetail.StateId,
        CityId: vm.empContactDetail.CityId,
        PCountryId: vm.empContactDetail.PCountryId,
        PStateId: vm.empContactDetail.PStateId,
        PCityId: vm.empContactDetail.PCityId,
        CDAreaId: 2
      }
      alert(JSON.stringify(Address))
      if (vm.empContactDetail.CDId == undefined) {
        vm.tempName1 = "address"
        _editPage(Address, 'create');
      }
      else {
        vm.tempName1 = "address"
        _editPage(Address, 'edit');
      }
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
          PdDateOfBirth: _getDate(vm.empPersonalDetail.PdDateOfBirth),
          PdNickName: vm.empPersonalDetail.PdNickName,
          PDAnniversaryDate: _getDate(vm.empPersonalDetail.PDAnniversaryDate),
          PDFacebook: vm.empPersonalDetail.PDFacebook,
          PDTwitter: vm.empPersonalDetail.PDTwitter,
          PDLinkedIn: vm.empPersonalDetail.PDLinkedIn,
          PDAdhar: vm.empPersonalDetail.PDAdhar,
          PDPanCard: vm.empPersonalDetail.PDPanCard,
          PDOtherNumber: vm.empPersonalDetail.PDOtherNumber,
        }
        _editPage(personal, 'edit');

        var emgContact = {
          ECID: vm.empEmgContact.ECID == undefined ? undefined : vm.empEmgContact.ECID,
          ECEmpId: vm.empPKId,
          ECPersonName: vm.empEmgContact.ECPersonName,
          ECContactNo: vm.empEmgContact.ECContactNo,
          ECAddress: vm.empEmgContact.ECAddress,
        }

        if (vm.empEmgContact.ECID == undefined) {
          vm.tempName1 = "emgcontact"
          vm.pageId = 53;
          _editPage(emgContact, 'create');
        }
        else {
          vm.tempName1 = "emgcontact"
          vm.pageId = 53;
          _editPage(emgContact, 'edit');
        }

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

          if (vm.empAccountDetail.ADId == undefined) {
            _editPage(account, 'create');
          }
          else {

            _editPage(account, 'edit');
          }
        }

      }
    }
    function _setupSaving(dataObject, action) {
      var data = {
        oldEntity: vm.oldEntity == undefined ? dataObject : vm.oldEntity,
        newEntity: dataObject,
        pageCode: vm.pageId,
        activity: action
      }
      return data;
    }
    function _editPage(objectData, action) {

      var savingObj = _setupSaving(objectData, action);
      pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_updateSuccessResult, _updateErrorResult)
    }
    var count = 1;
    function _updateSuccessResult(result) {
      if (vm.tempName == "personal" && vm.tempName1 == "emgcontact") {
        if (count == 2) {
          $scope.showMsg('success', 'Record Saved Successfully');
          count = 1;
        }
        else {
          count++;
        }
      }
      else {
        $scope.showMsg('success', 'Record Saved Successfully');
      }

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

    function _temaplateURL(tempName, action) {
      vm.templateUrlPath = "app/pages/organization/employees/templates/" + tempName + "/" + tempName + "-" + action + ".html?" + rndValu2 + "=" + rndValu;
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

    $scope.addNominee = function (page, size) {
      var param = { NDId: "", Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: 'addEmployeeNomineeDetails',
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
        value: vm.empPKId
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
        $scope.familyPage.gridOptions.data = result;


      }
    }

    function _getTableData1() {
      var search = [];
      var searchFields = {
        field: "NDEmpId",
        operand: "=",
        value: vm.empPKId
      }
      search.push(searchFields);
      var data = {
        searchList: search,
        orderByList: []
      }
      var tableData = pageService.getTableData(
        113,
        438,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getTableSuccessResult1, _getTableErrorResult1)
    }

    function _getTableErrorResult1(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getTableSuccessResult1(result) {
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
       $scope.nomineePage.gridOptions.data = result;


      }
    }
    _loadController();

  }
})();
