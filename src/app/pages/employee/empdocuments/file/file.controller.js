

/**
 * @author pardeep.pandit
 * created on 01.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empdocuments')
        .controller('empFileController', empFileController);

    /** @ngInject */
    function empFileController($scope, $rootScope, $stateParams, $state, pageService, editFormService) {
        console.log($state)

        var folderId = $stateParams.folderId;

        if ($stateParams.folderId != undefined) {
            $rootScope.folders = false;
        }
        else {
            $rootScope.folders = true;
        }

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
        }

        function _loadController() {
            if ($stateParams.category == "myfile") {
                $rootScope.folderName = $stateParams.folderName;
                $rootScope.fileStateName = $state.current.name;
                $rootScope.fileParams = { folderId: $stateParams.folderId, folderName: $stateParams.folderName };

                if (folderId == 1) {
                    $scope.gridOptions.columnDefs = [];
                    $scope.gridOptions.data = [];
                    $scope.gridOptions.columnDefs = [
                        { name: 'Type', displayName: 'Type', enableCellEdit: false },
                        { name: 'Name', displayName: 'Name', enableCellEdit: false },
                        { name: 'Number', displayName: 'Number', enableCellEdit: false },
                        {
                            name: 'DownLoad',
                            width: 100,
                            cellEditableCondition: false,
                            cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='PDF' tooltip-placement='right' href><i class='fa fa-file'></i></a></div>"
                        },
                    ]
                    $scope.gridOptions.data = [
                        { Type: "Adhaar", Name: "Pardeep", Number: '5563322333343' },
                        { Type: "PAN", Name: "Pardeep", Number: 'CGRQQ8923L' },
                        { Type: "VoterId", Name: "Pardeep", Number: 'WG04523575' }]
                }
                if (folderId == 2) {
                    $scope.gridOptions.columnDefs = [];
                    $scope.gridOptions.data = [];
                    $scope.gridOptions.columnDefs = [
                        { name: 'Name', displayName: 'Name', enableCellEdit: false },
                        { name: 'Specilization', displayName: 'Specilization', enableCellEdit: false },
                        { name: 'FromDate', displayName: 'FromDate', enableCellEdit: false },
                        { name: 'ToDate', displayName: 'ToDate', enableCellEdit: false },

                        {
                            name: 'DownLoad',
                            width: 100,
                            cellEditableCondition: false,
                            cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='PDF' tooltip-placement='right' href><i class='fa fa-file'></i></a></div>"
                        },
                    ]
                    $scope.gridOptions.data = [
                        { Name: "BCA", Specilization: "Computer", FromDate: '01-Jan-2009', ToDate: '31-Dec-2011' },
                        { Name: "MCA", Specilization: "Computer", FromDate: '01-Jan-2012', ToDate: '31-Dec-2014' },
                        { Name: "MCOM", Specilization: "Computer", FromDate: '01-Jan-2015', ToDate: '31-Dec-2017' }]
                }

            }
            else if ($stateParams.category == "sharedwithme") {
                $scope.folderId = "sharedwithme=" + folderId;
            }
            else if ($stateParams.category == "public") {
                $scope.folderId = "public=" + folderId;
            }
            else if ($stateParams.category == "sharedwithother") {
                $scope.folderId = "sharedwithother=" + folderId;
            }

        }

        _loadController();

    }
})();