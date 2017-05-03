/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.empupload')
        .controller('OrgEmpUploadController', OrgEmpUploadController);

    /** @ngInject */
    /** @ngInject */
    function OrgEmpUploadController($scope, $sce, $filter, $http, uiGridConstants, $interval, $timeout,
        $uibModal, pageService, $q, DJWebStore, $window) {
        var vm = this;
        // debugger;

        vm.gridOptions = { data: [] }
        vm.uploader = [];
        vm.migrate = {
            currentStep: 1,
            tables: [],
            unMappedList: [],
            step1: true, step2: false, step3: false, step4: false
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

        function _loadController() {
            vm.migrate.findFieldList = [];

            addFieldCheck('Department', '', 0, 0, 0);
            addFieldCheck('Designation', '', 0, 0, 1);
            addFieldCheck('Employeement', '', 0, 1, 0);
            addFieldCheck('DOJ', '', 0, 1, 1);
            addFieldCheck('Grade', '', 0, 2, 0);
            addFieldCheck('Level', '', 0, 2, 1);
            addFieldCheck('Sub', 'Unit', 0, 3, 0);
            addFieldCheck('Sub', 'Unit', 0, 3, 0);

        }

        //Public Functions
        vm.setupMigrate = function () {

            _loadController();

            var table1 = { title: 'Job Description', rows: [] }

            table1.rows.push({
                column1: { name: 'JDDeptId', text: 'Department', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDDate', text: 'Date Of Joining', type: 'date', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'JDEmploymentId', text: 'Employeement Type', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDEmpGradeId', text: 'Grade', type: 'text', required: false, value: 'none' },

            })

            table1.rows.push({
                column1: { name: 'JDDesgId', text: 'Designation', type: 'text', required: true, value: 'none' },
                column2: { name: 'JDEmpLevelId', text: 'Lavel', type: 'text', required: false, value: 'none' }
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
                column1: { name: 'CIDECompanyName', text: 'Salary Mode', type: 'text', required: false, value: 'none' },
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


            vm.migrate.findFieldList = [];


        }
        vm.nextDataUpload = function () {
            $window.scrollTo(0, 0);
            if (vm.migrate.currentStep == 1) {
                if (vm.gridOptions.data.length <= 0) {
                    alert('No data found.')
                }
                else {
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

                                if (col.name == row.column1.value) {
                                    isFound = true;
                                }
                                if (col.name == row.column2.value) {
                                    isFound = true;
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
            vm.migrate.currentStep = 3;
            vm.migrate.step1 = false;
            vm.migrate.step2 = false;
            vm.migrate.step3 = false;
            vm.migrate.step4 = true;

            var mappedFieldsList = {};

            angular.forEach(vm.migrate.tables, function (table, tidx) {
                angular.forEach(table.rows, function (row, ridx) {

                    mappedFieldsList[row.column1.name] = row.column1.value;

                    mappedFieldsList[row.column2.name] = row.column2.value;

                })
            })

            console.log(vm.gridOptions.data)
            var uncData = { fieldList: mappedFieldsList, data: vm.gridOptions.data, type: 'Employee' }
            var postData = JSON.stringify(uncData);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: true, data: compressed }
            // var data = { data: postData }

            pageService.uploadEmployeeData(data).then(function (result) {
                console.log(result)
            }, function (err) {
                console.log(err)
            })
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
            if (lowerValue.indexOf(firstCheck) >= 0) {
                if (secondCheck != '') {
                    if (lowerValue.indexOf(secondCheck) >= 0) {
                        isUsable = true;
                    }
                }
                else {
                    isUsable = true;
                }

                if (isUsable) {
                    if (colIdx == 1) {
                        vm.migrate.tables[tableIdx].rows[rowIdx].column1.value = colName;
                    }
                    else {
                        vm.migrate.tables[tableIdx].rows[rowIdx].column2.value = colName;
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
                        if (row.column1.required && row.column1.value == 'none') {
                            isValid = false;
                            invalidField = row.column1.text;
                        }
                        if (isValid) {
                            if (row.column2.required && row.column2.value == 'none') {
                                invalidField = row.column2.text;
                                isValid = false;
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


        //Calling Default Function
        vm.setupMigrate();

    }
})();
