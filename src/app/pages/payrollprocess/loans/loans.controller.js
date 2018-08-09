

/**
 * @author pardeep.pandit
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans')
        .controller('loansController', loansController);

    /** @ngInject */
    function loansController($scope, dialogModal) {

        $scope.newLoan = _newLoan;

        function _newLoan() {
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/loans/newloan/newloan.html',
                controller: 'newLoanController',
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })

        }
    }
})();