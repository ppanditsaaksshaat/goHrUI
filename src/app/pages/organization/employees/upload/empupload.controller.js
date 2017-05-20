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
        var uploadHistoryPageId = 439;
        var uploadHistoryTableId = 414;
        var uploadHistoryPKId = 3;
        vm.skipDataList = [];


        vm.gridOptions = { data: [] }
        vm.uploader = [];
        vm.migrate = {
            currentStep: 1,
            tables: [],
            unMappedList: [],
            step1: true, step2: false, step3: false, step4: false, step5: false
        }
        vm.normaltabs2 = true;

        //  vm.migrate.step1=true;

        vm.gridOptions = {
            enableFiltering: false,
            showGridFooter: false,
            showColumnFooter: false,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false,
            enableCellEditOnFocus: false
        };
        //  vm.includeSrc = 'templates/crm/migrate.html?q=1';

        function _getUploadHistoryDetail() {
            // pageService.getPagData(uploadHistoryPageId).then(function (result) {
            //    console.log(result)

            pageService.findEntity(uploadHistoryTableId, uploadHistoryPKId, undefined).then(function (result) {
                console.log(result)
                var data = result;
                var decomData = DJWebStoreGlobal.Decompress(result);
                // var data = result.decompress();
                console.log(decomData)

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

            addFieldCheck('employeement', '', 0, 1, 0);
            addFieldCheck('grade', '', 0, 1, 1);
            addFieldCheck('designation', '', 0, 2, 0);
            addFieldCheck('level', '', 0, 2, 1);
            addFieldCheck('category', '', 0, 3, 0);

            //subunit
            addFieldCheck('sub', '', 0, 3, 1);
            addFieldCheck('sub', 'unit', 0, 3, 1);

            //email
            addFieldCheck('office', 'email', 0, 4, 0);
            addFieldCheck('email', '', 0, 4, 0);

            //mobile
            addFieldCheck('office', 'mobile', 0, 4, 1);
            addFieldCheck('mobile', '', 0, 4, 1);

            //phone
            addFieldCheck('office', 'phone', 0, 5, 0);
            addFieldCheck('phone', '', 0, 5, 0);

            //Office Ext.
            addFieldCheck('office', 'ext', 0, 5, 1);
            addFieldCheck('ext', '', 0, 5, 1);

            // Single OT
            addFieldCheck('single', 'ot', 0, 6, 0);
            addFieldCheck('ot', '', 0, 6, 0);

            // Double OT
            addFieldCheck('double', 'ot', 0, 6, 1);
            addFieldCheck('ot', '', 0, 6, 1);

            //Single OT Rate
            addFieldCheck('single', 'rate', 0, 7, 0);
            addFieldCheck('rate', '', 0, 7, 0);

            //Double OT Rate
            addFieldCheck('double', 'rate', 0, 7, 1);
            addFieldCheck('rate', '', 0, 7, 1);

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

            addFieldCheck('mobile', '', 1, 3 + extraRowIndex, 0);

            //anniversery date
            addFieldCheck('anniversary', 'date', 1, 3 + extraRowIndex, 1);
            addFieldCheck('anniversarydate', '', 1, 3 + extraRowIndex, 1);

            addFieldCheck('facebook', '', 1, 4 + extraRowIndex, 0);

            //pancard
            addFieldCheck('pan', 'card', 1, 4 + extraRowIndex, 1);
            addFieldCheck('pancard', '', 1, 4 + extraRowIndex, 1);


            //linkedin
            addFieldCheck('linked', 'in', 1, 5 + extraRowIndex, 0);
            addFieldCheck('linkedin', 'Unit', 1, 5 + extraRowIndex, 0);
            //adhar card
            addFieldCheck('adhar', 'card', 1, 5 + extraRowIndex, 1);
            addFieldCheck('adharcard', '', 1, 5 + extraRowIndex, 1);

            addFieldCheck('twitter', '', 1, 6 + extraRowIndex, 0);

            //other number
            addFieldCheck('other', 'number', 1, 8, 1);
            addFieldCheck('othernumber', '', 1, 8, 1);

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
            addFieldCheck('other', 'number', 2, 2, 0);
            addFieldCheck('othernumber', '', 2, 2, 0);

            //ESI Dispensary name
            addFieldCheck('esi', 'dispensary', 2, 2, 1);
            addFieldCheck('esidispensary', '', 2, 2, 1);
        }

        //Public Functions
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
                column1: { name: 'InsComId', text: 'Category', type: 'text', required: false, value: 'none' },
                column2: { name: 'JDSubUnitID', text: 'Sub Unit', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDSubUnitID', text: 'Office Email', type: 'text', required: false, value: 'none' },
                column2: { name: 'InsComId', text: 'Office Mobile', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDSubUnitID', text: 'Office Phone', type: 'text', required: false, value: 'none' },
                column2: { name: 'InsComId', text: 'Office Ext.', type: 'text', required: false, value: 'none' }
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
                table2.rows[0].column2 = { name: 'EmpName', text: 'Employee Full Name', type: 'text', required: false, value: 'none' };
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
                column1: { name: 'PDFacebookId', text: 'Facebook', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDPancard', text: 'Pan Card', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PDLinkedIn', text: 'LinkedIn', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDAdhar', text: 'Adhar', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'PDTwitter', text: 'Twitter', type: 'text', required: false, value: 'none' },
                column2: { name: 'PDOtherNumber', text: 'Other Number', type: 'text', required: false, value: 'none' }
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
                column2: { name: 'Dispensary', text: 'ESI Dispensary name', type: 'text', required: false, value: 'none' }
            })

            vm.migrate.tables.push(table3);


            //vm.migrate.findFieldList = [];


        }
        vm.nextDataUpload = function () {

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
                if (isUsable) {
                    console.log(isUsable);
                }

            })
        }
        vm.importDataUpload = function () {
            alert('import');
            vm.migrate.currentStep = 3;
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = true;

            var mappedFieldsList = {};

            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {
                    if (row.column1 !== undefined) {
                        mappedFieldsList[row.column1.name] = row.column1.value;
                    }
                    if (row.column2 !== undefined) {
                        mappedFieldsList[row.column2.name] = row.column2.value;
                    }



                })
            })
            if (vm.showEmployeeName === undefined) {
                vm.showEmployeeName = false;
            }
            console.log(vm.gridOptions.data)
            var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee', isempFullName: vm.showEmployeeName }
            console.log(uncData)
            var postData = JSON.stringify(uncData);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }
            // var data = { data: postData }

            pageService.uploadEmployeeData(data).then(function (result) {
                var successDataLength = result.successList.length;
                var skipListDataLength = result.skipList.length;

                vm.successLength = successDataLength;
                vm.skipListLength = skipListDataLength;

                var successData = parseInt(successDataLength)
                var skipData = parseInt(skipListDataLength)

                vm.totalRecord = successData + skipData;
                vm.skipDataList = result.skipList;

                console.log(successDataLength, skipListDataLength, vm.totalRecord)
                console.log(result)
            }, function (err) {
                console.log(err)
            })
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = false;
            vm.migrate.step5 = true;
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
                        if (vm.migrate.tables[tableIdx].rows[rowIdx].column2 !== undefined)
                            vm.migrate.tables[tableIdx].rows[rowIdx].column2.value = colName;
                    }
                    else {
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

            alert('download temp is working');
            var tempColumns = [];

            tempColumns.push({ EmpCode: '' });
            tempColumns.push({ Title: '' });
            tempColumns.push({ FirstName: '' });
            tempColumns.push({ MiddleName: '' });
            tempColumns.push({ LastName: '' });
            tempColumns.push({ Department: '' });
            tempColumns.push({ EmploymentType: '' });
            tempColumns.push({ Designation: '' });
            tempColumns.push({ DateOfBirth: '' });
            tempColumns.push({ Gender: '' });
            tempColumns.push({ Mobile: '' });

            DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'EmployeeList', false, false);
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

    }
})();
