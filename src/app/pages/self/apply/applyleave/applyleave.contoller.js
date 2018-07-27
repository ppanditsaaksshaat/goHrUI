/**
 * @author NKM
 * created on 26.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.apply.applyleave')
        .controller('applyLeaveController', applyLeaveController);

    /** @ngInject */
    function applyLeaveController($scope, $rootScope, $state, $stateParams,
        pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService, toastr, $filter, $timeout) {

        $scope.fromSlider = {
            minValue: 1,
            maxValue: 3,
            options: {
                floor: 1,
                ceil: 3,
                step: 1,
                minRange: 1,
                maxRange: 3,
                pushRange: true,
                showTicks: true,
                translate: function (value, sliderId, label) {
                    if (label == 'high') {
                        var labelText = '';
                        if ($scope.fromSlider.minValue == 1 && $scope.fromSlider.maxValue == 2) {
                            $scope.entity.LEADFromHalfDayId = 0;
                            labelText = 'First Half'
                        } else if ($scope.fromSlider.minValue == 2 && $scope.fromSlider.maxValue == 3) {
                            $scope.entity.LEADFromHalfDayId = 1;
                            labelText = 'Second Half'
                        } else if ($scope.fromSlider.minValue == 1 && $scope.fromSlider.maxValue == 3) {
                            $scope.entity.LEADFromHalfDayId = 2;
                            labelText = 'Full day';
                        }
                        _appliedDays();
                        return labelText;

                    } else {
                        return '';
                    }
                }
            }
        };
        $scope.toSlider = {
            minValue: 1,
            maxValue: 3,
            options: {
                floor: 1,
                ceil: 3,
                step: 1,
                minRange: 1,
                maxRange: 3,
                pushRange: true,
                showTicks: true,
                translate: function (value, sliderId, label) {
                    if (label == 'high') {
                        var labelText = '';
                        if ($scope.toSlider.minValue == 1 && $scope.toSlider.maxValue == 2) {
                            $scope.entity.LEADToHalfDayId = 0;
                            labelText = 'First Half'
                        } else if ($scope.toSlider.minValue == 2 && $scope.toSlider.maxValue == 3) {
                            $scope.entity.LEADToHalfDayId = 1;
                            labelText = 'Second Half'
                        } else if ($scope.toSlider.minValue == 1 && $scope.toSlider.maxValue == 3) {
                            $scope.entity.LEADToHalfDayId = 2;
                            labelText = 'Full day';
                        }
                        _appliedDays();
                        return labelText;

                    } else {
                        return '';
                    }
                }
            }
        };
        $scope.value = 150;
        $scope.showToSlider = true;


        //*Local Variable */
        var vm = this;
        var currentState = $state.current;
        var pageId = 157;
        var queryId = 530;
        var sanctionLeavePageId = 285;
        var sanctinLeaveTableId = 295;
        var leaveControlTableId = 273;
        var leaveControlPageId = 261;
        var cancelRequestPageId = 453;
        var cancelRequestTableId = 433;
        var leaveTableId = 163;
        $scope.showLeave = []
        $scope.leaveRuleList = [];
        $scope.leaveDetails = [];
        $scope.oldEntity = {};
        $scope.entity = {};
        $scope.sanctionEntity = {};
        $scope.cancelRequestEntity = {};
        $scope.transation = {};
        // $scope.entity = { LEADToHalfDayId: 2, LEADFromHalfDayId: 2 }



        //*Private Function */

        $scope.fetchDetail = _fetchLeaveDetail;
        $scope.appliedDays = _appliedDays;
        $scope.getTotal = _getTotal;
        $scope.saveForm = _saveLeaveForm;
        $scope.onLeaveChange = _onLeaveChange;
        $scope.getOptions = _getOptions;
        $scope.calculateDays = _calculateDays;
        $scope.onLeaveDrChange = _onLeaveDrChange;
        $scope.onHalfDayChange = _onHalfDayChange;
        $scope.onConditionalLeaveTypeChange = _onConditionalLeaveTypeChange;
        $scope.onConditionalCheckbox = _onConditionalCheckbox;
        $scope.closeForm = _closeForm;
        $scope.leaveSanction = _leaveSanction;
        $scope.closeSanction = _closeSanction;
        $scope.deleteForm = _deleteForm;
        $scope.closeViewSanctionForm = _closeViewSanctionForm;
        $scope.cancelLeave = _cancelLeave;
        $scope.closeVerifyCancelRequestForm = _closeVerifyCancelRequestForm;
        $scope.replyOnCancelLeave = _replyOnCancelLeave;
        // $scope.getLeaveTypeAccordingLeaveControl = _getLeaveTypeAccordingLeaveControl;
        // $scope.selectEmployeeData = $scope.page.pageinfo.selects.LEADEmpId;
        //
        // $scope.approvedLeave = _approvedLeave;
        // $scope.employeeOnChange = _employeeOnChange;


        /** Grid Intialization */
        $scope.page = $rootScope.createPage();
        $scope.page.pageId = pageId;
        $scope.page.orderByList = [{
            column: 'LEADDateFrom',
            isDesc: false
        }]
        $scope.page.boxOptions = {
            selfLoading: true,
            showRefresh: true,
            showFilter: true,
            showAdd: true,
            showRowMenu: true,
            showCustomView: true,
            showUpload: false,
            showDialog: false,
            enableRefreshAfterUpdate: true,
            gridHeight: 450,
            getPageData: null,
            refreshData: null,
            addRecord: _addRecord,
            editRecord: _editRecord,
            updateRecord: null,
            viewRecord: _viewRecord,
            deleteRecord: _deleteForm,
            isVerifyButton: true,
            // verifyResult: _leaveVerify,
            // customColumns: (((!$scope.user.profile.isAdmin && !$scope.user.profile.isManager) || !$scope.user.profile.isHeadEmployee) ? null : [{
            //   text: 'Verify',
            //   type: 'a',
            //   name: 'Option',
            //   click: _leaveVerify,
            //   pin: true
            // }]),
            pageResult: _pageResult,
            dataResult: _dataResult,
        }
        /** End Of Grid Intialization */

        function _dataResult(result) {
            console.log(result);
            console.log($scope.page)
        }

        function _pageResult(result) {

            angular.forEach(result.pageinfo.filters, function (filter) {
                if (filter.name == 'StatusId') {
                    filter.value = 0;

                }
                if (filter.name == 'VAYear') {
                    filter.value = parseInt(moment().format('YYYY'));

                }
                if (filter.name == 'VADepartmentId') {
                    filter.value = -1;
                    filter.disabled = true;
                }

            })

        }



        /**Fetching  credit,debit and LWP leave for employee */


        function _fetchLeaveDetail() {

            var searchLists = [];
            $scope.entity.LEADEmpId = $scope.entity.selectedEmp.value;
            $scope.employeeJoiningDate = $scope.entity.selectedEmp.JDDate;
            $scope.jobIsProbation = $scope.entity.selectedEmp.JDIsProbation;
            $scope.jobProbationDate = $scope.entity.selectedEmp.JDProbationValidity;




            if ($scope.entity.selectedEmp.JDDate != null && $scope.entity.selectedEmp.JDDate != undefined && $scope.entity.selectedEmp.JDDate != '') {
                $timeout(function () {
                    $scope.$broadcast('rzSliderForceRender');
                }, 5000);
                $scope.isSavingLeave = false;
                $scope.showSlider = true;
                queryId = 530;
                vm.validateLeave = true;
                // // var searchLists = [];
                // var searchListData = {
                //   field: 'ELTEmpId',
                //   operand: '=',
                //   value: $scope.entity.selectedEmp.value
                // }

                // // var searchListData = {
                // //   field: 'JDEmpId',
                // //   operand: '=',
                // //   value: $scope.entity.selectedEmp.value
                // // }
                // searchLists.push(searchListData)
                // var data = {
                //   searchList: searchLists,
                //   orderByList: []
                // }

                // //Probation Leave Detail
                // // var probationLeaveQueryId = 565;

                // // var data = {
                // //   searchList: [],
                // //   orderByList: []
                // // }

                // // pageService.getCustomQuery(data, probationLeaveQueryId).then(_getProbationCustomQuerySuccessResult, _getProbationCustomQueryErrorResult)

                // //


                // pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

            } else {

                $scope.isSavingLeave = true;
                $rootScope.showMsg("error", "Please contact admin to provide your Joining date")
            }
        }

        function _getCustomQuerySuccessResult(result) {
            queryId = 534;

            $scope.showLeave = result;
            //console.log(result);
            // alert(result);


            if (result != "NoDataFound") {
                var searchLists = [];
                var searchListData = {
                    field: 'LRCGroupIds',
                    operand: '=',
                    value: $scope.entity.selectedEmp.JDGroupId
                }
                searchLists.push(searchListData)
                var data = {
                    searchList: searchLists,
                    orderByList: []
                }
                pageService.getCustomQuery(data, queryId).then(_getLeaveDebitSuccessResult, _getLeaveDebitErrorResult)
            } else {
                vm.validateEmployee = false;
                _calculateDays();
            }
        }

        function _getCustomQueryErrorResult(err) {
            $rootScope.showMsg("error", err);
        }

        function _getLeaveDebitSuccessResult(result) {
            console.log(result)
            if (result != "NoDataFound") {
                var balLeave = vm.appliedDays;
                $scope.leaveRuleList = result;
                _calculateDays();
            } else {
                $rootScope.showMsg('error', 'No Leave Rule Found.')
            }
        }

        function _getLeaveDebitErrorResult(err) {
            $rootScope.showMsg("error", err)
        }

        /**Calulate Days */
        function _calculateDays() {
            if (vm.appliedDays === undefined) {
                return;
            }
            var balLeave = vm.appliedDays;
            //loop on current leave balance 
            var leaveBalList = angular.copy($scope.showLeave);

            angular.forEach(leaveBalList, function (leave, index) {

                leave.leaveDr = 0;
                leave.isDisabled = false;
                var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
                if (leaveRule != null) {
                    leave.minDays = leaveRule.LRCDRMinDays;
                    leave.maxDays = leaveRule.LRCDrMaxDays;
                    leave.isUnpaid = false;
                }
                if (leave.LeaveBalance > 0 && balLeave > 0) {

                    if (leaveRule != null) {

                        if (vm.appliedDays < leaveRule.LRCDRMinDays) {
                            leave.isDisabled = true;
                        } else if (leaveRule.LRCDRMinDays <= balLeave && leaveRule.LRCDrMaxDays >= balLeave) {
                            //check available leave 
                            if (leave.LeaveBalance <= balLeave) {
                                var halfDay = (leave.LeaveBalance % 1);
                                leave.leaveDr = leave.LeaveBalance - halfDay;
                                leave.halfDay = halfDay;

                                balLeave = balLeave - leave.LeaveBalance;
                            } else if (leave.LeaveBalance > balLeave) {
                                var halfDay = (balLeave % 1);
                                leave.leaveDr = balLeave - halfDay;
                                leave.halfDay = halfDay;
                                balLeave = 0;
                            }
                        } else if (leaveRule.LRCDRMinDays > balLeave) {
                            // if (leave.LeaveBalance <= balLeave) {
                            //   leave.leaveDr = leave.LeaveBalance;
                            //   balLeave = balLeave - leave.LeaveBalance;
                            // }
                            // else if (leave.LeaveBalance > balLeave) {
                            //   leave.leaveDr = balLeave;
                            //   balLeave = 0;
                            // }
                        } else if (leaveRule.LRCDrMaxDays < balLeave) {
                            if (leave.LeaveBalance <= leaveRule.LRCDrMaxDays) {
                                var halfDay = (leave.LeaveBalance % 1);
                                leave.leaveDr = leave.LeaveBalance - halfDay;
                                leave.halfDay = halfDay;
                                balLeave = balLeave - leave.LeaveBalance;
                            } else if (leave.LeaveBalance > balLeave) {
                                var halfDay = (leave.maxDays % 1);
                                leave.leaveDr = leave.maxDays - halfDay;
                                leave.halfDay = halfDay;
                                balLeave = balLeave - leaveRule.LRCDrMaxDays;
                            }
                        }

                        leave.isHalfDay = (leave.halfDay > 0);
                    }
                }

                //calculating days for dropdown

                var optList = [];

                if (leave && $scope.leaveRuleList) {

                    if (leaveRule !== null) {
                        var maxCounter = 0;
                        if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
                            maxCounter = leave.LeaveBalance;
                        } else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
                            maxCounter = leaveRule.LRCDrMaxDays;
                        }

                        if (vm.appliedDays < maxCounter) {

                            maxCounter = vm.appliedDays
                        }

                        for (var i = 0; i <= maxCounter; i++) {
                            if (i == 0 || i >= leaveRule.LRCDRMinDays) {
                                optList.push({
                                    id: i,
                                    name: i.toString() + ' Days'
                                })
                            }
                        }
                    } else {
                        optList.push({
                            id: 0,
                            name: '0 Day'
                        })
                        optList.push({
                            id: 1,
                            name: '1 Day'
                        })
                    }
                }
                leave.days = optList;


            })
            //compairing and updating unpaid leave
            var unpaidLeave = $filter('findObj')(leaveBalList, true, 'isUnpaid')
            var unpaid = {
                leaveDr: balLeave,
                LeaveBalance: 0,
                LTName: 'LWP',
                isUnpaid: true,
                halfDay: 0
            }
            if (unpaidLeave != null) {
                leaveBalList.splice(leaveBalList.length - 1, 1)
            }

            leaveBalList.push(unpaid);
            $scope.showLeave = angular.copy(leaveBalList);

            if ($scope.transation != undefined) {
                //console.log($scope.showLeave)
                angular.forEach($scope.transation, function (leaveApply) {
                    angular.forEach($scope.showLeave, function (leave) {
                        var lp = leaveApply.split("|")
                        if (parseInt(leave.LRCLeaveTypeId) == parseInt(lp[0])) {
                            leave.leaveDr = parseInt(lp[1]);
                        }
                        if (parseInt(lp[0]) == 0) {
                            if (leave.LTName == "LWP") {
                                leave.leaveDr = parseInt(lp[1]);
                            }
                        }



                    })
                })

            }


        }
        /**End of calculate day */

        /**Fetching Previous leave application */
        function _fetchPendingLeave() {


            var cQueryId = 536;

            var searchList = [];

            searchList.push({
                field: 'LEADEmpId ',
                operand: '=',
                value: $scope.entity.LEADEmpId
            })
            //console.log(moment().add(-1, 'year').format('YYYY-MM-DD'))
            searchList.push({
                field: 'CreatedOn',
                operand: '>=',
                value: moment().add(-1, 'year').format('YYYY-MM-DD')
            })

            searchList.push({
                field: 'CreatedOn',
                operand: '<=',
                value: moment().format('YYYY-MM-DD') + ' 23:59:59'
            })


            // searchList.push({
            //   field: 'IsRejected',
            //   operand: '<>',
            //   value: 1
            // })
            // searchList.push({
            //   field: 'IsOnHold',
            //   operand: '=',
            //   value: 1
            // })
            //  searchList.push({
            //   field: 'IsCancelApproved',
            //   operand: '<>',
            //   value: 1
            // })

            var data = {
                searchList: searchList,
                orderByList: []
            }

            var tableData = pageService.getTableData($scope.page.pageinfo.tableid,
                $scope.page.pageinfo.pageid,
                '', '',
                false, data);
            tableData.then(_fetchPendingLeaveSuccess, _fetchPendingLeaveError)
        }

        function _fetchPendingLeaveSuccess(result) {
            /*
                  //ADD CONDITION FOR NODATAFOUND
                  if (result != "NoDataFound") {
      
                    $scope.pendingLeave = false;
                    $scope.prevLeaveList = [];
      
                    for (var i = 0; i < $scope.showLeave.length; i++) {
                      $scope.showLeave[i].LeaveBalance = $scope.showLeave[i].ActualBalance;
                      $scope.showLeave[i].unClearBal = 0;
                    }
      
                    angular.forEach(result, function (leave) {
                      var applyLeave = 0;
                      var prev = {
                        status: leave.ApplicationStatus,
                        appDate: moment(leave.CreatedOn).format('DD-MMM-YYYY'),
                        from: moment(leave.LEADDateFrom).format('DD-MMM-YYYY'),
                        to: moment(leave.LEADDateTo).format('DD-MMM-YYYY'),
                        days: leave.TotalLeaveDays123,
                        distribution: leave.transation
                      }
                      $scope.prevLeaveList.push(prev);
                      var transaction = leave.LEADTransation.split(',')
      
                      angular.forEach(transaction, function (applyLeave) {
                        var leaveType = applyLeave.split("|");
                        angular.forEach($scope.showLeave, function (crLeave) {
                          if (parseInt(leaveType[0]) == parseInt(crLeave.LRCLeaveTypeId)) {
                            crLeave.unClearBal = (crLeave.unClearBal == undefined ? 0 : crLeave.unClearBal) + parseInt(leaveType[1])
                            crLeave.LeaveBalance = crLeave.LeaveBalance - parseInt(leaveType[1]);
                          }
                          if (parseInt(leaveType[0]) == 0) {
                            if (crLeave.LTName == "LWP") {
                              crLeave.unClearBal = parseInt(leaveType[1]);
                            }
                          }
                        })
                      })
      
                      // if (leave.IsPending) {
                      //   var leaveDest = leave.transation.splice(',')
                      // }
      
                    })
      
                  }
                  else {
                    $scope.pendingLeave = true;
                  }
                  */
        }

        function _fetchPendingLeaveError(err) {
            $rootScope.showMsg("error", err);
        }
        /**End Of Fetching Previous leave application */

        /**Get How many day of leave apply */
        function _appliedDays() {

            var joiningDate = moment($scope.employeeJoiningDate);
            var fromDate = moment($scope.entity.LEADDateFrom);
            var diff = fromDate.diff(joiningDate, 'days')
            var queryId = 530;
            if (diff > 0) {

                if ($scope.entity.selectedEmp.JDIsProbation != "False" && $scope.entity.selectedEmp.JDIsProbation != null && $scope.entity.selectedEmp.JDIsProbation != undefined && $scope.entity.selectedEmp.JDIsProbation != '') {
                    if ($scope.entity.selectedEmp.JDProbationValidity != null && $scope.entity.selectedEmp.JDProbationValidity != undefined && $scope.entity.selectedEmp.JDProbationValidity != '') {
                        if (moment($scope.entity.selectedEmp.JDProbationValidity) >= moment($scope.entity.LEADDateFrom)) {

                            var searchLists = [];
                            var searchListDatas = {
                                field: 'ELTEmpId',
                                operand: '=',
                                value: $scope.entity.selectedEmp.value
                            }
                            searchLists.push(searchListDatas)
                            var searchListDatas = {
                                field: 'LRCIsDRInProbation',
                                operand: '=',
                                value: $scope.entity.selectedEmp.JDIsProbation
                            }
                            searchLists.push(searchListDatas)
                            var data = {
                                searchList: searchLists,
                                orderByList: []
                            }
                        } else {
                            var searchLists = [];
                            var searchListData = {
                                field: 'ELTEmpId',
                                operand: '=',
                                value: $scope.entity.selectedEmp.value
                            }
                            searchLists.push(searchListData)
                            var data = {
                                searchList: searchLists,
                                orderByList: []
                            }
                        }
                        pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

                    }
                } else {
                    var searchLists = [];
                    var searchListData = {
                        field: 'ELTEmpId',
                        operand: '=',
                        value: $scope.entity.selectedEmp.value
                    }
                    searchLists.push(searchListData)
                    var data = {
                        searchList: searchLists,
                        orderByList: []
                    }
                    pageService.getCustomQuery(data, queryId).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
                }

                vm.validateLeave = true;
                $scope.isgreaterJoinDate = false;
                var appliedDays = 0;
                var isFromHalfDay = false;
                var isToHalfDay = false;
                if ($scope.entity.LEADDateFrom != undefined && $scope.entity.LEADDateTo != undefined && $scope.entity.LEADFromHalfDayId != undefined && $scope.entity.LEADToHalfDayId != undefined) {

                    var fromDate = moment($scope.entity.LEADDateFrom);
                    var toDate = moment($scope.entity.LEADDateTo);
                    appliedDays = toDate.diff(fromDate, 'days') + 1;
                    if ($scope.entity.LEADFromHalfDayId == 0 || $scope.entity.LEADFromHalfDayId == 1) {
                        appliedDays = appliedDays - 0.5;
                        isFromHalfDay = true;
                    } else {
                        if (isFromHalfDay) {
                            appliedDays = appliedDays + 0.5;
                            isFromHalfDay = false;
                        }
                    }
                    if ($scope.entity.LEADToHalfDayId == 0 || $scope.entity.LEADToHalfDayId == 1) {
                        appliedDays = appliedDays - 0.5;
                        isToHalfDay = true;
                    } else {
                        if (isToHalfDay) {
                            appliedDays = appliedDays + 0.5;
                            isToHalfDay = false;
                        }
                    }
                    vm.appliedDays = appliedDays;
                }

                _calculateDays();

            } else {
                vm.validateLeave = false;
                $scope.isSavingLeave = false;
                $scope.isgreaterJoinDate = true;
                $rootScope.showMsg("error", "From date is greater than to Joining Date");
            }

            _fetchPendingLeave();
        }
        /**End of how many leave apply */

        /** Leave Verification */


        function _getTotal(name) {

            var total = 0;
            var i = 0;
            for (i = 0; i < $scope.showLeave.length; i++) {
                var val = parseFloat($scope.showLeave[i][name]);
                if (!isNaN(val))
                    total += val;
                if (name == 'leaveDr') {
                    var halfDay = parseFloat($scope.showLeave[i]['halfDay']);
                    if (!isNaN(halfDay))
                        total += halfDay
                }
            }
            return total;
        }

        /**Save Leave */
        function _saveLeaveForm(form) {
            var leaveFromDate = moment($scope.entity.LEADDateFrom);
            var month = leaveFromDate.format('M');
            var year = leaveFromDate.format('YYYY');
            console.log(year)
            if (!$scope.entity.selectedEmp.AMSTIsVarified) {
                if (_validateForm(form)) { }
            } else if ($scope.entity.selectedEmp.AMSMonth == parseInt(month) && $scope.entity.selectedEmp.AMSYear == parseInt(year)) {
                $rootScope.showMsg("error", "You are not allowed to apply leave because this month attendance verified");
            } else {
                if (_validateForm(form)) { }
            }
        }

        function _validateForm(form) {
            var valid = editFormService.validateForm(form)
            if (valid) {
                $scope.entity.LEADTransation = ''
                angular.forEach($scope.showLeave, function (leave, idx) {
                    console.log($scope.showLeave)
                    if (leave.leaveDr) {
                        if (leave.leaveDr > 0 || leave.isHalfDay) {
                            if (leave.LTName == "LWP" && leave.leaveDr != 0) {
                                leave.LRCLeaveTypeId = 0;
                            }

                            var strLeave = leave.LRCLeaveTypeId + '|' + (parseInt(leave.leaveDr) + ((leave.isHalfDay) ? 0.5 : ''))
                            $scope.entity.LEADTransation += strLeave + ',';
                        }
                    }
                })
                if ($scope.entity.LEADTransation != '') {
                    if ($scope.entity.LEADTransation.length > 2)
                        $scope.entity.LEADTransation = $scope.entity.LEADTransation.substr(0, $scope.entity.LEADTransation.length - 1)
                }

                var cQueryId = 536;

                var searchList = [];

                searchList.push({
                    field: 'empId',
                    operand: '=',
                    value: $scope.entity.LEADEmpId
                })

                searchList.push({
                    field: 'from',
                    operand: '<=',
                    value: moment($scope.entity.LEADDateFrom).format('YYYY-MM-DD')
                })

                searchList.push({
                    field: 'to',
                    operand: '>=',
                    value: moment($scope.entity.LEADDateTo).format('YYYY-MM-DD')
                })
                var data = {
                    searchList: searchList,
                    orderByList: []
                }

                var tableData = pageService.getCustomQuery(data, cQueryId);
                tableData.then(_getLeaveCountSuccess, _getLeaveCountError)
            }
            return valid;
        }

        function _getLeaveCountSuccess(result) {

            if (result == "NoDataFound") {
                $scope.isSavingLeave = true;
                console.log($scope.entity)
                _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
            } else {
                if ($scope.entity.LEADId != undefined) {
                    $scope.isSavingLeave = true;
                    _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, $scope.page.action, $scope.page.pageinfo.tagline)
                } else {
                    $rootScope.showMsg('info', 'You have already applied leave for given date.')
                }

            }
        }

        function _getLeaveCountError(err) {
            //console.log(err)
        }

        /**End of Save Leave */



        function _leaveVerify(row) {

            //console.log(row)
            var status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
            if (status == null) {
                status = {};
                status.isRejected = false;
                status.isCancelRequest = false;
            }
            if (!status.isRejected) {
                if (!status.isCancelRequest && !status.isCancelApproved && !status.isCancelRejected && !status.isCancelOnHold) {
                    $scope.leaveDetails = [];
                    $scope.entity = [];
                    $scope.showSanctionForm = true;
                    //Get page of SanctionLeave 
                    pageService.getPagData(sanctionLeavePageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
                    var transaction = row.entity.LEADTransation;
                    if (transaction != null && transaction != undefined && transaction != '') {
                        var rows = transaction.split(',');

                        angular.forEach(rows, function (row) {

                            var data = row.split('|');
                            if (parseInt(data[0]) != 0) {
                                var leaveType = $filter('findObj')($scope.page.pageinfo.selects.LEADLTId, parseInt(data[0]), 'value').name;
                                var leaveDetail = {
                                    type: leaveType == null ? "" : leaveType,
                                    balance: data[1]
                                }
                            } else {
                                var leaveDetail = {
                                    type: "LWP",
                                    balance: data[1]
                                }
                            }
                            $scope.leaveDetails.push(leaveDetail)
                        })
                    } else {
                        $scope.leaveDetails = undefined;
                    }
                    if (row.entity.LEADDateFrom != undefined)
                        row.entity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
                    if (row.entity.LEADDateTo != undefined)
                        row.entity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
                    if (row.entity.LEADFromHalfDayId != null && row.entity.LEADFromHalfDayId != undefined) {
                        if (row.entity.LEADFromHalfDayId == 0) {
                            row.entity.fromHalf = 'First Half';
                        } else if (row.entity.LEADFromHalfDayId == 1) {
                            row.entity.fromHalf = 'Second Half';
                        } else {
                            row.entity.fromHalf = '';
                        }
                    }
                    if (row.entity.LEADToHalfDayId != null && row.entity.LEADToHalfDayId != undefined) {
                        if (row.entity.LEADToHalfDayId == 0) {
                            row.entity.toHalf = 'First Half'
                        } else if (row.entity.LEADFromHalfDayId == 1) {
                            row.entity.toHalf = 'Second Half';
                        } else {
                            row.entity.toHalf = '';
                        }
                    }
                    $scope.entity = row.entity;
                } else {

                    $scope.verifyCancelRequestForm = true;
                    pageService.getPagData(cancelRequestPageId).then(_getPageDataSuccessResult, _getPageDataErrorResult)
                    $scope.cancelRequestEntity.EmpName = row.entity.EmpName;
                    $scope.cancelRequestEntity.TotalLeaveDays123 = row.entity.TotalLeaveDays123;
                    $scope.cancelRequestEntity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.ELSDSanctionFromDate = moment(row.entity.ELSDSanctionFromDate).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.ELSDSanctionToDate = moment(row.entity.ELSDSanctionToDate).format("DD/MMMM/YYYY");
                    var searchList = [];
                    var searchFields = {
                        field: 'CRLEADId',
                        operand: '=',
                        value: row.entity.LEADId
                    }
                    searchList.push(searchFields)
                    _commonFindEntity(cancelRequestTableId, searchList)
                }
            } else {
                $rootScope.showMsg("error", "You can view this leave only")
            }
        }

        function _getPageDataSuccessResult(result) {
            if (parseInt(result.pageinfo.pageid) == parseInt(cancelRequestPageId)) {
                $scope.cancelRequestPage = result;
            }
            if (parseInt(result.pageinfo.pageid) == parseInt(sanctionLeavePageId)) {
                $scope.sanctionPage = result;
                $scope.sanctionEntity.ELSDSanctionFromDate = $scope.entity.LEADDateFrom;
                $scope.sanctionEntity.ELSDSanctionToDate = $scope.entity.LEADDateTo;
                //Get entity of sanctionleave  
                var searchList = [];
                var searchFields = {
                    field: 'ELSDELAId',
                    operand: '=',
                    value: $scope.entity.LEADId
                }
                searchList.push(searchFields);
                pageService.findEntity(sanctinLeaveTableId, undefined, searchList).then(_findEntitySuccessResult, _findEntityErrorResult)
            }
        }

        function _getPageDataErrorResult(err) {

        }

        function _findEntitySuccessResult(result) {
            $scope.sectionOldEntity = angular.copy(result);


            if (result.ELSDId != undefined) {
                $scope.sanctionEntity.ELSDId = result.ELSDId;
                $scope.sanctionEntity.ELSDSanctionFromDate = result.ELSDSanctionFromDate;
                $scope.sanctionEntity.ELSDSanctionToDate = result.ELSDSanctionToDate;
                $scope.sanctionEntity.ELSDComment = result.ELSDComment;
                $scope.sanctionEntity.StatusId = parseInt(result.StatusId);
            } else {
                $scope.sanctionEntity.ELSDId = undefined;
                $scope.sanctionEntity.ELSDComment = "";
                $scope.sanctionEntity.StatusId = 0;
            }
        }

        function _findEntityErrorResult(err) {

        }

        function _validateSanctionForm() {

            if ($scope.sanctionEntity.ELSDSanctionFromDate == undefined || $scope.sanctionEntity.ELSDSanctionToDate == null) {
                $rootScope.showMsg("error", "Please Enter Sanction FromDate");
                return true;
            }
            if ($scope.sanctionEntity.ELSDSanctionToDate == undefined || $scope.sanctionEntity.ELSDSanctionToDate == null) {
                $rootScope.showMsg("error", "Please Enter Sanction ToDate");
                return true;
            }
            if ($scope.sanctionEntity.StatusId == "0") {
                $rootScope.showMsg("error", "Please Select Status");
                return true;
            }
            if ($scope.sanctionEntity.ELSDComment == undefined || $scope.sanctionEntity.ELSDComment == null || $scope.sanctionEntity.ELSDComment == '') {
                $rootScope.showMsg("error", "Please Enter Comment");
                return true;
            }

            return false;
        }


        function _leaveSanction() {

            if (!_validateSanctionForm()) {
                var santionLeave = {
                    ELSDId: $scope.sanctionEntity.ELSDId == undefined ? undefined : $scope.sanctionEntity.ELSDId,
                    ELSDELAId: $scope.entity.LEADId,
                    ELSDSanctionFromDate: $scope.sanctionEntity.ELSDSanctionFromDate,
                    ELSDSanctionToDate: $scope.sanctionEntity.ELSDSanctionToDate,
                    StatusId: $scope.sanctionEntity.StatusId,
                    ELSDComment: $scope.sanctionEntity.ELSDComment,
                    ELSDSanctionLeaveDate: moment()
                }

                if ($scope.sanctionEntity.ELSDId == undefined) {
                    _formSave(santionLeave, sanctionLeavePageId, 'create', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
                } else {
                    _formSave(santionLeave, sanctionLeavePageId, 'edit', $scope.sectionOldEntity == undefined ? {} : $scope.sectionOldEntity, editForm, false, $scope.sanctionPage.title);
                }
            }
        }

        function _formSave(entity, pageId, action, oldEntity, editForm, showConfirmation, title) {

            editFormService.saveForm(pageId, entity, oldEntity,
                action, title, editForm, showConfirmation)
                .then(_saveSuccessResult, _saveErrorResult)
        }

        function _saveSuccessResult(result) {

            if (result.success_message == 'Added New Record.') {
                $rootScope.showMsg("success", "Record Saved Successfully")
            } else {
                $rootScope.showMsg("success", "Record Saved Successfully")
            }
            $scope.showSanctionForm = false;
            $scope.verifySanctionForm = false;
            $scope.verifyCancelRequestForm = false;
            $scope.page.refreshData();
        }

        function _saveErrorResult(err) {
            $rootScope.showMsg("error", err)
        }

        function _closeSanction() {
            $scope.page.refreshData();
            $scope.showSanctionForm = false;
        }

        $scope.$watch('entity.LEADDateFrom', function (newVal, oldVal) {
            if (newVal) {
                if (!$scope.entity.LEADDateTo) {
                    $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
                    _appliedDays();
                } else {
                    var daysDiff = _getDateDiff();
                    if (daysDiff < 0) {
                        $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
                        _appliedDays();
                    }
                }
            }
        })
        $scope.$watch('entity.LEADDateTo', function (newVal, oldVal) {
            if (newVal) {

                if ($scope.entity.LEADDateFrom) {
                    var daysDiff = _getDateDiff();
                    if (daysDiff < 0) {
                        $rootScope.showMsg('warning', 'To date can not be less than from date.')
                        $scope.entity.LEADDateTo = $scope.entity.LEADDateFrom
                        _appliedDays();
                    } else if (daysDiff == 0) {
                        $scope.showToSlider = false;
                    } else {
                        $scope.showToSlider = true;
                    }
                }
            }
        })

        function _getDateDiff() {
            var fromDate = moment($scope.entity.LEADDateFrom);
            var toDate = moment($scope.entity.LEADDateTo);
            var daysDiff = toDate.diff(fromDate, 'days');
            return daysDiff;
        }

        function _loadController() {
            $scope.disabledEmp = false;
            $scope.entity.LEADFromHalfDayId = 2;
            $scope.entity.LEADToHalfDayId = 2;

        }



        function _addRecord() {

            vm.appliedDays = undefined;
            $scope.disabledEmp = false;
            $scope.entity = [];
            $scope.showLeave = [];
            vm.validateLeave = false;
            $scope.showSlider = true;
            $scope.isSavingLeave = false;
            $scope.showEditForm = true;
            $scope.isLeaveTransactionTable = false;
            $scope.isLeaveApprovedDet = false;
            $scope.entity = {
                LEADToHalfDayId: 2,
                LEADFromHalfDayId: 2
            }
        }

        function _editRecord(row) {
            if (row.entity.StatusId == 0) {
                $scope.disabledEmp = true;
                $scope.entity = row.entity;
                $scope.showEditForm = true;
                $scope.isSavingLeave = false;
                $scope.page.isAllowEdit = true;
                $scope.entity.LEADDateFrom = moment(row.entity.LEADDateFrom)
                $scope.entity.LEADDateTo = moment(row.entity.LEADDateTo)
                $scope.entity.selectedEmp = $filter('findObj')($scope.page.pageinfo.selects.LEADEmpId, row.entity.LEADEmpId, 'value')
                $scope.transation = $scope.entity.LEADTransation.split(',');

                _fetchLeaveDetail();

                vm.validateLeave = true
            } else {
                $rootScope.showMsg("error", "You are not allowed for edit because this leave already sanctioned");
            }
        }

        function _closeForm() {
            $scope.showEditForm = false;
            $scope.page.refreshData();
        }

        function _viewRecord(row) {
            //console.log(row)

            if (row.entity.StatusId == 0) {
                _editRecord(row);
            } else {
                $scope.status = $filter('findObj')($scope.page.pageinfo.statuslist, row.entity.StatusId, 'value');
                if (!$scope.status.isCancelRequest && !$scope.status.isCancelApproved && !$scope.status.isCancelRejected && !$scope.status.isCancelOnHold) {
                    var searchList = [];
                    var searchFields = {
                        field: 'CRLEADId',
                        operand: '=',
                        value: row.entity.LEADId
                    }
                    searchList.push(searchFields)
                    _commonFindEntity(cancelRequestTableId, searchList, row.entity);
                    $scope.verifySanctionForm = true;
                    $scope.cancelRequestEntity.CREmpId = row.entity.LEADEmpId;
                    $scope.cancelRequestEntity.CRLEADId = row.entity.LEADId;
                    $scope.cancelRequestEntity.EmpName = row.entity.EmpName;
                    $scope.cancelRequestEntity.TotalLeaveDays123 = row.entity.TotalLeaveDays123;
                    $scope.cancelRequestEntity.LEADDateFrom = moment(row.entity.LEADDateFrom).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.LEADDateTo = moment(row.entity.LEADDateTo).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.ELSDSanctionFromDate = moment(row.entity.ELSDSanctionFromDate).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.ELSDSanctionToDate = moment(row.entity.ELSDSanctionToDate).format("DD/MMMM/YYYY");
                    $scope.cancelRequestEntity.LEADContactName = row.entity.LEADContactName;
                    $scope.cancelRequestEntity.LEADContactNo = row.entity.LEADContactNo;
                    $scope.cancelRequestEntity.LeadComment = row.entity.LeadComment;
                    $scope.cancelRequestEntity.LEADAdminComment = row.entity.LEADAdminComment;
                    $scope.cancelRequestEntity.StatusId = row.entity.StatusId;
                    $scope.cancelRequestEntity.CreatedBy = row.entity.CreatedBy;
                    $scope.cancelRequestEntity.CreatedOn = moment(row.entity.CreatedOn).format("DD/MMMM/YYYY");;
                } else {
                    if ($scope.isCancelRequest) {
                        $rootScope.showMsg("error", "You are not allowed to view this leave application beacause this leave application is already in processing for approval")
                    } else {
                        $rootScope.showMsg("error", "Your application already sanctioned/rejected/onhold")
                    }
                }
            }

        }

        function _commonFindEntity(tableId, searchList) {

            pageService.findEntity(tableId, undefined, searchList).then(_cancelRequestSuccessResult, _cancelRequestErrorResult)
        }

        function _cancelRequestSuccessResult(result) {

            $scope.cancelRequestOldEntity = angular.copy(result);

            if (result.CRId != undefined) {
                $scope.cancelRequestEntity.CRId = result.CRId;
                $scope.cancelRequestEntity.CRComment = result.CRComment;
                $scope.cancelRequestEntity.StatusId = parseInt(result.StatusId);
                $scope.cancelRequestEntity.CRCommentAfterCanReq = result.CRCommentAfterCanReq;
            } else {
                $scope.cancelRequestEntity.CRComment = '';
            }
        }

        function _cancelRequestErrorResult(err) {

        }

        function _closeViewSanctionForm() {
            $scope.verifySanctionForm = false;
            $scope.page.refreshData();
        }

        function _closeVerifyCancelRequestForm() {
            $scope.verifyCancelRequestForm = false;
            $scope.page.refreshData();
        }


        function _cancelLeave() {

            if ($scope.cancelRequestEntity.CRComment != undefined && $scope.cancelRequestEntity.CRComment != '') {
                var cancelRequest = {
                    CREmpId: $scope.cancelRequestEntity.CREmpId,
                    CRTotalLeave: $scope.cancelRequestEntity.TotalLeaveDays123,
                    CRLeaveFromDate: $scope.cancelRequestEntity.LEADDateFrom,
                    CRLeaveToDate: $scope.cancelRequestEntity.LEADDateTo,
                    CRSactionFromDate: $scope.cancelRequestEntity.ELSDSanctionFromDate,
                    CRSanctionToDate: $scope.cancelRequestEntity.ELSDSanctionToDate,
                    CRSanctionBy: $scope.cancelRequestEntity.LEADEmpId,
                    CRSanctionDate: $scope.cancelRequestEntity.CreatedOn,
                    CRComment: $scope.cancelRequestEntity.CRComment,
                    CRLEADId: $scope.cancelRequestEntity.CRLEADId,

                }
                if ($scope.entity.CRId == undefined) {
                    _formSave(cancelRequest, cancelRequestPageId, 'create', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, true, 'Cancel Request');
                } else {
                    _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
                }
            } else {
                $rootScope.showMsg("error", "Please comment before leave cancel");
            }
        }

        function _replyOnCancelLeave(cancelRequestEntity) {

            if (cancelRequestEntity.StatusId != undefined && cancelRequestEntity.CRCommentAfterCanReq != undefined) {
                var cancelRequest = {
                    CREmpId: cancelRequestEntity.CREmpId,
                    CRTotalLeave: cancelRequestEntity.TotalLeaveDays123,
                    CRLeaveFromDate: cancelRequestEntity.LEADDateFrom,
                    CRLeaveToDate: cancelRequestEntity.LEADDateTo,
                    CRSactionFromDate: cancelRequestEntity.ELSDSanctionFromDate,
                    CRSanctionToDate: cancelRequestEntity.ELSDSanctionToDate,
                    CRComment: cancelRequestEntity.CRComment,
                    CRLEADId: cancelRequestEntity.CRLEADId,
                    CRId: cancelRequestEntity.CRId,
                    StatusId: cancelRequestEntity.StatusId,
                    CRCommentAfterCanReq: cancelRequestEntity.CRCommentAfterCanReq,

                }
                _formSave(cancelRequest, cancelRequestPageId, 'edit', $scope.cancelRequestOldEntity == undefined ? {} : $scope.cancelRequestOldEntity, editForm, false, 'Cancel Request');
            } else {
                if (cancelRequestEntity.StatusId == undefined) {
                    $rootScope.showMsg("error", "Please select status");
                } else if (cancelRequestEntity.CRCommentAfterCanReq == undefined) {
                    $rootScope.showMsg("error", "Please enter comment");
                }
            }

        }


        function _onLeaveChange(leave) {

        }

        function _getOptions(leave) {
            var optList = [];

            if (leave && $scope.leaveRuleList) {

                var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
                if (leaveRule !== null) {
                    var maxCounter = 0;
                    if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
                        maxCounter = leave.LeaveBalance;
                    } else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
                        maxCounter = leaveRule.LRCDrMaxDays;
                    }

                    if (vm.appliedDays < maxCounter) {

                        maxCounter = vm.appliedDays
                    }

                    for (var i = 0; i <= maxCounter; i++) {
                        if (i == 0 || i >= leaveRule.LRCDRMinDays) {
                            optList.push({
                                id: i,
                                name: i.toString() + ' Days'
                            })
                        }
                    }
                } else {
                    optList.push({
                        id: 0,
                        name: '0 Day'
                    })
                    optList.push({
                        id: 1,
                        name: '1 Day'
                    })
                }
            }

            return optList;
        }

        function _onLeaveDrChange(leave, oldDays) {
            var unpaidLeave = $filter('findObj')($scope.showLeave, true, 'isUnpaid')

            var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
            if (leave.LeaveBalance <= leave.leaveDr) {
                $rootScope.showMsg('error', 'No more balance.')
                leave.leaveDr = parseInt(oldDays)
            } else if (leaveRule.LRCDrMaxDays < leave.leaveDr) {
                $rootScope.showMsg('error', 'No more leave allowed in ' + leaveRule.LTName)
                leave.leaveDr = parseInt(oldDays)
            } else if (leave.leaveDr < oldDays) {

                if (unpaidLeave != null) {

                    var unpaid = {
                        leaveDr: unpaidLeave.leaveDr + (parseInt(oldDays) - leave.leaveDr),
                        LeaveBalance: 0,
                        LTName: 'LWP',
                        isUnpaid: true,
                        halfDay: 0
                    }

                    $scope.showLeave.splice($scope.showLeave.length - 1, 1)
                }

                $scope.showLeave.push(unpaid);
            } else {
                var difLeave = leave.leaveDr - parseInt(oldDays);

                if (unpaidLeave.leaveDr < difLeave) {
                    $rootScope.showMsg('warning', 'First, reduce days in any leave type')
                    leave.leaveDr = parseInt(oldDays);
                } else {
                    var unpaid = {
                        leaveDr: unpaidLeave.leaveDr - difLeave,
                        LeaveBalance: 0,
                        LTName: 'LWP',
                        isUnpaid: true,
                        halfDay: 0
                    }
                    $scope.showLeave.splice($scope.showLeave.length - 1, 1)
                    $scope.showLeave.push(unpaid);
                }
            }

        }

        function _onHalfDayChange(leave, oldIsHalfDay) {

            var unpaidLeave = $filter('findObj')($scope.showLeave, true, 'isUnpaid')
            if (leave.isHalfDay) {

                var leaveRule = $filter('findObj')($scope.leaveRuleList, leave.LRCLeaveTypeId, 'LRCLeaveTypeId')
                if (leave.LeaveBalance <= leave.leaveDr) {
                    $rootScope.showMsg('error', 'No more balance.')
                    leave.isHalfDay = false;
                } else if (leaveRule.LRCDrMaxDays <= leave.leaveDr) {
                    $rootScope.showMsg('error', 'No more leave allowed in ' + leaveRule.LTName)
                    leave.isHalfDay = false;
                } else if (unpaidLeave.leaveDr >= 0.5) {
                    leave.halfDay = .5;

                    var unpaid = {
                        leaveDr: unpaidLeave.leaveDr - .5,
                        LeaveBalance: 0,
                        LTName: 'LWP',
                        isUnpaid: true,
                        halfDay: 0
                    }
                    $scope.showLeave.splice($scope.showLeave.length - 1, 1)
                    $scope.showLeave.push(unpaid);

                } else {
                    $rootScope.showMsg('warning', 'Half day not allowed')
                    leave.isHalfDay = false;
                }
            } else {
                leave.halfDay = 0;
                var unpaid = {
                    leaveDr: unpaidLeave.leaveDr + .5,
                    LeaveBalance: 0,
                    LTName: 'LWP',
                    isUnpaid: true,
                    halfDay: 0
                }
                $scope.showLeave.splice($scope.showLeave.length - 1, 1)
                $scope.showLeave.push(unpaid);
            }
        }

        function _onConditionalLeaveTypeChange() {
            console.log($scope.leaveRuleList)
            console.log($scope.entity.conditinalLeaveTypeId)
            var leaveRule = $filter('findObj')($scope.leaveRuleList, $scope.entity.conditinalLeaveTypeId, 'LRCLeaveTypeId')

            if (leaveRule == null) {
                $rootScope.showMsg('error', 'No leave rule defined.')
            } else {

                var leave = {
                    leaveDr: 0,
                    LeaveBalance: leaveRule.LRCDrMaxDays,
                    LTName: leaveRule.LTName,
                    isUnpaid: false,
                    halfDay: 0,
                    minDays: leaveRule.LRCDRMinDays,
                    maxDays: leaveRule.LRCDrMaxDays,
                    isCondLeave: true,
                    LRCLeaveTypeId: $scope.entity.conditinalLeaveTypeId
                }

                var optList = [];

                if (leave && $scope.leaveRuleList) {

                    if (leaveRule !== null) {
                        var maxCounter = 0;
                        if (leave.LeaveBalance < leaveRule.LRCDrMaxDays) {
                            maxCounter = leave.LeaveBalance;
                        } else if (leave.LeaveBalance >= leaveRule.LRCDrMaxDays) {
                            maxCounter = leaveRule.LRCDrMaxDays;
                        }

                        if (vm.appliedDays < maxCounter) {

                            maxCounter = vm.appliedDays
                        }

                        for (var i = 0; i <= maxCounter; i++) {
                            if (i == 0 || i >= leaveRule.LRCDRMinDays) {
                                optList.push({
                                    id: i,
                                    name: i.toString() + ' Days'
                                })
                            }
                        }
                    } else {
                        optList.push({
                            id: 0,
                            name: '0 Day'
                        })
                        optList.push({
                            id: 1,
                            name: '1 Day'
                        })
                    }
                }
                leave.days = optList;

                var found = $filter('findObj')($scope.showLeave, true, 'isCondLeave')
                if (found != null) {
                    $scope.showLeave.splice(0, 1)
                }

                $scope.showLeave.splice(0, 0, leave)

            }
            _calculateDays();
        }

        function _onConditionalCheckbox() {
            if ($scope.entity.isConditiaonal) {

            } else {
                var found = $filter('findObj')($scope.showLeave, true, 'isCondLeave')
                if (found != null) {
                    $scope.showLeave.splice(0, 1)
                }
                _calculateDays();
            }
        }



        function _deleteForm(row) {
            _commonSaveForm($scope.page.pageinfo.pageid, $scope.entity, $scope.oldEntity, 'delete', $scope.page.pageinfo.tagline)
        }

        function _commonSaveForm(pageId, newEntity, oldEntity, action, pageTagLine) {
            editFormService.saveForm(pageId, newEntity,
                oldEntity, action, pageTagLine)
                .then(_saveFormSuccess, _saveFormError)
        }



        function _saveFormSuccess(result) {
            $scope.isSavingLeave = false;
            $scope.isLeaveSaved = true;
            $rootScope.showMsg('success', $scope.page.pageinfo.tagline + " saved successfully.")
            $scope.showEditForm = false;
            $scope.page.refreshData();
        }

        function _saveFormError(err) {

            $scope.isSavingLeave = false;
        }

        $scope.filter = function (value, index, array) {

            return value.Conditional === 'True' && parseInt(value.GenderId) === parseInt($scope.entity.selectedEmp.PdGenderId);

        }

        _loadController();


    }
})();