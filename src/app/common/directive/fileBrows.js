angular.module('BlurAdmin.common').directive("readfiledata", function ($filter) {
    return {
        scope: {
            opts: '=',
            uploader: '='
        },
        link: function ($scope, $elm, $attrs) {
            $elm.on('change', function (changeEvent) {
                var files = changeEvent.target.files;
                // if (files.length <= 0) {
                //     $scope.showMsg('error', 'Your template file is null.');
                // }
                console.log(files);
                var fileName = "";
                var fileType = "";
                angular.forEach(files, function (rows, ridx) {
                    fileName = rows.name;
                    fileType = fileName.split(".")

                    console.log(fileName, fileType)

                })
                // if (fileType == 'xlsx' || fileType == xls){}
                    console.log(files[0])

                // if(files[0]==)
                var reader = new FileReader();
                // debugger;
                reader.onload = function (evt) {
                    console.log(evt)
                    $scope.$apply(function () {
                        var data = evt.target.result;

                        var workbook = XLSX.read(data, { type: 'binary' });

                        var headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];

                        var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                        $scope.opts.columnDefs = [];
                        headerNames.forEach(function (h) {
                            var colDef = { field: h, width: 150, value: h }
                            angular.forEach($scope.uploader.columns, function (key, value) {
                                if (h == key.field) {
                                    if (key.format !== undefined) {
                                        if (key.format == 'date') {
                                            colDef['type'] = 'date'
                                            colDef['cellFilter'] = 'date:"dd-MMM-yyyy"'
                                        }
                                    }

                                    if (key.options !== undefined) {
                                        colDef['editableCellTemplate'] = 'ui-grid/dropdownEditor';
                                        colDef['editDropdownValueLabel'] = 'name';
                                        colDef['editDropdownIdLabel'] = 'value';
                                        colDef['editDropdownOptionsArray'] = key.options;
                                        colDef['cellFilter'] = 'griddropdown:this';
                                        colDef['masterPageId'] = key.masterPageId;
                                        colDef['idColumn'] = key.idColumn;
                                        colDef['nameColumn'] = key.nameColumn;
                                    }

                                    colDef['cellClass'] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                                        var cellValue = grid.getCellValue(row, col);

                                        if (cellValue !== undefined) {
                                            if (cellValue.toString().endsWith('[N/A]')) {
                                                return 'invalid-cell';
                                            }
                                        }
                                        return '';
                                    };

                                    //extra column in excel file will be ignored
                                    //comment this if want to show extra column from excel , and uncomment outer forEach below
                                    //$scope.opts.columnDefs.push(colDef);

                                }
                            });


                            //uncomment if want to show extra column from excel to grid
                            $scope.opts.columnDefs.push(colDef);

                        });

                        //binding values with dropdown filters
                        angular.forEach(data, function (key, value) {
                            angular.forEach(key, function (colVal, col) {
                                angular.forEach($scope.opts.columnDefs, function (colDef, idx) {
                                    if (colDef.field == col) {
                                        if (colDef.editDropdownOptionsArray !== undefined) {
                                            //calling findobj from DJWebStoreGlobal  /// <reference path="app-00-globalFunctions.js" />

                                            var result = $filter('findobj')(colDef.editDropdownOptionsArray, colVal);
                                            if (result.length > 0) {
                                                key[colDef.field] = result[0].value
                                            }
                                            else {
                                                key[colDef.field] = key[colDef.field] + ' [N/A]';
                                            }
                                        }

                                        if (colDef.cellFilter !== undefined) {
                                            //checking date filter
                                            if (colDef.cellFilter.toString().startsWith('date')) {

                                                var dateVal = key[colDef.field];

                                                //check date length
                                                if (dateVal.length != 10) {

                                                }
                                                else {
                                                    key[colDef.field] = key[colDef.field] + ' [N/A]';
                                                }

                                                if (angular.isDate(key[colDef.field])) {
                                                    console.log('true');
                                                }
                                                console.log(key[colDef.field]);
                                            }
                                        }
                                    }
                                });
                            });
                        });

                        $scope.opts.data = data;
                        console.log($scope.opts)
                        $elm.val(null);
                    });
                };

                reader.readAsBinaryString(changeEvent.target.files[0]);
            });
        }
    }
});