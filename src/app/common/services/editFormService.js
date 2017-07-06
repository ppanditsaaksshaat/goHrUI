/**
 * @author deepak.jain
 * created on 18/14/2017
 */

'use strict';

angular.module('BlurAdmin.common')
    .factory('editFormService', ['pageService', 'DJWebStore', 'toastr', 'toastrConfig', '$uibModal', '$state',
        '$rootScope', 'focus', '$q',
        editFormService])
    .controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'param',
        ModalConfirmCtrl]);


//Controller for save edit form
function editFormService(pageService, DJWebStore, toastr, toastrConfig, $uibModal, $state, $rootScope, focus, $q) {
    var defer = $q.defer()
    var localForm = undefined;
    var isShowConfirmBox = true;
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
    function _saveEditForm(pageId, newEntity, oldEntity, action, title, pageForm, isShowConfirmation) {
        pageForm.defer = $q.defer();
        defer = $q.defer();

        localForm = pageForm;
        isShowConfirmBox = (isShowConfirmation === undefined) ? true : isShowConfirmation;
        var data = {
            oldEntity: oldEntity,
            newEntity: newEntity,
            pageCode: pageId,
            activity: action
        };

        var dataObject = angular.copy(data)

        if (isShowConfirmBox) {
            if (angular.equals(dataObject.newEntity, dataObject.oldEntity)) {
                _showToast('info', 'Nothing to save', title)
            }
            else {
                _showConfirm('Do you want to save ' + title + '?', _confirmClick, _rejectClick, pageId, dataObject, title, pageForm)
            }
        }
        else {
            _confirmClick(pageId, dataObject, title, pageForm)
        }

        return pageForm.defer.promise
    }
    function _rejectClick(pageId, data, title, pageForm) {
        pageForm.defer.reject({ data: data, msg: 'Cancelled' })
    }
    function _confirmClick(pageId, data, title, pageForm) {
        if (localForm) {
            localForm.isSavingForm = true;

            localForm.isErrorOnSaved = false;
            localForm.saveResult = undefined;
            localForm.isSaved = false;
        }
        pageService.editPageData(pageId, JSON.stringify(data)).then(function (result) {


            var isErrorOnSaved = false;
            var saveResult = result;
            var isSavingForm = false;
            var isSaved = true;
            var isAllowEdit = false;


            if (result.error_message === undefined) {
                if (result.success_message === undefined) {
                    pageForm.defer.reject(result)
                    _showToast('error', 'Something went wrong', title)
                }
                else {

                    isSaved = true;

                    // _showToast('success', result.success_message, title)
                    //$rootScope.back();
                    //$rootScope.$broadcast('form-success', result);
                    pageForm.defer.resolve(result)
                }
            }
            else if (result.error_message.Message == 'Record Already Added.') {



                pageForm.defer.reject(result)
                _showToast('error', 'Record Already Added', title)
            }
            else {



                pageForm.defer.reject(result)
                _showToast('error', result.error_message, title)
            }

            if (localForm) {
                localForm.isSaved = isSaved;

                localForm.isErrorOnSaved = false;
                localForm.saveResult = result;
                localForm.isSavingForm = false;
                localForm.isAllowEdit = false;
            }

        }, function (err) {

            if (localForm) {
                localForm.isErrorOnSaved = true;
                localForm.saveResult = result;
                localForm.isSavingForm = false;
                localForm.isSaved = false;
                localForm.isAllowEdit = false;
            }

            pageForm.defer.reject(err)
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

    function _showConfirm(msg, funcConfirm, funcReject, pageId, data, title, pageForm) {

        console.log(data)
        var para = {
            pageId: pageId,
            data: data,
            title: title,
            confirmClick: funcConfirm,
            rejectClick: funcReject,
            confirmMessge: msg,
            pageForm: pageForm
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

    var confirmClick = param.confirmClick, confirmMessge = param.confirmMessge, pageForm = param.pageForm;
    var rejectClick = param.rejectClick;
    console.log(param, confirmMessge)
    $scope.confirmMessage = confirmMessge;
    function closeModal() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.ok = function () {
        confirmClick(param.pageId, param.data, param.title, pageForm);
        closeModal();
    }

    $scope.cancel = function () {
        rejectClick(param.pageId, param.data, param.title, pageForm);
        closeModal();
    }
}