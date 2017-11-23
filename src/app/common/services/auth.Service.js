//This Factory Inherting Our own factory called DJWebStore - /// <reference path="assets/angular-appJS/app-04-webstore-service.js" />
//This Factory is used to call token & register method through out own c# WebAPI  


'use strict';

angular.module('BlurAdmin.common').factory('authService', ['$http', '$q', 'DJWebStore', function ($http, $q, DJWebStore) {

    var serviceBase = DJWebStore.GetServiceBase();
    var urlRegister = serviceBase + 'api/account/register';
    var urlLogin = serviceBase + 'token';

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(urlRegister, registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData, corpoId) {

        // var corpoId = DJWebStore.GetValue('CorpoId');
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        var headers = {}
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers['CorpoId_' + corpoId] = corpoId;

        $http.post(urlLogin, data, {
            headers: headers 
        })
            .then(function (response) {
                var result = angular.fromJson(response.data);
                console.log(result)
                _authentication = {
                    token: result.access_token,
                    expires: result['.expires'],
                    issued: result['.issued'],
                    userName: loginData.userName,
                    userPwd: loginData.password
                }
                _authentication.isAuth = true;

                DJWebStore.SetAuthorization(_authentication);

                deferred.resolve(_authentication);
            }, function (err) {
                deferred.reject(err);
            })
        return deferred.promise;

    };

    var _logOut = function () {

        DJWebStore.RemoveAll();
        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = DJWebStore.GetAuthorization();
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }


    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);

//Service Created by Deepak Jain http://deepjain1290.blogspot.com
//Email : deepjain1290@gmail.com
//for any help
//01-July-2016