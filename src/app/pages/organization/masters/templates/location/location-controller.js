/**
 * @author deepak.jain
 * created on 19.04.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.masters')
        .controller('locationAddController', locationAddController)

    function locationAddController($scope, $state, $stateParams, $timeout, DJWebStore, editFormService, pageService) {
        var vm = this;

        vm.saveForm = _saveForm;
        vm.pageId = $stateParams.pageId;
        vm.action = $stateParams.action;
        vm.tempName = $stateParams.name;
        vm.pkId = 0;
        if ($stateParams.pkId !== undefined) {
            vm.pkId = $stateParams.pkId;
        }
        vm.oldEntity = {};
        function _loadController() {
            vm.page = DJWebStore.GetValue('Page_' + vm.pageId)
            vm.selects = vm.page.pageinfo.selects;
            if (vm.pkId > 0)
                _findEntity()
        }
        function _findEntity() {
            vm.isLoaded = false;
            vm.isLoading = true;
            $timeout(function () {
                pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
                    _findEntitySuccessResult, _findEntityErrorResult);
            });
        }
        function _findEntitySuccessResult(result) {
            vm.isLoaded = true;
            vm.isLoading = false;
            vm.entity = result;
            vm.oldEntity = angular.copy(result)
        }
        function _findEntityErrorResult(err) {
            vm.isLoaded = true;
            vm.isLoading = false;
        }
        function _validateForm(form) {
            return true;
        }
        function _saveForm(form) {
            if (_validateForm(form)) {
                editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)
            }
        }

        _loadController();


    }

})();
