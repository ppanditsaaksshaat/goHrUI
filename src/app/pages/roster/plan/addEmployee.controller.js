/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster')
        .controller('addRosterEmpController', addRosterEmpController);

    /** @ngInject */
    function addRosterEmpController($scope, $rootScope, fileReader, $filter, $uibModal, editFormService,
        pageService, param) {

        $scope.save = _save;

        if (param != null && param != undefined) {
            
            var data = $filter("findAll")(param.empList, param.deptId, 'JDDeptId');
            if (data != null) {
                $scope.employeeList = data;
            }
            else{
                $scope.empNotFound=true;
            }
        }
        function _save() {
            console.log($scope.employeeList)
            if (param.callBack) {
                if (param.callBack != null) {
                    param.callBack($scope.employeeList, param.currentWeek);
                }
            }
            $rootScope.modalInstance.dismiss();
        }

    }
})();
