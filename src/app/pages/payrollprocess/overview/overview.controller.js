/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess')
        .controller('payOverViewController', payOverViewController);

    /** @ngInject */
    function payOverViewController($scope, $rootScope, $filter) {

        $scope.getData = _getData;


        var date = new Date();
        var month = date.getMonth() + 1;
        var currentYear = date.getFullYear();
        var nextYear = date.getFullYear() + 1;
        var isChnageYear = false;
        $scope.financialMonths = [];
        var type = "";
        var statusClass = "";
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var IsCalenderYear = $filter("findObj")($rootScope.user.sysparam, "IS_PAYROLL_CALENDER_MONTH", "key");
        if (IsCalenderYear != null) {

            if (IsCalenderYear.value == "True") {
                _getPayrollMomth(1);
            }
            else {
                _getPayrollMomth(3);

            }
        }

        function _getPayrollMomth(monthId) {
            for (var i = 0; i <= 11; i++) {
                if (monthId > 12) {
                    monthId = 1
                    isChnageYear = true;
                }             
                if (month == monthId) {
                    type = "Current";
                    statusClass = "current";
                }
                else if (month < monthId) {
                    type = "Upcoming";
                    statusClass = "upcoming";
                }
                else if (month > monthId) {
                    if (isChnageYear == false) {
                        if (monthId == 5) {
                            type = "Completed";
                            statusClass = "completed";
                        }
                        else {
                            type = "Pending";
                            statusClass = "pending";
                        }
                    }
                    else {
                        type = "Upcoming";
                        statusClass = "upcoming";
                    }
                }
                var calMonth =
                {
                    "id": monthId,
                    "month": monthNames[monthId - 1],
                    "year": isChnageYear == false ? currentYear : nextYear,
                    "type": type,
                    "statusClass": statusClass,
                    "active": month == monthId ? true : false
                }
                $scope.financialMonths.push(calMonth);
                monthId++;
            }
            console.log($scope.financialMonths)
        }

        function _getData(payId) {
            angular.forEach($scope.financialMonths, function (data) {
                if (payId == data.id) {
                    data.active = true;
                }
                else {
                    data.active = false;
                }
            })
        }
    }
})();
