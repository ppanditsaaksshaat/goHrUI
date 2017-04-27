
(function () {
    'use strict';
    angular.module('BlurAdmin.pages.organization.masters')
        .controller('orgMasterGradesController', orgMasterGradesController);
    function orgMasterGradesController($scope,$stateParams) {
        
        
        $scope.setGrid(

            {
                columns: ['EmpGradeName','EmpGradeDesc'],//list of columns
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
    }
})();
