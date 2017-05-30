/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees.list')
        .controller('OrgEmpUploadController', OrgEmpUploadController);

    /** @ngInject */
    /** @ngInject */
    function OrgEmpUploadController($scope, $sce, $filter, $http, uiGridConstants, $interval, $timeout,
        $uibModal, pageService, $q, DJWebStore, $window, DJWebStoreGlobal) {
        var vm = this;
        vm.acceptInvalidData = false, vm.ignoreCase = undefined;
        var uploadHistoryPageId = 440;
        var uploadHistoryTableId = 414;
        var uploadHistoryPKId = 3;
        vm.skipDataList = [];
        vm.skipDataLists = [];
        vm.validateUploadData = false;
        $scope.fileResult = undefined;
        $scope.uploadHistory = {}
        $scope.uploadHistory.gridOptions = $scope.getGridSetting();
        $scope.uploadHistory.boxOptions = {
            showRefresh: true,
            showFilter: false,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            enableAutoRefresh: true,
            refreshData: _refreshUploadHistory,
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            openView: null,
            uploadRecord: null
        }

        // vm.summaryStep1 = false;
        // vm.summaryStep2 = false;


        vm.gridOptions = { data: [] }
        vm.uploader = [];
        vm.migrate = {
            currentStep: 1,
            tables: [],
            unMappedList: [],
            step1: true, step2: false, step3: false, step4: false, step5: false, step6: false, step7: false
        }
        vm.normaltabs2 = true;

        //  vm.migrate.step1=true;

        vm.resultGridOptions = $scope.getGridSetting();
        vm.resultGridOptions.exporterMenuCsv= true;
        vm.succesResultGridOptions = $scope.getGridSetting();
        vm.succesResultGridOptions.exporterMenuCsv= true;
        vm.gridOptions = $scope.getGridSetting();

        // vm.gridOptions = {
        //     enableFiltering: false,
        //     showGridFooter: false,
        //     showColumnFooter: false,
        //     enableHorizontalScrollbar: false,
        //     enableVerticalScrollbar: false,
        //     enableCellEditOnFocus: false
        // };

        // vm.skipgridOptions = {
        //     enableFiltering: false,
        //     showGridFooter: false,
        //     showColumnFooter: false,
        //     enableHorizontalScrollbar: false,
        //     enableVerticalScrollbar: false,
        //     enableCellEditOnFocus: false
        // };






        //  vm.includeSrc = 'templates/crm/migrate.html?q=1';

        function _getUploadHistoryDetail() {
            pageService.getPagData(uploadHistoryPageId).then(function (result) {
                console.log(result)

                // pageService.findEntity(uploadHistoryTableId, uploadHistoryPKId, undefined).then(function (result) {
                //     console.log(result)
                // var data = result;
                // // var decomData = DJWebStoreGlobal.Decompress(result);
                // var paramData = LZString.decompressFromEncodedURIComponent(result.UEHDUploadData);
                // // var data = result.decompress();
                // console.log(paramData)

                $scope.uploadHistory = angular.extend($scope.uploadHistory, result);
                $scope.setPage(result)
                console.log($scope.uploadHistory);
                $scope.uploadHistory.gridOptions = $scope.gridSetupColumns($scope.uploadHistory.gridOptions, result.pageinfo.columns, result, true, true, true, true);
                _refreshUploadHistory();

            })
        }

        function _refreshUploadHistory() {
            var orderBy = [];
            var orderByLists = {
                column: "CreatedOn",
                isDesc: true,
            }
            orderBy.push(orderByLists);

            // var resultDataList = [];
            var data = {
                searchList: [],
                orderByList: orderBy
            }

            pageService.getTableData(uploadHistoryTableId, uploadHistoryPageId, '', '', false, data).then(function (result) {

                console.log(result)
                $scope.uploadHistory.gridOptions.data = result;

                // angular.forEach(result, function (rows, ridx) {
                //      resultDataList = rows.UEHDUploadData

                // })

                // var data = resultDataList;
                // var paramData = LZString.decompressFromEncodedURIComponent(data);
                // console.log(paramData)
            })


        }

        function _setFieldMatching() {
            vm.migrate.findFieldList = [];
            //firstCheck, secondCheck, tableIndex, rowIndex, colIndex
            addFieldCheck('department', '', 0, 0, 0);

            //Date Of Joining
            addFieldCheck('doj', '', 0, 0, 1);
            addFieldCheck('date', 'joining', 0, 0, 1);
            addFieldCheck('D.O.J', '', 0, 0, 1);

            addFieldCheck('employment', '', 0, 1, 0);
            addFieldCheck('employment', 'type', 0, 1, 0);
            addFieldCheck('employmenttype', '', 0, 1, 0);
            addFieldCheck('employeement', '', 0, 1, 0);
            addFieldCheck('employeement', 'type', 0, 1, 0);
            addFieldCheck('employeementtype', '', 0, 1, 0);

            addFieldCheck('grade', '', 0, 1, 1);
            addFieldCheck('designation', '', 0, 2, 0);
            addFieldCheck('level', '', 0, 2, 1);
            addFieldCheck('category', '', 0, 3, 0);

            //subunit
            addFieldCheck('sub', '', 0, 3, 1);
            addFieldCheck('sub', 'unit', 0, 3, 1);

            //email
            addFieldCheck('office', 'email', 0, 4, 0);
            addFieldCheck('officeemail', '', 0, 4, 0);

            //mobile
            // addFieldCheck('office', 'mobile', 0, 4, 1);
            addFieldCheck('officemobile', '', 0, 4, 1);

            //phone
            addFieldCheck('office', 'phone', 0, 5, 0);
            addFieldCheck('phone', '', 0, 5, 0);

            //Office Ext.
            addFieldCheck('office', 'ext', 0, 5, 1);
            addFieldCheck('ext', '', 0, 5, 1);

            // Single OT
            addFieldCheck('is', 'singleot', 0, 6, 0);
            addFieldCheck('issingleot', '', 0, 6, 0);
            // addFieldCheck('singleot', '', 0, 6, 0);

            // Double OT
            addFieldCheck('is', 'doubleot', 0, 6, 1);
            addFieldCheck('isdoubleot', '', 0, 6, 1);
            // addFieldCheck('doubleot', '', 0, 6, 1);

            //Single OT Rate
            addFieldCheck('single', 'rate', 0, 7, 0);
            addFieldCheck('singlerate', '', 0, 7, 0);

            //Double OT Rate
            addFieldCheck('doubleot', 'rate', 0, 7, 1);
            addFieldCheck('doublerate', '', 0, 7, 1);

            //emp code
            addFieldCheck('emp', 'code', 1, 0, 0);
            addFieldCheck('employee', 'code', 1, 0, 0);
            addFieldCheck('empcode', '', 1, 0, 0);
            addFieldCheck('code', '', 1, 0, 0);

            var extraRowIndex = 0;
            //emp name
            if (vm.showEmployeeName) {
                addFieldCheck('employee', 'name', 1, 0, 1);
                addFieldCheck('empname', '', 1, 0, 1);
                extraRowIndex = 0;
            }
            else {
                extraRowIndex = 2
                addFieldCheck('title', '', 1, 1, 0);


                //for first name
                addFieldCheck('first', 'name', 1, 1, 1);
                addFieldCheck('firstname', '', 1, 1, 1);


                //for last name
                addFieldCheck('last', 'name', 1, 2, 0);
                addFieldCheck('lastname', '', 1, 2, 0);

                //for middle name
                addFieldCheck('middle', 'name', 1, 2, 1);
                addFieldCheck('middlename', '', 1, 2, 1);
            }



            //date of birth check
            addFieldCheck('date', 'birth', 1, 1 + extraRowIndex, 0);
            addFieldCheck('dateofbirth', '', 1, 1 + extraRowIndex, 0);
            addFieldCheck('dob', '', 1, 1 + extraRowIndex, 0);
            addFieldCheck('d.o.b', '', 1, 1 + extraRowIndex, 0);
            addFieldCheck('birthdate', '', 1, 1 + extraRowIndex, 0);

            //Marriage Status
            addFieldCheck('marriage', 'status', 1, 1 + extraRowIndex, 1);
            addFieldCheck('marriagestatus', '', 1, 1 + extraRowIndex, 1);

            addFieldCheck('gender', '', 1, 2 + extraRowIndex, 0);
            addFieldCheck('email', '', 1, 2 + extraRowIndex, 1);

            addFieldCheck('mobileno', '', 1, 3 + extraRowIndex, 0);

            //anniversery date
            addFieldCheck('anniversary', 'date', 1, 3 + extraRowIndex, 1);
            addFieldCheck('anniversarydate', '', 1, 3 + extraRowIndex, 1);

            addFieldCheck('facebook', '', 1, 4 + extraRowIndex, 0);

            //pancard
            addFieldCheck('pan', 'no', 1, 4 + extraRowIndex, 1);
            addFieldCheck('pan', '', 1, 4 + extraRowIndex, 1);


            //linkedin
            addFieldCheck('linked', 'in', 1, 5 + extraRowIndex, 0);
            addFieldCheck('linkedin', 'Unit', 1, 5 + extraRowIndex, 0);
            //aadhaar card
            addFieldCheck('aadhaar', '', 1, 5 + extraRowIndex, 1);
            addFieldCheck('aadhaarcard', '', 1, 5 + extraRowIndex, 1);
            addFieldCheck('aadhaarno', '', 1, 5 + extraRowIndex, 1);

            addFieldCheck('twitter', '', 1, 6 + extraRowIndex, 0);

            //other number
            // addFieldCheck('other', 'identity', 1, 8, 1);
            addFieldCheck('otheridentity', '', 1, 6 + extraRowIndex, 1);

            addFieldCheck('religion', '', 1, 7 + extraRowIndex, 0);
            addFieldCheck('nationality', '', 1, 7 + extraRowIndex, 1);

            //Salary Mode
            addFieldCheck('salary', 'mode', 2, 0, 0);
            addFieldCheck('salarymode', '', 2, 0, 0);

            //PF Account Number
            addFieldCheck('pf', 'account', 2, 0, 1);
            addFieldCheck('pfaccount', '', 2, 0, 1);

            //PF Start Date
            addFieldCheck('pf', 'date', 2, 1, 0);
            addFieldCheck('pfdate', '', 2, 1, 0);

            //ESI Account Number
            addFieldCheck('esi', 'account', 2, 1, 1);
            addFieldCheck('esiaccount', '', 2, 1, 1);

            //ESI Start Date
            addFieldCheck('esi', 'startdate', 2, 2, 0);
            addFieldCheck('esistartdate', '', 2, 2, 0);

            //ESI Dispensary name
            // addFieldCheck('esi', 'dispensary', 2, 2, 1);
            addFieldCheck('BankAccountNo', '', 2, 2, 1);




        }

        //Public Functions
        vm.getAddedList = function () {
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = false;
            vm.migrate.step5 = true;
            vm.migrate.step6 = false;
            vm.migrate.step7 = true;
        }

        vm.getSkipList = function () {
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = false;
            vm.migrate.step5 = true;
            vm.migrate.step6 = true;
            vm.migrate.step7 = false;

        }

        vm.setupMigrate = function () {

            vm.migrate.tables = [];

            var table1 = { title: 'Job Description', rows: [] }

            table1.rows.push({
                column1: { name: 'JDDeptId', text: 'Department', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDDate', text: 'Date Of Joining', type: 'date', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDEmploymentId', text: 'Employment Type', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDEmpGradeId', text: 'Grade', type: 'text', required: false, value: 'none' },

            })

            table1.rows.push({
                column1: { name: 'JDDesgId', text: 'Designation', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDEmpLevelId', text: 'Level', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDCategory', text: 'Category', type: 'text', required: false, value: 'none' },
                column2: { name: 'JDSubUnitID', text: 'Sub Unit', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDOfficeEmail', text: 'Office Email', type: 'text', required: false, value: 'none' },
                column2: { name: 'JDOfficeMobile', text: 'Office Mobile', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDOfficePhone', text: 'Office Phone', type: 'text', required: false, value: 'none' },
                column2: { name: 'JDOfficeExtention', text: 'Office Ext.', type: 'text', required: false, value: 'none' }
            })


            table1.rows.push({
                column1: { name: 'SingleOT', text: 'Single OT', type: 'bool', required: false, value: 'none' },
                column2: { name: 'JDDoubleOT', text: 'Double OT', type: 'bool', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDSingleOTRate', text: 'Single OT Rate', type: 'decimal', required: false, value: 'none' },
                column2: { name: 'DoubleOTRate', text: 'Double OT Rate', type: 'decimal', required: false, value: 'none' }
            })



            vm.migrate.tables.push(table1);

            var table2 = { title: 'Personal', rows: [] }


            table2.rows.push({
                column1: { name: 'EmpCode', text: 'Employee Code', type: 'text', required: false, value: 'none' }
            })
            if (vm.showEmployeeName) {
                table2.rows[0].column2 = { name: 'EmpName', text: 'Employee Full Name', type: 'text', required: true, value: 'none' };
            }
            else {
                table2.rows.push({
                    column1: { name: 'EmpTitleId', text: 'Title', type: 'text', required: false, value: 'none' },
                    column2: { name: 'EmpFirstName', text: 'First Name', type: 'text', required: false, value: 'none' }

                })
                table2.rows.push({
                    column1: { name: 'EmpLastName', text: 'Last Name', type: 'text', required: false, value: 'none' },
                    column2: { name: 'EmpMiddleName', text: 'Middle Name', type: 'text', required: false, value: 'none' }

                })
            }


            table2.rows.push({
                column1: { name: 'PdDateOfBirth', text: 'Date Of Birth', type: 'date', required: true, value: 'none' },
                column2: { name: 'PdMaritalId', text: 'Marriage Status', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PdGenderId', text: 'Gender', type: 'text', required: true, value: 'none' },
                column2: { name: 'PdEmail', text: 'Email', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PdMobileNo', text: 'Mobile', type: 'text', required: true, value: 'none' },
                column2: { name: 'PDAnniversaryDate', text: 'Anniversary Date', type: 'date', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PDFacebook', text: 'Facebook', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDPanCard', text: 'PAN No', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PDLinkedIn', text: 'LinkedIn', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDAdhar', text: 'Aadhaar', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PDTwitter', text: 'Twitter', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDOtherNumber', text: 'Other Identity', type: 'text', required: false, value: 'none' }
            })
            table2.rows.push({
                column1: { name: 'PDReligionId', text: 'Religion', type: 'text', required: false, value: 'none' },
                column2: { name: 'PdNationalityId', text: 'Nationality', type: 'text', required: false, value: 'none' }
            })





            vm.migrate.tables.push(table2);



            //Account information
            var table3 = { title: 'Account', rows: [] }

            table3.rows.push({
                column1: { name: 'ADSalaryModeId', text: 'Salary Mode', type: 'text', required: false, value: 'none' },
                column2: { name: 'PFPPFAccountNo', text: 'PF Account Number', type: 'text', required: false, value: 'none' }
            })

            table3.rows.push({
                column1: { name: 'PFPPFMemberDate', text: 'PF Start Date', type: 'text', required: false, value: 'none' },
                column2: { name: 'ESIMemeberNo', text: 'ESI Account Number', type: 'text', required: false, value: 'none' }
            })

            table3.rows.push({
                column1: { name: 'ESIMemeberDate', text: 'ESI Start Date', type: 'text', required: false, value: 'none' },
                column2: { name: 'BankAccountNo', text: 'Bank Account', type: 'text', required: false, value: 'none' }
            })

            vm.migrate.tables.push(table3);


            //vm.migrate.findFieldList = [];


        }
        vm.nextDataUpload = function () {
            console.log(vm.ignoreCase, vm.acceptInvalidData)
            $window.scrollTo(0, 0);
            _getUploadHistoryDetail();
            if (vm.showEmployeeName == true) {
                // vm.showEmpName();
            }
            // vm.rudraField20 = true;
            // vm.importColumn20 = true;

            if (vm.migrate.currentStep == 1) {
                if (vm.gridOptions.data.length <= 0) {
                    alert('No data found.')
                }
                else {
                    if (vm.ignoreCase == undefined) {
                        // alert('Please choose any one option from acceptance of invalid data')
                        $scope.showMsg('error', 'Please choose any one option from acceptance of invalid data')
                        return;
                    }

                    _setFieldMatching();
                    vm.setupMigrate();
                    // debugger;
                    vm.matchingFields();
                    vm.migrate.currentStep = 2;
                    vm.migrate.step1 = false;
                    vm.migrate.step2 = true;
                    vm.migrate.step3 = false;
                }
            }
            else if (vm.migrate.currentStep == 2) {
                if (validateFields()) {
                    //validateFields
                    vm.migrate.currentStep = 3;
                    vm.migrate.step1 = false;
                    vm.migrate.step2 = false;
                    vm.migrate.step3 = true;
                    vm.isError = false;

                    //Generate a List of Unmapped Columns
                    //loop this : vm.gridOptions.columnDefs
                    //nested loop for : migrate.tables
                    //nested loop for : tables.rows and check in column1.value, column2.value
                    //if not found push in unMapped otherwise ignore

                    vm.migrate.unMappedList = [];

                    angular.forEach(vm.gridOptions.columnDefs, function (col, colIdx) {
                        var isFound = false;

                        angular.forEach(vm.migrate.tables, function (table, tidx) {
                            angular.forEach(table.rows, function (row, ridx) {
                                if (row.column1 !== undefined) {
                                    if (col.name == row.column1.value) {
                                        isFound = true;
                                    }
                                }
                                if (row.column2 !== undefined) {
                                    if (col.name == row.column2.value) {
                                        isFound = true;
                                    }
                                }




                            })
                        })

                        if (!isFound) {
                            vm.migrate.unMappedList.push(col.name)
                        }
                    });
                    // console.log(vm.migrate.unMappedList);
                    // alert('unmapped column');
                }
            }
            else if (vm.migrate.currentStep == 3) {
                vm.migrate.step1 = false;
                vm.migrate.step2 = false;
                vm.migrate.step3 = false;
                vm.migrate.step4 = true;

            }
        }
        vm.goPrevious = function () {
            if (vm.migrate.currentStep == 1) {

            }
            else if (vm.migrate.currentStep == 2) {
                vm.migrate.step1 = true;
                vm.migrate.step2 = false;
                vm.migrate.step3 = false;
                vm.migrate.step4 = false;
                vm.migrate.step5 = false;
                vm.migrate.currentStep = 1;
                _setFieldMatching();
            }
            else if (vm.migrate.currentStep == 3) {
                vm.migrate.step1 = false;
                vm.migrate.step2 = true;
                vm.migrate.step3 = false;
                vm.migrate.step4 = false;
                vm.migrate.step5 = false;
                vm.migrate.currentStep = 2;
            }
            else if (vm.migrate.currentStep == 4) {
                vm.migrate.step1 = false;
                vm.migrate.step2 = true;
                vm.migrate.step3 = true;
                vm.migrate.step4 = false;
                vm.migrate.step5 = false;
                vm.migrate.currentStep = 3;
            }
        }

        vm.clear = function () {

            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {
                    row.column1.value = 'none';

                    if (row.column2 !== undefined) {
                        row.column2.value = 'none';
                    }

                })
            })
        }
        vm.cancelDataUpload = function () {

            if (vm.migrate.currentStep == 2) {

                vm.migrate.currentStep = 1;
                vm.migrate.step1 = true;
                vm.migrate.step2 = false;
                vm.migrate.step3 = false;
                vm.migrate.step4 = false;
            }
            else if (vm.migrate.currentStep == 3) {

                vm.migrate.currentStep = 2;
                vm.migrate.step1 = false;
                vm.migrate.step2 = true;
                vm.migrate.step3 = false;
                vm.migrate.step4 = false;
            }
        }
        vm.matchingFields = function () {
            angular.forEach(vm.gridOptions.columnDefs, function (col, colIdx) {
                var isUsable = _findUsable(col.name);
                console.log(col.name)
                if (isUsable) {
                    console.log(isUsable);
                }

            })
        }


        vm.employeeShowData = function () {
            if (vm.showEmployeeName) {
                $scope.showMsg('success', 'Employee full name is exists in template file.');
                // vm.migrate.step2=true;
                // vm.migrate.step1=false;

            }


        }
        // vm.importDataUpload = function () {
        //     // alert('import');
        //     vm.migrate.currentStep = 3;
        //     vm.migrate.step1 = false;
        //     vm.migrate.step2 = false;
        //     vm.migrate.step3 = false;
        //     vm.migrate.step4 = true;

        //     var mappedFieldsList = {};
        //     vm.selectedHeader = []
        //     angular.forEach(vm.migrate.tables, function (table, tidx) {
        //         angular.forEach(table.rows, function (row, ridx) {
        //             if (row.column1 !== undefined) {
        //                 mappedFieldsList[row.column1.name] = row.column1.value;
        //                 if (row.column1.value != 'none')
        //                     vm.selectedHeader.push(row.column1.value)
        //             }
        //             if (row.column2 !== undefined) {
        //                 mappedFieldsList[row.column2.name] = row.column2.value;
        //                 if (row.column2.value != 'none')
        //                     vm.selectedHeader.push(row.column2.value);
        //             }



        //         })
        //     })
        //     if (vm.showEmployeeName === undefined) {
        //         vm.showEmployeeName = false;
        //     }
        //     var fileName = 'Employeedata';

        //     console.log(vm.gridOptions.data)
        //     var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee', isempFullName: vm.showEmployeeName, fileName: fileName }
        //     console.log(uncData)
        //     var postData = JSON.stringify(uncData);
        //     var compressed = LZString.compressToEncodedURIComponent(postData);

        //     var data = { lz: true, data: compressed }
        //     // var data = { data: postData }


        //     if (confirm('Upload record Sure')) {
        //         pageService.uploadEmployeeData(data).then(function (result) {
        //             if (result.skipList.length > 0) {
        //                 vm.migrate.step6 = true;
        //             }
        //             vm.validateUploadData = true;
        //             var successDataLength = result.successList.length;
        //             var skipListDataLength = result.skipList.length;

        //             vm.successLength = successDataLength;
        //             vm.skipListLength = skipListDataLength;

        //             var successData = parseInt(successDataLength)
        //             var skipData = parseInt(skipListDataLength)

        //             vm.totalRecord = successData + skipData;
        //             vm.skipDataList = result.skipList;
        //             console.log(vm.skipDataList)

        //             if (vm.skipDataLists === undefined) {
        //                 vm.skipDataLists = [];

        //             }
        //             // var rowData = "";
        //             // angular.forEach(result.skipList, function (rows, ridx) {
        //             //     angular.forEach(rows, function (rowss, ridx) {
        //             //         rowData = rowss;
        //             //     })
        //             //     vm.skipDataLists.push(rowData);

        //             // })
        //             // console.log(vm.skipDataLists)


        //             vm.migrate.step1 = false;
        //             vm.migrate.step2 = false;
        //             vm.migrate.step3 = false;
        //             vm.migrate.step4 = false;
        //             vm.migrate.step5 = true;
        //             console.log(successDataLength, skipListDataLength, vm.totalRecord)
        //             console.log(result)

        //         }

        //             , function (err) {

        //                 $scope.showMsg('error', err, 'Error Message')
        //                 console.log(err)
        //             })
        //     }
        //     else {
        //         vm.migrate.step3 = true;
        //         vm.migrate.step4 = false;
        //     }

        // }

        vm.importDataUpload = function () {



            var mappedFieldsList = {};
            vm.selectedHeader = []
            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {
                    if (row.column1 !== undefined) {
                        mappedFieldsList[row.column1.name] = row.column1.value;
                        if (row.column1.value != 'none')
                            vm.selectedHeader.push(row.column1.value)
                    }
                    if (row.column2 !== undefined) {
                        mappedFieldsList[row.column2.name] = row.column2.value;
                        if (row.column2.value != 'none')
                            vm.selectedHeader.push(row.column2.value);
                    }



                })
            })


            if (vm.showEmployeeName === undefined) {
                vm.showEmployeeName = false;
            }
            if (vm.isInvalidData) {
                vm.isIgnore = vm.notAcceptInvalidData;
            }
            else {
                vm.isInvalidData = false;
                vm.isIgnore = vm.notAcceptInvalidData;
            }
            // console.log(vm.isInvalidData, vm.notAcceptInvalidData)

            var fileName = 'Employeedata';

            console.log(vm.gridOptions.data)
            var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee', isempFullName: vm.showEmployeeName, fileName: fileName, invalidData: vm.isInvalidData }
            console.log(uncData)
            var postData = JSON.stringify(uncData);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }



            _showConfirm('Do you want to upload ' + '?', _confirmClick, undefined, data)

        }
        function _showToast(type, msg) {
            toastOption.type = type;
            angular.extend(toastrConfig, toastOption);
            openedToasts.push(toastr[toastOption.type](msg, title));
        }

        function _confirmClick(pageId, data, title) {

            vm.migrate.currentStep = 3;
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = true;

            var mappedFieldsList = {};
            vm.selectedHeader = []
            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {
                    if (row.column1 !== undefined) {
                        mappedFieldsList[row.column1.name] = row.column1.value;
                        if (row.column1.value != 'none')
                            vm.selectedHeader.push(row.column1.value)
                    }
                    if (row.column2 !== undefined) {
                        mappedFieldsList[row.column2.name] = row.column2.value;
                        if (row.column2.value != 'none')
                            vm.selectedHeader.push(row.column2.value);
                    }



                })
            })
            if (vm.showEmployeeName === undefined) {
                vm.showEmployeeName = false;
            }
            // if (vm.isInvalidData === undefined) {
            //     if (vm.notAcceptInvalidData === undefined) {
            //         vm.notAcceptInvalidData === false;
            //     }
            // }
            // else {
            //     if (vm.isInvalidData) {
            //         if (vm.acceptInvalidData === undefined) {
            //             vm.acceptInvalidData = false;
            //         }

            //     }
            // }


            // if (vm.isInvalidData) {
            //     vm.isIgnore = vm.notAcceptInvalidData;
            // }
            // else {
            //     vm.isInvalidData = false;
            //     vm.isIgnore = vm.notAcceptInvalidData;
            // }
            // console.log(vm.isInvalidData, vm.notAcceptInvalidData)


            var fileName = 'Employeedata';

            console.log(vm.gridOptions.data)
            var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee', isempFullName: vm.showEmployeeName, fileName: fileName, invalidData: vm.acceptInvalidData, isIgnoreData: vm.ignoreCase }
            console.log(uncData)
            var postData = JSON.stringify(uncData);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }
            // var data = { data: postData }







            pageService.uploadEmployeeData(data).then(function (result) {


                if (result.skipList.length > 0) {
                    vm.migrate.step6 = true;
                }
                vm.validateUploadData = true;
                var successDataLength = result.successList.length;
                var skipListDataLength = result.skipList.length;

                vm.successLength = successDataLength;
                vm.skipListLength = skipListDataLength;

                var successData = parseInt(successDataLength)
                var skipData = parseInt(skipListDataLength)

                vm.totalRecord = successData + skipData;
                vm.skipDataList = result.skipList;
                vm.addedDataList = result.successList;

                console.log(vm.skipDataList)

                if (vm.skipDataLists === undefined) {
                    vm.skipDataLists = [];

                }
                // var columnList = [];

                // var columnListRows = {
                //     $$result,
                //     Aadhaar,



                // }


                //getGridSetting
                // vm.skipgridOptions.columnDefs.push(vm.selectedHeader)
                // vm.skipgridOptions.data = result.skipList;

                // console.log(vm.skipgridOptions.data)
                // console.log(vm.skipgridOptions.data)

                // console.log(result.skipList)
                // console.log(result.skipList)

                if (vm.skipDataList.length > 0) {
                    vm.resultGridOptions.columnDefs = [];
                    vm.resultGridOptions.columnDefs.push({
                        name: '$$result',
                        field: '$$result',
                        displayName: 'Result',
                        width: 200,
                        visible: true,
                        enableFiltering: true

                    });
                    angular.forEach(vm.gridOptions.columnDefs, function (col, cdx) {
                        var colRowHeader = {
                            name: col.name,
                            field: col.field,
                            displayName: col.displayName,
                            width: 150,
                            visible: true,
                            enableFiltering: true

                        };
                        vm.resultGridOptions.columnDefs.push(colRowHeader);
                    })

                    vm.resultGridOptions.data = vm.skipDataList;
                }


                if (result.successList.length > 0) {
                    vm.succesResultGridOptions.columnDefs = [];

                    vm.succesResultGridOptions.columnDefs.push({
                        name: 'EmpCode',
                        field: 'EmpCode',
                        displayName: 'Employee Code',
                        width: 250,
                        visible: true,
                        enableFiltering: true
                    });
                    vm.succesResultGridOptions.columnDefs.push({
                        name: 'EmpFirstName',
                        field: 'EmpFirstName',
                        displayName: 'First Name',
                        width: 250,
                        visible: true,
                        enableFiltering: true
                    });
                    vm.succesResultGridOptions.columnDefs.push({
                        name: 'EmpMiddleName',
                        field: 'EmpMiddleName',
                        displayName: 'Middle Name',
                        width: 230,
                        visible: true,
                        enableFiltering: true
                    });
                    vm.succesResultGridOptions.columnDefs.push({
                        name: 'EmpLastName',
                        field: 'EmpLastName',
                        displayName: 'Last Name',
                        width: 230,
                        visible: true,
                        enableFiltering: true
                    });
                   vm.succesResultGridOptions.columnDefs.push({
                        name: 'EMPCodeAutometic',
                        field: 'EMPCodeAutometic',
                        displayName: 'Employee Auto Code',
                        width: 230,
                        visible: true,
                        enableFiltering: true
                    });
                        // vm.succesResultGridOptions.columnDefs.push(colRowHeaders);
                   


                    vm.succesResultGridOptions.data = result.successList;
                    console.log(result.successList)
                }

                // if (vm.skipDataList.length > 0) {

                // }
                // if (vm.skipDataList.length > 0) {
                //     vm.resultGridOptions.data = vm.skipDataList;
                // }
                //6542667 2512003 cisce.org.in
                // vm.resultGridOptions.data = result.successList;

                // angular.forEach(vm.gridOptions.columnDefs, function (col, colIdx) {


                //     angular.forEach(result.successList, function (table, tidx) {
                //         angular.forEach(table.rows, function (row, ridx) {

                //                 if (col.name == row.column1.value) {

                //                 }


                //                 if (col.name == row.column2.value) {

                //                 }

                //         })
                //     })
                //     vm.migrate.unMappedList.push(col.name)

                // });

                // var rowData = "";
                // angular.forEach(result.skipList, function (rows, ridx) {
                //     angular.forEach(rows, function (rowss, ridx) {
                //         rowData = rowss;
                //     })
                //     vm.skipDataLists.push(rowData);

                // })
                // console.log(vm.skipDataLists)


                vm.migrate.step1 = false;
                vm.migrate.step2 = false;
                vm.migrate.step3 = false;
                vm.migrate.step4 = false;
                vm.migrate.step5 = true;
                console.log(successDataLength, skipListDataLength, vm.totalRecord)
                console.log(result)

                _showToast('success', result.success_message, title)
                //$rootScope.back();
                $rootScope.$broadcast('form-success', result);




            }, function (err) {
                console.log(err)
                $scope.showMsg('error', err, 'Error Message')
            });
        }


        function _showConfirm(msg, funcConfirm, pageId, data, title) {

            console.log(data)
            var para = {
                pageId: pageId,
                data: data,
                title: title,
                confirmClick: funcConfirm,
                confirmMessge: msg
            }
            var modalInstance = $uibModal.open({
                template: '<div class="modal-header"><h3 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">Yes</button><button class="btn btn-warning" type="button" ng-click="cancel()">No</button></div>',
                controller: 'ModalConfirmCtrl',
                size: 'sm',
                windowClass: 'confirm-window',
                resolve: {
                    param: function () {
                        return para;
                    }
                }
            });
        }



        //Private Functions
        function _validateImport() {
            var mappedFieldsList = {};

            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {

                    mappedFieldsList[row.column1.name] = row.column1.value;

                    mappedFieldsList[row.column2.name] = row.column2.value;

                })
            })
            var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee' }
            var postData = JSON.stringify(uncData);
            var compressed = LZString.compressToEncodedURIComponent(postData);
            var data = { lz: true, data: compressed }


        }
        function _findUsable(colName) {
            var isUsable = false;



            angular.forEach(vm.migrate.findFieldList, function (field, rowidx) {
                setUsable(colName, field.firstCheck, field.secondCheck, field.tableIdx, field.rowIdx, field.colIdx)
                console.log(colName)
            })

            return isUsable;
        }
        function setUsable(colName, firstCheck, secondCheck, tableIdx, rowIdx, colIdx) {
            var isUsable = false;
            var lowerValue = colName.toString().toLowerCase();
            if (lowerValue.indexOf(firstCheck.toString().toLowerCase()) >= 0) {
                if (secondCheck != '') {
                    if (lowerValue.indexOf(secondCheck.toString().toLowerCase()) >= 0) {
                        isUsable = true;
                    }
                }
                else {
                    isUsable = true;
                }

                if (isUsable) {
                    if (colIdx == 1) {
                        if (vm.migrate.tables[tableIdx].rows[rowIdx] !== undefined)
                            vm.migrate.tables[tableIdx].rows[rowIdx].column2.value = colName;
                        console.log(colName)
                    }
                    else {
                        if (vm.migrate.tables[tableIdx].rows[rowIdx] !== undefined)
                            vm.migrate.tables[tableIdx].rows[rowIdx].column1.value = colName;
                    }
                }
            }
        }
        function addFieldCheck(firstCheck, secondCheck, tableIdx, rowIdx, colIdx) {
            vm.migrate.findFieldList.push({
                firstCheck: firstCheck,
                secondCheck: secondCheck,
                tableIdx: tableIdx,
                rowIdx: rowIdx,
                colIdx: colIdx
            })
        }
        function validateFields() {
            var isValid = true;
            var invalidField = '';
            var mappedFieldsList = {};
            console.log('function is calling')
            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {
                    if (isValid) {
                        if (row.column1 !== undefined) {
                            if (row.column1.required && row.column1.value == 'none') {
                                isValid = false;
                                invalidField = row.column1.text;
                            }
                        }
                        if (isValid) {
                            if (row.column2 !== undefined) {
                                if (row.column2.required && row.column2.value == 'none') {
                                    invalidField = row.column2.text;
                                    isValid = false;
                                }
                            }
                        }
                    }
                })
            });

            if (!isValid) {

                vm.errorMsg = 'Please select a column in ' + invalidField;
                $scope.showMsg('error', vm.errorMsg, 'Import Wizard')
                vm.isError = true;
            }
            console.log(vm.errorMsg);

            //angular.forEach(vm.migrate.tables.push, function (value, key) {
            //    if (vm.migrate.tables.push == 'none') {
            //        alert('Please Select Value')
            //    }
            //    else {
            //        this.push(key + ': ' + value);
            //    } 
            //}, log);



            return isValid;
        }

        vm.downloadTemp = function () {

            // alert('download temp is working');
            var tempColumns = [];

            var row = {
               EmpCode: 'Alpha-numeric (ITSL000001) Size(10)',
                Title: 'Alpha-numeric (Mister) Size(50) ',
                FirstName: 'Only alphabet (Atul) Size(50)',
                MiddleName: 'Only alphabet (Kumar) Size(50)',
                LastName: 'Only alphabet (Singh) Size(50)',
                Department: 'Alpha-numeric (IT) Size(50)',
                EmploymentType: 'Alpha-numeric (Full Time) Size(50)',
                Designation: 'Alpha-numeric (Software Developer1) Size(50)',
                DateOfBirth: 'Date(20/11/1992)-[DD/MM/YYYY]',
                Gender: 'Alpha-numeric (Male) Size(50)',
                MobileNo: 'Numeric(9919876570) Size(10)',
                EmpName: 'Only alphabet (Atul Kumar Singh) Size(100)',

            }

            tempColumns.push(row)



            DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'EmployeeList', false, true, false);
        }

        vm.downloadExportSkipData = function () {

            // alert('download temp is working');
            // var tempColumns = [];

            // tempColumns.push({ EmpCode: '' });
            console.log(vm.skipDataList)

            DJWebStoreGlobal.JSONToCSVConvertor(vm.resultGridOptions.data, 'EmployeeList', false, true, true);
        }

        vm.downloadExportAddedData = function () {

            // alert('download temp is working');
            // var tempColumns = [];

            // tempColumns.push({ EmpCode: '' });
            // console.log(vm.skipDataList)

            DJWebStoreGlobal.JSONToCSVConvertor(vm.addedDataList, 'EmployeeList', false, true, true);
        }



        vm.downloadMaxFieldTemp = function () {

            // alert('download temp is working');
            var tempColumns = [];



            var row = {
                EmpCode: 'Alpha-numeric (ITSL000001) Size(10)',
                Title: 'Alpha-numeric (Mister) Size(50) ',
                FirstName: 'Only alphabet (Atul) Size(50)',
                MiddleName: 'Only alphabet (Kumar) Size(50)',
                LastName: 'Only alphabet (Singh) Size(50)',
                EmpName: 'Only alphabet (Atul Kumar Singh) Size(100)',
                Department: 'Alpha-numeric (IT) Size(50)',
                EmploymentType: 'Alpha-numeric (Full Time) Size(50)',
                Designation: 'Alpha-numeric (Software Developer1) Size(50)',
                DateOfBirth: 'Date(20/11/1992)-[DD/MM/YYYY]',
                Gender: 'Alpha-numeric (Male) Size(50)',
                MobileNo: 'Numeric(9919876570) Size(10)',
                DateOfJoining: 'Date(20/11/2016)-[DD/MM/YYYY]',
                Grade: 'Alpha-numeric (Grade A1) Size(50)',
                Level: 'Alpha-numeric (Level 1) Size(50)',
                Category: 'Alpha-numeric (Category A1) Size(50)',
                SubUnit: 'Alpha-numeric (Lado Sarai1) Size(50)',
                OfficeEmail: 'Correct Email(atul095@xyz.com)',
                OfficeMobile: 'Numeric(9919876570) Size(10)',
                OfficePhone: 'Numeric(01166283687) Max-Size(17)',
                OfficeExt: 'Numeric',
                IsSingleOT: '0 OR 1',
                IsDoubleOT: '0 OR 1',
                SingleOTRate: 'Decimal(1.5) OR Numeric(1)',
                DoubleOTRate: 'Decimal(3.0) OR Numeric(3)',
                MarriageStatus: 'Alpha-numeric (Married) Size(50)',
                Email: 'Correct Email(atul095@xyz.com)',
                AnniversaryDate: 'Date(20/11/2016)-[DD/MM/YYYY]',
                Facebook: 'Correct Facebook Id(atul095@facebook.com)',
                PanNo: 'Alfa-numeric(BKAMR1222J)',
                LinkedIn: 'Correct LinkedIn Id(atul095@linkedin.com)',
                Aadhaar: 'Numeric(120039882099)',
                Twitter: 'Correct Twitter Id(atul095@twitter.com)',
                OtherIdentity: 'Alfa-numeric(XYZ001)',
                SalaryMode: 'Alpha-numeric (Cash) Size(50)',
                PFAccountNumber: 'Alpha-numeric (PF00023) Size(50)',
                PFStartDate: 'Date(20/11/2016)-[DD/MM/YYYY]',
                ESIAccountNumber: 'Alpha-numeric (ESI001) Size(50)',
                ESIStartDate: 'Date(20/11/2016)-[DD/MM/YYYY]',
                BankAccountNo: 'Numeric(12003988209911)',
                Religion: 'Alpha-numeric (Hindu) Size(50)',
                Nationality: 'Alpha-numeric (Indian) Size(50)'


            }

            tempColumns.push(row)



            DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'EmployeeList', false, true, true);
        }


        // vm.showEmpName = function () {
        //     alert('abcd');
        //     vm.rudraField20 = false;
        //     vm.importColumn20 = false;
        //     vm.rudraField21 = true;
        //     vm.importColumn21 = true;
        //     vm.rudraField2 = true;
        //     vm.importColumn2 = true;
        //     vm.rudraField22 = true;
        //     vm.importColumn22 = true;
        //     vm.rudra2 = true;
        //     vm.import2 = true;

        // }

        //Calling Default Function

        _getUploadHistoryDetail();



    }
})();
