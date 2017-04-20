/**
 * @author deepak.jain
 * created on 19.04.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.organization.masters')
        .controller('branchAddController', branchAddController)

        .controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'confirmClick', 'confirmMessge',
            function ($scope, $uibModalInstance, confirmClick, confirmMessge, pageId, data, stateUrl, title) {
                $scope.confirmMessage = confirmMessge;
                function closeModal() {
                    $uibModalInstance.dismiss('cancel');
                }

                $scope.ok = function () {
                    confirmClick(pageId, data, stateUrl, title);
                    closeModal();
                }

                $scope.cancel = function () {
                    closeModal();
                }
            }]);

    function branchAddController($scope, $state, $stateParams, DJWebStore, pageService, toastr, toastrConfig, $uibModal) {
        var defaultConfig = angular.copy(toastrConfig);
        var openedToasts = [];
        $scope.options = {
            autoDismiss: false,
            positionClass: 'toast-top-center',
            type: 'success',
            timeOut: '5000',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: true,
            tapToDismiss: true,
            progressBar: true,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "",
            msg: ""
        };
        $scope.openToast = function (msg, title) {
            angular.extend(toastrConfig, $scope.options);
            openedToasts.push(toastr[$scope.options.type](msg, title));
        };
        $scope.ok = function () {
            return true;
        }

        var vm = this;

        vm.saveForm = _saveForm;
        vm.pageId = $stateParams.pageId;
        vm.action = $stateParams.action;
        if ($stateParams.pkId !== undefined) {
            vm.pkId = $stateParams.pkId;
        }
        vm.selects = { BRLocationId: [] }

        function _loadController() {
            vm.page = DJWebStore.GetValue('Page_' + vm.pageId)

            if (vm.page.pageinfo.filters !== undefined) {

                vm.page.pageinfo.filters.forEach(function (filter) {
                    if (filter.name == "BRLocationId") {
                        vm.selects.BRLocationId = filter.titleMap;
                    }
                }, this);

            }
        }
        function _saveForm(form) {
            console.log(vm.entity, vm.action)
            var newEntity = {
                BRId: 0,
                BRName: vm.entity.BRName,
                BRLocationId: vm.entity.BRLocationId.value
            }

            _saveEditForm(vm.pageId, newEntity, {}, vm.action, vm.page.pageinfo.title, 'organization.masters.label')
        }



        _loadController();

        
        function _saveEditForm(pageId, newEntity, oldEntity, action, title, stateUrl) {
            var data = {
                oldEntity: oldEntity,
                newEntity: newEntity,
                pageCode: pageId,
                activity: action
            };
            if (angular.equals(data.newEntity, data.oldEntity)) {
                _showToast('info', 'Nothing to save', title)
            }
            else {
                _showConfirm('Do you want to save ' + title + '?', _confirmClick, pageId, data, stateUrl, title)
            }
        }

        function _confirmClick(pageId, data, stateUrl, title) {
            console.log(data)
            // pageService.editPageData(pageId, JSON.stringify(data)).then(function (result) {
            //     console.log(result)
            //     if (result.error_message === undefined) {
            //         if (result.success_message === undefined) {
            //             _showToast('error', 'Something went wrong', title)
            //         }
            //         else {
            //             _showToast('success', result.success_message, title)
            //             $state.go(stateUrl, { pageId: pageId }, {})
            //         }
            //     }
            //     else {
            //         _showToast('error', result.error_message, title)
            //     }

            // }, function (err) {
            //     console.log(err)
            //     _showToast('error', err, title)
            // });
        }

        function _showToast(type, msg, title) {
            $scope.options.type = type;
            angular.extend(toastrConfig, $scope.options);
            openedToasts.push(toastr[$scope.options.type](msg, title));
        }

        function _showConfirm(msg, funcConfirm, pageId, data, stateUrl, title) {
            var modalInstance = $uibModal.open({
                template: '<div class="modal-header"><h3 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">Yes</button><button class="btn btn-warning" type="button" ng-click="cancel()">No</button></div>',
                controller: 'ModalConfirmCtrl',
                size: 'sm',
                windowClass: 'confirm-window',
                resolve: {
                    confirmClick: function () {
                        return funcConfirm;
                    },
                    confirmMessge: function () {
                        return msg;
                    },
                    pageId: function () {
                        return pageId;
                    },
                    data: function () {
                        return data;
                    },
                    stateUrl: function () {
                        return stateUrl;
                    },
                    title: function () {
                        return title;
                    }

                }
            });
        }

    }

})();
