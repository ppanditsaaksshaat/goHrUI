/**
 * @author pardeep.pandit
 * created on 04.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.attendance.adjustment.rejected')
        .controller('myTeamRejectedAdustmentController', myTeamRejectedAdustmentController);

    /** @ngInject */
    function myTeamRejectedAdustmentController($scope, $rootScope, pageService, editFormService) {


        $scope.manaual = _manaual;
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
            searchLists.push({ field: 'statusId', operand: '=', value: 112 })
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
                        data.ModifiedOn = moment(data.ModifiedOn).format('DD-MMM-YYYY');
                        data.dayFromName = moment(data.ARDFromDate).format('ddd');
                        data.dayToName = moment(data.ARDToDate).format('ddd');
                        data.monthName = moment(data.ARDFromDate).format('MMM');
                        data.dateFrom = moment(data.ARDFromDate).format('DD');
                        data.dateTo = moment(data.ARDToDate).format('DD');
                        data.ARDInTime = moment(data.ARDInTime).format('HH:mm');
                        data.ARDOutTime = moment(data.ARDOutTime).format('HH:mm');
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

        function _manaual(adjustmentApp, form) {
            adjustmentApp.StatusId = 114;
            adjustmentApp.IsManual = true;
            adjustmentApp.StatusName = "approved";
            _FindEntity(adjustmentApp, form);

        }
        function _approved(adjustmentApp, form) {
            adjustmentApp.StatusId = 114;
            adjustmentApp.StatusName = "approved";
            adjustmentApp.IsManual = false;
            _FindEntity(adjustmentApp, form);

        }

        function _onhold(adjustmentApp, form) {
            adjustmentApp.StatusId = 115;
            adjustmentApp.StatusName = "onhold";
            adjustmentApp.IsManual = false;
            _FindEntity(adjustmentApp, form);
        }

        function _FindEntity(oldadustment, form) {
            var searchList = [];
            var searchFields = {
                field: "AARDARDId",
                operand: '=',
                value: oldadustment.ARDId
            }
            searchList.push(searchFields);

            pageService.findEntity(506, undefined, searchList).then(
                _findEntitySuccessResult, _findEntityErrorResult);

            function _findEntitySuccessResult(result) {
                var entity = angular.copy(result);
                entity.StatusId = oldadustment.StatusId;
                entity.AARDInTime = oldadustment.IsManual ? oldadustment.InTime : oldadustment.ARDInTime;
                entity.AARDOutTime = oldadustment.IsManual ? oldadustment.OutTime : oldadustment.ARDOutTime;
                entity.AARDIsManual = oldadustment.IsManual;
                if (oldadustment.StatusName == "approved") {
                    entity.AARDAdminComment = oldadustment.IsManual ? oldadustment.manaualcomment : oldadustment.comment;
                }
                else {
                    entity.AARDAdminComment = oldadustment.onholdReason;
                }
                _submitForm(entity, result, form, oldadustment.EmpName, oldadustment.StatusName);
            }
            function _findEntityErrorResult(err) {
                console.log(err)
            }
        }
        function _submitForm(entity, oldentity, form, empName, statusName) {

            editFormService.saveForm(503, entity, oldentity,
                "edit", "", form, false)
                .then(_successResult, _errorResult)

            function _successResult(result) {
                console.log(result);
                if (result.success_message == "Record Updated.") {
                    _loadController();
                    $rootScope.showMsg("success", "You have " + statusName + " Adustment of " + empName)

                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }
        _loadController();
    }
})();
