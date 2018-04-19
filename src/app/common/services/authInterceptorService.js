//This Factory Inherting Our own factory called DJWebStore - /// <reference path="assets/angular-appJS/app-04-webstore-service.js" />
//This is a Interceptor for our all WebApi call, it will add authorization header in our all request

'use strict';
angular.module('BlurAdmin.common').factory('authInterceptorService', ['$q', '$location', 'DJWebStore', '$rootScope', 'cfpLoadingBar', function ($q, $location, DJWebStore, $rootScope, cfpLoadingBar) {

    var authInterceptorServiceFactory = {};
    authInterceptorServiceFactory.progressModalInstance = undefined;
    authInterceptorServiceFactory.isProgressIsOpened = false;
    var _request = function (config) {

        config.headers = config.headers || {};


        var corpoId = DJWebStore.GetValue('CorpoId');
        var userLang = DJWebStore.GetValue('UserLang');
        var levelQueried = DJWebStore.GetValue('LevelQueried');
        var getAllLevel = DJWebStore.GetValue('GetAllLevel');
        
        if (corpoId == null)
            config.headers.CorpoId = '';
        else
            config.headers.CorpoId = corpoId;

        if (userLang == null)
            config.headers.UserLang = 'en';
        else
            config.headers.UserLang = userLang;

        if (levelQueried == null)
            config.headers.LevelQueried = '0';
        else
            config.headers.LevelQueried = levelQueried;
            
        if (getAllLevel == null)
            config.headers.GetAllLevel = '1';
        else
            config.headers.GetAllLevel = getAllLevel;    

        var currentPeriodLastDate = moment($rootScope.currentPeriod);
        config.headers.CurrentPeriod = currentPeriodLastDate.endOf('month').format('YYYY-MM-DD');

        if (config.url.indexOf('/api/') > 0) {
            //console.log(config.url)
            cfpLoadingBar.start();
            // if (!authInterceptorServiceFactory.isProgressIsOpened) {
            //     authInterceptorServiceFactory.progressModalInstance = $rootScope.openProgress();
            //     if (authInterceptorServiceFactory.progressModalInstance) {
            //         authInterceptorServiceFactory.isProgressIsOpened = true;
            //     }
            // }
        }




        var authData = DJWebStore.GetAuthorization();
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
            ////console.log(authData.token)
        }
        // console.log (config)
        // config.defaults.useXDomain = true;
        // delete config.defaults.headers.common['X-Requested-With'];

        DJWebStore.SetRequestIsBusy();
        return config;
    }

    var _responseError = function (rejection) {
        // if (authInterceptorServiceFactory.progressModalInstance) {
        //     authInterceptorServiceFactory.progressModalInstance.close(undefined);
        //     authInterceptorServiceFactory.isProgressIsOpened = false;
        // }

        cfpLoadingBar.complete();

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
        // if (authInterceptorServiceFactory.progressModalInstance) {
        //     authInterceptorServiceFactory.progressModalInstance.close(undefined);
        //     authInterceptorServiceFactory.isProgressIsOpened = false;
        // }

        cfpLoadingBar.complete();

        if (response.statusText != 'OK') {
            //console.log(response)
        }
        if (response.config.url.endsWith('token')
            || response.config.url.endsWith('GetFile')
            || response.config.url.endsWith('GetAttach')
            || response.config.url.endsWith('Register')
            || response.config.url.endsWith('NewPassword')
            || response.config.url.endsWith('UpdateUser')) {
        }
        else if (response.config.url.indexOf('/api/') > -1) {
            var result = {};
            if (response.config.responseType == "arraybuffer") {
                result = angular.copy(response);
            }
            else if (response.data !== undefined) {
                var result_data = angular.fromJson(response.data);
                result = result_data;
                //console.log(result_data.lz,'lz')
                //console.log(result_data,'result_data')
                if (result_data.lz !== undefined) {
                    //console.log('converting request')
                    if (result_data.lz) {               
                        var paramData = LZString.decompressFromEncodedURIComponent(result_data.data);
                        result = angular.fromJson(paramData);
                        //console.log('request converted')
                        //console.log(result)
                    }
                }
            }
            response = angular.copy(result);
        }
        // var newresponse = response;
        // if (response.data !== undefined) {
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
        // }

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