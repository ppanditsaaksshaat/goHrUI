/**
 * @author SBP
 * created on 25.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.company')
        .controller('companyListController', companyListController);

    /** @ngInject */
    function companyListController($scope, pageService,$state) {
        console.log('this controller')
        var vm = this;
        var companyPageId = 347;
       
        $scope.entity = {};
        $scope.page = $scope.createPage();
        $scope.page.pageId = companyPageId;
        $scope.page.boxOptions = {
            showBack: false,
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            enableAutoRefresh: true,
            gridHeight: 450,
            linkColumns: [],
            goBack: null,
            getPageData: null,
            refreshData: null,
            addRecord: _addRecord,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            uploadRecord: null
        }
        function _loadController() {

        }

        function _addRecord() {
            $state.go("organization.company.add", "{action:'create'}");
        }


        _loadController();
    }
})();
