/**
 * @author NKM
 * created on 27.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('newJoinsController', newJoinsController);

    /** @ngInject */
    function newJoinsController($scope, param, $rootScope, $state, $stateParams, pageService, editFormService, $filter) {
        console.log('list controller.')
        console.log(param)

        // $scope.gridOptions=$scope.getGridSetting();
        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableScrollbars: false,
            columnDefs: [
                { name: 'SNo', displayName: 'SNo', width: 70, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name Of Employee', width: 300, enableCellEdit: false },
                { name: 'JDDate', displayName: 'Date Of Joining', width: 300, enableCellEdit: false },
            ],
        }
        $scope.gridOptions.data = param;
    }


})();