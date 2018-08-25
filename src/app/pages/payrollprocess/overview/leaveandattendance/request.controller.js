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

        $scope.SaveContinue = _saveContinue;
        $scope.SaveClose = _saveClose;

        function _loadController() {

        }

        function _saveContinue() {
            $scope.value = 2;
        }
        function _saveClose() {

        }
        _loadController();
    }
})();
