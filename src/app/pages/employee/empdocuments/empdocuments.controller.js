

/**
 * @author pardeep.pandit
 * created on 30.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments')
        .controller('empDocumentController', empDocumentController);

    /** @ngInject */
    function empDocumentController( $scope,$stateParams) {

        var empId = $stateParams.empid;
        if (empId != undefined) {
            $scope.me = false;
        }
        else {
            $scope.me = true;
        }
    }
})();