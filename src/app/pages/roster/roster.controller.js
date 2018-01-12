/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster')
        .controller('RosterPageCtrl', RosterPageCtrl);

    /** @ngInject */
    function RosterPageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService, dialogModal) {


        $scope.roasterPage = false;
        $scope.entity = {};
        var pageId = 481;

        $scope.saveRoster = _save;
        $scope.closeForm = _closeForm;



        $scope.page = $scope.createPage();
        $scope.page.pageId = 481;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: false,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: _addRecord,
            editRecord: _editRecord,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: false,
            filterOnChange: null,
            // pageResult: _pageResult
        }

        function _addRecord() {
            $scope.entity = {};
            $scope.oldEntity = {};
            $scope.roasterPage = true;
            $scope.addRecord = true;
            // var param = {
            //     page: $scope.page
            // }
            // var options = {
            //     url: "app/pages/roster/rostermodal.html",
            //     controller: "RosterModalPageCtrl",
            //     controllerAs: "",
            //     param: param
            // }
            // dialogModal.open(options)
        }
        function _editRecord(row) {
            $scope.roasterPage = true;
            $scope.page.showEditForm = true;
            $scope.addRecord = false;
            row.entity.RODFromDate = moment(row.entity.RODFromDate).format("DD-MM-YYYY");
            row.entity.RODToDate = moment(row.entity.RODToDate).format("DD-MM-YYYY");
            $scope.entity = row.entity;
            $scope.oldEntity = angular.copy($scope.entity)
        }
        function _closeForm() {
            $scope.roasterPage = false;
            $scope.page.refreshData();
        }

        function _validate(entity, oldEntity) {

            // var equal = angular.equals(entity, oldEntity);
            // if (equal) {
            //     $scope.showMsg("info", "Nothing To Save");
            //     return false;
            // }
            if (entity.RODEmpId == undefined) {
                $scope.showMsg("error", "Please Select Employee");
                return false;
            }
            if (entity.RODWeekOffSetId == undefined) {
                $scope.showMsg("error", "Please Select WeekOff Set");
                return false;
            }
            if (entity.RODFromDate == undefined) {
                $scope.showMsg("error", "Please Select From Date");
                return false;
            }
            if (entity.RODToDate == undefined) {
                $scope.showMsg("error", "Please Select To Date");
                return false;
            }
            var currentDate = moment();
            var fromDate = moment(entity.RODFromDate)
            var toDate = moment(entity.RODToDate);
            var valiDate = toDate.isSameOrAfter(fromDate);
            if (!valiDate) {
                $scope.showMsg("error", "To Date Less Than Or Equal To From Date");
                return false;
            }
            if (currentDate.format('YYYY') != fromDate.format('YYYY')) {
                $scope.showMsg("error", "From Date Should Be Current Year");
                return false;
            }
            if (currentDate.format('YYYY') != toDate.format('YYYY')) {
                $scope.showMsg("error", "To Date Should Be Current Year");
                return false;
            }

            return true;

        }

        function _saveRoster(entity) {
            var searchLists = [];
            var searchListData = {
                field: 'RODEmpId',
                operand: '=',
                value: entity.RODEmpId
            }
            searchLists.push(searchListData)
            searchListData = {
                field: 'RODWeekOffSetId',
                operand: '=',
                value: entity.RODWeekOffSetId
            }
            searchLists.push(searchListData)
            searchListData = {
                field: 'RODShiftId',
                operand: '=',
                value: entity.RODShiftId
            }
            searchLists.push(searchListData)
            searchListData = {
                field: 'RODFromDate',
                operand: '=',
                value: entity.RODFromDate
            }
            searchLists.push(searchListData)

            searchListData = {
                field: 'RODToDate',
                operand: '=',
                value: entity.RODToDate
            }
            searchLists.push(searchListData)

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 610).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

        }
        function _getCustomQuerySuccessResult(result) {
           
            $scope.roasterPage = false;
            $scope.page.refreshData();
            $scope.showMsg("success", "New Roaster Added Successfully");
        }
        function _getCustomQueryErrorResult(err) {

        }
        function _save(entity, editForm) {
            // if (!angular.equals(entity, $scope.oldEntity)) {
            if (_validate(entity, $scope.oldEntity)) {

                if ($scope.addRecord) {
                    _saveRoster(entity);
                }
                else {
                    editFormService.saveForm(pageId, entity, $scope.oldEntity,
                        entity.RODId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
                        .then(_saveSuccessResult, _saveErrorResult)
                }
            }
            // }
            // else {
            //     $scope.showMsg("info", "Nothing To Save");
            // }
        }
        function _saveSuccessResult(result) {
            console.log(result);
            if (result.success_message == "Added New Record." || result.success_message == "Record Updated.") {
                $scope.roasterPage = false;
                $scope.page.refreshData();
                $scope.showMsg("success", result.success_message);

            }
        }
        function _saveErrorResult(err) {

        }
        function _loadController() {

        }
        _loadController();
    }
})();
