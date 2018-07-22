/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.attendance.roster')
        .controller('rosterDetailController', rosterDetailController);
    function rosterDetailController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        console.log('location ctrl loaded')
        $scope.location = 'this is location controller'
        $scope.addLocation = addRecord;
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 481;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: true,
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
            showApplyFilter: true,
            filterOnChange: null,
            showDataOnLoad: true,
            // currentState: 'configuration.company.locations.location'
        }

        console.log($scope.page)
        $scope.getPageData = _getPageData;

        function _getPageData() {
            $scope.page.searchList.push({
                field: 'RODFromDate',
                operand: '>=',
                value: '2018-03-01'
            })
            $scope.page.searchList.push({
                field: 'RODFromDate',
                operand: '<=',
                value: '2018-03-05'
            })
            $scope.page.refreshData()
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


        $scope.changeState = function () {
            $scope.selects.StateList = $scope.selects.StateId;

            if ($scope.entity.CountryId) {
                if ($scope.entity.CountryId > 0) {
                    $scope.selects.StateList = $filter('findObj')($scope.selects.StateId, $scope.entity.CountryId, 'CountryId')
                }
            }
        }
    }
})();