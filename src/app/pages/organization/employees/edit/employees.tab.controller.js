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
    function empTabController($scope, $stateParams, pageService, $timeout, $uibModal, dialogModal,
        toastrConfig, toastr, $state, editFormService) {
        console.log('empTabController')

        var toastOption = {};
        var defaultConfig = angular.copy(toastrConfig);
        var openedToasts = [];
        toastOption = {
            autoDismiss: false,
            positionClass: 'toast-top-center',
            type: 'success',
            timeOut: '5000',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: true,
            tapToDismiss: true,
            progressBar: true,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "",
            msg: ""
        };
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
        vm.goToEmployeeList = _goToEmployeeList;
        vm.permanentAddress = _permanentAddress;


        function _goToEmployeeList() {
            $state.go("organization.employees.list");
        }
        function _showToast(type, msg, title) {
            toastOption.type = type;
            angular.extend(toastrConfig, toastOption);
            openedToasts.push(toastr[toastOption.type](msg, title));
        }
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
                if (vm.pageId != 360 && vm.pageId != 36)
                    $scope.page = _getLocalPageObject(vm.pageId)
                console.log($scope.page);
            }
        }
        function _getPageDataSuccessResult(result) {
            //console.log(result)
            if (result) {
                if (result.pageinfo) {
                    if (result.fields) {

                        if (result.pageinfo.fields.PdDateOfBirth) {
                            result.pageinfo.fields.PdDateOfBirth.maxDate = 'today';
                        }

                    }
                }
            }

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
                showBack: true,
                selfLoading: true,
                showRefresh: true,
                showFilter: true,
                showAdd: true,
                showRowMenu: true,
                showCustomView: true,
                showUpload: true,
                showDialog: false,
                enableRefreshAfterUpdate: true,
                enableAutoRefresh: true,
                gridHeight: 450,
                linkColumns: [{ name: linkFieldName, value: linkFieldValue }],
                goBack: _goToEmployeeList,
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
            if (result.ECEmpId !== undefined) {//check if entity is emg contact page contact
                vm.oldEmpEmgContact = angular.copy(result);
                vm.empEmgContact = result;
            }
            else if (result.CDId !== undefined) {//check if entity is  contact page contact
                vm.oldempContactDetail = angular.copy(result);
                vm.empContactDetail = result;
                if (result.CDAddLine1 == result.CDPAddLine1 && result.CDAddLine2 == result.CDPAddLine2 && result.CountryId == result.PCountryId &&
                    result.StateId == result.PStateId && result.CityId == result.PCityId && result.CDAreaId == result.CDPAreaId
                    && parseInt(result.CDPincode) == result.CDPPincode) {
                    console.log("same")
                    vm.CDPermanent = true;
                }
                else {
                    vm.CDPermanent = false;
                }
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
        function _saveAddress(editForm) {
            console.log()
            if (vm.empContactDetail.CDId === undefined) {
                vm.empContactDetail.CDEmpId = vm.empPKId;
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'create', vm.oldempContactDetail, editForm, true);
            }
            else {
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'edit', vm.oldempContactDetail, editForm, true);
            }

        }
        function _saveForm(editForm) {
            if ($scope.page.pageinfo.idencolname !== undefined && $scope.page.pageinfo.idencolname !== null) {
                if (vm.pageId == 125) {
                    if (vm.entity.PFPPFIsActive == false) {
                        vm.entity.PFPPFAccountNo = '';
                        vm.entity.PFPPFMemberDate = '';
                    }
                    if (vm.entity.ESIIsActive == false) {
                        vm.entity.ESIMemeberNo = '';
                        vm.entity.ESIMemeberDate = '';
                    }
                    if (vm.entity.ADId === undefined) {
                        console.log("test")
                        vm.entity.ADEmpId = vm.empPKId;
                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log("test1")
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }
                else if (vm.pageId == 114) {

                    if (vm.entity.JDIsOT == false) {
                        vm.entity.SingleOT = false;
                        vm.entity.JDDoubleOT = false;
                        vm.entity.JDSingleOTRate = '';
                        vm.entity.DoubleOTRate = '';

                    }
                    else if (vm.entity.SingleOT == false) {
                        vm.entity.JDSingleOTRate = '';
                    }
                    else if (vm.entity.JDDoubleOT == false) {
                        vm.entity.DoubleOTRate = '';
                    }
                    console.log(vm.entity)
                    if (vm.entity.JDId === undefined) {
                        vm.entity.JDEmpId = vm.empPKId;
                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }
                else if (vm.pageId == 35) {
                    if (vm.entity.PdId === undefined) {
                        vm.entity.PdEmpId = vm.empPKId;
                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }

            }
        }
        function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation) {
            editFormService.saveForm(pageId, entity, (oldEntity === undefined) ? vm.oldEntity : oldEntity,
                action, $scope.page.pageinfo.title, editForm, showConfirmation)
                .then(_updateSuccessResult, _updateErrorResult)
        }

        function _updateSuccessResult(result) {
            console.log(result)

            var isSuccess = true;
            if (result.error_message === undefined) {
                if (result.entity !== undefined) {
                    if (result.entity.JDId !== undefined) {
                        vm.oldEntity = angular.copy(result.entity);
                        vm.entity = angular.copy(result.entity);
                    }

                    if (result.entity.CDId !== undefined) {
                        vm.oldempContactDetail = angular.copy(result.entity);
                        vm.emgContactPage = angular.copy(result.entity);
                    }
                    if (result.entity.PdId !== undefined) {
                        isSuccess = false;
                        vm.oldEntity = angular.copy(result.entity);
                        if (vm.empEmgContact.ECId === undefined) {
                            vm.empEmgContact.ECEmpId = vm.empPKId;
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'create', vm.oldempContactDetail, $scope.editForm, false)
                        }
                        else {
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'edit', vm.oldempContactDetail, $scope.editForm, false)
                        }
                    }
                    else if (result.entity.ECEmpId !== undefined) {
                        isSuccess = true;
                        vm.oldEmpEmgContact = angular.copy(result.entity);
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
            //$scope.showMsg('error', 'Something went worng', 'Save Error')
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
        function _validateFormCommon(form) {
            var localForm = form;
            var valid = true;
            if (vm.activeTab === undefined) {
                if (angular.equals(vm.entity, vm.oldEntity)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
            }
            else if (vm.activeTab == 0) {
                if (form.personalForm)
                    localForm = form.personalForm;
                if (localForm.$error.required !== undefined) {
                    if (localForm.$error.required.length) {
                        angular.forEach(localForm.$error.required, function (errCtrl) {
                            if (!errCtrl.hasOwnProperty('$modelValue')) {
                                localForm.$removeControl(errCtrl)
                            }
                            else if (errCtrl.$name == "") {
                                localForm.$removeControl(errCtrl);
                            }
                        })
                    }
                }
                if (angular.equals(vm.entity, vm.oldEntity)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
                if (angular.equals(vm.empEmgContact, vm.oldEmpEmgContact)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
            }
            else if (vm.activeTab == 1) {
                localForm = form.addressForm;
                if (angular.equals(vm.empContactDetail, vm.oldempContactDetail)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
            }
            if (valid)
                valid = editFormService.validateForm(localForm);
            return valid;
        }
        function _saveFormCommon(editForm) {
            if (_validateFormCommon(editForm)) {
                if (vm.activeTab === undefined) {
                    _saveForm(editForm);
                }
                else if (vm.activeTab == 0) {
                    _saveForm(editForm);
                }
                else if (vm.activeTab == 1) {
                    _saveAddress(editForm);
                }
            }
        }
        function _resetFormCommon(editForm) {
            editForm.$setPristine();
            if (vm.activeTab === undefined) {
                vm.entity = angular.copy(vm.oldEntity);
            }
            else if (vm.activeTab == 0) {
                _resetPersonal();
            }
            else if (vm.activeTab == 1) {
                vm.CDPermanent = true;
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
                vm.CDPermanent = false;
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
                vm.empContactDetail.CDPAreaId = vm.empContactDetail.CDAreaId;
            }
            else {
                vm.empContactDetail.CDPAddLine1 = '';
                vm.empContactDetail.CDPAddLine2 = '';
                vm.empContactDetail.PContryId = '';
                vm.empContactDetail.PStateId = '';
                vm.empContactDetail.PCityId = '';
                vm.empContactDetail.CDPPincode = '';
                vm.empContactDetail.CDPAreaId = '';
            }
        }
        _loadController();
    }//controller end
})();