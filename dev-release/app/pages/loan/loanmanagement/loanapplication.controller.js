/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loan.loanmanagement')
    .controller('LoanApplicationController', LoanApplicationController);

  /** @ngInject */
  /** @ngInject */
  function LoanApplicationController($scope, $stateParams, mailMessages,
    addModal, pageService, editableOptions, editableThemes, DJWebStore) {

    var rndValu = Math.round((Math.random() * 10) * 10);
    var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);
    var vm = this;
    vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
    vm.pageId = 105;
    $stateParams.pageId = vm.pageId;
    vm.table = { rows: [] }
    vm.page = {};
  
    vm.refreshData = function () {
      $scope.rows = [];
      _getTableData();
    }

    function _loadController() {
      pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
    }
    function _successGetPage(result) {
      console.log(result)
      vm.page = result;
      $scope.setPage(vm.page)
      $scope.setGrid(
        {
          columns: ['EmpName','LTName'],//list of columns
          enableTitleFilter: true,//show title filter
          enableGlobalFilter: true,//show global filter
          enbleColumnFilter: false,//show each column filter
          enableSrNo: true,//show serial no column
          enableAction: true,//show action column
          enablePagination: true,//enable pagination
          paginationLength: 10,//length of rows per page,
          pageId: vm.pageId//page id for which grid to be design
        }
      )
      console.log($scope.gridObject)

      _getTableData();
    }
    function _errorGetPage(err) {

    }
    function _getTableData() {

      var data = {
        searchList: [],
        orderByList: []
      }
      var tableData = pageService.getTableData(
        vm.page.pageinfo.tableid,
        vm.page.pageinfo.pageid,
        '', '',
        false, data);
      $scope.isLoaded = false
      $scope.isLoading = true
      tableData.then(_getTableSuccessResult, _getTableErrorResult)
    }
    function _getTableErrorResult(err) {
      $scope.isLoaded = true
      $scope.isLoading = false
    }
    function _getTableSuccessResult(result) {
      $scope.isLoaded = true
      $scope.isLoading = false
      if (result == 'NoDataFound') {
        // uivm.showMsg('warning', 'No Record Found.');
      } else if (result.Errors !== undefined) {
        // uivm.showMsg('error', result.Message);
        // _startMsgTimer();
      }
      else {
        console.log(result)
        vm.table.rows = result;
        $scope.rows = result;

       
      }
    }
    _loadController();
  }
})();




// /**
//  * @author a.demeshko
//  * created on 28.12.2015
//  */
// (function () {
//   'use strict';

//   angular.module('BlurAdmin.pages.loan.loanmanagement')
//     .controller('LoanApplicationController', LoanApplicationController);

//   /** @ngInject */
//   function LoanApplicationController($scope, $stateParams, mailMessages, addModal,
//     pageService, editableOptions, editableThemes, DJWebStore) {

//     var vm = this;
//     vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
//     vm.pageId = 105;
//     vm.table = { rows: [] }
//     vm.page = {};
//     vm.ucvOnChange = _ucvOnChange;
//     console.log(vm.ucvlist)
//     vm.showAdd = function () {
//       addModal.open({
//         subject: 'subject',
//         to: 'to',
//         text: 'text'
//       })
//     };
  

//     var vm = this;
//     var rndValu = Math.round((Math.random() * 10) * 10);
//     var rndValu2 = Math.round((Math.random() * rndValu) * rndValu);



//     function _loadController() {

//       pageService.getPagData(vm.pageId).then(_successGetPage, _errorGetPage)
//       console.log(vm.page.pageinfo);

//     }
//     function _successGetPage(result) {
//       console.log(result)
//       vm.page = result;
//       DJWebStore.SetValue('Page_' + vm.page.pageinfo.pageid, vm.page)
//       console.log(vm.page.pageinfo)
//       vm.ucvlist = vm.page.pageinfo.ucvlist;
//       console.log(vm.ucvlist)
//       _getTableData([], []);
//     }
//     function _errorGetPage(err) {

//     }
//     function _getTableData(searchList, orderbyList) {

//       var data = {
//         searchList: searchList,
//         orderByList: orderbyList
//       }
//       var tableData = pageService.getTableData(
//         vm.page.pageinfo.tableid,
//         vm.page.pageinfo.pageid,
//         '', '',
//         false, data);

//       tableData.then(_getTableSuccessResult, _getTableErrorResult)
//     }
//     function _getTableErrorResult(err) {

//     }
//     function _getTableSuccessResult(result) {
//       console.log(result)
//       if (result == 'NoDataFound') {
//         // uivm.showMsg('warning', 'No Record Found.');
//       } else if (result.Errors !== undefined) {
//         // uivm.showMsg('error', result.Message);
//         // _startMsgTimer();
//       }
//       else {
//         vm.table.rows = result;
//         $scope.rows = result;
//         console.log($scope.rows.length)
       
//       }
//     }

//     function _ucvOnChange(item) {

//       console.log(item)
//       var searchList = [], orderbyList = [];

//       var comData = LZString.decompressFromEncodedURIComponent(item.data);
//       var userData = angular.fromJson(comData);
//       console.log(userData)
      
//       angular.forEach(userData.filters, function (filter, fdx) {
//         var operator = '=';
//         var userValue = ''
//         if (filter.selectedOperator.value == '=') {
//           operator = '=';
//         }
//         else if (filter.selectedOperator.value == 'notempty') {
//           operator = '<>';
//         }
//         else if (filter.selectedOperator.value == 'empty') {
//           operator = '=';
//         }
//         else {
//           operator = filter.selectedOperator.value;
//         }

//         if (filter.userValue == 'self') {
//           userValue = uivm.auth.profile.userId;
//         }
//         else if (filter.userValue == 'notempty') {
//           userValue = ''
//         }
//         else if (filter.userValue == 'empty') {
//           userValue = ''
//         }
//         else if (filter.userValue === undefined) {
//           userValue = '';
//         }
//         else {
//           userValue = filter.userValue;
//         }

//         var searchFields = {
//           field: filter.selectedColumn.name, operand: operator, value: userValue
//         };
//         //console.log(searchFields)
//         searchList.push(searchFields)
//       })
//       //console.log(userData.orderby)
//       userData.orderby.forEach(function (order) {
//         if (order.selectedColumn !== undefined) {
//           var orderitem = {
//             column: order.selectedColumn.name,
//             isDesc: order.isDesc
//           }

//           orderbyList.push(orderitem)
//         }
//       })

//       _getTableData(searchList, orderbyList)
//     }
   
//     _loadController();

//   }
// })();



