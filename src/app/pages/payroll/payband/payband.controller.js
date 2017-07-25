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

        $scope.salary = { grossAmt: 0, earningAmt: 0, deductionAmt: 0, netPayableAmt: 0, employerAmt: 0, ctcAmt: 0 }
        $scope.payGridOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit class="djSubGrid" ></div>',
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
            gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name for opt in grid.appScope.rulePage.pageinfo.fields.PBRSHId.options"></select></div><div class="pull-right"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }

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

        $scope.closeForm = _closeForm;

        $scope.onBasicPercentChange = _calculateBasicOnGross;
        $scope.onGrossChange = _calculateBasicOnGross;
        $scope.addNewRule = _addNewRule;
        $scope.removeRuleSlab = _removeRuleSlab;
        $scope.changeFormula = _changeFormula;
        $scope.changeSlab = _changeSlab;
        $scope.addTotal = _addTotal;

        $scope.getNetPayable = _getNetPayable;
        $scope.getgross = _getGross;
        $scope.getCTC = _getCTC;

        $scope.saveForm = _saveForm;

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

                }
            }
            _addDependentHeadList();
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
        function _changeSlab(row) {
            console.log(row)
            //isExpanded
        }
        function _changeFormula(row) {
            console.log(row)
            row.entity.PBRIsFormula = !row.entity.PBRIsFormula;

            if (row.entity.PBRIsFormula) {
                _getSubGridOptions(row.entity, row.entity.PBRIsFormula)
                if (row.entity.PBRCalcOnSHId.length > 0) {
                    if (row.entity.PBRCalcOnSHId.length == 1) {
                        $scope.showMsg('warning', 'Select atleat two heads in calculation part.')
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
        }

        $scope.$watch(function () {
            return $scope.entity.PBBasicPerctange;
        }, function (newVal, oldValue) {
            _calculateBasicOnGross();
        })
        $scope.$watch(function () {
            return $scope.entity.PBGrossSalary;
        }, function (newVal, oldValue) {
            _calculateBasicOnGross();
        })

        //calculating basic on gross percentage
        function _calculateBasicOnGross() {
            console.log($scope.entity.PBGrossSalary, $scope.entity.PBBasicPerctange)
            if ($scope.entity.PBBasicPerctange && $scope.entity.PBGrossSalary) {
                if ($scope.entity.PBBasicPerctange == '' && $scope.entity.PBGrossSalary == '') {
                    $scope.payGridOptions.data = [];
                    _getNetPayable();
                    return;
                }
            }
            else {
                $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            var basicPerct = Math.abs(parseFloat($scope.entity.PBBasicPerctange));
            var PBGrossSalary = Math.abs(parseFloat($scope.entity.PBGrossSalary))

            //removing rows from grid if invalid values found
            if (basicPerct <= 0 || PBGrossSalary <= 0) {
                $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            //removing rows from grid if invalid values found
            if (isNaN(PBGrossSalary) || isNaN(basicPerct)) {
                $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            //removing rows from grid if invalid values found
            if (basicPerct > 100) {
                $scope.showMsg('Basic % can not more than 100%')
                $scope.payGridOptions.data = [];
                _getNetPayable();
                return;
            }
            if (!isNaN(PBGrossSalary) && !isNaN(basicPerct)) {
                //finding basic head in dropdown list
                var shBasic = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsBasic')
                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBRSHId, 'True', 'SHIsGross')

                var basicSalary = (basicPerct / 100) * PBGrossSalary
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
            }
            _getNetPayable();
        }

        function _loadController() {


            $timeout(function () {
                pageService.getPagData($scope.rulePage.pageId).then(
                    function (result) {
                        console.log(result)
                        $scope.rulePage = angular.extend({}, $scope.rulePage, result);

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
            cellTemplateCheck += "<a href ng-click=\"grid.appScope.changeFormula(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsSlab\"> <i class=\"fa fa-check-square-o  fa-lg font-green\" aria-hidden=\"true\" ng-show=\"row.entity.PBRIsFormula\" ></i> <i ng-hide=\"row.entity.PBRIsFormula\" class=\"fa fa-square-o fa-lg\" aria-hidden=\"true\"></i></a>";
            cellTemplateCheck += "</div>"

            var cellTemplateSlab = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateSlab += "<a href ng-click=\"grid.appScope.changeSlab(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsFormula\"> <i class=\"fa fa-check-square-o  fa-lg font-green\" aria-hidden=\"true\" ng-show=\"row.entity.PBRIsSlab\" ></i> <i ng-hide=\"row.entity.PBRIsSlab\" class=\"fa fa-square-o fa-lg\" aria-hidden=\"true\"></i></a>";
            cellTemplateSlab += "</div>"

            var cellTemplateOptions = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateOptions += " <a href ng-hide=\"row.entity.PBRIsFormula || row.entity.PBRCalcOnSHId.length==0\" ng-click=grid.appScope.addRuleSlab(row) title=\"Open Slab\"><i class=\"fa fa-level-down\" aria-hidden=\"true\"></i></a>";
            cellTemplateOptions += "</div>"

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
                cellEditableCondition: _cellEditableCondition,
                colIndex: 0
            })

            $scope.payGridOptions.columnDefs.push({
                name: 'SHeadType',
                displayName: 'Head Type',
                width: 80, visible: true, cellFilter: '',
                cellClass: _cellClass,
                cellEditableCondition: false,
                colIndex: 1
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
                cellEditableCondition: _cellEditableCondition,
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
                    cellEditableCondition: _cellEditableCondition,
                    colIndex: 3
                })
            $scope.payGridOptions.columnDefs.push(
                {
                    name: 'GrossPercentage',
                    displayName: 'Gross %',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })
            $scope.payGridOptions.columnDefs.push(
                {
                    name: $scope.rulePage.pageinfo.fields.PBRAmount.name,
                    displayName: $scope.rulePage.pageinfo.fields.PBRAmount.text,
                    width: 90, visible: true, cellFilter: '',
                    cellClass: _cellClass,
                    cellEditableCondition: _cellEditableCondition,
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
        }
        function _addFormulaGridColumns(row) {

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
                    // editableCellTemplate: 'ui-grid/dropdownEditor',
                    // editDropdownIdLabel: 'value',
                    // editDropdownValueLabel: 'name',
                    // editDropdownOptionsArray: [
                    //     { value: '', name: 'None' },
                    //     { value: '+', name: 'Plus' },
                    //     { value: '-', name: 'Minus' }
                    // ]

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
                return 'status-bg YELLOW-300';
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
                        if (!scope.row.entity.PBRIsFormula)
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
                            if (scope.row.entity.PBRSHId == shBasic.value) {
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
                        var headAmt = _getHeadAmount(row.PBRCalcOnSHId[i].value)

                        row.subGridOptions.data.push({
                            PFDId: 0,
                            PFDPBRId: 0,
                            PFDCalcHeadId: [row.PBRCalcOnSHId[i]],
                            PFDPercentage: 100,
                            PFDOperator: '',
                            PFDAmount: headAmt
                        })


                    }
                }
            }
            else {
                if ($scope.slabPage.pageinfo) {

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
                            width: 100, visible: true, cellFilter: ''
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMinCalcOnAmount.text,
                            width: 150, visible: true, cellFilter: '', type: 'decimal'
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
                            width: 150, visible: true, cellFilter: '', type: 'decimal'
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBSMasAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBSMasAmount.text,
                            width: 150, visible: true, cellFilter: '', type: 'decimal'
                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: 'CalculatedAmount',
                            displayName: 'Amount',
                            width: 100, visible: true, cellFilter: '', cellEditableCondition: false
                        })

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
                            if (subGridApi.grid.rows[i].entity.operator == '+') {
                                lastTotal = lastTotal + calcAmt
                            }
                            else if (subGridApi.grid.rows[i].entity.operator == '-') {
                                lastTotal = lastTotal - calcAmt
                            }
                        }
                    }
                    subGridApi.grid.parentRow.entity.PBRAmount = lastTotal;
                }
                else {

                    var calcPercentage = parseFloat(rowEntity.PBSPercentage);

                    if (colDef.name == "PBSMinCalcOnAmount") {

                        var calcMinAmt = Math.round((calcPercentage / 100) * rowEntity.PBSMinCalcOnAmount);
                        if (minPercentage > 0) {
                            rowEntity.PBSMinAmount = calcMinAmt.toFixed(2);
                        }
                    }
                    else if (colDef.name == "PBSMaxCalcOnAmount") {

                        var calcMaxAmt = Math.round((calcPercentage / 100) * rowEntity.PBSMaxCalcOnAmount);
                        if (maxPercentage > 0) {
                            rowEntity.PBSMasAmount = calcMaxAmt.toFixed(2);
                        }
                    }


                    //calculating amount as per slab
                    if (subGridApi.grid.parentRow.entity.PBRCalcOnSHId.length > 0) {
                        //finding dependent heads total
                        var headRows = subGridApi.grid.parentRow.entity.PBRCalcOnSHId;
                        var headAmtTot = 0
                        for (var i = 0; i < headRows.length; i++) {
                            var headAmt = _getHeadAmount(headRows[i].value)
                            headAmtTot += parseFloat(headAmt);
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
                        if (subGridApi.grid.rows.length == 1)
                            subGridApi.grid.parentRow.entity.PBRAmount = Math.round(parseFloat(calculatedAmt)).toFixed(2);
                        else
                            subGridApi.grid.parentRow.entity.PBRAmount = 0;


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
                // console.log(colD ef)
                if (rowEntity.PBRCalcOnSHId.length <= 0) {
                    rowEntity.PBRPercantage = '';
                }

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
                    if (rowEntity.PBRSHId != row.PBRSHId) {
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
                }

                var remainingAmount = grossAmt - totalAmount;

                var dependTotalAmt = 0
                for (var i = 0; i < rowEntity.PBRCalcOnSHId.length; i++) {
                    if (rowEntity.PBRCalcOnSHId[i].value == rowEntity.PBRSHId) {
                        rowEntity.PBRCalcOnSHId = [];
                        $scope.showMsg('warning', 'Head can not depend on to itself')
                        return;
                    }
                    else {
                        var amt = _getHeadAmount(rowEntity.PBRCalcOnSHId[i].value)
                        dependTotalAmt += parseFloat(amt)
                    }
                }

                if (colDef.colIndex == 0) {
                    //find existing in list
                    rowEntity.PBRSHId = oldValue;
                    var existingHead = $filter('findObj')($scope.payGridOptions.data, newValue, 'PBRSHId')
                    if (existingHead != null) {
                        $scope.showMsg('warning', 'Heads can not be duplicate.')
                        rowEntity.PBRSHId = 0;
                    }
                    else {
                        rowEntity.PBRSHId = newValue;
                        var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBRSHId.options, rowEntity.PBRSHId, 'value')
                        if (foundPB != null) {
                            if (foundPB.SHIsForEmployer) {
                                rowEntity.SHeadType = 'Employer';
                            }
                            else if (foundPB.SHIsDeduction == "False") {
                                rowEntity.SHeadType = 'Earning';
                            }
                            else {
                                rowEntity.SHeadType = 'Deduction';
                            }
                        }

                        _addDependentHeadList();
                    }
                }
                else if (colDef.colIndex == 2 || colDef.colIndex == 3) {


                    //calculate amount and Percentage on depend col and percentage

                    //updating amount field as per percentage
                    rowEntity.PBRAmount = Math.round((parseFloat(rowEntity.PBRPercantage) / 100) * dependTotalAmt).toFixed(2);
                    if (isNaN(rowEntity.PBRAmount)) {
                        rowEntity.PBRAmount = 0;
                    }
                    if (remainingAmount < rowEntity.PBRAmount) {
                        $scope.showMsg('error', 'Can not more than 100%')
                        rowEntity.PBRAmount = remainingAmount;
                        rowEntity.PBRPercantage = Math.round(((rowEntity.PBRAmount * 100) / dependTotalAmt)).toFixed(2)
                    }
                    //find gorss % for calculated %
                    //setting gross %
                    if (grossAmt > 0) {
                        rowEntity.GrossPercentage = Math.round((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt, 2).toFixed(2)
                    }
                }
                else if (colDef.colIndex == 4) {
                    if (grossAmt > 0) {
                        //if salary configured based on Gross than remaining must be checked
                        if (newValue > remainingAmount) {
                            $scope.showMsg('error', 'Netpayble can not more than Gross')
                            rowEntity.PBRAmount = remainingAmount.toFixed(2)
                        }
                        else {
                            rowEntity.PBRAmount = parseFloat(newValue).toFixed(2);
                        }
                        //avoiding 
                        var expectedPer = Math.round(parseFloat((rowEntity.PBRAmount * 100)) / grossAmt, 2)
                        var expected1 = Math.round((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt, 2)
                        var expected2 = (parseFloat(rowEntity.PBRAmount) * 100) / grossAmt
                        var expected3 = expected2.toPrecision(2)
                        var expected2 = ((rowEntity.PBRAmount * 100) / grossAmt).toPrecision(2);

                        if (dependTotalAmt > 0) {
                            expectedPer = Math.round((rowEntity.PBRAmount * 100) / dependTotalAmt, 2)
                            if (expectedPer > 100) {
                                rowEntity.PBRPercantage = 100.00;
                                rowEntity.PBRAmount = Math.round(dependTotalAmt).toFixed(2);
                            }
                            else {
                                rowEntity.PBRPercantage = Math.round(expectedPer, 2).toFixed(2);
                            }
                        }
                        else
                            //updating % field as per amount
                            if (rowEntity.PBRPercantage) {
                                if (rowEntity.PBRPercantage > 0) {
                                    rowEntity.PBRPercantage = expectedPer;
                                }
                            }

                        rowEntity.GrossPercentage = Math.round((parseFloat(rowEntity.PBRAmount) * 100) / grossAmt, 2).toFixed(2)
                    }
                }



                //SHeadType
                if (colDef.name = 'PBRIsFormula') {
                    _getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                }
                else if (colDef.name = 'PBRCalcOnSHId') {

                    //_getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                }
                else if (colDef.name = 'PBRPercantage') {
                    //removing unwanted percentage value if no dependences attached


                    //_getSubGridOptions(rowEntity, rowEntity.PBRIsFormula)
                }

                $scope.netPayableAmount = _getNetPayable();
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
                            $scope.salary.earningAmt += parseFloat($scope.payGridOptions.data[i].PBRAmount);
                            totAmt += parseFloat($scope.payGridOptions.data[i].PBRAmount)
                        }
                        else if ($scope.payGridOptions.data[i].SHeadType == 'Deduction') {
                            $scope.salary.deductionAmt += parseFloat($scope.payGridOptions.data[i].PBRAmount);
                            totAmt -= parseFloat($scope.payGridOptions.data[i].PBRAmount)
                        }
                        else {
                            $scope.salary.employerAmt += parseFloat($scope.payGridOptions.data[i].PBRAmount);
                        }
                    }
                }
            }

            if ($scope.salary.grossAmt == 0) {
                $scope.salary.grossAmt = $scope.salary.earningAmt;
            }
            $scope.salary.netPayableAmt = $scope.salary.earningAmt - $scope.salary.deductionAmt;
            $scope.salary.ctcAmt = $scope.salary.earningAmt + $scope.salary.employerAmt;
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
                console.log(result)
            }, function (err) {
                console.log(err)
            })
            console.log($scope.multiEntity)
        }
        _loadController();
    }
})();
