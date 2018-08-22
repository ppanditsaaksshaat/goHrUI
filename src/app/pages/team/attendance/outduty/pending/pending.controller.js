/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.pending')
        .controller('myTeamPendingOutDutyController', myTeamPendingOutDutyController);

    /** @ngInject */
    function myTeamPendingOutDutyController($scope, $rootScope, pageService, editFormService) {


      
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
            searchLists.push({ field: 'type', operand: '=', value: 'outduty' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allOutDutyApplication = result[0];
                    angular.forEach($scope.allOutDutyApplication, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.FDAFromDate).format('ddd');
                        data.dayToName = moment(data.FDAToDate).format('ddd');
                        data.monthName = moment(data.FDAFromDate).format('MMM');
                        data.dateFrom = moment(data.FDAFromDate).format('DD');
                        data.dateTo = moment(data.FDAToDate).format('DD');
                        data.FADInTime=moment(data.FADInTime).format('HH:mm');
                        data.FDAOutTime=moment(data.FDAOutTime).format('HH:mm');
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

      
        function _approved(outDutyApp, form) {
            outDutyApp.StatusId = 87;
            outDutyApp.StatusName = "approved";
            _submitForm(outDutyApp, form);

        }
        function _rejected(outDutyApp, form) {
            outDutyApp.StatusId = 88;
            outDutyApp.StatusName = "rejected";
            _submitForm(outDutyApp, form);
        }
        function _onhold(outDutyApp, form) {
            outDutyApp.StatusId = 89;
            outDutyApp.StatusName = "onhold";
            _submitForm(outDutyApp, form);
        }

        function _submitForm(outDuty, form) {
            var comment = "";
            if (outDuty.StatusId == 87) {
                comment = outDuty.comment;
            }
            else if (outDuty.StatusId == 88) {
                comment = outDuty.rejectReason;
            }
            else {
                comment = outDuty.onholdReason;
            }
            var entity = {
                AFDADFDAId: outDuty.FDAId,
                AFDADFDAFromDate: outDuty.FDAFromDate,
                AFDADFDAToDate: outDuty.FDAToDate,
                AFDADFADInTime: outDuty.FADInTime,
                AFDADFDAOutTime: outDuty.FDAOutTime,
                StatusId: outDuty.StatusId,
                AFDADRemark: comment
            }

            editFormService.saveForm(468, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + outDuty.StatusName + " outDuty of " + outDuty.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
