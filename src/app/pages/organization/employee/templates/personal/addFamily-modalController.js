/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employee')
    .controller('addEmployeeFamilyDetails', addEmployeeFamilyDetails);

  /** @ngInject */
  /** @ngInject */
  function addEmployeeFamilyDetails($scope, $stateParams, mailMessages,
    addModal, pageService, editableOptions, editableThemes, DJWebStore, $timeout,$rootScope) {

    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId= $stateParams.empId;  
    vm.tableId=56;
    vm.pageId=52;
    var family={};

function _loadController(){
     $rootScope.$on("FdId", function(data){
    alert(JSON.stringify(data))
  });
 $timeout(function () {

        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });  
}   
function _getPageDataSuccessResult(result){
    console.log(result)
$scope.relationships=result.pageinfo.selects.FdRelationshipId;
}
function _getPageDataErrorResult(error){
    
}

 function _setupSaving(dataObject) {
        var data = {
            oldEntity: dataObject,
            newEntity: dataObject,
            pageCode: vm.pageId,
            activity: "create"
        }
        return data;
    }

  $scope.addFamily=function() { 
    var family={
    FdEmpId:vm.empPKId,
    FdName:$scope.family.FdName,
    FdRelationshipId:$scope.family.FdRelationshipId,
    FdDateOfBirth:$scope.family.FdDateOfBirth,
    FdDependents:$scope.family.FdDependents,    
   }
      var savingObj = _setupSaving(family);
      pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_createSuccessResult, _createErrorResult)  
  }
  function _createSuccessResult(result)
  {
         $scope.showMsg('success', 'Employee family member added successfully');
  }
  function _createErrorResult(error)
  {
      
  }
 
_loadController(); 
  }
})();
