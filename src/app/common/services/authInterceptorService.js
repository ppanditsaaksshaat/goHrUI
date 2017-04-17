/**
 * @author deepak.jain
 * created on 14/04/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.common')
      .service('authInterceptorService', authInterceptorService);

function authInterceptorService($q, $location){
   var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = DJWebStore.GetAuthorization();
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
            //console.log(authData.token)
        }
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
}


  angular.module('BlurAdmin.common').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  });    
  
})