//This Factory Inherting Our own factory called DJWebStore - /// <reference path="assets/angular-appJS/app-04-webstore-service.js" />
//This is a Interceptor for our all WebApi call, it will add authorization header in our all request

'use strict';
angular.module('BlurAdmin.common').factory('authInterceptorService', ['$q', '$location', 'DJWebStore', function ($q, $location, DJWebStore) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = DJWebStore.GetAuthorization();
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
            //console.log(authData.token)
        }
console.log (config)
        // config.defaults.useXDomain = true;
        // delete config.defaults.headers.common['X-Requested-With'];

        DJWebStore.SetRequestIsBusy();
        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        else {
            //setup error display

        }
        //console.log('reject');
        //console.log(rejection)
        return $q.reject(rejection);
    }

    var _response = function (response) {
        if (response.statusText != 'OK') {
            console.log(response)
        }
        if (response.config.url.endsWith('token')
            || response.config.url.endsWith('GetFile')
            || response.config.url.endsWith('GetAttach')) {
        }
        else if (response.config.url.startsWith('/api/')) {
            var result = {};
            if (response.data !== undefined) {
                var result_data = angular.fromJson(response.data);
                result = result_data;

                if (result_data.lz !== undefined) {
                    if (result_data.lz) {
                        var paramData = LZString.decompressFromEncodedURIComponent(result_data.data);
                        result = angular.fromJson(paramData);
                    }
                }
            }
            response = angular.copy(result);
        }
        //var newresponse = response;
        //if (response.data !== undefined) {
        //    console.log(response.data)
        //    var objData = angular.fromJson(response.data);
        //    if (objData.lz !== undefined) {
        //        if (objData.lz) {
        //            var decompressed = LZString.decompressFromEncodedURIComponent(objData.data);
        //            console.log(decompressed)
        //        }
        //    }
        //    else {

        //    }
        //}
        return response;
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
    authInterceptorServiceFactory.response = _response;
    //console.log(authInterceptorServiceFactory);
    return authInterceptorServiceFactory;
}]);

angular.module('BlurAdmin.common').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
//Service Created by Deepak Jain http://deepjain1290.blogspot.com
//Email : deepjain1290@gmail.com
//for any help
//01-July-2016