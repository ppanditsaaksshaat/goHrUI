/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.applications')
    .controller('ApplicationAddController', ApplicationAddController);

  /** @ngInject */
  function ApplicationAddController($scope, $stateParams, DJWebStore, pageService, $timeout, editFormService) {

    $scope.open = open;
    $scope.opened = false;
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.options = {
      showWeeks: false
    };

    function open() {
      $scope.opened = true;
    }

    var vm = this;
    vm.pageId = 157;
    vm.page = DJWebStore.GetValue('Page_' + vm.pageId);
    vm.selects = vm.page.pageinfo.selects;
    // vm.page.pageinfo.pageid
    console.log(vm.selects)
    vm.entity = {};
    vm.action = 0;
    vm.entity.LEADEmpId;

    vm.pageId = $stateParams.pageId;
    vm.action = $stateParams.action;
    //  vm.tempName = $stateParams.name;
    vm.pkId = 0;

    console.log($stateParams.pageId, $stateParams.action, $stateParams.name)

    if ($stateParams.pkId !== undefined) {
      vm.pkId = $stateParams.pkId;
    }
    vm.oldEntity = {};
    function _loadController() {
      vm.page = DJWebStore.GetValue('Page_' + vm.pageId)
      //    vm.selects = vm.page.pageinfo.selects;
      if (vm.pkId > 0)
        _findEntity()
    }
    function _findEntity() {
      vm.isLoaded = false;
      vm.isLoading = true;
      $timeout(function () {
        pageService.findEntity(vm.page.pageinfo.tableid, vm.pkId, undefined).then(
          _findEntitySuccessResult, _findEntityErrorResult);
      });
    }
    function _findEntitySuccessResult(result) {
      vm.isLoaded = true;
      vm.isLoading = false;
      vm.entity = result;
      vm.oldEntity = angular.copy(result)
    }
    function _findEntityErrorResult(err) {
      vm.isLoaded = true;
      vm.isLoading = false;
    }


    var employeeLeaveDataDetail = vm.selects.LEADEmpId;
    var employeeLeaveDataDetailList = []
    angular.forEach(employeeLeaveDataDetail, function (val, key) {
      var empData = {
        id: val.value,
        name: val.name
      }
      employeeLeaveDataDetailList.push(empData)
      console.log(empData)
    })



    console.log('call employee job description controller')
    //vm.gridOptions = DJWebStoreGlobal.UIGridSetting($scope, false);
    //vm.auth = DJWebStore.ValidateUser();
    vm.pageData = {};
    vm.template = {};
    vm.param = {};
    // vm.gridOptions = DJWebStoreGlobal.UIGridSetting($scope, false);

    vm.param = { LEADId: 0, entity: {} };

    vm.assign = {};
    vm.leaveTransactionTableId = 279;
    vm.leaveTransactionPageId = 270;
    vm.leaveTransactionList = [];
    vm.selectEmployeeList = [];
    vm.template = { leaveTypeData: [], employeeData: [], errorList: [] };
    var searchEmployeeLeaveTransactionList = [];
    var leaveTypeTableId = 279;
    var leaveTypePageId = 270;
    var employeeTableId = 30;
    var employeePageId = 25;
    vm.leaveTypeHeadingList = [];
    vm.leaveTypeDataList = [];
    vm.saveForm = _saveForm;

    function _validateForm(form) {
      return true;
    }

    function _saveForm(form) {
      if (_validateForm(form)) {

        if (vm.entity.LEADEmpId === undefined) {
          vm.entity.LEADEmpId = "";
        }
        if (vm.entity.LEADLTId === undefined) {
          vm.entity.LEADLTId = "";
        }
        if (vm.entity.LEADDateFrom === undefined) {
          vm.entity.LEADDateFrom = "";
        }
        if (vm.entity.LeadComment === undefined) {
          vm.entity.LeadComment = "";
        }

        vm.oldEntity = {};
        vm.action = 'create';

        console.log(vm.entity, vm.oldEntity, vm.action)
        editFormService.saveForm(vm.pageId, vm.entity, vm.oldEntity, vm.action, vm.page.pageinfo.tagline)

      }
    }




    function _getEmployeeLeaveTransactionDetail() {
      console.log('calling function getemployeeleavetransactiondetail')
      pageService.getTableData(vm.leaveTransactionTableId, vm.leaveTransactionPageId, undefined, undefined, false, undefined).then(_getLeaveTransactionSuccessResult, _getLeaveTransactionErrorResult)
    }
    function _getLeaveTransactionSuccessResult(result) {
      var transactionList = result;
      vm.leaveTransactionList = transactionList;
      console.log(result)
    }
    function _getLeaveTransactionErrorResult(result) {

    }

    vm.employeeSelectOptions = {
      displayText: 'Select Employee..',
      onSelect: _employeeSelectOnSelect
    }
    vm.leaveTypeSelectOptions = {
      displayText: 'Select Leave Type..',
      onSelect: _leaveTypeSelectOnSelect
    }


    function _employeeSelectOnSelect(item, ngModel) {
      vm.leaveTypeSelectOptions.data = [];
      vm.template.leaveTypeData.forEach(function (opening) {

        if (item.EmpId == opening.ELTEmpId) {
          vm.leaveTypeSelectOptions.data.push(angular.copy(opening))
          vm.isLeaveTransactionTable = true;
        }
      })
    }
    function _leaveTypeSelectOnSelect(item, ngModel) {

      console.log(item, vm.leaveTypeSelectOptions.selectedItem)
    }


    // function _loadController() {
    //   //  vm.param = DJWebStoreGlobal.GetParam();

    //   $timeout(function () {
    //     pageService.getAssignedUser().then(function (users) {
    //       console.log(users)
    //       angular.forEach(users, function (k, v) {
    //         var user = { value: k.Id, name: k.Name }
    //         vm.selectEmployeeList.push(user);
    //       });
    //       console.log(vm.selectEmployeeList)
    //     }), function (err) {
    //     }
    //   });
    //   $timeout(function () {
    //     pageService.getTableData(vm.leaveTransactionTableId, vm.leaveTransactionPageId, undefined, undefined, false, undefined).then(function (result) {
    //       console.log(result)
    //     })

    //   });

    //   //var leaveTypeTableId = 82;
    //   //var leaveTypePageId = 78;
    //   //var employeeTableId = 68;
    //   //var employeePageId = 65;



    //   var data = {
    //     searchList: [],
    //     orderByList: []
    //   }
    //   $timeout(function () {

    //     //var searchData = { searchList: [], orderByList: [] }
    //     pageService.getTableData(employeeTableId, employeePageId, '', '', true, data)
    //       .then(function (result) {
    //         vm.template.employeeData = [];
    //         // console.log(vm.template.employeeData)
    //         //console.log(result)


    //         if (result.Errors !== undefined) {
    //           vm.template.errorList.push(result.Errors)
    //         }
    //         else if (result.error_message !== undefined) {
    //           vm.template.errorList.push(error_message)
    //         }
    //         else if (result == 'NoDataFound') {
    //           vm.template.errorList.push(result)
    //         }
    //         else {

    //           vm.employeeSelectOptions.data = result;
    //           //console.log(vm.employeeSelectOptions.data)
    //         }
    //       }, function (err) {

    //       });
    //   });
    //   $timeout(function () {
    //     //var searchData = { searchList: [], orderBy: [] }
    //     pageService.getTableData(leaveTypeTableId, leaveTypePageId, '', '', true, data)
    //       .then(function (result) {
    //         vm.template.leaveTypeData = [];
    //         //console.log(result)
    //         if (result.Errors !== undefined) {
    //           vm.template.errorList.push(result.Errors)
    //         }
    //         else if (result.error_message !== undefined) {
    //           vm.template.errorList.push(error_message)
    //         }
    //         else if (result == 'NoDataFound') {
    //           vm.template.errorList.push(result)
    //         }
    //         else {

    //           vm.template.leaveTypeData = result;
    //           //_selectingDefaultOpening();
    //           //console.log(result)
    //         }
    //       }, function (err) {

    //       });
    //   });
    //   _setEditForm()
    //   _getLeaveTypeData()
    // }


    function _getLeaveTypeData() {

      var data = {
        searchList: [],
        orderByList: []
      }
      //var searchData = { searchList: [], orderBy: [] }
      pageService.getTableData(leaveTypeTableId, leaveTypePageId, '', '', true, data)
        .then(function (result) {
          vm.template.leaveTypeData = [];
          console.log(result)
          if (result.Errors !== undefined) {
            vm.template.errorList.push(result.Errors)
          }
          else if (result.error_message !== undefined) {
            vm.template.errorList.push(error_message)
          }
          else if (result == 'NoDataFound') {
            vm.template.errorList.push(result)
          }
          else {

            //var leaveTpHeadingList = result;
            ////angular.foreach(leaveTpHeadingList, function (value, key) {
            ////    if (value.ELTEmpId == vm.leaveTypeSelectOptions.selectedItem) {

            ////    }
            ////})

            //var leaveTpDataList = result;
            //vm.leaveList = [];
            //var colRowHeader = 0;
            //var colRowFinalHeader = 0;
            //angular.forEach(leaveTpDataList, function (value, key) {
            //    if (value.ELTEmpId == 3) {
            //        colRowHeader = {
            //            id: value.ELTLCRId,
            //            name: value.LTName
            //        }
            //        vm.leaveTypeHeadingList.push(colRowHeader)
            //        console.log(colRowHeader)
            //        angular.forEach(vm.leaveTypeHeadingList, function (val, ky) {
            //            if (val.id != value.ELTLCRId) {
            //                colRowFinalHeader = {
            //                    id: val.id,
            //                    name: val.name
            //                }
            //                vm.leaveList.push(colRowFinalHeader)
            //                console.log(colRowFinalHeader)
            //            }
            //            vm.leaveList.push(colRowFinalHeader)
            //            console.log(vm.leaveList)
            //            //vm.leaveList.push(colRowFinalHeader)
            //            //console.log(vm.leaveList)
            //        })
            //        //if (vm.leaveTypeHeadingList.id != colRowHeader.id) {
            //        //    vm.leaveTypeHeadingList.push(colRowHeader)
            //        //    console.log(vm.leaveTypeHeadingList)
            //        //}

            //    }
            //})


            ////angular.forEach(columnList, function (col, cdx) {
            ////    var colRowHeader = {
            ////        name: col.name,
            ////        field: col.name,
            ////        displayName: col.text,
            ////        width: 150,
            ////        visible: true,
            ////        enableFiltering: true

            ////    };
            ////    pm.gridOptions.columnDefs.push(colRowHeader);
            ////})

            //vm.leaveTypeHeadingList = result;
            //vm.leaveTypeDataList = result;
          }
        }, function (err) {

        });

    }

    function _showConfirm(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Record has been added successfully')
        .textContent('Would you like to add new record?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Go back')
        .cancel('Add more');

      $mdDialog.show(confirm).then(function () {
        //  DJWebStoreGlobal.GoBack();
      }, function () {
        vm.entity = {};
      });
    };

    console.log(vm.employeeSelectOptions)

    function _setEditForm() {
      //debugger;
      //if (vm.template !== undefined) {
      //    if (vm.template.rows !== undefined) {
      //        if (vm.template.rows.length > 0) {
      //            vm.param.entity = vm.template.rows[0];
      //            vm.entity = vm.param.entity;
      //            vm.param.LEADId = vm.param.entity.LEADId;
      //        }
      //    }
      //}

    }

    function _setupSaving() {
      if (vm.employeeSelectOptions.selectedItem === undefined) {
        vm.employeeSelectOptions.selectedItem = "";
      }
      if (vm.leaveTypeSelectOptions.selectedItem === undefined) {
        vm.leaveTypeSelectOptions.selectedItem = "";
      }
      if (vm.isLeaveHalfDay === undefined) {
        vm.isLeaveHalfDay = "";
      }
      if (vm.leaveDateFrom === undefined) {
        vm.leaveDateFrom = "";
      }
      if (vm.leaveDateTo === undefined) {
        vm.leaveDateTo = "";
      }
      if (vm.comment === undefined) {
        vm.comment = "";
      }
      if (vm.contactName === undefined) {
        vm.contactName = "";
      }
      if (vm.contactNumber === undefined) {
        vm.contactNumber = "";
      }
      if (vm.address === undefined) {
        vm.address = "";
      }


      var leaveEmpAppDetailPageId = 157;
      var newField = {};
      newField.LEADEmpId = vm.employeeSelectOptions.selectedItem;
      newField.LEADLTId = vm.leaveTypeSelectOptions.selectedItem;
      newField.LEADDateFrom = vm.leaveDateFrom;
      newField.LEADDateTo = vm.leaveDateTo;
      newField.LeadHalfDay = vm.isLeaveHalfDay;
      newField.LeadComment = vm.comment;
      newField.LEADContactName = vm.contactName;
      newField.LEADContactNo = vm.contactNumber;
      newField.LEADAddress = vm.address;




      var data = {
        oldEntity: {},
        newEntity: newField,
        pageCode: leaveEmpAppDetailPageId,
        activity: 'create'
      }
      console.log(data)
      return data;
    }

    function _getObject() {
      //var hireLinkCVJODId = 385
      //var data = {
      //    HireCIId: vm.param.CIId,
      //    HireCompany: vm.employeeSelectOptions.selectedItem,
      //    HireOpening: vm.leaveTypeSelectOptions.selectedItem,
      //    HirePageId: hireLinkCVJODId
      //};
      return vm.entity;
    }

    function _validateFields() {
      var result = true;
      //if (vm.employeeSelectOptions.selectedItem === undefined) {
      //    alert('Select Client.')
      //    result = false;
      //    return result;
      //}
      //if (vm.leaveTypeSelectOptions.selectedItem === undefined) {
      //    alert('Select opening .')
      //    result = false;
      //    return result;
      //}


      return result;
    }

    function _saveEmployeeLeaveApplication(editForm) {
      debugger;
      _getLeaveTypeData()
      alert('calling _saveEmployeeLeaveApplication')
      if (vm.employeeSelectOptions.selectedItem === undefined) {
        vm.employeeSelectOptions.selectedItem = "";
      }
      if (vm.leaveTypeSelectOptions.selectedItem === undefined) {
        vm.leaveTypeSelectOptions.selectedItem = "";
      }
      if (vm.isLeaveHalfDay === undefined) {
        vm.isLeaveHalfDay = "";
      }
      if (vm.leaveDateFrom === undefined) {
        vm.leaveDateFrom = "";
      }
      if (vm.leaveDateTo === undefined) {
        vm.leaveDateTo = "";
      }
      if (vm.comment === undefined) {
        vm.comment = "";
      }
      if (vm.contactName === undefined) {
        vm.contactName = "";
      }
      if (vm.contactNumber === undefined) {
        vm.contactNumber = "";
      }
      if (vm.address === undefined) {
        vm.address = "";
      }

      debugger;
      //if ((vm.employeeSelectOptions.selectedItem != undefined || vm.employeeSelectOptions.selectedItem != "") && (vm.leaveTypeSelectOptions.selectedItem != undefined || vm.leaveTypeSelectOptions.selectedItem != "")) {
      if (vm.employeeSelectOptions.selectedItem != "" && vm.employeeSelectOptions.selectedItem !== undefined) {
        var firstdate = vm.leaveDateFrom;
        var seconddate = vm.leaveDateTo;

        var splitFirstDate = firstdate.split(' ')[0];
        var splitSecondDate = seconddate.split(' ')[0];
        console.log(splitFirstDate, splitSecondDate)
        var dt1 = splitFirstDate.split('/')
        var dt2 = splitSecondDate.split('/')

        var one = new Date(dt1[2], dt1[0] - 1, dt1[1])
        var two = new Date(dt2[2], dt2[0] - 1, dt2[1]);

        if (two >= one) {
          var millisecondsPerDay = 1000 * 60 * 60 * 24;
          var millisBetween = two.getTime() - one.getTime();
          var days = millisBetween / millisecondsPerDay;
          console.log(days)
          Math.floor(days);



          var totalCredit = 0;
          var totalDebit = 0;
          var balanceLeave = 0;
          var leaveType = vm.leaveTypeSelectOptions.selectedItem;

          console.log(vm.leaveTypeSelectOptions)
          if (searchEmployeeLeaveTransactionList === undefined) {
            vm.searchEmployeeLeaveTransactionList = [];

          }
          vm.searchEmployeeLeaveTransactionList = [];
          searchEmployeeLeaveTransactionList = vm.leaveTypeSelectOptions.data;
          console.log(searchEmployeeLeaveTransactionList)


          angular.forEach(searchEmployeeLeaveTransactionList, function (value, key) {
            if (value.ELTLCRId == leaveType) {
              var leaveCredit = parseInt(value.ELTLeaveCr);
              var leaveDebit = parseInt(value.ELTLeaveDr);
              console.log(value.ELTLCRId)
              totalCredit += leaveCredit;
              totalDebit += leaveDebit;
            }
          })
          if (totalCredit >= totalDebit) {
            debugger;
            balanceLeave = totalCredit - totalDebit;
            if (balanceLeave >= days) {
              if (_validateFields()) {
                var entObj = _getObject();
                var savingObj = _setupSaving()
                //console.log('function call')

                //var entObj = _getObject();
                //var savingObj = _setupSaving(entObj)
                ////console.log('function call')
                //pageService.editPageData(vm.pageData.pageinfo.pageid, JSON.stringify(savingObj)).then(


                //pageService.editPageData(vm.pageData.pageinfo.pageid, JSON.stringify(savingObj)).then(
                if (confirm('Save record Sure')) {
                  pageService.editPageData(157, JSON.stringify(savingObj)).then(
                    function (result) {
                      console.log(result)
                      if (result.error_message === undefined) {

                        if (result.success_message === undefined) {
                          alert('Unable to save');
                        }
                        else {
                          _showConfirm($scope.$event);
                          //  alert('Saved Successfully.')
                          //  DJWebStoreGlobal.GoBack();



                        }
                      }
                      else {
                        if (result.error_message.Message !== undefined) {
                          alert(result.error_message.Message);
                        }
                        else {
                          alert(result.error_message);
                        }
                      }

                    },
                    function (err) {

                    })
                }
              }
            }
            else {
              alert('You Can Not Apply Leave.')
            }
          }
          else {
            alert('Your leave is exta leave according to your balance Leave')
          }

          console.log(totalCredit)
          console.log(totalDebit)


          //vm.employeeSelectOptions.selectedItem
          //vm.leaveTypeSelectOptions.selectedItem

          console.log(vm.leaveTypeSelectOptions.data)

        }
        else {
          alert('to date should be greater than from date')
        }

      }
      else {
        alert('Please Select Employee Name And Leave Type')
      }


      //var searchField = 'ELTEmpId';


      //var employeeId = vm.employeeSelectOptions.selectedItem;
      //pageService.getTableData(vm.leaveTransactionTableId, vm.leaveTransactionPageId, searchField, employeeId, false, undefined).then(function (result) {
      //    console.log(result)
      //    angular.forEach()
      //    var resultEmployeeId = result.ELTEmpId;
      //    console.log(resultEmployeeId)

      //    debugger;
      //    if (result.ELTEmpId == vm.employeeSelectOptions.selectedItem && result.ELTLCRId == vm.leaveTypeSelectOptions.selectedItem) {
      //        console.log(result)
      //    }

      //} )


    }



    //public methods
    vm.saveEmployeeLeaveApplication = _saveEmployeeLeaveApplication;
    // vm.GoBack = DJWebStoreGlobal.GoBack
    //vm.saveForm = _saveForm;

    _loadController();
    _getEmployeeLeaveTransactionDetail();
  }
})();