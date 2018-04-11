/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.device.devicemaster')
        .controller('deviceMasterController', deviceMasterController);

    /** @ngInject */
    function deviceMasterController($scope, $state, $stateParams,
        pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService,
        toastr, dialog, $filter) {

        $scope.page = $scope.createPage();
        $scope.page.pageId = 488;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: true,
            showAdd: true,
            showRowMenu: true,
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
            filterOnChange: null
        }

    }
})();


