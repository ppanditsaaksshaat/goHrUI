/**
 * @author deepak.jain
 * created on 10.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('listGrid', listGrid);

    /** @ngInject */
    function listGrid($location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/listGrid/listGrid.html',
            scope: {
                gridOptions: '='
            },
            link: function ($scope) {
                
            }
        };
    }

})();