

/**
 * @author pardeep.pandit
 * created on 31.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empAssetController', empAssetController);

    /** @ngInject */
    function empAssetController($scope, $rootScope, $stateParams, pageService, editFormService) {


        // global variable declaration
        var jobTableId = 121;
        var jobPageId = 114;
        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        function _loadController() {

        }
        _loadController();
    }
})()