/**
 * @author pardeep.pandit
 * created on 08.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.masters.paybandtemplate')
        .controller('paybandTempController', paybandTempController);

    /** @ngInject */
    function paybandTempController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, $timeout, $filter, $http) {

        /**local variable declaration */

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
        $scope.entity = {};
        $scope.rulePage = {};
        $scope.slabPage = {};
        $scope.toggleExpandOnAdd = false;
        $scope.edit = false;

        /**end of local variable declaration */



        /**private function  */

        $scope.closeForm = _closeForm;
        $scope.addNewRule = _addNewRule;
        $scope.addToltalEarningDeductionRule = _addToltalEarningDeductionRule;
        $scope.changeFormula = _changeFormula;
        $scope.changeSlab = _changeSlab;
        $scope.toggleRowExpand = _toggleRowExpand;
        $scope.removeRuleSlab = _removeRuleSlab;
        $scope.saveForm = _saveForm;

        /**end of private function  */

        /**default grid intialization*/
        $scope.rulePage;
        $scope.page = $scope.createPage();
        $scope.page.pageId = $scope.paybandTemp.PageId;
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
        /**end of bdefault grid intialization*/

        /**custom grid intialization for paybandtempalte*/
        $scope.payTempGridOptions = {
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
            //gridFooterTemplate: ''
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }

        /**end of custom grid intialization for paybandtempalte*/



        /** pageload function */
        function _loadController() {

            $timeout(function () {
                pageService.getPagData($scope.paybandTemp.RulePageId).then(function (result) {
                    console.log(result)
                    $scope.rulePage = angular.extend({}, $scope.rulePage, result);
                    // $scope.differenceHeadList = $scope.rulePage.pageinfo.fields.PBTRSHId.options;
                    if ($scope.isDependListToBeUpdate) {
                        _addDependentHeadList();
                    }
                    _addRuleGridColumns();
                }, function (err) {
                })
                pageService.getPagData($scope.paybandTemp.SlabPageId).then(
                    function (result) {
                        console.log(result)
                        $scope.slabPage = angular.extend({}, $scope.slabPage, result);
                    }, function (err) {

                    })
            })
        }
        /**end of pageload function */

        /**default grid promise */

        function _pageResult(result) {

        }
        /**end of default grid promise */


        /**default grid add function */

        function _addRecord(result) {
            $scope.edit = false;
            $scope.action = 'create';
            $scope.page.showEditForm = true;
            $scope.payTempGridOptions.data = [];
            $scope.entity.PBTName = '';
        }
        /**end of default grid add function */


        /**default grid edit function */
        function _editRecord(row) {
            console.log($scope.rulePage.pageinfo.fields.PBTRSHId.options);
            $scope.edit = true;
            $scope.page.showEditForm = true;
            $scope.entity = angular.copy(row.entity);
            $scope.page.isAllowEdit = true;
            if ($scope.entity.PBTId !== undefined) {
                $timeout(function () {
                    var multiData = {
                        lz: false,
                        parent: {
                            tableid: $scope.page.pageinfo.tableid,
                            pkValue: $scope.entity.PBTId
                        }, child: [
                            {
                                tableid: $scope.rulePage.pageinfo.tableid,
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
                                        tableid: $scope.slabPage.pageinfo.tableid,
                                        linkColumn: 'PBTSPBTRId',
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



        /**end of default grid edit function */


        function _getMultiEntitySuccess(result) {
            $scope.entity = result;
            $scope.payTempGridOptions.data = [];
            if (result.child) {
                if (result.child[0].rows) {
                    //    var grossAmt = parseFloat(result.PBGrossSalary);

                    for (var i = 0; i < result.child[0].rows.length; i++) {
                        var row = result.child[0].rows[i];

                        // row.PBRAmount = parseFloat(row.PBRAmount).toFixed(2);
                        //find head type
                        var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRSHId.options, row.PBTRSHId, 'value')
                        if (foundPB != null) {
                            if (foundPB.SHIsTotal == "True") {
                                row.SHeadType = 'Total';
                            }
                            else {
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
                        }
                        row.PBTRPercentage = row.PBTRPercentage == 0.00 ? '' : row.PBTRPercentage;
                        row.PBTRCalcOnSHId = row.PBTRCalcOnSHId.replace('[', '').replace(']', '')
                        if (row.PBTRCalcOnSHId != '') {
                            var dependHeadList = row.PBTRCalcOnSHId.split(',');
                            var selectedHeadList = [];
                            for (var h = 0; h < dependHeadList.length; h++) {
                                var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, dependHeadList[h], 'value')
                                if (shead != null) {
                                    selectedHeadList.push(shead)
                                }
                            }
                            row.PBTRCalcOnSHId = selectedHeadList;
                        }


                        if (row.child) {
                            if (row.child.length > 0) {
                                for (var c = 0; c < row.child.length; c++) {
                                    var child = row.child[c];
                                    if (child.rows) {
                                        if (child.rows.length > 0) {
                                            if (child.tableid == $scope.paybandTemp.SlabTableId) {//slab table
                                                _getSubGridOptions(row, false);
                                            }
                                            else if (child.tableid == $scope.paybandTemp.FormulaTableId) {//formula table

                                                angular.forEach(child.rows, function (formula) {

                                                    formula.PFTDCalcHeadId = formula.PFTDCalcHeadId.replace('[', '').replace(']', '')
                                                    if (formula.PFTDCalcHeadId != '') {
                                                        var dependHeadList = formula.PFTDCalcHeadId.split(',');
                                                        var selectedHeadList = [];
                                                        for (var h = 0; h < dependHeadList.length; h++) {
                                                            var shead = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, dependHeadList[h], 'value')
                                                            if (shead != null) {
                                                                selectedHeadList.push(shead)
                                                            }
                                                        }
                                                        formula.PFTDCalcHeadId = selectedHeadList;
                                                        formula.PFTDPercentage = formula.PFTDPercentage == 0 ? '' : formula.PFTDPercentage
                                                    }

                                                })
                                                _getSubGridOptions(row, true, result.child[0].rows);
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
                    $scope.payTempGridOptions.data = result.child[0].rows;
                }
            }
            _getNetPayable();
            _addDependentHeadList();
        }
        function _getMultiEntityError(err) {
            console.log(err)
        }

        /**default grid close function */

        function _closeForm(form) {
            $scope.page.showEditForm = false;
            $scope.entity = {};
        }

        /**end of default grid close function */


        function _addRuleGridColumns() {
            var cellTemplateCheck = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateCheck += "<a href ng-click=\"grid.appScope.changeFormula(row)\" ng-show=\"row.entity.PBTRCalcOnSHId.length>0 && !row.entity.PBTRIsSlab && row.entity.PBTRPercentage=='' \"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBTRIsFormula, 'fa-square-o': !row.entity.PBTRIsFormula }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateCheck += "</div>"

            var cellTemplateSlab = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateSlab += "<a href ng-click=\"grid.appScope.changeSlab(row)\" ng-show=\"row.entity.PBTRCalcOnSHId.length>0 && !row.entity.PBTRIsFormula && row.entity.PBTRPercentage=='' \"> <i class=\"fa  font-green\"  ng-class=\"{'fa-check-square-o': row.entity.PBTRIsSlab, 'fa-square-o': !row.entity.PBTRIsSlab }\"  aria-hidden=\"true\"></i></a>";
            cellTemplateSlab += "</div>"

            var cellTemplateRowExpand = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRowExpand += '<a href ng-click=\"grid.appScope.toggleRowExpand(row)\" ng-show=\"row.entity.PBTRCalcOnSHId.length>0 && (row.entity.PBTRIsFormula || row.entity.PBTRIsSlab) \"  title="Expand/ Collapse Row" ><i class="fa " ng-class=\"{\'fa-plus\':!row.isExpanded, \'fa-minus\':row.isExpanded}\" aria-hidden="true"></i></a>'
            cellTemplateRowExpand += "</div>"

            var cellTemplateRemove = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRemove += " <a href ng-click=grid.appScope.removeRuleSlab(row) title=\"Remove Rule\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i></a>";
            cellTemplateRemove += "</div>"

            $scope.payTempGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBTRSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBTRSHId.text, width: 170, visible: true,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownIdLabel: 'value',
                editDropdownValueLabel: 'name',
                editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBTRSHId.options,
                cellFilter: "mapDropdown:grid.appScope.rulePage.pageinfo.fields.PBTRSHId.options:'value':'name'",
                cellClass: _cellClass,
                cellEditableCondition: _cellEditableCondition,
                colIndex: 0
            })

            $scope.payTempGridOptions.columnDefs.push({
                name: 'SHeadType',
                displayName: 'Head Type',
                width: 80, visible: true, cellFilter: '',
                cellClass: _cellClass,
                cellEditableCondition: false,
                colIndex: 1
            })

            $scope.payTempGridOptions.columnDefs.push({
                name: $scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.name,
                displayName: $scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.text,
                width: 230, visible: true,
                editableCellTemplate: 'uiSelectMulti',
                // editDropdownIdLabel: 'value',
                // editDropdownValueLabel: 'name',
                // editDropdownOptionsArray: $scope.payTempGridOptions.data,
                cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options:'value':'name'",
                cellClass: _cellClass,
                cellEditableCondition: _cellEditableCondition,
                colIndex: 2

            })

            // editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options,
            // cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options:'value':'name'",

            $scope.payTempGridOptions.columnDefs.push(
                {
                    name: 'PBTRPercentage',
                    displayName: '%',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: _cellEditableCondition,
                    colIndex: 3,
                    // cellTemplate: '<div ng-show="(row.entity.PBTRCalcOnSHId.length > 0) && (!scope.row.entity.PBTRIsFormula && !scope.row.entity.PBTRIsSlab)" class="ui-grid-cell-contents ng-binding ng-scope"><div class="ngCellText"><input type="text" class="form-control" ng-model="row.entity.PBTRPercentage"/></div></div></div>'
                })

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateCheck,
                    name: 'PBTRIsFormula',
                    displayName: 'Formula',
                    type: 'boolean',
                    width: 75, visible: true, cellFilter: '',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 5
                })

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateSlab,
                    name: 'PBTRIsSlab',
                    displayName: 'Slab',
                    width: 45, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 6
                })

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRemove,
                    name: 'ruleRemove',
                    displayName: 'Re Move',
                    width: 50, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 7
                })

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRowExpand,
                    name: 'rowExpand',
                    displayName: '-',
                    width: 50, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })
        }


        function _cellClass(grid, row, col, rowRenderIndex, colRenderIndex) {

            if (row.entity.PBTRSHId == -1) {
                return 'YELLOW-300 status-bg cell-border-right';
            }
            else if (row.entity.PBTRSHId > 0) {
                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsGross')
                var shTotalEarning = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsTotalEarning')
                var shTotalDeduction = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsTotalDeduction')
                var shNetPay = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsNetPay')
                if (shGross != null) {
                    if (row.entity.PBTRSHId == shGross.value) {
                        return 'status-bg ORANGE-500'
                    }
                }
                if (shTotalEarning != null) {
                    if (row.entity.PBTRSHId == shTotalEarning.value) {
                        return 'status-bg PURPLE-500'
                    }
                }
                if (shTotalDeduction != null) {
                    if (row.entity.PBTRSHId == shTotalDeduction.value) {
                        return 'status-bg GREEN-500'
                    }
                }
                if (shNetPay != null) {
                    if (row.entity.PBTRSHId == shNetPay.value) {
                        return 'status-bg BLUE-300'
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

            if (scope.col.name == "PBTRSHId") {
                if (scope.row.entity.SHIsTotalEarning == "True" || scope.row.entity.SHIsTotalDeduction == "True") {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (scope.col.name == "PBTRPercentage") {
                if (scope.row.entity.SHIsTotalEarning == "True" || scope.row.entity.SHIsTotalDeduction == "True") {
                    return false;
                }
                else {
                    if (scope.row.entity.PBTRCalcOnSHId) {
                        if (scope.row.entity.PBTRCalcOnSHId.length > 0) {
                            if (scope.row.entity.PBTRIsFormula) {
                                return true;
                            }

                            else if (!scope.row.entity.PBTRIsFormula && !scope.row.entity.PBTRIsSlab) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
            else if (scope.col.name == "PBTRCalcOnSHId") {
                if (scope.row.entity.SHIsTotalEarning == "True" || scope.row.entity.SHIsTotalDeduction == "True") {
                    return false;
                }
                else {
                    return true;
                }
            }

            else if (scope.col.name == "PBTRIsFormula") {
                if (scope.row.entity.SHIsTotalEarning == "True" || scope.row.entity.SHIsTotalDeduction == "True") {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (scope.row.entity.PBTRSHId) {

                return true;
            }
            else {
                return false;
            }
            return true;
        }

        function _addToltalEarningDeductionRule(headId) {
            var headExist = $filter("findObj")($scope.payTempGridOptions.data, headId, "PBTRSHId")
            if (headExist == null) {
                $scope.toggleExpandOnAdd = true;
                if ($scope.payTempGridOptions.data.length > 0) {
                    var lastRow = $scope.payTempGridOptions.data[$scope.payTempGridOptions.data.length - 1];
                    if (lastRow.PBTRSHId) {
                        var PBTRCalcOnSHId = [];
                        var SHIsTotalEarning = "";
                        var SHIsTotalDeduction = "";
                        var headTotal = $filter("findObj")($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, headId, "value")
                        if (headTotal != null) {
                            if (headTotal.SHIsTotalEarning == "True") {

                                var earningHeads = $filter("findAll")($scope.payTempGridOptions.data, "Earning", "SHeadType")
                                if (earningHeads != null) {
                                    SHIsTotalEarning = headTotal.SHIsTotalEarning;
                                    for (var eh = 0; eh < earningHeads.length; eh++) {
                                        var earningHead = earningHeads[eh];
                                        var eHeads = $filter("findObj")($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, earningHead.PBTRSHId, "value")
                                        if (eHeads != null) {

                                            PBTRCalcOnSHId.push({ value: eHeads.value, name: eHeads.name, SHeadType: eHeads.SHType })
                                        }
                                    }
                                }
                                else {
                                    $scope.toggleExpandOnAdd = false;
                                    $scope.showMsg("warning", "Please add earning type first")
                                    return
                                }
                            }
                            else if (headTotal.SHIsTotalDeduction == "True") {
                                var deductionHeads = $filter("findAll")($scope.payTempGridOptions.data, "Deduction", "SHeadType")
                                if (deductionHeads != null) {
                                    SHIsTotalDeduction = headTotal.SHIsTotalDeduction;
                                    var PBTRCalcOnSHId = [];
                                    for (var dh = 0; dh < deductionHeads.length; dh++) {
                                        var deductionHead = deductionHeads[dh];
                                        var dHeads = $filter("findObj")($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, deductionHead.PBTRSHId, "value")
                                        if (dHeads != null) {
                                            PBTRCalcOnSHId.push({ value: dHeads.value, name: dHeads.name, SHeadType: dHeads.SHType })
                                        }
                                    }
                                }
                                else {
                                    $scope.toggleExpandOnAdd = false;
                                    $scope.showMsg("warning", "Please add deduction type first")
                                    return
                                }
                            }
                            else if (headTotal.SHIsGross == "True" || headTotal.SHIsNetPay == "True") {
                                for (var edh = 0; edh < $scope.payTempGridOptions.data.length; edh++) {
                                    var earDecheads = $scope.payTempGridOptions.data[edh];
                                    if (earDecheads.SHeadType != "Total") {
                                        var earDecShId = $filter("findObj")($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, earDecheads.PBTRSHId, "value")
                                        if (earDecShId != null) {
                                            PBTRCalcOnSHId.push({ value: earDecShId.value, name: earDecShId.name, SHeadType: earDecShId.SHType })
                                        }
                                    }
                                }
                            }
                            _addRuleGridRow(0, true, false, '', 0, 0, headId, '', 'Total', '', PBTRCalcOnSHId, SHIsTotalEarning, SHIsTotalDeduction);
                        }
                    }

                }
                else {
                    var heads = $filter("findObj")($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, headId, "value")
                    if (heads != null) {
                        if (heads.SHIsNetPay == "True" || heads.SHIsGross == "True") {
                            _addRuleGridRow(0, true, false, '', 0, 0, headId, '', 'Total', '', '', '', '');
                        }
                        else {
                            $scope.toggleExpandOnAdd = false;
                            $scope.showMsg("warning", "Please add earing heads");
                        }
                    }
                }
            }
            else {
                $scope.showMsg("error", "This Head already exist");
            }

        }


        //adding new row to rule grid
        function _addNewRule(row) {
            if ($scope.payTempGridOptions.data.length > 0) {
                var lastRow = $scope.payTempGridOptions.data[$scope.payTempGridOptions.data.length - 1];
                if (lastRow.PBTRSHId) {

                    _addRuleGridRow(0, false, false, '', 0, 0, 0, '', '', '', '', 0);

                }
            }
            else {
                _addRuleGridRow(0, false, false, '', 0, 0, 0, '', '', '', '', 0);
            }
        }

        function _addRuleGridRow(PBTRId, PBTRIsFormula, PBTRIsSlab, PBTRPercentage, PBSId, PBRPBId, PBTRSHId, SHName, SHeadType, PBRRuleName, PBTRCalcOnSHId, SHIsTotalEarning, SHIsTotalDeduction) {

            $scope.payTempGridOptions.data.push({
                PBTRId: PBTRId,
                PBTRIsFormula: PBTRIsFormula,
                PBTRIsSlab: PBTRIsSlab,
                PBTRPercentage: PBTRPercentage,
                PBSId: PBSId,
                PBRPBId: PBRPBId,
                PBTRSHId: PBTRSHId,
                SHName: SHName,
                SHeadType: SHeadType,
                PBRRuleName: PBRRuleName,
                PBTRCalcOnSHId: PBTRCalcOnSHId,
                SHIsTotalEarning: SHIsTotalEarning,
                SHIsTotalDeduction: SHIsTotalDeduction

            })

        }


        function _onRegisterApi(gridApi) {
            $scope.rulePage.gridApi = gridApi;
            $scope.rulePage.gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                    if (row.entity.PBTRCalcOnSHId.length == 0) {
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

                if (rowEntity.PBTRCalcOnSHId.length <= 0) {
                    rowEntity.PBTRPercentage = '';
                }

                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsGross')
                var shBasic = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsBasic')


                var grossId = 0;
                if (shGross != null) {
                    grossId = shGross.value;
                }
                var isBasicOrGrossOnRightRow = true;
                //WILL BE USED ONCE REQUIRED
                // if (shBasic != null || shGross != null) {
                //     if (shBasic.value == newValue || shGross.value == newValue) {
                //         isBasicOrGrossOnRightRow = true;
                //     }
                //     else {
                //         if ($scope.payTempGridOptions.data.length == 2) {
                //             if (($scope.payTempGridOptions.data[0].PBTRSHId == shBasic.value || $scope.payTempGridOptions.data[1].PBTRSHId == shBasic.value) && ($scope.payTempGridOptions.data[0].PBTRSHId == shGross.value || $scope.payTempGridOptions.data[1].PBTRSHId == shGross.value)) {
                //                 isBasicOrGrossOnRightRow = true;
                //             }
                //             else {
                //                 isBasicOrGrossOnRightRow = false;
                //                 rowEntity.PBTRSHId = '';
                //                 rowEntity.SHeadType = '';
                //                 $scope.showMsg("warning", "you can place gross or basic head in first or second row")
                //             }
                //         }
                //         else if ($scope.payTempGridOptions.data[0].PBTRSHId == shBasic.value || $scope.payTempGridOptions.data[0].PBTRSHId == shGross.value) {
                //             isBasicOrGrossOnRightRow = true;
                //         }
                //         else {
                //             isBasicOrGrossOnRightRow = false;
                //             rowEntity.PBTRSHId = '';
                //             rowEntity.SHeadType = '';
                //             $scope.showMsg("warning", "you can place gross or basic head in first or second row")
                //         }
                //     }
                // }

                if (isBasicOrGrossOnRightRow) {

                    var totalAmount = 0;
                    var deductionTotal = 0;
                    var employerTotal = 0;
                    var grossAmt = 0;
                    for (var c = 0; c < $scope.payTempGridOptions.data.length; c++) {
                        var row = $scope.payTempGridOptions.data[c];
                        if (rowEntity.PBTRSHId != row.PBTRSHId) {
                            if (grossId != row.PBTRSHId && row.SHeadType == 'Earning') {
                                totalAmount += Math.round(row.PBTRAmount);
                            }
                            else if (grossId != row.PBTRSHId && row.SHeadType == 'Deduction') {
                                deductionTotal += Math.round(row.PBTRAmount);
                            }
                            else if (grossId != row.PBTRSHId && row.SHeadType == 'Employer') {
                                employerTotal += Math.round(row.PBTRAmount);
                            }
                            else {
                                grossAmt += Math.round(row.PBTRAmount);
                            }
                        }
                    }

                    var remainingAmount = grossAmt - totalAmount;
                    var deductionRemainingAmount = grossAmt - deductionTotal;

                    var dependTotalAmt = 0

                    for (var i = 0; i < rowEntity.PBTRCalcOnSHId.length; i++) {
                        if (rowEntity.PBTRCalcOnSHId[i].value == rowEntity.PBTRSHId) {
                            rowEntity.PBTRCalcOnSHId = [];
                            $scope.showMsg('warning', 'Head can not depend on to itself')
                            return;
                        }
                        else {
                            var amt = _getHeadAmount(rowEntity.PBTRCalcOnSHId[i].value)
                            dependTotalAmt += parseFloat(amt)
                            //finding dependent head used ppercentage on entire data


                        }
                    }

                    if (colDef.colIndex == 0) {
                        //find existing in list                      
                        rowEntity.PBTRSHId = oldValue;
                        var checkDeductionHead = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, newValue, 'value')
                        if (checkDeductionHead != null) {
                            if (checkDeductionHead.SHType == "Deduction") {
                                if ($scope.payTempGridOptions.data.length == 1) {
                                    $scope.showMsg('warning', 'You can add earning head first.')
                                    rowEntity.PBTRSHId = 0;
                                    rowEntity.SHeadType = '';
                                    return
                                }
                            }
                        }
                        var existingTotalEarningHead = $filter("findObj")($scope.payTempGridOptions.data, 'True', "SHIsTotalEarning");
                        var existingTotalDeductionHead = $filter("findObj")($scope.payTempGridOptions.data, 'True', "SHIsTotalDeduction");
                        if (existingTotalEarningHead != null || existingTotalDeductionHead != null) {
                            var exitHead = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, newValue, 'value')
                            if (exitHead != null) {
                                if (exitHead.SHType == "Earning" && existingTotalEarningHead != null) {
                                    $scope.showMsg('warning', 'You can not add earning head beacause Total Earning head already exist. If you want to add earning head type then delete the total earning head.')
                                    rowEntity.PBTRSHId = 0;
                                    rowEntity.SHeadType = '';
                                    return
                                }
                                if (exitHead.SHType == "Deduction" && existingTotalDeductionHead != null) {
                                    $scope.showMsg('warning', 'You can not add deduction head beacause Total Deduction head already exist. If you want to add deduction head type then delete the total deduction head.')
                                    rowEntity.PBTRSHId = 0;
                                    rowEntity.SHeadType = '';
                                    return
                                }
                            }
                        }
                        var existingHead = $filter('findObj')($scope.payTempGridOptions.data, newValue, 'PBTRSHId')
                        if (existingHead != null) {
                            $scope.showMsg('warning', 'Heads can not be duplicate.')
                            rowEntity.PBTRSHId = 0;
                            rowEntity.SHeadType = '';

                        }
                        else {
                            rowEntity.PBTRSHId = newValue;
                            console.log($scope.rulePage.pageinfo.fields.PBTRSHId.options)
                            var foundPB = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRSHId.options, rowEntity.PBTRSHId, 'value')
                            if (foundPB != null) {
                                if (foundPB.SHIsTotal == "True") {
                                    rowEntity.SHeadType = 'Total';
                                }
                                else {
                                    if (foundPB.SHIsForEmployer == "True") {
                                        rowEntity.SHeadType = 'Employer';
                                    }

                                    else if (foundPB.SHIsDeduction == "False") {


                                        // if ((grossAmt > 0 && remainingAmount > 0) || (grossAmt <= 0)) {

                                        rowEntity.SHeadType = 'Earning';
                                        // }
                                        // else {
                                        //     rowEntity.PBTRSHId = 0;
                                        //     $scope.showMsg('warning', 'Earnings already match with Gross amount')
                                        // }

                                    }
                                    else {
                                        rowEntity.SHeadType = 'Deduction';
                                    }
                                }
                            }
                            _getDifferenceHeadList();
                            _addDependentHeadList();
                            // _addSalaryHeadList();
                        }
                    }
                    else if (colDef.colIndex == 2 || colDef.colIndex == 3) {

                        var inputPer = parseFloat(rowEntity.PBTRPercentage);
                        if (isNaN(inputPer)) {
                            rowEntity.PBTRPercentage = '';
                            return
                        }
                        else if (inputPer > 100) {
                            rowEntity.PBTRPercentage = '';
                            return
                        }
                        //find dependent head remaining percentage


                        //calculate amount and Percentage on depend col and percentage

                        //updating amount field as per percentage
                        rowEntity.PBTRAmount = Math.round((parseFloat(rowEntity.PBTRPercentage) / 100) * dependTotalAmt).toFixed(2);
                        if (isNaN(rowEntity.PBTRAmount)) {
                            rowEntity.PBRAmount = 0;
                        }
                        if (grossAmt > 0 && remainingAmount <= 0 && rowEntity.SHeadType == 'Earning') {
                            rowEntity.PBTRAmount = 0;
                            rowEntity.PBTRPercentage = 0;
                            rowEntity.GrossPercentage = 0;
                            $scope.showMsg('warning', 'Earnings already match with Gross amount')
                        }
                        else if (deductionRemainingAmount <= 0 && rowEntity.SHeadType == 'Deduction') {
                            rowEntity.PBTRAmount = 0;
                            rowEntity.PBTRPercentage = 0;
                            rowEntity.GrossPercentage = 0;
                            $scope.showMsg('warning', 'Deductions can not more than earnings')
                        }
                        else {
                            if (grossAmt > 0 && remainingAmount < rowEntity.PBRAmount && rowEntity.SHeadType == 'Earning') {
                                rowEntity.PBTRAmount = remainingAmount;
                                rowEntity.PBTRPercentage = ((rowEntity.PBRAmount * 100) / dependTotalAmt).toFixed(2)
                            }
                            else if (rowEntity.SHeadType == 'Deduction') {
                                if ((deductionTotal + parseFloat(rowEntity.PBTRAmount)) > totalAmount) {
                                    rowEntity.PBTRAmount = 0;
                                    rowEntity.PBTRPercentage = 0;
                                    rowEntity.GrossPercentage = 0;
                                    $scope.showMsg('warning', 'Deductions can not more than earnings')
                                }
                            }
                            //find gorss % for calculated %
                            //setting gross %
                            if (grossAmt > 0) {
                                rowEntity.GrossPercentage = ((parseFloat(rowEntity.PBTRAmount) * 100) / grossAmt).toFixed(2)
                            }
                        }
                    }
                    else if (colDef.colIndex == 4) {

                        //if salary configured based on Gross than remaining must be checked
                        if ((grossAmt > 0) && newValue > remainingAmount && rowEntity.SHeadType == 'Earning') {
                            $scope.showMsg('error', 'Netpayble can not more than Gross')
                            rowEntity.PBTRAmount = remainingAmount.toFixed(2)
                        }
                        else if ((grossAmt > 0) && newValue > deductionRemainingAmount && rowEntity.SHeadType == 'Deduction') {
                            $scope.showMsg('error', 'Deductions can not more than Earnings')
                            rowEntity.PBTRAmount = deductionRemainingAmount.toFixed(2)
                        }
                        else {
                            rowEntity.PBTRAmount = parseFloat(newValue).toFixed(2);
                        }
                        //avoiding 
                        if (rowEntity.PBTRIsSlab || rowEntity.PBTRIsFormula) {

                        }
                        else {
                            var expectedPer = Math.round(parseFloat((rowEntity.PBTRAmount * 100)) / grossAmt, 2)

                            if (dependTotalAmt > 0) {
                                expectedPer = (rowEntity.PBTRAmount * 100) / dependTotalAmt;
                                if (expectedPer > 100) {
                                    rowEntity.PBTRPercentage = 100.00;
                                    rowEntity.PBTRAmount = Math.round(dependTotalAmt).toFixed(2);
                                }
                                else {
                                    rowEntity.PBTRPercentage = expectedPer.toFixed(2);
                                    rowEntity.PBTRAmount = Math.round(newValue).toFixed(2);
                                }
                            }
                            else
                                //updating % field as per amount
                                if (rowEntity.PBTRPercentage) {
                                    if (rowEntity.PBTRPercentage > 0) {
                                        rowEntity.PBTRPercentage = expectedPer.toFixed(2);
                                    }
                                }
                        }
                        if (grossAmt > 0)
                            rowEntity.GrossPercentage = ((parseFloat(rowEntity.PBTRAmount) * 100) / grossAmt).toFixed(2)
                        else
                            rowEntity.GrossPercentage = '-';
                    }



                    //SHeadType
                    // if (colDef.name = 'PBTRIsFormula') {
                    //     _getSubGridOptions(rowEntity, rowEntity.PBTRIsFormula)
                    // }
                    // else if (colDef.name = 'PBTRCalcOnSHId') {

                    //     //_getSubGridOptions(rowEntity, rowEntity.PBTRIsFormula)
                    // }
                    // else if (colDef.name = 'PBTRPercentage') {
                    //     //removing unwanted percentage value if no dependences attached


                    //     //_getSubGridOptions(rowEntity, rowEntity.PBTRIsFormula)
                    // }

                    $scope.netPayableAmount = _getNetPayable();
                }
            });


        }

        function _getDifferenceHeadList() {
            $scope.differenceHeadList = []// angular.copy($scope.rulePage.pageinfo.fields.PBTRSHId.options);

            for (var i = 0; i < $scope.rulePage.pageinfo.fields.PBTRSHId.options.length; i++) {
                var opt = $scope.rulePage.pageinfo.fields.PBTRSHId.options[i]
                var shHead = $filter('findObj')($scope.payTempGridOptions.data, opt.value, 'PBTRSHId')
                if (shHead == null) {
                    $scope.differenceHeadList.push(opt)
                }
            }
        }
        function _addDependentHeadList() {

            var isListUpdate = false;
            if ($scope.rulePage) {
                if ($scope.rulePage.pageinfo) {
                    if ($scope.rulePage.pageinfo.fields) {


                        //update dependent dropdown
                        var dependList = [];
                        for (var v = 0; v < $scope.payTempGridOptions.data.length; v++) {
                            var shead = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRSHId.options, $scope.payTempGridOptions.data[v].PBTRSHId, 'value')
                            if (shead != null) {
                                dependList.push(shead);
                            }
                        }

                        $scope.payTempGridOptions.columnDefs[2].editDropdownOptionsArray = dependList;
                        isListUpdate = true;
                    }
                }
            }
            if (!isListUpdate) {
                $scope.isDependListToBeUpdate = true;
            }
        }

        function _getNetPayable() {

            $scope.salary = { grossAmt: 0, earningAmt: 0, deductionAmt: 0, netPayableAmt: 0, employerAmt: 0, ctcAmt: 0 }

            if ($scope.payTempGridOptions.data.length) {

                var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsGross')
                var grossId = 0;
                if (shGross != null) {
                    grossId = shGross.value;
                }
                var totAmt = 0;
                for (var i = 0; i < $scope.payTempGridOptions.data.length; i++) {
                    if (grossId == $scope.payTempGridOptions.data[i].PBTRSHId) {
                        $scope.salary.grossAmt = $scope.payTempGridOptions.data[i].PBTRAmount;
                    }
                    else if (grossId != $scope.payTempGridOptions.data[i].PBTRSHId && $scope.payTempGridOptions.data[i].PBTRSHId > 0) {
                        if ($scope.payTempGridOptions.data[i].SHeadType == 'Earning') {
                            $scope.salary.earningAmt += Math.round(parseFloat($scope.payTempGridOptions.data[i].PBTRAmount));
                            totAmt += Math.round(parseFloat($scope.payTempGridOptions.data[i].PBTRAmount));
                        }
                        else if ($scope.payTempGridOptions.data[i].SHeadType == 'Deduction') {
                            $scope.salary.deductionAmt += Math.round(parseFloat($scope.payTempGridOptions.data[i].PBTRAmount));
                            totAmt -= Math.round(parseFloat($scope.payTempGridOptions.data[i].PBTRAmount))
                        }
                        else {
                            $scope.salary.employerAmt += Math.round(parseFloat($scope.payTempGridOptions.data[i].PBTRAmount));
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

        function _getHeadAmount(headId, entitlement) {

            if (entitlement != undefined) {
                $scope.payTempGridOptions.data = angular.copy(entitlement)
            }
            var totalAmt = 0;
            if ($scope.payTempGridOptions.data.length > 0) {
                var salaryHead = $filter('findObj')($scope.payTempGridOptions.data, headId, $scope.rulePage.pageinfo.fields.PBTRSHId.name)
                if (salaryHead != null) {
                    if (salaryHead.PBTRCalcOnSHId.length <= 0) {
                        return salaryHead.PBTRAmount;
                    }
                    else {

                        for (var i = 0; i < salaryHead.PBTRCalcOnSHId.length; i++) {
                            var shId = salaryHead.PBTRCalcOnSHId[i].value;
                            var shAmt = _getHeadAmount(shId, entitlement)
                            if (salaryHead.PBTRPercentage) {
                                totalAmt += (salaryHead.PBTRPercentage / 100) * shAmt
                            }
                        }
                    }
                }
            }
            return totalAmt;
        }

        function _calculateSlabAmount() {

        }
        function _changeFormula(row) {

            row.entity.PBTRIsFormula = !row.entity.PBTRIsFormula;

            if (row.entity.PBTRIsFormula) {
                _getSubGridOptions(row.entity, row.entity.PBTRIsFormula)
                if (row.entity.PBTRCalcOnSHId.length > 0) {
                    if (row.entity.PBTRCalcOnSHId.length == 0) {
                        $scope.showMsg('warning', 'Select atleast one heads in calculation part.')
                        row.entity.PBTRIsFormula = false;
                    }
                    else {
                        // row.entity.PBTRPercentage = '';
                        if (!row.isExpanded)
                            $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                    }
                }
                else {
                    row.entity.subGridOptions = { data: [], columnDefs: [] };
                    row.entity.PBTRIsFormula = false;
                }
            }
            else {
                // row.entity.PBTRPercentage = '';
                if (row.isExpanded) {
                    row.entity.subGridOptions = { data: [], columnDefs: [] };
                    $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                }
            }
        }

        function _changeSlab(row) {
            console.log(row)
            //isExpanded
            row.entity.PBTRIsSlab = !row.entity.PBTRIsSlab;
            if (row.entity.PBTRIsSlab) {

                _getSubGridOptions(row.entity, row.entity.PBTRIsFormula)
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
        function _toggleRowExpand(row) {
            if (row.entity.PBTRIsFormula && $scope.toggleExpandOnAdd) {
                _getSubGridOptions(row.entity, row.entity.PBTRIsFormula)
                $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
                $scope.toggleExpandOnAdd = false;
            }
            else {
                $scope.rulePage.gridApi.expandable.toggleRowExpansion(row.entity);
            }
        }
        function _removeRuleSlab(row) {

            console.log(row)
            console.log($scope.payTempGridOptions.data)
            var existingTotalEarningHead = $filter("findObj")($scope.payTempGridOptions.data, 'True', "SHIsTotalEarning");
            var existingTotalDeductionHead = $filter("findObj")($scope.payTempGridOptions.data, 'True', "SHIsTotalDeduction");
            var dependsHead = $filter("findObj")($scope.payTempGridOptions.data, row.entity.PBTRSHId, "PBTRSHId");
            if (existingTotalEarningHead != null && row.entity.SHeadType == "Earning") {
                if (row.entity.SHeadType != "Total") {
                    $scope.showMsg("warning", "Please delete Total " + row.entity.SHeadType + " head first")
                    return
                }
            }
            if (existingTotalDeductionHead != null && row.entity.SHeadType == "Deduction") {
                if (row.entity.SHeadType != "Total") {
                    $scope.showMsg("warning", "Please delete Total " + row.entity.SHeadType + " head first")
                    return
                }
            }
            // if ($scope.payTempGridOptions.data.length > 0) {
            //     for (var i = 0; i < $scope.payTempGridOptions.data.length; i++) {
            //         var head= $scope.payTempGridOptions.data[i];
            //         if (head.PBTRCalcOnSHId.length > 0) {
            //             for (var j = 0; j < head.PBTRCalcOnSHId.length; j++) {
            //                 var calHead=head.PBTRCalcOnSHId[j]
            //                 if (head.PBTRSHId == calHead.value) {
            //                     break;
            //                 }
            //             }
            //             break;
            //         }
            //     }            
            // }

            var index = $scope.payTempGridOptions.data.indexOf(row.entity);
            $scope.payTempGridOptions.data.splice(index, 1);

            _getNetPayable();
        }

        function _getSubGridOptions(row, PBTRIsFormula, entitlement) {

            row.subGridOptions = {
                enableCellEditOnFocus: true,
                columnDefs: [],
                onRegisterApi: _onSubGridRegisterApi
            };
            if (PBTRIsFormula) {
                _addFormulaGridColumns(row)
                row.subGridOptions.data = [];
                if (row.PBTRCalcOnSHId.length > 0) {
                    for (var i = 0; i < row.PBTRCalcOnSHId.length; i++) {
                        // var headAmt = parseFloat(_getHeadAmount(row.PBTRCalcOnSHId[i].value, entitlement))
                        var operator = "";
                        var head = $filter('findObj')($scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options, row.PBTRSHId, 'value')
                        if (head != null) {

                            if (head.SHIsGross == "True") {
                                operator = '+'
                            }
                            else if (head.SHIsTotal == "True") {

                                if (row.PBTRCalcOnSHId[i].SHeadType == "Earning") {
                                    operator = '+'
                                }
                                if (row.PBTRCalcOnSHId[i].SHeadType == "Deduction") {
                                    operator = '-'
                                }
                            }
                            // else {
                            //     if (row.PBTRCalcOnSHId[i].SHType == "Earning") {
                            //         operator = '+'
                            //     }
                            //     else if (row.PBTRCalcOnSHId[i].SHType == "Deduction") {
                            //         operator = '-'
                            //     }
                            // }
                        }
                        row.subGridOptions.data.push({
                            PFTDId: 0,
                            PFTDPBTRId: 0,
                            PFTDCalcHeadId: [row.PBTRCalcOnSHId[i]],
                            PFTDPercentage: 100,
                            PFTDOperator: operator,
                        })
                    }
                }
            }
            else {
                if ($scope.slabPage.pageinfo) {

                    var cellTemplateAvoid = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
                    cellTemplateAvoid += "<a href ng-click=\"grid.appScope.changeAvoidExcessCalc(row)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBTSAvoidExcessCalc, 'fa-square-o': !row.entity.PBTSAvoidExcessCalc }\" aria-hidden=\"true\" ></i></a>";
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
                            name: $scope.slabPage.pageinfo.fields.PBTSPercentage.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSPercentage.text,
                            width: 100, visible: true, cellFilter: 'avoidNan'
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBTSMinCalcOnAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSMinCalcOnAmount.text,
                            width: 140, visible: true, cellFilter: 'avoidNan', type: 'decimal'
                        })
                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBTSMaxCalcOnAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSMaxCalcOnAmount.text,
                            width: 150, visible: true, cellFilter: '', type: 'decimal'
                        })


                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBTSMinAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSMinAmount.text,
                            width: 130, visible: true, cellFilter: 'avoidNan', type: 'decimal'
                        })

                    row.subGridOptions.columnDefs.push(
                        {
                            name: $scope.slabPage.pageinfo.fields.PBTSMaxAmount.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSMaxAmount.text,
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
                            name: $scope.slabPage.pageinfo.fields.PBTSAvoidExcessCalc.name,
                            displayName: $scope.slabPage.pageinfo.fields.PBTSAvoidExcessCalc.text,
                            type: 'boolean',
                            cellTemplate: cellTemplateAvoid,
                            // editableCellTemplate: cellTemplateAvoid,
                            width: 50, visible: true, cellFilter: '', cellEditableCondition: true
                        })

                    if (row.PBTRCalcOnSHId.length > 0) {
                        row.subGridOptions.data = [];
                        row.subGridOptions.data.push({
                            //   PBTRRuleName: '',
                            PBTSId: 0,
                            PBTSIsCalcOnPercentage: true,
                            PBTSPBTRId: 0
                        })
                    }
                }
            }
        }


        function _addFormulaGridColumns(row) {


            row.subGridOptions.columnDefs.push(
                {
                    name: 'leftpin',
                    displayName: '.',
                    width: 50, visible: true, cellFilter: '',
                    cellEditableCondition: false,
                    // cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    //     return 'status-bg YELLOW-300'
                    // }
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFTDCalcHeadId',
                    displayName: $scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.text,
                    width: 250, visible: true,
                    editableCellTemplate: 'uiSelectMulti',
                    editDropdownIdLabel: 'value',
                    editDropdownValueLabel: 'name',
                    editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options,
                    cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options:'value':'name'",
                    cellClass: _cellClass,
                    cellEditableCondition: _cellEditableCondition
                })

            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFTDPercentage',
                    displayName: 'Percentage',
                    width: 100, visible: true, cellFilter: '',
                    cellEditableCondition: true
                })
            row.subGridOptions.columnDefs.push(
                {
                    name: 'PFTDOperator',
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
                    cellEditableCondition: true

                })
        }

        function _onSubGridRegisterApi(subGridApi) {

            subGridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                console.log('sub grid api', colDef)
                if (subGridApi.grid.parentRow.entity.PBTRIsFormula) {
                    if (colDef.name == "PFDPercentage") {
                        //checking valid input %
                        var pfdPercentage = parseFloat(rowEntity.PFTDPercentage);
                        if (isNaN(pfdPercentage)) {
                            rowEntity.PFDPercentage = 0;
                        }
                        else {
                            rowEntity.PFTDPercentage = pfdPercentage.toFixed(2);
                        }
                    }
                    else if (colDef.name == "PFTDOperator") {
                        //checking valid input operators

                    }
                    else if (colDef.name == "PFTDOperator") {
                        //checking valid input operators

                    }

                }
                else {

                    //finding dependent heads total
                    var headRows = subGridApi.grid.parentRow.entity.PBTRCalcOnSHId;
                    var headAmtTot = 0
                    for (var i = 0; i < headRows.length; i++) {
                        var headAmt = _getHeadAmount(headRows[i].value)
                        headAmtTot += parseFloat(headAmt);
                    }

                    var calcPercentage = parseFloat(rowEntity.PBTSPercentage);
                    if (colDef.name == "PBTSPercentage") {
                        if (isNaN(calcPercentage)) {
                            rowEntity.PBTSPercentage = '';
                        }
                        else {
                            if (calcPercentage > 0 && calcPercentage <= 100) {
                                rowEntity.PBTSPercentage = calcPercentage.toFixed(2);
                            }
                            else {
                                rowEntity.PBTSPercentage = '';
                            }
                        }
                    }
                    else if (colDef.name == "PBTSMinCalcOnAmount") {
                        var inputMaxAmt = parseFloat(rowEntity.PBTSMaxCalcOnAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBTSMinCalcOnAmount);
                        if (isNaN(inputMinAmt)) {
                            rowEntity.PBTSMinCalcOnAmount = 0;
                        }
                        else {
                            //checking whether min amount is more than dependent head total amount or not
                            if (headAmtTot < inputMinAmt) {
                                $scope.showMsg('warning', 'Min Amount can not more than dependent head amount')
                                rowEntity.PBTSMinCalcOnAmount = headAmtTot.toFixed(2);
                                return;
                            }
                            //checking whether max amount is less than min amount or not
                            if (!isNaN(inputMaxAmt)) {
                                if (inputMaxAmt > 0) {
                                    if (inputMaxAmt < inputMinAmt) {
                                        $scope.showMsg('warning', 'Min amount can not more than max amount')
                                        rowEntity.PBTSMinCalcOnAmount = 0;
                                        return;
                                    }
                                }
                            }
                            rowEntity.PBTSMinCalcOnAmount = inputMinAmt.toFixed(2);
                            var calcMinAmt = Math.round((calcPercentage / 100) * inputMinAmt);
                            if (calcPercentage > 0) {
                                rowEntity.PBTSMinAmount = calcMinAmt.toFixed(2);
                            }
                        }
                    }
                    else if (colDef.name == "PBTSMaxCalcOnAmount") {
                        var inputMaxAmt = parseFloat(rowEntity.PBTSMaxCalcOnAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBTSMinCalcOnAmount);
                        if (isNaN(inputMaxAmt)) {
                            rowEntity.PBTSMaxCalcOnAmount = 0;
                        }
                        else {
                            //checking whether min amount is more than dependent head total amount or not
                            if (headAmtTot < inputMaxAmt) {
                                $scope.showMsg('warning', 'Min amount can not more than dependent head amount')
                                rowEntity.PBTSMaxCalcOnAmount = headAmtTot.toFixed(2);
                                return;
                            }
                            //checking whether max amount is less than min amount or not
                            if (!isNaN(inputMinAmt)) {
                                if (inputMinAmt > 0) {
                                    if (inputMaxAmt < inputMinAmt) {
                                        $scope.showMsg('warning', 'Max amount can not less than min amount')
                                        rowEntity.PBTSMaxCalcOnAmount = 0;
                                        return;
                                    }
                                }
                            }
                            //calculating max amount as per percentage input
                            rowEntity.PBTSMaxCalcOnAmount = inputMaxAmt.toFixed(2);
                            var calcMaxAmt = Math.round((calcPercentage / 100) * inputMaxAmt);
                            if (calcPercentage > 0) {
                                rowEntity.PBTSMaxAmount = calcMaxAmt.toFixed(2);
                            }
                        }
                    }
                    else if (colDef.name == "PBTSMinAmount") {
                        var inputValue = parseFloat(rowEntity.PBTSMinAmount);
                        var inputMinAmt = parseFloat(rowEntity.PBTSMinCalcOnAmount);
                        if (isNaN(inputValue)) {
                            rowEntity.PBTSMinAmount = 0;
                        }
                        else {

                            if (isNaN(inputMinAmt)) {
                                rowEntity.PBTSMinCalcOnAmount = 0;
                            }
                            else {
                                var calcMinAmt = Math.round((calcPercentage / 100) * inputMinAmt);
                                if (inputValue < calcMinAmt) {
                                    rowEntity.PBTSMinAmount = calcMinAmt.toFixed(2);
                                    $scope.showMsg('warning', 'Min calculated amount can not less than ' + calcPercentage.toFixed(2) + '% of defined min salary amount.')
                                }
                                else {
                                    rowEntity.PBTSMinAmount = inputValue.toFixed(2);
                                }
                            }
                        }

                    }
                    else if (colDef.name == "PBTSMaxAmount") {
                        var inputValue = parseFloat(rowEntity.PBTSMaxAmount);
                        var inputMaxAmt = parseFloat(rowEntity.PBTSMaxCalcOnAmount);

                        if (isNaN(inputValue)) {
                            rowEntity.PBTSMaxAmount = 0;
                        }
                        else {
                            if (isNaN(inputMaxAmt)) {
                                rowEntity.PBTSMaxCalcOnAmount = 0;
                            }
                            else {
                                var calcMaxAmt = Math.round((calcPercentage / 100) * inputMaxAmt);
                                if (inputValue > calcMaxAmt) {
                                    $scope.showMsg('warning', 'Max calculated amount can not more than ' + calcPercentage.toFixed(2) + '% of defined max salary amount.')
                                    rowEntity.PBTSMaxAmount = calcMaxAmt.toFixed(2);
                                }
                                else {
                                    rowEntity.PBTSMaxAmount = inputValue.toFixed(2);
                                }
                            }
                        }
                    }
                    else if (colDef.name == "PBTSAvoidExcessCalc") {

                    }


                    //calculating amount as per slab
                    if (subGridApi.grid.parentRow.entity.PBTRCalcOnSHId.length > 0) {



                        var shGross = $filter('findObj')($scope.rulePage.pageinfo.selects.PBTRSHId, 'True', 'SHIsGross')
                        var grossId = 0;
                        if (shGross != null) {
                            grossId = shGross.value;
                        }

                        var totalAmount = 0;
                        var deductionTotal = 0;
                        var employerTotal = 0;
                        var grossAmt = 0;
                        for (var c = 0; c < $scope.payTempGridOptions.data.length; c++) {
                            var row = $scope.payTempGridOptions.data[c];

                            if (grossId != row.PBTRSHId && row.SHeadType == 'Earning') {
                                totalAmount += Math.round(row.PBRAmount);
                            }
                            else if (grossId != row.PBTRSHId && row.SHeadType == 'Deduction') {
                                deductionTotal += Math.round(row.PBRAmount);
                            }
                            else if (grossId != row.PBTRSHId && row.SHeadType == 'Employer') {
                                employerTotal += Math.round(row.PBRAmount);
                            }
                            else {
                                grossAmt += Math.round(row.PBRAmount);
                            }

                        }


                        var calcOnAmt = headAmtTot;

                        var maxAmtOn = parseFloat(rowEntity.PBTSMaxCalcOnAmount);
                        var minAmtOn = parseFloat(rowEntity.PBTSMinCalcOnAmount);

                        var maxAmt = parseFloat(rowEntity.PBTSMaxAmount);
                        var minAmt = parseFloat(rowEntity.PBTSMinAmount);

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


                        if (rowEntity.PBTSAvoidExcessCalc) {
                            if (rowEntity.PBTSMaxCalcOnAmount) {
                                if (parseFloat(rowEntity.PBTSMaxCalcOnAmount) < headAmt) {
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


        function _saveForm(form) {
            if ($scope.entity.PBTName != undefined && $scope.entity.PBTName != '') {
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
                    linkColumn: 'PBTRPBTId',
                    idenColName: $scope.rulePage.pageinfo.idencolname,
                    rows: []
                }

                for (var r = 0; r < $scope.payTempGridOptions.data.length; r++) {
                    var row = $scope.payTempGridOptions.data[r];
                    var ruleEntity = {};

                    ruleEntity.PBTRId = row.PBTRId;
                    ruleEntity.PBTRSHId = row.PBTRSHId;
                    if (ruleEntity.PBTRPBTId == undefined) {
                        ruleEntity.PBTRPBTId = 0;
                    }
                    else {
                        ruleEntity.PBTRPBTId = row.PBTRPBTId;
                    }
                    // ruleEntity.PBTRRuleName = row.PBTRRuleName;
                    ruleEntity.PBTRPercentage = row.PBTRPercentage;
                    var calcHeads = ''
                    for (var c = 0; c < row.PBTRCalcOnSHId.length; c++) {
                        calcHeads += row.PBTRCalcOnSHId[c].value + ','
                    }
                    if (calcHeads != '') {
                        calcHeads = calcHeads.substr(0, calcHeads.length - 1)
                    }
                    ruleEntity.PBTRCalcOnSHId = '[' + calcHeads + ']'
                    ruleEntity.PBTRIsSlab = row.PBTRIsSlab;
                    ruleEntity.PBTRIsFormula = row.PBTRIsFormula;
                    ruleEntity.IsDeleted = true;

                    if (row.subGridOptions) {
                        if (row.subGridOptions.data) {
                            if (row.subGridOptions.data.length > 0) {
                                ruleEntity.child = [];
                                if (row.PBTRIsFormula) {
                                    var formulaChild = {
                                        tableid: $scope.paybandTemp.FormulaTableId,
                                        pageid: $scope.paybandTemp.FormulaPageId,
                                        parentColumn: $scope.rulePage.pageinfo.idencolname,
                                        linkColumn: 'PFTDPBTRId',
                                        idenColName: 'PFTDId',
                                        rows: []
                                    }

                                    for (var c = 0; c < row.subGridOptions.data.length; c++) {
                                        var ent = row.subGridOptions.data[c];

                                        var formulaEntity = {};
                                        formulaEntity.PFTDId = ent.PFTDId;
                                        formulaEntity.PFTDPBRId = ent.PFTDPBTRId;

                                        //converting selected head to comas delimated string
                                        var calcHeadId = ''
                                        for (var i = 0; i < ent.PFTDCalcHeadId.length; i++) {
                                            calcHeadId += ent.PFTDCalcHeadId[i].value + ',';
                                        }
                                        if (calcHeadId != '') {
                                            calcHeadId = calcHeadId.substr(0, calcHeadId.length - 1);
                                        }

                                        formulaEntity.PFTDCalcHeadId = '[' + calcHeadId + ']';

                                        formulaEntity.PFTDPercentage = ent.PFTDPercentage;
                                        formulaEntity.PFTDOperator = ent.PFTDOperator;
                                        formulaChild.rows.push(formulaEntity);

                                    }

                                    ruleEntity.child.push(formulaChild);
                                }
                                else {
                                    var slabChild = {
                                        tableid: $scope.paybandTemp.SlabTableId,
                                        pageid: $scope.paybandTemp.SlabPageId,
                                        parentColumn: $scope.rulePage.pageinfo.idencolname,
                                        linkColumn: 'PBTSPBTRId',
                                        idenColName: 'PBTSId',
                                        rows: []
                                    }

                                    for (var c = 0; c < row.subGridOptions.data.length; c++) {
                                        var ent = row.subGridOptions.data[c];
                                        if (ent.PBTSPercentage) {
                                            var slabEntity = {};
                                            slabEntity.PBTSId = ent.PBTSId;
                                            slabEntity.PBTSPBRId = ent.PBTSPBRId;
                                            slabEntity.PBTSIsCalcOnPercentage = ent.PBTSIsCalcOnPercentage;
                                            slabEntity.PBTSMinCalcOnAmount = ent.PBTSMinCalcOnAmount;
                                            slabEntity.PBTSMaxCalcOnAmount = ent.PBTSMaxCalcOnAmount;
                                            slabEntity.PBTSMinAmount = ent.PBTSMinAmount;
                                            slabEntity.PBTSMaxAmount = ent.PBTSMaxAmount;
                                            slabEntity.PBTSPercentage = ent.PBTSPercentage;
                                            // slabEntity.PBTRRuleName = ent.PBTRRuleName;
                                            slabEntity.PBTSAvoidExcessCalc = ent.PBTSAvoidExcessCalc;

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

                var data = { lz: true, data: compressed }
                //   $scope.multiEntity.lz = false;

                pageService.multiSave(data).then(function (result) {

                    if (result == "done") {
                        $scope.page.showEditForm = false;
                        $scope.page.refreshData();
                        $scope.showMsg("success", "Record Saved Successfully");
                        //  _recalculatingSecondGrid($scope.page.gridOptions)
                    }
                    else if (result.error_message.Message == "Record Already Added.") {
                        $scope.showMsg("error", "Payband Template Name Already Exist");
                    }

                }, function (err) {
                    console.log(err)
                })
                console.log($scope.multiEntity)
            }
            else {
                $scope.showMsg("error", "Payband template name is required")
            }
        }

        /**call page load funnction */
        _loadController();
    }
})();
