/**
 * @author deepak.jain
 * created on 16.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('topNav', topNav);
    /** @ngInject */
    function topNav($location, $state, $compile, $rootScope, $timeout, dialogModal, pageService,
        editFormService, focus, $filter, DJWebStore, $stateParams) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/topNav/topNav.html',
            require: ['^ngController'],
            replace: true,
            scope:{
                current:'=menu'
            },
            controller: function ($scope, $timeout) {
              
                console.log($state)
                var routeName= $scope.current;//'configuration.company'; // this is the "actual" route

                // this regex is going to filter only direct childs of this route.
                var secondRouteOnlyRegex = new RegExp(routeName + "\.[a-z]+$", "i");
                
                $scope.localState = defineMenuItemStates();
        
                // console.log(defineMenuItemStates());
                // // this uses lodash to filter the states based on the regex
                // var navLinks = _.filter(states, (s) => {
                //     return secondRouteOnlyRegex.test(s.name) && !s.abstract;
                // });
                // $scope.tabs = navlinks;
                // console.log($scope.tabs)
        
        
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

            },
            link: function ($scope, elm, attrs, ctrl) {



            }
        };
    }

})();