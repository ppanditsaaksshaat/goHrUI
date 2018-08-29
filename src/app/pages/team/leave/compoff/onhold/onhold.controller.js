/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave.compoff.onhold')
        .controller('myTeamOnholdCompOffController', myTeamOnholdCompOffController);

    /** @ngInject */
    function myTeamOnholdCompOffController($scope, $rootScope, pageService, editFormService, dialogModal) {


        var curentDate = new Date();
        
        $scope.approved = _approved;
        $scope.rejected = _rejected;
    


        function _loadController() {
            var searchLists = [];
            searchLists.push({ field: 'headEmpId', operand: '=', value: $rootScope.user.profile.empId })
            searchLists.push({ field: 'statusId', operand: '=', value: 80 })
            searchLists.push({ field: 'type', operand: '=', value: 'Compoff' })
            searchLists.push({ field: 'month', operand: '=', value: curentDate.getMonth() + 1 })
            searchLists.push({ field: 'year', operand: '=', value: curentDate.getFullYear() })


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
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
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
            _FindEntity(compoffDetails, form);

        }

        function _rejected(compoffDetails, form) {
            compoffDetails.StatusId = 74;
            compoffDetails.StatusName = "rejected";
            _FindEntity(compoffDetails, form);
        }
        function _FindEntity(oldCompOff, form) {
            var searchList = [];
            var searchFields = {
                field: "ACODCOId",
                operand: '=',
                value: oldCompOff.COId
            }
            searchList.push(searchFields);

            pageService.findEntity(448, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);

            function _findEntitySuccessResult(result) {
                var entity = angular.copy(result);
                entity.StatusId = oldCompOff.StatusId;
                if (oldCompOff.StatusName == "approved") {
                    entity.ACODReson = oldCompOff.comment;
                }
                else {
                    entity.ACODReson = oldCompOff.onholdReason;
                }
                _submitForm(entity, result, form, oldCompOff.EmpName, oldCompOff.StatusName);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
        }

        function _submitForm(entity, oldentity, form, empName, statusName) {

            editFormService.saveForm(466, entity, oldentity,
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
