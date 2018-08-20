/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.employee.retionsheep')
        .controller('retionsheepsController', retionsheepsController);

    /** @ngInject */
    function retionsheepsController($scope, $rootScope, $state, $filter, pageService) {
        //    console.log($state)
        console.log('retionsheep ctrl loaded')
        $scope.location = 'this is retionsheep controller'
        $scope.addLocation = addRecord;
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 51;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: false,
            filterOpened: false,
            showAdd: true,
            showRowMenu: false,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: addRecord,
            editRecord: editRecord,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: false,
            filterOnChange: null,
            showDataOnLoad: true,
            // currentState: 'configuration.company.locations.location'
        }
        $rootScope.$on("CallParentMethod", function () {
            $scope.page.refreshData()
        });

        function editRecord(row) {

            $state.go('configuration.employee.retionsheep.edit', {
                param: {
                    id: row.entity.RelationshipID,
                    pageid: $scope.page.pageId,
                    entity: row.entity,
                    selects: $scope.page.pageinfo.selects
                }
            });
        }

        function deleteRecord(row) {
            console.log(row)
        }

        function addRecord() {
            console.log('addre')
            $state.go('configuration.employee.retionsheep.add', {
                param: {
                    id: 0,
                    pageid: $scope.page.pageId,
                    entity: {},
                    selects: $scope.page.pageinfo.selects
                }
            });
        }



    }
})();