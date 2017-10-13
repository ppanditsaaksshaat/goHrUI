/**
 * @author pardeep pandit
 * created on 4.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('employeeDocumentDetail', employeeDocumentDetail);

    /** @ngInject */
    /** @ngInject */
    function employeeDocumentDetail($scope, $stateParams,
        pageService, $timeout, $filter, editFormService, $state, dialogModal) {

        /**
         * local variable declaration
         */
        $scope.documentList = true;


        /**
         * private funtion
         */

        $scope.upload = _upload;
        $scope.refresh = _refresh;
        $scope.list = _list;
        $scope.close = _close;


        function _upload() {
            
            var options = {
                url: "app/pages/organization/employees/templates/document/browseModal.html",
                controller: "",
                controllerAs: ""
            }
            dialogModal.open(options)
        }
        function _refresh() {

        }
        function _list() {
            $state.go("organization.employees.list");
        }
        function _close() {
            $scope.documentList = true;
        }

      
    }
})();
