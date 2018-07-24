

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empAddressController', empAddressController);

    /** @ngInject */
    function empAddressController($scope, $state, $stateParams, pageService, editFormService, param) {


        // global variable declaration

        var empId = $stateParams.empid;
        var contactPageId = 36;
        var contactTableId = 45;
        $scope.permanentPanel = true;
        $scope.entity = {
            Current: {}
        };
        var columnIds = ['201', '202', '203', '3202', '3203', '3204'];


        //public function 
       // $scope.sameaspermanent = _sameaspermanent;
        $scope.updateForm = _updateForm;
        $scope.entity.Current.IsSameAsPermanent = param.Current.IsSameAsPermanent;

        // call on page load
        function _loadController() {
            // pageService.getPagData(contactPageId).then(
            //     _getPageDataSuccessResult, _getPageDataErrorResult);
            pageService.getAllSelect(columnIds).then(_getAllSelectSuccessResult, _getAllSelectErrorResult)
            function _getAllSelectSuccessResult(result) {
                console.log(result)
                $scope.dropDownLists = result;
                console.log(param)
                $scope.entity.Current = param.Current;
                if (!param.Current.IsSameAsPermanent) {
                    $scope.entity.Permanent = param.Permanent;
                }
                else{

                }
            }
            function _getAllSelectErrorResult(err) {

            }
        }

        // function _getPageDataSuccessResult(result) {

        //     $scope.pageInfo = result.pageinfo;
        //     $scope.entity.Current = angular.copy(param.Current);
        //     $scope.entity.Permanent = angular.copy(param.Permanent);
        // }
        // function _getPageDataErrorResult(err) {

        // }


        // function _sameaspermanent() {
        //     if ($scope.entity.Current.IsSameAsPermanent) {
        //         $scope.permanentPanel = true;
        //     }
        //     else {
        //         $scope.permanentPanel = false;
        //     }
        // }

        function _updateForm() {

            var fieldList = {
                CDAddLine1: $scope.entity.Current.CDAddLine1,
                CDAddLine2: $scope.entity.Current.CDAddLine2,
                CDCityId: $scope.entity.Current.CityId,
                CDPincode: $scope.entity.Current.CDPincode,
                CDPAddLine1: $scope.entity.Current.IsSameAsPermanent ? undefined : $scope.entity.Permanent.CDPAddLine1,
                CDPAddLine2: $scope.entity.Current.IsSameAsPermanent ? undefined : $scope.entity.Permanent.CDPAddLine2,
                PCityId: $scope.entity.Current.IsSameAsPermanent ? undefined : $scope.entity.Permanent.PCityId,
                CDPPincode: $scope.entity.Current.IsSameAsPermanent ? undefined : $scope.entity.Permanent.CDPPincode,
                IsSameAsPermanent: $scope.entity.Current.IsSameAsPermanent
            }
         
            pageService.updateTableMultiField(contactTableId, 'CDId', $scope.entity.Current.CDId, fieldList).
                then(_successResult, _errorResult);

            function _successResult(result) {
                console.log(result)
                if (result.success_message = "Updated") {
                    $scope.showMsg('success', 'Address Detail Updated');
                    console.log($scope.modalInstance)

                    $scope.modalInstance.close("success");
                }
            }
            function _errorResult(err) {
                console.log(err);
            }

        }


        _loadController();
    }
})()