/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.pending')
        .controller('myTeamPendingWFHController', myTeamPendingWFHController);

    /** @ngInject */
    function myTeamPendingWFHController($scope, $rootScope, pageService, editFormService) {


      
        $scope.approved = _approved;
        $scope.rejected = _rejected;
        $scope.onhold = _onhold;

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            //    console.log(ev)
            //    console.log(to)
            //    console.log(toParams)
            //    console.log(from)
            //    console.log(fromParams)
        });



        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 0 })
            searchLists.push({ field: 'type', operand: '=', value: 'WFH' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allWFHApplication = result[0];
                    angular.forEach($scope.allWFHApplication, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.WFHFromDate).format('ddd');
                        data.dayToName = moment(data.WFHToDate).format('ddd');
                        data.monthName = moment(data.WFHFromDate).format('MMM');
                        data.dateFrom = moment(data.WFHFromDate).format('DD');
                        data.dateTo = moment(data.WFHToDate).format('DD');
                        data.WFHInTime=moment(data.WFHInTime).format('HH:mm');
                        data.WFHOutTime=moment(data.WFHOutTime).format('HH:mm');
                        var spiltName = data.EmpName.split(' ');
                        if (spiltName.length == 3) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[2].substr(0, 1);
                        }
                        else if (spiltName.length == 2) {
                            data.shortName = spiltName[0].substr(0, 1) + spiltName[1].substr(0, 1);
                        }
                        else {
                            data.shortName = spiltName[0].substr(0, 1);
                        }
                    })
                    $scope.noDataFound = false;
                }
                else {
                    $scope.noDataFound = true;
                }


            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }

      
        function _approved(wfhApp, form) {
            wfhApp.StatusId = 108;
            wfhApp.StatusName = "approved";
            _submitForm(wfhApp, form);

        }
        function _rejected(wfhApp, form) {
            wfhApp.StatusId = 110;
            wfhApp.StatusName = "rejected";
            _submitForm(wfhApp, form);
        }
        function _onhold(wfhApp, form) {
            wfhApp.StatusId = 109;
            wfhApp.StatusName = "onhold";
            _submitForm(wfhApp, form);
        }

        function _submitForm(wfh, form) {
            var comment = "";
            if (wfh.StatusId == 108) {
                comment = wfh.comment;
            }
            else if (wfh.StatusId == 110) {
                comment = wfh.rejectReason;
            }
            else {
                comment = wfh.onholdReason;
            }
            var entity = {
                WAFHWFHId: wfh.WFHId,
                WAFHInTime: wfh.WFHInTime,
                WAFHOutTime: wfh.WFHOutTime,
                WAFHFromDate: wfh.WFHFromDate,
                WAFHToDate: wfh.WFHToDate,
                StatusId: wfh.StatusId,
                WAFHAdminReson: comment
            }

            editFormService.saveForm(501, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + wfh.StatusName + " wfh of " + wfh.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
