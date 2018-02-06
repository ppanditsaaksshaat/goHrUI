/**
 * @author pradeep.pandit
 * created on 16.05.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.employees')
        .controller('empTabController', empTabController);

    /** @ngInject */
    /** @ngInject */
    function empTabController($scope, $stateParams, pageService, $timeout, $uibModal, dialogModal,
        toastrConfig, toastr, $state, editFormService, $filter) {
        console.log('empTabController')


        var benefintSavecount = 0;//for counting saving record of benefits
        var totalSavingRecord = 0;//for totaling of saving record of benefits

        var toastOption = {};
        var defaultConfig = angular.copy(toastrConfig);
        var openedToasts = [];
        toastOption = {
            autoDismiss: false,
            positionClass: 'toast-top-center',
            type: 'success',
            timeOut: '5000',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: true,
            tapToDismiss: true,
            progressBar: true,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "",
            msg: ""
        };
        var vm = this;
        $scope.entity = {}
        $scope.page = { isAllowEdit: false };
        $scope.contactPage = { isAllowEdit: false };
        $scope.emgContactPage = { isAllowEdit: false };
        $scope.showResignation = true;
        vm.entity = {};


        vm.empContactDetail = {};
        vm.pageIds = {
            familyPageId: "52", nomineePageId: "438", experiencPageId: "56", contactPageId: "36",
            emgContactPageId: "53", educationPageId: "112", skillPageId: "439", immigrationPageId: "119"
        }
        vm.empEmgContact = {};
        vm.pageId = $stateParams.pageId;
        vm.empPKId = $stateParams.empId;
        vm.tempName = $stateParams.name;
        vm.saveForm = _saveForm;
        vm.saveAddress = _saveAddress;
        vm.saveFormCommon = _saveFormCommon;
        vm.resetFormCommon = _resetFormCommon;
        vm.clearFormCommon = _clearFormCommon;
        vm.goToEmployeeList = _goToEmployeeList;
        vm.permanentAddress = _permanentAddress;
        $scope.manageNoticeDayOnResignDate = _manageNoticeDayOnResignDate;
        $scope.changeNoticeDayOnFromDate = _changeNoticeDayOnFromDate;
        $scope.saveResignation = _saveResignation;
        $scope.resignList = _resignList;
        $scope.payByEmpOnChange = _payByEmpOnChange;
        $scope.setProbetionDate = _setProbetionDate;
        $scope.setProbetionDateOnJoininDate = _setProbetionDateOnJoininDate;

        function _setProbetionDateOnJoininDate() {
            if ($scope.empTabCtrl.entity.JDProbationValidity !== undefined) {
                if ($scope.empTabCtrl.entity.JDProbationValidity != null) {
                    if ($scope.empTabCtrl.entity.JDNumberOfProbationInDays !== undefined) {
                        if ($scope.empTabCtrl.entity.JDNumberOfProbationInDays != null) {
                            var installmentDate = moment($scope.empTabCtrl.entity.JDDate)
                            $scope.empTabCtrl.entity.JDProbationValidity = installmentDate.add($scope.empTabCtrl.entity.JDNumberOfProbationInDays, 'd')

                        }
                    }
                }
            }
        }


        function _setProbetionDate() {
            if ($scope.empTabCtrl.entity.JDDate !== undefined) {
                if ($scope.empTabCtrl.entity.JDDate != null) {

                    var installmentDate = moment($scope.empTabCtrl.entity.JDDate)
                    $scope.empTabCtrl.entity.JDProbationValidity = installmentDate.add($scope.empTabCtrl.entity.JDNumberOfProbationInDays, 'd')

                }
                else {
                    $scope.showMsg("error", "please provide employee joining date.")
                    // alert('please provide employee joining date.')
                }
            }
            else {
                $scope.showMsg("error", "please provide employee joining date.")
            }

        }


        function _goToEmployeeList() {
            $state.go("organization.employees.list");
        }
        function _showToast(type, msg, title) {
            toastOption.type = type;
            angular.extend(toastrConfig, toastOption);
            openedToasts.push(toastr[toastOption.type](msg, title));
        }
        function _loadController() {
            $scope.gridOptions = $scope.getGridSetting();
            // $scope.gridOptions.onRegisterApi = _onRegisterApi;
            $scope.gridOptions.columnDefs = [];
            $scope.gridOptions.data = [];
            var rndValu = Math.round((Math.random() * 10) * 10);
            var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
            vm.templateUrlPath = "app/pages/organization/employees/templates/" + vm.tempName + "/" + vm.tempName + "-view.html";

            $scope.page.pageIsLoaded = false;
            $scope.page.pageIsLoading = true;
            console.log($scope.page)
            if (vm.pageId == 114 || vm.pageId == 35 || vm.pageId == 125 || vm.pageId == 36 || vm.pageId == 21) {
                if (vm.pageId == 114 || vm.pageId == 36 || vm.pageId == 125 || vm.pageId == 21) {
                    $timeout(function () {
                        pageService.getPagData(vm.pageId).then(
                            _getPageDataSuccessResult, _getPageDataErrorResult);

                    });
                }
                if (vm.pageId == 35) {
                    $timeout(function () {
                        pageService.getPagData(vm.pageId).then(
                            _getPageDataSuccessResult, _getPageDataErrorResult);
                        pageService.getPagData(vm.pageIds.emgContactPageId).then(
                            _getPageDataSuccessResult, _getPageDataErrorResult);
                    })
                }
                if (vm.pageId == 125) {
                    var isBenifitSalaryHeadQueryId = 559;
                    var searchLists = [];
                    // var searchListData = { field: 'EmpId', operand: '=',value: vm.empPKId}
                    searchLists.push({ field: 'EmpId', operand: '=', value: vm.empPKId })
                    searchLists.push({ field: 'SHIsBenefit', operand: '=', value: 1 })
                    console.log(searchLists)
                    var data = {
                        searchList: searchLists,
                        orderByList: []
                    }
                    pageService.getCustomQuery(data, isBenifitSalaryHeadQueryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
                }
            }
            else {
                // vm.templateUrlPath = "app/pages/organization/employees/templates/grid-view.html?" + rndValu2 + "=" + rndValu;
                // console.log(vm.empPKId)
                // $scope.page = _getLocalPageObject(vm.pageId, 'WEEmpId', vm.guempPKId)

                if (vm.pageId != 360 && vm.pageId != 'entitlement') {
                    if (vm.pageId != 188) {
                        vm.templateUrlPath = "app/pages/organization/employees/templates/grid-view.html";
                        $scope.page = _getLocalPageObject(vm.pageId)
                        console.log($scope.page);
                    }
                    if (vm.pageId == 'register') {
                        vm.templateUrlPath = "app/pages/organization/employees/templates/user/user-view.html";
                    }
                }

                else {

                    $scope.page = _getLocalPageObject(vm.pageId)
                    console.log($scope.page)

                }
            }
        }

        function _getCustomQuerySuccessResult(result) {
            console.log(result)
            if (result !== "NoDataFound") {
                var colSalaryHead = { name: 'SHName', field: 'SHName', displayName: 'Salary Head', width: 100, visible: true };
                var colSalaryAmount = { name: 'SalAmount', field: 'SalAmount', displayName: 'Account Number', width: 100, visible: true };
                $scope.gridOptions.columnDefs.push(colSalaryHead);
                $scope.gridOptions.columnDefs.push(colSalaryAmount);

                $scope.gridOptions.data = result;
                console.log($scope.gridOptions.data)
            }
        }

        function _getCustomQueryErrorResult(result) {
            console.log(result);
        }


        function _getPageDataSuccessResult(result) {

            console.log(result)
            if (result) {
                if (result.pageinfo) {
                    if (result.fields) {

                        if (result.pageinfo.fields.PdDateOfBirth) {
                            result.pageinfo.fields.PdDateOfBirth.maxDate = 'today';
                        }

                    }
                }
            }

            if (result.pageinfo.pageid == 36) {

                $scope.contactPage = angular.extend({}, $scope.contactPage, result);
                $scope.contactPage.pageIsLoaded = true;
                $scope.contactPage.pageIsLoading = false;
            }
            if (result.pageinfo.pageid == 53) {

                $scope.emgContactPage = angular.extend({}, $scope.emgContactPage, result);
                $scope.emgContactPage.pageIsLoaded = true;
                $scope.emgContactPage.pageIsLoading = false;
            }
            $scope.page = angular.extend({}, $scope.page, result);
            $scope.page.pageIsLoaded = true;
            $scope.page.pageIsLoading = false;
            var linkFieldName;
            if (result.pageinfo.pageid == 114) {

                console.log(result.pageinfo.selects)
                console.log(result.pageinfo.selects.BRId)
                if (result.pageinfo.selects.LocationId.length == 1) {
                    $scope.entity.LocationId = result.pageinfo.selects.LocationId[1].value;
                }
                if (result.pageinfo.selects.BRId.length == 1) {
                    $scope.entity.BRId = result.pageinfo.selects.BRId[1].value;
                }
                if (result.pageinfo.selects.JDSubUnitID.length == 1) {
                    $scope.entity.JDSubUnitID = result.pageinfo.selects.JDSubUnitID[1].value;
                }
                linkFieldName = 'JDEmpId';
            } else if (result.pageinfo.pageid == 35) {
                linkFieldName = 'PdEmpId';
            } else if (result.pageinfo.pageid == 125) {
                linkFieldName = 'ADEmpId';
            } else if (result.pageinfo.pageid == 21) {
                linkFieldName = 'EmpId';
            }




            $timeout(function () {
                if (result.pageinfo.pageid == 114 || result.pageinfo.pageid == 125 || result.pageinfo.pageid == 21) {
                    var searchList = [];
                    var searchFields = {
                        field: linkFieldName,
                        operand: '=',
                        value: vm.empPKId
                    }
                    searchList.push(searchFields);
                    console.log(searchList)

                    pageService.findEntity($scope.page.pageinfo.tableid, undefined, searchList).then(
                        _findEntitySuccessResult, _findEntityErrorResult);
                }
                if (result.pageinfo.pageid == 35 || result.pageinfo.pageid == 36) {
                    var emgTableId = 57, contTableId = 45, personalTableId = 43;
                    var searchList = [];
                    $scope.entity.PDAnniversaryDate = moment().format('DD/MMMM/YYYY');
                    if (result.pageinfo.pageid == 35) {
                        var searchFields = {
                            field: linkFieldName,
                            operand: '=',
                            value: vm.empPKId
                        }
                        searchList.push(searchFields);
                        console.log(searchList)

                        pageService.findEntity(personalTableId, undefined, searchList).then(
                            _findEntitySuccessResult, _findEntityErrorResult);

                        //call emg contact entity
                        searchList = [];
                        searchFields = {
                            field: 'ECEmpId',
                            operand: '=',
                            value: vm.empPKId
                        }
                        searchList.push(searchFields);
                        pageService.findEntity(emgTableId, undefined, searchList).then(
                            _findEntitySuccessResult, _findEntityErrorResult);
                    }
                    else {

                        //call contact address entity
                        searchList = [];
                        searchFields = {
                            field: 'CDEmpId',
                            operand: '=',
                            value: vm.empPKId
                        }
                        searchList.push(searchFields);
                        pageService.findEntity(contTableId, undefined, searchList).then(
                            _findEntitySuccessResult, _findEntityErrorResult);
                    }
                }
            })
        }
        function _getPageDataErrorResult(error) {
            $scope.page.pageIsLoaded = true;
            $scope.page.pageIsLoading = false;
        }
        function _getLocalPageObject(pageId) {

            var linkFieldName, linkFieldValue;
            linkFieldValue = vm.empPKId;
            pageId = parseInt(pageId);
            switch (pageId) {
                case 56://experience
                    linkFieldName = 'WEEmpId'
                    break;
                case 112://education
                    linkFieldName = 'QualiEmpId'
                    break;
                case 439://skills
                    linkFieldName = 'SEmpId'
                    break;
                case 119://immigration
                    linkFieldName = 'EmpId'
                    break;
                case 360://regination
                    linkFieldName = 'RDEmpId'
                    break;
                case 36://salary
                    linkFieldName = ''
                    break;
                case 52://family
                    linkFieldName = 'FdEmpId'
                    break;
                case 438://nominee
                    linkFieldName = 'NDEmpId'
                    break;
                case 442://identity
                    linkFieldName = 'IEmpId'
                    break;
                case 448://benefit
                    linkFieldName = 'EBDEmpId'
                    break;
                case 481://roster
                    linkFieldName = 'RODEmpId'
                    break;

            }

            var pageObject = $scope.createPage();
            pageObject.pageId = pageId;
            pageObject.boxOptions = {
                showBack: true,
                selfLoading: true,
                showRefresh: true,
                showFilter: false,
                showAdd: true,
                showRowMenu: true,
                showCustomView: true,
                showUpload: false,
                showDialog: false,
                enableRefreshAfterUpdate: true,
                enableAutoRefresh: true,
                gridHeight: 450,
                linkColumns: [{ name: linkFieldName, value: linkFieldValue }],
                goBack: _goToEmployeeList,
                getPageData: null,
                refreshData: null,
                addRecord: null,
                editRecord: null,
                updateRecord: null,
                viewRecord: null,
                deleteRecord: null,
                uploadRecord: null,
                buttonPermission: true
            }

            if (pageId == 438) {
                pageObject.boxOptions.afterCellEdit = _afteraCellEdit;
            }
            if (pageId == 448) {
                pageObject.boxOptions.showFilter = false;
                pageObject.boxOptions.pageResult = _pageResultForBenefit;
                pageObject.boxOptions.dataResult = _dataResultForBenefit;
                pageObject.boxOptions.afterCellEdit = _afterCellEdit;
                pageObject.boxOptions.customButtons = [
                    { text: 'Save', icon: '', onClick: _saveBenefit, type: 'btn btn-primary' }
                ]
            }
            if (pageId == 360) {
                pageObject.boxOptions.addRecord = _addRecord;
                pageObject.boxOptions.editRecord = _editRecord;
                pageObject.boxOptions.showFilter = false;
                pageObject.boxOptions.showUpload = false;

            }

            return pageObject;
        }
        function _afteraCellEdit() {
            alert("hello")
        }
        //Resignation Edit
        function _editRecord(row) {
            console.log(row.entity)
            vm.oldEntity = angular.copy(row.entity)
            $scope.entity = row.entity;
            $scope.showResignation = false;
        }
        //Resignation Add
        function _addRecord() {
            $scope.entity = {};
            $scope.entity.RDResignationDate = moment().format('DD/MMMM/YYYY');
            $scope.showResignation = false;
        }
        function _resignList() {
            $scope.showResignation = true;
            $scope.page.refreshData();
        }

        function _payByEmpOnChange() {

        }
        function _manageNoticeDayOnResignDate() {
            $scope.entity.RDFromDate = moment($scope.entity.RDResignationDate).format('DD/MMMM/YYYY');
            $scope.entity.RDTodate = moment($scope.entity.RDResignationDate).add(45, 'days').format('DD/MMMM/YYYY');
            $scope.entity.RDRelievingDate = moment($scope.entity.RDResignationDate).add(45, 'days').format('DD/MMMM/YYYY');
            $scope.entity.RDNotice = 45;
            $scope.entity.RDIsCountResignSameDay = true;
        }
        function checkDate(fromDate, toDate) {
            var fromDt = moment(fromDate);
            var toDt = moment(toDate);
            var diff = toDt.diff(fromDt, 'days');
            return diff;
        }
        function _changeNoticeDayOnFromDate() {
            var diff = checkDate($scope.entity.RDFromDate, $scope.entity.RDTodate)
            if (parseInt(diff) >= 0) {
                $scope.entity.RDNotice = diff;
                $scope.entity.RDRelievingDate = toDate;
            }
            else {
                $scope.showMsg("error", "Fromdate is less than or equal to ToDate")
            }
        }

        //Employee Resination Detail Saved 
        function _saveResignation(entity, editForm) {

            $scope.page.pageinfo = {};
            $scope.page.pageinfo.title = 'Resignation';
            entity.RDEmpId = vm.empPKId;

            var diff = checkDate(entity.RDFromDate, entity.RDTodate)
            if (parseInt(diff) >= 0) {

                if (entity.RDId == undefined) {
                    _formSave(entity, vm.pageId, 'create', vm.oldEntity == undefined ? {} : vm.oldEntity, editForm, false);
                }
                else {
                    _formSave(entity, vm.pageId, 'edit', vm.oldEntity == undefined ? {} : vm.oldEntity, editForm, false);
                }
                // $scope.showResignation = true;
                // $scope.page.refreshData();
            }
            else {
                $scope.showMsg("error", "Fromdate is less than or equal to ToDate")
            }
        }

        //Employee Benefit Detail Saved 
        function _saveBenefit() {

            totalSavingRecord = $scope.page.gridOptions.data.length - 1;

            if ($scope.page.gridOptions.data.length > 0) {
                angular.forEach($scope.page.gridOptions.data, function (row) {
                    console.log(row)

                    var data = {
                        EBDId: row.EBDId == null ? undefined : row.EBDId,
                        EBDAccountNumber: row.EBDAccountNumber,
                        EBDBenefitId: row.EBDBenefitId,
                        EBDEmpId: row.EBDEmpId,
                        // EBDIsOnPercentage: row.EBDIsOnPercentage,
                        // EBDFiexedAmount: row.EBDFiexedAmount,
                        // EBDPercentage: row.EBDPercentage,
                        // EBDIsCalOnBasic: row.EBDIsCalOnBasic
                    }
                    var form = {}
                    if (data.EBDId == undefined) {
                        editFormService.saveForm(vm.pageId, data,
                            {}, 'create', 'Benefit', form, false).then(_successBenefitResult, _errorBenefitResult);
                    }
                    else {
                        editFormService.saveForm(vm.pageId, data,
                            {}, 'edit', 'Benefit', form, false).then(_successBenefitResult, _errorBenefitResult);
                    }
                })
            }
            else {
                $scope.showMsg("error", "Please select any row before save");
            }
        }
        function _successBenefitResult(result) {
            console.log(result)
            benefintSavecount++;
            console.log(benefintSavecount + ' of ' + totalSavingRecord)
            if (benefintSavecount == totalSavingRecord) {
                $scope.showMsg("success", "Employee Benefit Saved Successfully");
                $scope.page.refreshData();
            }

        }
        function _errorBenefitResult(err) {
            alert(JSON.stringify(err))
        }

        function _afterCellEdit(rowEntity, colDef, newValue, oldValue, page) {
            console.log(rowEntity, colDef, newValue, oldValue, page)

            if (colDef.name == 'EBDIsOnPercentage') {
                if (newValue) {
                    rowEntity.EBDFiexedAmount = '';
                }
                else {
                    rowEntity.EBDPercentage = '';
                }
            }
            else if (colDef.name == 'EBDFiexedAmount') {
                if (rowEntity.EBDIsOnPercentage) {
                    rowEntity.EBDFiexedAmount = '';
                    $scope.showMsg("error", "If you want to fill fixed field than unchecked the Onpercentage")
                }
            }
            else if (colDef.name == 'EBDPercentage') {
                if (!rowEntity.EBDIsOnPercentage) {
                    rowEntity.EBDPercentage = '';
                    $scope.showMsg("error", "If you want to fill percentage field than checked the Onpercentage")
                }
                else {
                    var percentage = parseFloat(rowEntity.EBDPercentage)
                    if (percentage > 100) {
                        rowEntity.EBDPercentage = '100.00'
                    }
                }
            }
        }
        function _pageResultForBenefit(result) {
            console.log(result)
        }
        function _dataResultForBenefit(result) {
            // angular.forEach(result, function (data, index) {
            //     var EBDFiexedAmount = parseFloat(data.EBDFiexedAmount)
            //     var EBDPercentage = parseFloat(data.EBDPercentage)
            //     if (EBDFiexedAmount > 0 || EBDPercentage > 0) {
            //         $scope.page.gridApi.selection.selectRow($scope.page.gridOptions.data[index]);
            //     }
            // })
        }
        function _findEntitySuccessResult(result) {

            if (result.ECEmpId !== undefined) {//check if entity is emg contact page contact
                vm.oldEmpEmgContact = angular.copy(result);
                vm.empEmgContact = result;
            }
            else if (result.CDId !== undefined) {//check if entity is  contact page contact
                vm.oldempContactDetail = angular.copy(result);
                vm.empContactDetail = result;
                if (result.CDAddLine1 == result.CDPAddLine1 && result.CDAddLine2 == result.CDPAddLine2 && result.CountryId == result.PCountryId &&
                    result.StateId == result.PStateId && result.CityId == result.PCityId && result.CDAreaId == result.CDPAreaId
                    && parseInt(result.CDPincode) == result.CDPPincode) {
                    console.log("same")
                    vm.CDPermanent = true;
                }
                else {
                    vm.CDPermanent = false;
                }
            }
            else {

                console.log(result)
                vm.oldEntity = angular.copy(result);
                vm.entity = result;
            }
        }
        function _findEntityErrorResult() {

        }
        //=========================================================== saving data function
        function _setupSaving(dataObject, action, pageId) {
            var data = {
                oldEntity: vm.oldEntity == undefined ? dataObject : vm.oldEntity,
                newEntity: dataObject,
                pageCode: pageId,
                activity: action
            }
            return data;
        }
        function _saveAddress(editForm) {
            console.log()
            if (vm.empContactDetail.CDId === undefined) {
                vm.empContactDetail.CDEmpId = vm.empPKId;
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'create', vm.oldempContactDetail, editForm, true);
            }
            else {
                _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'edit', vm.oldempContactDetail, editForm, true);
            }

        }
        function _saveForm(editForm) {
            if ($scope.page.pageinfo.idencolname !== undefined && $scope.page.pageinfo.idencolname !== null) {
                if (vm.pageId == 125) {
                    if (vm.entity.PFPPFIsActive == false) {
                        vm.entity.PFPPFAccountNo = '';
                        vm.entity.PFPPFMemberDate = '';
                    }
                    if (vm.entity.ESIIsActive == false) {
                        vm.entity.ESIMemeberNo = '';
                        vm.entity.ESIMemeberDate = '';
                    }
                    if (vm.entity.ADId === undefined) {
                        console.log("test")
                        vm.entity.ADEmpId = vm.empPKId;
                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log("test1")
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }
                else if (vm.pageId == 114) {
                    // vm.entity.JDDesgId = 10;
                    vm.entity.JDSUId = vm.entity.JDSubUnitID;
                    if (vm.entity.JDIsHasLeft) {
                        // vm.entity.JDHasLeftDate = moment();
                    }
                    if (vm.entity.JDIsOT == false) {
                        vm.entity.SingleOT = false;
                        vm.entity.JDDoubleOT = false;
                        vm.entity.JDSingleOTRate = 0;
                        vm.entity.DoubleOTRate = 0;


                    }
                    else if (vm.entity.SingleOT == false) {
                        vm.entity.JDSingleOTRate = 0;
                    }
                    else if (vm.entity.JDDoubleOT == false) {
                        vm.entity.DoubleOTRate = 0;
                    }



                    console.log(vm.entity)


                    if (vm.entity.JDId === undefined) {
                        vm.entity.JDEmpId = vm.empPKId;
                        // vm.entity.JDSubUnitID = 2;


                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log(vm.entity);
                        //vm.entity.JDSubUnitID = 2;

                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }
                else if (vm.pageId == 35) {

                    if (vm.entity.PdId === undefined) {
                        vm.entity.PdEmpId = vm.empPKId;

                        _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
                    }
                    else {
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }

                else if (vm.pageId == 21) {
                    var userQueryId = 579;
                    if (vm.entity.LinkRoleUserId === undefined) {
                        // vm.entity.EmpId = vm.empPKId;
                        var searchLists = [];
                        var searchListData = {
                            field: 'EmpId',
                            operand: '=',
                            value: vm.empPKId
                        }
                        searchLists.push(searchListData)
                        var data = {
                            searchList: searchLists,
                            orderByList: []
                        }
                        // vm.entity.UserId = 662;
                        // console.log(vm.entity)
                        // _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);

                        pageService.getCustomQuery(data, userQueryId).then(_saveUserSuccessResult, _saveUserErrorResult)
                    }
                    else {
                        console.log(vm.entity);
                        _formSave(vm.entity, vm.pageId, 'edit', vm.oldEntity, editForm, true);
                    }
                }

                if (vm.pageId == 36) {

                    if (vm.empContactDetail.CDId === undefined) {
                        vm.empContactDetail.CDEmpId = vm.empPKId;

                        console.log(vm.empContactDetai);
                        _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'create', vm.oldempContactDetail, editForm, true);
                    }
                    else {
                        _formSave(vm.empContactDetail, vm.pageIds.contactPageId, 'edit', vm.oldempContactDetail, editForm, true);
                    }
                }

            }
        }
        function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation) {
            editFormService.saveForm(pageId, entity, (oldEntity === undefined) ? vm.oldEntity : oldEntity,
                action, ($scope.page.pageinfo.title === undefined) ? 'Resination' : $scope.page.pageinfo.title, editForm, showConfirmation)
                .then(_updateSuccessResult, _updateErrorResult)
        }

        function _saveUserSuccessResult(result) {
            console.log(result);
            console.log(result[0].UserId);

            if (result != "NoDataFound") {
                vm.entity.UserId = result[0].UserId;
                console.log(vm.entity);
                _formSave(vm.entity, vm.pageId, 'create', vm.oldEntity, editForm, true);
            }
            else {
                $scope.showMsg('warning', 'Joining date does not exist.');
            }

        }

        function _saveUserErrorResult(error) {

        }

        function _updateSuccessResult(result) {
            console.log(result)

            var isSuccess = true;
            if (result.error_message === undefined) {
                if (result.entity !== undefined) {

                    if (result.entity.RDId !== undefined) {
                        $scope.page.refreshData();
                        $scope.showResignation = true;
                    }
                    if (result.entity.JDId !== undefined) {
                        vm.oldEntity = angular.copy(result.entity);
                        vm.entity = angular.copy(result.entity);
                    }

                    if (result.entity.CDId !== undefined) {
                        vm.oldempContactDetail = angular.copy(result.entity);
                        vm.emgContactPage = angular.copy(result.entity);
                    }
                    if (result.entity.PdId !== undefined) {
                        isSuccess = false;
                        vm.oldEntity = angular.copy(result.entity);
                        if (vm.empEmgContact.ECId === undefined) {
                            vm.empEmgContact.ECEmpId = vm.empPKId;
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'create', vm.oldempContactDetail, $scope.editForm, false)
                        }
                        else {
                            _formSave(vm.empEmgContact, vm.pageIds.emgContactPageId, 'edit', vm.oldempContactDetail, $scope.editForm, false)
                        }
                    }
                    else if (result.entity.ECEmpId !== undefined) {
                        isSuccess = true;
                        vm.oldEmpEmgContact = angular.copy(result.entity);
                    }
                }
            }
            else {
                isSuccess = false;
                $scope.showMsg('error', result.error_message.Message);
            }
            if (isSuccess) {

                $scope.page.isAllowEdit = false;
                $scope.showMsg('success', 'Record Saved Successfully');
            }

        }
        function _updateErrorResult(error) {
            console.log(error)
            //$scope.showMsg('error', 'Something went worng', 'Save Error')
        }
        function _resetPersonal() {
            vm.entity = angular.copy(vm.oldEntity);
            vm.empEmgContact = angular.copy(vm.oldEmpEmgContact);
        }
        function _resetAddress() {
            vm.empContactDetail = angular.copy(vm.oldempContactDetail);
        }
        function _clearPersonal() {
            var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]
            vm.entity = {};
            vm.entity[$scope.page.pageinfo.idencolname] = oldPkId;

            vm.empEmgContact = {};
            vm.empEmgContact[$scope.page.pageinfo.idencolname] = oldPkId;
            vm.empContactDetail = {};
            vm.empContactDetail[$scope.page.pageinfo.idencolname] = oldPkId;
        }
        function _clearAddress() {
            var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]
            vm.empContactDetail = {};
            vm.empContactDetail[$scope.page.pageinfo.idencolname] = oldPkId;

        }
        //=========================================================== common method
        function _validateFormCommon(form) {
            var localForm = form;
            var valid = true;
            if (vm.pageId == 35) {
                if (localForm.$error.required !== undefined) {
                    if (localForm.$error.required.length) {
                        angular.forEach(localForm.$error.required, function (errCtrl) {
                            if (!errCtrl.hasOwnProperty('$modelValue')) {
                                localForm.$removeControl(errCtrl)
                            }
                            else if (errCtrl.$name == "") {
                                localForm.$removeControl(errCtrl);
                            }
                        })
                    }
                }
                if (angular.equals(vm.entity, vm.oldEntity)) {
                    if (angular.equals(vm.empEmgContact, vm.oldEmpEmgContact)) {
                        _showToast('info', 'Nothing to save', "")
                        valid = false;
                    }
                }
            }
            else if (vm.pageId == 36) {
                //localForm = form.addressForm;
                if (angular.equals(vm.empContactDetail, vm.oldempContactDetail)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
            }
            else {
                if (angular.equals(vm.entity, vm.oldEntity)) {
                    _showToast('info', 'Nothing to save', "")
                    valid = false;
                }
            }
            if (valid)
                valid = editFormService.validateForm(localForm);
            return valid;
        }
        function _saveFormCommon(editForm) {
            if (_validateFormCommon(editForm)) {
                _saveForm(editForm);
            }
        }
        function _resetFormCommon(editForm) {

            // editForm.$setPristine();           
            if (vm.pageId == 35) {
                _resetPersonal();
            }
            else if (vm.pageId == 36) {
                vm.CDPermanent = true;
                _resetAddress();
            }
            else {
                vm.entity = angular.copy(vm.oldEntity);
            }
        }
        function _clearFormCommon() {


            var oldPkId = vm.entity[$scope.page.pageinfo.idencolname]

            if ($scope.contactPage.pageinfo) {
                var oldContPkId = vm.empEmgContact[$scope.contactPage.pageinfo.idencolname]
                vm.empContactDetail = {};
                vm.empContactDetail[$scope.contactPage.pageinfo.idencolname] = oldContPkId;
            }

            if ($scope.emgContactPage.pageinfo) {
                var oldEmgPkId = vm.empEmgContact[$scope.emgContactPage.pageinfo.idencolname]
                vm.empEmgContact = {};
                vm.empEmgContact[$scope.emgContactPage.pageinfo.idencolname] = oldEmgPkId;
            }

            vm.entity = {};
            vm.entity[$scope.page.pageinfo.idencolname] = oldPkId;
        }
        function _permanentAddress() {
            if (vm.CDPermanent) {
                vm.empContactDetail.CDPAddLine1 = vm.empContactDetail.CDAddLine1;
                vm.empContactDetail.CDPAddLine2 = vm.empContactDetail.CDAddLine2;
                vm.empContactDetail.PCountryId = vm.empContactDetail.CountryId;
                vm.empContactDetail.PStateId = vm.empContactDetail.StateId;
                vm.empContactDetail.PCityId = vm.empContactDetail.CDCityId;
                vm.empContactDetail.CDPPincode = vm.empContactDetail.CDPincode;
                vm.empContactDetail.CDPAreaId = vm.empContactDetail.CDAreaId;
            }
            else {
                vm.empContactDetail.CDPAddLine1 = '';
                vm.empContactDetail.CDPAddLine2 = '';
                vm.empContactDetail.PContryId = '';
                vm.empContactDetail.PStateId = '';
                vm.empContactDetail.PCityId = '';
                vm.empContactDetail.CDPPincode = '';
                vm.empContactDetail.CDPAreaId = '';
            }
        }
        _loadController();
    }//controller end
})();