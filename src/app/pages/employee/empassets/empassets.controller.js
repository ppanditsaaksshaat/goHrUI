

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


        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
        }

        function _loadController() {
          
                    $scope.gridOptions.columnDefs = [
                        { name: 'Type', displayName: 'Type', enableCellEdit: false },
                        { name: 'Name', displayName: 'Name', enableCellEdit: false },
                        { name: 'Number', displayName: 'Number', enableCellEdit: false },
                        { name: 'Date', displayName: 'IssueDate', enableCellEdit: false },
                        {
                            name: 'Edit',
                            width: 100,
                            cellEditableCondition: false,
                            cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='Edit' tooltip-placement='right' href><i class='fa fa-edit fa-lg'></i></a></div>"
                        },
                    ]
                    $scope.gridOptions.data = [
                        { Type: "Electronic", Name: "Laptop", Number: 'LP-52',Date:'20-Jan-2018' },
                        { Type: "Furniture", Name: "Chair", Number: 'CH-89',Date:'25-Feb-2018'  },
                        { Type: "Stationary", Name: "Book", Number: 'BK-201' ,Date:'10-May-2018' }]
               
            }


        _loadController();
    }
})();