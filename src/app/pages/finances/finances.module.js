/**
 * @author deepak.jain
 * created on 24/04/2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.finances', [
        'BlurAdmin.pages.finances.summary',
        'BlurAdmin.pages.finances.pay',
        'BlurAdmin.pages.finances.prefrences',
        'BlurAdmin.pages.finances.expenses',
        'BlurAdmin.pages.finances.loans'
    ])
        .config(routeConfig);
        
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('finances', {
            url: '/finances',
            templateUrl: 'app/pages/finances/finances.html',
            title: 'My Finances',
            controller: "",
            sidebarMeta: {
                icon: 'ion-pound',
                order: 0,
            },
        })

    }
  
  })();
  