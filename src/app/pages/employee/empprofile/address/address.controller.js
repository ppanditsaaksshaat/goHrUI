

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empAddressController', empAddressController);

    /** @ngInject */
    function empAddressController($scope,  $rootScope, $stateParams, pageService, editFormService, param) {


        // global variable declaration

        var empId = $stateParams.empid;
        if (empId == undefined) {
            empId = $rootScope.user.profile.empId;
        }
        var contactPageId = 36;
        var contactTableId = 45;
        $scope.permanentPanel = true;
        $scope.param = param.Current;

        $scope.entity = {
            Current: {}
        };
        var columnIds = ['201', '202', '203', '3202', '3203', '3204'];


        $scope.save = _save;
        $scope.updateForm = _updateForm;


        if (param.Current != undefined) {
            $scope.entity.Current.IsSameAsPermanent = param.Current.IsSameAsPermanent;
        }

        // call on page load
        function _loadController() {
            // pageService.getPagData(contactPageId).then(
            //     _getPageDataSuccessResult, _getPageDataErrorResult);
            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {

                $scope.dropDownLists = result;

                $scope.entity.Current = param.Current;
                if (param.Current != undefined) {
                    if (!param.Current.IsSameAsPermanent) {
                        $scope.entity.Permanent = param.Permanent;
                    }
                }

            }
            function _getAllSelectErrorResult(err) {

            }
        }


        function _updateForm(form) {
            if (param.Current != undefined) {
                var entity = [];
                var fieldList = {
                    tableId: contactTableId,
                    pkId: $scope.entity.Current.CDId,
                    pkColName: 'CDId',
                    CDAddLine1: $scope.entity.Current.CDAddLine1,
                    CDAddLine2: $scope.entity.Current.CDAddLine2,
                    CDCityId: $scope.entity.Current.CityId,
                    CDPincode: $scope.entity.Current.CDPincode,
                    CDPAddLine1: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPAddLine1,
                    CDPAddLine2: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPAddLine2,
                    PCityId: $scope.entity.Current.IsSameAsPermanent ? 0 : $scope.entity.Permanent.PCityId,
                    CDPPincode: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPPincode,
                    IsSameAsPermanent: $scope.entity.Current.IsSameAsPermanent
                }
                entity.push(fieldList)
                pageService.udateMultiTableFields(entity).
                    then(_successResult, _errorResult);

                function _successResult(result) {

                    if (result.success_message = "Updated") {
                        $scope.modalInstance.close("success");
                    }
                }
                function _errorResult(err) {
                    console.log(err);
                }
            }
        }
        function _save(form) {
            var entity = {
                CDEmpId: empId,
                CDAddLine1: $scope.entity.Current.CDAddLine1,
                CDAddLine2: $scope.entity.Current.CDAddLine2,
                CDCityId: $scope.entity.Current.CityId,
                CDPincode: $scope.entity.Current.CDPincode,
                CDPAddLine1: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPAddLine1,
                CDPAddLine2: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPAddLine2,
                PCityId: $scope.entity.Current.IsSameAsPermanent ? 0 : $scope.entity.Permanent.PCityId,
                CDPPincode: $scope.entity.Current.IsSameAsPermanent ? "" : $scope.entity.Permanent.CDPPincode,
                IsSameAsPermanent: $scope.entity.Current.IsSameAsPermanent
            }
            _formSave(entity, contactPageId, 'create', {}, form, false)
        }

        function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation) {
            editFormService.saveForm(pageId, entity, oldEntity,
                action, "", editForm, showConfirmation)
                .then(_successResult, _errorResult)
        }
        function _successResult(result) {
            // console.log(result)
            if (result.success_message == "Added New Record.") {
                $scope.modalInstance.close("success");
            }
        }
        function _errorResult(err) {
            console.log(err)
        }



        _loadController();
    }
})();