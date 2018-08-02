

/**
 * @author pardeep.pandit
 * created on 30.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments')
        .controller('empFolderController', empFolderController);

    /** @ngInject */
    function empFolderController($scope, $rootScope, $state, $stateParams, pageService, editFormService) {

        $rootScope.folderName = "";
        if ($stateParams.folderId != undefined) {
            $rootScope.folders = false;
        }
        else {
            $rootScope.folders = true;
        }

        $scope.folderOpen = _folderOpen;
        function _loadController() {
            if ($stateParams.category == "myfile") {
              
                $rootScope.categoryName = "My File";
                $rootScope.stateName = $state.current.name;
                $rootScope.params = { category: $stateParams.category };
                $scope.parentFolders = [
                    { id: 1, name: "Identity Proof" },
                    { id: 2, name: "Technical Certificate" },
                    { id: 3, name: "Education Certificate" },
                    { id: 4, name: "Other" },
                ];
            }
            else if ($stateParams.category == "sharedwithme") {
               
                $rootScope.categoryName = "Shared With Me";
                $rootScope.stateName = $state.current.name;
                $rootScope.params = { category: $stateParams.category };
                $scope.parentFolders = [
                    { id: 1, name: "Deepak Jain" },
                    { id: 2, name: "Neeraj Tondan" },
                    { id: 3, name: "Pardeep Pandit" },
                    { id: 4, name: "Nitesh" },
                ];
            }
            else if ($stateParams.category == "public") {
                $rootScope.categoryName = "Public";
                $rootScope.stateName = $state.current.name;
                $rootScope.params = { category: $stateParams.category };
                $scope.parentFolders = [
                    { id: 1, name: "Announcement" },
                    { id: 2, name: "HR Policy" },
                    { id: 3, name: "Attendance Policy" },
                    { id: 4, name: "Leave Policy" },
                ];
            }
            else if ($stateParams.category == "sharedwithother") {
                $rootScope.categoryName = "Shared With Other";
                $rootScope.stateName = $state.current.name;
                $rootScope.params = { category: $stateParams.category };
                $scope.parentFolders = [
                    { id: 1, name: "Deepak Jain" },
                    { id: 2, name: "Neeraj Tondan" },
                    { id: 3, name: "Pardeep Pandit" },
                    { id: 4, name: "Nitesh" },
                ];
            }

        }

        function _folderOpen(folderId, folderName) {
            $rootScope.folders = false;
            $state.go("employee.documents.folders.files", { folderId: folderId,folderName:folderName })
        }
        _loadController();
    }
})()