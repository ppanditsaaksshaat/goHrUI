/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.finances.loans.outstanding')
        .controller('finLoanOutSandingOController', finLoanOutSandingOController);

    /** @ngInject */
    function finLoanOutSandingOController($scope) {

        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableScrollbars: false,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 70, enableCellEdit: false },
                { name: 'EmpName', displayName: 'EmpName', width: 110, enableCellEdit: false },
                { name: 'LoanAmount', displayName: 'Loan Amount', width: 80, enableCellEdit: false },
                { name: 'DisbursalMode', displayName: 'Disbursal Mode', width: 120, enableCellEdit: false },
                { name: 'EMIAmount', displayName: 'EMI Amount', width: 80, enableCellEdit: false },
                { name: 'OutstandingAmount', displayName: 'Outstanding Amount', width: 120, enableCellEdit: false },
                { name: 'ActualRepaymentTerm', displayName: 'Actual Repayment Term', width: 120, enableCellEdit: false },
                { name: 'BalancePeriod', displayName: 'Balance Period', width: 100, enableCellEdit: false },
                { name: 'Status', displayName: 'Status', width: 80, enableCellEdit: false },
                { name: 'EMIDeductFrom', displayName: 'EMI Deduct From', width: 110, enableCellEdit: false },
                { name: 'ProcessStatus', displayName: 'Process Status', width: 110, enableCellEdit: false },
                {
                    name: 'Action',
                    cellEditableCondition: false,
                    cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='Edit' tooltip-placement='right' href><i class='fa fa-edit fa-lg'></i></a>&nbsp;&nbsp;&nbsp;<a ng-click='grid.appScope.deleteRecord(row)' uib-tooltip='Delete' tooltip-placement='right' href><i class='fa fa-trash-o fa-lg font-red'></i></a></a></div>"
                },
            ],
        }

        function _loadController() {
            $scope.gridOptions.data = [{
                "EmpCode": "Emp0001",
                "EmpName": "Neeraj Tandon",
                "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll",
                "EMIAmount": "INR 2500",
                "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10",
                "BalancePeriod": "4",
                "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018",
                "ProcessStatus": "Not Started"
            },
            {
                "EmpCode": "Emp0002", "EmpName": "Deepak Jain", "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll", "EMIAmount": "INR 2500", "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10", "BalancePeriod": "4", "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018", "ProcessStatus": "Not Started"
            },
            {
                "EmpCode": "Emp0003", "EmpName": "Pardeep Pandit", "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll", "EMIAmount": "INR 2500", "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10", "BalancePeriod": "4", "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018", "ProcessStatus": "Not Started"
            },
            {
                "EmpCode": "Emp0004", "EmpName": "Satyendra Bhan", "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll", "EMIAmount": "INR 2500", "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10", "BalancePeriod": "4", "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018", "ProcessStatus": "Not Started"
            },
            {
                "EmpCode": "Emp0005", "EmpName": "Nitesh Mishra", "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll", "EMIAmount": "INR 2500", "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10", "BalancePeriod": "4", "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018", "ProcessStatus": "Not Started"
            },
            {
                "EmpCode": "Emp0006", "EmpName": "Ritesh Jain", "LoanAmount": "INR 25000",
                "DisbursalMode": "Reliable PayRoll", "EMIAmount": "INR 2500", "OutstandingAmount": "25000",
                "ActualRepaymentTerm": "10", "BalancePeriod": "4", "Status": "Not Started",
                "EMIDeductFrom": "01-Sep-2018", "ProcessStatus": "Not Started"
            }]
        }


        _loadController();
    }
})();

