/**
 * @author deepak.jain
 * created on 15.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('filterBox', filterBox);
    /** @ngInject */
    function filterBox($location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'app/common/components/filterBox/filterBox.html',
            require: "^ngController",
            scope: {
                page: '='
            },
            link: function ($scope, elm, attrs, parent) {
                $scope.openSearchFilter = _openSearchFilter;
                $scope.clearFilter = _clearFilter;
                $scope.applyBoxFilter = _applyBoxFilter;

                $scope.filterOpt = {}
                $scope.filterOpt.textbox = [];
                $scope.filterOpt.textbox.push({ value: '=', name: 'equal' });
                $scope.filterOpt.textbox.push({ value: '!=', name: 'not equal' });
                $scope.filterOpt.textbox.push({ value: 'like', name: 'like' });
                $scope.filterOpt.textbox.push({ value: 'notlike', name: 'not like' });
                $scope.filterOpt.textbox.push({ value: 'start', name: 'starts with' });
                $scope.filterOpt.textbox.push({ value: 'end', name: 'ends with' });
                $scope.filterOpt.textbox.push({ value: 'start', name: 'start with' });
                $scope.filterOpt.textbox.push({ value: 'isempty', name: 'empty' });
                $scope.filterOpt.textbox.push({ value: 'isnotempty', name: 'not empty' });

                $scope.filterOpt.select = [];
                $scope.filterOpt.select.push({ value: '=', name: 'equal' });
                $scope.filterOpt.select.push({ value: '!=', name: 'not equal' });
                $scope.filterOpt.select.push({ value: 'isempty', name: 'empty' });
                $scope.filterOpt.select.push({ value: 'isnotempty', name: 'not empty' });
                $scope.filterOpt.select.push({ value: 'in', name: 'in', type:'multiple' });
                $scope.filterOpt.select.push({ value: 'notin', name: 'not in', type:'multiple' });

                $scope.filterOpt.date = [];
                $scope.filterOpt.date.push({ value: '=', name: 'equal', type: 'all' });
                $scope.filterOpt.date.push({ value: '=>', name: 'greater than', type: 'date' });
                $scope.filterOpt.date.push({ value: '<=', name: 'less than', type: 'date' });
                $scope.filterOpt.date.push({ value: 'between_date', name: 'between', type: 'date' });
                $scope.filterOpt.date.push({ value: '=month', name: 'monthly' });


                function _openSearchFilter() {
                    $scope.showSearchFilter = true;
                }
                function _applyBoxFilter() {
                    console.log($scope.page)
                    parent.applyFilter($scope.page.pageinfo.filters);
                }
                function _clearFilter() {
                    $scope.filterData = undefined;
                    angular.forEach($scope.page.pageinfo.filters, function (filter) {
                        filter.showFilter = false;
                        filter.value = undefined;
                        filter.operator = '=';
                    })
                }
            }
        };
    }

})();