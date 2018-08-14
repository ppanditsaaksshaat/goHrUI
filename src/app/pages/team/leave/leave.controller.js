/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave')
        .controller('myTeamLeaveController', myTeamLeaveController);

    /** @ngInject */
    function myTeamLeaveController($scope, $state, $rootScope, pageService) {

        var d = new Date();
        var dayName = d.toString().split(' ')[0];
        console.log(dayName)
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

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                $scope.allLeaves = result[0];
                angular.forEach(result[0], function (data, index) {
                    data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                    data.dayFromName = moment(data.LEADDateFrom).format('ddd');
                    data.dayToName = moment(data.LEADDateTo).format('ddd');
                    data.monthName= moment(data.LEADDateFrom).format('MMM');
                    data.dateFrom=moment(data.LEADDateFrom).format('DD');
                    data.dateTo=moment(data.LEADDateTo).format('DD');
                })

                console.log(result)
            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }
        _loadController();
    }
})();
