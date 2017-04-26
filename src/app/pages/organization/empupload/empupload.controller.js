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
    function OrgEmpUploadController($scope, $stateParams, $http, uiGridConstants, $interval, $timeout,
        pageService,  DJWebStore) {
        var vm = this;
        debugger;

        vm.gridOptions = { data: [] }
        vm.uploader = [];
        vm.migrate = {
            currentStep: 1,
            tables: [],
            unMappedList: [],
            step1: true, step2: false, step3: false, step4: false
        }
        vm.normaltabs2 = false;

        //  vm.migrate.step1=true;

        vm.gridOptions = {
            paginationPageSizes: [10, 25, 50, 75, 100],
            paginationPageSize: 10,
            enableFiltering: true,
            showGridFooter: false,
            showColumnFooter: true,
            enableHorizontalScrollbar: false,
            enableVerticalScrollbar: false,
            enableCellEditOnFocus: true
        };
        //  vm.includeSrc = 'templates/crm/migrate.html?q=1';

        //Public Functions
        vm.setupMigrate = function () {

            var table1 = { title: 'Employee', rows: [] }

            table1.rows.push({
                column1: { name: 'EmpCode', text: 'Emp Code', type: 'text', required: true, value: 'none' },
                column2: { name: 'EmpTitleId', text: 'Title', type: 'text', required: true, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'EmpName', text: 'Employee Name', type: 'text', required: true, value: 'none' },
                column2: { name: 'EmpFirstName', text: 'First Name', type: 'text', required: false, value: 'none' }
            })

            table1.rows.push({
                column1: { name: 'EmpMiddleName', text: 'Middle Name', type: 'text', required: false, value: 'none' },
                column2: { name: 'EmpLastName', text: 'Last Name', type: 'text', required: false, value: 'none' }
            })

           

            vm.migrate.tables.push(table1);


            //contact information
            var table2 = { title: 'Job Description', rows: [] }

            table2.rows.push({
                column1: { name: 'JDDate', text: 'Joining Date', type: 'text', required: true, value: 'none' },
                column2: { name: 'DOB', text: 'Date Of Birth', type: 'date', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'CBEmailAddress', text: 'Email', type: 'text', required: false, value: 'none' },
                column2: { name: 'CBMobileNo', text: 'Mobile', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'LCCDesig', text: 'Designation', type: 'text', required: false, value: 'none' },
                column2: { name: 'LCCRating', text: 'Rating', type: 'text', required: false, value: 'none' }
            })

            table2.rows.push({
                column1: { name: 'LCCEmail', text: 'Alt Email', type: 'text', required: false, value: 'none' },
                column2: { name: 'LCCMobile', text: 'Alt Mobile', type: 'text', required: false, value: 'none' }
            })

            vm.migrate.tables.push(table2);


            //company information
            var table3 = { title: 'Company Information', rows: [] }

            table3.rows.push({
                column1: { name: 'CIDECompanyName', text: 'Company Name', type: 'text', required: false, value: 'none' },
                column2: { name: 'CIDELocation', text: 'Location/ Branch', type: 'text', required: false, value: 'none' }
            })

            table3.rows.push({
                column1: { name: 'CIDEWebsite', text: 'Website', type: 'text', required: false, value: 'none' },
                column2: { name: 'CIDECompanySize', text: 'Company Size', type: 'text', required: false, value: 'none' }
            })

            table3.rows.push({
                column1: { name: 'CIDEFunctionalArea', text: 'Functional Area', type: 'text', required: false, value: 'none' },
                column2: { name: 'CIDEIndustrialArea', text: 'Industrial Area', type: 'text', required: false, value: 'none' }
            })

            table3.rows.push({
                column1: { name: 'CIDECompanyContactNo', text: 'Company Contact No', type: 'text', required: false, value: 'none' },
                column2: { name: 'company_email', text: 'Company Email', type: 'text', required: false, value: 'none' }
            })

            vm.migrate.tables.push(table3);


            vm.migrate.findFieldList = [];


        }
        vm.nextDataUpload = function () {
            debugger;
            if (vm.migrate.currentStep == 1) {
                if (vm.gridOptions.data.length <= 0) {

                }
                else {
                    vm.matchingFields();
                    vm.migrate.currentStep = 2;
                    vm.migrate.step1 = false;
                    vm.migrate.step2 = true;
                    vm.migrate.step3 = false;
                    console.log(vm.gridOptions.columnDefs);
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
                    console.log("santosh");
                    console.log(vm.migrate.unMappedList);
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
                var isUsable = findUsable(col.name);
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

            pageService.migrateData(data).then(function (result) {
                console.log(result)
            }, function (err) {
                console.log(err)
            })
        }
        // vm.openMenu = function (src) {
        //     var rndValu = Math.round((Math.random() * 10) * 10);
        //     var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);

        //     if (src == 'import') {
        //         vm.includeSrc = 'templates/crm/migrate.html?' + rndValu2 + '=' + rndValu;
        //     }
        //     else if (src == 'profile') {
        //         vm.includeSrc = 'templates/crm/profile.html?' + rndValu2 + '=' + rndValu;
        //     }
        //     else if (src == 'msg') {
        //         vm.includeSrc = 'templates/crm/msg.html?' + rndValu2 + '=' + rndValu;
        //     }
        //     console.log(vm.includeSrc)
        // }

        //Private Functions
        function findUsable(colName) {
            var isUsable = false;

            vm.migrate.findFieldList = [];

            addFieldCheck('Employee', 'code', 0, 0, 1);
            addFieldCheck('srno', '', 0, 0, 1);
            addFieldCheck('date', '', 0, 0, 2);

            addFieldCheck('deal', '', 0, 1, 1);
            addFieldCheck('value', '', 0, 1, 1);
            addFieldCheck('amount', '', 0, 1, 1);
            addFieldCheck('annual', '', 0, 1, 1);

            addFieldCheck('remark', '', 0, 1, 2);
            addFieldCheck('desc', '', 0, 1, 2);

            addFieldCheck('first', 'name', 1, 0, 1);
            addFieldCheck('last', 'name', 1, 0, 2);

            addFieldCheck('email', '', 1, 1, 1);
            addFieldCheck('mobile', '', 1, 1, 2);

            addFieldCheck('title', '', 1, 2, 1);
            addFieldCheck('desig', '', 1, 2, 1);

            addFieldCheck('rating', '', 1, 2, 2);

            addFieldCheck('company', '', 2, 0, 1);
            addFieldCheck('branch', '', 2, 0, 2);
            addFieldCheck('location', '', 2, 0, 2);

            addFieldCheck('website', '', 2, 1, 1);
            addFieldCheck('url', '', 2, 1, 1);
            addFieldCheck('portal', '', 2, 1, 1);

            addFieldCheck('size', '', 2, 1, 2);
            addFieldCheck('employee', '', 2, 1, 2);

            addFieldCheck('company', 'contact', 2, 3, 1);
            addFieldCheck('company', 'email', 2, 3, 2);

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
