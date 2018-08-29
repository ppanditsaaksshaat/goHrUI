/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans.requests')
        .controller('loanRequestController', loanRequestController);

    /** @ngInject */
    function loanRequestController($scope) {
        console.log('requested')
      
        $scope.gridOptions = {
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableScrollbars: false,

            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', width: 70, enableCellEdit: false },
                { name: 'EmpName', displayName: 'EmpName',width: 110, enableCellEdit: false },
                { name: 'LoanAmount', displayName: 'Loan Amount',width: 100, enableCellEdit: false },
                { name: 'ExpectedOn', displayName: 'Expected On',width: 80, enableCellEdit: false },
                { name: 'EMIStartFrom', displayName: 'EMI Start From',width: 100, enableCellEdit: false },
                { name: 'ActualRepaymentTerm', displayName: 'Actual Repayment Term',width: 100, enableCellEdit: false },
                { name: 'Comment', displayName: 'Comment',width: 100, enableCellEdit: false },
                { name: 'Status', displayName: 'Status',width: 80, enableCellEdit: false },
                { name: 'RequestedOn', displayName: 'Requested On',width: 100, enableCellEdit: false },
                { name: 'RequestedBy', displayName: 'Requested By',width: 100, enableCellEdit: false },
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
                "ExpectedOn": "31-Aug-2018", 
                "EMIStartFrom": "31-Sep-2018", 
                "ActualRepaymentTerm": "10", 
                "Comment": "Please approved my loand", 
                "Status": "Not Started",
                "RequestedOn": "30-Aug-2018", 
                "RequestedBy": "Neeraj Tandon"
            },
            {
                "EmpCode": "Emp0002", 
                "EmpName": "Deepak Jain", 
                "LoanAmount": "INR 25000",
                "ExpectedOn": "31-Aug-2018", 
                "EMIStartFrom": "31-Sep-2018", 
                "ActualRepaymentTerm": "10", 
                "Comment": "Please approved my loand", 
                "Status": "Not Started",
                "RequestedOn": "30-Aug-2018", 
                "RequestedBy": "Deepak Jain"
            },
          ]
        }


        _loadController();
    }
})();

