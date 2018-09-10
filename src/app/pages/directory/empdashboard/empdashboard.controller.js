/**
 * @author pardeep.pandit
 * created on 14.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.directory.empdashboard')
        .controller('dirDashboardController', dirDashboardController);

    /** @ngInject */
    function dirDashboardController($scope, $state, pageService, dialogModal, $rootScope, createPdfReport) {

        $scope.viewallemployee = _viewallemployee;
        $scope.newListJoins = _newJoins;
        $scope.hasLeft = _hasLeft;
        $scope.birthDay = _birthDay;
        $scope.familyDetail = _familyDetail;



        $scope.newJoinGridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            enableRowHeaderSelection: false,
            columnDefs: [
                { name: 'EmpName', displayName: 'Name', enableCellEdit: false },
                { name: 'JDDate', displayName: 'Joining Date', enableCellEdit: false, visible: false },

            ],
        }
        $scope.birthGridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            columnDefs: [
                { name: 'EmpName', displayName: 'EmpName', enableCellEdit: false },
                { name: 'PdDateOfBirth', displayName: 'DOB', enableCellEdit: false },

            ],
        }
        $scope.leaveingGridOptions = {
            enableCellEditOnFocus: false,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            columnDefs: [
                { name: 'EmpName', displayName: 'Name', enableCellEdit: false },
                { name: 'RDRelievingDate', displayName: 'RelievingDate', enableCellEdit: false },

            ],
        }
        function _loadController() {
            pageService.getPagData(505).then(function (result) {
                console.log(result)
                $scope.selectedDropDown = result;
                console.log($scope.selectedDropDown)
            })
            //  $scope.empBaicDetail = localStorageService.get("empBasicDetailKey");    
            var searchLists = [];

            searchLists.push({ field: 'Type', operand: '=', value: 'dirdashboard' })

            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 656).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            function _getCustomQuerySuccessResult(result) {
                console.log(result);
                $scope.newJoins = result[0];
                $scope.birthAnnList = result[1];
                $scope.leavingEmps = result[2];

            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

        function _viewallemployee() {
            $state.go("directory.employees", { param: 'all' });
        }

        function _birthDay() {
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/directory/empdashboard/list/birthday/birthday.html',
                size: 'top-center-600',
                controller: 'birthDayController',
                param: $scope.birthAnnList
            });
        }

        function _hasLeft() {
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/directory/empdashboard/list/hasleft/hasleft.html',
                size: 'top-center-600',
                controller: 'hasLeftController',
                param: $scope.leavingEmps
            });
        }

        function _newJoins() {
            console.log('emp upload')
            var modal = dialogModal.open({
                url: 'app/pages/directory/empdashboard/list/newjoins/newjoins.html',
                size: 'top-center-600',
                controller: 'newJoinsController',
                param: $scope.newJoins
            });
        }

        function _validateApprovedData() {
            // if ($scope.entity.EmpTypeId == undefined || $scope.entity.EmpTypeId == null || $scope.entity.EmpTypeId == '') {
            //     $scope.showMsg("warning", "Please Select Employment Type");
            //     return true;
            // }
            return false;
        }

        function _familyDetail(reportType) {
            console.log('family detail')
            if (!_validateApprovedData()) {
                var searchLists = [];
                var rptType = '';
                var isHeader = true;
                var pageOrientation = 'landscape'
                var reportName = ''
                if (reportType == 'family') {
                    rptType = 'Family';
                    reportName = 'Family Detail';
                }
                else if (reportType == 'contact') {
                    rptType = 'Contact';
                    reportName = 'Contact Detail';
                }
                else if (reportType == 'education') {
                    rptType = 'Education';
                    reportName = 'Education Detail'
                }
                else if (reportType == 'experience') {
                    rptType = 'Experience';
                    reportName = 'Past Exeperience Detail'
                }
                else if (reportType == 'leave') {
                    rptType = 'Leave';
                    reportName = 'Leave Detail'
                    // isHeader = false;
                }
                else if (reportType == 'location') {
                    rptType = 'Location';
                    isHeader = false;
                    pageOrientation = 'portrait'
                }
                searchLists.push({
                    field: 'ReportType',
                    operand: "=",
                    value: rptType
                })
                searchLists.push({
                    field: 'LoginEmpId',
                    operand: "=",
                    value: $rootScope.user.profile.empId
                })
                if (reportType != 'education') {
                    searchLists.push({
                        field: 'EmpId',
                        operand: "=",
                        value: $rootScope.user.profile.empId
                    })
                }

                console.log(searchLists)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                var data = {
                    data: $scope.pdfRowsData,
                    companyName: $scope.companyName,
                    address: $scope.address,
                    reportType: reportName,
                    pageOrientationType: pageOrientation,
                    pageSize: 'A4',
                    isRowHeader: isHeader,
                    searchData: data,
                    queryId: 667,
                    header: $scope.selectedDropDown.pageinfo.fields,
                    isQuery: 'true'
                }
                createPdfReport.createPdf(data)
            }
        }



        _loadController();
    }
})();

