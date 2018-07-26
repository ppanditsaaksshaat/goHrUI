

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

                $scope.empBasicDetail = result[0][0];
                $scope.empCurrentAddress = result[1][0];
                if (!$scope.empCurrentAddress.IsSameAsPermanent) {

                    $scope.empPermanentAddress = {};
                    $scope.empPermanentAddress = result[2][0];
                }
                else {

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
                $scope.empContact = result[7][0];
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
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Primary Detail Updated');
                }
            })

        }
        function _addContactDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/contact/contact.html',
                size: 'top-center-600',
                controller: 'empContactController',
                param: $scope.empContact
            })
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Contact Detail Updated');
                }
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
                    $scope.showMsg('success', 'Address Detail Updated');
                }
            })

        }
        function _addRelationDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/relation/relation.html',
                size: 'top-center-600',
                controller: 'empRelationController'
            })
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                }
            })
        }
        function _addExperienceDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/experience/experience.html',
                size: 'top-center-600',
                controller: 'empExperienceController',
            })
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                }
            })

        }
        function _addEducationDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/education/education.html',
                size: 'top-center-600',
                controller: 'empEducationController'
            })
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                }
            })

        }
        function _addProfessionalDetail() {
            var modal = dialogModal.open({
                url: 'app/pages/employee/empprofile/professional/professional.html',
                size: 'top-center-600',
                controller: 'empProfessionController',
                param: $scope.empProfessional
            })
            modal.result.then(function (data) {
                if (data == "success") {
                    _loadController();
                    $scope.showMsg('success', 'Professional Detail Updated');
                }
            })
        }
        _loadController();
    }
})()