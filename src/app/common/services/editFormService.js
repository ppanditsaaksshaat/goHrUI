/**
 * @author deepak.jain
 * created on 18/14/2017
 */

'use strict';

angular.module('BlurAdmin.common')
    .factory('editFormService', ['pageService', 'DJWebStore', 'toastr', 'toastrConfig', '$uibModal', '$state',
        editFormService])
    .controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'confirmClick', 'confirmMessge',
        ModalConfirmCtrl]);

//Controller for confirm box
function ModalConfirmCtrl($scope, $uibModalInstance, confirmClick, confirmMessge, pageId, data, stateUrl, title) {
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
}
//Controller for save edit form
function editFormService(pageService, DJWebStore, toastr, toastrConfig, $uibModal, $state) {

    var toastOption = {};
    var defaultConfig = angular.copy(toastrConfig);
    var openedToasts = [];
    toastOption = {
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
    //calling func from outer side of factory
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

        pageService.editPageData(pageId, JSON.stringify(data)).then(function (result) {

            if (result.error_message === undefined) {
                if (result.success_message === undefined) {
                    _showToast('error', 'Something went wrong', title)
                }
                else {
                    _showToast('success', result.success_message, title)
                    $state.go(stateUrl, { pageId: pageId }, {})
                }
            }
            else {
                _showToast('error', result.error_message, title)
            }

        }, function (err) {
            console.log(err)
            _showToast('error', err, title)
        });
    }

    function _showToast(type, msg, title) {
        toastOption.type = type;
        angular.extend(toastrConfig, toastOption);
        openedToasts.push(toastr[toastOption.type](msg, title));
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

    var editForm = {};
    editForm.saveForm = _saveEditForm;
    return editForm;
}
