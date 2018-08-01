/**
 * @author NKM
 * created on 26.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.leavestatement')
        .controller('leaveStatementController', leaveStatementController);
    function leaveStatementController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        $scope.data = [{ Name: "Deepak", Age: "31", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        { Name: "Neeraj", Age: "35", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        { Name: "Satyendra", Age: "28", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        { Name: "Nitesh", Age: "28", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        { Name: "Pardeep", Age: "26", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        { Name: "Ritesh", Age: "22", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        ];

        console.log($scope.data)
        // var pdfRows = [];
        // var pdfHeader = [];
        // var columnList = [];

        // var columnList = [
        //     { name: 'Name', displayName: 'Employee Name' },
        //     { name: 'Age', displayName: 'Current Aage' },
        //     { name: 'Department', displayName: 'Department' },
        //     { name: 'Design', displayName: 'Design' },
        //     { name: 'Location', displayName: 'Location' },
        //     { name: 'Place', displayName: 'Place' }
        // ];

        // var pdfRows = [];
        // var pdfHeader = [];
        // angular.forEach(columnList, function (col) {
        //     var pdfCell = {};
        //     pdfCell.text = col.displayName;
        //     pdfCell.style = 'filledHeader';
        //     pdfHeader.push(pdfCell);
        // })
        // pdfRows.push(pdfHeader);


        // angular.forEach($scope.data, function (row) {
        //     var pdfRow = [];
        //     angular.forEach(columnList, function (col) {
        //         var pdfCell = {};
        //         pdfCell.text = row[col.name];
        //         pdfCell.style = 'tableLabel';
        //         pdfRow.push(pdfCell);
        //     })
        //     pdfRows.push(pdfRow);
        // });
        // console.log(pdfRows)


        $scope.downLoadPdf = _downLoadPdf;

        function _loadController() {
            var searchLists = [];
            searchLists.push({
                field: 'ELTEmpId',
                operand: "=",
                value: 5
            })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 517).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result[0])
            var leaveStatementData = result[0];

            // body: [[
            //     {
            //         // text: $scope.title + ' ' + $scope.firstName + ' ' + $scope.surname,
            //         text: 'Mr.' + ' ' + 'Nitesh' + ' ' + 'Kumar Mishra',
            //         style: 'tableHeader', colSpan: 6
            //     }, {}, {}, {}, {}, {}
            // ],
            // angular.forEach($scope.data, function (col, val) {
            //     [
            //         { text: col.Name, style: 'tableLabel' },
            //         { text: col.Name, style: 'tableLabel' },
            //         { text: col.Name, style: 'tableLabel' },
            //         { text: col.Name, style: 'tableLabel' },
            //         { text: col.Name, style: 'tableLabel' },
            //         { text: col.Name, style: 'tableLabel' }
            //     ]
            //     console.log(col)
            //     console.log(val)
            // })]

            var columnList = [
                { name: 'LTName', displayName: 'Leave Type' },
                { name: 'ELTLeaveCr', displayName: 'Credit' },
                { name: 'ELTLeaveDr', displayName: 'Debit' },
                { name: 'BalanceLeave', displayName: 'Balance' },
                { name: 'ELTPeriodFromDate', displayName: 'Period From Date' },
                { name: 'ELTPeriodToDate', displayName: 'Period To Date' }
            ];

            var pdfRows = [];
            var pdfHeader = [];
            pdfRows.push([{
                text: 'Mr.' + ' ' + 'Nitesh' + ' ' + 'Kumar Mishra',
                style: 'tableHeader', colSpan: 6
            }, {}, {}, {}, {}, {}])
            angular.forEach(columnList, function (col) {
                var pdfCell = {};
                pdfCell.text = col.displayName;
                pdfCell.style = 'filledHeader';
                pdfHeader.push(pdfCell);
            })
            pdfRows.push(pdfHeader);
            angular.forEach(leaveStatementData, function (row) {
                var pdfRow = [];
                angular.forEach(columnList, function (col) {
                    var pdfCell = {};
                    pdfCell.text = row[col.name];
                    pdfCell.style = 'tableLabel';
                    pdfRow.push(pdfCell);
                })
                pdfRows.push(pdfRow);
            });
            console.log(pdfRows)
            $scope.pdfRowsData = pdfRows;
        }

        function _getCustomQueryErrorResult(error) {
            console.log(error);
        }

        function _downLoadPdf() {
            console.log($scope.pdfRowsData);
            // var docDefinition = { content: JSON.stringify(JSON.stringify($scope.data)) };
            var docDefinition = {
                header: function () {
                    return [
                        {
                            style: 'table',
                            margin: [62, 35, 62, 35],
                            table: {
                                widths: ['*', '*'],
                                headerRows: 0,
                                body: [
                                    [
                                        { text: 'Leave Statement', style: 'topHeader', alignment: 'left' },
                                        // {
                                        //     text: 'base64-image-string-goes-here',
                                        //     width: 150,
                                        //     alignment: 'right'
                                        // }
                                    ]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
                },
                footer: function (currentPage, pageCount) {
                    return [
                        { text: currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'footer' }
                    ]
                },
                content: [
                    {
                        style: 'topTable',
                        table: {
                            // widths: ['*', '*', '*', '*', '*', '*'],
                            widths: [60, 60, 60, 60, 80, 80],
                            heights: [18],
                            headerRows: 1,
                            body: $scope.pdfRowsData
                        },
                        layout: {
                            paddingLeft: function (i, node) {
                                return 8;
                                console. log(body)
                            },
                            paddingRight: function (i, node) { return 8; },
                            paddingTop: function (i, node) { return 6; },
                            paddingBottom: function (i, node) { return 6; },
                            fillColor: function (i, node) {
                                return (i % 2 === 0) ? '#F5F5F5' : null;
                            }
                        }
                    }
                ],
                pageSize: 'A4',
                pageMargins: [62, 80, 62, 80],
                styles: {
                    topHeader: {
                        fontSize: 20,
                        bold: true,
                        margin: [0, 6, 0, 30],
                        alignment: 'left'
                    },
                    table: {
                        fontSize: 8,
                        alignment: 'left',
                        color: 'black',
                        margin: [0, 5, 0, 15]
                    },
                    header: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 15],
                        alignment: 'left'
                    },
                    footer: {
                        fontSize: 8,
                        margin: [0, 25, 0, 17],
                        alignment: 'center'
                    }
                }
            };
            pdfMake.createPdf(docDefinition).open();
        };

        _loadController()




    }
})();
