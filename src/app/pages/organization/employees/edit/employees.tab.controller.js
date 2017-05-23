/**
 * @author pradeep.pandip
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
        vm.pageIds = {
            familyPageId: "52", nomineePageId: "438", experiencPageId: "56", contactPageId: "36",
            emgContactPageId: "53", educationPageId: "112", skillPageId: "439", immigrationPageId: "119"
        }

        vm.pageId = $stateParams.pageId;
        vm.empPKId = $stateParams.empId;
        vm.tempName = $stateParams.name;
        vm.saveForm = _saveForm;
        vm.saveAddress = _saveAddress;
        function _loadController() {
            var rndValu = Math.round((Math.random() * 10) * 10);
            var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
            vm.templateUrlPath = "app/pages/organization/employees/templates/" + vm.tempName + "/" + vm.tempName + "-view.html?" + rndValu2 + "=" + rndValu;

            if (vm.pageId == 114 || vm.pageId == 35 || vm.pageId == 125) {

                $timeout(function () {
                    pageService.getPagData(vm.pageId).then(
                        _getPageDataSuccessResult, _getPageDataErrorResult);
                });
                if (vm.pageId == 35) {
                    $scope.familyPage = _getLocalPageObject(52);
                    $scope.nomineePage = _getLocalPageObject(438);
                    $scope.identityPage = _getLocalPageObject(1);
                    pageService.getPagData(vm.pageIds.contactPageId).then(
                        _getPageDataSuccessResult, _getPageDataErrorResult);
                }
            }
            else {
                vm.templateUrlPath = "app/pages/organization/employees/templates/grid-view.html?" + rndValu2 + "=" + rndValu;
                $scope.page = _getLocalPageObject(vm.pageId, 'WEEmpId', vm.empPKId)
            }
        }
        function _getPageDataSuccessResult(result) {
            console.log(result)
            if (result.pageinfo.pageid == 36) {
                $scope.contactPage = result;
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
                var searchList = [];
                var searchFields = {
                    field: linkFieldName,
                    operand: '=',
                    value: vm.empPKId
                }
                searchList.push(searchFields);

                pageService.findEntity($scope.page.pageinfo.tableid, undefined, searchList).then(
                    _findEntitySuccessResult, _findEntityErrorResult);

                if (result.pageinfo.pageid == 35) {
                    var emgTableId = 57, contTableId = 45
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
                case 438://skills
                    linkFieldName = 'NdEmpId'
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

            if (result.ECEmpId !== undefined) {//check if entity is emg contact page contact
                vm.oldEmpEmgContact = angular.copy(result);
                vm.empEmgContact = result;
            }
            else if (result.CDId !== undefined) {//check if entity is emg contact page contact
                vm.oldempContactDetail = angular.copy(result);
                vm.empContactDetail = result;
            }
            else {
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
            _formSave(vm.empContactDetail, vm.pageIds.contactPageId);
        }
        function _saveForm() {
            _formSave(vm.entity, vm.pageId);
        }
        function _formSave(entity, pageId) {
            var objectData, action;
            objectData = entity;
            action = 'edit';

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
                        _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId)
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

        _loadController();
    }//controller end
})();