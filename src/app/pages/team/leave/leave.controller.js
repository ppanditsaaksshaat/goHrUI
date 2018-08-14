/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave')
        .controller('myTeamLeaveController', myTeamLeaveController);

    /** @ngInject */
    function myTeamLeaveController($scope, $state, $rootScope) {

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
           console.log(ev)
           console.log(to)
           console.log(toParams)
           console.log(from)
           console.log(fromParams)
        });
    }
})();
