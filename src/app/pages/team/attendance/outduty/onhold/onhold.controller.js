/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.onhold')
        .controller('myTeamOnholdOutDutyController', myTeamOnholdOutDutyController);

    /** @ngInject */
    function myTeamOnholdOutDutyController($scope, $rootScope, pageService, editFormService) {
       

        $scope.approved = _approved;
        $scope.rejected = _rejected;

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
            searchLists.push({ field: 'statusId', operand: '=', value: 86})
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
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.FDAFromDate).format('ddd');
                        data.dayToName = moment(data.FDAToDate).format('ddd');
                        data.monthName = moment(data.FDAFromDate).format('MMM');
                        data.dateFrom = moment(data.FDAFromDate).format('DD');
                        data.dateTo = moment(data.FDAToDate).format('DD');
                        data.FADInTime = moment(data.FDAToDate).format('HH:mm');
                        data.FDAOutTime = moment(data.FDAToDate).format('HH:mm');
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


        function _approved(outDutyAppDetails, form) {
            outDutyAppDetails.StatusId = 87;
            outDutyAppDetails.StatusName = "approved";
            _FindEntity(outDutyAppDetails, form);

        }
        function _rejected(outDutyAppDetails, form) {
            outDutyAppDetails.StatusId = 88;
            outDutyAppDetails.StatusName = "onhold";
            _FindEntity(outDutyAppDetails, form);
        }

        function _FindEntity(oldOutduty, form) {
            var searchList = [];
            var searchFields = {
                field: "AFDADFDAId",
                operand: '=',
                value: oldOutduty.FDAId
            }
            searchList.push(searchFields);

            pageService.findEntity(450, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);

            function _findEntitySuccessResult(result) {
                var entity = angular.copy(result);
                entity.StatusId = oldOutduty.StatusId;
                if (oldOutduty.StatusName == "approved") {
                    entity.AFDADRemark = oldOutduty.comment;
                }
                else {
                    entity.AFDADRemark = oldOutduty.rejectReason;
                }
                _submitForm(entity, result, form, oldOutduty.EmpName, oldOutduty.StatusName);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
        }
        function _submitForm(entity, oldentity, form, empName, statusName) {

            editFormService.saveForm(468, entity, oldentity,
                "edit", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Record Updated.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + statusName + " Outduty of " + empName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
