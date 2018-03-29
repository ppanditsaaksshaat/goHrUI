
/**
 * @author deepak.jain
 * created on 22.03.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.device.devicemaster', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('device.devicemaster', {
                url: '/devicemaster',
                //abstract: true,
                templateUrl: 'app/pages/device/devicemaster/device.master.html',
                controller: "deviceMasterController",
                controllerAs: "devMas",
                title: 'Device Master',
                sidebarMeta: {
                    order: 1,
                },
            })
    }
})();
