

/**
 * @author pardeep.pandit
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans')
        .controller('finLoansController', finLoansController);

    /** @ngInject */
    function finLoansController($scope, dialogModal) {

      
        $scope.applyLoan = _applyLoan;

        function _applyLoan() {
            var modal = dialogModal.open({
                url: 'app/pages/finances/loans/newloan/newloan.html',
                size: 'top-center-600',
                controller: 'finNewLoanController',
                
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