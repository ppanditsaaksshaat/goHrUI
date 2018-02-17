/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster')
        .controller('RosterPlanPageCtrl', RosterPlanPageCtrl);

    /** @ngInject */
    function RosterPlanPageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService, dialogModal) {


        $scope.roasterPlanPage = false;
        $scope.entity = {};
        var pageId = 482;

        $scope.saveRosterPlan = _save;
        $scope.closeForm = _closeForm;



        $scope.page = $scope.createPage();
        $scope.page.pageId = 482;
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
            $scope.roasterPlanPage = true;
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
            $scope.roasterPlanPage = true;
            $scope.page.showEditForm = true;
            $scope.addRecord = false;
            row.entity.RPDFromDate = moment(row.entity.RPDFromDate).format("DD-MM-YYYY");
            row.entity.RPDToDate = moment(row.entity.RPDToDate).format("DD-MM-YYYY");
            $scope.entity = row.entity;
            $scope.oldEntity = angular.copy($scope.entity)
        }
        function _closeForm() {
            $scope.roasterPlanPage = false;
            $scope.page.refreshData();
        }

        function _validate(entity, oldEntity) {

            if (entity.RPDPlanName == undefined) {
                $scope.showMsg("error", "Please Enter Plan Name");
                return false;
            }

            if (entity.RPDShiftId == undefined) {
                $scope.showMsg("error", "Please Select Shift");
                return false;
            }
            if (entity.RPDWeekOffSetId == undefined) {
                $scope.showMsg("error", "Please Select WeekOff Set");
                return false;
            }
            if (entity.RPDFromDate == undefined) {
                $scope.showMsg("error", "Please Select From Date");
                return false;
            }
            if (entity.RPDToDate == undefined) {
                $scope.showMsg("error", "Please Select To Date");
                return false;
            }
            // var currentDate = moment();
            // var fromDate = moment(entity.RPDFromDate)
            // var toDate = moment(entity.RPDToDate);
            // var valiDate = toDate.isSameOrAfter(fromDate);
            // if (!valiDate) {
            //     $scope.showMsg("error", "To Date Less Than Or Equal To From Date");
            //     return false;
            // }
            // if (currentDate.format('YYYY') != fromDate.format('YYYY')) {
            //     $scope.showMsg("error", "From Date Should Be Current Year");
            //     return false;
            // }
            // if (currentDate.format('YYYY') != toDate.format('YYYY')) {
            //     $scope.showMsg("error", "To Date Should Be Current Year");
            //     return false;
            // }

            return true;

        }

        function _save(entity, editForm) {
            // if (!angular.equals(entity, $scope.oldEntity)) {
            if (_validate(entity, $scope.oldEntity)) {
                    editFormService.saveForm(pageId, entity, $scope.oldEntity,
                    entity.RPDId == undefined ? "create" : "edit", $scope.page.pageinfo.title, editForm, true)
                    .then(_saveSuccessResult, _saveErrorResult)

            }
        }
        function _saveSuccessResult(result) {
            console.log(result);
            if (result.success_message == "Added New Record." || result.success_message == "Record Updated.") {
                $scope.roasterPlanPage = false;
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
