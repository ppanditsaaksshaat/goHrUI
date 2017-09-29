angular.module('BlurAdmin.common').directive('treeView', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            localNodes: '=model',
            localClick: '&click'
        },
        link: function (scope, tElement, tAttrs, transclude) {

            var maxLevels = (angular.isUndefined(tAttrs.maxlevels)) ? 10 : tAttrs.maxlevels;
            var hasCheckBox = (angular.isUndefined(tAttrs.checkbox)) ? false : true;
            scope.showItems = [];

            scope.showHide = function (ulId, node) {
                var hideThis = document.getElementById(ulId);
                var showHide = angular.element(hideThis).attr('class');

                node.expanded = (showHide === 'show' ? false : true);

                angular.element(hideThis).attr('class', (showHide === 'show' ? 'hide' : 'show'));
            }

            scope.showIcon = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            scope.checkIfChildren = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            scope.showCheckbox = function (node) {
                if(angular.isUndefined(node.showCheckbox))
                    return true;
                else 
                    return node.showCheckbox;
            }

            /////////////////////////////////////////////////
            /// SELECT ALL CHILDRENS
            // as seen at: http://jsfiddle.net/incutonez/D8vhb/5/
            function parentCheckChange(item) {
                for (var i in item.children) {
                    item.children[i].checked = item.checked;
                    if (item.children[i].children) {
                        parentCheckChange(item.children[i]);
                    }
                }
            }

            scope.checkChange = function (node) {
                if (node.children) {
                    parentCheckChange(node);
                }
            }
            /////////////////////////////////////////////////

            function renderTreeView(collection, level, max) {
                var text = '';
                text += '<li ng-repeat="n in ' + collection + '" >';
                text += '<span ng-show=showIcon(n) class="show-hide" ng-click="showHide(n.id, n)"><i ng-show="!n.expanded" class="fa fa-plus-square"></i><i ng-show="n.expanded" class="fa fa-minus-square"></i></span>';
                text += '<span ng-show=!showIcon(n) style="padding-right: 13px"></span>';

                if (hasCheckBox) {
                    text += '<input ng-show=showCheckbox(n) class="tree-checkbox" type=checkbox ng-model=n.checked ng-change=checkChange(n)>';
                }


                text += '<span ng-show=showCheckbox(n) class="edit" ng-click=localClick({node:n})><i class="fa fa-pencil"></i></span>'
                text += '<span ng-show=!showCheckbox(n)>  </span>'


                text += '<label>{{n.name}}</label>';

                if (level < max) {
                    text += '<ul id="{{n.id}}" class="hide" ng-if=checkIfChildren(n)>' + renderTreeView('n.children', level + 1, max) + '</ul></li>';
                } else {
                    text += '</li>';
                }

                return text;
            }// end renderTreeView();

            try {
                var text = '<ul class="tree-view-wrapper">';
                text += renderTreeView('localNodes', 1, maxLevels);
                text += '</ul>';
                tElement.html(text);
                $compile(tElement.contents())(scope);
            }
            catch (err) {
                tElement.html('<b>ERROR!!!</b> - ' + err);
                $compile(tElement.contents())(scope);
            }
        }
    };
});