// /**
//  * @author v.lugovsky
//  * created on 16.12.2015
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.pages.attendance.transaction.verify')
//         .controller('attTranseditverifyController', attTranseditverifyController);

//     /** @ngInject */
//     function attTranseditverifyController($scope, $state, $timeout, pageService, param) {
//         var vm = this;
//         var currentState = $state.current;

//         vm.filterOpt = {};
//         vm.searchList = [];
//         vm.orderByList = [];

//         this.applyFilter = _applyFilter;
//         // this.uploadRecord = _uploadRecord;
//         $scope.entity = {}
//         $scope.page = $scope.createPage();
//         console.log($scope.page)
//         $scope.page.pageId = 320;
//         $scope.page.searchList = [{ field: "EmpId", operand: "=", value: param }];
//         $scope.page.boxOptions = {
//             selfLoading: true,
//             showRefresh: true,
//             showFilter: true,
//             filterOpened: true,
//             requiredFilter: true,
//             showAdd: false,
//             showRowMenu: true,
//             showCustomView: true,
//             showUpload: false,
//             showDialog: false,
//             enableRefreshAfterUpdate: true,
//             enableAutoRefresh: true,
//             showDataOnLoad: false,
//             linkColumns: null,
//             gridHeight: 450,
//             getPageData: null,
//             refreshData: null,
//             addRecord: null,
//             editRecord: null,
//             updateRecord: null,
//             viewRecord: null,
//             deleteRecord: null,
//             columnDesign: []
//             // readonlyColumns: ['col1', 'col2']
//         }

      

//         $scope.resetFormCommon = _resetFormCommon;
//         $scope.clearFormCommon = _clearFormCommon;
//         $scope.closeForm = _closeForm;
//         $scope.saveForm = _saveForm;

//         function _validateForm(editForm) {
//             _resetFormCommon()
//             return true;
//         }
//         /**
//          * 
//          * @param {*kk} editForm 
//          */
//         function _saveForm(editForm) {
//             if (_validateForm(editForm)) {
//                 console.log($scope.entity)
//             }
//         }
//         /**
//          * Reset all controls value 
//          * @param {*from name from view} editForm 
//          */
//         function _resetFormCommon(editForm) {

//         }
//         function _clearFormCommon(editForm) {

//         }
//         function _closeForm(editForm) {
//             $scope.showEditForm = false;
//             $scope.entity = {};
//         }
//         function _addRecord() {
//             // $state.go("attendance.transaction.add", "{action:'create'}");
//             $scope.showEditForm = true;
//         }
//         function _editRecord(row) {

//             $scope.openForm()
//             var empId = row.entity.EmpId;
//             $state.go("organization.employees.edit", { action: 'edit', empId: empId });
//         }
//         function _updateRecord(row) {
//             var empId = row.entity.EmpId;
//             alert('_updateRecord called:' + empId)
//         }
//         function _deleteRecord(row) {
//             var empId = row.entity.EmpId;
//             alert('_deleteRecord called:' + empId)
//         }
//         function _viewRecord(row) {
//             var empId = row.entity.EmpId;
//             alert('_viewRecord called:' + empId)
//         }
//         function _openView() {
//             alert('view opened')
//         }
//         // function _uploadRecord() {
//         //   $state.go('organization.employees.upload')
//         // }
//         function _applyFilter() {
//             console.log($scope.page.pageinfo.filters);
//             $scope.page.searchList = [];
//             angular.forEach($scope.page.pageinfo.filters, function (filter) {

//                 if (filter.showFilter !== undefined) {
//                     if (filter.showFilter) {
//                         if (filter.value !== undefined) {
//                             var search = {};
//                             search.field = filter.name;
//                             search.operand = filter.operator;
//                             search.value = filter.value;
//                             $scope.page.searchList.push(search)
//                         }
//                     }
//                 }
//             })

//             $scope.page.refreshData();

//         }
//     }

// })();