/**
 * @author NKM
 * created on 24.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard')
        .controller('teamLeaveController', teamLeaveController);

    /** @ngInject */
    function teamLeaveController($scope, param, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        console.log('list controller.')
        console.log(param)

        // $scope.gridOptions=$scope.getGridSetting();
        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableScrollbars: false,
            columnDefs: [
                { name: 'SNo', displayName: 'SNo', width: 70, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Employee Name', width: 200, enableCellEdit: false },
                { name: 'LEADDateFrom', displayName: 'From Date', width: 200, enableCellEdit: false },
                { name: 'LEADDateTo', displayName: 'To Date', width: 200, enableCellEdit: false },
           
            ],
        }
        $scope.gridOptions.data = param;
    }


})();