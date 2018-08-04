/**
 * @author NKM
 * created on 16.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.selfreport')
        .controller('selfreportController', selfreportController);
    function selfreportController($scope, $rootScope, $state, $filter, pageService, $location, $anchorScroll) {

        console.log("parent")
        var vm = this;
        $scope.miscelAttendanceSummery = {};
        $scope.monthlySummery = {};
        // $scope.applyRequest = _applyRequest;
        // $scope.goApplyReguest = _goApplyReguest;
        $scope.applyAttendance = _applyAttendance;
        // $scope.applyOD = _applyOD;
        $scope.applyCOff = _applyCOff;
        var isSearchingData = false;
        $scope.entity = {}



        // function _applyRequest(monthSummery) {
        //     $location.hash('bottom');
        //     // call $anchorScroll()
        //     $anchorScroll();
        //     console.log(monthSummery)
        //     if (monthSummery.DayStatus == 'Absent') {
        //         $scope.apply = true;
        //         $scope.applyCOf = false;
        //     }
        //     else {
        //         $scope.apply = false;
        //         $scope.applyCOf = true;
        //     }
        //     $scope.applyDate = moment(monthSummery.DATE).format('dd-MMM-yyyy');

        //     $scope.holeObject = monthSummery;
        //     console.log('ng click work')
        // }

        // function _goApplyReguest() {
        //     $state.go('selfdir.selfreport.salarystructure', {
        //         // id: $scope.applyDate,
        //         // entity: $scope.holeObject
        //     })
        //     // console.log($scope.monthSummery)
        //     // console.log($scope.atttttt)
        // }

        function _applyAttendance() {
            $state.go('selfdir.selfreport.reportattendance', {
                // id: $scope.applyDate,
                // entity: $scope.holeObject
            })
            // console.log(moment(monthSummery.DATE).format('dd-MMM-yyyy'))
        }

        // function _applyOD() {
        //     $state.go('selfdir.attendance.miscellaneous.od', {
        //         id: $scope.applyDate,
        //         entity: $scope.holeObject
        //     })
        // }

        function _applyCOff() {
            $state.go('selfdir.selfreport.coff', {
                id: 1,
                entity: { name: 'deepak', design: 'tl' }
            })
        }


    }
})();