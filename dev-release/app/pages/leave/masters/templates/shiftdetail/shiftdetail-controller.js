(function () {
    'use strict';
    angular.module('BlurAdmin.pages.attendance.masters')
        .controller('attendanceshiftdetailController', attendanceshiftdetailController);
    function attendanceshiftdetailController($scope, $stateParams) {
        $scope.$on('designGrid', function (e) {
            $scope.setGrid(

                {
                    columns: ['SMName','SMFromTime','SMToTime','SMSSId','SMLateAllowed'],//list of columns
                    titleField: 'SMName',//first search field
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