/**
 * @author deepak.jain
 * created on 19.04.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.masters')
        .controller('branchAddController', branchAddController)



    function branchAddController($scope, $state, $stateParams, DJWebStore, editFormService) {

        $scope.ok = function () {
            return true;
        }

        var vm = this;

        vm.saveForm = _saveForm;
        vm.pageId = $stateParams.pageId;
        vm.action = $stateParams.action;
        if ($stateParams.pkId !== undefined) {
            vm.pkId = $stateParams.pkId;
        }
        vm.selects = { BRLocationId: [] }

        function _loadController() {
            vm.page = DJWebStore.GetValue('Page_' + vm.pageId)

            if (vm.page.pageinfo.filters !== undefined) {

                vm.page.pageinfo.filters.forEach(function (filter) {
                    if (filter.name == "BRLocationId") {
                        vm.selects.BRLocationId = filter.titleMap;
                    }
                }, this);

            }
        }
        function _saveForm(form) {
            console.log(vm.entity, vm.action)
            var newEntity = {
                BRId: 0,
                BRName: vm.entity.BRName,
                BRLocationId: vm.entity.BRLocationId.value
            }
            editFormService.saveForm(vm.pageId, newEntity, {}, vm.action, vm.page.pageinfo.title, 'organization.masters.label')
        }
        _loadController();
    }

})();
