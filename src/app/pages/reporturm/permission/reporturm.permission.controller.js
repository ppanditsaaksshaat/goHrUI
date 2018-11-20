/**
 * @author deepak.jain
 * created on 14.09.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reporturm.permission')
    .controller('reporturmPermissionController', reporturmPermissionController);

  /** @ngInject */
  function reporturmPermissionController($scope, $state, $stateParams,
    pageService, editableOptions, editableThemes, DJWebStore, dialogModal, editFormService,
    toastr, dialog, $filter) {
    $scope.nodes = [];
    $scope.savePermission = _savePermission;
    // $scope.nodes = [
    //   {
    //     id: 2, name: '1ª Habilitação', checked: true,
    //     entity: [
    //       {
    //         entidade: {
    //           img: 'http://placehold.it/500',
    //           obrigatorio: true
    //         }
    //       }
    //     ],

    //     children: [
    //       { id: 3, name: 'Level2 - A', checked: true },
    //       { id: 4, name: 'Level2 - B', checked: true }
    //     ]
    //   },

    //   {
    //     id: 3, name: 'Veículo', checked: true,
    //     entity: [
    //       {
    //         entidade: {
    //           img: 'http://placehold.it/500',
    //           obrigatorio: true
    //         }
    //       }
    //     ],

    //     children: [
    //       { id: 3, name: 'Level2 - A', checked: true },
    //       { id: 4, name: 'Level2 - B', checked: true },
    //       {
    //         id: 5, name: 'Level2 - C', checked: true, children: [
    //           { id: 6, name: 'Level3 - A', checked: false },
    //           {
    //             id: 7, name: 'Level3 - B', checked: false, children: [
    //               { id: 8, name: 'Level4 - A', checked: false }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     id: 4, name: 'Habilitação', checked: true,
    //     entity: [
    //       {
    //         entidade: {
    //           img: 'http://placehold.it/500',
    //           obrigatorio: true
    //         }
    //       }
    //     ],

    //     children: [
    //       { id: 3, name: 'Level2 - A', checked: true },
    //       { id: 4, name: 'Level2 - B', checked: true },
    //       {
    //         id: 5, name: 'Level2 - C', checked: true, children: [
    //           { id: 6, name: 'Level3 - A', checked: false },
    //           {
    //             id: 7, name: 'Level3 - B', checked: false, children: [
    //               { id: 8, name: 'Level4 - A', checked: false }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   },
    // ];

    function _loadController() {
      var data = {
        searchList: [],
        orderByList: []
      }

      pageService.getCustomQuery(data, 679).then(_getCustomQuerySuccessResult, _getCustomQueryErrorResult)

    }

    function _getCustomQuerySuccessResult(result) {
      // $scope.nodes = result;
      console.log(result)
      $scope.menuList = result;
      angular.forEach(result, function (value, key) {
        var node = { id: value.RUIMenuId, name: value.RUIMenuName }
        // $scope.nodes.push(node)
        console.log(key);
        console.log(value)
        $scope.nodes.push(node);
      });

      // for (var p = 0; p < result.length; p++) {
      //   var node = { id: result[p].UIMenuId, name: result[p].RUIMenuName }
      //   var childList = _getChild(result[p].UIMenuId)
      //   if (childList) {
      //     node.children = childList;
      //   }
      //   $scope.nodes.push(node);
      // }

      // var parentMenu = $filter('findAll')($scope.menuList, 0, 'UIMenuParentMenuId')

      // for (var p = 0; p < parentMenu.length; p++) {
      //   var node = { id: parentMenu[p].UIMenuId, name: parentMenu[p].ResourceText, checked: parentMenu[p].checked }
      //   var childList = _getChild(parentMenu[p].UIMenuId)
      //   if (childList) {
      //     node.children = childList;
      //   }
      //   $scope.nodes.push(node);
      // }


    }

    // function _getChild(UIMenuId) {
    //   var children = $filter('findAll')($scope.menuList, UIMenuId, 'RUIMenuParentMenuId')
    //   if (children != null) {
    //     var returnList = [];
    //     for (var p = 0; p < children.length; p++) {
    //       var node = { id: children[p].RUIMenuId, name: children[p].ResourceText }
    //       var childList = _getChild(children[p].RUIMenuId)
    //       if (childList) {
    //         node.children = childList;
    //       }

    //       returnList.push(node);
    //     }

    //     return returnList;
    //   }
    //   else {
    //     return undefined;
    //   }
    // }

    function _getCustomQueryErrorResult(error) {

    }
    _loadController();




    // $scope.myClick = function(node) {
    //   //alert('Clicked [' + node.name + '] state is [' + node.checked + ']');

    //   var confirm = dialog.confirm('Editar', node);
    //   confirm.result.then(function(btn) {

    //   });
    // };


    function _savePermission() {
      // if (!_validate($scope.nodes, $scope.oldNodes)) {
      $scope.selectedNodes = [];
      for (var n = 0; n < $scope.nodes.length; n++) {
        if ($scope.nodes[n].checked) {
          $scope.selectedNodes.push($scope.nodes[n].id)
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
      data.searchList.push({ field: 'menuId', operand: '=', value: selectedNodeString });
      $scope.isApplyingChanges = true;
      pageService.getCustomQuery(data, 569).then(_getApplyChangesSuccess, _getApplyChangesError)

      // }
      // else {
      //   $scope.showMsg("info", "Nothing to save");
      // }
    }


  }
})();


