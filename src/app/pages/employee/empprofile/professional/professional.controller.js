

/**
 * @author pardeep.pandit
 * created on 21.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empProfessionController', empProfessionController);

    /** @ngInject */
    function empProfessionController($scope, $state, $stateParams, pageService, dialogModal, param) {

        $scope.update = _update;

        function _loadController() {
            $scope.entity = angular.copy(param);
        }

        function _update() {
            var fieldList = {
                PSDescription: $scope.entity.PSDescription
            }

            pageService.updateTableMultiField(486, 'PSId', $scope.entity.PSId, fieldList).
                then(_successResult, _errorResult);

            function _successResult(result) {
                console.log(result)
                if (result.success_message = "Updated") {
                   $scope.modalInstance.close("success");
                   $scope.showMsg('success', 'Professional Detail Updated');
                }
            }
            function _errorResult(err){
                console.log(err)
            }
        }
        _loadController();
    }
})()