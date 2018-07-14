/**
 * @author satyendra.bhan
 * created on 29.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.configuration')
        .controller('configureController', configureController);

    /** @ngInject */
    function configureController($scope, pageService, DJWebStore, $state) {
        // // // console.log('this controller')
        // // // var vm = this;
        // // // var companyPageId = 347;
        // // // var companyTableId = 343;
        // // // var locationPageId = 34;
        // // // var locationTableId = 42;
        // // // var branchPageId = 109;
        // // // var branchTableId = 114;
        // // // var subUnitPageId = 111;
        // // // var subUnitTableId = 116;
        // // // var departmentPageId = 29;
        // // // var departmentTableId = 35;
        // // // var designationPageId = 30;
        // // // var designationTableId = 36;
        // // // var gradeTableId = 52;
        // // // var gradePageId = 47;
        // // // var levelTableId = 78;
        // // // var levelPageId = 74;
        // // // var titleTableId = 31;
        // // // var titlePageId = 24;
        // // // var genderTableId = 38;
        // // // var genderPageId = 31;
        // // // var maritalTableId = 39;
        // // // var maritalPageId = 32;
        // // // var employmentTableId = 40;
        // // // var employmentPageId = 115;
        // // // var categoryTableId = 251;
        // // // var categoryPageId = 46;
        // // // var empStatusTableId = 58;
        // // // var empStatusPageId = 54;
        // // // var relationshipTableId = 55;
        // // // var relationshipPageId = 51;
        // // // var bankBranchTableId = 44;
        // // // var bankBranchPageId = 37;
        // // // var qualificationTableId = 46;
        // // // var qualificationPageId = 38;
        // // // var otherQualTableId = 48;
        // // // var otherQualPageId = 43;
        // // // var skillTableId = 50;
        // // // var skillPageId = 45;
        // // // var benifitTableId = 424;
        // // // var benifitPageId = 447;

        // // // $scope.entity = {};

        // // // $scope.openConfigure = openConfigure;




        // // // function _loadController() {
        // // //     pageService.getTableData(companyTableId, companyPageId, undefined, undefined, undefined, undefined).then(_successCompanyGetPageData, _errorCompanyGetPageData)
        // // //     pageService.getTableData(locationTableId, locationPageId, undefined, undefined, undefined, undefined).then(_successLocationGetPageData, _errorLocationGetPageData)
        // // //     pageService.getTableData(branchTableId, branchPageId, undefined, undefined, undefined, undefined).then(_successBranchGetPageData, _errorBranchGetPageData)
        // // //     pageService.getTableData(subUnitTableId, subUnitPageId, undefined, undefined, undefined, undefined).then(_successSubUnitGetPageData, _errorSubUnitGetPageData)
        // // //     pageService.getTableData(departmentTableId, departmentPageId, undefined, undefined, undefined, undefined).then(_successDepartmentGetPageData, _errorDepartmentGetPageData)
        // // //     pageService.getTableData(designationTableId, designationPageId, undefined, undefined, undefined, undefined).then(_successDesignationGetPageData, _errorDesignationGetPageData)
        // // //     pageService.getTableData(gradeTableId, gradePageId, undefined, undefined, undefined, undefined).then(_successGradeGetPageData, _errorGradeGetPageData)
        // // //     pageService.getTableData(levelTableId, levelPageId, undefined, undefined, undefined, undefined).then(_successlevelGetPageData, _errorlevelGetPageData)
        // // //     pageService.getTableData(titleTableId, titlePageId, undefined, undefined, undefined, undefined).then(_successtitleGetPageData, _errortitleGetPageData)
        // // //     pageService.getTableData(genderTableId, genderPageId, undefined, undefined, undefined, undefined).then(_successGenderGetPageData, _errorGenderGetPageData)
        // // //     pageService.getTableData(maritalTableId, maritalPageId, undefined, undefined, undefined, undefined).then(_successMaritalGetPageData, _errorMaritalGetPageData)
        // // //     pageService.getTableData(employmentTableId, employmentPageId, undefined, undefined, undefined, undefined).then(_successEmploymentGetPageData, errorEmploymentGetPageDat)
        // // //     pageService.getTableData(categoryTableId, categoryPageId, undefined, undefined, undefined, undefined).then(_successCategoryGetPageData, _errorCategoryGetPageData)
        // // //     pageService.getTableData(empStatusTableId, empStatusPageId, undefined, undefined, undefined, undefined).then(_successEmpStatusGetPageData, _errorEmpStatusGetPageData)
        // // //     pageService.getTableData(relationshipTableId, relationshipPageId, undefined, undefined, undefined, undefined).then(_successRelatioshipGetPageData, _errorRelationshipGetPageData)
        // // //     pageService.getTableData(bankBranchTableId, bankBranchPageId, undefined, undefined, undefined, undefined).then(_successBankBranchGetPageData, _errorBankBranchGetPageData)
        // // //     pageService.getTableData(qualificationTableId, qualificationPageId, undefined, undefined, undefined, undefined).then(_successQualificationGetPageData, _errorQualificationGetPageData)
        // // //     pageService.getTableData(otherQualTableId, otherQualPageId, undefined, undefined, undefined, undefined).then(_successOtherQualGetPageData, _errorOtherQualGetPageData)
        // // //     pageService.getTableData(skillTableId, skillPageId, undefined, undefined, undefined, undefined).then(_successskillGetPageData, _errorskillGetPageData)
        // // //     pageService.getTableData(benifitTableId, benifitPageId, undefined, undefined, undefined, undefined).then(_successbenifitGetPageData, _errorbenifitGetPageData)
        // // // }



        // // // $scope.configureList = [];
        // // // $scope.configureList.push({ id: 0, name: "company", href: "organization.company.list()", heading: "Company", paragraph: "Company Master", show: "companyExist", logo: "fa fa-check fa-2x" })
        // // // $scope.configureList.push({ id: 1, name: "location", href: "organization.employees.masters()", heading: "Location", paragraph: "Location Master", show: "locationExist", logo: "fa fa-anchor fa-2x" })
        // // // $scope.configureList.push({ id: 2, name: "branch", href: "organization.employees.masters.list({name:'branch',pageId:109})", heading: "Branch", paragraph: "Branch Master", show: "branchExist", logo: "fa fa-cogs fa-2x" })
        // // // $scope.configureList.push({ id: 3, name: "subunit", href: "organization.employees.masters.list({name:'sub-unit',pageId:111})", heading: "SubUnit", paragraph: "SubUnit Master", show: "subUnitExist", logo: "fa fa-info fa-2x" })
        // // // $scope.configureList.push({ id: 4, name: "department", href: "organization.employees.masters.list({name: 'department', pageId:29})", heading: "Department", paragraph: "Department Master", show: "departmentExist", logo: "fa fa-globe fa-2x" })
        // // // $scope.configureList.push({ id: 5, name: "designation", href: "organization.employees.masters.list({name: 'designation', pageId:30})", heading: "Designation", paragraph: "Designation Master", show: "designationExist", logo: "fa fa-flask fa-2x" })
        // // // $scope.configureList.push({ id: 6, name: "grade", href: "organization.employees.masters.list({name: 'grades', pageId:47})", heading: "Grade", paragraph: "Grade Master", show: "gradesExist", logo: "fa fa-subway fa-2x" })
        // // // $scope.configureList.push({ id: 7, name: "level", href: "organization.employees.masters.list({name: 'levels', pageId:48})", heading: "Level", paragraph: "Level Master", show: "levelsExist", logo: "fa fa-empire fa-2x" })
        // // // $scope.configureList.push({ id: 8, name: "title", href: "organization.employees.masters.list({name: 'titles', pageId:24})", heading: "Title", paragraph: "Title Master", show: "titleExist", logo: "fa fa-umbrella fa-2x" })
        // // // $scope.configureList.push({ id: 9, name: "gender", href: "organization.employees.masters.list({name: 'gender', pageId:31})", heading: "Gender", paragraph: "Gender Master", show: "genderExist", logo: "fa fa-tint fa-2x" })
        // // // $scope.configureList.push({ id: 10, name: "marital", href: "organization.employees.masters.list({name: 'marital', pageId:32})", heading: "Marital Status", paragraph: "Marital Status Master", show: "maritalExist", logo: "fa fa-magnet fa-2x" })
        // // // $scope.configureList.push({ id: 11, name: "employement", href: "organization.employees.masters.list({name: 'emptype', pageId:115})", heading: "Employement", paragraph: "Employement Master", show: "employementExist", logo: "fa fa-sliders fa-2x" })
        // // // $scope.configureList.push({ id: 12, name: "category", href: "organization.employees.masters.list({name: 'category', pageId:46})", heading: "Category", paragraph: "Category Master", show: "categoryExist", logo: "fa fa-star fa-2x" })
        // // // $scope.configureList.push({ id: 13, name: "empStatus", href: "organization.employees.masters.list({name: 'empstat', pageId:54})", heading: "Employee Status", paragraph: "Employee Status Master", show: "empStatExist", logo: "fa fa-rocket fa-2x" })
        // // // $scope.configureList.push({ id: 14, name: "relationship", href: "organization.employees.masters.list({name: 'relationship', pageId:51})", heading: "Relationship", paragraph: "Relationship Master", show: "relationshipExist", logo: "fa fa-car fa-2x" })
        // // // $scope.configureList.push({ id: 15, name: "bankBranch", href: "organization.employees.masters.list({name: 'bank-branch', pageId:37})", heading: "Bank Branch", paragraph: "Bank Branch Master", show: "bankBranchExist", logo: "fa fa-money fa-2x" })
        // // // $scope.configureList.push({ id: 16, name: "qualification", href: "organization.employees.masters.list({name: 'qualification', pageId:38})", heading: "Qualification", paragraph: "Qualification Master", show: "qualificationExist", logo: "fa fa-shield fa-2x" })
        // // // $scope.configureList.push({ id: 17, name: "otherQual", href: "organization.employees.masters.list({name: 'other-qualification', pageId:43})", heading: "Other Qualification", paragraph: "Other Qualification Master", show: "otherQualExist", logo: "fa fa-certificate fa-2x" })
        // // // $scope.configureList.push({ id: 18, name: "benefit", href: "organization.employees.masters.list({name: 'skill', pageId:45})", heading: "Skill", paragraph: "Skill Master", show: "skillExist", logo: "fa fa-server fa-2x" })
        // // // $scope.configureList.push({ id: 19, name: "benefit", href: "organization.employees.masters.list({name: 'benefit', pageId:447})", heading: "Benefit", paragraph: "Benefit Master", show: "benefitExist", logo: "fa fa-cubes fa-2x" })



        // // // function _successCompanyGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.companyExist = true;
        // // //     } else {
        // // //         $scope.companyExist = false;
        // // //     }
        // // // }
        // // // function _errorCompanyGetPageData(err) {

        // // // }

        // // // function _successLocationGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.locationExist = true;
        // // //     } else {
        // // //         $scope.locationExist = false;
        // // //     }
        // // // }
        // // // function _errorLocationGetPageData(err) {

        // // // }
        // // // function _successBranchGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.branchExist = true;
        // // //     } else {
        // // //         $scope.branchExist = false;
        // // //     }
        // // // }
        // // // function _errorBranchGetPageData(err) {

        // // // }

        // // // function _successSubUnitGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.subUnitExist = true;
        // // //     } else {
        // // //         $scope.subUnitExist = false;
        // // //     }
        // // // }
        // // // function _errorSubUnitGetPageData(err) {

        // // // }

        // // // function _successDepartmentGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.departmentExist = true;
        // // //     } else {
        // // //         $scope.departmentExist = false;
        // // //     }
        // // // }
        // // // function _errorDepartmentGetPageData(err) {

        // // // }

        // // // function _successDesignationGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.designationExist = true;
        // // //     } else {
        // // //         $scope.designationExist = false;
        // // //     }
        // // // }
        // // // function _errorDesignationGetPageData(err) {

        // // // }
        // // // function _successGradeGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.gradeExist = true;
        // // //     } else {
        // // //         $scope.gradeExist = false;
        // // //     }
        // // // }
        // // // function _errorGradeGetPageData(err) {

        // // // }
        // // // function _successlevelGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.levelsExist = true;
        // // //     } else {
        // // //         $scope.levelsExist = false;
        // // //     }
        // // // }
        // // // function _errorlevelGetPageData(err) {

        // // // }

        // // // function _successtitleGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.titleExist = true;
        // // //     } else {
        // // //         $scope.titleExist = false;
        // // //     }
        // // // }
        // // // function _errortitleGetPageData(err) {

        // // // }

        // // // function _successGenderGetPageData(result) {
        // // //     configureController.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.genderExist = true;
        // // //     } else {
        // // //         $scope.genderExist = false;
        // // //     }
        // // // }
        // // // function _errorGenderGetPageData(err) {

        // // // }

        // // // function _successMaritalGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.maritalExist = true;
        // // //     } else {
        // // //         $scope.maritalExist = false;
        // // //     }
        // // // }
        // // // function _errorMaritalGetPageData(err) {

        // // // }

        // // // function _successEmploymentGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.employmentExist = true;
        // // //     } else {
        // // //         $scope.employmentExist = false;
        // // //     }
        // // // }
        // // // function errorEmploymentGetPageDat(err) {

        // // // }

        // // // function _successCategoryGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.categoryExist = true;
        // // //     } else {
        // // //         $scope.categoryExist = false;
        // // //     }
        // // // }
        // // // function _errorCategoryGetPageData(err) {

        // // // }

        // // // function _successEmpStatusGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.empStatExist = true;
        // // //     } else {
        // // //         $scope.empStatExist = false;
        // // //     }
        // // // }
        // // // function _errorEmpStatusGetPageData(err) {

        // // // }

        // // // function _successRelatioshipGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.relationshipExist = true;
        // // //     } else {
        // // //         $scope.relationshipExist = false;
        // // //     }
        // // // }
        // // // function _errorRelationshipGetPageData(err) {

        // // // }

        // // // function _successBankBranchGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.bankBranchExist = true;
        // // //     } else {
        // // //         $scope.bankBranchExist = false;
        // // //     }
        // // // }
        // // // function _errorBankBranchGetPageData(err) {

        // // // }

        // // // function _successQualificationGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.qualificationExist = true;
        // // //     } else {
        // // //         $scope.qualificationExist = false;
        // // //     }
        // // // }
        // // // function _errorQualificationGetPageData(err) {

        // // // }

        // // // function _successOtherQualGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.otherQualExist = true;

        // // //     } else {
        // // //         $scope.otherQualExist = false;
        // // //     }
        // // // }
        // // // function _errorOtherQualGetPageData(err) {

        // // // }

        // // // function _successskillGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         $scope.skillExist = true;
        // // //     } else {
        // // //         $scope.skillExist = false;
        // // //     }
        // // // }
        // // // function _errorskillGetPageData(err) {

        // // // }

        // // // function _successbenifitGetPageData(result) {
        // // //     console.log(result);
        // // //     if (result.length > 0) {
        // // //         scope.benefitExist = true;
        // // //     } else {
        // // //         $scope.benefitExist = false;
        // // //     }
        // // // }
        // // // function _errorbenifitGetPageData(err) {

        // // // }
        // // // // function _successSubUnitGetPageData(result) {
        // // // //   console.log(result)
        // // // //   $scope.subUnitPage = result;
        // // // //   $scope.subUnitPage.isAllowEdit = true;
        // // // // }
        // // // // function _errorSubUnitGetPageData(err) {

        // // // // }

        // // // // function _saveWizardForm(entity){
        // // // //   alert('satyendra')
        // // // // }


        // // // function openConfigure(name) {
        // // //     // if (name == "location" || name == "branch" || name == "subunit" || name == "department" || name == "designation" || name ==) {
        // // //     DJWebStore.SetValue("configuration", true);
        // // //     // }

        // // // }


        // // // _loadController();
    }
})();
