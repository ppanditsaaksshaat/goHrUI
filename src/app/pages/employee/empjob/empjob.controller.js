

/**
 * @author pardeep.pandit
 * created on 30.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empjob')
        .controller('empJobController', empJobController);

    /** @ngInject */
    function empJobController($scope, $rootScope, $stateParams, pageService, editFormService) {


        // global variable declaration
        var jobTableId = 121;
        var jobPageId = 114;

        
        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }

        $scope.udpate = _udpate;

        function _loadController() {
            pageService.getPagData(jobPageId).then(_getPageSuccessResult, _getPageErrorResult)
        }
        function _getPageSuccessResult(result) {
            console.log(result)
            $scope.pageInfo = result.pageinfo;
            var searchLists = [];
            var searchListData = {
                field: 'JDEmpId',
                operand: "=",
                value: empId
            }
            searchLists.push(searchListData)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getTableData(jobTableId, jobPageId, '', '', false, data)
                .then(_getTableDataSuccessResult, _getTableDataErrorResult)
        }
        function _getPageErrorResult(err) {
            console.log(err)
        }
        function _getTableDataSuccessResult(result) {
            console.log(result)
            $scope.entity = result[0];
            $scope.oldEntity = angular.copy(result[0])
        }
        function _getTableDataErrorResult(err) {

        }
        function _udpate(entity, editForm) {
            editFormService.saveForm(jobPageId, entity, $scope.oldEntity,
                "edit", "", editForm, false)
                .then(_successResult, _errorResult)
        }
        function _successResult(result) {
       
            if (result.success_message == "Record Updated.") {
                $scope.showMsg("success", "Job Detail Updated")
            }
        }
        function _errorResult(err) {
            console.log(err)
        }
        _loadController();
    }
})()