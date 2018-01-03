//import { error } from "util";

/**
 * @author deepak.jain
 * created on 10.07.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .controller('authController', authController);
    function authController($scope, pageService, DJWebStore, authService) {

        var vm = this;
        //fetching dev api url
        if (DJWebStore.IsDev()) {
            $scope.devAPIUrl = DJWebStore.GetValue('devAPIUrl');
            // alert($scope.devAPIUrl)
        }

        $scope.languageList = [];

        $scope.languageList.push({
            label: 'English', value: 'en'
        })

        $scope.languageList.push({
            label: 'हिन्दी (Hindi)', value: 'hi'
        })

        $scope.languageList.push({
            label: 'Kiswahili (Swahili)', value: 'sw'
        })

        $scope.selectedLanguage = $scope.languageList[0];

        $scope.doLogin = _doLogin;

        function _loadController() {
            //_getAppData();
        }

        function _getAppData() {
            pageService.getOnlyAppData().then(function (result) {
                var appData = result;// angular.fromJson(response.data);
                console.log(appData)
                DJWebStore.SetAppData(appData);
                appData = DJWebStore.GetAppData()
                console.log(appData)

                vm.appData = appData;
                vm.page = {};
                vm.page.appName = appData.AppName;
                vm.page.appVer = appData.AppVersion;

                $(document).prop('title',
                    appData.AppName + ' ' +
                    appData.AppVersion);

                vm.isPageLoaded = true;
                vm.isLoadSuccess = true;
            }, function (err) {
                console.log(err);
                vm.isPageLoaded = true;
                vm.isLoadSuccess = false;
            });
        }

        function _doLogin() {

            var userName = $("#userName").val();
            var userPwd = $("#userPassword").val();
            var userCorpoId = $("#userCorpoId").val();

            if (DJWebStore.IsDev()) {
                //only for development mode - dj@03.01.2017
                //it will handle the re writing of api url from webStore
                if (userCorpoId == '~d') {
                    $("#userCorpoId").val('')
                    if (!$scope.showDevAPI) {
                        $scope.showDevAPI = true
                        return;
                    }
                }
                DJWebStore.SetValue('devAPIUrl', $scope.devAPIUrl);
            }

            if (userName == "") {
                alert('Please enter User Name');
                console.log(userName)
                return;
            }
            if (userName == "") {
                alert('Please enter Password');
                console.log(userName)
                return;
            }

            if (userCorpoId == "") {
                alert('Please enter Corporate Id');
                console.log(userName)
                return;
            }

            console.log($scope.selectedLanguage)

            $("#userName").prop("disabled", true);
            $("#userPassword").prop("disabled", true);
            $("#btnlogin").prop("disabled", true);
            $("#userLanguage").prop("disabled", true);
            $("#userCorpoId").prop("disabled", true);
            $("#btnlogin").text("Please Wait..");

            var loginData = {
                "userName": userName,
                "password": userPwd
            };

            DJWebStore.SetValue('CorpoId', userCorpoId);
            DJWebStore.SetValue('UserLang', $scope.selectedLanguage.value);

            authService.login(loginData, userCorpoId, $scope.selectedLanguage.value).then(function (response) {

                console.log(response)
                $scope.GetBGClass()
                pageService.getAppUserData().then(function (result) {

                    console.log(result)
                    var profileData = result;//angular.fromJson(response.data);
                    DJWebStore.SetUserProfile(profileData.user);
                    DJWebStore.SetSysParam(profileData.sys.param);
                    DJWebStore.SetCompany(profileData.company);
                    _loadSideMenu();
                    // window.location.href = 'index.html'
                }, function (err) {
                    $scope.showMsg('error', err)
                });
            },
                function (err) {

                    console.log(err)
                    if (err.status) {
                        if (err.status == 400) {
                            $scope.showMsg('warning', 'The user name or password is incorrect.')
                            //alert('The user name or password is incorrect.');
                        }
                        else if (err.status == 500) {
                            $scope.showMsg('warning', 'Please check your Customer.Id');
                        }
                        else if (err.status == -1) {
                            $scope.showMsg('error', 'Cross Authentication Failed')
                        }
                    }
                    else if (err.error_description !== undefined) {
                        //alert(err.error_description);
                        $scope.showMsg('error', err.error_description)
                    }
                    else {
                        $scope.showMsg('error', err)
                    }

                    $("#userName").prop("disabled", false);
                    $("#userPassword").prop("disabled", false);
                    $("#userLanguage").prop("disabled", false);
                    $("#btnlogin").prop("disabled", false);
                    $("#userCorpoId").prop("disabled", false);
                    $("#btnlogin").text("Sign in");
                });
        }

        function _loadSideMenu() {

            // $scope.sideMenu = DJWebStore.GetValue('sidemenu');
            // if ($scope.sideMenu == null) {

            // }
            // else {
            //     //_setupMenu();
            // }

            pageService.getNavigation().then(_sideMenuSuccessResult, _sideMenuErrorResult);

        }
        function _sideMenuSuccessResult(result) {
            console.log(result)
            $scope.sideMenu = result;
            DJWebStore.SetValue('sidemenu', $scope.sideMenu);
            //_setupMenu();

            window.location.href = 'index.html'
        }
        function _sideMenuErrorResult(err) {

        }

        _loadController();
    }

})();