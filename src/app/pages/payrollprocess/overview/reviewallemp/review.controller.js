/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('reviewAllEmpController', reviewAllEmpController);

    /** @ngInject */
    function reviewAllEmpController($scope, $rootScope, pageService, param) {


        $scope.height = "430px";
        $scope.gridReviewAllEmpOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-expandable ui-grid-auto-resize ui-grid-pinning ui-grid-edit class="paybandgrid payband"></div>',
            expandableRowHeight: 80,
            //subGridVariable will be available in subGrid scope
            enableExpandableRowHeader: true,
            expandableRowScope: {
                subGridVariable: 'subGridScopeVariable',
                externalScope: $scope
            },
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            paginationPageSizes: [10, 20, 30, 40],
            paginationPageSize: 10,
            onRegisterApi: _onGridRegisterApi,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 80, enableCellEdit: false },
                { name: 'EmpName', displayName: 'Name', width: 150, enableCellEdit: false },
                { name: 'TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false },
                { name: 'TotalPresentDays', displayName: 'Present Days', width: 60, enableCellEdit: false },
                { name: 'TotalWeekoff', displayName: 'Total WeekOffs', width: 60, enableCellEdit: false },
                { name: 'TotalHolidays', displayName: 'Total Holidays', width: 60, enableCellEdit: false },
                { name: 'AbsentDays', displayName: 'Absent Days', width: 60, enableCellEdit: false },
                { name: 'TotalLeaves', displayName: 'Total Leaves', width: 80, enableCellEdit: false },
                { name: 'TotalDays', displayName: 'Total Days', width: 60, enableCellEdit: false },
                { name: 'WeekOffPresent', displayName: 'WeekOffDay Present', width: 60, enableCellEdit: false },
                { name: 'HolidayPresent', displayName: 'HolidayDay Present', width: 60, enableCellEdit: false },
                { name: 'TotalLateCount', displayName: 'Late Count', width: 60, enableCellEdit: false },
                { name: 'DeductableLateDays', displayName: 'Late Days', width: 60, enableCellEdit: false },
                { name: 'TotalLWP', displayName: 'LWP', width: 60, enableCellEdit: false },
                { name: 'IncentiveDays', displayName: 'Incentive Days', width: 60, enableCellEdit: false },
                { name: 'SingleOvertimeMin', displayName: 'Single OT Minute', width: 60, enableCellEdit: false },
                { name: 'SingleOvertimeHours', displayName: 'Single OT Hours', width: 60, enableCellEdit: false },
                { name: 'DoubleOvertimeMin', displayName: 'Double OT Minute', width: 60, enableCellEdit: false },
                { name: 'DoubleOvertimeHours', displayName: 'Double OT Hours', width: 60, enableCellEdit: false },
            ],
        }
        function _onGridRegisterApi(gridApi) {

            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {

                if (row.isExpanded) {
                    $scope.height = '510px';
                    row.entity.subGridOptions = {};
                    row.entity.subGridOptions.columnDefs = [];
                    row.entity.subGridOptions.data = [];
                    var subGridColumns = angular.copy($scope.gridReviewAllEmpOptions.columnDefs)
                    angular.forEach(subGridColumns, function (data) {
                        if (data.name != "EmpCode" && data.name != "EmpName") {
                            data.enableCellEdit = true;
                            data.cellClass = 'YELLOW-300 status-bg cell-border-right';
                        }
                    })

                    row.entity.subGridOptions.columnDefs = subGridColumns;
                    row.entity.subGridOptions.data.push(angular.copy(row.entity));

                }
                else {
                    $scope.height = "430px";
                }

            });


        }

        function _loadController() {
            $scope.modalTitle = param.modalTitle;
            var searchLists = [];
            searchLists.push({ field: 'Month', operand: '=', value: param.month })
            searchLists.push({ field: 'Year', operand: '=', value: param.year })
            searchLists.push({ field: 'SubUnitId', operand: '=', value: param.subUnitId })
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 518).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {

                $scope.gridReviewAllEmpOptions.data = result[0];

            }
            function _getCustomQueryErrorResult(err) {

            }
        }


        _loadController();
    }
})();

