/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.locations')
        .controller('locationsController', locationsController);

    /** @ngInject */
    function locationsController($scope, $state) {
        //    console.log($state)

        var secondRouteOnlyRegex = new RegExp('configuration.company.locations' + "\.[a-z]+$", "i");

        $scope.subLocalState = defineMenuItemStates();

        console.log($scope.subLocalState)

        function defineMenuItemStates() {
            //var state = $state.get();
            return $state.get()
                .filter(function (s) {
                    return secondRouteOnlyRegex.test(s.name) && !s.abstract;
                })
                .map(function (s) {
                    var meta = s.sidebarMeta;
                    return {
                        name: s.name,
                        title: s.title,
                        level: (s.name.match(/\./g) || []).length,
                        order: meta.order,
                        icon: meta.icon,
                        stateRef: s.name,
                        parent: meta.parent,
                        pageTitle: meta.pageTitle,
                        headerCode: s.headerCode
                    };
                })
                .sort(function (a, b) {
                    return (a.level - b.level) * 100 + a.order - b.order;
                });
        }
    }
})();