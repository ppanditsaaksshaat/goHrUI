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
        $scope.entity = {}
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 481;
        // $scope.page = $rootScope.createPage(); 0
        console.log($scope.page)

        $scope.getPageData = _getPageData;
        $scope.fromDate = moment().format('DD-MMM-YYYY')
        $scope.toDate = moment().format('DD-MMM-YYYY')

        var d = moment();
        var month = d.month();
        var year = d.year();
        $scope.month = month + 1;
        var startDate = moment([year, $scope.month - 1]);
        var endDate = moment(startDate).endOf('month');
        $scope.fromDate = moment(startDate).format('DD-MMM-YYYY')
        $scope.toDate = moment(endDate).format('DD-MMM-YYYY')

        console.log(startDate.toDate());
        console.log(endDate.toDate());
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
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: true,
            filterOnChange: null,
            showDataOnLoad: true,
            // currentState: 'configuration.company.locations.location'
        }
        // $scope.page.searchList.push({ field: 'AMSTIsVarified', operand: '=', value: true })
        $scope.page.searchList.push({
            field: 'RODFromDate',
            operand: '>=',
            value: moment($scope.fromDate).format('YYYY-MM-DD')
        })
        $scope.page.searchList.push({
            field: 'RODFromDate',
            operand: '<=',
            value: moment($scope.toDate).format('YYYY-MM-DD')
        })
        $scope.page.searchList.push({
            field: 'RODEmpId',
            operand: '<=',
            value: 5
            // value: $scope.user.profile.empId
        })

        // function _loadController() {
        //     pageService.getPagData($scope.page.pageId).then(function success(result) {
        //         console.log(result)
        //     }, function error() {

        //     })
        // }

        // _loadController();

        function _getPageData() {
            console.log('get page data')
            $scope.page.searchList = [];
            $scope.page.searchList.push({
                field: 'RODFromDate',
                operand: '>=',
                value: moment($scope.fromDate).format('YYYY-MM-DD')
            })
            $scope.page.searchList.push({
                field: 'RODFromDate',
                operand: '<=',
                value: moment($scope.toDate).format('YYYY-MM-DD')
            })
            $scope.page.searchList.push({
                field: 'RODEmpId',
                operand: '<=',
                value: $rootScope.user.profile.empId
                // value: $scope.user.profile.empId
            })
            $scope.page.refreshData()
        }
    }
})();