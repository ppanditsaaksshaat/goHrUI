/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.help')
    .controller('helpPermissionController', helpPermissionController);

  /** @ngInject */
  function helpPermissionController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService,
    toastr, dialog, $filter) {


    $scope.saveHelp = _saveHelp;
    $scope.activityOnChange = _activityOnChange;
    $scope.cancelActivity = _cancelActivity;
    var helpPageId = 477;

    $scope.reset = _reset;
    $scope.selectedRoleId = 0;
    var vm = this;
    vm.navigationCollapsed = true;
    vm.oldEntity = {};
    $scope.entity = {};

    function _getTabs() {
      var mastersMenu = [];


      mastersMenu.push({ name: 'loanprovider', text: 'Loan Provider Master', id: 103 })
      mastersMenu.push({ name: 'loantype', text: 'Loan Type Master', id: 102 })
      // mastersMenu.push({ name: 'loanstatus', text: 'Loan Status Master', id: 256 })
      mastersMenu.push({ name: 'loancategoryrulemaster', text: 'Loan Category Rule Master', id: 104 })



      return mastersMenu;

    }


    function _loadController() {

      _getRoleList();

    }

    /**
     * MENU LIST
     */
    function _getMenuList() {
      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getCustomQuery(data, 567).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)
    }
    function _getCustomQuerySuccessResult(result) {
      console.log('menu list', result)
      $scope.menuList = angular.copy(result);
      $scope.nodes = [];


      //console.log(parentMenu)


      if ($scope.roleList)
        _fetchRolePermission($scope.roleList[0].RoleId)
    }

    function _generateNodes() {

      $scope.nodes = [];
      var parentMenu = $filter('findAll')($scope.menuList, 0, 'UIMenuParentMenuId')

      for (var p = 0; p < parentMenu.length; p++) {
        var node = { id: parentMenu[p].UIMenuId, name: parentMenu[p].ResourceText, checked: parentMenu[p].checked }
        var childList = _getChild(parentMenu[p].UIMenuId)
        if (childList) {
          node.children = childList;
        }

        $scope.nodes.push(node);

      }

      $scope.oldNodes = angular.copy($scope.nodes);
    }
    function _cancelActivity() {
      $scope.isShowActivity = false;
    }
    function _getChild(UIMenuId) {
      var children = $filter('findAll')($scope.menuList, UIMenuId, 'UIMenuParentMenuId')
      if (children != null) {
        var returnList = [];
        for (var p = 0; p < children.length; p++) {
          var node = { id: children[p].UIMenuId, name: children[p].ResourceText, checked: children[p].checked }
          var childList = _getChild(children[p].UIMenuId)
          if (childList) {
            node.children = childList;
          }

          returnList.push(node);
        }

        return returnList;
      }
      else {
        return undefined;
      }
    }
    function _getCustomQueryErrorResult(err) {
      console.log(err)
    }
    /**
     * ROLE LIST
     */
    function _getRoleList() {


      var data = {
        searchList: [],
        orderByList: []
      }
      pageService.getCustomQuery(data, 581).then(_getRoleWithLocationSuccess, _getRoleWithLocationError)

    }
    function _getRoleWithLocationSuccess(result) {
      console.log(result)
      _getMenuList();
      $scope.roleList = result[0];
      $scope.locationList = result[1];
      $scope.branchList = result[2];
      $scope.subUnitList = result[3];
      $scope.empList = result[4];
    }

    function _getRoleWithLocationError(err) {

    }

    function _fetchRolePermission(roleId) {
      $scope.selectedRoleId = roleId;
      $scope.selectedRoleName = '';

      var role = $filter('findObj')($scope.roleList, roleId, 'RoleId')
      if (role) {
        $scope.selectedRoleName = role.RoleName;
      }

      var data = {
        searchList: [{
          field: 'RoleId',
          operand: '=',
          value: roleId
        }],
        orderByList: []
      }
      pageService.getCustomQuery(data, 568).then(_getRolePermissionSuccessResult, _getRolePermissionErrorResult)

    }

    function _getRolePermissionSuccessResult(result) {
      console.log('permission', result)
      $scope.isLoadingPermission = false;
      $scope.isPermissionLoaded = true;

      for (var n = 0; n < $scope.menuList.length; n++) {
        $scope.menuList[n].checked = false;
        var menu = $filter('findObj')(result, $scope.menuList[n].UIMenuId, 'UIMenuId')
        if (menu != null) {
          $scope.menuList[n].checked = menu.IsAllowed;
        }
      }

      _generateNodes();
    }
    function _getRolePermissionErrorResult(err) {
      console.log(err)
      $scope.isLoadingPermission = false;
      $scope.isPermissionLoaded = false;
    }
    $scope.callMenu = function (roleId) {
      _fetchRolePermission(roleId)
    }



    function _getSelectedChild(childList) {
      console.log(childList)

      for (var n = 0; n < childList.length; n++) {
        if (childList[n].checked) {
          $scope.selectedNodes.push(childList[n].id)
        }

        if (childList[n].children) {
          _getSelectedChild(childList[n].children)
        }
      }
    }
    function _reset() {
      _fetchRolePermission($scope.selectedRoleId)
    }
    _loadController();


    //activity
    function _getRoleMenuActivity(menuId, roleId) {
      $scope.menuId = menuId;
      $scope.roleId = roleId;
      var data = {
        searchList: [
          {
            field: 'UIMenuId',
            operand: '=',
            value: menuId
          }
        ],
        orderByList: []
      }
      pageService.getCustomQuery(data, 598).then(_getRoleMenuActivitySuccess, _getRoleMenuActivityError)
      //570
    }

    function _getRoleMenuActivitySuccess(result) {
      $scope.isShowActivity = true;

      console.log(result)
      // $scope.selectedRoleId = result[0][0].HELDUIMenuId
      $scope.HELPContent = result[0][0].HELPContent;

      $scope.entity = result[0][0];
    }
    function _activityOnChange(value, isSelected) {
      console.log(value)
      if (value == 0) {
        if (isSelected) {
          angular.forEach($scope.activityList, function (data) {
            data.IsAllowed = true;
          })


        }
        else {
          angular.forEach($scope.activityList, function (data) {
            data.IsAllowed = false;
          })

        }

      }

    }
    function _getRoleMenuActivityError(err) {
      console.log(err)
    }
    function _validate(newEntity, oldEntity) {
      if (angular.equals(newEntity, oldEntity)) {
        return true;
      }
      else {
        return false;
      }
    }
    function _saveHelp() {
      // if (!_validate($scope.activityList, $scope.oldActivityList)) {
      $scope.isSavingActivity = true;
      $scope.isActivitySaved = false;
      $scope.isApplyingChanges = true;

      if ($scope.entity == "N") {
        $scope.entity = {};
      }


      $scope.entity.HELDUIMenuId = $scope.selectedMenuId
      $scope.entity.HELPContent = $scope.HELPContent;

      console.log($scope.entity);

      editFormService.saveForm(helpPageId, $scope.entity, vm.oldEntity,
        $scope.entity.HELDId == undefined ? "create" : "edit", "Help Content Detail", $scope.editForm, true)
        .then(_saveFormSuccessResult, _saveFormErrorResult)
      // }
      // else {
      //   $scope.showMsg("info", "Nothing to save");
      // }
    }

    function _saveFormSuccessResult(result) {
      $scope.isSavingActivity = false;
      $scope.isActivitySaved = true;
      $scope.isApplyingChanges = false;
      $scope.showMsg('success', 'Saved Successfully.')

      // $scope.entity = {};
      // $scope.page.refreshData();

    }

    function _saveFormErrorResult(error) {
      console.log(error);
      console.log(err)
      $scope.isApplyingChanges = false;
      $scope.isSavingActivity = false;
      $scope.isActivitySaved = false;
    }

   

    $scope.myClick = function (node) {

      //alert('Clicked [' + node.name + '] state is [' + node.checked + ']');
      // var param = { node: node, roleId: $scope.selectedRoleId }
      // var confirm = dialog.confirm(param);
      // confirm.result.then(function (btn) {

      // });
      $scope.selectedMenuName = node.name;
      $scope.selectedMenuId = node.id;
      _getRoleMenuActivity(node.id, $scope.selectedRoleId)
    };

  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// DIALOG  ////////////////////////////////////////////////////////////////////////////////
  angular.module('BlurAdmin.pages.help').controller('dialogConfirmCtrl', ['$scope', '$uibModalInstance', 'pageService', 'param',
    function ($scope, $uibModalInstance, pageService, param) {
      //-- Variables -----//
      console.log(param)
      //-- Methods -----//

      function _getRoleMenuActivity() {
        var data = {
          searchList: [
            {
              field: 'UIMenuId',
              operand: '=',
              value: param.node.id
            },
            {
              field: 'RoleId',
              operand: '=',
              value: param.roleId
            }
          ],
          orderByList: []
        }
        pageService.getCustomQuery(data, 570).then(_getRoleMenuActivitySuccess, _getRoleMenuActivityError)

      }

      function _getRoleMenuActivitySuccess(result) {
        console.log(result)
        $scope.activityList = result;
        $scope.oldActivityList = angular.copy(result);
      }
      function _getRoleMenuActivityError(err) {
        console.log(err)
      }

      _getRoleMenuActivity();

      $scope.no = function () {
        $uibModalInstance.dismiss('no');
      }; // end close

      $scope.yes = function () {
        $uibModalInstance.close('yes');
      }; // end yes
    }
  ])
})();


