/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('dirEmployeesController', dirEmployeesController);

    /** @ngInject */
    function dirEmployeesController($scope, $rootScope, $stateParams, pageService, dialogModal) {

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                { name: 'JDOfficeEmail', displayName: 'Email', width: 150, enableCellEdit: false },
                { name: 'JDDate', displayName: 'Joining Date', width: 150, enableCellEdit: false },
                { name: 'DesgName', displayName: 'Designation', width: 150, enableCellEdit: false },
                { name: 'DeptName', displayName: 'Department', width: 150, enableCellEdit: false },
                { name: 'LocationName', displayName: 'Location', width: 150, enableCellEdit: false },
                { name: 'BRName', displayName: 'Branch', width: 100, enableCellEdit: false},
                { name: 'SUName', displayName: 'SubUnit', width: 100, enableCellEdit: false}
            ],
        }

        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'Type', operand: '=', value: 'allemployee' })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 656).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            function _getCustomQuerySuccessResult(result) {
                console.log(result);
                $scope.gridOptions.data = result[0];


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }


        _loadController();
    }
})()

