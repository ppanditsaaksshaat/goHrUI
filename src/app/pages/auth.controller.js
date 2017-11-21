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

        $scope.languageList = [];

        $scope.languageList.push({
            label: 'English', value: 'en'
        })

        $scope.languageList.push({
            label: 'Hindi', value: 'hi'
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

            authService.login(loginData, userCorpoId).then(function (response) {
                console.log(response)
                pageService.getAppUserData().then(function (result) {

                    console.log(result)
                    var profileData = result;//angular.fromJson(response.data);
                    DJWebStore.SetUserProfile(profileData.user);
                    _loadSideMenu();
                    // window.location.href = 'index.html'
                }, function (err) {
                    console.log(err);
                });
            },
                function (err) {
                    console.log(err);
                    if (err.error_description !== undefined) {
                        alert(err.error_description);
                        console.log('New controller');
                    }
                    else {
                        alert('Something went wront, please try again.');
                    }
                    $("#userName").prop("disabled", false);
                    $("#userPassword").prop("disabled", false);
                    $("#userLanguage").prop("disabled", false);
                    $("#btnlogin").prop("disabled", false);
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