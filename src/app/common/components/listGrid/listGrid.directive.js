// /**
//  * @author deepak.jain
//  * created on 10.05.217
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.common.components')
//         .directive('listGrid', listGrid);

//     /** @ngInject */
//     function listGrid($location, $state) {
//         return {
//             restrict: 'E',
//             templateUrl: 'app/common/components/listGrid/listGrid.html',
//             scope: {
//                 gridOptions: '='
//             },
//             link: function ($scope) {
//                 $scope.myData = [
//                     {
//                         "firstName": "Cox",
//                         "lastName": "Carney",
//                         "company": "Enormo",
//                         "employed": true,
//                         "yearToDateAmount": 1200.50
//                     },
//                     {
//                         "firstName": "Lorraine",
//                         "lastName": "Wise",
//                         "company": "Comveyer",
//                         "employed": false,
//                         "yearToDateAmount": 2200.22
//                     },
//                     {
//                         "firstName": "Nancy",
//                         "lastName": "Waters",
//                         "company": "Fuelton",
//                         "employed": false,
//                         "yearToDateAmount": 533.00
//                     }
//                 ];
//                 var gridOpt = {

//                     rowHeight: 35,
//                     enableColumnResizing: true,
//                     enableFiltering: true,
//                     enableGridMenu: true,
//                     enableRowSelection: true,
//                     enableRowHeaderSelection: false
//                 };
//                 $scope.gridOptions = angular.extend($scope.gridOptions, gridOpt);

//                 $scope.gridOptions.data = $scope.myData;

//                 // var gridOptions = {
//                 //     enableFiltering: true,
//                 //     enableRowSelection: true,
//                 //     enableRowHeaderSelection: false,
//                 //     modifierKeysToMultiSelect: false,
//                 //     noUnselect: false,
//                 //     enablePaginationControls: true,
//                 //     paginationPageSizes: [10, 25, 50, 75, 100, 200, 500],
//                 //     paginationPageSize: 10,
//                 //     minRowsToShow: 10,
//                 //     showColumnFooter: true,
//                 //     enableVerticalScrollbar: false,
//                 //     enableHighlighting: true,
//                 //     columnDefs: [],
//                 //     data: []
//                 // };
//             }
//         };
//     }

// })();