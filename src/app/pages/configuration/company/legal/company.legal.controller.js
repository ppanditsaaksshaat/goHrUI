/**
 * @author deepak.jain
 * created on 13.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration.company.legal')
        .controller('legalController', legalController);

        /** @ngInject */
        function legalController($scope, dialogModal) {
        //    console.log($state)

        $scope.companyList = [];

        $scope.companyList.push({name:'Saaksshaat Infotech'});

        $scope.comp={name:'Saaksshaat Infotech'};
        $scope.edtiCompanyName = function () {

            $scope.modalInstance =   dialogModal.open({
                url:'app/pages/configuration/company/legal/edit-company-name.html'
            })
        
        };
        $scope.addNewSignatory = function(){
            $scope.modalInstance = dialogModal.open({
                url:'app/pages/configuration/company/legal/edit-signatory.html',
                size:'top-center-600'
            })
        }
        $scope.addBankAccount = function(){
            $scope.modalInstance = dialogModal.open({
                url:'app/pages/configuration/company/legal/edit-bank-account.html',
                size:'top-center-600'
            })
        }
        $scope.updateEntity = function(){
            $scope.modalInstance.$dismiss();
        }
    }
   
})();
