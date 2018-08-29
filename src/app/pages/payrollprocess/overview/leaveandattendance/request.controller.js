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




        $scope.SaveContinue = _saveContinue;
        $scope.SaveClose = _saveClose;

        $scope.gridLeaveOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                { name: 'LEADDateFrom', displayName: 'From', width: 120, enableCellEdit: false },
                { name: 'LEADDateTo', displayName: 'To', width: 120, enableCellEdit: false },
                { name: 'CreatedOn', displayName: 'Request On', width: 120, enableCellEdit: false },
                { name: 'HeadEmpName', displayName: 'Apporver', width: 120, enableCellEdit: false },
                {
                    name: 'Status', displayName: 'Status', width: 100, enableCellEdit: false

                },
                {
                    name: 'Approve',
                    displayName: '-',
                    width: 100,
                    cellEditableCondition: false,
                    cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='cusotm btn btn-primary' uib-popover-template=\"'approve-reason-template'\" popover-placement='bottom-right' popover-is-open='' popover-trigger='outsideClick'  popover-append-to-body='true'>Approve</button>"

                },
                {
                    name: 'Rject',
                    displayName: '-',
                    width: 100,
                    cellEditableCondition: false,
                    cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='btn btn-danger'  uib-popover-template=\"'reject-reason-template'\" popover-placement='bottom-right' popover-is-open='' popover-trigger='outsideClick' popover-append-to-body='true'>Reject</button>"
                },
                {
                    name: 'Onhold',
                    displayName: '-',
                    width: 100,
                    cellEditableCondition: false,
                    cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='btn btn-warning' uib-popover-template=\"'onhold-reason-template'\" popover-placement='bottom-right'  popover-is-open='' popover-trigger='outsideClick'  popover-append-to-body='true'>Onhold</button>"
                },
            ],
        }


        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 0 })
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
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _saveContinue() {
            $scope.value = 2;

            $scope.gridCompOffOptions = {
                enableCellEditOnFocus: false,
                enableRowSelection: false,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                enableScrollbars: false,
                enableRowHeaderSelection: false,
                columnDefs: [
                    { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                    { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                    { name: 'COAttnDate', displayName: 'ApplyDate', width: 120, enableCellEdit: false },
                    { name: 'COTimeIn', displayName: 'InTime', width: 120, enableCellEdit: false },
                    { name: 'COTimeOut', displayName: 'OutTime', width: 120, enableCellEdit: false },
                    { name: 'CreatedOn', displayName: 'Request On', width: 120, enableCellEdit: false },
                    { name: 'HeadEmpName', displayName: 'Apporver', width: 120, enableCellEdit: false },
                    {
                        name: 'Status', displayName: 'Status', width: 100, enableCellEdit: false
                    },
                    {
                        name: 'Approve',
                        displayName: '-',
                        width: 100,
                        cellEditableCondition: false,
                        cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='cusotm btn btn-primary' uib-popover-template=\"'approve-reason-template'\" popover-placement='bottom-right' popover-is-open='' popover-trigger='outsideClick'  popover-append-to-body='true'>Approve</button>"

                    },
                    {
                        name: 'Rject',
                        displayName: '-',
                        width: 100,
                        cellEditableCondition: false,
                        cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='btn btn-danger'  uib-popover-template=\"'reject-reason-template'\" popover-placement='bottom-right' popover-is-open='' popover-trigger='outsideClick' popover-append-to-body='true'>Reject</button>"
                    },
                    {
                        name: 'Onhold',
                        displayName: '-',
                        width: 100,
                        cellEditableCondition: false,
                        cellTemplate: "<button type='button' ng-disabled=\"row.entity.Status=='Sanctioned'\" class='btn btn-warning' uib-popover-template=\"'onhold-reason-template'\" popover-placement='bottom-right'  popover-is-open='' popover-trigger='outsideClick'  popover-append-to-body='true'>Onhold</button>"
                    },
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
        function _saveClose() {
            
            $scope.value = 2;
            $scope.$dismiss();
        }
        _loadController();
    }
})();

