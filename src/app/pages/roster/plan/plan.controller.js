/**
 * @author Pardeep Pandit
 * created on 06.03.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster')
        .controller('RosterPlanPageCtrl', RosterPlanPageCtrl);

    /** @ngInject */
    function RosterPlanPageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService,
        pageService, dialogModal) {


        $scope.roasterPlanPage = false;
        $scope.entity = {};
        var pageId = 482;
        var weekOffSetQueryId = 551;
        var viewEmployeeQueryId = 523;
        var rosterPlanDetailTableId = 478;
        var rosterPlanDetailPageId = 486;
        var rosterShiftDetailTableId = 479;
        var rosterShiftDetailPageId = 487;

        $scope.saveRosterPlan = _saveRosterPlan;
        $scope.closeForm = _closeForm;
        $scope.saveEmployee = _saveEmployee;
        $scope.addShift = _addShift;
        $scope.onChangeDepartment = _onChangeDepartment;
        $scope.weekList = _weekList;
        var selectedEmp = [];
        var unSelectedEmp = [];

        // $scope.entity.RPDRecurringWeek = 1;

        $scope.page = $scope.createPage();
        $scope.page.pageId = 485;
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
            $scope.entity = { RPRecurringWeek: 1, RPDurationForEachShift: 7 };
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
            var currentDate = moment();
            var fromDate = moment(entity.RPDFromDate)
            var toDate = moment(entity.RPDToDate);
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

        function _saveRosterPlan(entity) {
            $scope.multiEntity = {};
            $scope.multiEntity.parent = {
                newEntity: entity,
                oldEntity: {},
                action: $scope.entity.RPId == undefined ? 'create' : 'edit',
                tableid: $scope.page.pageinfo.tableid,
                pageid: $scope.page.pageinfo.pageid
            }
            $scope.multiEntity.child = [];
            var planDetailchild = {
                tableid: rosterPlanDetailTableId,
                pageid: rosterPlanDetailPageId,
                parentColumn: $scope.page.pageinfo.idencolname,
                linkColumn: 'RPDRPId',
                idenColName: "RPDId",
                rows: []
            }
            var rosterPlanDetail = [];
            for (var i = 0; i < $scope.weekOffSetList.length; i++) {
                var weekOff = $scope.weekOffSetList[i];
                var empIds = "";
                var rosterPlan = {};
                if (weekOff.selectedEmp.length > 0) {
                    angular.forEach(weekOff.selectedEmp, function (data) {
                        empIds += data.EmpId + ",";
                    })
                    if (empIds != "") {
                        empIds = empIds.substring(0, empIds.length - 1)
                    }
                    rosterPlan.RPDId = 0;
                    rosterPlan.RPDWeekOffSetId = weekOff.WOSId;
                    rosterPlan.RPDEmpIds = empIds;
                    // rosterPlanDetail.push(rosterPlan);
                }

                var shiftDetailChild = {
                    tableid: rosterShiftDetailTableId,
                    pageid: rosterShiftDetailPageId,
                    parentColumn: "RPDId",
                    linkColumn: 'RSDRPDId',
                    idenColName: 'RSDId',
                    rows: []
                }
                var count = 1;
                for (var j = 0; j < entity.RPRecurringWeek; j++) {
                    if (j > 0) {
                        count = count + entity.RPDurationForEachShift;
                    }
                    var rosterShift = {};
                    rosterShift.RSDId = 0;
                    rosterShift.RSDShiftId = weekOff[j].Id;
                    rosterShift.RSDDayFrom = (j == 0 ? 1 : count)
                    rosterShift.RSDDayTo = (entity.RPDurationForEachShift) * (j + 1);
                    shiftDetailChild.rows.push(rosterShift);
                }
                
                rosterPlan.child = [];

                rosterPlan.child.push(shiftDetailChild);
                planDetailchild.rows.push(rosterPlan);
                // $scope.multiEntity.child.push(planDetailchild);
            }
            //  planDetailchild.rows.push(rosterPlanDetail);
            console.log(planDetailchild)

            $scope.multiEntity.child.push(planDetailchild);
            console.log($scope.multiEntity)
            
            var postData = JSON.stringify($scope.multiEntity);
            var compressed = LZString.compressToEncodedURIComponent(postData);
            var data = { lz: true, data: compressed }

            // $scope.multiEntity.lz = false;
            pageService.multiSave(data).then(function (result) {
                console.log(result)
                if (result == "done") {
                    $scope.showMsg("success", "Record Saved Successfully");
                    $scope.showWeeklyOffList = false;
                    $scope.page.refreshData();
                }
            }, function (err) {
                console.log(err)
            })
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

        function _onChangeDepartment() {

            $scope.viewEmpList = angular.copy($scope.employeeList);
            $scope.currentWeekOffSet.selectedEmp = [];
        }
        function _loadController() {
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getCustomQuery(data, weekOffSetQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            pageService.getCustomQuery(data, viewEmployeeQueryId).then(_getViewEmployeeSuccessResult, _getViewEmployeeErrorResult)

        }
        function _getCustomQuerySuccessResult(result) {
            $scope.weekOffSetList = result;

        }
        function _getCustomQueryErrorResult(err) {

        }
        function _getViewEmployeeSuccessResult(result) {
            $scope.viewEmpList = result;
            $scope.employeeList = result;
        }
        function _getViewEmployeeErrorResult(err) {

        }

        function _saveEmployee(currentWeekOfSet) {
            var paramData = {
                empList: $scope.viewEmpList,
                deptId: $scope.entity.RPDeptId,
                currentWeek: currentWeekOfSet,
                callBack: _selectEmpCallBack
            }
            console.log(paramData)
            var options = {
                url: "app/pages/roster/plan/addEmployee.html",
                controller: "addRosterEmpController",
                controllerAs: "",
                param: paramData,
            }
            dialogModal.open(options)
        }

        function _selectEmpCallBack(empList, currentweekOfSet) {
            $scope.currentWeekOffSet = currentweekOfSet;
            unSelectedEmp = [];

            angular.forEach(empList, function (emp) {
                if (emp.checked) {
                    if (currentweekOfSet.selectedEmp == undefined) {
                        currentweekOfSet.selectedEmp = [emp];
                    }
                    else {
                        currentweekOfSet.selectedEmp.push(emp);
                    }
                }
                else {
                    unSelectedEmp.push(emp)
                }

            })
            // if (selectedEmp.length > 0) {
            //     currentweekOfSet.selectedEmp = selectedEmp;
            // }
            console.log(unSelectedEmp.length)
            if (unSelectedEmp.length >= 0) {
                $scope.viewEmpList = angular.copy(unSelectedEmp);
            }
        }
        function _addShift(recurring, weekOffSet) {
            var paramData = {
                weekOffSet: weekOffSet,
                recurring: recurring,
                callBack: _selectShiftCallBack
            }
            console.log(paramData)
            var options = {
                url: "app/pages/roster/plan/addShiftModal.html",
                controller: "shiftRosterController",
                controllerAs: "",
                param: paramData,
            }
            dialogModal.open(options)
        }
        function _selectShiftCallBack(weekOffSet, recurring, shiftName, shiftId) {
            weekOffSet[recurring] = {};
            weekOffSet[recurring].Name = shiftName;
            weekOffSet[recurring].Id = shiftId;
        }
        var WeekDays = [];
        function _weekList(days) {

            for (var i; i <= days; i++) {
                WeekDays.push({ day: i, dayName: 'MO' })
            }
            console.log(WeekDays)
            return WeekDays;
        }
        _loadController();
    }
})();
