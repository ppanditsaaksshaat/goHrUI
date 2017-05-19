/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('addEditExperienceDetails', addEditExperienceDetails);

  /** @ngInject */
  /** @ngInject */
  function addEditExperienceDetails($scope, $stateParams, pageService,DJWebStore, $timeout, param) {
    console.log(param)   
    
    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId = $stateParams.empId;
    vm.tableId = 62;
    vm.pageId = 56;
    var nominee = {};
   


 function _loadController() {
     
      $timeout(function () {      
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
    }
    function _getPageDataSuccessResult(result) {
      console.log(result)
        $scope.designation = result.pageinfo.selects.WEDesgId;  
      if(param.WEId!=0)
      {
        pageService.findEntity(56, parseInt(param.WEId), undefined).then(_experienceEntitySuccessResult, _experienceEntityErrorResult);
      }
    }
    function _getPageDataErrorResult(error) {
    }
    function _experienceEntitySuccessResult(result) {   
       $scope.empExperienceDetail = result;
       vm.oldEntity=result;
      
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

    $scope.addExperience = function () {
     var experience={         
           WEEmpId:vm.empPKId,
           WEOrganizName:$scope.empExperienceDetail.WEOrganizName,
           WEFrom:$scope.empExperienceDetail.WEFrom,
           WETo:$scope.empExperienceDetail.WETo,
           WERemark:$scope.empExperienceDetail.WERemark,
           WECompEmail:$scope.empExperienceDetail.WECompEmail,
           WECompContPersName:$scope.empExperienceDetail.WECompContPersName,
           WECompContPersNo:$scope.empExperienceDetail.WECompContPersNo,
           WECompanyAddress:$scope.empExperienceDetail.WECompanyAddress,
           WEDesgId:$scope.empExperienceDetail.WEDesgId,
         }
     
      var savingObj = _setupSaving(experience,'create');
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

    $scope.editExperience=function(){
      var experience={  
           WEId:param.WEId,       
           WEEmpId:vm.empPKId,
           WEOrganizName:$scope.empExperienceDetail.WEOrganizName,
           WEFrom:$scope.empExperienceDetail.WEFrom,
           WETo:$scope.empExperienceDetail.WETo,
           WERemark:$scope.empExperienceDetail.WERemark,
           WECompEmail:$scope.empExperienceDetail.WECompEmail,
           WECompContPersName:$scope.empExperienceDetail.WECompContPersName,
           WECompContPersNo:$scope.empExperienceDetail.WECompContPersNo,
           WECompanyAddress:$scope.empExperienceDetail.WECompanyAddress,
           WEDesgId:$scope.empExperienceDetail.WEDesgId,
         }
      var savingObj = _setupSaving(family,'edit');
      _nomineeCreateEdit(savingObj);
    }

   _loadController();
  }
})();
