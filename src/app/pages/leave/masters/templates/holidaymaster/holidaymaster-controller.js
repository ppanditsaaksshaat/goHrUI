(function () {
    'use strict';
    angular.module('BlurAdmin.pages.attendance.masters')
        .controller('holidaymasterController', holidaymasterController);
    function holidaymasterController($scope, $stateParams) {
        $scope.$on('designGrid', function (e) {
            $scope.setGrid(

                {
                    columns: ['HDName','HDFromDate','HDToDate'],//list of columns
                    titleField: 'HDName',//first search field
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