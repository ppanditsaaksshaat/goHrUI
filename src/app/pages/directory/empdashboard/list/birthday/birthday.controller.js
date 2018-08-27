/**
 * @author NKM
 * created on 27.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('birthDayController', birthDayController);

    /** @ngInject */
    function birthDayController($scope, param, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        console.log('list controller.')
        console.log(param)

        // $scope.gridOptions=$scope.getGridSetting();
        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableScrollbars: false,
            columnDefs: [
                { name: 'EmpName', displayName: 'EmpName', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name Of Employee', width: 300, enableCellEdit: false },
                { name: 'PdDateOfBirth', displayName: 'Date Of Birth', width: 300, enableCellEdit: false },
            ],
        }
        $scope.gridOptions.data = param;
    }


})();