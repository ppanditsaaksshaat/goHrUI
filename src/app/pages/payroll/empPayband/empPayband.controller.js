/**
 * @author deepak.jain
 * created on 12.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.empPayband')
        .controller('empPaybandController', empPaybandController);

    /** @ngInject */
    function empPaybandController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, $timeout, $filter, $http) {

        var pageIds = {
            payband: { tableId: 139, pageId: 133 },
            rulePage: { tableId: 140, pageId: 134 },
            slabPage: { tableId: 141, pageId: 135 },
            formulaPage: { tableId: 434, pageId: 135 },
            employeePage: { tableId: 30, pageId: 25 },
            empRulePage: { tableId: 437, pageId: 459 },
            empSlabPage: { tableId: 438, pageId: 460 },
            empFormulaPage: { tableId: 439, pageId: 458 }
        }
        var queryId = 560;
        var selectedPaybandMaster = {};

        //
        $scope.page = {};
        $scope.page.gridOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit ui-grid-expandable ng-style=\"getSecondGridHeight(row.entity.subGridOptions)\" class=\"djGrid\"></div>',
            expandableRowHeight: 150,
            //subGridVariable will be available in subGrid scope
            enableExpandableRowHeader: true,
            expandableRowScope: {
                subGridVariable: 'subGridScopeVariable',
                externalScope: $scope
            },
            rowHeight: 35,
            enableColumnResizing: false,
            enableFiltering: false,
            enableGridMenu: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enablePaginationControls: false,
            enableVerticalScrollbar: false,
            enableHighlighting: false,
            enablePinning: false,
            enableCellEditOnFocus: true,
            data: [],
            columnDefs: [],
            onRegisterApi: _onGridRegisterApi,
            showGridFooter: true,
            showColumnFooter: false,
            // gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name for opt in grid.appScope.rulePage.pageinfo.fields.PBRSHId.options"></select></div><div class="pull-right"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }
        $scope.entity = {};
        $scope.rulePage = {}
        $scope.rulePage.pageId = pageIds.rulePage.pageId;
        $scope.slabPage = {}
        $scope.slabPage.pageId = pageIds.slabPage.pageId;
        $scope.formulaPage = {}
        $scope.formulaPage.pageId = pageIds.formulaPage.pageId;

        $scope.serachEmpPayBand = _serachEmpPayBand;
        $scope.removeRuleSlab = _removeRuleSlab;
        $scope.changeFormula = _changeFormula;
        $scope.changeSlab = _changeSlab;
        $scope.toggleRowExpand = _toggleRowExpand;
        $scope.saveEmpPayband = _saveEmpPayband;





        var grossHead = {};



        //serach employee payband according to grade and level
        function _serachEmpPayBand() {

            _getGradeLevelEmployeeDetail($scope.entity.PBEmpGradeId, $scope.entity.PBEmpLevelId);
        }

        //END :  serach employee payband according to grade and level

        $scope.getThirdGridHeight = function (options) {
            console.log(options)
            var length = 1;
            if (options) {
                if (options.data) {
                    length = options.data.length;
                }
            }
            var rowHeight = 35; // your row height
            var headerHeight = 35; // your header height
            console.log(length * rowHeight + headerHeight)
            return {

                height: (length * rowHeight + headerHeight) + "px"
            };
        }
        $scope.getSecondGridHeight = function (options) {
            console.log(options)
            var length = 1;
            if (options) {
                if (options.data) {
                    length = options.data.length;
                }
            }
            var rowHeight = 35; // your row height
            var headerHeight = 35; // your header height
            console.log(length * rowHeight + headerHeight)
            return {

                height: (length * rowHeight + headerHeight) + "px"
            };
        }


        function _loadController() {



            //loading pages
            $timeout(function () {


                var data = {
                    searchList: [{
                        field: 'PBId',
                        operand: '=',
                        value: 1
                    }],
                    orderByList: []
                }
                pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccess, _getCustomQueryError)
                pageService.getPagData(pageIds.payband.pageId).then(function (result) {
                    console.log(result)
                    $scope.paybandPage = result;
                })

                pageService.getPagData($scope.rulePage.pageId).then(
                    function (result) {
                        console.log(result)
                        $scope.rulePage = angular.extend({}, $scope.rulePage, result);

                        grossHead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')

                        //getting slabPage 
                        pageService.getPagData($scope.slabPage.pageId).then(
                            function (result) {
                                console.log(result)
                                $scope.slabPage = angular.extend({}, $scope.slabPage, result);

                                //once slabpage success call employee detail

                                //getting employee list
                                // _getGradeLevelEmployeeDetail(1, 7);

                            }, function (err) {

                            })

                    }, function (err) {

                    })


            });
        }

        //START: getting selected payband detail
        function _getGradeLevelPaybandDetail(gradeId, levelId) {

            var data = {
                searchList: [
                    {
                        field: 'PBEmpGradeId',
                        operand: '=',
                        value: gradeId
                    },
                    {
                        field: 'PBEmpLevelId',
                        operand: '=',
                        value: levelId
                    }
                ],
                orderByList: []
            };
            pageService.getTableData(pageIds.payband.tableId, pageIds.payband.pageId, '', '', false, data).then(_getGradeLevelPaybandDetailSuccess, _getGradeLevelPaybandDetailError);

        }

        function _getCustomQuerySuccess(result) {
            if (result != "NoDataFound") {
                console.log(result)
                $scope.empRuleWithSlabAndFormulaDetail = result;
            }
        }
        function _getCustomQueryError(err) {

        }
        function _getGradeLevelPaybandDetailSuccess(result) {

            if (result == 'NoDataFound') {
                //promt no payband found for selected grades
            }
            else {

                if (result.length > 0) {
                    //grid show 
                    $scope.gridShow = true;
                    selectedPaybandMaster = result[0];
                    //feteching payband rule detail with multi calling facility
                    _fetchPaybandRuleDetail(selectedPaybandMaster.PBId)
                }
            }
        }
        function _getGradeLevelPaybandDetailError(err) {
            console.log(err)
        }
        //END: getting selected payband detail

        //START: getting list of employees
        function _getGradeLevelEmployeeDetail(gradeId, levelId) {

            var data = {
                searchList: [
                    {
                        field: 'JDEmpGradeId',
                        operand: '=',
                        value: gradeId
                    },
                    {
                        field: 'JDEmpLevelId',
                        operand: '=',
                        value: levelId
                    }
                ],
                orderByList: []
            };
            pageService.getTableData(pageIds.employeePage.tableId, pageIds.employeePage.pageId, '', '', false, data).then(_getGradeLevelEmployeeDetailSuccess, _getGradeLevelEmployeeDetailError);

        }
        function _getGradeLevelEmployeeDetailSuccess(result) {
            console.log(result)
            if (result == 'NoDataFound') {
                //promt no payband found for selected grades
            }
            else {

                $scope.employeeList = result;
                _getGradeLevelPaybandDetail($scope.entity.PBEmpGradeId, $scope.entity.PBEmpLevelId)

            }
        }
        function _getGradeLevelEmployeeDetailError(err) {
            console.log(err)
        }
        //END: getting list of employees

        //START: fetch payband rule detail
        function _fetchPaybandRuleDetail(paybandId) {


            $timeout(function () {
                var multiData = {
                    lz: false,
                    parent: {
                        tableid: pageIds.payband.tableId,
                        pkValue: paybandId
                    }, child: [
                        {
                            tableid: pageIds.rulePage.tableId,
                            linkColumn: 'PBRPBId',
                            orderByList: [
                                { column: 'PBRId', isDesc: false }
                            ],
                            child: [
                                {
                                    tableid: pageIds.formulaPage.tableId,//formula table
                                    linkColumn: 'PFDPBRId',
                                    orderByList: []
                                },
                                {
                                    tableid: pageIds.slabPage.tableId,
                                    linkColumn: 'PBSPBRId',
                                    orderByList: []
                                }]
                        }
                    ]
                };
                var tableData = pageService.getMultiEntity(multiData);
                tableData.then(_fetchPaybandRuleDetailSuccess, _fetchPaybandRuleDetailError)
            });
        }
        function _fetchPaybandRuleDetailSuccess(result) {
            console.log(result)

            _setEntitlementColumns(result)
        }
        function _fetchPaybandRuleDetailError(err) {
            console.log(err)
        }
        //END: fetch payband rule detail

        //setting up first level grid columns as per data loaded for selected payband detail
        function _setEntitlementColumns(result) {
            console.log(result)
            var defaultData = {};
            if (result) {
                if (result.child) {
                    if (result.child[0].rows) {
                        //generating column from selected heads in payband
                        var defaultSalary = { earnings: 0, deductions: 0, netPayable: 0, employer: 0, totalCtc: 0, gross: 0, basic: 0 }

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'EmpName',
                            name: 'EmpName',
                            displayName: 'Employee',
                            width: 150,
                            visible: true,
                            cellClass: '',
                            cellFilter: '',
                            cellEditableCondition: false
                        })

                        for (var rowIndex = 0; rowIndex < result.child[0].rows.length; rowIndex++) {
                            var row = result.child[0].rows[rowIndex];

                            //START: manuplating for sub grid

                            row.PBRAmount = parseFloat(row.PBRAmount).toFixed(2);
                            //find head type
                            var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, row.PBRSHId, 'value')
                            if (foundPB != null) {
                                if (foundPB.SHIsForEmployer) {
                                    row.SHeadType = 'Employer';
                                }
                                else if (foundPB.SHIsDeduction == "False") {
                                    row.SHeadType = 'Earning';
                                }
                                else {
                                    row.SHeadType = 'Deduction';
                                }
                            }

                            row.PBRCalcOnSHId = row.PBRCalcOnSHId.replace('[', '').replace(']', '')
                            if (row.PBRCalcOnSHId != '') {
                                var dependHeadList = row.PBRCalcOnSHId.split(',');
                                var selectedHeadList = [];
                                for (var h = 0; h < dependHeadList.length; h++) {
                                    var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                    if (shead != null) {
                                        selectedHeadList.push(shead)
                                    }
                                }
                                row.PBRCalcOnSHId = selectedHeadList;
                            }

                            if (row.child) {
                                if (row.child.length > 0) {
                                    for (var c = 0; c < row.child.length; c++) {
                                        var child = row.child[c];
                                        if (child.rows) {
                                            if (child.rows.length > 0) {
                                                if (child.tableid == 140) {//slab table
                                                    //_getSubGridOptions(row, false);
                                                }
                                                else if (child.tableid == 434) {//formula table
                                                    //_getSubGridOptions(row, true);
                                                    for (var cr = 0; cr < child.rows.length; cr++) {

                                                        //converting head into required format
                                                        row.child[c].rows[cr].PFDCalcHeadId = row.child[c].rows[cr].PFDCalcHeadId.replace('[', '').replace(']', '')
                                                        if (row.PFDCalcHeadId != '') {
                                                            var dependHeadList = row.child[c].rows[cr].PFDCalcHeadId.split(',');
                                                            var selectedHeadList = [];
                                                            for (var h = 0; h < dependHeadList.length; h++) {
                                                                var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                                                if (shead != null) {
                                                                    selectedHeadList.push(shead)
                                                                }
                                                            }
                                                            row.child[c].rows[cr].PFDCalcHeadId = selectedHeadList;
                                                        }

                                                    }
                                                }
                                                if (row.subGridOptions) {
                                                    //row.subGridOptions.data = child.rows;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //END: manuplating data
                            var column = {
                                field: 'SH_' + row.PBRSHId,
                                name: 'SH_' + row.PBRSHId,
                                displayName: row.SHName,
                                width: 100,
                                visible: true,
                                cellClass: '',
                                cellFilter: 'avoidNan',
                                cellEditableCondition: _firstGridCellEditableCondition
                            }
                            //
                            defaultData['SH_' + row.PBRSHId] = parseFloat(row.PBRAmount)

                            if (row.SHIsDeduction) {

                                if (row.SHIsForEmployer != '' && row.SHIsForEmployer) {
                                    defaultSalary.employer += parseFloat(row.PBRAmount);
                                    column.cellClass = 'ORANGE-300';
                                }
                                else {
                                    column.cellClass = 'PINK-500';
                                    defaultSalary.deductions += parseFloat(row.PBRAmount);
                                }
                            }
                            else {

                                if (row.SHIsGross) {
                                    column.cellClass = 'YELLOW-300';
                                    defaultSalary.gross = parseFloat(row.PBRAmount);
                                }
                                else {
                                    column.cellClass = 'BLUE-GRAY-200';
                                    defaultSalary.earnings += parseFloat(row.PBRAmount);
                                    if (row.SHIsBasic) {
                                        defaultSalary.basic = parseFloat(row.PBRAmount);
                                    }
                                }
                            }

                            $scope.page.gridOptions.columnDefs.push(column)
                        }
                        //end loop

                        console.log(result)
                        //calculating net and ctc

                        defaultSalary.netPayable = defaultSalary.earnings - defaultSalary.deductions;
                        defaultSalary.totalCtc = defaultSalary.earnings + defaultSalary.employer;

                        defaultData = angular.extend({}, defaultData, defaultSalary);


                        //adding default column

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'earnings',
                            name: 'earnings',
                            displayName: 'Earnings',
                            width: 100,
                            visible: true,
                            cellClass: 'BROWN-300',
                            cellFilter: '',
                            cellEditableCondition: false
                        })

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'deductions',
                            name: 'deductions',
                            displayName: 'Deductions',
                            width: 100,
                            visible: true,
                            cellClass: '',
                            cellFilter: 'avoidNan',
                            cellEditableCondition: false
                        })

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'netPayable',
                            name: 'netPayable',
                            displayName: 'Net Salary',
                            width: 100,
                            visible: true,
                            cellClass: '',
                            cellFilter: 'avoidNan',
                            cellEditableCondition: false
                        })

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'employer',
                            name: 'employer',
                            displayName: 'Employer',
                            width: 100,
                            visible: true,
                            cellClass: '',
                            cellFilter: 'avoidNan',
                            cellEditableCondition: false
                        })

                        $scope.page.gridOptions.columnDefs.push({
                            field: 'totalCtc',
                            name: 'totalCtc',
                            displayName: 'CTC',
                            width: 100,
                            visible: true,
                            cellClass: '',
                            cellFilter: 'avoidNan',
                            cellEditableCondition: false
                        })
                    }
                }
            }



            if ($scope.employeeList) {
                if ($scope.employeeList.length > 0) {
                    var dataList = [];
                    for (var empIndex = 0; empIndex < $scope.employeeList.length; empIndex++) {
                        var empData = angular.extend({}, $scope.employeeList[empIndex], defaultData);
                        //setup payband rule grid
                        _setupSecondGrid(empData);

                        if (empData.subGridOptions) {

                            var empRuleList = null;
                            console.log($scope.empRuleWithSlabAndFormulaDetail)
                            if ($scope.empRuleWithSlabAndFormulaDetail != undefined) {
                                var empRuleList = $filter('findAll')($scope.empRuleWithSlabAndFormulaDetail[0], empData.EmpId, 'EPBREmpId')
                                //var empSlabList = $filter('findAll')($scope.empRuleWithSlabAndFormulaDetail[2], empData.EmpId, 'EPBREmpId')

                            }
                            if (result.child)
                                if (result.child.length > 0) {
                                    var childRows = angular.copy(result.child[0].rows);

                                    for (var rowIndex = 0; rowIndex < childRows.length; rowIndex++) {
                                        var childRow = childRows[rowIndex];
                                        var epbrId = 0;
                                        if (empRuleList != null) {
                                            var empRule = $filter('findObj')(empRuleList, childRow.PBRId, 'EPBRPBRId')
                                            if (empRule != null) {

                                                childRow.PBRId = empRule.EPBRPBRId;
                                                if (empRule.EPBRCalcOnSHId != '[]') {
                                                    //convert
                                                    empRule.EPBRCalcOnSHId = empRule.EPBRCalcOnSHId.replace('[', '').replace(']', '')
                                                    if (empRule.EPBRCalcOnSHId != '') {
                                                        var dependHeadList = empRule.EPBRCalcOnSHId.split(',');
                                                        var selectedHeadList = [];
                                                        for (var h = 0; h < dependHeadList.length; h++) {
                                                            var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                                            if (shead != null) {
                                                                selectedHeadList.push(shead)
                                                            }
                                                        }
                                                        empRule.EPBRCalcOnSHId = selectedHeadList;
                                                    }
                                                    childRow.PBRCalcOnSHId = empRule.EPBRCalcOnSHId;
                                                }
                                                childRow.PBRIsFormula = empRule.EPBRIsFormula;
                                                childRow.PBRIsSlab = empRule.EPBRIsSlab;
                                                if (empRule.EPBRPercantage != '0')
                                                    childRow.PBRPercantage = empRule.EPBRPercantage;
                                                childRow.PBRSHId = empRule.EPBRSHId;
                                                childRow.PBRPBId = empRule.EPBRPBId;
                                                childRow.PBRRuleName = empRule.EPBRRuleName;
                                                childRow.PBRAmount = empRule.EPBRAmount;
                                                childRow.PBRIgnoreRule = empRule.EPBRIgnoreRule;
                                                childRow.PBREmpId = empRule.EPBREmpId;
                                                epbrId = empRule.EPBRId;

                                            }
                                        }

                                        if (childRow.PBRIsFormula) {
                                            if (epbrId != 0) {
                                                var empFormulaList = $filter('findAll')($scope.empRuleWithSlabAndFormulaDetail[2], epbrId, 'EPFDPBRId');
                                                if (empFormulaList != null) {
                                                    for (var f = 0; f < childRow.child[0].rows.length; f++) {
                                                        var formula = childRow.child[0].rows[f];
                                                        for (var ef = 0; ef < empFormulaList.length; ef++) {
                                                            var empFormula = empFormulaList[ef];
                                                            if (f == ef) {
                                                                formula.PFDPBRId = empFormula.EPFDPBRId
                                                                formula.PFDPercentage = empFormula.EPFDPercentage;
                                                                formula.PFDOperator = empFormula.EPFDOperator;
                                                                formula.PFDAmount = empFormula.EPFDAmount;
                                                                formula.PFDCalcHeadId = empFormula.EPFDCalcHeadId;
                                                                if (formula.PFDCalcHeadId != '[]') {
                                                                    //convert
                                                                    formula.PFDCalcHeadId = formula.PFDCalcHeadId.replace('[', '').replace(']', '')
                                                                    if (empRule.EPBRCalcOnSHId != '') {
                                                                        var dependHeadList = formula.PFDCalcHeadId.split(',');
                                                                        var selectedHeadList = [];
                                                                        for (var h = 0; h < dependHeadList.length; h++) {
                                                                            var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                                                            if (shead != null) {
                                                                                selectedHeadList.push(shead)
                                                                            }
                                                                        }
                                                                        formula.PFDCalcHeadId = selectedHeadList;
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            //creating third level grid for formula
                                            childRows[rowIndex].subGridOptions = _setupThirdGridOptions();
                                            _addThirdGridFormulaColumns(childRows[rowIndex])
                                        }
                                        else if (childRow.PBRIsSlab) {

                                            if (epbrId != 0) {
                                                var empSlabList = $filter('findAll')($scope.empRuleWithSlabAndFormulaDetail[1], epbrId, 'EPBSEPBRId');
                                                if (empSlabList != null) {

                                                    for (var s = 0; s < childRow.child[1].rows.length; s++) {
                                                        var slab = childRow.child[1].rows[s];
                                                        for (var es = 0; es < empSlabList.length; es++) {
                                                            var empSlab = empSlabList[es];
                                                            if (s == es) {
                                                                slab.PBSEPBRId = empSlab.EPBSEPBRId
                                                                slab.PBSIsCalcOnPercentage = empSlab.EPBSIsCalcOnPercentage
                                                                slab.PBSPercentage = empSlab.EPBSPercentage
                                                                slab.PBSMinCalcOnAmount = empSlab.EPBSMinCalcOnAmount
                                                                slab.PBSMaxCalcOnAmount = empSlab.EPBSMaxCalcOnAmount
                                                                slab.PBSMinAmount = empSlab.EPBSMinAmount
                                                                slab.PBSMasAmount = empSlab.EPBSMasAmount
                                                            }
                                                        }
                                                    }
                                                }
                                            }



                                            //creating third level grid for slab
                                            childRows[rowIndex].subGridOptions = _setupThirdGridOptions();
                                            _addThirdGridSlabColumns(childRows[rowIndex])
                                        }

                                        //assinging data to third level grid
                                        if (childRow.child) {
                                            if (childRow.child.length > 0)
                                                if (childRow.child[0].rows.length > 0) {
                                                    if (childRows[rowIndex].subGridOptions) {

                                                        childRows[rowIndex].subGridOptions.data = childRows[rowIndex].child[0].rows;
                                                    }
                                                }
                                                else if (childRow.child.length > 1) {
                                                    if (childRow.child[1].rows.length > 0) {
                                                        if (childRows[rowIndex].subGridOptions) {
                                                            childRows[rowIndex].subGridOptions.data = childRows[rowIndex].child[1].rows;
                                                        }
                                                    }
                                                }
                                        }
                                    }
                                    empData.oldEntity = angular.copy(childRows)
                                    empData.subGridOptions.data = childRows

                                }

                        }
                        dataList.push(empData)
                    }

                    console.log(dataList)
                }
            }
            $scope.page.gridOptions.data = dataList;
        }

        //START: first level grid functions

        function _firstGridCellEditableCondition(scope) {
            return true;
        }
        //grid register api 
        function _onGridRegisterApi(gridApi) {

            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {

                    row.expandedRowHeight = 70;
                    $timeout(function () {
                        if (row.entity.subGridOptions.data)
                            row.expandedRowHeight = row.entity.subGridOptions.data.length * row.entity.subGridOptions.rowHeight + 39;

                        console.log(row.entity.subGridOptions)
                    }, 150);
                }
            });

            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                if (grossHead) {
                    if (colDef.name == 'SH_' + grossHead.value) {
                        //updating subgrid gross amount
                        if (newValue != '') {
                            if (rowEntity.subGridOptions) {
                                if (rowEntity.subGridOptions.data.length > 0) {
                                    //find gross in subgrid
                                    var grossInSubGrid = $filter('findObj')(rowEntity.subGridOptions.data, grossHead.value, 'PBRSHId')
                                    if (grossInSubGrid != null) {
                                        grossInSubGrid.PBRAmount = parseFloat(newValue).toFixed(2);

                                        //recalculating employee salary head as per gross changes
                                        _recalculatingSecondGrid(rowEntity);

                                        //update first grid values after changes
                                        _updateFirstGridFromSecondGrid(rowEntity)


                                    }
                                }
                            }
                        }
                        else {
                            rowEntity['SH_36'] = oldValue;
                        }
                    }
                }
            });
        }

        //recalculating second grid values 
        function _recalculatingSecondGrid(entity) {

            var grossId = parseInt(grossHead.value);
            var isGrossAvailable = false;
            var grossInSubGrid = $filter('findObj')(entity.subGridOptions.data, grossHead.value, 'PBRSHId')
            if (grossInSubGrid != null) {
                isGrossAvailable = true;
            }

            //finding total amounts for each section type 

            var totalAmount = 0;
            var deductionTotal = 0;
            var employerTotal = 0;
            var grossAmt = 0;
            for (var c = 0; c < entity.subGridOptions.data.length; c++) {
                var row = entity.subGridOptions.data[c];

                if (grossId != row.PBRSHId && row.SHeadType == 'Earning') {
                    totalAmount += Math.round(row.PBRAmount);
                }
                else if (grossId != row.PBRSHId && row.SHeadType == 'Deduction') {
                    deductionTotal += Math.round(row.PBRAmount);
                }
                else if (grossId != row.PBRSHId && row.SHeadType == 'Employer') {
                    employerTotal += Math.round(row.PBRAmount);
                }
                else {
                    grossAmt += Math.round(row.PBRAmount);
                }
            }
            var remainingAmount = grossAmt - totalAmount;
            var deductionRemainingAmount = grossAmt - deductionTotal;

            //END:  finding total amounts for each section type 

            for (var rowIndex = 0; rowIndex < entity.subGridOptions.data.length; rowIndex++) {
                var rowEntity = entity.subGridOptions.data[rowIndex];
                var dependTotalAmt = 0;


                //find dependent head amount
                for (var a = 0; a < rowEntity.PBRCalcOnSHId.length; a++) {
                    if (rowEntity.PBRCalcOnSHId[a].value == rowEntity.PBRSHId) {
                        rowEntity.PBRCalcOnSHId = [];
                        $scope.showMsg('warning', 'Head can not depend on to itself')
                        return;
                    }
                    else {
                        var amt = _getHeadAmount(rowEntity.PBRCalcOnSHId[a].value, entity.subGridOptions.data)
                        dependTotalAmt += parseFloat(amt)
                    }
                }

                //check whether rule having any formula or any slab attached
                if (rowEntity.PBRIsFormula) {

                    if (rowEntity.subGridOptions) {
                        if (rowEntity.subGridOptions.data.length > 0) {

                            //recalculate the formula amount

                            //calculating amount as per forumula
                            var lastTotal = 0;
                            for (var x = 0; x < rowEntity.subGridOptions.data.length; x++) {
                                var subRow = rowEntity.subGridOptions.data[x];
                                var subAmtTotal = 0;
                                for (var c = 0; c < subRow.PFDCalcHeadId.length; c++) {
                                    subAmtTotal += parseFloat(_getHeadAmount(subRow.PFDCalcHeadId[c].value, entity.subGridOptions.data));
                                }
                                subRow.PFDAmount = Math.round(parseFloat(subAmtTotal)).toFixed(2);

                                if (x == 0) {
                                    lastTotal = subRow.PFDAmount
                                }
                                else {
                                    var shAmt = parseFloat(subRow.PFDAmount);
                                    var shPer = parseFloat(subRow.PFDPercentage)
                                    var calcAmt = (shPer / 100) * shAmt;
                                    if (subRow.PFDOperator == '+') {
                                        lastTotal = lastTotal + calcAmt
                                    }
                                    else if (subRow.PFDOperator == '-') {
                                        lastTotal = lastTotal - calcAmt
                                    }
                                }
                            }
                            rowEntity.PBRAmount = lastTotal.toFixed(2);
                        }
                    }

                }
                else if (rowEntity.PBRIsSlab) {

                    //find dependend head total
                    var dependHeadTotal = 0;
                    for (var c = 0; c < rowEntity.PBRCalcOnSHId.length; c++) {
                        dependHeadTotal += parseFloat(_getHeadAmount(rowEntity.PBRCalcOnSHId[c].value, entity.subGridOptions.data));
                    }

                    //calculating amount as per slab
                    if (rowEntity.PBRCalcOnSHId.length > 0) {


                        var grossAmt = parseFloat(rowEntity['SH_' + grossHead.value]);


                        var calcOnAmt = dependHeadTotal;
                        for (var x = 0; x < rowEntity.subGridOptions.data.length; x++) {

                            var slabRow = rowEntity.subGridOptions.data[x];

                            var calcPercentage = parseFloat(slabRow.PBSPercentage);

                            var maxAmtOn = parseFloat(slabRow.PBSMaxCalcOnAmount);
                            var minAmtOn = parseFloat(slabRow.PBSMinCalcOnAmount);

                            var maxAmt = parseFloat(slabRow.PBSMasAmount);
                            var minAmt = parseFloat(slabRow.PBSMinAmount);

                            if (isNaN(maxAmt)) {
                                maxAmt = 1;
                            }

                            if (isNaN(minAmt)) {
                                minAmt = 1;
                            }

                            if (isNaN(maxAmtOn)) {
                                maxAmtOn = 1;
                            }

                            if (isNaN(minAmtOn)) {
                                minAmtOn = 1;
                            }


                            if (calcOnAmt < minAmtOn) {
                                calcOnAmt = minAmtOn;
                            }
                            else if (calcOnAmt > maxAmtOn) {
                                calcOnAmt = maxAmtOn;
                            }

                            var calculatedAmt = 0;

                            calculatedAmt = (calcPercentage / 100) * calcOnAmt;

                            if (calculatedAmt < minAmt) {
                                calculatedAmt = minAmt;
                            }
                            else if (calculatedAmt > maxAmt) {
                                calculatedAmt = maxAmt;
                            }

                            slabRow.CalculatedAmount = Math.round(parseFloat(calculatedAmt), 0).toFixed(2)


                            //updating to parent row
                            if (slabRow.PBSAvoidExcessCalc) {
                                if (slabRow.PBSMaxCalcOnAmount) {
                                    if (parseFloat(slabRow.PBSMaxCalcOnAmount) < dependHeadTotal) {
                                        rowEntity.PBRAmount = ''
                                        rowEntity.GrossPercentage = ''
                                    }
                                }
                            }
                            else {
                                rowEntity.PBRAmount = Math.round(parseFloat(calculatedAmt)).toFixed(2);
                                if (grossAmt > 0)
                                    rowEntity.GrossPercentage = ((calculatedAmt * 100) / grossAmt).toFixed(2)
                                else
                                    rowEntity.GrossPercentage = '-';
                            }
                        }
                    }
                }
                else {

                    //check whether rule is depend on percentage
                    if (rowEntity.PBRPercantage) {
                        if (rowEntity.PBRPercantage > 0) {
                            rowEntity.PBRAmount = Math.round((parseFloat(rowEntity.PBRPercantage) / 100) * dependTotalAmt).toFixed(2);
                            if (isNaN(rowEntity.PBRAmount)) {
                                rowEntity.PBRAmount = 0;
                            }
                            //find gorss % for calculated %
                            //setting gross %
                            if (grossAmt > 0) {
                                rowEntity.GrossPercentage = ((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt).toFixed(2)
                            }
                        }
                    }
                }

            }
        }

        function _updateFirstGridFromSecondGrid(entity) {

            if (entity) {
                if (entity.subGridOptions) {
                    if (entity.subGridOptions.data.length > 0) {
                        for (var rowIndex = 0; rowIndex < entity.subGridOptions.data.length; rowIndex++) {
                            var rowEntity = entity.subGridOptions.data[rowIndex];
                            //updating parent row cell value
                            entity['SH_' + rowEntity.PBRSHId] = parseFloat(rowEntity.PBRAmount);
                        }
                        //fetching and calculating totals from subgrid
                        var grossId = parseInt(grossHead.value);

                        var earningTotal = 0;
                        var deductionTotal = 0;
                        var employerTotal = 0;
                        var grossAmt = 0;
                        for (var c = 0; c < entity.subGridOptions.data.length; c++) {
                            var row = entity.subGridOptions.data[c];

                            if (grossId != row.PBRSHId && row.SHeadType == 'Earning') {
                                earningTotal += Math.round(row.PBRAmount);
                            }
                            else if (grossId != row.PBRSHId && row.SHeadType == 'Deduction') {
                                deductionTotal += Math.round(row.PBRAmount);
                            }
                            else if (grossId != row.PBRSHId && row.SHeadType == 'Employer') {
                                employerTotal += Math.round(row.PBRAmount);
                            }
                            else {
                                grossAmt += Math.round(row.PBRAmount);
                            }
                        }
                        //calculating net and ctc
                        var netPayable = earningTotal - deductionTotal;
                        var ctcTotal = earningTotal + employerTotal;

                        //updating total values
                        entity['earnings'] = earningTotal.toFixed(2)
                        entity['deductions'] = deductionTotal.toFixed(2)
                        entity['employer'] = employerTotal.toFixed(2)
                        entity['netPayable'] = netPayable.toFixed(2)
                        entity['totalCtc'] = ctcTotal.toFixed(2)
                    }
                }
            }
        }

        function _getHeadAmount(headId, gridData) {
            var totalAmt = 0;
            if (gridData.length > 0) {
                var salaryHead = $filter('findObj')(gridData, headId, $scope.rulePage.pageinfo.fields.PBRSHId.name)
                if (salaryHead != null) {
                    if (salaryHead.PBRCalcOnSHId.length <= 0) {
                        return salaryHead.PBRAmount;
                    }
                    else {

                        for (var i = 0; i < salaryHead.PBRCalcOnSHId.length; i++) {
                            var shId = salaryHead.PBRCalcOnSHId[i].value;
                            var shAmt = _getHeadAmount(shId, gridData)
                            if (salaryHead.PBRPercantage) {
                                totalAmt += (salaryHead.PBRPercantage / 100) * shAmt
                            }
                        }
                    }
                }
            }
            return totalAmt;
        }
        function _toggleRowExpand(row) {

            $scope.secondGridApi.expandable.toggleRowExpansion(row.entity);
        }
        function _changeSlab(row) {

            //isExpanded
            row.entity.PBRIsSlab = !row.entity.PBRIsSlab;
            row.entity.PBRAmount = '';
            if (row.entity.PBRIsSlab) {
                if (!row.entity.subGridOptions) {
                    row.entity.subGridOptions = _setupThirdGridOptions();
                }
                if (row.entity.subGridOptions.columnDefs.length <= 0) {
                    _addThirdGridSlabColumns(row.entity)
                }
                if (!row.isExpanded) {//expand row 
                    $scope.secondGridApi.expandable.toggleRowExpansion(row.entity);
                }
            }
            else {
                row.entity.subGridOptions = { data: [], columnDefs: [] }
                if (row.isExpanded) {//collapse row
                    $scope.secondGridApi.expandable.toggleRowExpansion(row.entity);
                }
            }

        }
        function _changeFormula(row) {

            row.entity.PBRIsFormula = !row.entity.PBRIsFormula;
            row.entity.PBRAmount = '';
            if (row.entity.PBRIsFormula) {
                if (!row.entity.subGridOptions) {
                    row.entity.subGridOptions = _setupThirdGridOptions();

                }
                if (row.entity.subGridOptions.columnDefs.length <= 0) {
                    _addThirdGridFormulaColumns(row.entity)
                }
                if (row.entity.PBRCalcOnSHId.length > 0) {
                    if (row.entity.PBRCalcOnSHId.length == 1) {
                        $scope.showMsg('warning', 'Select atleast two heads in calculation part.')
                        row.entity.PBRIsFormula = false;
                    }
                    else {
                        row.entity.PBRPercantage = '';
                        if (!row.isExpanded)
                            $scope.secondGridApi.expandable.toggleRowExpansion(row.entity);
                    }
                }//
                else {
                    row.entity.subGridOptions = { data: [], columnDefs: [] };
                    row.entity.PBRIsFormula = false;
                }
            }
            else {
                if (row.isExpanded) {
                    row.entity.subGridOptions = { data: [], columnDefs: [] };
                    $scope.secondGridApi.expandable.toggleRowExpansion(row.entity);
                }
            }
        }
        function _removeRuleSlab(row) {
            row.entity.PBRIsRemove = !row.entity.PBRIsRemove;
            row.entity.PBRAmount = 0.00;
            // var index = $scope.payGridOptions.data.indexOf(row.entity);
            // $scope.payGridOptions.data.splice(index, 1);
            _getNetPayable();
        }

        //END: first level grid functions

        //START: second level grid functions
        function _setupSecondGrid(entity) {

            if (entity) {
                entity.subGridOptions = _secondGridOptions();
                _addSecondGridColumns(entity)
            }

        }
        function _secondGridOptions() {

            var subGridOptions = {
                expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit ng-style=\"getSubgridHeight(row.entity.subGridOptions)\" class=\"djGrid\"></div>',
                expandableRowHeight: 150,
                enableExpandableRowHeader: false,
                // subGridVariable will be available in subGrid scope
                expandableRowScope: {
                    subGridVariable: 'subGridScopeVariable',
                    externalScope: $scope
                },
                rowHeight: 35,
                enableColumnResizing: false,
                enableFiltering: false,
                enableGridMenu: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                enablePaginationControls: false,
                enableVerticalScrollbar: false,
                enableHighlighting: false,
                enablePinning: false,
                enableCellEditOnFocus: true,
                data: [],
                columnDefs: [],
                onRegisterApi: _onSecondGridRegisterApi,
                showGridFooter: false,
                showColumnFooter: false,

                // gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name for opt in grid.appScope.rulePage.pageinfo.fields.PBRSHId.options"></select></div><div class="pull-right"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
                // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
            };

            return subGridOptions;
        }
        function _addSecondGridColumns(entity) {
            var cellTemplateCheck = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateCheck += "<a href ng-click=\"grid.appScope.externalScope.changeFormula(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsSlab && (row.entity.PBRPercantage<=0)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBRIsFormula, 'fa-square-o': !row.entity.PBRIsFormula }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateCheck += "</div>"

            var cellTemplateSlab = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateSlab += "<a href ng-click=\"grid.appScope.externalScope.changeSlab(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsFormula && (row.entity.PBRPercantage<=0)\"> <i class=\"fa  font-green\"  ng-class=\"{'fa-check-square-o': row.entity.PBRIsSlab, 'fa-square-o': !row.entity.PBRIsSlab }\"  aria-hidden=\"true\"></i></a>";
            cellTemplateSlab += "</div>"

            var cellTemplateRowExpand = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRowExpand += '<a href ng-click=\"grid.appScope.externalScope.toggleRowExpand(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && (row.entity.PBRIsFormula || row.entity.PBRIsSlab) && (row.entity.PBRPercantage<=0)\"  title="Expand/ Collapse Row" ><i class="fa " ng-class=\"{\'fa-plus\':!row.isExpanded, \'fa-minus\':row.isExpanded}\" aria-hidden="true"></i></a>'
            cellTemplateRowExpand += "</div>"

            var cellTemplateRemove = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRemove += " <a href ng-click=grid.appScope.externalScope.removeRuleSlab(row) title=\"Remove Rule\"><i class=\"fa \" ng-class=\"{\'fa-undo font-green\':row.entity.PBRIsRemove, \'fa-times font-red\':!row.entity.PBRIsRemove}\" aria-hidden=\"true\"></i></a>";
            cellTemplateRemove += "</div>"

            entity.subGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBRSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBRSHId.text,
                width: 170, visible: true,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownIdLabel: 'value',
                editDropdownValueLabel: 'name',
                editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRSHId.options,
                cellFilter: "mapDropdown:grid.appScope.externalScope.rulePage.pageinfo.fields.PBRSHId.options:'value':'name'",
                cellClass: _secondGridCellClass,
                cellEditableCondition: _secondGridCellEditableCondition,
                colIndex: 0
            })

            entity.subGridOptions.columnDefs.push({
                name: 'SHeadType',
                displayName: 'Head Type',
                width: 80, visible: true, cellFilter: '',
                cellClass: _secondGridCellClass,
                cellEditableCondition: false,
                colIndex: 1
            })

            entity.subGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.text,
                width: 230, visible: true,
                editableCellTemplate: 'uiSelectMulti',
                // editDropdownIdLabel: 'value',
                // editDropdownValueLabel: 'name',
                editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.options,
                cellFilter: "mapMultiDropdown:grid.externalScope.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",
                cellClass: _secondGridCellClass,
                cellEditableCondition: _secondGridCellEditableCondition,
                colIndex: 2
            })

            // editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.options,
            // cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",

            entity.subGridOptions.columnDefs.push(
                {
                    name: 'PBRPercantage',
                    displayName: '%',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: _secondGridCellEditableCondition,
                    colIndex: 3,
                    // cellTemplate: '<div ng-show="(row.entity.PBRCalcOnSHId.length > 0) && (!scope.row.entity.PBRIsFormula && !scope.row.entity.PBRIsSlab)" class="ui-grid-cell-contents ng-binding ng-scope"><div class="ngCellText"><input type="text" class="form-control" ng-model="row.entity.PBRPercantage"/></div></div></div>'
                })
            entity.subGridOptions.columnDefs.push(
                {
                    name: 'GrossPercentage',
                    displayName: 'Gross %',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })
            entity.subGridOptions.columnDefs.push(
                {
                    name: $scope.rulePage.pageinfo.fields.PBRAmount.name,
                    displayName: $scope.rulePage.pageinfo.fields.PBRAmount.text,
                    width: 90, visible: true, cellFilter: 'avoidNan',
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: _secondGridCellEditableCondition,
                    colIndex: 4
                })

            entity.subGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateCheck,
                    name: 'PBRIsFormula',
                    displayName: 'For mula',
                    type: 'boolean',
                    width: 50, visible: true, cellFilter: '',
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: false,
                    colIndex: 5
                })

            entity.subGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateSlab,
                    name: 'PBRIsSlab',
                    displayName: 'Sl ab',
                    width: 30, visible: true,
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: false,
                    colIndex: 6
                })

            entity.subGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRemove,
                    name: 'PBRIsRemove',
                    displayName: '-',
                    width: 30, visible: true,
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: false,
                    colIndex: 7
                })

            entity.subGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRowExpand,
                    name: 'rowExpand',
                    displayName: '-',
                    width: 30, visible: true,
                    cellClass: _secondGridCellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })
        }
        function _secondGridCellClass(grid, row, col, rowRenderIndex, colRenderIndex) {
            if (row.entity.PBRIsRemove) {
                return 'strikethrough'
            }
            if (row.entity.PBRSHId == -1) {
                return 'status-bg YELLOW-300 cell-border-right';
            }
            else if (row.entity.PBRSHId > 0) {
                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                if (shGross != null) {
                    if (row.entity.PBRSHId == shGross.value) {
                        return 'status-bg ORANGE-500'
                    }
                }
            }
            if (colRenderIndex == 5) {
                return 'text-right';
            }
            else if (colRenderIndex == 6) {
                return 'GREY-300';
            }
            else if (colRenderIndex == 7) {
                return 'BLUE-GRAY-200';
            }
            return '';
        }
        function _secondGridCellEditableCondition(scope) {
            if (scope.col.name == "PBRSHId") {
                return true;
            }
            else if (scope.col.name == "PBRPercantage") {
                if (scope.row.entity.PBRCalcOnSHId) {
                    if (scope.row.entity.PBRCalcOnSHId.length > 0) {
                        if (!scope.row.entity.PBRIsFormula && !scope.row.entity.PBRIsSlab)
                            return true;
                    }
                }
                return false;
            }
            // else if (scope.col.name == "PBRCalcOnSHId") {
            //     if (entity.subGridOptions.data.length > 0) {

            //     }
            //     return false;
            // }
            else if (scope.row.entity.PBRSHId) {
                var shBasic = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsBasic')
                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                if (shBasic !== null && shGross != null) {
                    if (scope.row.entity.PBRSHId == shBasic.value || scope.row.entity.PBRSHId == shGross.value) {
                        if (scope.col.name == "PBRAmount") {
                            if (scope.row.entity.PBRIsFormula || scope.row.entity.PBRIsSlab) {
                                return false;
                            }
                            else if (scope.row.entity.PBRSHId == shBasic.value) {
                                return true;
                            }
                        }
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }
        function _onSecondGridRegisterApi(secondGridApi) {
            $scope.secondGridApi = secondGridApi;

            secondGridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                    row.expandedRowHeight = 70;
                    $timeout(function () {

                        if (row.entity.subGridOptions.data)
                            row.expandedRowHeight = row.entity.subGridOptions.data.length * row.entity.subGridOptions.rowHeight + 39;

                        console.log(row.grid.parentRow.expandedRowHeight)
                        row.grid.parentRow.expandedRowHeight += row.expandedRowHeight;

                        // console.log(row.entity.subGridOptions)
                    }, 150);
                }
                else {
                    if (row.expandedRowHeight)
                        if (row.expandedRowHeight > 0)
                            row.grid.parentRow.expandedRowHeight -= row.expandedRowHeight;
                }
            });

            secondGridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                console.log('sub grid api', colDef, rowEntity, newValue, oldValue)
            });
        }
        //END: second level grid functions


        //START: third level grid functions
        function _setupThirdGridOptions() {
            var subGridOptions = {
                // expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit ng-style=\"getSubgridHeight(row.entity.subGridOptions)\"></div>',
                // expandableRowHeight: 150,
                // enableExpandableRowHeader: false,
                // subGridVariable will be available in subGrid scope
                // expandableRowScope: {
                //     subGridVariable: 'subGridScopeVariable'
                // },
                rowHeight: 35,
                enableColumnResizing: false,
                enableFiltering: false,
                enableGridMenu: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                enablePaginationControls: false,
                enableVerticalScrollbar: false,
                enableHighlighting: false,
                enablePinning: false,
                enableCellEditOnFocus: true,
                data: [],
                columnDefs: [],
                onRegisterApi: _onThirdGridRegisterApi,
                showGridFooter: false,
                showColumnFooter: false,

                // gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name for opt in grid.appScope.rulePage.pageinfo.fields.PBRSHId.options"></select></div><div class="pull-right"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
                // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
            };

            return subGridOptions;
        }
        function _addThirdGridFormulaColumns(row) {
            row.subGridOptions.columnDefs.push(
                {
                    name: 'leftpin',
                    displayName: '.',
                    width: 50, visible: true, cellFilter: '',
                    cellEditableCondition: false,
                    cellClass: ''
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDCalcHeadId',
                    displayName: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.text,
                    width: 250, visible: true,
                    editableCellTemplate: 'uiSelectMulti',
                    // editDropdownIdLabel: 'value',
                    // editDropdownValueLabel: 'name',
                    editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.options,
                    cellFilter: "mapMultiDropdown:grid.appScope.externalScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",
                    cellClass: '',
                    cellEditableCondition: false
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDPercentage',
                    displayName: 'Percentage',
                    width: 100, visible: true, cellFilter: '',
                    cellEditableCondition: true
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDOperator',
                    displayName: 'Operator',
                    width: 100, visible: true,
                    //  cellFilter: function () {
                    //     return function (input) {
                    //         if (input == '+')
                    //             return 'Plus'
                    //         else if (input == '-')
                    //             return 'Minus'
                    //         return ''
                    //     }

                    // },
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownIdLabel: 'value',
                    editDropdownValueLabel: 'name',
                    editDropdownOptionsArray: [
                        { value: '', name: 'None' },
                        { value: '+', name: 'Plus' },
                        { value: '-', name: 'Minus' }
                    ],
                    cellEditableCondition: function (scope) {
                        console.log(scope)
                    }

                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDAmount',
                    displayName: 'Amount',
                    width: 100, visible: true, cellFilter: '',
                    cellEditableCondition: true
                })



        }
        function _addThirdGridSlabColumns(row) {
            var cellTemplateAvoid = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateAvoid += "<a href ng-click=\"grid.appScope.changeAvoidExcessCalc(row)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBSAvoidExcessCalc, 'fa-square-o': !row.entity.PBSAvoidExcessCalc }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateAvoid += "</div>"


            row.subGridOptions.columnDefs.push(
                {
                    name: 'leftpin',
                    displayName: '.',
                    width: 50, visible: true, cellFilter: '',
                    cellEditableCondition: false,
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        return 'status-bg YELLOW-300'
                    }
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: $scope.slabPage.pageinfo.fields.PBSPercentage.name,
                    displayName: $scope.slabPage.pageinfo.fields.PBSPercentage.text,
                    width: 100, visible: true, cellFilter: 'avoidNan'
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.name,
                    displayName: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.text,
                    width: 140, visible: true, cellFilter: 'avoidNan', type: 'decimal'
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: $scope.slabPage.pageinfo.fields.PBSMaxCalcOnAmount.name,
                    displayName: $scope.slabPage.pageinfo.fields.PBSMaxCalcOnAmount.text,
                    width: 150, visible: true, cellFilter: '', type: 'decimal'
                })


            row.subGridOptions.columnDefs.push(
                {
                    name: $scope.slabPage.pageinfo.fields.PBSMinAmount.name,
                    displayName: $scope.slabPage.pageinfo.fields.PBSMinAmount.text,
                    width: 130, visible: true, cellFilter: 'avoidNan', type: 'decimal'
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: $scope.slabPage.pageinfo.fields.PBSMasAmount.name,
                    displayName: $scope.slabPage.pageinfo.fields.PBSMasAmount.text,
                    width: 130, visible: true, cellFilter: 'avoidNan', type: 'decimal'
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'CalculatedAmount',
                    displayName: 'Amount',
                    width: 90, visible: true, cellFilter: 'avoidNan', cellEditableCondition: false
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PBSAvoidExcessCalc',
                    displayName: 'Avoid',
                    type: 'boolean',
                    cellTemplate: cellTemplateAvoid,
                    // editableCellTemplate: cellTemplateAvoid,
                    width: 50, visible: true, cellFilter: '', cellEditableCondition: true
                })


            if (row.PBRCalcOnSHId != undefined) {
                if (row.PBRCalcOnSHId.length > 0) {
                    row.subGridOptions.data = [];
                    row.subGridOptions.data.push({
                        PBRRuleName: '',
                        PBSId: 0,
                        PBSIsCalcOnPercentage: true,
                        PBSPBRId: 0
                    })
                }
            }
        }

        function _onThirdGridRegisterApi(thirdGridApi) {
            $scope.thirdGridApi = thirdGridApi;
            console.log($scope.thirdGridApi)

        }


        //END: third level grid functions


        // save employee payband detail
        function _saveEmpPayband() {
            var newRuleList = [];
            for (var firstRowIndex = 0; firstRowIndex < $scope.page.gridOptions.data.length; firstRowIndex++) {
                var firstRow = $scope.page.gridOptions.data[firstRowIndex];
                var oldEntity = firstRow.oldEntity;
                if (firstRow.subGridOptions) {

                    if (firstRow.subGridOptions.data.length > 0) {
                        for (var secondRowIndex = 0; secondRowIndex < firstRow.subGridOptions.data.length; secondRowIndex++) {
                            var newRule = firstRow.subGridOptions.data[secondRowIndex];
                            var isFoundChanges = false;
                            var oldRule = $filter('findObj')(oldEntity, newRule.PBRSHId, 'PBRSHId');
                            if (oldRule != null) {
                                if (!angular.equals(oldRule, newRule)) {
                                    newRule.EmpId = firstRow.EmpId;
                                    newRuleList.push(newRule)
                                }
                            }
                        }
                    }
                }
            }

            if (newRuleList != null && newRuleList != undefined) {
                console.log(newRuleList)
                angular.forEach(newRuleList, function (data) {
                    var calOnShId = "";
                    var calOnHeadId = "";
                    if (data.PBRCalcOnSHId != undefined) {
                        angular.forEach(data.PBRCalcOnSHId, function (cal) {
                            calOnShId += cal.value + ",";
                        })
                    }

                    var empPBRId = 0;
                    if ($scope.empRuleWithSlabAndFormulaDetail != undefined) {
                        var allEmpRule = $filter('findAll')($scope.empRuleWithSlabAndFormulaDetail[0], data.EmpId, 'EPBREmpId');
                        if (allEmpRule != null) {
                            var empRule = $filter('findObj')(allEmpRule, data.PBRId, 'EPBRPBRId');
                            if (empRule != null) {
                                empPBRId = empRule.EPBRId;
                            }
                        }
                    }
                    var empRule = {
                        EPBRId: empPBRId == 0 ? undefined : empPBRId,
                        EPBRCalcOnSHId: "[" + calOnShId.substring(0, calOnShId.length - 1) + "]",
                        EPBRIsFormula: data.PBRIsFormula,
                        EPBRIsSlab: data.PBRIsSlab,
                        EPBREmpId: data.EmpId,
                        EPBRPBRId: data.PBRId,
                        PBRId: data.PBRId,
                        EPBRIgnoreRule: false,
                        EPBRPercantage: data.PBRPercantage,
                        EPBRSHId: data.PBRSHId,
                        EPBRPBId: data.PBRPBId,
                        EPBRRuleName: data.PBRRuleName,
                        EPBRAmount: data.PBRAmount
                    }
                    $scope.multiEntity = {};
                    $scope.multiEntity.parent = {
                        newEntity: empRule,
                        oldEntity: {},
                        action: empRule.EPBRId == undefined ? 'create' : 'edit',
                        tableid: pageIds.empRulePage.tableId,
                        pageid: pageIds.empRulePage.pageId
                    }
                    $scope.multiEntity.child = [];
                    if (data.PBRIsFormula) {
                        if (data.child[0].rows.length > 0) {
                            var child = {
                                tableid: pageIds.empFormulaPage.tableId,
                                pageid: pageIds.empFormulaPage.pageId,
                                parentColumn: 'EPBRId',
                                linkColumn: 'EPFDPBRId',
                                idenColName: 'EPFDId',
                                rows: []
                            }
                            for (var formula = 0; formula < data.child[0].rows.length; formula++) {
                                if (data.child[0].rows[formula].PFDCalcHeadId != undefined && data.child[0].rows[formula].PFDCalcHeadId != null) {
                                    angular.forEach(data.child[0].rows[formula].PFDCalcHeadId, function (formulaCal) {
                                        calOnHeadId = formulaCal.value + ",";
                                    })
                                }
                               
                                var empFormula = {
                                    EPFDId: 0,
                                    EPFDPBRId: data.child[0].rows[formula].PFDPBRId,
                                    EPFDCalcHeadId: "[" + calOnHeadId.substring(0, calOnHeadId.length - 1) + "]",
                                    EPFDPercentage: data.child[0].rows[formula].PFDPercentage,
                                    EPFDOperator: data.child[0].rows[formula].PFDOperator,
                                    EPFDAmount: data.child[0].rows[formula].PFDAmount,
                                }
                                child.rows.push(empFormula);
                            }
                        }
                        $scope.multiEntity.child.push(child);
                    }

                    if (data.PBRIsSlab) {
                        if (data.child[1].rows.length > 0) {
                            var child = {
                                tableid: pageIds.empSlabPage.tableId,
                                pageid: pageIds.empSlabPage.pageId,
                                parentColumn: 'EPBRId',
                                linkColumn: 'EPBSEPBRId',
                                idenColName: 'EPBSId',
                                rows: []
                            }
                            for (var slab = 0; slab < data.child[1].rows.length; slab++) {
                                var empSlab = {
                                    EPBSId: 0,
                                    EPBSEPBRId: data.child[1].rows[slab].PBSPBRId,
                                    EPBSIsCalcOnPercentage: data.child[1].rows[slab].PBSIsCalcOnPercentage,
                                    EPBSPercentage: data.child[1].rows[slab].PBSPercentage,
                                    EPBSMinCalcOnAmount: data.child[1].rows[slab].PBSMinCalcOnAmount,
                                    EPBSMaxCalcOnAmount: data.child[1].rows[slab].PBSMaxCalcOnAmount,
                                    EPBSMinAmount: data.child[1].rows[slab].PBSMinAmount,
                                    EPBSAvoidExcessCalc: data.child[1].rows[slab].PBSAvoidExcessCalc,
                                    EPBSMasAmount: data.child[1].rows[slab].PBSMasAmount
                                }
                                child.rows.push(empSlab);
                            }
                        }
                        $scope.multiEntity.child.push(child);
                    }
                    console.log($scope.multiEntity)
                    $scope.multiEntity.lz = false;
                    pageService.multiSave($scope.multiEntity).then(function (result) {
                        console.log(result)
                        if (result == "done") {
                            $scope.showMsg("success", "Record Saved Successfully");
                            //  _recalculatingSecondGrid($scope.page.gridOptions)
                        }
                    }, function (err) {
                        console.log(err)
                    })
                })
            }
        }

        // END: save employee payband detail

        _loadController();
    }
})();