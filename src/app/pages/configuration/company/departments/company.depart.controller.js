/**
 * @author deepak.jain
 * created on 28.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.departments')
        .controller('departmentsController', departmentsController);

    /** @ngInject */
    function departmentsController($scope, $rootScope, $state, $filter, pageService) {
        //    console.log($state)
        console.log('location ctrl loaded')
        $scope.location = 'this is location controller'
        $scope.addLocation = addRecord;
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 29;
        $rootScope.$on("CallParentMethod", function () {
            $scope.page.refreshData()
        });
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

        function editRecord(row) {

            $state.go('configuration.company.departments.edit', {
                param: {
                    id: row.entity.DeptId,
                    pageid: $scope.page.pageId,
                    entity: row.entity,
                }
            });
        }

        function deleteRecord(row) {
            console.log(row)
        }

        function addRecord() {
            console.log('addre')
            $state.go('configuration.company.departments.add', {
                param: {
                    id: 0,
                    pageid: $scope.page.pageId,
                    entity: {},
                }
            });
        }



    }
})();