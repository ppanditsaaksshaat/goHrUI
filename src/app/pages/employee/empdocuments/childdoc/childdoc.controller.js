

/**
 * @author pardeep.pandit
 * created on 30.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments')
        .controller('empDocumentController', empDocumentController);

    /** @ngInject */
    function empDocumentController($scope, $state, $rootScope, $stateParams, pageService, editFormService) {
        console.log($stateParams)
        function _loadController() {
            if ($stateParams.category == "myfile") {
                $scope.parentFolders = [
                    { id: 1, name: "Identity Proof" },
                    { id: 2, name: "Technical Certificate" },
                    { id: 3, name: "Education Certificate" },
                    { id: 4, name: "Other" },
                ];
            }
            else if ($stateParams.category == "sharedwithme") {
                $scope.parentFolders = [
                    { id: 1, name: "Deepak Jain" },
                    { id: 2, name: "Neeraj Tondan" },
                    { id: 3, name: "Pardeep Pandit" },
                    { id: 4, name: "Nitesh" },
                ];
            }
            else if ($stateParams.category == "public") {
                $scope.parentFolders = [
                    { id: 1, name: "Announcement" },
                    { id: 2, name: "HR Policy" },
                    { id: 3, name: "Attendance Policy" },
                    { id: 4, name: "Leave Policy" },
                ];
            }
            else if ($stateParams.category == "sharedwithother") {
                $scope.parentFolders = [
                    { id: 1, name: "Deepak Jain" },
                    { id: 2, name: "Neeraj Tondan" },
                    { id: 3, name: "Pardeep Pandit" },
                    { id: 4, name: "Nitesh" },
                ];
            }

        }
        _loadController();
    }
})()