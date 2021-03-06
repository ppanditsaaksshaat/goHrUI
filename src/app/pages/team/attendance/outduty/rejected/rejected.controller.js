/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.outduty.rejected')
        .controller('myTeamRejectedOutDutyController', myTeamRejectedOutDutyController);

    /** @ngInject */
    function myTeamRejectedOutDutyController($scope, $rootScope, pageService, editFormService) {

        var curentDate = new Date();

        $scope.approved = _approved;
        $scope.onhold = _onhold;



        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 39 })
            searchLists.push({ field: 'type', operand: '=', value: 'outduty' })
            searchLists.push({ field: 'month', operand: '=', value: curentDate.getMonth() + 1 })
            searchLists.push({ field: 'year', operand: '=', value: curentDate.getFullYear() })


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
                        data.FADInTime = moment(data.FADInTime).format('HH:mm');
                        data.FDAOutTime = moment(data.FDAOutTime).format('HH:mm');
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
        function _onhold(outDutyAppDetails, form) {
            outDutyAppDetails.StatusId = 89;
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
                    entity.AFDADRemark = oldOutduty.onholdReason;
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
