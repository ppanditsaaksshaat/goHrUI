/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('leaveAndAttendanceStatusController', leaveAndAttendanceStatusController);

    /** @ngInject */
    function leaveAndAttendanceStatusController($scope, $rootScope, pageService, param) {


        $scope.pendingLeave = true;
        $scope.pendingCompOff = true;

        $scope.SaveClose = _saveClose;
        $scope.next = _next;
        $scope.leavePending = _leavePending
        $scope.leaveOnhold = _leaveOnhold;

        function _leaveVerify() {

        }
        function _leavePending() {
            _loadController(0)
        }
        function _leaveOnhold() {
            _loadController(53)
        }
        $scope.gridLeaveOptions = {
            enableSelectAll: true,
            rowHeight: 40,
            onRegisterApi: _onGridRegisterApi,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                { name: 'LEADDateFrom', displayName: 'From', width: 120, enableCellEdit: false },
                { name: 'LEADDateTo', displayName: 'To', width: 120, enableCellEdit: false },
                { name: 'CreatedOn', displayName: 'Request On', width: 120, enableCellEdit: false },
                { name: 'HeadEmpName', displayName: 'Apporver', width: 120, enableCellEdit: false },
                {
                    name: 'Status', displayName: 'Status', width: 100, enableCellEdit: false

                }
            ],
        }


        function _loadController(statusId) {
            if (statusId == undefined) {
                statusId = 0;
            }

            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: statusId })
            searchLists.push({ field: 'month', operand: '=', value: param.month })
            searchLists.push({ field: 'year', operand: '=', value: param.year })
            searchLists.push({ field: 'type', operand: '=', value: 'Leave' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allLeaves = result[0];
                    angular.forEach($scope.allLeaves, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.LEADDateFrom = moment(data.LEADDateFrom).format('DD-MMM-YYYY');
                        data.LEADDateTo = moment(data.LEADDateTo).format('DD-MMM-YYYY');
                    })

                    $scope.gridLeaveOptions.data = $scope.allLeaves;
                    $scope.noDataFoundForLeave = false;
                }
                else {
                    $scope.noDataFoundForLeave = true;
                    $scope.gridLeaveOptions.data = [];
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _onGridRegisterApi(gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.isRowSelected = true;
                    $scope.selectedRows = gridApi.selection.getSelectedRows();
                }
                else {
                    $scope.isRowSelected = false;
                }

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.selectedRows = gridApi.selection.getSelectedRows();
                if ($scope.selectedRows.length > 0) {
                    $scope.isRowSelected = true;
                }
                else {
                    $scope.isRowSelected = false;
                }
            });



        }

        function _next() {
            $scope.value = 2;
            $scope.isCompOffRowSelected = false;
            $scope.gridCompOffOptions = {
                enableSelectAll: true,
                rowHeight: 40,
                onRegisterApi: _onGridRegisterApiCompOff,
                columnDefs: [
                    { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                    { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                    { name: 'COAttnDate', displayName: 'CompDate', width: 120, enableCellEdit: false },
                    { name: 'COTimeIn', displayName: 'InTime', width: 120, enableCellEdit: false },
                    { name: 'COTimeOut', displayName: 'OutTime', width: 120, enableCellEdit: false },
                    { name: 'CreatedOn', displayName: 'Request On', width: 120, enableCellEdit: false },
                    { name: 'HeadEmpName', displayName: 'Apporver', width: 120, enableCellEdit: false },
                    {
                        name: 'Status', displayName: 'Status', width: 100, enableCellEdit: false
                    }
                ],
            }
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 0 })
            searchLists.push({ field: 'month', operand: '=', value: param.month })
            searchLists.push({ field: 'year', operand: '=', value: param.year })
            searchLists.push({ field: 'type', operand: '=', value: 'Compoff' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allCompOffs = result[0];
                    angular.forEach($scope.allCompOffs, function (data) {
                        data.COAttnDate = moment(data.COAttnDate).format('DD-MMM-YYYY');
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.COTimeIn = moment(data.COTimeIn).format('HH:mm');
                        data.COTimeOut = moment(data.COTimeOut).format('HH:mm');
                    })
                    $scope.noDataFoundForCompOff = false;
                    $scope.gridCompOffOptions.data = $scope.allCompOffs;
                }
                else {
                    $scope.noDataFoundForCompOff = true;
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }

        }

        function _onGridRegisterApiCompOff(gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.isCompOffRowSelected = true;
                    $scope.selectedRows = gridApi.selection.getSelectedRows();
                }
                else {
                    $scope.isCompOffRowSelected = false;
                }

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.selectedRows = gridApi.selection.getSelectedRows();
                if ($scope.selectedRows.length > 0) {
                    $scope.isCompOffRowSelected = true;
                }
                else {
                    $scope.isCompOffRowSelected = false;
                }
            });
        }
        function _saveClose() {

            $scope.value = 2;
            $scope.$dismiss();
        }
        _loadController();
    }
})();

