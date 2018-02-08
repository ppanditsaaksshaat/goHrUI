angular.module('BlurAdmin.common').run(function ($rootScope, $state, $stateParams, $filter, DJWebStore,
    toastr, toastrConfig, pageService, $timeout, $location, Idle, dialogModal) {


    $rootScope.company = { name: 'ITSL Rudra' };
    $rootScope.user = DJWebStore.ValidateUser();
    $rootScope.sideMenu = DJWebStore.GetValue('sidemenu');


    $rootScope.currentPeriod = new Date(moment().year(), moment().month(), moment().date());


    //  $rootScope.profilePicture = 'data:image/png;base64,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';
    if ($rootScope.user != undefined) {
        if ($rootScope.user.profile.profilePhoto == 'data:image/jpeg;base64,') {
            $rootScope.profilePicture = 'data:image/png;base64,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';
        }
        else {
            $rootScope.profilePicture = $rootScope.user.profile.profilePhoto;
        }
    }
    console.log($rootScope.user)

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
        preventDuplicates: false,
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

    $rootScope.GetBGClass = function () {

        pageService.getBGClass().then(function (result) {
            var bgClass = result;//angular.fromJson(response.data);
            DJWebStore.SetBGClass(bgClass);
        }, function (err) {
            console.log(err);
        });

    }
    var sheet = (function () {
        // Create the <style> tag
        var style = document.createElement("style");

        // Add a media (and/or media query) here if you'd like!
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "only screen and (max-width : 1024px)")

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

    $rootScope.setupColorClass = function () {

        $timeout(function () {
            var bgClasses = DJWebStore.GetBGClass();
            if (bgClasses == null) {

            }
            angular.forEach(bgClasses, function (k, v) {

                var className = k.BGCssClass;
                var bgColorCode = "background: " + k.BGClassBG + " !important; ";
                var fontColorCode = "color: " + k.BGClassFont + "; ";

                if (k.BGClassFont == "") {
                    fontColorCode = "";
                }

                if (k.BGClassBG == "") {
                    bgColorCode = "";
                }
                sheet.addRule("." + className, bgColorCode + fontColorCode, 0);
            });
        })
    }

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
        //console.log(gridObject)
        var userColumns = gridObject.columns;
        //console.log(userColumns);
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
        //console.log(page.pageinfo.columns);
        if (page.pageinfo.titlecolname != '')
            gridObject.titleField = page.pageinfo.titlecolname
        gridObject.columns = colList;;
        gridObject.enableFilter = (!gridObject.enableTitleFilter) ? ((!gridObject.enableGlobalFilter) ? (!gridObject.enbleColumnFilter ? false : true) : true) : true
        gridObject.page = page;
        gridObject.pageId = pageId;
        $rootScope.gridObject = gridObject;
        //console.log(new Date(), gridObject)
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
    $rootScope.gridSetupColumns = function (gridOptions, columns, page, isEdit, isDelete, isView, isUpdate, showRowMenu) {
        console.log(columns)
        if (showRowMenu == undefined) {
            showRowMenu = true;
        }
        page.columnDefs = [];
        gridOptions.columnDefs = [];
        // console.log(columns)
        // var colRowHeader = {
        //     name: 'RowHeader', field: 'RowHeader',
        //     displayName: '', width: 30, visible: true,
        //     pinnedLeft: true,
        //     enableFiltering: false,
        //     cellTemplate: "<div class=\"ui-grid-cell-contents\"><div class='ui-grid-selection-row-header-buttons ui-grid-icon-ok ng-scope' ng-class='{\"ui-grid-row-selected\": row.isSelected}' ng-click='selectButtonClick(row, $event)' role='button' tabindex='0'>&nbsp;</div></div>"
        // };
        // gridOptions.columnDefs.push(colRowHeader);
        if (columns !== undefined) {

            if (showRowMenu) {
                if (isEdit || isView || isUpdate || isDelete || isDelete) {
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
                    page.columnDefs.push(optMenu);
                }
            }

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
                    page.columnDefs.push(columns[i]);
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
                    page.columnDefs.push(columns[i]);
                }
                else if (colEndWith != "id") {
                    var cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >{{row.entity." + colName + "}}</div>"

                    if (column.editable.controltype == 'checkbox') {
                        cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
                        cellTemplate += "<i class=\"fa fa-check-square-o  fa-lg font-green\" aria-hidden=\"true\" ng-show=\"row.entity." + colName + "\" ></i>";
                        cellTemplate += "</div>"
                    }
                    else if (column.editable.controltype == 'datepicker') {
                        cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >{{row.entity." + colName + " | date :'dd-MMM-yyyy'}}</div>"
                    }
                    else if (column.editable.controltype == 'datetimepicker') {
                        cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >{{row.entity." + colName + " | date :'dd-MMM-yyyy HH:mm'}}</div>"
                    }
                    else if (column.editable.controltype == 'timepicker') {
                        //console.log(column)
                        cellTemplate = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >{{row.entity." + colName + " | date :'HH:mm a'}}</div>"
                    }
                    // if(column.controltype)

                    columns[i].cellTemplate = '';
                    columns[i]['cellTemplate'] = cellTemplate;
                    columns[i]["cellClass"] = function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        if (row.entity.StatusBGClass !== undefined) {
                            return 'status-bg ' + row.entity.StatusBGClass;
                        }
                    }

                    page.columnDefs.push(columns[i]);
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
        var colStatus = { name: 'StatusName', field: 'StatusName', displayName: 'Status', width: 100, visible: false, cellFilter: '' };

        page.columnDefs.push(colCreatedOn);
        page.columnDefs.push(colCreatedBy);
        page.columnDefs.push(colAssignedUser);
        page.columnDefs.push(colStatus);

        gridOptions.columnDefs = page.columnDefs;

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

    $rootScope.setupColorClass();

    //idle setting
    $rootScope.started = false;

    if ($location.absUrl().indexOf('auth.html') < 0) {
        Idle.watch();
        $rootScope.started = true;
    }

    $rootScope.openProgress = function () {
        return dialogModal.openProgress();
    }
    function closeModals() {
        if ($rootScope.warning) {
            $rootScope.warning.close();
            $rootScope.warning = null;
        }

        if ($rootScope.timedout) {
            $rootScope.timedout.close();
            $rootScope.timedout = null;
        }
    }

    $rootScope.$on('IdleStart', function () {
        // console.log('idlestart')
        // the user appears to have gone idle

        closeModals();

        $rootScope.warning = dialogModal.openIdleWarning()
    });

    $rootScope.$on('IdleWarn', function (e, countdown) {
        $rootScope.countdown = countdown;
        // console.log('IdleWarn', countdown, e)
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
    });

    $rootScope.$on('IdleTimeout', function () {
        // console.log('IdleTimeout')
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
        closeModals();
        $rootScope.timedout = dialogModal.openIdleTimeout()
        // $rootScope.timedout = $uibModal.open({
        //     templateUrl: 'timedout-dialog.html',
        //     windowClass: 'modal-danger'
        // });
    });

    $rootScope.$on('IdleEnd', function () {
        // console.log('IdleEnd')
        closeModals();
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    });

    $rootScope.$on('Keepalive', function () {
        // console.log('Keepalive')
        // do something to keep the user's session alive
    });

    $rootScope.unlockSession = function (pwd) {
        if ($rootScope.user.auth.userPwd == pwd) {
            Idle.watch();
            $rootScope.started = true;
            closeModals();
        }
    }
    $rootScope.logoutSession = function () {
        DJWebStore.Logout();
    }

    //page top functions
    $rootScope.openUserProfile = function () {
        $state.go('profile');
    }

    // $rootScope.$on('cfpLoadingBar:completed', function (evt) {
    //     console.log(evt, 'fpLoadingBar:completed')
    //     // dialogModal.openProgress();
    // });


});