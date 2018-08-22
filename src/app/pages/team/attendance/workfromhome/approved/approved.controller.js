/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.approved')
        .controller('myApprovedWFHController', myApprovedWFHController);

    /** @ngInject */
    function myApprovedWFHController($scope, $rootScope, pageService, editFormService) {




        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            //    console.log(ev)
            //    console.log(to)
            //    console.log(toParams)
            //    console.log(from)
            //    console.log(fromParams)
        });



        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 105 })
            searchLists.push({ field: 'type', operand: '=', value: 'WFH' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allWFHApplication = result[0];
                    angular.forEach($scope.allWFHApplication, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.WFHFromDate).format('ddd');
                        data.dayToName = moment(data.WFHToDate).format('ddd');
                        data.monthName = moment(data.WFHFromDate).format('MMM');
                        data.dateFrom = moment(data.WFHFromDate).format('DD');
                        data.dateTo = moment(data.WFHToDate).format('DD');
                        data.WFHInTime = moment(data.WFHInTime).format('HH:mm');
                        data.WFHOutTime = moment(data.WFHOutTime).format('HH:mm');
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
