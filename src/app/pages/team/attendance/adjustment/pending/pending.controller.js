/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.pending')
        .controller('myTeamPendingAdustmentController', myTeamPendingAdustmentController);

    /** @ngInject */
    function myTeamPendingAdustmentController($scope, $rootScope, pageService, editFormService) {


      
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
            searchLists.push({ field: 'type', operand: '=', value: 'adjustment' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 663).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allAdustmentApplication = result[0];
                    angular.forEach($scope.allAdustmentApplication, function (data, index) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.ARDFromDate).format('ddd');
                        data.dayToName = moment(data.ARDToDate).format('ddd');
                        data.monthName = moment(data.ARDFromDate).format('MMM');
                        data.dateFrom = moment(data.ARDFromDate).format('DD');
                        data.dateTo = moment(data.ARDToDate).format('DD');
                        data.ARDInTime=moment(data.ARDInTime).format('HH:mm');
                        data.ARDOutTime=moment(data.ARDOutTime).format('HH:mm');
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

      
        function _approved(adjustmentApp, form) {
            adjustmentApp.StatusId = 114;
            adjustmentApp.StatusName = "approved";
            adjustmentApp.IsManual=false;
            _submitForm(adjustmentApp, form);

        }
        function _rejected(adjustmentApp, form) {
            adjustmentApp.StatusId = 116;
            adjustmentApp.StatusName = "rejected";
            adjustmentApp.IsManual=false;
            _submitForm(adjustmentApp, form);
        }
        function _onhold(adjustmentApp, form) {
            adjustmentApp.StatusId = 115;
            adjustmentApp.StatusName = "onhold";
            adjustmentApp.IsManual=false;
            _submitForm(adjustmentApp, form);
        }

        function _submitForm(adjustment, form) {
            var comment = "";
            if (adjustment.StatusId == 114) {
                comment = adjustment.comment;
            }
            else if (adjustment.StatusId == 116) {
                comment = adjustment.rejectReason;
            }
            else {
                comment = adjustment.onholdReason;
            }
            var entity = {
                AARDARDId: adjustment.ARDId,
                AARDFromDate: adjustment.ARDFromDate,
                AARDToDate: adjustment.ARDToDate,
                AARDInTime: adjustment.ARDInTime,
                AARDOutTime: adjustment.ARDOutTime,
                StatusId: adjustment.StatusId,
                AARDAdminComment: comment,
                AARDEmpId:adjustment.EmpId,
                AARDIsManual:adjustment.IsManual
            }

            editFormService.saveForm(503, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + adjustment.StatusName + " adjustment of " + adjustment.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
