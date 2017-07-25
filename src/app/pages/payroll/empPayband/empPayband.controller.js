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

        $scope.page = {};
        $scope.page.gridOptions = {
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" ui-grid-edit ng-style=\"getSubgridHeight(row.entity.subGridOptions)\"></div>',
            expandableRowHeight: 150,
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
            enableCellEditOnFocus: true,
            data: [],
            columnDefs: [],
            onRegisterApi: _onGridRegisterApi,
            showGridFooter: true,
            showColumnFooter: false,
            gridFooterTemplate: '<div class="row"> <div class="col-md-8"> <div class="pull-left">  Diffrences of earning to be added in <select ng-model="grid.appScope.selectedOtherHead" ng-options="opt.name for opt in grid.appScope.rulePage.pageinfo.fields.PBRSHId.options"></select></div><div class="pull-right"><button ng-click="grid.appScope.addTotal()" type="button" class="btn btn-danger btn-xs"><i class="fa fa-calculator"></i> Calculate Diffrences</button></div></div><div class="col-md-4"><div class="pull-right"><button ng-click="grid.appScope.addNewRule()" type="button" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Add New Head</button></div></div></div>'
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }
    }
})();