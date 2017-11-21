/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.employees')
    .controller('addEditEducationDetails', addEditEducationDetails);

  /** @ngInject */
  /** @ngInject */
  function addEditEducationDetails($scope, $stateParams, pageService, DJWebStore, $timeout, param) {
    console.log(param.QualiId)


    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.empPKId = $stateParams.empId;
    vm.tableId = 119;
    vm.pageId = 112;
    var empEducationDetail = {};



    function _loadController() {

      $timeout(function () {
        pageService.getPagData(vm.pageId).then(
          _getPageDataSuccessResult, _getPageDataErrorResult);
      });
    }
    function _getPageDataErrorResult(err) {
    }
    function _getPageDataSuccessResult(result) {
      // $scope.columns = result.pageinfo.columns;
      // console.log(result.pageinfo.columns)
      $scope.qualification = result.pageinfo.selects.QualQualificationId;
      if (param.QualiId != 0) {
        pageService.findEntity(vm.tableId, parseInt(param.QualiId), undefined).then(_educationEntitySuccessResult, _educationEntityErrorResult);
      }

      $scope.tempFormrows = []
      angular.forEach(result.pageinfo.viewform, function (tab) {
        //find rows
        angular.forEach(tab.rows, function (row) {
          //find columns
          angular.forEach(row, function (col) {
            if (col.name != result.pageinfo.idencolname) {
              console.log(col)
              $scope.tempFormrows.push(col);
            }
          })
        })
      })
      console.log($scope.tempFormrows);
    }

    function _educationEntitySuccessResult(result) {
      $scope.empEducationDetail = result;
      vm.oldEntity = result;

    }
    function _educationEntityErrorResult(error) {

    }

    function _setupSaving(dataObject, action) {
      var data = {
        oldEntity: vm.oldEntity != null ? vm.oldEntity : dataObject,
        newEntity: dataObject,
        pageCode: vm.pageId,
        activity: action
      }
      return data;
    }

    $scope.addEducation = function () {
      var education = {
        QualiEmpId: vm.empPKId,
        QualQualificationId: $scope.empEducationDetail.QualQualificationId,
        QualInstititeName: $scope.empEducationDetail.QualInstititeName,
        QualMajorSpecialization: $scope.empEducationDetail.QualMajorSpecialization,
        QualYear: $scope.empEducationDetail.QualYear,
        QualStartDate: $scope.empEducationDetail.QualStartDate,
        QualEndDate: $scope.empEducationDetail.QualEndDate,
        QualGPAScore: $scope.empEducationDetail.QualGPAScore,
      }
      var savingObj = _setupSaving(education, 'create');
      _experienceCreateEdit(savingObj);
    }
    $scope.editEducation = function () {
      var education = {
        QualiId: param.QualiId,
        QualEmpId: vm.empPKId,
        QualQualificationId: $scope.empEducationDetail.QualQualificationId,
        QualInstititeName: $scope.empEducationDetail.QualInstititeName,
        QualMajorSpecialization: $scope.empEducationDetail.QualMajorSpecialization,
        QualYear: $scope.empEducationDetail.QualYear,
        QualStartDate: $scope.empEducationDetail.QualStartDate,
        QualEndDate: $scope.empEducationDetail.QualEndDate,
        QualGPAScore: $scope.empEducationDetail.QualGPAScore,
      }

      var savingObj = _setupSaving(education, 'edit');
      _experienceCreateEdit(savingObj);
    }
    function _experienceCreateEdit(savingObj) {
      pageService.editPageData(vm.pageId, JSON.stringify(savingObj)).then(_createEditSuccessResult, _createEditErrorResult)
    }

    function _createEditSuccessResult(result) {
      $scope.showMsg('success', 'data saved successfully');
    }


    function _createEditErrorResult(error) {
    }



    _loadController();
  }
})();
