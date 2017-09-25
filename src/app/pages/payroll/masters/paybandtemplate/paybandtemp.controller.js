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
            FormulaPageId: 443,
            FormulaTableId: 463,
            SlabPageId: 444,
            SlabTableId: 464
        }
        $scope.entity = {};
        $scope.rulePage = {};

        /**end of local variable declaration */



        /**private function  */

        $scope.closeForm = _closeForm;
        $scope.addNewRule = _addNewRule;

        /**end of private function  */

        /**default grid intialization*/

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
            onRegisterApi: null,
            showGridFooter: true,
            showColumnFooter: false,
            gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left" ng-show="grid.appScope.isShowCalculatediff">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name group by opt.SHType for opt in grid.appScope.differenceHeadList| orderBy:\'name\'"></select></div><div class="pull-right" ng-show="grid.appScope.isShowCalculatediff"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }

        /**end of custom grid intialization for paybandtempalte*/



        /** pageload function */
        function _loadController() {
            $timeout(function () {
                pageService.getPagData($scope.paybandTemp.RulePageId).then(function (result) {
                    console.log(result)
                    $scope.rulePage = angular.extend({}, $scope.rulePage, result);
                    // $scope.differenceHeadList = $scope.rulePage.pageinfo.fields.PBRSHId.options;
                    _addRuleGridColumns();
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
            $scope.page.showEditForm = true;
        }
        /**end of default grid add function */

        /**default grid edit function */
        function _editRecord(row) {

        }

        /**end of default grid edit function */

        /**default grid close function */

        function _closeForm(form) {
            $scope.page.showEditForm = false;
            $scope.entity = {};
        }

        /**end of default grid close function */


        function _addRuleGridColumns() {
            var cellTemplateCheck = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateCheck += "<a href ng-click=\"grid.appScope.changeFormula(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>1 && !row.entity.PBRIsSlab && (row.entity.PBRPercantage<=0)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.PBRIsFormula, 'fa-square-o': !row.entity.PBRIsFormula }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateCheck += "</div>"

            var cellTemplateSlab = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateSlab += "<a href ng-click=\"grid.appScope.changeSlab(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && !row.entity.PBRIsFormula && (row.entity.PBRPercantage<=0)\"> <i class=\"fa  font-green\"  ng-class=\"{'fa-check-square-o': row.entity.PBRIsSlab, 'fa-square-o': !row.entity.PBRIsSlab }\"  aria-hidden=\"true\"></i></a>";
            cellTemplateSlab += "</div>"

            var cellTemplateRowExpand = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateRowExpand += '<a href ng-click=\"grid.appScope.toggleRowExpand(row)\" ng-show=\"row.entity.PBRCalcOnSHId.length>0 && (row.entity.PBRIsFormula || row.entity.PBRIsSlab) && (row.entity.PBRPercantage<=0)\"  title="Expand/ Collapse Row" ><i class="fa " ng-class=\"{\'fa-plus\':!row.isExpanded, \'fa-minus\':row.isExpanded}\" aria-hidden="true"></i></a>'
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
                editDropdownOptionsArray: $scope.payTempGridOptions.data,
                cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBTRCalcOnSHId.options:'value':'name'",
                cellClass: _cellClass,
                cellEditableCondition: _cellEditableCondition,
                colIndex: 2
            })

            // editDropdownOptionsArray: $scope.rulePage.pageinfo.fields.PBRCalcOnSHId.options,
            // cellFilter: "mapMultiDropdown:grid.appScope.rulePage.pageinfo.fields.PBRCalcOnSHId.options:'value':'name'",

            $scope.payTempGridOptions.columnDefs.push(
                {
                    name: 'PBRPercantage',
                    displayName: '%',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: _cellEditableCondition,
                    colIndex: 3,
                    // cellTemplate: '<div ng-show="(row.entity.PBRCalcOnSHId.length > 0) && (!scope.row.entity.PBRIsFormula && !scope.row.entity.PBRIsSlab)" class="ui-grid-cell-contents ng-binding ng-scope"><div class="ngCellText"><input type="text" class="form-control" ng-model="row.entity.PBRPercantage"/></div></div></div>'
                })
            $scope.payTempGridOptions.columnDefs.push(
                {
                    name: 'GrossPercentage',
                    displayName: 'Gross %',
                    type: 'decimal',
                    width: 80, visible: true, cellFilter: 'percentage',
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 8
                })

            $scope.payTempGridOptions.columnDefs.push(
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

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateSlab,
                    name: 'PBRIsSlab',
                    displayName: 'Sl ab',
                    width: 30, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 6
                })

            $scope.payTempGridOptions.columnDefs.push(
                {
                    cellTemplate: cellTemplateRemove,
                    name: 'ruleRemove',
                    displayName: '-',
                    width: 30, visible: true,
                    cellClass: _cellClass,
                    cellEditableCondition: false,
                    colIndex: 7
                })

            $scope.payTempGridOptions.columnDefs.push(
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
            if (scope.col.name == "PBTRSHId") {
                return true;
            }
            else if (scope.col.name == "PBTRPercantage") {
                if (scope.row.entity.PBRCalcOnSHId) {
                    if (scope.row.entity.PBTRCalcOnSHId.length > 0) {
                        if (!scope.row.entity.PBTRIsFormula && !scope.row.entity.PBTRIsSlab)
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



        //adding new row to rule grid
        function _addNewRule(row) {
            if ($scope.payTempGridOptions.data.length > 0) {
                var lastRow = $scope.payTempGridOptions.data[$scope.payTempGridOptions.data.length - 1];
                if (lastRow.PBRSHId) {

                    _addRuleGridRow(0, false, 0, 0, 0, '', '', '', '', 0);

                }
            }
            else {
                _addRuleGridRow(0, false, 0, 0, 0, '', '', '', '', 0);
            }
        }

        function _addRuleGridRow(PBTRId, PBTRIsFormula, PBSId, PBRPBId, PBTRSHId, SHName, SHeadType, PBRRuleName, PBTRCalcOnSHId) {

            $scope.payTempGridOptions.data.push({
                PBTRId: PBTRId,
                PBTRIsFormula: PBTRIsFormula,
                PBSId: PBSId,
                PBRPBId: PBRPBId,
                PBTRSHId: PBTRSHId,
                SHName: SHName,
                SHeadType: SHeadType,
                PBRRuleName: PBRRuleName,
                PBTRCalcOnSHId: PBTRCalcOnSHId,
               
            })

        }

        /**call page load funnction */
        _loadController();
    }
})();
