/**
 * @author pardeep.pandit
 * created on 07.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.overview')
        .controller('reviewAllEmpController', reviewAllEmpController, param);

    /** @ngInject */
    function reviewAllEmpController($scope, $rootScope, pageService) {


        function _loadController() {
            pageService.getCustomQuery(data, 518).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
            }
            function _getCustomQueryErrorResult(err) {

            }
        }


        _loadController();
    }
})();

