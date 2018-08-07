/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('dirAnalyticsController', dirAnalyticsController);

    /** @ngInject */
    function dirAnalyticsController($scope, $rootScope, $stateParams, pageService, dialogModal) {

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
    }
})();

