/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.leave.pending')
        .controller('myTeamPendingLeaveController', myTeamPendingLeaveController);

    /** @ngInject */
    function myTeamPendingLeaveController($scope, $rootScope, pageService, editFormService, dialogModal) {


        $scope.expand = _expand;
        $scope.sameDayApplyLeaves = _sameDayApplyLeaves;
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
            searchLists.push({ field: 'type', operand: '=', value: 'Leave' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allLeaves = result[0];
                    angular.forEach($scope.allLeaves, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.LEADDateFrom).format('ddd');
                        data.dayToName = moment(data.LEADDateTo).format('ddd');
                        data.monthName = moment(data.LEADDateFrom).format('MMM');
                        data.dateFrom = moment(data.LEADDateFrom).format('DD');
                        data.dateTo = moment(data.LEADDateTo).format('DD');
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

        function _expand(fromDate, toDate, empId, index) {

            if ($scope.allLeaves[index].countLeaveForSameDay == undefined) {
                var searchLists = [];
                searchLists.push({ field: 'fromDate', operand: '=', value: fromDate })
                searchLists.push({ field: 'toDate', operand: '=', value: toDate })
                searchLists.push({ field: 'empId', operand: '=', value: empId })

                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                pageService.getCustomQuery(data, 662).then(_getSameDayLeaveApplySuccessResult, _getSameDayLeaveApplyErrorResult)
                function _getSameDayLeaveApplySuccessResult(result) {

                   
                    if (result != "NoDataFound") {
                        $scope.allLeaves[index].otherMembers = result[0];
                    }
                    $scope.allLeaves[index].countLeaveForSameDay = result == "NoDataFound" ? 0 : result[0].length;
                    if ($scope.allLeaves[index].countLeaveForSameDay == 0) {
                        $scope.allLeaves[index].message = 'No other member in your team applied leave ' + (fromDate == toDate ? ' on this day' : ' during this period');
                    }
                    else if ($scope.allLeaves[index].countLeaveForSameDay == 1) {
                        $scope.allLeaves[index].message = $scope.allLeaves[index].countLeaveForSameDay + ' other member in your team applied leave ' + (fromDate == toDate ? ' on this day' : ' during this period');
                    }
                    else {
                        $scope.allLeaves[index].message = $scope.allLeaves[index].countLeaveForSameDay + ' other members in your team applied leave ' + (fromDate == toDate ? ' on this day' : ' during this period');
                    }

                }
                function _getSameDayLeaveApplyErrorResult(err) {
                    console.log(err)
                }
            }
        }
        function _sameDayApplyLeaves(otherMembers) {
            var modal = dialogModal.open({
                url: 'app/pages/team/leave/othermember/othermember.html',
                size: 'top-center-600',
                controller: 'leaveOtherMemberController',
                param: otherMembers
            });

        }
        function _approved(leaveDetails, form) {
            leaveDetails.StatusId = 49;
            leaveDetails.StatusName = "approved";
            _submitForm(leaveDetails, form);

        }
        function _rejected(leaveDetails, form) {
            leaveDetails.StatusId = 48;
            leaveDetails.StatusName = "rejected";
            _submitForm(leaveDetails, form);
        }
        function _onhold(leaveDetails, form) {
            leaveDetails.StatusId = 47;
            leaveDetails.StatusName = "onhold";
            _submitForm(leaveDetails, form);
        }

        function _submitForm(leave, form) {
            var comment = "";
            if (leave.StatusId == 49) {
                comment = leave.comment;
            }
            else if (leave.StatusId == 48) {
                comment = leave.rejectReason;
            }
            else {
                comment = leave.onholdReason;
            }
            var entity = {
                ELSDELAId: leave.LEADId,
                ELSDSanctionFromDate: leave.LEADDateFrom,
                ELSDSanctionToDate: leave.LEADDateTo,
                ELSDSanctionApplyDate: leave.CreatedOn,
                StatusId: leave.StatusId,
                ELSDComment: comment,
                ELSDSanctionLeaveDate: moment().toDate()
            }

            editFormService.saveForm(285, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + leave.StatusName + " leave of " + leave.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
