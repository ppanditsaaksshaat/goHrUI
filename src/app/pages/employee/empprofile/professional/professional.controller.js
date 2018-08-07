

/**
 * @author pardeep.pandit
 * created on 21.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empProfessionController', empProfessionController);

    /** @ngInject */
    function empProfessionController($scope,$rootScope, $stateParams, pageService, editFormService, param) {

        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        var proTableId = 486;
        var proPageId = 492;

        $scope.update = _update;
        $scope.save = _save;
        $scope.param=param;

        function _loadController() {
            $scope.entity = angular.copy(param);
        }

        function _update(form) {
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
        }

        function _save(form) {
            var entity = {               
                PSEmpId: empId,
                PSDescription: $scope.entity.PSDescription
            }

            editFormService.saveForm(proPageId, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                if (result.success_message == "Added New Record.") {
                    $scope.modalInstance.close("success");
                }
            }
            function _errorResult(err) {
                console.log(err)
            }
        }
        _loadController();
    }
})();