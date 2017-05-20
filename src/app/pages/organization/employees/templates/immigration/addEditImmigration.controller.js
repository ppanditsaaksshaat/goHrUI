/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('addEditImmigrationDetails', addEditImmigrationDetails);

  /** @ngInject */
  /** @ngInject */
  function addEditImmigrationDetails($scope, $stateParams, pageService,DJWebStore, $timeout, param) {
    console.log(param.IMId)   
    
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId = $stateParams.empId;
    vm.tableId = 125;
    vm.pageId = 119;
    $scope.empImmigrationDetail = {};
   


 function _loadController() {
     
      $timeout(function () {      
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
    }
    function _getPageDataSuccessResult(result) {
      console.log(result)
        $scope.issuedBy = result.pageinfo.selects.IMIssuedBy;  
      if(param.WEId!=0)
      {
        pageService.findEntity(vm.tableId, parseInt(param.IMId), undefined).then(_immigrationEntitySuccessResult, _immigrationEntityErrorResult);
      }
    }
    function _getPageDataErrorResult(error) {
    }
    function _immigrationEntitySuccessResult(result) {   
       $scope.empImmigrationDetail = result;
       vm.oldEntity=result;
      
     }
     function _immigrationEntityErrorResult(err) {

     }

    function _setupSaving(dataObject,action) {
      var data = {
        oldEntity: vm.oldEntity!=null?vm.oldEntity: dataObject,
        newEntity: dataObject,
        pageCode: vm.pageId,
        activity: action
      }
      return data;
    }

    $scope.addImmigration = function () {
     var immigration={         
           EmpId:vm.empPKId,
           IMPassport:$scope.empImmigrationDetail.IMPassport,
           IMVisa:$scope.empImmigrationDetail.IMVisa,
           IMNumber:$scope.empImmigrationDetail.IMNumber,
           IMIssueDate:$scope.empImmigrationDetail.IMIssueDate,
           IMExpiryDate:$scope.empImmigrationDetail.IMExpiryDate,
           IMEligibleStatus:$scope.empImmigrationDetail.IMEligibleStatus,
           IMIssuedBy:$scope.empImmigrationDetail.IMIssuedBy,
           IMComment:$scope.empImmigrationDetail.IMComment,         
         }
     
      var savingObj = _setupSaving(immigration,'create');
      _experienceCreateEdit(savingObj);     
    }
    function _experienceCreateEdit(savingObj)   {
     pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_createEditSuccessResult, _createEditErrorResult)
    }

    function _createEditSuccessResult(result) {
     
      $scope.showMsg('success', 'data saved successfully');
    }


    function _createEditErrorResult(error) {
    }

    $scope.editImmigration=function(){
      var immigration={  
           IMId:param.IMId,       
           EmpId:vm.empPKId,
           IMPassport:$scope.empImmigrationDetail.IMPassport,
           IMVisa:$scope.empImmigrationDetail.IMVisa,
           IMNumber:$scope.empImmigrationDetail.IMNumber,
           IMIssueDate:$scope.empImmigrationDetail.IMIssueDate,
           IMExpiryDate:$scope.empImmigrationDetail.IMExpiryDate,
           IMEligibleStatus:$scope.empImmigrationDetail.IMEligibleStatus,
           IMIssuedBy:$scope.empImmigrationDetail.IMIssuedBy,
           IMComment:$scope.empImmigrationDetail.IMComment,        
         }

      var savingObj = _setupSaving(immigration,'edit');
      _experienceCreateEdit(savingObj);
    }

   _loadController();
  }
})();
