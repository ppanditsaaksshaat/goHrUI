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

        vm.pageId = $stateParams.pageId;
        vm.empPKId = $stateParams.empId;
        vm.tempName = $stateParams.name;

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
                }
            }
            else {
                vm.templateUrlPath = "app/pages/organization/employees/templates/grid-view.html?" + rndValu2 + "=" + rndValu;
                $scope.page = _getLocalPageObject(vm.pageId, 'WEEmpId', vm.empPKId)
            }
            console.log(vm.templateUrlPath)
        }
        function _getPageDataSuccessResult(result) {
            console.log(result)
            $scope.page = result;
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
            vm.oldEntity = angular.copy(result);
            vm.entity = result;
            console.log(result)
        }
        function _findEntityErrorResult() {

        }
        //=========================================================== saving data function

        _loadController();
    }//controller end
})();