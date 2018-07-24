

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('employeeProfileController', employeeProfileController);

    /** @ngInject */
    function employeeProfileController($scope, $state, $stateParams, pageService, dialogModal, localStorageService) {

        var empId = $stateParams.empid;
        $scope.empCurrentAddres = {};
        $scope.empPermanentAddress = {};
        $scope.addPrimaryDetail = _addPrimaryDetail;
        $scope.addContactDetail = _addContactDetail;
        $scope.addAddressDetail = _addAddressDetail;
        $scope.addRelationDetail = _addRelationDetail;
        $scope.addExperienceDetail = _addExperienceDetail;
        $scope.addEducationDetail = _addEducationDetail;
        $scope.addProfessionalDetail = _addProfessionalDetail;




        function _loadController() {
            // $scope.empBasicDetail = localStorageService.get("empBasicDetailKey");
            var searchLists = [];
            searchLists.push({ field: 'EmpId', operand: '=', value: empId })
            searchLists.push({ field: 'Type', operand: '=', value: 'Profile' })
            console.log(searchLists)
            var data = {
                searchList: searchLists,
                orderByList: []
            }
            pageService.getCustomQuery(data, 651).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
         
            function _getCustomQuerySuccessResult(result) {
                console.log(result)
                $scope.empBasicDetail = result[0][0];
                $scope.empCurrentAddress = result[1][0];
                if (!$scope.empCurrentAddress.IsSameAsPermanent) {
                    console.log('not same')
                    $scope.empPermanentAddress = {};
                    $scope.empPermanentAddress = result[2][0];
                }
                else {
                    console.log('SAME')
                    $scope.empPermanentAddress = {};
                    $scope.empPermanentAddress.CDPAddLine1 = $scope.empCurrentAddress.CDAddLine1;
                    $scope.empPermanentAddress.CDPAddLine2 = $scope.empCurrentAddress.CDAddLine2;
                    $scope.empPermanentAddress.CountryName = $scope.empCurrentAddress.CountryName;
                    $scope.empPermanentAddress.StateName = $scope.empCurrentAddress.StateName;
                    $scope.empPermanentAddress.CityName = $scope.empCurrentAddress.CityName;
                    $scope.empPermanentAddress.CDPPincode = $scope.empCurrentAddress.CDPincode;
                }
                $scope.empExperience = result[3];
                $scope.empEducation = result[4];
                $scope.empRelation = result[5];
                $scope.empProfessional = result[6][0];
            }
            function _getCustomQueryErrorResult(err) {
                console.log(err);
            }
        }
        function _addPrimaryDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/primary/primary.html',
                size: 'top-center-600',
                controller: 'empPrimaryController',
                param: $scope.empBasicDetail
            });

            modal.result.then(function (data) {

                console.log(modal)
                console.log(data)
            }, function (err) {
                console.log(err)

            })
        }
        function _addContactDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/contact/contact.html',
                size: 'top-center-600',
                controller: 'empContactController',
                param: $scope.empBasicDetail
            })
            modal.result.finally(function (data) {
                alert(data)
            })

        }
        function _addAddressDetail() {
            var address = {
                Current: $scope.empCurrentAddress,
                Permanent: $scope.empPermanentAddress
            }
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/address/address.html',
                size: 'top-center-650',
                controller: 'empAddressController',
                param: address
            });
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                }
            })
        //    console.log(modal)
        }
        function _addRelationDetail() {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/employee/empprofile/emprelation-modal.html',
                size: 'top-center-600'

            })
        }
        function _addExperienceDetail() {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/employee/empprofile/empexperience-modal.html',
                size: 'top-center-600'
            })
        }
        function _addEducationDetail() {
            $scope.modalInstance = dialogModal.open({
                url: 'app/pages/employee/empprofile/empeducation-modal.html',
                size: 'top-center-600'
            })
        }
        function _addProfessionalDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/professional/professional.html',
                size: 'top-center-600',
                controller: 'empProfessionController',
                param: $scope.empProfessional
            })
            modal.result.finally(function (data) {
                if (data == "success") {
                    _loadController();
                }
            })
        }
        _loadController();
    }
})()