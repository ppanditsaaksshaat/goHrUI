

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

        var proTableId = 486;

        $scope.update = _update;

        function _loadController() {
            $scope.entity = angular.copy(param);
        }

        function _update() {
            if (param != undefined) {
                var entity = [];
                var fieldList = {
                    tableId: proTableId,
                    pkId: $scope.entity.PSId,
                    pkColName: 'PSId',
                    PSDescription: $scope.entity.PSDescription
                }
                entity.push(fieldList)
                pageService.udateMultiTableFields(entity).
                    then(_successResult, _errorResult);

                function _successResult(result) {
                    console.log(result)
                    if (result.success_message = "Updated") {
                        $scope.modalInstance.close("success");

                    }
                }
                function _errorResult(err) {
                    console.log(err)
                }
            }
            else{
                
            }
        }
        _loadController();
    }
})()