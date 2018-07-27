/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.locations.location')
        .controller('locationController', locationsController);

    /** @ngInject */
    function locationsController($scope, $rootScope, $state, $filter, pageService) {
        //    console.log($state)
        console.log('location ctrl loaded')
        $scope.location = 'this is location controller'
        $scope.addLocation = addRecord;
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 34;
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

            $state.go('configuration.company.locations.location.edit', {
                id: row.entity.LocationId,
                entity: row.entity,
                selects: $scope.page.pageinfo.selects
            });
        }

        function deleteRecord(row) {
            console.log(row)
        }

        function addRecord() {
            $state.go('configuration.company.locations.location.add', {
                id: 0,
                entity: {},
                selects: $scope.page.pageinfo.selects
            });
        }


       
    }
})();