/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('leaveVerificationController', leaveVerificationController);

    /** @ngInject */
    function leaveVerificationController($scope, $rootScope, pageService, param) {


        $scope.pendingLeave = true;
        $scope.pendingCompOff = true;
        $scope.isPedning = true;
        $scope.saveClose = _saveClose;
        $scope.next = _next;
        $scope.leavePending = _leavePending
        $scope.leaveOnhold = _leaveOnhold;
        $scope.pedingLeaveVerify = _pedingLeaveVerify;
        $scope.pendingLeaveOnhold = _pendingLeaveOnhold;
        $scope.pendingLeaveReject = _pendingLeaveReject;
        $scope.onholdLeaveVerify = _onholdLeaveVerify;
        $scope.onholdLeaveReject = _onholdLeaveReject;
        $scope.pendingCompOffVerify = _pendingCompOffVerify;
        $scope.pendingCompOffOnhold = _pendingCompOffOnhold;
        $scope.pendingCompOffReject = _pendingCompOffReject;
        $scope.onholdCompOffVerify = _onholdCompOffVerify;
        $scope.onholdCompOffReject = _onholdCompOffReject;



        function _leavePending() {
            $scope.value = 1;
            $scope.isRowSelected = false;
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
                    $scope.isRowSelected = false;
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

        function _next(statusId) {

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
            searchLists.push({ field: 'statusId', operand: '=', value: statusId })
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
                    $scope.gridCompOffOptions.data = [];
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
                    $scope.compOffSelectedRows = gridApi.selection.getSelectedRows();
                }
                else {
                    $scope.isCompOffRowSelected = false;
                }

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.compOffSelectedRows = gridApi.selection.getSelectedRows();
                if ($scope.compOffSelectedRows.length > 0) {
                    $scope.isCompOffRowSelected = true;
                }
                else {
                    $scope.isCompOffRowSelected = false;
                }
            });
        }

        function _pedingLeaveVerify() {
            _saveMultiRows($scope.selectedRows, 49, "Verified")
        }
        function _pendingLeaveOnhold() {
            _saveMultiRows($scope.selectedRows, 47, "Onhold")
        }
        function _pendingLeaveReject() {
            _saveMultiRows($scope.selectedRows, 48, "Rejected")
        }
        function _onholdLeaveVerify() {
            _saveMultiRows($scope.selectedRows, 49, "Verified")
        }
        function _onholdLeaveReject() {
            _saveMultiRows($scope.selectedRows, 48, "Rejected")
        }

        function _pendingCompOffVerify() {
            _saveMultiRows($scope.compOffSelectedRows, 75, "Verified")
        }
        function _pendingCompOffOnhold() {
            _saveMultiRows($scope.compOffSelectedRows, 73, "Onhold")
        }
        function _pendingCompOffReject() {
            _saveMultiRows($scope.compOffSelectedRows, 74, "Rejected")
        }
        function _onholdCompOffVerify() {
            _saveMultiRows($scope.compOffSelectedRows, 75, "Verified")
        }
        function _onholdCompOffReject() {
            _saveMultiRows($scope.compOffSelectedRows, 74, "Rejected")
        }


        function _saveMultiRows(rows, statusId, comment) {
            $scope.multi = {
                parentRows: [],
                delRecords: []
            };
            if ($scope.value == 1) {
                angular.forEach(rows, function (leave) {
                    var entity = {
                        ELSDId: leave.ELSDId == null ? undefined : leave.ELSDId,
                        ELSDELAId: leave.LEADId,
                        ELSDSanctionFromDate: leave.LEADDateFrom,
                        ELSDSanctionToDate: leave.LEADDateTo,
                        ELSDSanctionApplyDate: leave.CreatedOn,
                        StatusId: statusId,
                        ELSDComment: comment,
                        ELSDSanctionLeaveDate: moment().toDate()
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: entity,
                        oldEntity: {},
                        action: leave.ELSDId == null ? "create" : "edit",
                        tableid: 295,
                        pageid: 285
                    }
                    $scope.multiEntity.child = [];
                    $scope.multi.parentRows.push($scope.multiEntity);
                })
            }
            else {
                angular.forEach(rows, function (compoff) {
                    var entity = {
                        ACODId: compoff.ACODId == null ? undefined : compoff.ACODId,
                        ACODCOId: compoff.COId,
                        ACODReson: comment,
                        StatusId: statusId,
                        ACODIsApplyHalfDay: compoff.COIsApplyHalfDay,
                        ACODIsApplyFullDay: compoff.COIsApplyFullDay,
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: entity,
                        oldEntity: {},
                        action: compoff.ACODId == null ? "create" : "edit",
                        tableid: 448,
                        pageid: 466
                    }
                    $scope.multiEntity.child = [];
                    $scope.multi.parentRows.push($scope.multiEntity);
                })
            }

            var postData = JSON.stringify($scope.multi);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }
            //   $scope.multiEntity.lz = false

            pageService.multiSaveRows(data).then(function (result) {
                if (result.success_message == "success") {
                    if (comment == "Verified") {
                        $scope.showMsg("success", "Verified Successfully");
                    }
                    else if (comment == "Onhold") {
                        $scope.showMsg("success", "OnHold Successfully");
                    }
                    else {
                        $scope.showMsg("success", "Rjected Successfully");
                    }
                    if ($scope.value == 1) {
                        _loadController(0);
                    }
                    else {
                        _next(0)
                    }
                }

            }, function (err) {
                console.log(err)
            })
        }


        function _saveClose() {

            $scope.modalInstance.close("success");

        }
        _loadController();
    }
})();

