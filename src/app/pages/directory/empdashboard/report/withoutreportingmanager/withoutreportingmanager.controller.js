/**
 * @author NKM
 * created on 05.09.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('withOutReportingController', withOutReportingController);
    function withOutReportingController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        // $scope.data = [{ Name: "Deepak", Age: "31", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // { Name: "Neeraj", Age: "35", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // { Name: "Satyendra", Age: "28", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // { Name: "Nitesh", Age: "28", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // { Name: "Pardeep", Age: "26", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // { Name: "Ritesh", Age: "22", Department: "IT", Design: "SD", Location: "Noida", Place: "Sec 10" },
        // ];

        // console.log($scope.data)
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
                value: $rootScope.user.profile.empId
            })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 517).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            console.log(result[0])
            var leaveStatementData = result[0];
            $scope.imageLogo = result[1][0].FileContent;
            console.log(result[1][0].FileContent)
            var deptName = result[0][0].DeptName;
            var desgName = result[0][0].DesgName;
            $scope.companyName = result[1][0].CCOName;
            $scope.companyAddress = result[1][0].CCOAddress;



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
                text: result[0][0].EmpName + ',  ' + 'Depatmet -' + deptName + ',  ' + 'Designation -' + desgName,
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
                // header: function () {
                //     return [
                //         {
                //             style: 'table',
                //             margin: [62, 35, 62, 35],
                //             table: {
                //                 body: [
                //                     [

                //                         { text: 'Saaksshaat Pvt. Ltd.\n' + 'Noida Sector-10'},
                //                         //{ text: 'Leave Statement' },
                //                         // { text: 'Noida Sector-10', alignment: 'left' },
                //                         {
                //                             // http://www.mydomain.com/images/image1.jpg
                //                             // image: 'http://localhost:3000/rudra/src/assets/companydirectory/saaksshaat/flower-logo.jpg',
                //                             // image: 'assets/companydirectory/saaksshaat/flower-logo.jpg',
                //                             // image:'',
                //                             // width: 150,
                //                             // alignment: 'right'
                //                         }
                //                     ]
                //                 ]
                //             },
                //             layout: 'noBorders'

                //         }
                //     ]

                // },

                header: {

                    columns: [
                        {
                            margin: [62, 35, 0, 0],
                            // usually you would use a dataUri instead of the name for client-side printing
                            // sampleImage.jpg however works inside playground so you can play with it
                            image: 'data:image/png;base64,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',
                            width: 40
                        },
                        {
                            // margin: [250, 35, 0, 0],
                            text: $scope.companyName + '\n' + $scope.companyAddress + '\n' + ' Leave Statement (Date - ' + moment().format('DD-MMM-YYYY') + ')',
                            style: 'header'
                        },
                        // {
                        //     // margin: [250, 35, 0, 0],
                        //     text: 'Date - 02-Aug-2018',
                        //     style: 'dateMargin'
                        // }
                    ]
                },
                footer: function (currentPage, pageCount) {
                    return [
                        { text: currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'footer' }
                    ]
                },
                content: [
                    // [
                    //     { text: 'Saaksshaat Pvt. Ltd', style: 'subheader', alignment: 'middle' },
                    //     { text: 'Noida Sector-10', style: 'subheader', alignment: 'middle' },
                    // ],
                    [
                        {
                            style: 'topTable',
                            table: {
                                // { text: 'Saaksshaat Pvt. Ltd', style: 'header', alignment: 'left' },
                                // { text: 'Noida Sector-10', style: 'subheader', alignment: 'left' },
                                // widths: ['*', '*', '*', '*', '*', '*'],
                                widths: [60, 60, 60, 60, 80, 80],
                                heights: [18],
                                headerRows: 1,
                                body: $scope.pdfRowsData
                            },
                            layout: {
                                paddingLeft: function (i, node) {
                                    return 8;
                                    console.log(body)
                                },
                                paddingRight: function (i, node) { return 8; },
                                paddingTop: function (i, node) { return 6; },
                                paddingBottom: function (i, node) { return 6; },
                                fillColor: function (i, node) {
                                    return (i % 2 === 0) ? '#F5F5F5' : null;
                                }
                            }
                        }
                    ]

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
                    dateMargin: {
                        alignment: 'right',
                        margin: [0, 35, 0, 0],
                    },
                    fontAllign: {
                        alignment: 'right'
                    },
                    table: {
                        fontSize: 12,
                        alignment: 'left',
                        color: 'green',
                        margin: [0, 5, 0, 15]
                    },
                    header: {
                        fontSize: 14,
                        bold: true,
                        margin: [0, 20, 0, 0],
                        // margin: [0, 10, 0, 15],
                        alignment: 'center'
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
