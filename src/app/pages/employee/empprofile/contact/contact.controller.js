

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empContactController', empContactController);

    /** @ngInject */
    function empContactController($scope, $state, $stateParams, pageService, dialogModal, param) {


        var perTableId = 43;
        var perPageId = 35;
        var jobTableId = 121;
        var jobPageId = 114;
        var basicTableId = 30;
        var basicPageId = 25;

        $scope.udpate = _update;


        function _loadController() {
            $scope.entity = angular.copy(param);
        }

        function _update() {

            var entities = [];
            var job = {
                tableId: jobTableId,
                pkId: $scope.entity.JDId,
                pkColName: 'JDId',
                JDOfficeEmail: $scope.entity.JDOfficeEmail,
                JDOfficeMobile: $scope.entity.JDOfficeMobile,
                JDOfficePhone: $scope.entity.JDOfficePhone,
                JDEmpId: $scope.entity.JDEmpId
            }
            entities.push(job);
            var per = {
                tableId: perTableId,
                pkId: $scope.entity.PdId,
                pkColName: 'PdId',
                PdEmail: $scope.entity.PdEmail,
                PdMobileNo: $scope.entity.PdMobileNo,
                PdResidenceMobile: $scope.entity.PdResidenceMobile,
                PdEmpId: $scope.entity.JDEmpId
            }
            entities.push(per);


            pageService.udateMultiTableFields(entities).then(function (result) {
                if (result.success_message = "Updated") {
                    $scope.modalInstance.close("success");
                }
            }, function (err) {
                console.log(err)
            })

        }
        _loadController();
    }
})();