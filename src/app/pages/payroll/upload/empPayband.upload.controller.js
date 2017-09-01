/**
 * @author deepak.jain
 * created on 12.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.upload')
        .controller('empPaybandUploadController', empPaybandUploadController);

    /** @ngInject */
    function empPaybandUploadController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, $timeout, $filter, $http) {

        $scope.showUploderResult = true;



        /**
         *Private Function
         */

        $scope.downloadTemp = _downloadTemp;





        /**
         * DownLoad Excel Template for Employee Payband
         */
        function _downloadTemp() {
            var tempColumns = [];
            var row = {
                EmployeeCode: 'EmpCode',
                AttendanceDate: 'dd-MMM-yyyy',
                InTime: '(HH:mm)(24 Hr Format)',
                OutTime: '(HH:mm)(24 Hr Format)',
                Remarks: '',
            }
            tempColumns.push(row)
            DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'AttendanceList', false, true, true);
        }



    }
})();