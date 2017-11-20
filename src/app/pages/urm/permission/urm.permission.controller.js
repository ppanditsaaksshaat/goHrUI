/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.urm.permission')
    .controller('urmPermissionController', urmPermissionController);

  /** @ngInject */
  function urmPermissionController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService,
    toastr, dialog, $filter) {


    $scope.savePermission = _savePermission;
    $scope.saveActivity = _saveActivity;
    $scope.activityOnChange = _activityOnChange;
    $scope.cancelActivity = _cancelActivity;

    $scope.reset = _reset;
    $scope.selectedRoleId = 0;
    var vm = this;
    vm.navigationCollapsed = true;
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
      // var rolePageId = 20;
      // var roleTableId = 25;
      // var data = {
      //   searchList: [],
      //   orderByList: []
      // }
      // var tableData = pageService.getTableData(
      //   roleTableId,
      //   rolePageId,
      //   '', '',
      //   false, data);

      // tableData.then(_getTableSuccessResult, _getTableErrorResult)

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


    function _savePermission() {
      if (!_validate($scope.nodes, $scope.oldNodes)) {
        $scope.selectedNodes = [];
        for (var n = 0; n < $scope.nodes.length; n++) {
          if ($scope.nodes[n].checked) {
            $scope.selectedNodes.push($scope.nodes[n].id)
          }
          if ($scope.nodes[n].children) {
            _getSelectedChild($scope.nodes[n].children)
          }
        }

        var selectedNodeString = '';
        for (var s = 0; s < $scope.selectedNodes.length; s++) {
          selectedNodeString += $scope.selectedNodes[s] + ','
        }

        if (selectedNodeString != '')
          selectedNodeString = selectedNodeString.substr(0, selectedNodeString.length - 1)

        var data = {
          searchList: [],
          orderByList: []
        }
        data.searchList.push({ field: 'roleId', operand: '=', value: $scope.selectedRoleId });
        data.searchList.push({ field: 'menuId', operand: '=', value: selectedNodeString });
        data.searchList.push({ field: 'userId', operand: '=', value: 'itel_admin' });

        $scope.isApplyingChanges = true;
        pageService.getCustomQuery(data, 569).then(_getApplyChangesSuccess, _getApplyChangesError)

      }
      else {
        $scope.showMsg("info", "Nothing to save");
      }
    }
    function _getApplyChangesSuccess(result) {
      $scope.isApplyingChanges = false;
      console.log(result)
      if (result[0][0].result == 'success') {
        $scope.showMsg('success', 'Saved Successfully.')
        _generateNodes();
      }
    }
    function _getApplyChangesError(err) {
      $scope.isApplyingChanges = false;
      console.log(err)
      $scope.showMsg('error', 'Something went wrong')
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
          },
          {
            field: 'RoleId',
            operand: '=',
            value: roleId
          }
        ],
        orderByList: []
      }
      pageService.getCustomQuery(data, 570).then(_getRoleMenuActivitySuccess, _getRoleMenuActivityError)

    }

    function _getRoleMenuActivitySuccess(result) {
      $scope.isShowActivity = true;
      $scope.activityList = result[0];
      if ($scope.activityList.length > 0) {
        $scope.activityList.splice(0, 0, { 'MenuActivityId': 0, 'MenuActivityName': 'all', 'ActText': 'All' })
      }
      else {
        $scope.isShowActivity = false;
      }
      $scope.oldActivityList = angular.copy($scope.activityList)

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
    function _saveActivity() {
      if (!_validate($scope.activityList, $scope.oldActivityList)) {
        $scope.isSavingActivity = true;
        $scope.isActivitySaved = false;
        $scope.isApplyingChanges = true;

        console.log($scope.activityList)
        var selectedActivity = '';
        for (var i = 0; i < $scope.activityList.length; i++) {
          if ($scope.activityList[i].IsAllowed) {
            selectedActivity += $scope.activityList[i].MenuActivityId + ',';
          }
        }
        if (selectedActivity != '')
          selectedActivity = selectedActivity.substr(0, selectedActivity.length - 1);

        var data = {
          searchList: [],
          orderByList: []
        }
        data.searchList.push({ field: 'roleId', operand: '=', value: $scope.selectedRoleId });
        data.searchList.push({ field: 'menuId', operand: '=', value: $scope.selectedMenuId });
        data.searchList.push({ field: 'actId', operand: '=', value: selectedActivity });
        data.searchList.push({ field: 'createdBy', operand: '=', value: 'itsl_admin' });


        pageService.getCustomQuery(data, 571).then(_saveActivitySuccess, _saveActivityError)
      }
      else {
        $scope.showMsg("info", "Nothing to save");
      }
    }
    function _saveActivitySuccess(result) {
      $scope.isSavingActivity = false;
      $scope.isActivitySaved = true;
      $scope.isApplyingChanges = false;

      // console.log(result)
      // console.log(result[0])
      // console.log(result[0][0])
      console.log(result[0][0].result)
      if (result[0][0].result == 'success') {
        _getRoleMenuActivity($scope.menuId, $scope.roleId)
        $scope.showMsg('success', 'Saved Successfully.')
      }
      // if (result.length > 0) {
      //   if (result[0][0].result) {
      //     if (result[0][0].result == 'success') {
      //       $scope.showMsg('success', 'Saved Successfully.')
      //     }
      //   }
      // }
    }
    function _saveActivityError(err) {
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
  angular.module('BlurAdmin.pages.urm.permission').controller('dialogConfirmCtrl', ['$scope', '$uibModalInstance', 'pageService', 'param',
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
  ]).service('dialog', ["$uibModal", function ($uibModal) {
    var _confirm = function (param, stat) {
      return $uibModal.open({
        templateUrl: 'app/pages/urm/permission/confirm.html',
        controller: 'dialogConfirmCtrl',
        backdrop: (stat ? 'static' : true),
        keyboard: (stat ? false : true),
        resolve: {
          param: function () {
            return angular.copy(param);
          }
        }
      }); // end modal.open
    };

    return {
      confirm: _confirm
    };

  }]);
})();


