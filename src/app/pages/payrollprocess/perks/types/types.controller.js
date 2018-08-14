

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.perks.types')
        .controller('perkTypesController', perkTypesController);

    /** @ngInject */
    function perkTypesController($scope, dialogModal) {

        $scope.addPerks = _addPerks;

        function _addPerks() {
            var modal = dialogModal.openFullScreen({
                url: 'app/pages/payrollprocess/perks/types/add/perks.html',
                controller: 'addPerksController',
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