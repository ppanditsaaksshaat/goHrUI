/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdirectory')
        .controller('empDirectoryController', empDirectoryController);

    /** @ngInject */
    function empDirectoryController($scope, $state, pageService, localStorageService) {


        $scope.getEmployeesStartingWith = _getEmployeesStartingWith;
        $scope.searchEmployee = _searchEmployee;
        $scope.employeedetail = _employeedetail;
        // $scope.getRandomColor = _getRandomColor;
        $scope.employeeList = {};
        console.log($scope.employeeList)

        function _searchEmployee(firstAlpha) {
            firstAlpha = firstAlpha.toUpperCase()
            _getEmployeesStartingWith(firstAlpha)
        }

        function _getEmployeesStartingWith(firstAlpha) {

            if (firstAlpha != "")
                $scope.nameStartsWith = firstAlpha;
            _getEmployeeList(firstAlpha)
        }

        function _loadController() {
            //  _getRandomColor()
            $scope.alphabets = [{ id: "A", text: "A" }, { id: "B", text: "B" }, { id: "C", text: "C" }, { id: "D", text: "D" }, { id: "E", text: "E" },
            { id: "F", text: "F" }, { id: "G", text: "G" }, { id: "H", text: "H" }, { id: "I", text: "I" }, { id: "J", text: "J" },
            { id: "K", text: "K" }, { id: "L", text: "L" }, { id: "M", text: "M" }, { id: "N", text: "N" }, { id: "O", text: "O" },
            { id: "P", text: "P" }, { id: "Q", text: "Q" }, { id: "R", text: "R" }, { id: "S", text: "S" }, { id: "T", text: "T" },
            { id: "U", text: "U" }, { id: "V", text: "V" }, { id: "W", text: "W" }, { id: "X", text: "X" }, { id: "Y", text: "Y" },
            { id: "Z", text: "Z" }]
            $scope.nameStartsWith = 'A';
            _getEmployeeList('A')

        }
        function _getEmployeeList(firstAlpha) {
            firstAlpha = firstAlpha + '%';
            if (firstAlpha != '%') {
                var searchLists = [];
                // var searchListData = { field: 'EmpId', operand: '=',value: vm.empPKId}
                searchLists.push({ field: 'Like', operand: '=', value: firstAlpha })
                searchLists.push({ field: 'EmpId', operand: '=', value: "" })
                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                pageService.getCustomQuery(data, 650).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

                function _getCustomQuerySuccessResult(result) {
                    if (result != 'NoDataFound') {
                        $scope.employeeList = result[0];
                    }

                    else {
                        $scope.employeeList = {};
                    }
                    console.log($scope.employeeList.length)

                }
                function _getCustomQueryErrorResult(err) {
                    console.log(err);
                }
            }
        }

        function _employeedetail(emp) {
            localStorageService.set("empBasicDetailKey", emp);
        }

        _loadController();
    }
})();
