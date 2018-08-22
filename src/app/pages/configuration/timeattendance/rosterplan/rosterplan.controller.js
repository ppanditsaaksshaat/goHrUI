/**
 * @author NKM
 * created on 18.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.timeattendance.rosterplan')
        .controller('rosterplanController', rosterplanController);

    /** @ngInject */
    function rosterplanController($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService, dialogModal) {


        $scope.roasterPage = false;
        $scope.entity = {};
        var pageId = 481;

        $scope.saveRoster = _save;
        $scope.closeForm = _closeForm;
        $scope.planOnChange = _planOnChange;



        $scope.page = $rootScope.createPage();
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
            $scope.planDetail = false;
            $scope.page.refreshData();
        }
        function _planOnChange(plan) {
            console.log(plan)
            $scope.planDetail = true;
            $scope.entity.RODShiftId = plan.RPDShiftId;
            $scope.entity.RODWeekOffSetId = plan.RPDWeekOffSetId;
            $scope.entity.RODFromDate = angular.copy(moment(plan.RPDFromDate).format("DD-MMM-YYYY"));
            $scope.entity.RODToDate = angular.copy(moment(plan.RPDToDate).format("DD-MMM-YYYY"));


            console.log($scope.entity.plan)

        }

        function _validate(entity, oldEntity) {


            if (entity.RODEmpId == undefined) {
                $rootScope.showMsg("error", "Please Select Employee");
                return false;
            }
            if (entity.RODShiftId == undefined) {
                $rootScope.showMsg("error", "Please Select Shift");
                return false;
            }
            if (entity.RODFromDate == undefined) {
                $rootScope.showMsg("error", "Please Select From Date");
                return false;
            }
            if (entity.RODToDate == undefined) {
                $rootScope.showMsg("error", "Please Select To Date");
                return false;
            }
            if (entity.RODWeekOffSetId == undefined) {
                $rootScope.showMsg("error", "Please Select WeekOff Set");
                return false;
            }
            var currentDate = moment();
            var fromDate = moment(entity.RODFromDate)
            var toDate = moment(entity.RODToDate);
            var valiDate = toDate.isSameOrAfter(fromDate);
            if (!valiDate) {
                $rootScope.showMsg("error", "To Date Less Than Or Equal To From Date");
                return false;
            }
            // if (currentDate.format('YYYY') != fromDate.format('YYYY')) {
            //     $rootScope.showMsg("error", "From Date Should Be Current Year");
            //     return false;
            // }
            // if (currentDate.format('YYYY') != toDate.format('YYYY')) {
            //     $rootScope.showMsg("error", "To Date Should Be Current Year");
            //     return false;
            // }

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

            // searchListData = {
            //     field: 'RODRosterPlanId',
            //     operand: '=',
            //     value: entity.plan.value
            // }
            // searchLists.push(searchListData)


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
            $rootScope.showMsg("success", "New Roaster Added Successfully");
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
            //     $rootScope.showMsg("info", "Nothing To Save");
            // }
        }
        function _saveSuccessResult(result) {
            console.log(result);
            if (result.success_message == "Added New Record." || result.success_message == "Record Updated.") {
                $scope.roasterPage = false;
                $scope.page.refreshData();
                $rootScope.showMsg("success", result.success_message);

            }
        }
        function _saveErrorResult(err) {

        }
        function _loadController() {

        }
        _loadController();
    }
})();