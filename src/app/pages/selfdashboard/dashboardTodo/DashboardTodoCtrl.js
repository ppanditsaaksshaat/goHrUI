/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.selfdashboard')
    .controller('DashboardTodoCtrl', DashboardTodoCtrl);

  /** @ngInject */
  function DashboardTodoCtrl($scope, baConfig, editFormService, $rootScope, pageService) {

    var pageId = 504;
    $scope.transparent = baConfig.theme.blur;
    $scope.entity = {};
    $scope.oldEntity = {};
    var dashboardColors = baConfig.colors.selfdashboard
      ;
    var colors = [];
    for (var key in dashboardColors) {
      colors.push(dashboardColors[key]);
    }


    function getRandomColor() {
      var i = Math.floor(Math.random() * (colors.length - 1));
      return colors[i];
    }

    $scope.todoList = [];
    $scope.doneToDOList = _doneToDoList;

    // $scope.todoList = [
    //   // { text: 'Check me out' },
    //   // { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    //   // { text: 'Ex has semper alterum, expetenda dignissim' },
    //   // { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
    //   // { text: 'Simul erroribus ad usu' },
    //   // { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
    //   // { text: 'Get in touch with akveo team' },
    //   // { text: 'Write email to business cat' },
    //   // { text: 'Have fun with blur admin' },
    //   // { text: 'What do you think?' },
    // ];

    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getTableData(507, 504, '', '', false, data)
        .then(_getTableDataSuccessResult, _getTableDataErrorResult)
    }

    function _getTableDataSuccessResult(result) {
      console.log(result)
      if (result != 'NoDataFound') {
        $scope.todoList = result;
      }
    }

    function _getTableDataErrorResult(error) {

    }
    $scope.todoList.forEach(function (item) {
      item.color = getRandomColor();
    });

    $scope.newTodoText = '';

    $scope.addToDoItem = function (event, clickPlus) {
      var newEntity = {};
      newEntity = $scope.entity;
      console.log(event, clickPlus)
      console.log($scope.newTodoText)
      if (clickPlus || event.which === 13) {
        $scope.todoList.unshift({
          TDLRemark: $scope.entity.TDLRemark,
          color: getRandomColor(),
        });

        var searchLists = [];
        searchLists.push({
          field: 'EmpId',
          operand: "=",
          value: $scope.user.profile.empId
        })
        searchLists.push({
          field: 'TDLRemark',
          operand: "=",
          value: $scope.entity.TDLRemark
        })
        searchLists.push({
          field: 'TDLId',
          operand: "=",
          value: '0'
        })
        searchLists.push({
          field: 'Type',
          operand: "=",
          value: 'Create'
        })

        var data = {
          searchList: searchLists,
          orderByList: []
        }
        $scope.entity.TDLRemark = '';
        pageService.getCustomQuery(data, 666).then(_getDashBoardSuccessData, _getDashBoardErrorData)

        // editFormService.saveForm(pageId, newEntity, $scope.oldEntity,
        //   $scope.entity.TDLId == undefined ? "create" : "edit", 'Add To Do List', $scope.editForm, true)
        //   .then(function (result) {
        //     console.log(result)
        //     // $rootScope.showMsg("success","")
        //   }), function (error) {
        //   }{
      }
    }

    function _getDashBoardSuccessData(result) {

    }
    function _getDashBoardErrorData(error) {

    }

    function _doneToDoList(row){

    }

    _loadController();
  }
})();