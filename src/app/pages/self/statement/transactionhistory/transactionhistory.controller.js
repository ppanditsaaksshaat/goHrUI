/**
 * @author NKM
 * created on 26.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.transactionhistory')
        .controller('transanctionHistoryController', transanctionHistoryController);
    function transanctionHistoryController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        console.log('location ctrl loaded')
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 270;
        // $scope.page = $rootScope.createPage(); 0
        console.log($scope.page)


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
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: false,
            filterOnChange: null,
            showDataOnLoad: true,
            // currentState: 'configuration.company.locations.location'
        }

        // $scope.page.searchList.push({ field: 'AMSTIsVarified', operand: '=', value: true })
        $scope.page.searchList.push({
            field: 'ELTEmpId',
            operand: '=',
            value: 825
            // value: $rootScope.user.profile.empId
        })

    }
})();