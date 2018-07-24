/**
 * @author deepak.jain
 * created on 10.05.217
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('iconList', iconList);

    /** @ngInject */
    function iconList($location, $state) {
        return {
            restrict: 'EA',
            templateUrl: 'app/common/components/iconList/iconList.html',
            scope: {
                listItem: '=item'
            },
            link: function ($scope, attrs) {
                console.log('iconlist loaded')

                $scope.tagColumn = attrs.tagColumn;
                $scope.titleColumn = attrs.titleColumn;
                $scope.descColumn = attrs.descColumn;
                $scope.iconBGColor = 'red';
                $scope.isEditAllow = false;
                $scope.isDeleteAllow = false;
                $scope.isViewAllow = false;

                $scope.iconBGColor = '#' + (Math.random() * 0xFFFFFF << 0).toString()

            }
        };
    }

})();