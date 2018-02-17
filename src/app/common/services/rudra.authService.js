/**
 * @author deepak.jain
 * created on 14/04/2017
 */
(function () { 
  'use strict';

  angular.module('BlurAdmin.common')
      .service('authService', authService);


function authService($http, $q){
    var serviceBase = 'http://web200.com/api';
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

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();
        $http.post(urlLogin, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(
            function (response) {
                console.log(response)
            DJWebStore.SetAuthorization({ token: response.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

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
}
})