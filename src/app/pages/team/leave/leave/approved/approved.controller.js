/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.approved')
        .controller('myTeamApprovedLeaveController', myTeamApprovedLeaveController);

    /** @ngInject */
    function myTeamApprovedLeaveController($scope, $rootScope, pageService) {



        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            //    console.log(ev)
            //    console.log(to)
            //    console.log(toParams)
            //    console.log(from)
            //    console.log(fromParams)
        });

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            columnDefs: [
                { name: 'EmpName', displayName: 'EmpName', width: 150, enableCellEdit: false },
                { name: 'LEADDateFrom', displayName: 'From', width: 120, enableCellEdit: false },
                { name: 'LEADDateTo', displayName: 'To', width: 120, enableCellEdit: false },
                { name: 'CreatedOn', displayName: 'Requested On', width: 120, enableCellEdit: false },
                { name: 'ApprovedBy', displayName: 'Approved By', width: 150, enableCellEdit: false },
                { name: 'ModifiedOn', displayName: 'Approved On', width: 120, enableCellEdit: false },
                { name: 'Status', displayName: 'Status', width: 150, enableCellEdit: false },
            ]
        }

        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 44 })
            searchLists.push({ field: 'type', operand: '=', value: 'Leave' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    angular.forEach(result[0], function (data) {
                        data.LEADDateFrom = moment(data.LEADDateFrom).format("DD-MMM-YYYY");
                        data.LEADDateTo = moment(data.LEADDateTo).format("DD-MMM-YYYY");
                        data.CreatedOn = moment(data.CreatedOn).format("DD-MMM-YYYY");
                        data.ModifiedOn = moment(data.ModifiedOn).format("DD-MMM-YYYY");
                    })

                    $scope.gridOptions.data = result[0];
                }
                else {
                    $scope.noDataFound = true;
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        _loadController();
    }
})();
