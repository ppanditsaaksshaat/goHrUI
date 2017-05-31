/**
 * @author pradeep.pandit
 * created on 16.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('empTabController', empTabController);

    /** @ngInject */
    /** @ngInject */
    function empTabController($scope, $stateParams, pageService, $timeout, $uibModal, dialogModal) {
        console.log('empTabController')
        var vm = this;
        $scope.entity = {}
        vm.empContactDetail = {};
        vm.pageIds = {
            familyPageId: "52", nomineePageId: "438", experiencPageId: "56", contactPageId: "36",
            emgContactPageId: "53", educationPageId: "112", skillPageId: "439", immigrationPageId: "119"
        }
        vm.empEmgContact = {};
        vm.pageId = $stateParams.pageId;
        vm.empPKId = $stateParams.empId;
        vm.tempName = $stateParams.name;
        vm.saveForm = _saveForm;
        vm.saveAddress = _saveAddress;

        vm.saveFormCommon = _saveFormCommon;
        vm.resetFormCommon = _resetFormCommon;
        vm.clearFormCommon = _clearFormCommon;
        vm.permanentAddress = _permanentAddress;

        function _loadController() {
            var rndValu = Math.round((Math.random() * 10) * 10);
            var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
            vm.templateUrlPath = "app/pages/organization/employees/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;

            if (vm.pageId == 114 || vm.pageId == 35 || vm.pageId == 125) {

                $timeout(function () {
                    pageService.getPagData(vm.pageId).then(
                        _getPageDataSuccessResult, _getPageDataErrorResult);
                    pageService.getPagData(vm.pageIds.emgContactPageId).then(
                        _getPageDataSuccessResult, _getPageDataErrorResult);
                });
                if (vm.pageId == 35) {
                    $scope.familyPage = _getLocalPageObject(52);
                    $scope.nomineePage = _getLocalPageObject(438);
                    $scope.identityPage = _getLocalPageObject(442);
                    pageService.getPagData(vm.pageIds.contactPageId).then(
                        _getPageDataSuccessResult, _getPageDataErrorResult);
                }
            }
            else {
                vm.templateUrlPath = "app/pages/organization/employees/templates/grid-view.html?" + rndValu2 + "=" + rndValu;
                console.log(vm.empPKId)
                // $scope.page = _getLocalPageObject(vm.pageId, 'WEEmpId', vm.empPKId)
                $scope.page = _getLocalPageObject(vm.pageId)
                console.log($scope.page);
            }
        }
        function _getPageDataSuccessResult(result) {
            console.log(result)

            if (result.pageinfo.pageid == 36) {
                $scope.contactPage = result;
            }
            else if (result.pageinfo.pageid == 53) {
                $scope.emgContactPage = result;
            }
            else {
                $scope.page = result;
            }

            var linkFieldName;
            if (result.pageinfo.pageid == 114) {
                linkFieldName = 'JDEmpId';
            } else if (result.pageinfo.pageid == 35) {
                linkFieldName = 'PdEmpId';
            } else if (result.pageinfo.pageid == 125) {
                linkFieldName = 'ADEmpId';
            }

            console.log(result)
            $timeout(function () {
                if (result.pageinfo.pageid == 114 || result.pageinfo.pageid == 125) {
                    var searchList = [];
                    var searchFields = {
                        field: linkFieldName,
                        operand: '=',
                        value: vm.empPKId
                    }
                    searchList.push(searchFields);
                    console.log(searchList)

                    pageService.findEntity($scope.page.pageinfo.tableid, undefined, searchList).then(
                        _findEntitySuccessResult, _findEntityErrorResult);
                }
                if (result.pageinfo.pageid == 35) {

                    var emgTableId = 57, contTableId = 45, personalTableId = 43;
                    var searchList = [];
                    var searchFields = {
                        field: linkFieldName,
                        operand: '=',
                        value: vm.empPKId
                    }
                    searchList.push(searchFields);
                    console.log(searchList)

                    pageService.findEntity(personalTableId, undefined, searchList).then(
                        _findEntitySuccessResult, _findEntityErrorResult);

                    //call emg contact entity
                    searchList = [];
                    searchFields = {
                        field: 'ECEmpId',
                        operand: '=',
                        value: vm.empPKId
                    }
                    searchList.push(searchFields);
                    pageService.findEntity(emgTableId, undefined, searchList).then(
                        _findEntitySuccessResult, _findEntityErrorResult);

                    //call contact address entity
                    searchList = [];
                    searchFields = {
                        field: 'CDEmpId',
                        operand: '=',
                        value: vm.empPKId
                    }
                    searchList.push(searchFields);
                    pageService.findEntity(contTableId, undefined, searchList).then(
                        _findEntitySuccessResult, _findEntityErrorResult);
                }
            })
        }
        function _getPageDataErrorResult(error) {
        }
        function _getLocalPageObject(pageId) {

            var linkFieldName, linkFieldValue;
            linkFieldValue = vm.empPKId;
            pageId = parseInt(pageId);
            switch (pageId) {
                case 56://experience
                    linkFieldName = 'WEEmpId'
                    break;
                case 112://education
                    linkFieldName = 'QualiEmpId'
                    break;
                case 439://skills
                    linkFieldName = 'SEmpId'
                    break;
                case 119://immigration
                    linkFieldName = 'EmpId'
                    break;
                case 360://documents
                    linkFieldName = ''
                    break;
                case 36://salary
                    linkFieldName = ''
                    break;
                case 52://family
                    linkFieldName = 'FdEmpId'
                    break;
                case 438://nominee
                    linkFieldName = 'NDEmpId'
                    break;
                case 442://identity
                    linkFieldName = 'IEmpId'
                    break;
            }

            var pageObject = $scope.createPage();
            pageObject.pageId = pageId;
            pageObject.boxOptions = {
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
                gridHeight: 450,
                linkColumns: [{ name: linkFieldName, value: linkFieldValue }],
                getPageData: null,
                refreshData: null,
                addRecord: null,
                editRecord: null,
                updateRecord: null,
                viewRecord: null,
                deleteRecord: null,
                uploadRecord: null
            }
            return pageObject;
        }
        function _findEntitySuccessResult(result) {
            console.log(result)
            if (result.ECEmpId !== undefined) {//check if entity is emg contact page contact
                vm.oldEmpEmgContact = angular.copy(result);
                vm.empEmgContact = result;
            }
            else if (result.CDId !== undefined) {//check if entity is  contact page contact

                vm.oldempContactDetail = angular.copy(result);
                console.log(result)
                vm.empContactDetail = result;
            }
            else {

                console.log(result)
                vm.oldEntity = angular.copy(result);
                vm.entity = result;
            }
        }
        function _findEntityErrorResult() {

        }
        //=========================================================== saving data function
        function _setupSaving(dataObject, action, pageId) {
            var data = {
                oldEntity: vm.oldEntity == undefined ? dataObject : vm.oldEntity,
                newEntity: dataObject,
                pageCode: pageId,
                activity: action
            }
            return data;
        }
        function _saveAddress() {

            if (vm.empContactDetail.CDEmpId === undefined) {
                console.log("CONTACT")
                vm.empContactDetail.CDEmpId = vm.empPKId;
                vm.empContactDetail.CDAreaId=2;
                vm.empContactDetail.CDCityId=  vm.empContactDetail.PCityId;
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'create');
            }
            else {
                console.log("CONTACT1")
                console.log(vm.entity);
                vm.empContactDetail.CDAreaId=2;
                vm.empContactDetail.CDCityId=  vm.empContactDetail.PCityId;
                console.log(vm.empContactDetail)
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'edit');
            }
          
        }
        function _saveForm() {
            if ($scope.page.pageinfo.idencolname !== undefined && $scope.page.pageinfo.idencolname !== null) {
                if (vm.pageId == 125) {
                    if (vm.entity.ADEmpId === undefined) {
                        console.log("test")
                        vm.entity.ADEmpId = vm.empPKId;
                        _formSave(vm.entity, vm.pageId, 'create');
                    }
                    else {
                        console.log("test1")
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit');
                    }
                }
                else {
                    console.log("test3")
                    _formSave(vm.entity, vm.pageId, 'edit');
                }

            }
        }
        function _formSave(entity, pageId, action) {
            console.log(entity);
            var objectData, action;
            objectData = entity;
            action = action;
            var savingObj = _setupSaving(objectData, action, pageId);
            console.log(savingObj)
            pageService.editPageData(pageId, JSON.stringify(savingObj)).then(_updateSuccessResult, _updateErrorResult)

        }
        function _updateSuccessResult(result) {
            console.log(result)

            var isSuccess = true;
            if (result.error_message === undefined) {
                if (result.entity !== undefined) {
                    if (result.entity.PdId !== undefined) {
                        isSuccess = false;

                        if (vm.empEmgContact.ECEmpId === undefined) {
                            vm.empEmgContact.ECEmpId = vm.empPKId;
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'create')
                            console.log(vm.empEmgContact)
                        }
                        else {
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'edit')
                        }
                    }
                    else if (result.entity.ECEmpId !== undefined) {
                        isSuccess = true;
                    }
                }
            }
            else {
                isSuccess = false;
                $scope.showMsg('error', result.error_message.Message);
            }
            if (isSuccess)
                $scope.showMsg('success', 'Record Saved Successfully');

        }
        function _updateErrorResult(error) {
            console.log(error)
        }
        function _resetPersonal() {
            vm.entity = angular.copy(vm.oldEntity);
            vm.empEmgContact = angular.copy(vm.oldEmpEmgContact);
        }
        function _resetAddress() {
            vm.empContactDetail = angular.copy(vm.oldempContactDetail);
        }
        function _clearPersonal() {
            var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]
            vm.entity = {};
            vm.entity[$scope.page.pageinfo.idencolname] = oldPkId;

            vm.empEmgContact = {};
            vm.empEmgContact[$scope.page.pageinfo.idencolname] = oldPkId;
        }
        function _clearAddress() {
            var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]
            vm.empContactDetail = {};
            vm.empContactDetail[$scope.page.pageinfo.idencolname] = oldPkId;

        }
        //=========================================================== common method
        // function _validateFormCommon() {
        //     // editForm.$invalid
        //     return true;
        // }
        function _saveFormCommon() {
            // if (!_validateFormCommon()) {
            //     return;
            // }

            if (vm.activeTab === undefined) {

                _saveForm();
            }
            else if (vm.activeTab == 0) {
                _saveForm();
            }
            else if (vm.activeTab == 1) {
                _saveAddress();
            }
        }
        function _resetFormCommon() {

            if (vm.activeTab === undefined) {
                vm.entity = angular.copy(vm.oldEntity);
            }
            else if (vm.activeTab == 0) {
                _resetPersonal();
            }
            else if (vm.activeTab == 1) {
                _resetAddress();
            }
        }
        function _clearFormCommon() {

            if (vm.activeTab === undefined) {
                var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]
                vm.entity = {};
                vm.entity[$scope.page.pageinfo.idencolname] = oldPkId;
                console.log(vm.entity)
            }
            else if (vm.activeTab == 0) {
                _clearPersonal();
            }
            else if (vm.activeTab == 1) {
                _clearAddress();
            }
        }
        function _permanentAddress() {
            if (vm.CDPermanent) {
                vm.empContactDetail.CDPAddLine1 = vm.empContactDetail.CDAddLine1;
                vm.empContactDetail.CDPAddLine2 = vm.empContactDetail.CDAddLine2;
                vm.empContactDetail.PCountryId = vm.empContactDetail.CountryId;
                vm.empContactDetail.PStateId = vm.empContactDetail.StateId;
                vm.empContactDetail.PCityId = vm.empContactDetail.CityId;
                vm.empContactDetail.CDPPincode = vm.empContactDetail.CDPincode;
            }
            else {
                vm.empContactDetail.CDPAddLine1 = '';
                vm.empContactDetail.CDPAddLine2 = '';
                vm.empContactDetail.PContryId = '';
                vm.empContactDetail.PStateId = '';
                vm.empContactDetail.PCityId = '';
                vm.empContactDetail.CDPPinecode = '';
            }
        }
        _loadController();
    }//controller end
})();