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
        preventDuplicates: false,
        preventOpenDuplicates: false,
        title: "",
        msg: ""
    };

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
        console.log(gridObject)
    }

    $rootScope.showMsg = function (type, msg, title) {
        toastOption.type = type;
        angular.extend(toastrConfig, toastOption);
        openedToasts.push(toastr[toastOption.type](msg, title));
    }
});