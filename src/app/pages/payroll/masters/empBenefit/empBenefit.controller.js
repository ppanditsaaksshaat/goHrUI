/**
 * @author deepak.jain
 * created on 12.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.payroll.masters.empBenefit')
        .controller('empBenefitController', empBenefitController);

    /** @ngInject */
    function empBenefitController($scope, $state, $stateParams,
        pageService, DJWebStore, dialogModal, editFormService, $timeout, $filter, $http, DJWebStoreGlobal) {





        var vm = this;
        var pageId = 96;

        var currentState = $state.current;
        // this.uploadRecord = _uploadRecord;
        $scope.entity = {}
        $scope.page = $scope.createPage();


        console.log($scope.page)
        $scope.page.pageId = 448;
        var benefitPageId = 448;

        $scope.changeFormula = _changeFormula;
        $scope.saveEmpBenefit = _saveEmpBenefit;
        $scope.uploadRecord = _uploadRecord;
        $scope.downLoadTemp = _downLoadTemp;


        $scope.oldEntity = {};

        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            filterOpened: true,
            showAdd: true,
            showRowMenu: true,
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
            showDataOnLoad: false,
            filterOnChange: _filterChange,
            afterCellEdit: null,
            onRegisterApi: null,
        }

        // function _weekGridCellEditableCondition(scope) {
        //     console.log(scope)
        //     if (scope.EBDIsActive == null) {
        //         scope.EBDIsActive = true;
        //     } else {
        //         scope.EBDIsActive = false;
        //     }
        // }

        function _filterChange() {
            var currentDay;
            var currentDate = new Date();
            var aAMonth = $scope.page.filterData.Month.value - 1
            var aAYear = $scope.page.filterData.Year.value
            currentDay = 15;
            console.log(currentDay)
            var aADate = new Date(aAYear, aAMonth, currentDay);
            $scope.entity.benefitDate = moment(aADate).format("YYYY-MM-DD");
            console.log($scope.entity.benefitDate)
            // 'yyyy-MM-dd'

        }

        $scope.page.boxOptions.customButtons = [];
        $scope.page.boxOptions.customButtons.push({
            text: 'Save',
            icon: 'ion-refresh',
            onClick: _saveEmpBenefit,
            type: 'btn-danger'
        })

        function _addRecord() {
            $scope.showEditForm = true;
            $scope.entity = {};
            $scope.newEntity = {};
        }


        var totalSavingRecord = 0;

        // function _saveEmpBenefit() {
        //     $scope.multiEntity = {};

        //     // angular.forEach($scope.weekGridOptions.data, function (row, rdx) {
        //     //    $scope.rowData = {
        //     //         EBDId: $scope.entity.EBDId == null ? undefined : $scope.entity.EBDId,
        //     //         EBDEmpId: $scope.entity.EBDEmpId,
        //     //         EBDSHId: $scope.entity.EBDSHId.value,
        //     //         EBDIsActive: $scope.entity.EBDIsActive,
        //     //         EBDFiexedAmount: $scope.entity.EBDFiexedAmount,
        //     //         EBDDate: $scope.entity.benefitDate
        //     //     }
        //     //     console.log(row, rdx)
        //     //     child.rows.push(rowData);
        //     // })


        //     $scope.multiEntity.parent = {
        //         newEntity: taxComEmpHeaderDt,
        //         oldEntity: {},
        //         action: $scope.entity.EBDId == undefined ? 'create' : 'edit',
        //         tableid: 425,
        //         pageid: benefitPageId
        //     }


        //     // var taxComEmpHeaderDt = {
        //     //     EBDId: $scope.entity.EBDId == null ? undefined : $scope.entity.EBDId,
        //     //     EBDEmpId: $scope.entity.EBDEmpId,
        //     //     EBDSHId: $scope.entity.EBDSHId.value,
        //     //     EBDIsActive: $scope.entity.EBDIsActive,
        //     //     EBDFiexedAmount: $scope.entity.EBDFiexedAmount,
        //     //     EBDDate: $scope.entity.benefitDate
        //     // }




        //     $scope.multiEntity.child = [];
        //     // var child = {
        //     //     tableid: 425,
        //     //     pageid: benefitPageId,
        //     //     parentColumn: '',
        //     //     linkColumn: '',
        //     //     idenColName: 'EBDId',
        //     //     rows: []
        //     //   }
        //     var child = {

        //       }

        //     //   angular.forEach($scope.weekGridOptions.data, function (row, rdx) {
        //     //     var rowData = {
        //     //         EBDId: row.EBDId == null ? undefined : row.EBDId,
        //     //         EBDEmpId: row.EBDEmpId,
        //     //         EBDSHId: row.value,
        //     //         EBDIsActive: row.EBDIsActive,
        //     //         EBDFiexedAmount: row.EBDFiexedAmount,
        //     //         EBDDate: $scope.entity.benefitDate
        //     //     }
        //     //     console.log(row, rdx)
        //     //     child.rows.push(rowData);
        //     // })
        //     console.log($scope.multiEntity)
        //     var postData = JSON.stringify($scope.multiEntity);
        //     var compressed = LZString.compressToEncodedURIComponent(postData);

        //     var data = {
        //         lz: true,
        //         data: compressed
        //     }

        //     pageService.multiSave(data).then(function (result) {
        //         console.log(result)
        //         if (result == "done") {
        //             $scope.showMsg("success", "Record Saved Successfully");
        //             $scope.showWeeklyOffList = false;
        //             $scope.page.refreshData();
        //         } else if (result.error_message.Message == "Record Already Added.") {
        //             $scope.showMsg("error", "Record Already Added.");
        //         }
        //     }, function (err) {
        //         $scope.showMsg("error", err);
        //         console.log(err)
        //     })
        // }

        function _saveEmpBenefit() {
            // totalSavingRecord = $scope.page.weekGridOptions.data.length - 1;
            if ($scope.weekGridOptions.data.length > 0) {
                angular.forEach($scope.weekGridOptions.data, function (row) {
                    console.log($scope.weekGridOptions.data)
                    console.log($scope.entity.EBDSHId.value)
                    console.log($scope.entity)
                    // if (row.EBDFiexedAmount !== undefined && row.EBDFiexedAmount != null && row.EBDFiexedAmount != 0) {
                    var data = {
                        EBDId: row.EBDId == null ? undefined : row.EBDId,
                        EBDEmpId: row.EBDEmpId,
                        EBDSHId: $scope.entity.EBDSHId,
                        EBDIsActive: row.EBDIsActive,
                        EBDFiexedAmount: row.EBDFiexedAmount,
                        EBDDate: $scope.entity.benefitDate
                        // StatusId: 0,
                        // IsDeleted: 0
                    }
                    var form = {}
                    console.log(data)
                    if (data.EBDId == undefined) {
                        editFormService.saveForm(benefitPageId, data, {}, 'create', 'EmployeeBenefit', form, false).then(_successEmployeeBenefitResult, _errorEmployeeBenefitResult);
                    } else {
                        editFormService.saveForm(benefitPageId, data, {}, 'edit', 'EmployeeBenefit', form, false).then(_successEmployeeBenefitResult, _errorEmployeeBenefitResult);
                    }
                    // }
                    // console.log(data)
                })
            } else {
                $scope.showMsg("error", "Please search data then save");
            }
        }

        function _successEmployeeBenefitResult(result) {
            console.log(result)
            $scope.showMsg("success", "Benefit Save Successfully.");
            $scope.page.refreshData();

        }

        function _errorEmployeeBenefitResult(err) {
            console.log(err);
        }


        //WeekGridOptions All Function
        $scope.getWeekGridOptions = _getWeekGridOptions;
        $scope.weekGridOptions = {
            enableCellEditOnFocus: true,
            enableRowSelection: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableScrollbars: false,
            // paginationPageSize: 10,
            cellEditableCondition: _eightCCellEditableCondition,
            enablePaginationControls: false
            // afterCellEdit: _afterCellEdit
        }

        function _getWeekGridOptions() {
            console.log($scope.entity.EBDDeptId)
            if ($scope.entity.EBDDeptId !== undefined && $scope.entity.EBDDeptId != '') {
                if ($scope.entity.EBDSHId !== undefined && $scope.entity.EBDSHId != '') {
                    var searchLists = [];
                    var searchListData = {
                        field: 'EBDDeptId',
                        operand: '=',
                        value: $scope.entity.EBDDeptId
                        // value: $scope.page.filterData.EBDDeptId.value
                    }
                    searchLists.push(searchListData)
                    var searchListData = {
                        field: 'EBDSHId',
                        operand: '=',
                        value: $scope.entity.EBDSHId
                        // value: $scope.page.filterData.EBDSHId.value
                    }
                    searchLists.push(searchListData)
                    var data = {
                        searchList: searchLists,
                        orderByList: []
                    }
                    pageService.getCustomQuery(data, 540).then(__getWeekGridOptionsResult, __getWeekGridOptionsErrorResult)
                } else {
                    $scope.showMsg("error", "Please Select Salary Head")
                }
            } else {
                $scope.showMsg("error", "Please Select Department")
            }

        }

        function __getWeekGridOptionsResult(result) {
            // $scope.gridLine = true;
            console.log(result)
            var cellTemplateCheck = "<div class='ui-grid-cell-contents' ng-mouseover='row.isMouseOver=true' ng-mouseleave='row.isMouseOver=false' >"
            cellTemplateCheck += "<a href ng-click=\"grid.appScope.changeFormula(row)\"> <i class=\"fa font-green\" ng-class=\"{'fa-check-square-o': row.entity.EBDIsActive, 'fa-square-o': !row.entity.EBDIsActive }\" aria-hidden=\"true\" ></i></a>";
            cellTemplateCheck += "</div>"

            $scope.weekGridOptions.columnDefs = [{
                    name: 'EmpName',
                    displayName: 'Employee Name',
                    width: 300,
                    enableCellEdit: false
                },
                {
                    cellTemplate: cellTemplateCheck,
                    name: 'EBDIsActive',
                    displayName: 'Active',
                    width: 130,
                    enableCellEdit: true,
                },
                {
                    name: 'EBDFiexedAmount',
                    displayName: 'Benefit Amount',
                    width: 130,
                    // enableCellEdit: false
                },

            ]
            $scope.weekGridOptions.data = result[0];
            $scope.showSave = true;
        }


        function _changeFormula(row) {
            if (row.entity.EBDIsActive == null) {
                row.entity.EBDIsActive = true;
            } else if (!row.entity.EBDIsActive) {
                row.entity.EBDIsActive = true;
            } else if (row.entity.EBDIsActive) {
                row.entity.EBDIsActive = false;
            }
            console.log(row)
        }

        function _eightCCellEditableCondition(scope) {
            console.log(scope.col.name == 'EBDFiexedAmount')
            if (scope.col.name == 'EBDFiexedAmount') {
                if (scope.row.entity.EBDIsActive) {
                    console.log(scope.row.entity)
                    return true;
                }
            }
        }



        function __getWeekGridOptionsErrorResult(error) {
            $scope.showMsg("error", error)
        }

        function _weekGridCellEditableCondition(scope) {
            console.log(scope.row.entity)
            if (scope.col.name == 'Amount') {
                if (scope.row.entity.THDIsBasic == 1) {
                    return false;
                } else if (scope.row.entity.THDIsHra == 1) {
                    return false;
                } else if (scope.row.entity.THDDisplayIndex == 3) {
                    return false;
                } else {
                    return true;
                }
            }
        }

        function _loadController() {
            $timeout(function () {
                pageService.getPagData(448).then(function (result) {
                    console.log(result)
                    $scope.benefitPageData = result;
                }, function (err) {})

            })
        }

        _loadController();
        //End WeekGridOptions

        function _uploadRecord() {
            // $scope.deepak = 'is my name';
            var options = {
                url: "app/common/forms/browseModal/browseModal.html",
                controller: "",
                controllerAs: "",
            }
            dialogModal.open(options)
        }



        $scope.$on('uploadGridData', _upload)

        function _upload(evt, uploadGridData) {

            var flag = false;

            if ($scope.weekGridOptions.data.length > 0) {
                angular.forEach(uploadGridData.data, function (newEmpDetail) {
                    var oldEmpDetail = $filter("findObj")($scope.weekGridOptions.data, newEmpDetail.EmpCode, "EmpCode")
                    console.log(oldEmpDetail)
                    console.log(uploadGridData.data)
                    console.log(newEmpDetail)
                    console.log($scope.weekGridOptions.data)
                    if (oldEmpDetail != null) {
                        if (newEmpDetail.IsActive == 1) {
                            oldEmpDetail.EBDIsActive = newEmpDetail.IsActive;
                            oldEmpDetail.EBDFiexedAmount = newEmpDetail.BenefitAmount
                            
                            flag = true;
                        } else {


                        }
                    }
                })
                if (flag) {
                    $scope.showMsg("success", "Your file uploaded successfully")
                }
            }
        }

        function _downLoadTemp() {

            // alert('download temp is working');
            var tempColumns = [];

            var row = {
                EmpCode: 'Alpha-numeric (ITSL000001) Size(10)',
                EmpName: 'Only alphabet (Atul Kumar Singh) Size(100)',
                IsActive: 'Only 0 Or 1 Size(1)',
                BenefitAmount: 'Only numeric Or Decimal (1000) Size(10)',
            }

            tempColumns.push(row)



            DJWebStoreGlobal.JSONToCSVConvertor(tempColumns, 'EmployeeBenefit', false, true, true);
        }
    }
})();