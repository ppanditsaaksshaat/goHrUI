/**
 * @author pardeep.pandit
 * created on 22.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.common.components')
        .directive('fieldBox', fieldBox);
    /** @ngInject */
    function fieldBox($location, $state, $compile, $rootScope) {
        return {
            restrict: 'E',
            require: ['^form', 'ngModel'],
            templateUrl: 'app/common/components/fieldBox/fieldBox.html',
            scope: {
                col: '=ngModel',
                entity: '=ngEntity',
                editForm: '=form'
            },
            link: function ($scope, $elm, $attrs, $ctrl) {

                $elm.bind('click', function (evt) {
                    console.log($ctrl)
                })

            }
        };
    }

})();