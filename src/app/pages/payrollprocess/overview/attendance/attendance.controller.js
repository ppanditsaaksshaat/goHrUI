/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('attendanceVerificationController', attendanceVerificationController);

    /** @ngInject */
    function attendanceVerificationController($scope, $rootScope, pageService, param) {

        $scope.pendingAdustment = true;
        $scope.pendingOutDuty = true;
        $scope.pendingWFH = true;
        $scope.saveClose = _saveClose;
        $scope.adjustMentPending = _adjustMentPending;
        $scope.adustimentOnhold = _adustimentOnhold;
        $scope.outDutyPending = _outDutyPending;
        $scope.outDutyOnhold = _outDutyOnhold;
        $scope.wfhPending = _wfhPending;
        $scope.wfhOnhold = _wfhOnhold;
        $scope.pedingAdustmentVerify = _pedingAdustmentVerify;
        $scope.pendingAdustmentOnhold = _pendingAdustmentOnhold;
        $scope.pendingAdustmentReject = _pendingAdustmentReject;
        $scope.onholdAdustmentVerify = _onholdAdustmentVerify;
        $scope.onholdAdustmentReject = _onholdAdustmentReject;

        $scope.pendingOutDutyVerify = _pendingOutDutyVerify;
        $scope.pendingOutDutyOnhold = _pendingOutDutyOnhold;
        $scope.pendingOutDutyReject = _pendingOutDutyReject;
        $scope.onholdOutDutyVerify = _onholdOutDutyVerify;
        $scope.onholdOutDutyReject = _onholdOutDutyReject;

        $scope.pendingWFHVerify = _pendingWFHVerify;
        $scope.pendingWFHOnhold = _pendingWFHOnhold;
        $scope.pendingWFHReject = _pendingWFHReject;
        $scope.onholdWFHVerify = _onholdWFHVerify;
        $scope.onholdWFHReject = _onholdWFHReject;



        function _adjustMentPending() {
            $scope.value = 1;
            $scope.isAdustmentRowSelected = false;
            _loadController(0)
        }
        function _adustimentOnhold() {
            _loadController(113)
        }
        function _outDutyPending() {
            $scope.value = 2;
            _outDutyOnLoad(0);
        }
        function _outDutyOnhold() {
            _outDutyOnLoad(86);
        }
        function _wfhPending() {
            $scope.value = 3;
            _wfhOnLoad(0);
        }
        function _wfhOnhold() {
            _wfhOnLoad(106);
        }

        $scope.gridAdustmentOptions = {
            enableSelectAll: true,
            rowHeight: 40,
            onRegisterApi: _onAdustmentGridRegisterApi,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                { name: 'ARDFromDate', displayName: 'Adustment Date', width: 130, enableCellEdit: false },
                { name: 'ARDInTime', displayName: 'InTime', width: 120, enableCellEdit: false },
                { name: 'ARDOutTime', displayName: 'OutTime', width: 120, enableCellEdit: false },
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
            searchLists.push({ field: 'type', operand: '=', value: 'adjustment' })
            searchLists.push({ field: 'month', operand: '=', value: param.month })
            searchLists.push({ field: 'year', operand: '=', value: param.year })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allAdustments = result[0];
                    angular.forEach($scope.allAdustments, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.ARDFromDate = moment(data.ARDFromDate).format('DD-MMM-YYYY');
                        data.LEADDateTo = moment(data.LEADDateTo).format('DD-MMM-YYYY');
                        data.ARDInTime = moment(data.ARDInTime).format('HH:mm');
                        data.ARDOutTime = moment(data.ARDOutTime).format('HH:mm');
                    })

                    $scope.gridAdustmentOptions.data = $scope.allAdustments;
                    $scope.noDataFoundForAdustment = false;
                }
                else {
                    $scope.isAdustmentRowSelected = false;
                    $scope.noDataFoundForAdustment = true;
                    $scope.gridAdustmentOptions.data = [];
                }
            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _onAdustmentGridRegisterApi(gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.isAdustmentRowSelected = true;
                    $scope.adustmentSelectedRows = gridApi.selection.getSelectedRows();
                }
                else {
                    $scope.isAdustmentRowSelected = false;
                }

            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                $scope.adustmentSelectedRows = gridApi.selection.getSelectedRows();
                if ($scope.adustmentSelectedRows.length > 0) {
                    $scope.isAdustmentRowSelected = true;
                }
                else {
                    $scope.isAdustmentRowSelected = false;
                }
            });
        }

        function _outDutyOnLoad(statusId) {


            $scope.isCompOffRowSelected = false;
            $scope.gridOutDutyOptions = {
                enableSelectAll: true,
                rowHeight: 40,
                onRegisterApi: _onOutDutyGridRegisterApi,
                columnDefs: [
                    { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                    { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                    { name: 'FDAFromDate', displayName: 'From', width: 120, enableCellEdit: false },
                    { name: 'FDAToDate', displayName: 'To', width: 120, enableCellEdit: false },
                    { name: 'FADInTime', displayName: 'InTime', width: 120, enableCellEdit: false },
                    { name: 'FDAOutTime', displayName: 'OutTime', width: 120, enableCellEdit: false },
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
            searchLists.push({ field: 'type', operand: '=', value: 'outduty' })
            searchLists.push({ field: 'month', operand: '=', value: param.month })
            searchLists.push({ field: 'year', operand: '=', value: param.year })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getOutDutySuccessResult, _getOutDutyErrorResult)
            function _getOutDutySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allOutDutys = result[0];
                    angular.forEach($scope.allOutDutys, function (data) {
                        data.FDAFromDate = moment(data.FDAFromDate).format('DD-MMM-YYYY');
                        data.FDAToDate = moment(data.FDAToDate).format('DD-MMM-YYYY');
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.FADInTime = moment(data.FADInTime).format('HH:mm');
                        data.FDAOutTime = moment(data.FDAOutTime).format('HH:mm');
                    })
                    $scope.noDataFoundForOutDuty = false;
                    $scope.gridOutDutyOptions.data = $scope.allOutDutys;
                }
                else {
                    $scope.isOutDutyRowSelected = false;
                    $scope.noDataFoundForOutDuty = true;
                    $scope.gridOutDutyOptions.data = [];
                }
            }
            function _getOutDutyErrorResult(err) {

            }

            function _onOutDutyGridRegisterApi(gridApi) {
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $scope.isOutDutyRowSelected = true;
                        $scope.onholdSelectedRows = gridApi.selection.getSelectedRows();
                    }
                    else {
                        $scope.isOutDutyRowSelected = false;
                    }

                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                    $scope.onholdSelectedRows = gridApi.selection.getSelectedRows();
                    if ($scope.onholdSelectedRows.length > 0) {
                        $scope.isOutDutyRowSelected = true;
                    }
                    else {
                        $scope.isOutDutyRowSelected = false;
                    }
                });
            }
        }
        function _wfhOnLoad(statusId) {
            $scope.isWFHRowSelected = false;
            $scope.gridWfhOptions = {
                enableSelectAll: true,
                rowHeight: 40,
                onRegisterApi: _onWFHGridRegisterApi,
                columnDefs: [
                    { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                    { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                    { name: 'WFHFromDate', displayName: 'From', width: 120, enableCellEdit: false },
                    { name: 'WFHToDate', displayName: 'To', width: 120, enableCellEdit: false },
                    { name: 'WFHInTime', displayName: 'InTime', width: 120, enableCellEdit: false },
                    { name: 'WFHOutTime', displayName: 'OutTime', width: 120, enableCellEdit: false },
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
            searchLists.push({ field: 'type', operand: '=', value: 'WFH' })
            searchLists.push({ field: 'month', operand: '=', value: param.month })
            searchLists.push({ field: 'year', operand: '=', value: param.year })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getWFHCustomQuerySuccessResult, _getWFHCustomQueryErrorResult)
            function _getWFHCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allWFHs = result[0];
                    angular.forEach($scope.allWFHs, function (data) {
                        data.WFHFromDate = moment(data.WFHFromDate).format('DD-MMM-YYYY');
                        data.WFHToDate = moment(data.WFHToDate).format('DD-MMM-YYYY');
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.WFHInTime = moment(data.WFHInTime).format('HH:mm');
                        data.WFHOutTime = moment(data.WFHOutTime).format('HH:mm');
                    })
                    $scope.noDataFoundForWFH = false;
                    $scope.gridWfhOptions.data = $scope.allWFHs;
                }
                else {
                    $scope.isWFHRowSelected = false;
                    $scope.noDataFoundForWFH = true;
                    $scope.gridCompOffOptions.data = [];
                }


            }
            function _getWFHCustomQueryErrorResult(err) {
                console.log(err);
            }
            function _onWFHGridRegisterApi(gridApi) {
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    if (row.isSelected) {
                        $scope.isWFHRowSelected = true;
                        $scope.wfhSelectedRows = gridApi.selection.getSelectedRows();
                    }
                    else {
                        $scope.isWFHRowSelected = false;
                    }

                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (row) {
                    $scope.wfhSelectedRows = gridApi.selection.getSelectedRows();
                    if ($scope.wfhSelectedRows.length > 0) {
                        $scope.isWFHRowSelected = true;
                    }
                    else {
                        $scope.isWFHRowSelected = false;
                    }
                });
            }


        }


        function _pedingAdustmentVerify() {
            _saveMultiRows($scope.adustmentSelectedRows, 114, "Verified")
        }
        function _pendingAdustmentOnhold() {
            _saveMultiRows($scope.adustmentSelectedRows, 115, "Onhold")
        }
        function _pendingAdustmentReject() {
            _saveMultiRows($scope.adustmentSelectedRows, 116, "Rejected")
        }
        function _onholdAdustmentVerify() {
            _saveMultiRows($scope.adustmentSelectedRows, 114, "Verified")
        }
        function _onholdAdustmentReject() {
            _saveMultiRows($scope.adustmentSelectedRows, 116, "Rejected")
        }


        function _pendingOutDutyVerify() {
            _saveMultiRows($scope.onholdSelectedRows, 87, "Verified")
        }
        function _pendingOutDutyOnhold() {
            _saveMultiRows($scope.onholdSelectedRows, 89, "Onhold")
        }
        function _pendingOutDutyReject() {
            _saveMultiRows($scope.onholdSelectedRows, 88, "Rejected")
        }
        function _onholdOutDutyVerify() {
            _saveMultiRows($scope.onholdSelectedRows, 87, "Verified")
        }
        function _onholdOutDutyReject() {
            _saveMultiRows($scope.onholdSelectedRows, 88, "Rejected")
        }


        function _pendingWFHVerify() {
            _saveMultiRows($scope.wfhSelectedRows, 108, "Verified")
        }
        function _pendingWFHOnhold() {
            _saveMultiRows($scope.wfhSelectedRows, 109, "Onhold")
        }
        function _pendingWFHReject() {
            _saveMultiRows($scope.wfhSelectedRows, 110, "Rejected")
        }
        function _onholdWFHVerify() {
            _saveMultiRows($scope.wfhSelectedRows, 108, "Verified")
        }
        function _onholdWFHReject() {
            _saveMultiRows($scope.wfhSelectedRows, 110, "Rejected")
        }



        function _saveMultiRows(rows, statusId, comment) {
            $scope.multi = {
                parentRows: [],
                delRecords: []
            };
            if ($scope.value == 1) {
                angular.forEach(rows, function (adjustment) {
                    var entity = {
                        AARDId: adjustment.AARDId == null ? undefined : adjustment.AARDId,
                        AARDARDId: adjustment.ARDId,
                        AARDFromDate: adjustment.ARDFromDate,
                        AARDToDate: adjustment.ARDToDate,
                        AARDInTime: adjustment.ARDInTime,
                        AARDOutTime: adjustment.ARDOutTime,
                        StatusId: statusId,
                        AARDAdminComment: comment,
                        AARDEmpId: adjustment.EmpId,
                        AARDIsManual: adjustment.IsManual
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: entity,
                        oldEntity: {},
                        action: adjustment.AARDId == null ? "create" : "edit",
                        tableid: 506,
                        pageid: 503
                    }
                    $scope.multiEntity.child = [];
                    $scope.multi.parentRows.push($scope.multiEntity);
                })
            }
            else if ($scope.value == 2) {
                angular.forEach(rows, function (outDuty) {
                    var entity = {
                        AFDADId: outDuty.AFDADId == null ? undefined : outDuty.AFDADId,
                        AFDADFDAId: outDuty.FDAId,
                        AFDADFDAFromDate: outDuty.FDAFromDate,
                        AFDADFDAToDate: outDuty.FDAToDate,
                        AFDADFADInTime: outDuty.FADInTime,
                        AFDADFDAOutTime: outDuty.FDAOutTime,
                        StatusId: statusId,
                        AFDADRemark: comment
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: entity,
                        oldEntity: {},
                        action: outDuty.AFDADId == null ? "create" : "edit",
                        tableid: 450,
                        pageid: 468
                    }
                    $scope.multiEntity.child = [];
                    $scope.multi.parentRows.push($scope.multiEntity);
                })
            }
            else if ($scope.value == 3) {
                angular.forEach(rows, function (wfh) {
                    var entity = {
                        WAFHId: wfh.WAFHId == null ? undefined : wfh.WAFHId,
                        WAFHWFHId: wfh.WFHId,
                        WAFHInTime: wfh.WFHInTime,
                        WAFHOutTime: wfh.WFHOutTime,
                        WAFHFromDate: wfh.WFHFromDate,
                        WAFHToDate: wfh.WFHToDate,
                        StatusId: statusId,
                        WAFHAdminReson: comment
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: entity,
                        oldEntity: {},
                        action: wfh.WAFHId == null ? "create" : "edit",
                        tableid: 504,
                        pageid: 501
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
                    else if ($scope.value == 2) {
                        _outDutyOnLoad(0);
                    }
                    else if ($scope.value == 3) {
                        _wfhOnhold(0);
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

