/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('addEmployeeNomineeDetails', addEmployeeNomineeDetails);

  /** @ngInject */
  /** @ngInject */
  function addEmployeeNomineeDetails($scope, $stateParams, pageService,DJWebStore, $timeout, param) {
    console.log(param.FdId)   
    alert("nominee")
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId = $stateParams.empId;
    vm.tableId = 113;
    vm.pageId = 438;
    var nominee = {};
   
    function _setupSaving(dataObject,action) {
      var data = {
        oldEntity: vm.oldEntity!=null?vm.oldEntity: dataObject,
        newEntity: dataObject,
        pageCode: vm.pageId,
        activity: action
      }
      return data;
    }

    $scope.addNominee = function () {
      var nominee = {
        NDEmpId: vm.empPKId,
        NDMember: $scope.nominee.NDMember,
        NDType: $scope.nominee.NDType,
        NDPercentage: $scope.nominee.NDPercentage,     
      }
      alert(JSON.stringify(nominee))
      var savingObj = _setupSaving(nominee,'create');
      _nomineeCreateEdit(savingObj);     
    }
    function _nomineeCreateEdit(savingObj)   {
     pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_createEditSuccessResult, _createEditErrorResult)
    }

    function _createEditSuccessResult(result) {
        alert(JSON.stringify(result))
      $scope.showMsg('success', 'data saved successfully');
    }
    function _createEditErrorResult(error) {
    }
    $scope.editFamily=function(){
      var family = { 
        NDId:param.NDId,   
        NDEmpId: vm.empPKId,
        NDMember: $scope.nominee.NDMember,
        NDType: $scope.nominee.NDType,
        NDPercentage: $scope.nominee.NDPercentage,
      }    
      var savingObj = _setupSaving(family,'edit');
      _nomineeCreateEdit(savingObj);
    }

   
  }
})();
