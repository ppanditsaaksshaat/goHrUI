

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.perks.assign')
        .controller('perksAssignController', perksAssignController);

    /** @ngInject */
    function perksAssignController($scope, dialogModal) {

        $scope.assignPerks = _assignPerks;

        function _assignPerks() {
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/perks/assign/assignperks/assignperks.html',
                controller: 'assignPerksController',
                param: $scope.empBasicDetail
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