

/**
 * @author pardeep.pandit
 * created on 10.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.expenses.claimexpenses')
        .controller('claimExpensesController', claimExpensesController);

    /** @ngInject */
    function claimExpensesController($scope, dialogModal) {

        $scope.addExpense = _addExpense;

        function _addExpense() {
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/finances/expenses/addexpense/addexpense.html',
                controller: 'newExpenseController',
            });
            modal.result.then(function (data) {
                if (data == "success") {
                 
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })

        }
    }
})();