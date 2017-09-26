/**
 * @author deepak.jain
 * created on 12.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.payband')
        .controller('paybandController', paybandController);

    /** @ngInject */
    function paybandController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, $timeout, $filter, $http) {


        var headRemainingPerList = [];//used for handling remaining % of dependent heads

        $scope.salary = { grossAmt: 0, earningAmt: 0, deductionAmt: 0, netPayableAmt: 0, employerAmt: 0, ctcAmt: 0 }
        $scope.payGridOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit ui-grid-cellNav class="djSubGrid" ></div>',
            expandableRowHeight: 150,
            enableExpandableRowHeader: false,
            //subGridVariable will be available in subGrid scope
            expandableRowScope: {
                subGridVariable: 'subGridScopeVariable'
            },
            rowHeight: 35,
            enableColumnResizing: false,
            enableFiltering: false,
            enableGridMenu: false,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enablePaginationControls: false,
            enableVerticalScrollbar: false,
            enableHighlighting: false,
            enablePinning: false,
            editableOnFocus: true,
            data: [],
            columnDefs: [],
            onRegisterApi: _onRegisterApi,
            showGridFooter: true,
            showColumnFooter: false,
            gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left" ng-show="grid.appScope.isShowCalculatediff">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name group by opt.SHType for opt in grid.appScope.differenceHeadList| orderBy:\'name\'"></select></div><div class="pull-right" ng-show="grid.appScope.isShowCalculatediff"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }
        $scope.differenceHeadList = [];
        $scope.entity = {}
        $scope.page = $scope.createPage();
        $scope.page.pageId = 133;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: false,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: _addRecord,
            editRecord: _editRecord,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: false,
            filterOnChange: null,
            pageResult: _pageResult
        }
        $scope.rulePage = {}
        $scope.rulePage.pageId = 134;
        $scope.slabPage = {}
        $scope.slabPage.pageId = 135;
        $scope.paybandTemp = {
            TableId: 441,
            PageId: 461,
            RuleTableId: 442,
            RulePageId: 462,
            FormulaTableId: 443,
            FormulaPageId: 463,
            SlabTableId: 444,
            SlabPageId: 464,

        }

        $scope.closeForm = _closeForm;
        $scope.templateOnchange = _templateOnchange;
        $scope.basedOnchange = _basedOnchange;
        $scope.onBasicPercentChange = _calculateBasicOnGross;
        $scope.onGrossChange = _calculateBasicOnGross;
        $scope.addNewRule = _addNewRule;
        $scope.removeRuleSlab = _removeRuleSlab;
        $scope.changeFormula = _changeFormula;
        $scope.changeSlab = _changeSlab;
        $scope.addTotal = _addTotal;
        $scope.toggleRowExpand = _toggleRowExpand;
        $scope.changeAvoidExcessCalc = _changeAvoidExcessCalc;
        $scope.getNetPayable = _getNetPayable;
        $scope.getgross = _getGross;
        $scope.getCTC = _getCTC;
        $scope.getDifferenceHeadList = _getDifferenceHeadList;
        $scope.saveForm = _saveForm;



        function _templateOnchange(paybandTemplateId) {
            $timeout(function () {
                var multiData = {
                    lz: false,
                    parent: {
                        tableid: $scope.paybandTemp.TableId,
                        pkValue: paybandTemplateId
                    }, child: [
                        {
                            tableid: $scope.paybandTemp.RuleTableId,
                            linkColumn: 'PBTRPBTId',
                            orderByList: [
                                { column: 'PBTRId', isDesc: false }
                            ],
                            child: [
                                {
                                    tableid: $scope.paybandTemp.FormulaTableId,//formula table
                                    linkColumn: 'PFTDPBTRId',
                                    orderByList: []
                                },
                                {
                                    tableid: $scope.paybandTemp.SlabTableId,
                                    linkColumn: 'PBTSPBTRId',
                                    orderByList: []
                                }]
                        }
                    ]
                };
                var tableData = pageService.getMultiEntity(multiData);
                tableData.then(_getTempMultiEntitySuccess, _getTempMultiEntityError)
            });

        }



        /**end of default grid edit function */


        function _getTempMultiEntitySuccess(result) {
            console.log(result);
            // $scope.entity = result;
            if (result != undefined && result != null) {
                $scope.entity.PBBasedOn = '';
                var ruleRows = [];
                $scope.payGridOptions.data = [];
                if (result.child) {
                    if (result.child[0].rows) {
                        //    var grossAmt = parseFloat(result.PBGrossSalary);

                        for (var i = 0; i < result.child[0].rows.length; i++) {
                            var row = result.child[0].rows[i];

                            // row.PBRAmount = parseFloat(row.PBRAmount).toFixed(2);
                            //find head type

                            var entity = {};

                            entity.PBRId = 0;
                            entity.PBRSHId = row.PBTRSHId;
                            entity.PBRPBId = 0;
                            entity.PBRRuleName = '';
                            entity.PBRAmount = 0;
                            entity.PBRPercantage = row.PBTRPercentage == undefined ? '' : row.PBTRPercentage == 0.000 ? '' : row.PBTRPercentage;
                            entity.PBRIsFormula = row.PBTRIsFormula;
                            entity.PBRIsSlab = row.PBTRIsSlab;
                            entity.IsDeleted = true;
                            var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, row.PBTRSHId, 'value')
                            if (foundPB != null) {
                                if (foundPB.SHIsForEmployer == "True") {
                                    entity.SHeadType = 'Employer';
                                }
                                else if (foundPB.SHIsDeduction == "False") {
                                    entity.SHeadType = 'Earning';
                                }
                                else {
                                    entity.SHeadType = 'Deduction';
                                }
                            }

                            entity.PBRCalcOnSHId = row.PBTRCalcOnSHId.replace('[', '').replace(']', '')
                            if (entity.PBRCalcOnSHId != '') {
                                var dependHeadList = entity.PBRCalcOnSHId.split(',');
                                var selectedHeadList = [];
                                for (var h = 0; h < dependHeadList.length; h++) {
                                    var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                    if (shead != null) {
                                        selectedHeadList.push(shead)
                                    }
                                }
                                entity.PBRCalcOnSHId = selectedHeadList;
                            }
                            ruleRows.push(entity);
                            if (row.child) {

                                if (row.child.length > 0) {
                                    entity.child = [];
                                    for (var c = 0; c < row.child.length; c++) {
                                        var child = row.child[c];
                                        entity.child.push(child)
                                        if (child.rows) {
                                            if (child.rows.length > 0) {
                                                if (child.tableid == $scope.paybandTemp.SlabTableId) {//slab table

                                                    var slabRows = {};
                                                    slabRows.PBSId = 0;
                                                    slabRows.PBSPBRId = 0;
                                                    slabRows.PBSIsCalcOnPercentage = row.child[1].rows[0].PBTSIsCalcOnPercentage;
                                                    slabRows.PBSMinCalcOnAmount = row.child[1].rows[0].PBTSMinCalcOnAmount;
                                                    slabRows.PBSMaxCalcOnAmount = row.child[1].rows[0].PBTSMaxCalcOnAmount;
                                                    slabRows.PBSMinAmount = row.child[1].rows[0].PBTSMinAmount;
                                                    slabRows.PBSMasAmount = row.child[1].rows[0].PBTSMaxAmount;
                                                    slabRows.PBSPercentage = row.child[1].rows[0].PBTSPercentage;
                                                    //slabRows.PBRRuleName = row.child[1].PBTRRuleName;
                                                    slabRows.PBSAvoidExcessCalc = row.child[1].rows[0].PBTSAvoidExcessCalc;
                                                    entity.child[1].rows = slabRows;
                                                    _getSubGridOptions(entity, false);
                                                }
                                                else if (child.tableid == $scope.paybandTemp.FormulaTableId) {//formula table                                           
                                                    var formulaRows = [];
                                                    angular.forEach(child.rows, function (formula) {
                                                        var formulaEntity = {};
                                                        formulaEntity.PFDId = 0;
                                                        formulaEntity.PFDPBRId = 0;
                                                        formulaEntity.PFDCalcHeadId = formula.PFTDCalcHeadId.replace('[', '').replace(']', '')
                                                        if (formulaEntity.PFDCalcHeadId != '') {
                                                            var dependHeadList = formulaEntity.PFDCalcHeadId.split(',');
                                                            var selectedHeadList = [];
                                                            for (var h = 0; h < dependHeadList.length; h++) {
                                                                var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, dependHeadList[h], 'value')
                                                                if (shead != null) {
                                                                    selectedHeadList.push(shead)
                                                                }
                                                            }
                                                            formulaEntity.PFDCalcHeadId = selectedHeadList;
                                                        }
                                                        formulaEntity.PFDPercentage = formula.PFTDPercentage;
                                                        formulaEntity.PFDOperator = formula.PFTDOperator;
                                                        formulaRows.push(formulaEntity)
                                                    })
                                                    entity.child[0].rows = formulaRows;
                                                    _getSubGridOptions(entity, true);
                                                }
                                                if (row.subGridOptions) {
                                                    if (child.tableid == $scope.paybandTemp.SlabTableId) {
                                                        row.subGridOptions.data = entity.child[1].rows;
                                                    }
                                                    else {
                                                        row.subGridOptions.data = entity.child[0].rows;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        result.child[0].rows = ruleRows;
                        $scope.payGridOptions.data = result.child[0].rows;
                    }
                }
                _getNetPayable();
            }
        }
        function _getTempMultiEntityError(err) {
            console.log(err)
        }

        function _basedOnchange(basedOnId) {
            if ($scope.payGridOptions.data.length > 0) {
                var basic = [];
                var gross = [];
                var basicHead = $filter("findObj")($scope.rulePage.pageinfo.fields.PBRSHId.options, "True", 'SHIsBasic');
                var grossHead = $filter("findObj")($scope.rulePage.pageinfo.fields.PBRSHId.options, "True", 'SHIsGross');
                if (basicHead != null) {
                    basic = $filter("findObj")($scope.payGridOptions.data, basicHead.value, 'PBRSHId');
                }
                if (grossHead != null) {
                    gross = $filter("findObj")($scope.payGridOptions.data, grossHead.value, 'PBRSHId');
                }
                if (basedOnId == 1) {
                    if (basicHead != null) {
                        if (basic != null) {
                            $scope.payGridOptions.data.splice(0, 1)
                            if (gross != null) {
                                $scope.payGridOptions.data.splice(0, 1)
                            }
                            $scope.payGridOptions.data.splice(0, 0, basic);
                            if (gross != null) {
                                $scope.payGridOptions.data.splice($scope.payGridOptions.data.length, 0, gross);
                            }
                        }
                        else {
                            $scope.showMsg("warning", "Basic is not defined")
                        }
                    }
                }
                else {
                    if (grossHead != null) {
                        if (gross != null) {
                            var firstSHId = $scope.payGridOptions.data[0].PBRSHId;
                            var lastShId = $scope.payGridOptions.data[$scope.payGridOptions.data.length - 1].PBRSHId;
                            if (firstSHId != grossHead.value && lastShId == grossHead.value) {
                                if (basic != null) {
                                    $scope.payGridOptions.data.splice(0, 1)
                                }
                                $scope.payGridOptions.data.splice($scope.payGridOptions.data.length - 1, 1)
                                $scope.payGridOptions.data.splice(0, 0, gross);
                                if (basic != null) {
                                    $scope.payGridOptions.data.splice(1, 0, basic);
                                }
                            }
                            else {
                                $scope.payGridOptions.data.splice(0, 1)
                                $scope.payGridOptions.data.splice(0, 1)
                                $scope.payGridOptions.data.splice(0, 0, gross);
                                $scope.payGridOptions.data.splice(1, 0, basic)
                            }
                        }
                        else {
                            $scope.showMsg("warning", "Gross is not defined")
                        }
                    }
                }
            }
        }


        function CalculatePercentageOnAmount(amount, totalAmount, decimalPlaces) {

            var floatAmount = parseFloat(amount);
            var floatTotal = parseFloat(totalAmount);
            var intDecimal = parseInt(decimalPlaces);

            if (isNaN(floatAmount) || isNaN(floatTotal) || isNaN(intDecimal)) {
                return 0.00;
            }
            else {
                var result = (floatAmount * 100) / floatTotal;
                if (intDecimal) {
                    if (intDecimal > 0)
                        result = result.toFixed(intDecimal);
                }
                return result;
            }
        }
        function CalculateAmountOnPercentage(percentageValue, totalAmount, decimalPlaces) {
            var result = (parseFloat(percentageValue) / 100) * totalAmount
            if (decimalPlaces) {
                if (decimalPlaces > 0)
                    result = result.toFixed(decimalPlaces);
            }
            return result;
        }
        function _pageResult(result) {

        }

        $scope.getTableHeight = function () {
            var rowHeight = 35; // your row height
            var headerHeight = 35; // your header height
            return {

                // height: ($scope.payGridOptions.data.length * rowHeight + headerHeight) + "px"
            };
        };

        $scope.getSubgridHeight = function (options) {
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

        function _addRuleGridRow(PBRId, PBRIsFormula, PBSId, PBRPBId, PBRSHId, SHName, SHeadType, PBRRuleName, PBRCalcOnSHId, PBRAmount) {

            $scope.payGridOptions.data.push({
                PBRId: PBRId,
                PBRIsFormula: PBRIsFormula,
                PBSId: PBSId,
                PBRPBId: PBRPBId,
                PBRSHId: PBRSHId,
                SHName: SHName,
                SHeadType: SHeadType,
                PBRRuleName: PBRRuleName,
                PBRCalcOnSHId: PBRCalcOnSHId,
                PBRAmount: PBRAmount
            })

        }
        function _addTotal() {
            if ($scope.salary) {
                if ($scope.salary.grossAmt < $scope.salary.earningAmt) {
                    $scope.showMsg('warning', 'Earning already matched with Gross Amount')
                    return;
                }
            }
            //adding current state total row at last
            if ($scope.selectedOtherHead) {
                if ($scope.payGridOptions.data.length) {

                    var shFound = $filter('findObj')($scope.payGridOptions.data, $scope.selectedOtherHead.value, 'PBRSHId')
                    if (shFound != null) {
                        $scope.showMsg('warning', 'Selected Head already added in List')
                        return;
                    }


                    var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                    var grossId = 0;
                    if (shGross != null) {
                        grossId = shGross.value;
                    }
                    var totAmt = 0;
                    var grossAmt = 0;
                    var headList = []
                    for (var i = 0; i < $scope.payGridOptions.data.length; i++) {
                        if (grossId != $scope.payGridOptions.data[i].PBRSHId) {
                            totAmt += parseFloat($scope.payGridOptions.data[i].PBRAmount)
                            var newHead = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, $scope.payGridOptions.data[i].PBRSHId, 'value')
                            if (newHead != null) {
                                headList.push(newHead)
                            }
                        }
                        else {
                            grossAmt = $scope.payGridOptions.data[i].PBRAmount;
                        }
                    }

                    var diffAmt = Math.round(grossAmt - totAmt);
                    var grossPer = CalculatePercentageOnAmount(diffAmt, grossAmt);
                    $scope.payGridOptions.data.push({
                        PBRId: 0,
                        PBSId: 0,
                        PBRPBId: 0,
                        PBRSHId: $scope.selectedOtherHead.value,
                        SHName: $scope.selectedOtherHead.name,
                        SHeadType: ($scope.selectedOtherHead.SHIsDeduction == "False") ? 'Earning' : 'Deduction',
                        PBRRuleName: $scope.selectedOtherHead.name,
                        PBRCalcOnSHId: [{ value: grossId, name: 'Gross' }],
                        PBRIsFormula: true,
                        PBRIsSlab: false,
                        PBRPercantage: '',
                        PBRAmount: diffAmt.toFixed(2),
                        GrossPercentage: grossPer
                    })

                    var lastRow = $scope.payGridOptions.data[$scope.payGridOptions.data.length - 1];
                    _getSubGridOptions(lastRow, true)

                    // $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);

                    lastRow.subGridOptions.data = [];

                    lastRow.subGridOptions.data.push({
                        PFDId: 0,
                        PFDPBRId: 0,
                        PFDCalcHeadId: [shGross],
                        PFDPercentage: 100,
                        PFDOperator: '',
                        PFDAmount: grossAmt
                    })

                    lastRow.subGridOptions.data.push({
                        PFDId: 0,
                        PFDPBRId: 0,
                        PFDCalcHeadId: headList,
                        PFDPercentage: 100,
                        PFDOperator: '-',
                        PFDAmount: totAmt
                    })

                    $scope.rulePage.gridApi.expandable.toggleRowExpansion(lastRow)

                }
            }
            _addDependentHeadList();
            _addSalaryHeadList();
            _getNetPayable();
        }
        function _addDependentHeadList() {
            //update dependent dropdown
            var dependList = [];
            for (var v = 0; v < $scope.payGridOptions.data.length; v++) {
                var shead = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, $scope.payGridOptions.data[v].PBRSHId, 'value')
                if (shead != null) {
                    dependList.push(shead);
                }
            }

            $scope.payGridOptions.columnDefs[2].editDropdownOptionsArray = dependList;
        }
        function _addSalaryHeadList() {
            //update dependent dropdown
            // var dependList = []// angular.copy($scope.rulePage.pageinfo.fields.PBRSHId.options)
            // for (var v = 0; v < $scope.rulePage.pageinfo.fields.PBRSHId.options.length; v++) {
            //     var opt = $scope.rulePage.pageinfo.fields.PBRSHId.options[v];
            //     var shead = $filter('findObj')($scope.payGridOptions.data, opt.value, 'PBRSHId')
            //     if (shead == null) {
            //         dependList.push(opt);
            //     }
            // }

            // $scope.payGridOptions.columnDefs[0].editDropdownOptionsArray = dependList;
        }
        //adding new row to rule grid
        function _addNewRule(row) {
            if ($scope.payGridOptions.data.length > 0) {
                var lastRow = $scope.payGridOptions.data[$scope.payGridOptions.data.length - 1];
                if (lastRow.PBRSHId) {

                    _addRuleGridRow(0, false, 0, 0, 0, '', '', '', '', 0);

                }
            }
            else {
                _addRuleGridRow(0, false, 0, 0, 0, '', '', '', '', 0);
            }
        }
        function _toggleRowExpand(row) {
            $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
        }
        function _changeSlab(row) {
            console.log(row)
            //isExpanded
            row.entity.PBRIsSlab = !row.entity.PBRIsSlab;
            row.entity.PBRAmount = '';
            if (row.entity.PBRIsSlab) {
                _getSubGridOptions(row.entity, row.entity.PBRIsFormula)
                if (!row.isExpanded) {//expand row 
                    $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                }
            }
            else {
                row.entity.subGridOptions = { data: [], columnDefs: [] }
                if (row.isExpanded) {//collapse row
                    $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                }
            }

        }
        function _changeFormula(row) {

            row.entity.PBRIsFormula = !row.entity.PBRIsFormula;
            row.entity.PBRAmount = '';
            if (row.entity.PBRIsFormula) {
                _getSubGridOptions(row.entity, row.entity.PBRIsFormula)
                if (row.entity.PBRCalcOnSHId.length > 0) {
                    if (row.entity.PBRCalcOnSHId.length == 1) {
                        $scope.showMsg('warning', 'Select atleast two heads in calculation part.')
                        row.entity.PBRIsFormula = false;
                    }
                    else {
                        row.entity.PBRPercantage = '';
                        if (!row.isExpanded)
                            $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
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
                    $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                }
            }
        }
        function _removeRuleSlab(row) {
            var index = $scope.payGridOptions.data.indexOf(row.entity);
            $scope.payGridOptions.data.splice(index, 1);
            _getNetPayable();
        }
        function _changeAvoidExcessCalc(row) {
            console.log(row)
            var headRows = row.grid.parentRow.entity.PBRCalcOnSHId;
            var headAmtTot = 0
            for (var i = 0; i < headRows.length; i++) {
                var headAmt = _getHeadAmount(headRows[i].value)
                headAmtTot += parseFloat(headAmt);
            }

            if (row.entity.PBSMaxCalcOnAmount) {
                if (parseFloat(row.entity.PBSMaxCalcOnAmount) > headAmt) {
                    row.grid.parentRow.entity.PBRAmount = ''
                }
            }
        }

        $scope.$watch(function () {
            return $scope.entity.PBBasicPerctange;
        }, function (newVal, oldValue) {
            var PBBasicPerctange = parseFloat(newVal);
            if (isNaN(newVal) && newVal != '') {
                $scope.entity.PBBasicPerctange = oldValue;
            }
            else {
                _calculateBasicOnGross();
            }
        })
        $scope.$watch(function () {
            return $scope.entity.PBGrossSalary;
        }, function (newVal, oldValue) {
            var PBGrossSalary = parseFloat(newVal);
            if (isNaN(newVal) && newVal != '') {
                $scope.entity.PBGrossSalary = oldValue;
            }
            else {
                _calculateBasicOnGross();
            }
        })

        //calculating basic on gross percentage
        function _calculateBasicOnGross() {

            $scope.isShowCalculatediff = false;

            if ($scope.entity.PBBasicPerctange && $scope.entity.PBGrossSalary) {
                if ($scope.entity.PBBasicPerctange == '' && $scope.entity.PBGrossSalary == '') {
                    // $scope.payGridOptions.data = [];
                    _getNetPayable();
                    return;
                }
            }
            else {
                // $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            var basicPerct = Math.abs(parseFloat($scope.entity.PBBasicPerctange));
            var PBGrossSalary = Math.abs(parseFloat($scope.entity.PBGrossSalary))

            //removing rows from grid if invalid values found
            if (basicPerct <= 0 || PBGrossSalary <= 0) {
                // $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            //removing rows from grid if invalid values found
            if (isNaN(PBGrossSalary) || isNaN(basicPerct)) {
                // $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            //removing rows from grid if invalid values found
            if (basicPerct > 100) {
                // $scope.payGridOptions.data = [];
                _getNetPayable();
                $scope.showMsg('Basic % can not more than 100%')
                return;
            }
            if (!isNaN(PBGrossSalary) && !isNaN(basicPerct)) {
                //finding basic head in dropdown list
                var shBasic = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsBasic')
                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')

                var basicSalary = Math.round((basicPerct / 100) * PBGrossSalary);
                if (isNaN(basicSalary)) {
                    basicSalary = 0;
                }
                if ($scope.payGridOptions.data.length > 0) {


                    //finding gross
                    var grossHead = $filter('findObj')($scope.payGridOptions.data, shGross.value, $scope.rulePage.pageinfo.fields.PBRSHId.name)
                    if (grossHead != null) {
                        grossHead.PBRAmount = PBGrossSalary.toFixed(2);
                    }
                    else {
                        grossHead = {
                            PBSId: 0,
                            PBRPBId: 0,
                            PBRSHId: shGross.value,
                            SHName: shGross.name,
                            PBRRuleName: shGross.name,
                            PBRCalcOnSHId: [],
                            PBRAmount: PBGrossSalary.toFixed(2)
                        }
                        $scope.payGridOptions.data.splice(0, 1, basicHead)
                    }

                    //finding basic head in rule list
                    var basicHead = $filter('findObj')($scope.payGridOptions.data, shBasic.value, $scope.rulePage.pageinfo.fields.PBRSHId.name)
                    if (basicHead != null) {
                        basicHead.PBRAmount = basicSalary.toFixed(2);
                        basicHead.PBRPercantage = basicPerct;
                        basicHead.GrossPercentage = basicPerct;
                    }
                    else {

                        basicHead = {
                            PBSId: 0,
                            PBRPBId: 0,
                            PBRSHId: shBasic.value,
                            SHName: shBasic.name,
                            PBRRuleName: shBasic.name,
                            PBRCalcOnSHId: [
                                { value: shGross.value, name: shGross.name }
                            ],
                            PBRPercantage: basicPerct,
                            PBRAmount: basicSalary.toFixed(2),
                            GrossPercentage: basicPerct,
                            SHeadType: 'Earning'
                        }
                        $scope.payGridOptions.data.splice(1, 1, basicHead)
                    }
                }
                else {

                    //adding Gross  & Basic Heads on the top of rules
                    var grossHead = {
                        PBRId: 0,
                        PBRIsFormula: false,
                        PBSId: 0,
                        PBRPBId: 0,
                        PBRSHId: shGross.value,
                        SHName: shGross.name,
                        PBRRuleName: shGross.name,
                        PBRCalcOnSHId: [],
                        PBRAmount: PBGrossSalary
                    }
                    $scope.payGridOptions.data.splice(0, 1, grossHead)

                    var basicHead = {
                        PBRId: 0,
                        PBRIsFormula: false,
                        PBSId: 0,
                        PBRPBId: 0,
                        PBRSHId: shBasic.value,
                        SHName: shBasic.name,
                        PBRRuleName: shBasic.name,
                        PBRCalcOnSHId: [
                            { value: shGross.value, name: shGross.name }
                        ],
                        PBRPercantage: basicPerct,
                        GrossPercentage: basicPerct,
                        PBRAmount: basicSalary.toFixed(2),
                        SHeadType: 'Earning'
                    }
                    $scope.payGridOptions.data.splice(1, 1, basicHead)
                }

                $scope.isShowCalculatediff = true;
            }
            // _getDifferenceHeadList();
            _reviseGrid()
            _getNetPayable();
            _addSalaryHeadList();
        }

        function _loadController() {

            $timeout(function () {
                pageService.getPagData($scope.rulePage.pageId).then(
                    function (result) {
                        console.log(result)
                        $scope.rulePage = angular.extend({}, $scope.rulePage, result);
                        $scope.differenceHeadList = $scope.rulePage.pageinfo.fields.PBRSHId.options;
                        _addRuleGridColumns();


                    }, function (err) {

                    })
                //mapDropdown:editDropdownOptionsArray:editDropdownIdLabel:editDropdownValueLabel
                pageService.getPagData($scope.slabPage.pageId).then(
                    function (result) {
                        console.log(result)
                        $scope.slabPage = angular.extend({}, $scope.slabPage, result);
                    }, function (err) {

                    })
            });
        }
        function _addRecord() {
            $scope.entity = { PBId: 0 }
            $scope.page.showEditForm = true;
            $scope.payGridOptions.data = [];
            $scope.action = 'create';
        }
        function _editRecord(row) {

            $scope.page.showEditForm = true;
            $scope.entity = angular.copy(row.entity);
            $scope.page.isAllowEdit = true;
            if ($scope.entity.PBId !== undefined) {
                $timeout(function () {
                    var multiData = {
                        lz: false,
                        parent: {
                            tableid: $scope.page.pageinfo.tableid,
                            pkValue: $scope.entity.PBId
                        }, child: [
                            {
                                tableid: $scope.rulePage.pageinfo.tableid,
                                linkColumn: 'PBRPBId',
                                orderByList: [
                                    { column: 'PBRId', isDesc: false }
                                ],
                                child: [
                                    {
                                        tableid: 434,//formula table
                                        linkColumn: 'PFDPBRId',
                                        orderByList: []
                                    },
                                    {
                                        tableid: $scope.slabPage.pageinfo.tableid,
                                        linkColumn: 'PBSPBRId',
                                        orderByList: []
                                    }]
                            }
                        ]
                    };
                    var tableData = pageService.getMultiEntity(multiData);
                    tableData.then(_getMultiEntitySuccess, _getMultiEntityError)
                });
            }
            $scope.action = 'edit';
        }


        function _getMultiEntitySuccess(result) {
            $scope.entity = result;
            $scope.payGridOptions.data = [];
            if (result.child) {
                if (result.child[0].rows) {
                    var grossAmt = parseFloat(result.PBGrossSalary);

                    for (var i = 0; i < result.child[0].rows.length; i++) {
                        var row = result.child[0].rows[i];

                        row.PBRAmount = parseFloat(row.PBRAmount).toFixed(2);
                        //find head type
                        var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, row.PBRSHId, 'value')
                        if (foundPB != null) {
                            if (foundPB.SHIsForEmployer == "True") {
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
                                                _getSubGridOptions(row, false);
                                            }
                                            else if (child.tableid == 434) {//formula table
                                                _getSubGridOptions(row, true);
                                            }
                                            if (row.subGridOptions) {
                                                row.subGridOptions.data = child.rows;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $scope.payGridOptions.data = result.child[0].rows;
                }
            }
            _getNetPayable();
        }
        function _getMultiEntityError(err) {
            console.log(err)
        }
        function _addRuleGridColumns() {
            var cellTemplateCheck = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateCheck += "<a href  ng-show=\"row.entity.PBRCalcOnSHId.length>1 && !row.entity.PBRIsSlab && (row.entity.PBRPercantage<=0)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBRIsFormula, 'fa-square-o': !row.entity.PBRIsFormula }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateCheck += "</div>"

            var cellTemplateSlab = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateSlab += "<a href  ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsFormula && (row.entity.PBRPercantage<=0)\"> <i class=\"fa  font-green\"  ng-class=\"{'fa-check-square-o': row.entity.PBRIsSlab, 'fa-square-o': !row.entity.PBRIsSlab }\"  aria-hidden=\"true\"></i></a>";
            cellTemplateSlab += "</div>"

            var cellTemplateRowExpand = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRowExpand += '<a href ng-click=\"grid.appScope.toggleRowExpand(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && (row.entity.PBRIsFormula || row.entity.PBRIsSlab) && (row.entity.PBRPercantage<=0)\"  title="Expand/ Collapse Row" ><i class="fa " ng-class=\"{\'fa-plus\':!row.isExpanded, \'fa-minus\':row.isExpanded}\" aria-hidden="true"></i></a>'
            cellTemplateRowExpand += "</div>"

            var cellTemplateRemove = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRemove += " <a href ng-click=grid.appScope.removeRuleSlab(row) title=\"Remove Rule\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></a>";
            cellTemplateRemove += "</div>"

            $scope.payGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBRSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBRSHId.text, width: 170, visible: true,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownIdLabel: 'value',
                editDropdownValueLabel: 'name',
                editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRSHId.options,
                cellFilter: "mapDropdown:grid.appScope.rulePage.pageinfo.fields.PBRSHId.options:'value':'name'",
                cellClass: _cellClass,
                // cellEditableCondition: _cellEditableCondition,
                colIndex: 0,
                cellEditableCondition: false,
            })

            $scope.payGridOptions.columnDefs.push({
                name: 'SHeadType',
                displayName: 'Head Type',
                width: 80, visible: true, cellFilter: '',
                cellClass: _cellClass,
                cellEditableCondition: false,
                colIndex: 1,
                // cellEditableCondition: false,
            })

            $scope.payGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.text,
                width: 230, visible: true,
                editableCellTemplate: 'uiSelectMulti',
                // editDropdownIdLabel: 'value',
                // editDropdownValueLabel: 'name',
                editDropdownOptionsArray: $scope.payGridOptions.data,
                cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",
                cellClass: _cellClass,
                // cellEditableCondition: _cellEditableCondition,
                cellEditableCondition: false,
                colIndex: 2
            })

            // editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.options,
            // cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",

            $scope.payGridOptions.columnDefs.push(
                {
                    name: 'PBRPercantage',
                    displayName: '%',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    //   cellEditableCondition: _cellEditableCondition,
                    colIndex: 3,
                    // cellTemplate: '<div ng-show="(row.entity.PBRCalcOnSHId.length > 0) && (!scope.row.entity.PBRIsFormula && !scope.row.entity.PBRIsSlab)" class="ui-grid-cell-contents ng-binding ng-scope"><div class="ngCellText"><input type="text" class="form-control" ng-model="row.entity.PBRPercantage"/></div></div></div>'
                })
            $scope.payGridOptions.columnDefs.push(
                {
                    name: 'GrossPercentage',
                    displayName: 'Gross %',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    //cellEditableCondition: false,
                    colIndex: 8
                })
            $scope.payGridOptions.columnDefs.push(
                {
                    name: $scope.rulePage.pageinfo.fields.PBRAmount.name,
                    displayName: $scope.rulePage.pageinfo.fields.PBRAmount.text,
                    width: 90, visible: true, cellFilter: 'avoidNan',
                    cellClass: _cellClass,
                    cellEditableCondition: true,
                    //   cellEditableCondition: _cellEditableCondition,
                    colIndex: 4

                })

            $scope.payGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateCheck,
                    name: 'PBRIsFormula',
                    displayName: 'For mula',
                    type: 'boolean',
                    width: 50, visible: true, cellFilter: '',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 5

                })

            $scope.payGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateSlab,
                    name: 'PBRIsSlab',
                    displayName: 'Sl ab',
                    width: 30, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 6
                })

            $scope.payGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRemove,
                    name: 'ruleRemove',
                    displayName: '-',
                    width: 30, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 7

                })

            $scope.payGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRowExpand,
                    name: 'rowExpand',
                    displayName: '-',
                    width: 30, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })
        }
        function _addFormulaGridColumns(row) {

            row.subGridOptions.columnDefs.push(
                {
                    name: 'leftpin',
                    displayName: '.',
                    width: 50, visible: true, cellFilter: '',
                    cellEditableCondition: false,

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
                    cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",
                    cellClass: _cellClass,
                    cellEditableCondition: _cellEditableCondition
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDPercentage',
                    displayName: 'Percentage',
                    width: 100, visible: true, cellFilter: '',
                    cellEditableCondition: false
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDOperator',
                    displayName: 'Operator',
                    width: 100, visible: true,
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownIdLabel: 'value',
                    editDropdownValueLabel: 'name',
                    editDropdownOptionsArray: [
                        { value: '', name: 'None' },
                        { value: '+', name: 'Plus' },
                        { value: '-', name: 'Minus' }
                    ],
                    cellEditableCondition: false


                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFDAmount',
                    displayName: 'Amount',
                    width: 100, visible: true, cellFilter: '',
                    cellEditableCondition: true
                })


        }
        function _cellClass(grid, row, col, rowRenderIndex, colRenderIndex) {
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


        function _cellEditableCondition(scope) {
            console.log(scope)
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
            //     if ($scope.payGridOptions.data.length > 0) {

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

        function _getSubGridOptions(row, PBRIsFormula) {
            row.subGridOptions = {
                enableCellEditOnFocus: true,
                columnDefs: [],
                onRegisterApi: _onSubGridRegisterApi
            };
            if (PBRIsFormula) {
                _addFormulaGridColumns(row)
                row.subGridOptions.data = [];
                if (row.PBRCalcOnSHId.length > 0) {
                    for (var i = 0; i < row.PBRCalcOnSHId.length; i++) {
                        var headAmt = parseFloat(_getHeadAmount(row.PBRCalcOnSHId[i].value))

                        row.subGridOptions.data.push({
                            PFDId: 0,
                            PFDPBRId: 0,
                            PFDCalcHeadId: [row.PBRCalcOnSHId[i]],
                            PFDPercentage: row.child[0].rows[i].PFDPercentage,
                            PFDOperator: row.child[0].rows[i].PFDOperator,
                            PFDAmount: headAmt.toFixed(2)
                        })


                    }
                }
            }
            else {
                if ($scope.slabPage.pageinfo) {

                    var cellTemplateAvoid = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
                    cellTemplateAvoid += "<a href ng-click=\"grid.appScope.changeAvoidExcessCalc(row)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBSAvoidExcessCalc, 'fa-square-o': !row.entity.PBSAvoidExcessCalc }\" aria-hidden=\"true\" ></i></a>";
                    cellTemplateAvoid += "</div>"


                    row.subGridOptions.columnDefs.push(
                        {
                            name: 'leftpin',
                            displayName: '.',
                            width: 50, visible: true, cellFilter: '',
                            cellEditableCondition: false,


                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSPercentage.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSPercentage.text,
                            width: 100, visible: true, cellFilter: 'avoidNan',
                            cellEditableCondition: false,
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.text,
                            width: 140, visible: true, cellFilter: 'avoidNan', type: 'decimal',
                            cellEditableCondition: false,
                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMaxCalcOnAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMaxCalcOnAmount.text,
                            width: 150, visible: true, cellFilter: '', type: 'decimal',
                            cellEditableCondition: false,
                        })


                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMinAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMinAmount.text,
                            width: 130, visible: true, cellFilter: 'avoidNan', type: 'decimal',
                            cellEditableCondition: false,
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMasAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMasAmount.text,
                            width: 130, visible: true, cellFilter: 'avoidNan', type: 'decimal',
                            cellEditableCondition: false,
                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: 'CalculatedAmount',
                            displayName: 'Amount',
                            width: 90, visible: true, cellFilter: 'avoidNan', cellEditableCondition: false,
                            cellEditableCondition: false,
                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: 'PBSAvoidExcessCalc',
                            displayName: 'Avoid',
                            type: 'boolean',
                            cellTemplate: cellTemplateAvoid,
                            // editableCellTemplate: cellTemplateAvoid,
                            width: 50, visible: true, cellFilter: '', cellEditableCondition: false
                        })

                    if (row.PBRCalcOnSHId.length > 0) {
                        // row.child[1].rows[0].PBSMaxCalcOnAmount
                        row.subGridOptions.data = [];
                        row.subGridOptions.data.push({
                            PBRRuleName: '',
                            PBSId: 0,
                            PBSIsCalcOnPercentage: true,
                            PBSPBRId: 0,
                            PBSMaxCalcOnAmount: row.child[1].rows.PBSMaxCalcOnAmount,
                            PBSIsCalcOnPercentage: row.child[1].rows.PBSIsCalcOnPercentage,
                            PBSMinCalcOnAmount: row.child[1].rows.PBSMinCalcOnAmount,
                            PBSMinAmount: row.child[1].rows.PBSMinAmount,
                            PBSMasAmount: row.child[1].rows.PBSMasAmount,
                            PBSPercentage: row.child[1].rows.PBSPercentage,
                            PBSAvoidExcessCalc: row.child[1].rows.PBSAvoidExcessCalc,

                        })
                    }
                }
            }
        }

        function _onSubGridRegisterApi(subGridApi) {

            subGridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                console.log('sub grid api', colDef)
                if (subGridApi.grid.parentRow.entity.PBRIsFormula) {
                    if (colDef.name == "PFDPercentage") {
                        //checking valid input %
                        var pfdPercentage = parseFloat(rowEntity.PFDPercentage);
                        if (isNaN(pfdPercentage)) {
                            rowEntity.PFDPercentage = 0;
                        }
                        else {
                            rowEntity.PFDPercentage = pfdPercentage.toFixed(2);
                        }
                    }
                    else if (colDef.name == "PFDOperator") {
                        //checking valid input operators

                    }
                    else if (colDef.name == "PFDOperator") {
                        //checking valid input operators

                    }
                    //calculating amount as per forumula
                    var lastTotal = 0;
                    for (var i = 0; i < subGridApi.grid.rows.length; i++) {
                        if (i == 0) {
                            lastTotal = subGridApi.grid.rows[i].entity.PFDAmount
                        }
                        else {
                            var shAmt = parseFloat(subGridApi.grid.rows[i].entity.PFDAmount);
                            var shPer = parseFloat(subGridApi.grid.rows[i].entity.PFDPercentage)
                            var calcAmt = (shPer / 100) * shAmt;
                            if (subGridApi.grid.rows[i].entity.PFDOperator == '+') {
                                lastTotal = lastTotal + calcAmt
                            }
                            else if (subGridApi.grid.rows[i].entity.PFDOperator == '-') {
                                lastTotal = lastTotal - calcAmt
                            }
                        }
                    }
                    subGridApi.grid.parentRow.entity.PBRAmount = lastTotal.toFixed(2);
                }
                else {

                    //finding dependent heads total
                    var headRows = subGridApi.grid.parentRow.entity.PBRCalcOnSHId;
                    var headAmtTot = 0
                    for (var i = 0; i < headRows.length; i++) {
                        var headAmt = _getHeadAmount(headRows[i].value)
                        headAmtTot += parseFloat(headAmt);
                    }

                    var calcPercentage = parseFloat(rowEntity.PBSPercentage);
                    if (colDef.name == "PBSPercentage") {
                        if (isNaN(calcPercentage)) {
                            rowEntity.PBSPercentage = '';
                        }
                        else {
                            if (calcPercentage > 0 && calcPercentage <= 100) {
                                rowEntity.PBSPercentage = calcPercentage.toFixed(2);
                            }
                            else {
                                rowEntity.PBSPercentage = '';
                            }
                        }
                    }
                    else if (colDef.name == "PBSMinCalcOnAmount") {
                        var inputMaxAmt = parseFloat(rowEntity.PBSMaxCalcOnAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBSMinCalcOnAmount);
                        if (isNaN(inputMinAmt)) {
                            rowEntity.PBSMinCalcOnAmount = 0;
                        }
                        else {
                            //checking whether min amount is more than dependent head total amount or not
                            if (headAmtTot < inputMinAmt) {
                                $scope.showMsg('warning', 'Min Amount can not more than dependent head amount')
                                rowEntity.PBSMinCalcOnAmount = headAmtTot.toFixed(2);
                                return;
                            }
                            //checking whether max amount is less than min amount or not
                            if (!isNaN(inputMaxAmt)) {
                                if (inputMaxAmt > 0) {
                                    if (inputMaxAmt < inputMinAmt) {
                                        $scope.showMsg('warning', 'Min amount can not more than max amount')
                                        rowEntity.PBSMinCalcOnAmount = 0;
                                        return;
                                    }
                                }
                            }
                            rowEntity.PBSMinCalcOnAmount = inputMinAmt.toFixed(2);
                            var calcMinAmt = Math.round((calcPercentage / 100) * inputMinAmt);
                            if (calcPercentage > 0) {
                                rowEntity.PBSMinAmount = calcMinAmt.toFixed(2);
                            }
                        }
                    }
                    else if (colDef.name == "PBSMaxCalcOnAmount") {
                        var inputMaxAmt = parseFloat(rowEntity.PBSMaxCalcOnAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBSMinCalcOnAmount);
                        if (isNaN(inputMaxAmt)) {
                            rowEntity.PBSMaxCalcOnAmount = 0;
                        }
                        else {
                            //checking whether min amount is more than dependent head total amount or not
                            if (headAmtTot < inputMaxAmt) {
                                $scope.showMsg('warning', 'Min amount can not more than dependent head amount')
                                rowEntity.PBSMaxCalcOnAmount = headAmtTot.toFixed(2);
                                return;
                            }
                            //checking whether max amount is less than min amount or not
                            if (!isNaN(inputMinAmt)) {
                                if (inputMinAmt > 0) {
                                    if (inputMaxAmt < inputMinAmt) {
                                        $scope.showMsg('warning', 'Max amount can not less than min amount')
                                        rowEntity.PBSMaxCalcOnAmount = 0;
                                        return;
                                    }
                                }
                            }
                            //calculating max amount as per percentage input
                            rowEntity.PBSMaxCalcOnAmount = inputMaxAmt.toFixed(2);
                            var calcMaxAmt = Math.round((calcPercentage / 100) * inputMaxAmt);
                            if (calcPercentage > 0) {
                                rowEntity.PBSMasAmount = calcMaxAmt.toFixed(2);
                            }
                        }
                    }
                    else if (colDef.name == "PBSMinAmount") {
                        var inputValue = parseFloat(rowEntity.PBSMinAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBSMinCalcOnAmount);
                        if (isNaN(inputValue)) {
                            rowEntity.PBSMinAmount = 0;
                        }
                        else {

                            if (isNaN(inputMinAmt)) {
                                rowEntity.PBSMinCalcOnAmount = 0;
                            }
                            else {
                                var calcMinAmt = Math.round((calcPercentage / 100) * inputMinAmt);
                                if (inputValue < calcMinAmt) {
                                    rowEntity.PBSMinAmount = calcMinAmt.toFixed(2);
                                    $scope.showMsg('warning', 'Min calculated amount can not less than ' + calcPercentage.toFixed(2) + '% of defined min salary amount.')
                                }
                                else {
                                    rowEntity.PBSMinAmount = inputValue.toFixed(2);
                                }
                            }
                        }

                    }
                    else if (colDef.name == "PBSMasAmount") {
                        var inputValue = parseFloat(rowEntity.PBSMasAmount);
                        var inputMaxAmt = parseFloat(rowEntity.PBSMaxCalcOnAmount);

                        if (isNaN(inputValue)) {
                            rowEntity.PBSMasAmount = 0;
                        }
                        else {
                            if (isNaN(inputMaxAmt)) {
                                rowEntity.PBSMaxCalcOnAmount = 0;
                            }
                            else {
                                var calcMaxAmt = Math.round((calcPercentage / 100) * inputMaxAmt);
                                if (inputValue > calcMaxAmt) {
                                    $scope.showMsg('warning', 'Max calculated amount can not more than ' + calcPercentage.toFixed(2) + '% of defined max salary amount.')
                                    rowEntity.PBSMasAmount = calcMaxAmt.toFixed(2);
                                }
                                else {
                                    rowEntity.PBSMasAmount = inputValue.toFixed(2);
                                }
                            }
                        }
                    }
                    else if (colDef.name == "PBSAvoidExcessCalc") {

                    }


                    //calculating amount as per slab
                    if (subGridApi.grid.parentRow.entity.PBRCalcOnSHId.length > 0) {



                        var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                        var grossId = 0;
                        if (shGross != null) {
                            grossId = shGross.value;
                        }

                        var totalAmount = 0;
                        var deductionTotal = 0;
                        var employerTotal = 0;
                        var grossAmt = 0;
                        for (var c = 0; c < $scope.payGridOptions.data.length; c++) {
                            var row = $scope.payGridOptions.data[c];

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


                        var calcOnAmt = headAmtTot;

                        var maxAmtOn = parseFloat(rowEntity.PBSMaxCalcOnAmount);
                        var minAmtOn = parseFloat(rowEntity.PBSMinCalcOnAmount);

                        var maxAmt = parseFloat(rowEntity.PBSMasAmount);
                        var minAmt = parseFloat(rowEntity.PBSMinAmount);

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

                        rowEntity.CalculatedAmount = Math.round(parseFloat(calculatedAmt), 0).toFixed(2)

                        //setting amount to parent row
                        if (subGridApi.grid.rows.length == 1) {
                            subGridApi.grid.parentRow.entity.PBRAmount = Math.round(parseFloat(calculatedAmt)).toFixed(2);
                            if (grossAmt > 0)
                                subGridApi.grid.parentRow.entity.GrossPercentage = ((calculatedAmt * 100) / grossAmt).toFixed(2)
                            else
                                subGridApi.grid.parentRow.entity.GrossPercentage = '-';
                        }
                        else
                            subGridApi.grid.parentRow.entity.PBRAmount = 0;


                        if (rowEntity.PBSAvoidExcessCalc) {
                            if (rowEntity.PBSMaxCalcOnAmount) {
                                if (parseFloat(rowEntity.PBSMaxCalcOnAmount) < headAmt) {
                                    subGridApi.grid.parentRow.entity.PBRAmount = ''
                                    subGridApi.grid.parentRow.entity.GrossPercentage = ''
                                }
                            }
                        }
                    }

                }
                $scope.netPayableAmount = _getNetPayable();
            });
        }

        function _onRegisterApi(gridApi) {

            $scope.rulePage.gridApi = gridApi;

            $scope.rulePage.gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                    if (row.entity.PBRCalcOnSHId.length == 0) {
                        //stop expanding if no dependent head found.
                        $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                    }
                    else {
                        //increasing dynamic subgrid height
                        console.log(row.expandedRowHeight)
                        row.expandedRowHeight = 70;

                        $timeout(function () {
                            if (row.entity.subGridOptions.data)
                                row.expandedRowHeight = row.entity.subGridOptions.data.length * row.entity.subGridOptions.rowHeight + 39;
                            console.log(row.expandedRowHeight)
                        }, 150);
                    }
                }
            });


            $scope.rulePage.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                _calculateBasicOnGross();

                // if (rowEntity.PBRCalcOnSHId.length <= 0) {
                //     rowEntity.PBRPercantage = '';
                // }

                // var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                // var grossId = 0;
                // if (shGross != null) {
                //     grossId = shGross.value;
                // }


                // var totalAmount = 0;
                // var deductionTotal = 0;
                // var employerTotal = 0;
                // var grossAmt = 0;
                // for (var c = 0; c < $scope.payGridOptions.data.length; c++) {
                //     var row = $scope.payGridOptions.data[c];
                //     if (rowEntity.PBRSHId != row.PBRSHId) {
                //         if (grossId != row.PBRSHId && row.SHeadType == 'Earning') {
                //             totalAmount += Math.round(row.PBRAmount);
                //         }
                //         else if (grossId != row.PBRSHId && row.SHeadType == 'Deduction') {
                //             deductionTotal += Math.round(row.PBRAmount);
                //         }
                //         else if (grossId != row.PBRSHId && row.SHeadType == 'Employer') {
                //             employerTotal += Math.round(row.PBRAmount);
                //         }
                //         else {
                //             grossAmt += Math.round(row.PBRAmount);
                //         }
                //     }
                // }

                // var remainingAmount = grossAmt - totalAmount;
                // var deductionRemainingAmount = grossAmt - deductionTotal;

                // var dependTotalAmt = 0

                // for (var i = 0; i < rowEntity.PBRCalcOnSHId.length; i++) {
                //     if (rowEntity.PBRCalcOnSHId[i].value == rowEntity.PBRSHId) {
                //         rowEntity.PBRCalcOnSHId = [];
                //         $scope.showMsg('warning', 'Head can not depend on to itself')
                //         return;
                //     }
                //     else {
                //         var amt = _getHeadAmount(rowEntity.PBRCalcOnSHId[i].value)
                //         dependTotalAmt += parseFloat(amt)
                //         //finding dependent head used ppercentage on entire data


                //     }
                // }

                // if (colDef.colIndex == 0) {
                //     //find existing in list
                //     rowEntity.PBRSHId = oldValue;
                //     var existingHead = $filter('findObj')($scope.payGridOptions.data, newValue, 'PBRSHId')
                //     if (existingHead != null) {
                //         $scope.showMsg('warning', 'Heads can not be duplicate.')
                //         rowEntity.PBRSHId = 0;
                //     }
                //     else {

                //         rowEntity.PBRSHId = newValue;
                //         var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, rowEntity.PBRSHId, 'value')
                //         if (foundPB != null) {
                //             if (foundPB.SHIsForEmployer == "True") {
                //                 rowEntity.SHeadType = 'Employer';
                //             }
                //             else if (foundPB.SHIsDeduction == "False") {


                //                 if ((grossAmt > 0 && remainingAmount > 0) || (grossAmt <= 0)) {

                //                     rowEntity.SHeadType = 'Earning';
                //                 }
                //                 else {
                //                     rowEntity.PBRSHId = 0;
                //                     $scope.showMsg('warning', 'Earnings already match with Gross amount')
                //                 }

                //             }
                //             else {
                //                 rowEntity.SHeadType = 'Deduction';
                //             }
                //         }
                //         _getDifferenceHeadList();
                //         _addDependentHeadList();
                //         _addSalaryHeadList();
                //     }
                // }
                // else if (colDef.colIndex == 2 || colDef.colIndex == 3) {

                //     var inputPer = parseFloat(rowEntity.PBRPercantage);
                //     if (isNaN(inputPer)) {
                //         rowEntity.PBRPercantage = '';
                //         return
                //     }
                //     else if (inputPer > 100) {
                //         rowEntity.PBRPercantage = '';
                //         return
                //     }
                //     //find dependent head remaining percentage


                //     //calculate amount and Percentage on depend col and percentage

                //     //updating amount field as per percentage
                //     rowEntity.PBRAmount = Math.round((parseFloat(rowEntity.PBRPercantage) / 100) * dependTotalAmt).toFixed(2);
                //     if (isNaN(rowEntity.PBRAmount)) {
                //         rowEntity.PBRAmount = 0;
                //     }
                //     if (grossAmt > 0 && remainingAmount <= 0 && rowEntity.SHeadType == 'Earning') {
                //         rowEntity.PBRAmount = 0;
                //         rowEntity.PBRPercantage = 0;
                //         rowEntity.GrossPercentage = 0;
                //         $scope.showMsg('warning', 'Earnings already match with Gross amount')
                //     }
                //     else if (deductionRemainingAmount <= 0 && rowEntity.SHeadType == 'Deduction') {
                //         rowEntity.PBRAmount = 0;
                //         rowEntity.PBRPercantage = 0;
                //         rowEntity.GrossPercentage = 0;
                //         $scope.showMsg('warning', 'Deductions can not more than earnings')
                //     }
                //     else {
                //         if (grossAmt > 0 && remainingAmount < rowEntity.PBRAmount && rowEntity.SHeadType == 'Earning') {
                //             rowEntity.PBRAmount = remainingAmount;
                //             rowEntity.PBRPercantage = ((rowEntity.PBRAmount * 100) / dependTotalAmt).toFixed(2)
                //         }
                //         else if (rowEntity.SHeadType == 'Deduction') {
                //             if ((deductionTotal + parseFloat(rowEntity.PBRAmount)) > totalAmount) {
                //                 rowEntity.PBRAmount = 0;
                //                 rowEntity.PBRPercantage = 0;
                //                 rowEntity.GrossPercentage = 0;
                //                 $scope.showMsg('warning', 'Deductions can not more than earnings')
                //             }
                //         }
                //         //find gorss % for calculated %
                //         //setting gross %
                //         if (grossAmt > 0) {
                //             rowEntity.GrossPercentage = ((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt).toFixed(2)
                //         }
                //     }
                // }
                // else if (colDef.colIndex == 4) {

                //     //if salary configured based on Gross than remaining must be checked
                //     if ((grossAmt > 0) && newValue > remainingAmount && rowEntity.SHeadType == 'Earning') {
                //         $scope.showMsg('error', 'Netpayble can not more than Gross')
                //         rowEntity.PBRAmount = remainingAmount.toFixed(2)
                //     }
                //     else if ((grossAmt > 0) && newValue > deductionRemainingAmount && rowEntity.SHeadType == 'Deduction') {
                //         $scope.showMsg('error', 'Deductions can not more than Earnings')
                //         rowEntity.PBRAmount = deductionRemainingAmount.toFixed(2)
                //     }
                //     else {
                //         rowEntity.PBRAmount = parseFloat(newValue).toFixed(2);
                //     }
                //     //avoiding 
                //     if (rowEntity.PBRIsSlab || rowEntity.PBRIsFormula) {

                //     }
                //     else {
                //         var expectedPer = Math.round(parseFloat((rowEntity.PBRAmount * 100)) / grossAmt, 2)

                //         if (dependTotalAmt > 0) {
                //             expectedPer = (rowEntity.PBRAmount * 100) / dependTotalAmt;
                //             if (expectedPer > 100) {
                //                 rowEntity.PBRPercantage = 100.00;
                //                 rowEntity.PBRAmount = Math.round(dependTotalAmt).toFixed(2);
                //             }
                //             else {
                //                 rowEntity.PBRPercantage = expectedPer.toFixed(2);
                //                 rowEntity.PBRAmount = Math.round(newValue).toFixed(2);
                //             }
                //         }
                //         else
                //             //updating % field as per amount
                //             if (rowEntity.PBRPercantage) {
                //                 if (rowEntity.PBRPercantage > 0) {
                //                     rowEntity.PBRPercantage = expectedPer.toFixed(2);
                //                 }
                //             }
                //     }
                //     if (grossAmt > 0)
                //         rowEntity.GrossPercentage = ((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt).toFixed(2)
                //     else
                //         rowEntity.GrossPercentage = '-';
                // }



                // //SHeadType
                // // if (colDef.name = 'PBRIsFormula') {
                // //     _getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                // // }
                // // else if (colDef.name = 'PBRCalcOnSHId') {

                // //     //_getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                // // }
                // // else if (colDef.name = 'PBRPercantage') {
                // //     //removing unwanted percentage value if no dependences attached


                // //     //_getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                // // }

                // $scope.netPayableAmount = _getNetPayable();
            });
        }

        function _getHeadAmount(headId) {
            var totalAmt = 0;
            if ($scope.payGridOptions.data.length > 0) {
                var salaryHead = $filter('findObj')($scope.payGridOptions.data, headId, $scope.rulePage.pageinfo.fields.PBRSHId.name)
                if (salaryHead != null) {
                    if (salaryHead.PBRCalcOnSHId.length <= 0) {
                        return salaryHead.PBRAmount;
                    }
                    else {

                        for (var i = 0; i < salaryHead.PBRCalcOnSHId.length; i++) {
                            var shId = salaryHead.PBRCalcOnSHId[i].value;
                            var shAmt = _getHeadAmount(shId)
                            if (salaryHead.PBRPercantage) {
                                totalAmt += (salaryHead.PBRPercantage / 100) * shAmt
                            }
                        }
                    }
                }
            }
            return totalAmt;
        }

        function _calculateSlabAmount() {

        }
        function _closeForm(form) {
            $scope.page.showEditForm = false;
            $scope.entity = {};
        }

        function _getNetPayable() {

            $scope.salary = { grossAmt: 0, earningAmt: 0, deductionAmt: 0, netPayableAmt: 0, employerAmt: 0, ctcAmt: 0 }

            if ($scope.payGridOptions.data.length) {

                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
                var grossId = 0;
                if (shGross != null) {
                    grossId = shGross.value;
                }
                var totAmt = 0;
                for (var i = 0; i < $scope.payGridOptions.data.length; i++) {
                    if (grossId == $scope.payGridOptions.data[i].PBRSHId) {
                        $scope.salary.grossAmt = $scope.payGridOptions.data[i].PBRAmount;
                    }
                    else if (grossId != $scope.payGridOptions.data[i].PBRSHId && $scope.payGridOptions.data[i].PBRSHId > 0) {
                        if ($scope.payGridOptions.data[i].SHeadType == 'Earning') {
                            $scope.salary.earningAmt += Math.round(parseFloat($scope.payGridOptions.data[i].PBRAmount));
                            totAmt += Math.round(parseFloat($scope.payGridOptions.data[i].PBRAmount));
                        }
                        else if ($scope.payGridOptions.data[i].SHeadType == 'Deduction') {
                            $scope.salary.deductionAmt += Math.round(parseFloat($scope.payGridOptions.data[i].PBRAmount));
                            totAmt -= Math.round(parseFloat($scope.payGridOptions.data[i].PBRAmount))
                        }
                        else {
                            $scope.salary.employerAmt += Math.round(parseFloat($scope.payGridOptions.data[i].PBRAmount));
                        }
                    }
                }
            }

            if ($scope.salary.grossAmt == 0) {
                $scope.salary.grossAmt = Math.round(parseFloat($scope.salary.earningAmt)).toFixed(2);
            }
            $scope.salary.netPayableAmt = Math.round(parseFloat($scope.salary.earningAmt - $scope.salary.deductionAmt)).toFixed(2);
            $scope.salary.ctcAmt = Math.round(parseFloat($scope.salary.earningAmt + $scope.salary.employerAmt)).toFixed(2);

            if ($scope.salary) {
                if ($scope.salary.grossAmt < $scope.salary.earningAmt) {
                    $scope.isShowCalculatediff = false;
                }
            }
        }
        function _reviseGrid() {
            var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')
            var grossId = 0;
            if (shGross != null) {
                grossId = shGross.value;
            }


            //finding total amounts for each section type 

            var totalAmount = 0;
            var deductionTotal = 0;
            var employerTotal = 0;
            var grossAmt = 0;
            for (var c = 0; c < $scope.payGridOptions.data.length; c++) {
                var row = $scope.payGridOptions.data[c];

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

            for (var rowIndex = 0; rowIndex < $scope.payGridOptions.data.length; rowIndex++) {
                var rowEntity = $scope.payGridOptions.data[rowIndex];
                var dependTotalAmt = 0;


                //find dependent head amount
                for (var a = 0; a < rowEntity.PBRCalcOnSHId.length; a++) {
                    if (rowEntity.PBRCalcOnSHId[a].value == rowEntity.PBRSHId) {
                        rowEntity.PBRCalcOnSHId = [];
                        $scope.showMsg('warning', 'Head can not depend on to itself')
                        return;
                    }
                    else {
                        var amt = _getHeadAmount(rowEntity.PBRCalcOnSHId[a].value)
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
                                    subAmtTotal += parseFloat(_getHeadAmount(subRow.PFDCalcHeadId[c].value));
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
        function _getDifferenceHeadList() {
            $scope.differenceHeadList = []// angular.copy($scope.rulePage.pageinfo.fields.PBRSHId.options);

            for (var i = 0; i < $scope.rulePage.pageinfo.fields.PBRSHId.options.length; i++) {
                var opt = $scope.rulePage.pageinfo.fields.PBRSHId.options[i]
                var shHead = $filter('findObj')($scope.payGridOptions.data, opt.value, 'PBRSHId')
                if (shHead == null) {
                    $scope.differenceHeadList.push(opt)
                }
            }
        }

        function _getGross() {
            return 0;
        }
        function _getCTC() {
            return 0;
        }

        function _validate() {
            return true;
        }
        function _saveForm(form) {

            $scope.multiEntity = {};
            $scope.multiEntity.parent = {
                newEntity: $scope.entity,
                oldEntity: {},
                action: $scope.action,
                tableid: $scope.page.pageinfo.tableid,
                pageid: $scope.page.pageinfo.pageid
            }
            $scope.multiEntity.child = [];

            var child1 = {
                tableid: $scope.rulePage.pageinfo.tableid,
                pageid: $scope.rulePage.pageinfo.pageid,
                parentColumn: $scope.page.pageinfo.idencolname,
                linkColumn: 'PBRPBId',
                idenColName: $scope.rulePage.pageinfo.idencolname,
                rows: []
            }

            for (var r = 0; r < $scope.payGridOptions.data.length; r++) {
                var row = $scope.payGridOptions.data[r];
                var ruleEntity = {};

                ruleEntity.PBRId = row.PBRId;
                ruleEntity.PBRSHId = row.PBRSHId;
                ruleEntity.PBRPBId = row.PBRPBId;
                ruleEntity.PBRRuleName = row.PBRRuleName;
                ruleEntity.PBRAmount = row.PBRAmount;
                ruleEntity.PBRPercantage = row.PBRPercantage;
                var calcHeads = ''
                for (var c = 0; c < row.PBRCalcOnSHId.length; c++) {
                    calcHeads += row.PBRCalcOnSHId[c].value + ','
                }
                if (calcHeads != '') {
                    calcHeads = calcHeads.substr(0, calcHeads.length - 1)
                }
                ruleEntity.PBRCalcOnSHId = '[' + calcHeads + ']'

                ruleEntity.PBRIsFormula = row.PBRIsFormula;
                ruleEntity.IsDeleted = true;

                if (row.subGridOptions) {
                    if (row.subGridOptions.data) {
                        if (row.subGridOptions.data.length > 0) {
                            ruleEntity.child = [];
                            if (row.PBRIsFormula) {
                                var formulaChild = {
                                    tableid: 434,
                                    pageid: 454,
                                    parentColumn: $scope.rulePage.pageinfo.idencolname,
                                    linkColumn: 'PFDPBRId',
                                    idenColName: 'PFDId',
                                    rows: []
                                }

                                for (var c = 0; c < row.subGridOptions.data.length; c++) {
                                    var ent = row.subGridOptions.data[c];

                                    var formulaEntity = {};
                                    formulaEntity.PFDId = ent.PFDId;
                                    formulaEntity.PFDPBRId = ent.PFDPBRId;

                                    //converting selected head to comas delimated string
                                    var calcHeadId = ''
                                    for (var i = 0; i < ent.PFDCalcHeadId.length; i++) {
                                        calcHeadId += ent.PFDCalcHeadId[i].value + ',';
                                    }
                                    if (calcHeadId != '') {
                                        calcHeadId = calcHeadId.substr(0, calcHeadId.length - 1);
                                    }

                                    formulaEntity.PFDCalcHeadId = '[' + calcHeadId + ']';

                                    formulaEntity.PFDPercentage = ent.PFDPercentage;
                                    formulaEntity.PFDOperator = ent.PFDOperator;
                                    formulaEntity.PFDAmount = ent.PFDAmount;

                                    formulaChild.rows.push(formulaEntity);

                                }

                                ruleEntity.child.push(formulaChild);
                            }
                            else {
                                var slabChild = {
                                    tableid: $scope.slabPage.pageinfo.tableid,
                                    pageid: $scope.slabPage.pageinfo.pageid,
                                    parentColumn: $scope.rulePage.pageinfo.idencolname,
                                    linkColumn: 'PBSPBRId',
                                    idenColName: 'PBSId',
                                    rows: []
                                }

                                for (var c = 0; c < row.subGridOptions.data.length; c++) {
                                    var ent = row.subGridOptions.data[c];
                                    if (ent.PBSPercentage) {
                                        var slabEntity = {};
                                        slabEntity.PBSId = ent.PBSId;
                                        slabEntity.PBSPBRId = ent.PBSPBRId;
                                        slabEntity.PBSIsCalcOnPercentage = ent.PBSIsCalcOnPercentage;
                                        slabEntity.PBSMinCalcOnAmount = ent.PBSMinCalcOnAmount;
                                        slabEntity.PBSMaxCalcOnAmount = ent.PBSMaxCalcOnAmount;
                                        slabEntity.PBSMinAmount = ent.PBSMinAmount;
                                        slabEntity.PBSMasAmount = ent.PBSMasAmount;
                                        slabEntity.PBSPercentage = ent.PBSPercentage;
                                        slabEntity.PBRRuleName = ent.PBRRuleName;
                                        slabEntity.PBSAvoidExcessCalc = ent.PBSAvoidExcessCalc;

                                        slabChild.rows.push(slabEntity);
                                    }

                                }

                                ruleEntity.child.push(slabChild);
                            }
                        }
                    }
                }
                child1.rows.push(ruleEntity)
            }

            $scope.multiEntity.child.push(child1)

            var postData = JSON.stringify($scope.multiEntity);
            var compressed = LZString.compressToEncodedURIComponent(postData);

            var data = { lz: false, data: compressed }
            $scope.multiEntity.lz = false;

            pageService.multiSave($scope.multiEntity).then(function (result) {
                if (result == "done") {
                    $scope.showMsg("success", "Record Saved Successfully");
                    //  _recalculatingSecondGrid($scope.page.gridOptions)
                }
            }, function (err) {
                console.log(err)
            })
            console.log($scope.multiEntity)
        }
        _loadController();
    }
})();
