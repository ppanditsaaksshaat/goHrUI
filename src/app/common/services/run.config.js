angular.module('BlurAdmin.common').run(function ($rootScope, $state, $stateParams, $filter, DJWebStore, toastr, toastrConfig) {

    var toastOption = {};
    var defaultConfig = angular.copy(toastrConfig);
    var openedToasts = [];
    toastOption = {
        autoDismiss: false,
        positionClass: 'toast-top-center',
        type: 'success',
        timeOut: '5000',
        extendedTimeOut: '2000',
        allowHtml: false,
        closeButton: true,
        tapToDismiss: true,
        progressBar: true,
        newestOnTop: true,
        maxOpened: 0,
        preventDuplicates: true,
        preventOpenDuplicates: true,
        title: "",
        msg: ""
    };

    $rootScope.modalInstance = {};

    //gridObject Defaults
    $rootScope.gridObject = {
        columns: [],
        enableTitleFilter: false,
        enableGlobalFilter: false,
        enbleColumnFilter: false,
        enableSrNo: false,
        enableAction: false,
        enablePagination: false,
        paginationLength: 10,
        pageId: 0
    };

    $rootScope.IsRowSelected = false;
    $rootScope.SelectedRowsCount = 0;
    $rootScope.IsAllIndeterminate = false;


    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
    });
    //back button function called from back button's ng-click="back()"
    $rootScope.back = function (prevState) {
        if ($rootScope.previousState_name != '')
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        else {
            if (prevState !== undefined) {
                $state.go(prevState, $stateParams);
            }
            else {
                alert('Not Implemented!!')
            }
        }
    };

    $rootScope.setPage = function (pageObject) {

        $rootScope.currentPage = pageObject;
        DJWebStore.SetValue('Page_' + pageObject.pageinfo.pageid, pageObject);
    }
    $rootScope.getPage = function (pageId) {

        var pageObject = DJWebStore.GetValue('Page_' + pageId);
        $rootScope.currentPage = pageObject;
        return pageObject;

    }

    $rootScope.setGrid = function (options) {
        var defaults = {
            columns: [],
            enableTitleFilter: false,
            enableGlobalFilter: false,
            enbleColumnFilter: false,
            enableSrNo: false,
            enableAction: false,
            enablePagination: false,
            paginationLength: 10,
            pageId: 0
        };

        var gridObject = angular.extend(defaults, options);
        console.log(gridObject)
        var userColumns = gridObject.columns;
        console.log(userColumns);
        var pageId = $stateParams.pageId;;
        if (gridObject.pageId !== undefined) {
            if (gridObject.pageId > 0) {
                pageId = gridObject.pageId;
            }
        }

        var page = DJWebStore.GetValue('Page_' + pageId);

        var colList = [];
        userColumns.forEach(function (col) {
            var sysCol = $filter('findObj')(page.pageinfo.columns, col, 'name');
            if (sysCol != null) {
                if (sysCol !== undefined) {
                    var newcol = {}
                    newcol.text = sysCol.displayName;
                    newcol.name = sysCol.name;
                    newcol.type = sysCol.type;
                    colList.push(newcol);
                }
            }
        })
        console.log(page.pageinfo.columns);
        if (page.pageinfo.titlecolname != '')
            gridObject.titleField = page.pageinfo.titlecolname
        gridObject.columns = colList;;
        gridObject.enableFilter = (!gridObject.enableTitleFilter) ? ((!gridObject.enableGlobalFilter) ? (!gridObject.enbleColumnFilter ? false : true) : true) : true
        gridObject.page = page;
        gridObject.pageId = pageId;
        $rootScope.gridObject = gridObject;
        console.log(new Date(), gridObject)
    }

    $rootScope.showMsg = function (type, msg, title) {
        toastOption.type = type;
        angular.extend(toastrConfig, toastOption);
        openedToasts.push(toastr[toastOption.type](msg, title));
    }

    $rootScope.getSelectedRows = function (rows) {
        var selectedRows = [];
        angular.forEach(rows, function (row) {
            if (row.IsSelected) {
                selectedRows.push(row);
            }
        })
        $rootScope.SelectedRowsCount = selectedRows.length;
        $rootScope.IsAllIndeterminate = (selectedRows.length > 0);
        return selectedRows;
    }

    $rootScope.clearSelection = function () {
        $rootScope.gridObject.IsAllSelected = false;
        $rootScope.IsAllIndeterminate = false;
        $rootScope.IsRowSelected = false;
        $rootScope.SelectedRowsCount = 0;
        $rootScope.IsAllSelected = false;
        angular.forEach(rows, function (row) {
            row.IsSelected = false;
        })
    }
    $rootScope.gridSetupColumns = function (gridOptions, columns, page, isEdit, isDelete, isView, isUpdate) {
        gridOptions.columnDefs = [];

        // var colRowHeader = {
        //     name: 'RowHeader', field: 'RowHeader',
        //     displayName: '', width: 30, visible: true,
        //     pinnedLeft: true,
        //     enableFiltering: false,
        //     cellTemplate: "<div class=\"ui-grid-cell-contents\"><div class='ui-grid-selection-row-header-buttons ui-grid-icon-ok ng-scope' ng-class='{\"ui-grid-row-selected\": row.isSelected}' ng-click='selectButtonClick(row, $event)' role='button' tabindex='0'>&nbsp;</div></div>"
        // };
        // gridOptions.columnDefs.push(colRowHeader);
        if (columns !== undefined) {

            var optMenu = {
                name: 'actions2',
                displayName: ' ',
                cellClass: "overflow-visible",
                cellTemplate: [
                    '<div class="ui-grid-cell-contents" ng-mouseover="row.isMouseOver=true" ng-mouseleave="row.isMouseOver=false">',
                    '  <div ng-show="row.isMouseOver"   class="dropdown" uib-dropdown dropdown-append-to-body>',
                    '    <button class="btn btn-xs btn-default dropdown-toggle" type="button" uib-dropdown-toggle><span class="glyphicon glyphicon-tasks"></span></button>',
                    '    <ul uib-dropdown-menu>',
                    (isEdit) ? '      <li><a href ng-click="grid.appScope.page.editRecord(row)">Edit</a></li>' : '',
                    (isView) ? '      <li><a href ng-click="grid.appScope.page.viewRecord(row)">View</a></li>' : '',
                    (isUpdate) ? '      <li><a href ng-click="grid.appScope.page.updateRecord(row)">Update</a></li>' : '',
                    (isDelete) ? '       <li class="divider"></li>' : '',
                    (isDelete) ? '      <li><a href ng-click="grid.appScope.page.deleteRecord(row)">Delete</a></li>' : '',
                    '    </ul>',
                    '  </div>',
                    '</div>'
                ].join(''),
                pinnedLeft: true,
                width: 30
            }
            gridOptions.columnDefs.push(optMenu);

            for (var i = 0; i < columns.length; i++) {

                var column = columns[i];
                var colName = column.name;
                var displayName = column.displayName;
                var colEndWith = colName.toString().toLowerCase().substring(colName.toString().toLowerCase().length - 2).toLowerCase();
                if (colName.toString() == "FileId") {
                    var cellTemplate = "<div class='ui-grid-cell-contents dupl' title='Download Attached File' ng-show=\"row.entity.FileId > 0 \"><a ng-click='grid.appScope.page.downloadFile(\"{{row.entity.FileId}}\")'>Download File</a></div>"
                    columns[i].cellTemplate = '';
                    columns[i]['cellTemplate'] = cellTemplate;
                    columns[i]['visible'] = true;
                    columns[i]["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (row.entity.StatusBGClass !== undefined) {
                            return 'status-bg ' + row.entity.StatusBGClass;
                        }
                    }
                    gridOptions.columnDefs.push(columns[i]);
                }
                else if (page.pageinfo.titlecolname == colName) {
                    var cellTemplate = "<div class='ui-grid-cell-contents' title='View Detail'><a ng-click='grid.appScope.page.viewRecord(row)' style='cursor:pointer'>{{row.entity." + colName + "}}</a></div>"
                    columns[i].cellTemplate = '';
                    columns[i]['cellTemplate'] = cellTemplate;
                    columns[i]['visible'] = true;
                    columns[i]["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (row.entity.StatusBGClass !== undefined) {
                            return 'status-bg ' + row.entity.StatusBGClass;
                        }
                    }
                    gridOptions.columnDefs.push(columns[i]);
                }
                else if (colEndWith != "id") {
                    var cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >{{row.entity." + colName + "}}</div>"
                    columns[i].cellTemplate = '';
                    columns[i]['cellTemplate'] = cellTemplate;
                    columns[i]["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (row.entity.StatusBGClass !== undefined) {
                            return 'status-bg ' + row.entity.StatusBGClass;
                        }
                    }

                    gridOptions.columnDefs.push(columns[i]);
                    // page.multiselectlist.push({ id: colName, label: displayName });
                    // if (columns[i].visible) {
                    //     page.columnselectormodal.push({ columnname: colName });
                    // }
                }
            }



        }

        //adding default columns at and
        var colCreatedOn = { name: 'CreatedOn', field: 'CreatedOn', displayName: 'Date', width: 100, visible: false, cellFilter: 'date:\'dd-MMM-yyyy\'' };
        var colCreatedBy = { name: 'CreatedBy', field: 'CreatedBy', displayName: 'User', width: 100, visible: false };
        var colAssignedUser = { name: 'AssignedUser', field: 'AssignedUser', displayName: 'Assigned User', width: 100, visible: false };
        gridOptions.columnDefs.push(colCreatedOn);
        gridOptions.columnDefs.push(colCreatedBy);
        gridOptions.columnDefs.push(colAssignedUser);

        return gridOptions;
    }

    $rootScope.getGridSetting = function () {
        var gridOptions = {
            rowHeight: 35,
            enableColumnResizing: true,
            enableFiltering: false,
            enableGridMenu: true,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            enablePaginationControls: true,
            paginationPageSizes: [10, 25, 50, 75, 100, 200, 500],
            paginationPageSize: 10,
            minRowsToShow: 10,
            showColumnFooter: false,
            enableVerticalScrollbar: false,
            enableHighlighting: true,
            enablePinning: true,
            data: [],
            columnDefs: []
            // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
        }
        return gridOptions;
    }
    /**
     * A rootScope method for creating default page Object
     */
    $rootScope.createPage = function () {
        var page = { formschema: {}, formsetting: {}, timespan: {} };
        page.gridOptions = $rootScope.getGridSetting();

        page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: false,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            gridHeight: 450,
            refreshData: null,
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            openView: null,
            uploadRecord: null
        }

        page.pageinfo = undefined;
        page.searchList = [];
        page.orderByList = [];
        page.isPageLoading = false;
        page.isPageLoaded = false;
        page.isDataLoading = false;
        page.isDataLoaded = false;
        page.showFilter = false;

        return page;
    }
});