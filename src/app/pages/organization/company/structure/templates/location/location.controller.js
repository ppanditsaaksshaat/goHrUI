(function () {
    'use strict';
    angular.module('BlurAdmin.pages.organization.general.structure')
        .controller('structureLocationController', structureLocationController);
    function structureLocationController($scope, $stateParams) {

        $scope.$on('designGrid', function (e) {
            debugger;
            $scope.setGrid(

                {
                    columns: ['LocationName', 'CityName', 'StateName', 'CountryName'],//list of columns
                    titleField: 'LocationName',//first search field
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