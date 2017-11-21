// /**
//  * @author pardeep pandit
//  * created on 4.07.2017
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.pages.organization.employees')
//         .controller('employeeBenefitDetail', employeeBenefitDetail);

//     /** @ngInject */
//     /** @ngInject */
//     function employeeBenefitDetail($scope, $stateParams,
//         pageService, $timeout, $filter, editFormService) {
//         var vm = this;
//         vm.empPKId = $stateParams.empId;

//         $scope.page = $scope.createPage();
//         $scope.page.pageId = 448;
//         $scope.page.boxOptions = {
//             showBack: true,
//             selfLoading: true,
//             showRefresh: true,
//             showFilter: false,
//             showAdd: true,
//             showRowMenu: true,
//             showCustomView: true,
//             showUpload: false,
//             showDialog: false,
//             enableRefreshAfterUpdate: true,
//             enableAutoRefresh: true,
//             gridHeight: 450,
//             linkColumns: [],
//             goBack: null,
//             getPageData: null,
//             refreshData: null,
//             addRecord: null,
//             editRecord: null,
//             updateRecord: null,
//             viewRecord: null,
//             deleteRecord: null,
//             uploadRecord: null
//         }



//         // vm.queryId = 539;
//         // vm.pageId = 448;
//         // vm.tableId = 425;
//         // var selectedRow = [];
//         // $scope.gridOptions = $scope.getGridSetting();
//         // $scope.gridOptions.columnDefs = [];
//         // $scope.gridOptions.data = [];

//         // $scope.saveBenefit = _saveBenefit;



//         // function _loadController() {
//         //     $scope.gridOptions.onRegisterApi = _onRegisterApi;
//         // }
//         // function _onRegisterApi(gridApi) {
//         //     $scope.gridApi = gridApi;
//         //     var data = {
//         //         searchList: [],
//         //         orderByList: []
//         //     }
//         //     pageService.getCustomQuery(data, vm.queryId).then(function (result) {
//         //         if (result !== "NoDataFoundemp") {
//         //             var ebmId = { name: 'EBMId', field: 'EBMId', displayName: 'EBMId', width: 100, visible: false };
//         //             var bendfit = { name: 'EBMName', field: 'EBMName', displayName: 'Benefit', width: 100, visible: true, cellEditableCondition: false };
//         //             var active = { name: 'EBDIsActive', field: 'EBDIsActive', displayName: 'Active', width: 100, visible: false };
//         //             var accountNo = { name: 'EBDAccountNumber', field: 'EBDAccountNumber', displayName: 'Account No.', width: 100, visible: true };
//         //             var fixed = { name: 'EBDFiexedAmount', field: 'EBDFiexedAmount', displayName: 'Fixed', width: 100, visible: true };
//         //             var percentage = { name: 'EBDPercentage', field: 'EBDPercentage', displayName: 'Percentage', width: 100, visible: true };
//         //             var calOnBasic = { name: 'EBDIsCalOnBasic', field: 'EBDIsCalOnBasic', displayName: 'Calculation On Basic', width: 100, visible: true };

//         //             $scope.gridOptions.columnDefs.push(bendfit);
//         //             $scope.gridOptions.columnDefs.push(active);
//         //             $scope.gridOptions.columnDefs.push(accountNo);
//         //             $scope.gridOptions.columnDefs.push(fixed);
//         //             $scope.gridOptions.columnDefs.push(percentage);
//         //             $scope.gridOptions.columnDefs.push(calOnBasic);

//         //             angular.forEach(result, function (data) {
//         //                 data.EBDIsActive = false;
//         //                 data.EBDAccountNumber = "";
//         //                 data.EBDFiexedAmount = 0;
//         //                 data.EBDPercentage = 0;
//         //                 data.EBDIsCalOnBasic = false
//         //             });
//         //             $scope.gridOptions.data = result;
//         //             console.log($scope.gridOptions.data)
//         //             pageService.getTableData(vm.tableId, vm.pageId, undefined, undefined, undefined, undefined).then(function (tableResult) {
//         //                 angular.forEach(tableResult, function (tableData) {

