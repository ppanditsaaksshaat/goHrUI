/**
 * @author deepak.jain
 * created on 13-06-2017
 */

'use strict';
angular.module('BlurAdmin.common')
    .factory('formService', ['pageService', 'DJWebStore', '$uibModal', '$state',
        '$rootScope', 'focus', '$q', '$timeout',
        formService])

function formService(pageService, DJWebStore, $uibModal, $state, $rootScope, focus, $q, $timeout) {

    function _saveForm() {
        var defer = $q.defer()

        // simulated async function
        $timeout(function () {
            if (Math.round(Math.random())) {
                defer.resolve('data received!')
            } else {
                defer.reject('oh no an error! try again')
            }
        }, 2000)

        return defer.promise
    }
    var form = {};
    form.saveForm = _saveForm;
    // form.validateForm = _validateForm;
    return form;

}        