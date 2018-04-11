/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.roster')
        .controller('shiftRosterController', shiftRosterController);

    /** @ngInject */
    function shiftRosterController($scope, $rootScope, fileReader, $filter, $uibModal, editFormService,
        pageService, param) {


        var shiftQueryId = 132;
        $scope.save = _save;


        function _loadController() {
            var data = {
                searchList: [],
                orderByList: []
            }
            pageService.getCustomQuery(data, shiftQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
        }
        function _getCustomQuerySuccessResult(result) {
            $scope.shiftList = result;
        }
        function _getCustomQueryErrorResult(err) {

        }
        function _save() {
            if (param != null && param != undefined) {
                if (param.callBack) {
                    if (param.callBack != null) {
                        param.callBack(param.weekOffSet, param.recurring, $scope.shift.Name, $scope.shift.Id);
                    }
                }
            }
            $rootScope.modalInstance.dismiss();
        }

        _loadController();

    }
})();
