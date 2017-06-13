// /**
//  * @author v.lugovsky
//  * created on 16.12.2015
//  */
// (function () {
//   'use strict';

//   angular.module('BlurAdmin.pages.organization.employee')
//     .controller('OrgEmployeesDetailController', OrgEmployeesDetailController);

//   /** @ngInject */
//   /** @ngInject */
//   function OrgEmployeesDetailController($scope, $stateParams, mailMessages, addModal, pageService, editableOptions, editableThemes, $timeout) {
//     var vm = this;
//     vm.pkId = $stateParams.empId;
//     vm.tableid = 30;
//     vm.tempFile = "profile";
//     vm.empBasicDetail = {};

//     // vm.table = { rows: [] }
//     // vm.page = {};

//     function _loadController() {
//       $timeout(function () {
//         pageService.findEntity(vm.tableid, vm.pkId, undefined).then(
//           _findEntitySuccessResult, _findEntityErrorResult);
//       });

//     }
//     function _findEntitySuccessResult(result) {  
//       vm.empBasicDetail = result;    
//     }
//     function _findEntityErrorResult(error) {


//     }
//     $scope.templateUrl = function () {

//       return "app/pages/organization/employee/templates/" + vm.tempFile + "/" + vm.tempFile + "-view.html";
//     }
//     $scope.temalateUrl1 = function () {
//       return "app/pages/organization/employee/templates/employeeSideMenu.html";
//     }
//     vm.tabs = _getTabs();

//     function _getTabs() {

//      var mastersMenu = [];
//       mastersMenu.push({ name: 'basic', text: 'Employee Basics', id: 25 })
//       mastersMenu.push({ name: 'personal', text: 'Personal Details', id: 35 })
//       mastersMenu.push({ name: 'contact', text: 'Contact Details', id: 36 })
//       mastersMenu.push({ name: 'job', text: 'Job Description', id: 114 })
//       mastersMenu.push({ name: 'resign', text: 'Resignation Details', id: 360 })
//       mastersMenu.push({ name: 'sign', text: 'Signature Details', id: 192 })
//       mastersMenu.push({ name: 'account', text: 'Account Details', id: 125 })
//       mastersMenu.push({ name: 'emergency ', text: 'Emergency  Details', id: 53 })
//       mastersMenu.push({ name: 'family', text: 'Family Details', id: 52 })
//       mastersMenu.push({ name: 'immigration ', text: 'Immigration  Details', id: 119 })
//       mastersMenu.push({ name: 'qualification ', text: 'Qualification  Details', id: 38 })
//       mastersMenu.push({ name: 'workexperience', text: 'Work Experience', id: 56 })
//       return mastersMenu;

//     }

//     // function _successGetPage(result) {

//     //   console.log(result)
//     //   vm.page = result;
//     //   _getTableData();
//     // }
//     // function _errorGetPage(err) {

//     // }
//     // function _getTableData() {

//     //   var data = {
//     //     searchList: [],
//     //     orderByList: []
//     //   }
//     //   var tableData = pageService.getTableData(
//     //     vm.page.pageinfo.tableid,
//     //     vm.page.pageinfo.pageid,
//     //     '', '',
//     //     false, data);

//     //   tableData.then(_getTableSuccessResult, _getTableErrorResult)
//     // }
//     // function _getTableErrorResult(err) {

//     // }
//     // function _getTableSuccessResult(result) {
//     //   console.log(result)
//     //   if (result == 'NoDataFound') {
//     //     // uivm.showMsg('warning', 'No Record Found.');
//     //   } else if (result.Errors !== undefined) {
//     //     // uivm.showMsg('error', result.Message);
//     //     // _startMsgTimer();
//     //   }
//     //   else {  
//     //     vm.table.rows = result;
//     //     $scope.rows = result;
//     //     console.log($scope.rows.length)
//     //     // if (uivm.page.gridOptions.data.length == 1)
//     //     //   uivm.showMsg('info', result.length + ' Records found.');
//     //     // else
//     //     //   uivm.showMsg('info', result.length + ' Record found.');

//     //     // _startMsgTimer();
//     //   }
//     // }
//    // _loadController();


//   }
// })();
