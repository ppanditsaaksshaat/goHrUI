'use strict';
angular.module('BlurAdmin.common').factory('helper', ['$http', '$rootScope', '$filter',
    function ($http, $rootScope, $filter) {

        function _getColumns(userColumns) {
            var colList = [];
            var page = $rootScope.currentPage;
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
            return colList;
        }

        var helperService = {};

        helperService.getColumns = _getColumns;

        return helperService;

    }])