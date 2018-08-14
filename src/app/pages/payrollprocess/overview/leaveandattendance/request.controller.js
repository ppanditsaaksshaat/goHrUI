/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('leaveAndAttendanceStatusController', leaveAndAttendanceStatusController);

    /** @ngInject */
    function leaveAndAttendanceStatusController($scope, $state) {
alert("abc")
        function _loadController() {
            $state.go("team.leave")
        }

        _loadController();
    }
})();
