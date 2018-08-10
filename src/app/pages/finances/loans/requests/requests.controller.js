/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payrollprocess.loans.outstanding')
        .controller('loanRequestController', loanRequestController);

    /** @ngInject */
    function loanRequestController($scope) {

        $scope.gridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { name: 'EmpCode', displayName: 'EmpCode', enableCellEdit: false },
                { name: 'EmpName', displayName: 'EmpName', enableCellEdit: false },
                { name: 'LoanAmount', displayName: 'Loan Amount', enableCellEdit: false },
                { name: 'ExpectedOn', displayName: 'Expected On', enableCellEdit: false },
                { name: 'EMIStartFrom', displayName: 'EMI Start From', enableCellEdit: false },
                { name: 'ActualRepaymentTerm', displayName: 'Actual Repayment Term', enableCellEdit: false },
                { name: 'Comment', displayName: 'Comment', enableCellEdit: false },
                { name: 'Status', displayName: 'Status', enableCellEdit: false },
                { name: 'RequestedOn', displayName: 'Requested On', enableCellEdit: false },
                { name: 'RequestedBy', displayName: 'Requested By', enableCellEdit: false },
                {
                    name: 'Action',
                    cellEditableCondition: false,
                    cellTemplate: "<div class='ui-grid-cell-contents'><a ng-click='grid.appScope.editRecord(row)' uib-tooltip='Edit' tooltip-placement='right' href><i class='fa fa-edit fa-lg'></i></a>&nbsp;&nbsp;&nbsp;<a ng-click='grid.appScope.deleteRecord(row)' uib-tooltip='Delete' tooltip-placement='right' href><i class='fa fa-trash-o fa-lg font-red'></i></a></a></div>"
                },
            ],
        }

        function _loadController() {
            $scope.gridOptions.data = [{
                "EmpCode": "Emp0001", "EmpName": "Neeraj Tandon", "LoanAmount": "INR 25000",
                "ExpectedOn": "31-Aug-2018", "EMIStartFrom": "31-Sep-2018", 
                "ActualRepaymentTerm": "10", "Comment": "Please approved my loand", "Status": "Not Started",
                "RequestedOn": "30-Aug-2018", "RequestedBy": "Neeraj Tandon"
            },
            {
                "EmpCode": "Emp0002", "EmpName": "Deepak Jain", "LoanAmount": "INR 25000",
                "ExpectedOn": "31-Aug-2018", "EMIStartFrom": "31-Sep-2018", 
                "ActualRepaymentTerm": "10", "Comment": "Please approved my loand", "Status": "Not Started",
                "RequestedOn": "30-Aug-2018", "RequestedBy": "Deepak Jain"
            },
          ]
        }


        _loadController();
    }
})();

