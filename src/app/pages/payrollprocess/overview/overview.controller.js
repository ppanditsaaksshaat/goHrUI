/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess')
        .controller('payOverViewController', payOverViewController);

    /** @ngInject */
    function payOverViewController($scope, $state) {

        $scope.getData = _getData;
        $scope.payrollMonth = [
            { "id": "4", "month": "Apr", "year": "2018", "type": "Pending", "statusClass": "pending", "active": false },
            { "id": "5", "month": "May", "year": "2018", "type": "Pending", "statusClass": "pending", "active": false },
            { "id": "6", "month": "Jun", "year": "2018", "type": "Pending", "statusClass": "pending", "active": false },
            { "id": "7", "month": "Jul", "year": "2018", "type": "Completed", "statusClass": "completed", "active": false },
            { "id": "8", "month": "Aug", "year": "2018", "type": "Current", "statusClass": "current", "active": true },
            { "id": "9", "month": "Sep", "year": "2018", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "10", "month": "Oct", "year": "2018", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "11", "month": "Nov", "year": "2018", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "12", "month": "Dec", "year": "2018", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "1", "month": "Jan", "year": "2019", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "2", "month": "Feb", "year": "2019", "type": "Upcoming", "statusClass": "upcoming", "active": false },
            { "id": "3", "month": "Aug", "year": "2019", "type": "Upcoming", "statusClass": "upcoming", "active": false }
        ]

        function _getData(payId) {       
            angular.forEach($scope.payrollMonth, function (data) {
                if (payId == data.id) {
                    data.active = true;
                }
                else{
                    data.active = false;
                }
            })
        }
    }
})();
