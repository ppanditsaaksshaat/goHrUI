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
      var rolePageId = 20;
      var roleTableId = 25;
      var data = {
        searchList: [],
        orderByList: []
      }
      var tableData = pageService.getTableData(
        roleTableId,
        rolePageId,
        '', '',
        false, data);

      tableData.then(_getTableSuccessResult, _getTableErrorResult)

      var data = {
        searchList: [],
        orderByList: []
      }
    }
    function _getTableSuccessResult(result) {
      console.log(result)
      _getMenuList();
      $scope.roleList = result;

    }

    function _getTableErrorResult(err) {

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
    function _getApplyChangesSuccess(result) {
      $scope.isApplyingChanges = false;
      console.log(result)
      if (result.length > 0) {
        if (result[0].result) {
          if (result[0].result == 'sucess') {
            $scope.showMsg('success', 'Saved Successfully.')
          }
        }
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



    $scope.myClick = function (node) {
      //alert('Clicked [' + node.name + '] state is [' + node.checked + ']');

      var confirm = dialog.confirm('Editar', node);
      confirm.result.then(function (btn) {

      });
    };

  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  /// DIALOG  ////////////////////////////////////////////////////////////////////////////////
  angular.module('BlurAdmin.pages.urm.permission').controller('dialogConfirmCtrl', ['$scope', '$uibModalInstance', 'header', 'msg',
    function ($scope, $uibModalInstance, header, msg) {
      //-- Variables -----//

      $scope.header = (angular.isDefined(header)) ? header : 'Confirmation';
      //$scope.msg = (angular.isDefined(msg)) ? msg : 'Confirmation required.';
      $scope.node = msg;
      //-- Methods -----//

      $scope.no = function () {
        $uibModalInstance.dismiss('no');
      }; // end close

      $scope.yes = function () {
        $uibModalInstance.close('yes');
      }; // end yes
    }
  ]).service('dialog', ["$uibModal", function ($uibModal) {
    var _confirm = function (header, msg, stat) {
      return $uibModal.open({
        templateUrl: 'app/pages/urm/permission/confirm.html',
        controller: 'dialogConfirmCtrl',
        backdrop: (stat ? 'static' : true),
        keyboard: (stat ? false : true),
        resolve: {
          header: function () {
            return angular.copy(header);
          },
          msg: function () {
            return angular.copy(msg);
          }
        }
      }); // end modal.open
    };

    return {
      confirm: _confirm
    };

  }]);
})();


