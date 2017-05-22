

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
  function OrgEmployeeTabController($scope, $stateParams, pageService, $timeout, $uibModal, baProgressModal, dialogModal) {


    $scope.familyPage = {}
    $scope.familyPage.gridOptions = $scope.getGridSetting();
    $scope.familyPage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      enableAutoRefresh: true,
      refreshData: _refreshDataFamily,
      addRecord: _addRecordFamily,
      editRecord: _editRecordFamily,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }
    //Nominee Page Setting
    $scope.nomineePage = {}
    $scope.nomineePage.gridOptions = $scope.getGridSetting();
    $scope.nomineePage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      refreshData: _refreshDataNominee,
      addRecord: _addRecordNominee,
      editRecord: _editRecordNominee,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }
    //End of Nominee Page Setting
    //Experience Page Setting
    $scope.experiencePage = {}
    $scope.experiencePage.gridOptions = $scope.getGridSetting();
    $scope.experiencePage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      refreshData: _refreshDataExperience,
      addRecord: _addRecordExperience,
      editRecord: _editRecordExperience,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }
    //End of Experience Page Setting

    //Education Page Setting
    $scope.educationPage = {}
    $scope.educationPage.gridOptions = $scope.getGridSetting();
    $scope.educationPage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      refreshData: _refreshDataEducation,
      addRecord: _addRecordEducation,
      editRecord: _editRecordEducation,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }

    //End of Education Page Setting

    //Skill Page Setting

    $scope.skillPage = {}
    $scope.skillPage.gridOptions = $scope.getGridSetting();
    $scope.skillPage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      refreshData: _refreshListData,
      addRecord: _addRecordSkill,
      editRecord: _editRecordSkill,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }
    //End of Skill Page Setting



    //Immigration Page Setting

    $scope.immigrationPage = {}
    $scope.immigrationPage.gridOptions = $scope.getGridSetting();
    $scope.immigrationPage.boxOptions = {
      showRefresh: true,
      showFilter: false,
      showAdd: true,
      showRowMenu: true,
      showCustomView: true,
      showUpload: false,
      refreshData: _refreshListData,
      addRecord: _addRecordImmigration,
      editRecord: _editRecordImmigration,
      updateRecord: null,
      viewRecord: null,
      deleteRecord: null,
      openView: null,
      uploadRecord: null
    }
    //End of Education Page Setting
    var vm = this;

    vm.pageIds = {
      familyPageId: 52, nomineePageId: 438, experiencPageId: 56, contactPageId: 36,
      emgContactPageId: 57, educationPageId: 112
    }
    vm.tableIds = {nomineeTableId:113, experiencTableId: 62, educationTableId: 119 }
    vm.navigationCollapsed = true;
    vm.pageId = $stateParams.pageId;
    vm.empPKId = $stateParams.empId;
    vm.tempName = $stateParams.name;
    vm.tableId = 0;
    vm.field = "";
    vm.empBasicDetail = {};
    vm.empPersonalDetail = {};
    vm.empContactDetail = {};
    vm.empJobDetail = {};
    vm.empResignDetail = {};
    vm.empSignDetail = {};
    vm.empAccountDetail = {};
    vm.empEmgContact = {};
    vm.empExperienceDetail = {};
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
    //End of Permanent Address Same as Current Address  

    // Get date format mmddyyyy
    function _getDate(date) {
      var mmddyyyy = "";
      var date = new Date(date);
      var month = date.getMonth() + 1;
      mmddyyyy = month + "/" + date.getDate() + "/" + date.getFullYear();

      return mmddyyyy;
    }

    // End of get date format mmddyyyy


    //Page load
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

        pageService.findEntity(vm.pageIds.emgContactPageId, undefined, searchList).then(
          _findEMGContactEntitySuccessResult, _findEMGContactEntityErrorResult);
      });
      //for family detail
      $timeout(function () {
        pageService.getPagData(vm.pageIds.familyPageId).then(
          _getfamilyDetailSuccessResult, _getfamilyDetailErrorResult);
      });
      //for nominee detail
      $timeout(function () {
        pageService.getPagData(vm.pageIds.nomineePageId).then(
          _getNomineeDetailSuccessResult, _getNomineeDetailErrorResult);
      });
      //for contact detail
      $timeout(function () {
        pageService.getPagData(vm.pageIds.contactPageId).then(
          _getcontactSuccessResult, _getcontactErrorResult);
      });
      //for Experienc detail
      $timeout(function () {
        pageService.getPagData(vm.pageIds.experiencPageId).then(
          _getExperienceSuccessResult, _getExperienceErrorResult);
      });
      //for Education detail
      $timeout(function () {
        pageService.getPagData(vm.pageIds.educationPageId).then(
          _getEducationSuccessResult, _getEducationErrorResult);
      });
    }
    // End of Page load

    //Nominee
    function _getNomineeDetailSuccessResult(result) {
      console.log(result)
      $scope.nomineePage = angular.extend($scope.nomineePage, result);
      // $scope.setPage($scope.page)
      console.log($scope.nomineePage);
      $scope.nomineePage.gridOptions = $scope.gridSetupColumns($scope.nomineePage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _refreshDataNominee();
    }
    function _getNomineeDetailErrorResult(error) {
      alert(JSON.stringify(error))
    }
    function _refreshDataNominee() {
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
      tableData.then(_getNomineeTableSuccessResult, _getNomineeTableErrorResult)
    }
    function _getNomineeTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getNomineeTableSuccessResult(result) {
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
        $scope.nomineePage.gridOptions.data = result;
      }
    }
    function _addRecordNominee() {
      var param = {
        action: 'create',
        page: $scope.nomineePage,
        linkColumns: [{ name: 'NDEmpId', value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
    }
    function _editRecordNominee(row) {
      var param = {
        action: 'edit',
        page: $scope.nomineePage,
        entity: row.entity,
        linkColumns: [{ name: 'NDEmpId', value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
    }
    //End Nominee
    //Experince
    function _getExperienceSuccessResult(result) {
      console.log(result)
      $scope.experiencePage = angular.extend($scope.experiencePage, result);
      // $scope.setPage($scope.page)
      console.log($scope.nomineePage);
      $scope.experiencePage.gridOptions = $scope.gridSetupColumns($scope.experiencePage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _refreshDataExperience();
    }
    function _getExperienceErrorResult(err) {
      alert(JSON.stringify(error))
    }
    function _refreshDataExperience() {
      var search = [];
      var searchFields = {
        field: "WEEmpId",
        operand: "=",
        value: vm.empPKId
      }
      search.push(searchFields);
      var data = {
        searchList: search,
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.tableIds.experiencTableId,
        vm.pageIds.experiencPageId,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getExperienceTableSuccessResult, _getExperienceTableErrorResult)
    }
    function _getExperienceTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getExperienceTableSuccessResult(result) {
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
        $scope.experiencePage.gridOptions.data = result;
      }
    }
    function _addRecordExperience() {

      var param = { WEId: "", Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/experience/addExperience-modal.html',
        controller: 'addEditExperienceDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      $scope.openProgressDialog = baProgressModal.open;
      // var param = {
      //   action: 'create',
      //   page: $scope.experiencePage,
      //   linkColumns: [{ name: 'WEEmpId', value: vm.empPKId }]
      // };
      // var options = {
      //   param: param
      // }
      //  dialogModal.openFormVertical(options);
    }
    function _editRecordExperience(row) {
      var param = { WEId: row.entity.WEId, Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/experience/editExperience-modal.html',
        controller: 'addEditExperienceDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      // var param = {
      //   action: 'edit',
      //   page: $scope.experiencePage,
      //   entity: row.entity,
      //   linkColumns: [{ name: 'WEEmpId', value: vm.empPKId }]
      // };
      // var options = {
      //   param: param
      // }
      // dialogModal.openFormVertical(options);
    }
    //End Experience

    //Education
    function _getEducationSuccessResult(result) {
      console.log(result)
      $scope.educationPage = angular.extend($scope.educationPage, result);
      // $scope.setPage($scope.page)
      console.log($scope.nomineePage);
      $scope.educationPage.gridOptions = $scope.gridSetupColumns($scope.educationPage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _refreshDataEducation();
    }
    function _getEducationErrorResult(err) {
      alert(JSON.stringify(error))
    }
    function _refreshDataEducation() {

      var search = [];
      var searchFields = {
        field: "QualiEmpId",
        operand: "=",
        value: vm.empPKId
      }
      search.push(searchFields);
      var data = {
        searchList: search,
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.tableIds.educationTableId,
        vm.pageIds.educationPageId,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getEducationTableSuccessResult, _getEducationTableErrorResult)
    }
    function _getEducationTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getEducationTableSuccessResult(result) {
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
        $scope.educationPage.gridOptions.data = result;
      }
    }
    function _addRecordEducation() {

      var param = { QualiId: 0, Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/education/addEducation-modal.html',
        controller: 'addEditEducationDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      $scope.openProgressDialog = baProgressModal.open;
      // var param = {
      //   action: 'create',
      //   page: $scope.educationPage,
      //   linkColumns: [{ name: 'QualiEmpId', value: vm.empPKId }]
      // };
      // var options = {
      //   param: param
      // }
      // dialogModal.openFormVertical(options);
    }
    function _editRecordEducation(row) {

      var param = { QualiId: row.entity.QualiId, Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/education/editEducation-modal.html',
        controller: 'addEditEducationDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      $scope.openProgressDialog = baProgressModal.open;

      // var param = {
      //   action: 'edit',
      //   page: $scope.educationPage,
      //   entity: row.entity,
      //   linkColumns: [{ name: 'QualiEmpId', value: vm.empPKId }]
      // };
      // var options = {
      //   param: param
      // }
      // dialogModal.openFormVertical(options);
    }
    //End Education


    //Immigration

    function _addRecordImmigration() {
      var param = { IMId: 0, Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/immigration/addImmigration-modal.html',
        controller: 'addEditImmigrationDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      $scope.openProgressDialog = baProgressModal.open;
    }
    function _editRecordImmigration(row) {
      var param = { IMId: row.entity.IMId, Action: null }
      $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/organization/employees/templates/immigration/editImmigration-modal.html',
        controller: 'addEditImmigrationDetails',
        size: 'md',
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      $scope.openProgressDialog = baProgressModal.open;
    }
    //End of Immigration

    //Skill

    function _addRecordSkill() {
     
      var param = {
        action: 'create',
        page: $scope.skillPage,
        linkColumns: [{ name: vm.field, value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
      _refreshListData();
    }
    function _editRecordSkill(row) {
      var param = {
        action: 'edit',
        page: $scope.skillPage,
        entity: row.entity,
        linkColumns: [
          { name: vm.field, value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
       _refreshListData();
    }
    //End of Skill


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

    //family detail
    function _getfamilyDetailSuccessResult(result) {
      console.log(result)
      $scope.familyPage = angular.extend($scope.familyPage, result);
      $scope.setPage(result)
      console.log($scope.familyPage);
      $scope.familyPage.gridOptions = $scope.gridSetupColumns($scope.familyPage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
      _refreshDataFamily();
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
      else if (vm.tempName == 'experience') {
        console.log(result)
        vm.designation = result.pageinfo.selects.WEDesgId;
        field = 'WEEmpId';

      }

      else if (vm.tempName == 'immigration') {
        $scope.immigrationPage = angular.extend($scope.immigrationPage, result);
        // $scope.setPage($scope.page)
        console.log($scope.immigrationPage);
        $scope.immigrationPage.gridOptions = $scope.gridSetupColumns($scope.immigrationPage.gridOptions, result.pageinfo.columns, result, true, true, true, true);

      }

      else if(vm.tempName=='skill')
      {
      console.log(result)
      $scope.skillPage = angular.extend($scope.skillPage, result);
      // $scope.setPage($scope.page)
      console.log($scope.skillPage);
      $scope.skillPage.gridOptions = $scope.gridSetupColumns($scope.skillPage.gridOptions, result.pageinfo.columns, result, true, true, true, true);
    
      }
      if (vm.tempName == 'immigration' || vm.tempName == 'education' || vm.tempName == 'experience' || vm.tempName == 'skill') {
        _refreshListData();
      }
      else {
        _findEntity(field);
      }
    }

    function _refreshListData() {

      var search = [];
      var searchFields = {
        field: vm.field,
        operand: "=",
        value: vm.empPKId
      }
      search.push(searchFields);
      var data = {
        searchList: search,
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.tableId,
        vm.pageId,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getRefreshListSuccessResult, _getRefreshListErrorResult)
    }
    function _getRefreshListErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getRefreshListSuccessResult(result) {
     
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
        if (vm.tempName == 'immigration') {
          $scope.immigrationPage.gridOptions.data = result;
        }
        else if (vm.tempName == 'skill') {
          $scope.skillPage.gridOptions.data = result;
        }

      }
    }

    function _addRecordFamily() {
      var param = {
        action: 'create',
        page: $scope.familyPage,
        linkColumns: [{ name: 'FdEmpId', value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
    }
    function _editRecordFamily(row) {
      var param = {
        action: 'edit',
        page: $scope.familyPage,
        entity: row.entity,
        linkColumns: [
          { name: 'FdEmpId', value: vm.empPKId }]
      };
      var options = {
        param: param
      }
      dialogModal.openFormVertical(options);
      _refreshDataFamily();
    }
    function _refreshDataFamily() {
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
    //end family detail

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
      else if (vm.tempName == 'experience') {
        console.log(result)
        vm.oldEntity = result;
        vm.empExperienceDetail = result;
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
      if (vm.tempName == 'experience') {
        vm.tableId = 62;
      }
      if (vm.tempName == 'education') {
        vm.tableId = 119;
      }
      if (vm.tempName == 'skill') {
        vm.tableId = 412;
        vm.field = 'SEmpId'
      }
      if (vm.tempName == 'immigration') {
        vm.tableId = 125;
        vm.field = 'EmpId'
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
      if (vm.tempName == 'experience') {
        var experience = {
          WEId: vm.empExperienceDetail.WEId == undefined ? undefined : vm.empExperienceDetail.WEId,
          WEEmpId: vm.empPKId,
          WEOrganizName: vm.empExperienceDetail.WEOrganizName,
          WEFrom: vm.empExperienceDetail.WEFrom,
          WETo: vm.empExperienceDetail.WETo,
          WERemark: vm.empExperienceDetail.WERemark,
          WECompEmail: vm.empExperienceDetail.WECompEmail,
          WECompContPersName: vm.empExperienceDetail.WECompContPersName,
          WECompContPersNo: vm.empExperienceDetail.WECompContPersNo,
          WECompanyAddress: vm.empExperienceDetail.WECompanyAddress,
          WEDesgId: vm.empExperienceDetail.WEDesgId,
        }
        if (vm.empExperienceDetail.WEId == undefined) {
          _editPage(experience, 'create');
        }
        else {
          _editPage(experience, 'edit');
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


    _loadController();

  }
})();
