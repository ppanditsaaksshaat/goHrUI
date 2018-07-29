/**
 * @author NKM
 * created on 12.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfapply.leave')
        .controller('leavePageCtrl', leavePageCtrl);

    /** @ngInject */
    function leavePageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService, dialogModal) {
        console.log('leave')
    }
})();
