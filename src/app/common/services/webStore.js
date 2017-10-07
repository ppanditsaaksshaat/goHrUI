'use strict';
angular.module('BlurAdmin.common').factory('DJWebStore', ['localStorageService', '$location', '$rootScope', function (localStorageService, $location, $rootScope) {

    var _serviceBaseURL = '/API/';

    var authorizationDataKey = 'authorizationData';
    var profileDataKey = 'profileData';
    var pageDataKey = 'pageData';
    var appDataKey = 'appData';
    var pageRequest = 'pageRequest';
    var bgClass = 'bgClass';



    var djWebStoreFactory = {};

    var _setRequestIsBusy = function () {
        return localStorageService.set(pageRequest, true);
    }
    var _releaseRequest = function () {
        return localStorageService.set(pageRequest, false);
    }

    var _getRequestIsBusy = function () {
        var request = localStorageService.get(pageRequest);
        if (request == null)
            request = false;
        return request;
    }

    var _getUserProfile = function () {
        return localStorageService.get(profileDataKey);
    }
    var _setUserProfile = function (profileData) {
        return localStorageService.set(profileDataKey, profileData);
    }

    var _getAuthorization = function () {
        return localStorageService.get(authorizationDataKey);
    }
    var _setAuthorization = function (authorizationData) {
        return localStorageService.set(authorizationDataKey, authorizationData);
    }

    var _getPageData = function () {
        return localStorageService.get(pageDataKey);
    }
    var _setPageData = function (pageData) {
        return localStorageService.set(pageDataKey, pageData);
    }

    var _getAppData = function () {
        return localStorageService.get(appDataKey);
    }
    var _setAppData = function (appData) {
        return localStorageService.set(appDataKey, appData);
    }
    var _setValue = function (key, value) {
        return localStorageService.set(key, value);
    }
    var _getValue = function (key) {
        return localStorageService.get(key);
    }
    var _removeAllKey = function () {
        localStorageService.remove(authorizationDataKey);
        localStorageService.remove(profileDataKey);
        localStorageService.remove(pageDataKey);
        localStorageService.remove(appDataKey);
        localStorageService.remove('serviceBase');
        localStorageService.clearAll();
        //$localStorage.$reset()
    }
    var _removeKey = function (key) {
        localStorageService.remove(key);
    }
    var _logout = function () {
        console.log('Logout from system');
        _removeAllKey();
        window.location.href = 'auth.html';
    }
    var _getServiceBase = function () {

        var serviceBase = _getValue('serviceBase');
        //uncomment for your choice

        //serviceBase = 'http://localhost:51877/';
        //serviceBase = 'http://rudraitsl.com/api/';// _getValue('serviceBase');
        //serviceBase = 'http://web300.com/api/';// _getValue('serviceBase');
        // serviceBase ='http://web200.com/api/';// _getValue('serviceBase');
        serviceBase = 'http://web400.hrms/api/';
        // serviceBase = 'http://localhost/api/';
        // serviceBase = 'http://itsllive.rudra.hrm/api/';
        // serviceBase = 'http://seacliffnew.rudra.hrm/api/'
        // serviceBase = null;
        // console.log($location)
        if (serviceBase == null) {
            var host = $location.host();
            // serviceBase = 'http://' + host + '/api/'
            
            // console.log($location)
            var absUrl = $location.absUrl();
            if (absUrl.indexOf('.html') > 0) {
                absUrl = absUrl.substring(0, absUrl.indexOf('.html'))
            }
            console.log(absUrl);
            var lastIdx = absUrl.lastIndexOf('/');
            var firstIdx = absUrl.indexOf('/');
            var hostIdx = absUrl.indexOf(host);
            serviceBase = absUrl.substring(hostIdx + host.length, lastIdx) + '/api/';
            _setValue('serviceBase', serviceBase);
            console.log(serviceBase)
        }
        return serviceBase;
    }

    var _getBaseUrl = function () {
        var host = $location.host();
        var absUrl = $location.absUrl().replace('#/', '');
        var lastIdx = absUrl.lastIndexOf('/');
        var firstIdx = absUrl.indexOf('/');
        var hostIdx = absUrl.indexOf(host);
        var baseUrl = absUrl.substring(hostIdx + host.length, lastIdx);
        return baseUrl;
    }
    function _validateUser() {
        var urlPath = $location.absUrl();
        var authData = _getAuthorization();
        if (authData == null) {
            if (urlPath.indexOf('auth.html') < 0) {
                _logout();
            }
            return;
        }

        var expiresLocal = moment(moment.utc(authData.expires).toDate());
        // console.log(moment())
        var localTime = moment()
        var timeSpan = expiresLocal.diff(localTime, 'minute')
        // var timeSpan2 = expires.diff(moment(authData.issued))

        if (timeSpan < 0) {
            //token expired 
            if (urlPath.indexOf('auth.html') < 0) {
                _logout();
            }
            return;
        }

        var profileData = _getUserProfile();
        var appData = _getAppData();

        var data = { app: appData, profile: profileData, auth: authData }

        $rootScope.user = data;

        return data;
    }

    function _setBGClass(bgClassData) {
        return localStorageService.set(bgClass, bgClassData);
    }
    function _getBGClass() {
        return localStorageService.get(bgClass);
    }

    function _setPageResult(pageId, pageData) {
        if ($rootScope.pages === undefined) {
            $rootScope.pages = {};
        }

        $rootScope.pages['page_' + pageId] = pageData;
    }
    function _getPageResult(pageId) {
        if ($rootScope.pages !== undefined)
            return $rootScope.pages['page_' + pageId];
        else {
            return undefined;
        }
    }
    function _setParam(param) {
        $rootScope.param = param;
    }
    function _getParam() {
        return $rootScope.param;
    }
    function _clearParam() {
        $rootScope.param = undefined;
    }

    //func
    djWebStoreFactory.GetUserProfile = _getUserProfile;
    djWebStoreFactory.SetUserProfile = _setUserProfile;
    djWebStoreFactory.GetAuthorization = _getAuthorization;
    djWebStoreFactory.SetAuthorization = _setAuthorization;
    djWebStoreFactory.GetPageData = _getPageData;
    djWebStoreFactory.SetPageData = _setPageData;
    djWebStoreFactory.GetAppData = _getAppData;
    djWebStoreFactory.SetAppData = _setAppData;
    djWebStoreFactory.GetValue = _getValue;
    djWebStoreFactory.SetValue = _setValue;

    //Remove All Keys
    djWebStoreFactory.RemoveAll = _removeAllKey;
    djWebStoreFactory.RemoveKey = _removeKey;

    djWebStoreFactory.Logout = _logout;

    djWebStoreFactory.GetServiceBase = _getServiceBase;

    //Request
    djWebStoreFactory.GetRequestIsBusy = _getRequestIsBusy;
    djWebStoreFactory.SetRequestIsBusy = _setRequestIsBusy;
    djWebStoreFactory.ReleaseRequest = _releaseRequest;


    djWebStoreFactory.ValidateUser = _validateUser;

    djWebStoreFactory.SetBGClass = _setBGClass;
    djWebStoreFactory.GetBGClass = _getBGClass;
    djWebStoreFactory.SetPageResult = _setPageResult;
    djWebStoreFactory.GetPageResult = _getPageResult;

    djWebStoreFactory.SetParam = _setParam;
    djWebStoreFactory.GetParam = _getParam;
    djWebStoreFactory.ClearParam = _clearParam;

    return djWebStoreFactory;
}]);
