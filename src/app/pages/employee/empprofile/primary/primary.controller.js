

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empPrimaryController', empPrimaryController);

    /** @ngInject */
    function empPrimaryController($scope, $state, $stateParams, pageService, dialogModal, param) {
        var columnIds = ['192', '193', '194', '4233'];

        $scope.update = _update;

        function _loadController() {
            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {
                //    console.log(result)
                $scope.dropDownLists = result;
                $scope.entity = param;
            }
            function _getAllSelectErrorResult(err) {

            }
        }
        function _update() {
            $scope.modalInstance.close("check");
        }
        _loadController();
    }
})()