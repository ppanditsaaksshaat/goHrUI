

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

        var basicTableId = 30;
        var perTableId = 43;
        $scope.opened=true;

        $scope.update = _update;


        function _loadController() {
            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {
                $scope.dropDownLists = result;
                param.PdDateOfBirth=moment(param.PdDateOfBirth).format("DD-MMM-YYYY");
                $scope.entity = angular.copy(param);
            }
            function _getAllSelectErrorResult(err) {

            }
        }
        function _update() {
            var entities = [];
            var basic = {
                tableId: basicTableId,
                pkId: $scope.entity.EmpId,
                pkColName: 'EmpId',
                EmpFirstName: $scope.entity.EmpFirstName,
                EmpMiddleName: $scope.entity.EmpMiddleName,
                EmpLastName: $scope.entity.EmpLastName
            }
            entities.push(basic);
            var per = {
                tableId: perTableId,
                pkId: $scope.entity.PdId,
                pkColName: 'PdId',
                PdDateOfBirth:$scope.entity.PdDateOfBirth,
                PdGenderId: $scope.entity.PdGenderId,
                PdMaritalId: $scope.entity.PdMaritalId,
                PdNationalityId: $scope.entity.PdNationalityId,
                PdBloodGroupId: $scope.entity.PdBloodGroupId
            }
            entities.push(per);
            console.log(entities)


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
})()