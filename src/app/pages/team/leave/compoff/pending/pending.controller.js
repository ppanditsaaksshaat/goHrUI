/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.compoff.pending')
        .controller('myTeamPendingCompOffController', myTeamPendingCompOffController);

    /** @ngInject */
    function myTeamPendingCompOffController($scope, $rootScope, pageService, editFormService, dialogModal) {



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
            searchLists.push({ field: 'type', operand: '=', value: 'Compoff' })


            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 661).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                if (result != "NoDataFound") {
                    $scope.allCompOffs = result[0];
                    angular.forEach($scope.allCompOffs, function (data) {
                        data.CreatedOn = moment(data.CreatedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.COAttnDate).format('ddd');
                        data.monthName = moment(data.LEADDateFrom).format('MMM');
                        data.dateFrom = moment(data.COAttnDate).format('DD');
                        data.COTimeIn = moment(data.COTimeIn).format('HH:mm');
                        data.COTimeOut = moment(data.COTimeOut).format('HH:mm');
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


        function _approved(compoffDetails, form) {
            compoffDetails.StatusId = 75;
            compoffDetails.StatusName = "approved";
            _submitForm(compoffDetails, form);

        }
        function _rejected(compoffDetails, form) {
            compoffDetails.StatusId = 74;
            compoffDetails.StatusName = "rejected";
            _submitForm(compoffDetails, form);
        }
        function _onhold(compoffDetails, form) {
            compoffDetails.StatusId = 73;
            compoffDetails.StatusName = "onhold";
            _submitForm(compoffDetails, form);
        }

        function _submitForm(compoff, form) {
            var comment = "";
            if (compoff.StatusId == 75) {
                comment = compoff.comment;
            }
            else if (compoff.StatusId == 74) {
                comment = compoff.rejectReason;
            }
            else {
                comment = compoff.onholdReason;
            }
            var entity = {
                ACODCOId: compoff.COId,
                ACODReson: comment,
                StatusId: compoff.StatusId,
                ACODIsApplyHalfDay: compoff.COIsApplyHalfDay,
                ACODIsApplyFullDay: compoff.COIsApplyFullDay,
            }

            editFormService.saveForm(466, entity, {},
                "create", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Added New Record.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + compoff.StatusName + " compoff leave of " + compoff.EmpName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }

        _loadController();
    }
})();
