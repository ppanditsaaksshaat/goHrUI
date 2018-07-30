/**
 * @author a.demeshko
 * created on 12/24/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .service('dialogModal', dialogModal);

  /** @ngInject */
  function dialogModal($rootScope, $uibModal) {
    //   var url='app/pages/organization/masters/add/add.html'
    this.open = function (options) {
      var size = 'top-center-500';
      if (options.size !== undefined) {
        size = options.size;
      }
      $rootScope.modalInstance = $uibModal.open({

        animation: false,
        templateUrl: options.url,
        controller: options.controller,
        controllerAs: options.controllerAs,
        size: size,
        resolve: {
          param: function () {
            return options.param;
          }
        }
      });
      return $rootScope.modalInstance;
    }
    this.openCorner = function (options) {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: options.url,
        controller: options.controller,
        controllerAs: options.controllerAs,
        size: 'right-bottom-500',
        resolve: {
          param: function () {
            return options.param;
          }
        }
      });
      return $rootScope.modalInstance;
    }

    this.openFormVertical = function (options) {

      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/common/forms/formVertical/formVertical.html',
        controller: 'commonAddVerticalFormController',
        controllerAs: 'addCtrl',
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          param: function () {
            return options.param;
          }
        }
      });
      return $rootScope.modalInstance;
    }

    this.openForm = function (options) {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: options.url,
        // controller: options.controller,
        // controllerAs: options.controllerAs,
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          param: function () {
            return options.param;
          }
        }
      });
      return $rootScope.modalInstance;
    }

    this.openIdleWarning = function () {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/pages/idle/warning-dialog.html',
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false
      });
      return $rootScope.modalInstance;
    } 

    this.openIdleTimeout = function () {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/pages/idle/timeout-dialog.html',
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false
      });
      return $rootScope.modalInstance;
    }

    this.openUserProfile = function () {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/pages/pageTop/profile.html',
        size: 'left-top-center',
        backdrop: 'static',
        keyboard: false
      });
      return $rootScope.modalInstance;
    }


    this.openProgress = function () {
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/common/components/showProgress.html',
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false,
      });
      return modalInstance;
    }
    
    this.openExpandGrid = function (param) {
      $rootScope.modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'app/pages/expandGrid/expand.grid.html',
        controller: 'expandGridController',
        size: 'top-center-500',
        backdrop: 'static',
        keyboard: false,
        resolve: {
          param: function () {
            return param;
          }
        }
      });
      return $rootScope.modalInstance;
    }
  }

})();
0  
