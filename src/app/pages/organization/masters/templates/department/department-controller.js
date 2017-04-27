(function () {
    'use strict';
    angular.module('BlurAdmin.pages.organization.masters')
        .controller('orgMasterDepartController', orgMasterDepartController);
    function orgMasterDepartController($scope, $stateParams) {
        $scope.$on('designGrid', function (e) {
            $scope.setGrid(

                {
                    columns: ['DeptName'],//list of columns
                    titleField: 'DeptName',//first search field
                    enableTitleFilter: true,//show title filter
                    enableGlobalFilter: true,//show global filter
                    enbleColumnFilter: false,//show each column filter
                    enableSrNo: true,//show serial no column
                    enableAction: true,//show action column
                    enablePagination: true,//enable pagination
                    paginationLength: 10,//length of rows per page,
                    pageId: $stateParams.pageId//page id for which grid to be design
                }
            )
        })
    }
})();