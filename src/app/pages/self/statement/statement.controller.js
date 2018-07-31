// /**
//  * @author NKM
//  * created on 26.07.2018
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.pages.self.statement')
//         .controller('leaveStatementController', leaveStatementController);
//     function leaveStatementController($scope, $rootScope, $state, $filter, pageService) {
//         var vm = this;
//         console.log('location ctrl loaded')
//         $scope.entity = {}
//         $scope.page = $rootScope.createPage();
//         $scope.page.pageId = 270;
//         // $scope.page = $rootScope.createPage(); 0
//         console.log($scope.page)
//         $scope.fromDate = moment().format('DD-MMM-YYYY')
//         $scope.toDate = moment().format('DD-MMM-YYYY')

//         var d = moment();
//         var month = d.month();
//         var year = d.year();
//         $scope.month = month + 1;
//         var startDate = moment([year, $scope.month - 1]);
//         var endDate = moment(startDate).endOf('month');
//         $scope.fromDate = moment(startDate).format('DD-MMM-YYYY')
//         $scope.toDate = moment(endDate).format('DD-MMM-YYYY')

//         // $scope.$watch('fromDate', function (newVal, oldVal) {
//         //     if (newVal) {
//         //         _getPageData();
//         //     }
//         // })

//         console.log(startDate.toDate());
//         console.log(endDate.toDate());

//         $scope.page.boxOptions = {
//             selfLoading: true,
//             showRefresh: true,
//             showFilter: false,
//             filterOpened: false,
//             showAdd: true,
//             showRowMenu: false,
//             showCustomView: true,
//             showUpload: false,
//             showDialog: false,
//             enableRefreshAfterUpdate: true,
//             gridHeight: 450,
//             getPageData: null,
//             refreshData: null,
//             addRecord: null,
//             editRecord: null,
//             updateRecord: null,
//             viewRecord: null,
//             deleteRecord: null,
//             showApplyFilter: false,
//             filterOnChange: null,
//             showDataOnLoad: true,
//             // currentState: 'configuration.company.locations.location'
//         }

//         $scope.page.searchList.push({
//             field: 'ELTEmpId',
//             operand: '>=',
//             value: 5
//         })
//         // $scope.page.searchList.push({
//         //     field: 'RODFromDate',
//         //     operand: '<=',
//         //     value: '2018-04-30'
//         // })
//         // $scope.page.searchList.push({
//         //     field: 'RODEmpId',
//         //     operand: '=',
//         //     value: 5
//         //     // value: $scope.user.profile.empId
//         // })



//     }
// })();