

/**
 * @author pardeep.pandit
 * created on 18.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.employee.empprofile')
        .controller('empExperienceController', empExperienceController);

    /** @ngInject */
    function empExperienceController($scope, $state, $rootScope, $stateParams, pageService,  dialogModal, param) {


        var perTableId = 43;
        var perPageId = 35;
        var jobTableId = 121;
        var jobPageId = 114;
        var basicTableId = 30;
        var basicPageId = 25;

        $scope.udpate = _update;

        $scope.page = $rootScope.createPage();
        $scope.page.pageId = 56;
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: false,
            filterOpened: false,
            showAdd: true,
            showRowMenu: false,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: null,
            editRecord: null,
            updateRecord: null,
            viewRecord: null,
            deleteRecord: null,
            showApplyFilter: false,
            filterOnChange: null,
            showDataOnLoad: true,
            // currentState: 'configuration.company.locations.location'
        }


        function _loadController() {
            $scope.entity = param;
        }

        function _update() {

            var entities = [];
            var job = {
                tableId: jobTableId,
                pkId: $scope.entity.JDId,
                pkColName: 'JDId',
                JDOfficeEmail: $scope.entity.JDOfficeEmail,
                JDOfficeMobile: $scope.entity.JDOfficeMobile,
                JDOfficePhone: $scope.entity.JDOfficePhone,
                JDEmpId: $scope.entity.JDEmpId
            }
            entities.push(job);
            var per = {
                tableId: perTableId,
                pkId: $scope.entity.PdId,
                pkColName: 'PdId',
                PdEmail: $scope.entity.PdEmail,
                PdMobileNo: $scope.entity.PdMobileNo,
                PdResidenceMobile: $scope.entity.PdResidenceMobile,
                PdEmpId: $scope.entity.JDEmpId
            }
            entities.push(per);


            pageService.udateMultiTableFields(entities).then(function (result) {
                if (result.success_message = "Updated") {
                    $scope.modalInstance.close("success");
                }
            }, function (err) {
                console.log(err)
            })

        }
        _loadController();
    }
})()