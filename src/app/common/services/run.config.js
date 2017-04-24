angular.module('BlurAdmin.common').run(function ($rootScope, $state, $stateParams, $filter, DJWebStore) {
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
            pageId: 1
        };

        var gridObject = angular.extend(defaults, options);
        
        var userColumns = gridObject.columns;
        var pageId = $stateParams.pageId;
        var page = DJWebStore.GetValue('Page_' + pageId);

        var colList = [];
        userColumns.forEach(function (col) {
            var sysCol = $filter('findObj')(page.pageinfo.columns, col, 'name');
            if (sysCol != null) {
                if (sysCol !== undefined) {
                    var newcol = {}
                    newcol.text = sysCol.displayName;
                    newcol.name = sysCol.name;
                    colList.push(newcol);
                }
            }
        })
        gridObject.columns = colList;;
        gridObject.enableFilter = (!gridObject.enableTitleFilter) ? ((!gridObject.enableGlobalFilter) ? (!gridObject.enbleColumnFilter ? false : true) : true) : true
        gridObject.page = page;
        gridObject.pageId = pageId;
        $rootScope.gridObject = gridObject;
    }
});