

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.team.leave')
        .controller('leaveOtherMemberController', leaveOtherMemberController);

    /** @ngInject */
    function leaveOtherMemberController($scope, param) {

        function _loadController() {
            angular.forEach(param, function (data) {
                data.LEADDateFrom = moment(data.LEADDateFrom).format("DD-MMM-YYYY")
                data.LEADDateTo = moment(data.LEADDateTo).format("DD-MMM-YYYY")
            })
            $scope.gridOptions = {
                enableCellEditOnFocus: false,
                enableRowSelection: false,
                enableHorizontalScrollbar: 0,
                enableVerticalScrollbar: 0,
                enableScrollbars: false,
                columnDefs: [
                    { name: 'EmpName', displayName: 'EmpName', width: 150, enableCellEdit: false },
                    { name: 'LEADDateFrom', displayName: 'From', width: 100, enableCellEdit: false },
                    { name: 'LEADDateTo', displayName: 'To', width: 100, enableCellEdit: false },
                    { name: 'LeadComment', displayName: 'Comment', width: 190, enableCellEdit: false },
                    { name: 'MasterStatusName', displayName: 'Status', width: 100, enableCellEdit: false }
                ]
            }         
            $scope.gridOptions.data = param;
        }
        _loadController();
    }
})();