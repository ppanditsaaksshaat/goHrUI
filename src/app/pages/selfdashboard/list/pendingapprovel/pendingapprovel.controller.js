/**
 * @author NKM
 * created on 24.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard')
        .controller('pendingApprovelController', pendingApprovelController);

    /** @ngInject */
    function pendingApprovelController($scope, param, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        console.log('list controller.')
        console.log(param)

        // $scope.gridOptions=$scope.getGridSetting();
        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            columnDefs: [
                { name: 'SNo', displayName: 'SNo', width: 80, enableCellEdit: false },
                { name: 'Date', displayName: 'Application Date', width: 300, enableCellEdit: false },
                { name: 'Type', displayName: 'Application Type', width: 300, enableCellEdit: false },
            ],
        }
        $scope.gridOptions.data = param;
    }


})();