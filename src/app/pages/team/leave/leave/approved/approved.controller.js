/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.approved')
        .controller('myTeamApprovedLeaveController', myTeamApprovedLeaveController);

    /** @ngInject */
    function myTeamApprovedLeaveController($scope, $rootScope, pageService, editFormService, dialogModal) {


        
        var curentDate = new Date();


        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 44 })
            searchLists.push({ field: 'type', operand: '=', value: 'Leave' })
            searchLists.push({ field: 'month', operand: '=', value: curentDate.getMonth() + 1 })
            searchLists.push({ field: 'year', operand: '=', value: curentDate.getFullYear() })


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
                        data.dayFromName = moment(data.LEADDateFrom).format('ddd');
                        data.dayToName = moment(data.LEADDateTo).format('ddd');
                        data.monthName = moment(data.LEADDateFrom).format('MMM');
                        data.dateFrom = moment(data.LEADDateFrom).format('DD');
                        data.dateTo = moment(data.LEADDateTo).format('DD');
                        var spiltName = data.EmpName.split(' ');
                        if (spiltName.length == 3) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                        }
                        else if (spiltName.length == 2) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                        }
                        else {
                            data.shortName = spiltName[0].substr(0, 1);
                        }
                    })
                    $scope.noDataFound = false;
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