//         //                     angular.forEach(result, function (data, index) {
//         //                         //  debugger;
//         //                         if (tableData.EBDBenefitId == data.EBMId) {
//         //                             if (tableData.EBDIsActive) {
//         //                                 data.EBDId = tableData.EBDId;
//         //                                 data.EBDIsActive = tableData.EBDIsActive;
//         //                                 data.EBDAccountNumber = tableData.EBDAccountNumber;
//         //                                 data.EBDFiexedAmount = tableData.EBDFiexedAmount;
//         //                                 data.EBDPercentage = tableData.EBDPercentage;
//         //                                 data.EBDIsCalOnBasic = tableData.EBDIsCalOnBasic
//         //                                 gridApi.grid.modifyRows($scope.gridOptions.data);
//         //                                 gridApi.selection.selectRow($scope.gridOptions.data[index]);
//         //                             }
//         //                             else {
//         //                                 data.EBDId = tableData.EBDId;
//         //                                 data.EBDIsActive = tableData.EBDIsActive;
//         //                                 data.EBDAccountNumber = tableData.EBDAccountNumber;
//         //                                 data.EBDFiexedAmount = tableData.EBDFiexedAmount;
//         //                                 data.EBDPercentage = tableData.EBDPercentage;
//         //                                 data.EBDIsCalOnBasic = tableData.EBDIsCalOnBasic
//         //                                 gridApi.selection.unSelectRow($scope.gridOptions.data[index]);
//         //                             }
//         //                         }

//         //                     });
//         //                 })
//         //             })

//         //             // gridApi.grid.modifyRows($scope.gridOptions.data);
//         //             // gridApi.selection.selectRow($scope.gridOptions.data[0]);
//         //         }
//         //     });
//         //     gridApi.selection.on.rowSelectionChanged($scope, function (row) {
//         //         row.entity.EBDBenefitId = row.entity.EBMId;
//         //         row.entity.EBDEmpId = vm.empPKId;
//         //         if (row.isSelected) {
//         //             row.entity.EBDIsActive = true;
//         //             selectedRow.push(row.entity);
//         //         }
//         //         else {
//         //             row.entity.EBDIsActive = false;
//         //         }
//         //     });
//         // }

//         // function _saveBenefit() {
//         //     console.log(selectedRow)
//         //     if (selectedRow.length > 0) {
//         //         angular.forEach(selectedRow, function (row) {
//         //             console.log(row)

//         //             var data = {
//         //                 EBDId: row.EBDId == undefined ? undefined : row.EBDId,
//         //                 EBDAccountNumber: row.EBDAccountNumber,
//         //                 EBDBenefitId: row.EBDBenefitId,
//         //                 EBDEmpId: row.EBDEmpId,
//         //                 EBDFiexedAmount: row.EBDFiexedAmount,
//         //                 EBDIsFixed: row.EBDFiexedAmount != 0 ? true : false,
//         //                 EBDIsActive: row.EBDIsActive,
//         //                 EBDPercentage: row.EBDPercentage,
//         //                 EBDIsPercentage: row.EBDPercentage != 0 ? true : false,
//         //                 EBDIsCalOnBasic: row.EBDIsCalOnBasic,
//         //             }
//         //             if (data.EBDId == undefined) {
//         //                 editFormService.saveForm(vm.pageId, data,
//         //                     {}, 'create', 'Benefit', '', false).then(_successBenefitResult, _errorBenefitResult);
//         //             }
//         //             else {
//         //                 editFormService.saveForm(vm.pageId, data,
//         //                     {}, 'edit', 'Benefit', '', false).then(_successBenefitResult, _errorBenefitResult);
//         //             }
//         //         })
//         //     }
//         //     else {
//         //         $scope.showMsg("error", "Please select any row before save");
//         //     }
//         // }
//         // function _successBenefitResult(result) {
//         //     $scope.showMsg("success", "Employee Benefit Saved Successfully");

//         // }
//         // function _errorBenefitResult(err) {
//         //     alert(JSON.stringify(err))
//         // }

//         // _loadController();

//     }
// })();
