/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.workfromhome.rejected')
        .controller('myTeamRejectedWFHController', myTeamRejectedWFHController);

    /** @ngInject */
    function myTeamRejectedWFHController($scope, $rootScope, pageService, editFormService) {



        $scope.approved = _approved;
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
            searchLists.push({ field: 'statusId', operand: '=', value: 107 })
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
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.WFHFromDate).format('ddd');
                        data.dayToName = moment(data.WFHToDate).format('ddd');
                        data.monthName = moment(data.WFHFromDate).format('MMM');
                        data.dateFrom = moment(data.WFHFromDate).format('DD');
                        data.dateTo = moment(data.WFHToDate).format('DD');
                        data.WFHInTime = moment(data.WFHInTime).format('HH:mm');
                        data.WFHOutTime = moment(data.WFHOutTime).format('HH:mm');
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
            _FindEntity(wfhApp, form);

        }
        function _onhold(wfhApp, form) {
            wfhApp.StatusId = 109;
            wfhApp.StatusName = "onhold";
            _FindEntity(wfhApp, form);
        }

        function _FindEntity(oldWFHApp, form) {
            var searchList = [];
            var searchFields = {
                field: "WAFHWFHId",
                operand: '=',
                value: oldWFHApp.WFHId
            }
            searchList.push(searchFields);

            pageService.findEntity(504, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);

            function _findEntitySuccessResult(result) {
                var entity = angular.copy(result);
                entity.StatusId = oldWFHApp.StatusId;
                if (oldWFHApp.StatusName == "approved") {
                    entity.WAFHAdminReson = oldWFHApp.comment;
                }
                else {
                    entity.WAFHAdminReson = oldWFHApp.onholdReason;
                }
                _submitForm(entity, result, form, oldWFHApp.EmpName, oldWFHApp.StatusName);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
        }

        function _submitForm(entity, oldentity, form, empName, statusName) {

            editFormService.saveForm(501, entity, oldentity,
                "edit", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Record Updated.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + statusName + " compoff of " + empName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
