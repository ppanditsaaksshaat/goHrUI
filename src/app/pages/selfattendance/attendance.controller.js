/**
 * @author Pardeep Pandit
 * created on 07.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfattendance')
        .controller('attendanceCtrl', attendanceCtrl);

    /** @ngInject */
    function attendanceCtrl($scope, $state, $timeout, pageService, $filter, $uibModal, dialogModal) {
        alert("working");
        //console.log("working")
    }
})();