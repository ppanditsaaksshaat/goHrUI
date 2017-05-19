/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('addEmployeeFamilyDetails', addEmployeeFamilyDetails);

  /** @ngInject */
  /** @ngInject */
  function addEmployeeFamilyDetails($scope, $stateParams, pageService,DJWebStore, $timeout, param) {
    console.log(param.FdId)   
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId = $stateParams.empId;
    vm.tableId = 62;
    vm.pageId = 56;
   
    var family = {};
    function _loadController() {
      $timeout(function () {      
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
    }
    function _getPageDataSuccessResult(result) {
      console.log(result)
      vm.designation = result.pageinfo.selects.WEDesgId;  
      // if(param.FdId!=0)
      // {
      //   pageService.findEntity(vm.tableId, parseInt(param.FdId), undefined).then(_experienceEntitySuccessResult, _experienceEntityErrorResult);
      // }
    }
    function _getPageDataErrorResult(error) {
    }
    function _experienceEntitySuccessResult(result) {   
        $scope.family = result;
       vm.oldEntity=result;
       if(param.Action=='view') {
         $scope.name=true;
         $scope.relationship=true;
         $scope.dateofbirth=true;
         $scope.dependent=true;
       }
       else{
          $scope.name=false;
         $scope.relationship=false;
         $scope.dateofbirth=false;
         $scope.dependent=false;
       }
     }
     function _experienceEntityErrorResult(error) {

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

    $scope.addFamily = function () {
      var family = {
        FdEmpId: vm.empPKId,
        FdName: $scope.family.FdName,
        FdRelationshipId: $scope.family.FdRelationshipId,
        FdDateOfBirth: $scope.family.FdDateOfBirth,
        FdDependents: $scope.family.FdDependents,
      }
      var savingObj = _setupSaving(family,'create');
      _familyCreateEdit(savingObj);     
    }
    function _familyCreateEdit(savingObj)   {
     pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_createEditSuccessResult, _createEditErrorResult)
    }

    function _createEditSuccessResult(result) {
      $scope.showMsg('success', 'Employee family member saved successfully');
    }
    function _createEditErrorResult(error) {
    }
    $scope.editFamily=function(){
      var family = {  
        FdId:param.FdId, 
        FdEmpId: vm.empPKId,
        FdName: $scope.family.FdName,
        FdRelationshipId: $scope.family.FdRelationshipId,
        FdDateOfBirth: $scope.family.FdDateOfBirth,
        FdDependents: $scope.family.FdDependents,
      }    
      var savingObj = _setupSaving(family,'edit');
      _familyCreateEdit(savingObj);
    }

    _loadController();
  }
})();
