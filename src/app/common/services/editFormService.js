/**
 * @author deepak.jain
 * created on 18/14/2017
 */

'use strict';

angular.module('BlurAdmin.common')
    .factory('editFormService', ['pageService', 'DJWebStore', 'toastr', 'toastrConfig', '$uibModal', '$state',
        '$rootScope', 'focus',
        editFormService])
    .controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'param',
        ModalConfirmCtrl]);


//Controller for save edit form
function editFormService(pageService, DJWebStore, toastr, toastrConfig, $uibModal, $state, $rootScope, focus) {

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
    function _saveEditForm(pageId, newEntity, oldEntity, action, title, pageForm) {

        var data = {
            oldEntity: oldEntity,
            newEntity: newEntity,
            pageCode: pageId,
            activity: action
        };
        console.log(data)
        if (angular.equals(data.newEntity, data.oldEntity)) {
            _showToast('info', 'Nothing to save', title)
        }
        else {
            _showConfirm('Do you want to save ' + title + '?', _confirmClick, pageId, data, title)
        }
    }

    function _confirmClick(pageId, data, title) {

        pageService.editPageData(pageId, JSON.stringify(data)).then(function (result) {
            if (result.error_message === undefined) {
                if (result.success_message === undefined) {
                    _showToast('error', 'Something went wrong', title)
                }
                else {
                    _showToast('success', result.success_message, title)
                    //$rootScope.back();
                    $rootScope.$broadcast('form-success', result);
                }
            }
            else if (result.error_message.Message == 'Record Already Added.') {

                _showToast('error', 'Record Already Added', title)
            }
            else {
                _showToast('error', result.error_message, title)
            }

        }, function (err) {
            console.log(err)
            _showToast('error', err, title)
        });
    }
    /**
     * 
     * @param {*} type 
     * @param {*} msg 
     * @param {*} title 
     */
    function _showToast(type, msg, title) {
        toastOption.type = type;
        angular.extend(toastrConfig, toastOption);
        openedToasts.push(toastr[toastOption.type](msg, title));
    }

    function _showConfirm(msg, funcConfirm, pageId, data, title) {

        console.log(data)
        var para = {
            pageId: pageId,
            data: data,
            title: title,
            confirmClick: funcConfirm,
            confirmMessge: msg
        }
        var modalInstance = $uibModal.open({
            template: '<div class="modal-header"><h3 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">Yes</button><button class="btn btn-warning" type="button" ng-click="cancel()">No</button></div>',
            controller: 'ModalConfirmCtrl',
            size: 'sm',
            windowClass: 'confirm-window',
            resolve: {
                param: function () {
                    return para;
                }
            }
        });
    }
    function _validateForm(form) {
        var valid = true;
        if (!form['$valid']) {
            if (form['$error'] !== undefined) {
                var err = form['$error'];
                if (err.required) {
                    if (err.required.length > 0) {
                        var fieldName = err.required[0].$name;
                        err.required[0].$setTouched();
                        err.required[0].$setDirty();
                        ////console.log(err)
                        focus(fieldName);
                        valid = false;
                    }
                }

                if (err['emailError']) {
                    if (err.emailError.length > 0) {
                        var fieldName = err.emailError[0].$name;
                        err.emailError[0].$setTouched();
                        err.emailError[0].$setDirty();
                        ////console.log(err)
                        focus(fieldName);
                        valid = false;
                    }
                }
                if (err['email'] !== undefined) {
                    if (err.email.length > 0) {
                        var fieldName = err.email[0].$name;
                        err.email[0].$setTouched();
                        err.emailError[0].$setDirty();
                        ////console.log(err)
                        focus(fieldName);
                        valid = false;
                    }
                }
                if (err['maxlength'] !== undefined) {
                    if (err.maxlength.length > 0) {
                        var fieldName = err.maxlength[0].$name;
                        err.maxlength[0].$setTouched();
                        err.maxlength[0].$setDirty();
                        ////console.log(err)
                        focus(fieldName);
                        valid = false;
                    }
                }
                if (err['pattern'] !== undefined) {
                    if (err.pattern.length > 0) {
                        var fieldName = err.pattern[0].$name;
                        err.pattern[0].$setTouched();
                        err.pattern[0].$setDirty();
                        ////console.log(err)
                        focus(fieldName);
                        valid = false;
                    }
                }
            }
        }

        if (!valid) {
            _showToast('error', 'Please clear all errors', "")
        }
        return valid;
    }
    var editForm = {};
    editForm.saveForm = _saveEditForm;
    editForm.validateForm = _validateForm;
    return editForm;
}
//Controller for confirm box
function ModalConfirmCtrl($scope, $uibModalInstance, param) {

    var confirmClick = param.confirmClick, confirmMessge = param.confirmMessge;

    console.log(param, confirmMessge)
    $scope.confirmMessage = confirmMessge;
    function closeModal() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.ok = function () {
        confirmClick(param.pageId, param.data, param.title);
        closeModal();
    }

    $scope.cancel = function () {
        closeModal();
    }
}