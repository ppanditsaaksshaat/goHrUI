/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, $rootScope, fileReader, $filter, $uibModal, editFormService, pageService) {
    // $scope.picture = $filter('profilePicture')('Nasta');



    function _loadController() {
      if ($scope.user.profile.profilePhoto == 'data:image/jpeg;base64,') {
        $scope.picture = $filter('appImage')('theme/no-photo.png');
      }
      else {
        $scope.picture = $scope.user.profile.profilePhoto;
        $scope.olpEmpPic = angular.copy($scope.user.profile.profilePhoto);
      }
      if ($scope.user.profile.empId == 0 && $scope.user.profile.userId != "ITSL_ADMIN" && $scope.user.profile.userId != "ITSL_TEST") {
        $scope.empUserProfile = true;
        var searchList = [];
        searchList.push({ field: 'AspNetUserId', operand: '=', value: $scope.user.profile.userId })
        var data = {
          searchList: searchList,
          orderByList: []
        }
        pageService.getTableData(24, 19, '', '', false, data).then(_getTableDataSuccess, _getTableDataError)
      }
      else {
        $scope.empUserProfile = false;
      }
    }
    function _getTableDataSuccess(result) {
      $scope.picture = result[0].UserPhoto1_64URL;
      $rootScope.profilePicture = result[0].UserPhoto1_64URL;
      $scope.oldProfilePictrue = angular.copy(result[0].UserPhoto1_64URL);
    }
    function _getTableDataError(err) {

    }

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };


    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.addEventListener('change', handleImage, false);
      fileInput.click();

    };
    function handleImage(e) {
      var reader = new FileReader();
      console.log(e)
      reader.readAsDataURL(e.target.files[0], $scope);
      reader.onload = function (event) {
        $scope.picture = reader.result;
      }
    }


    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
        item.href = link;
      });
    };

    $scope.getFile = function () {
      // fileReader.readAsDataUrl($scope.file, $scope)
      //   .then(function (result) {
      //     $scope.picture = result;
      //   });
    };

    $scope.switches = [true, true, false, true, true, false];
    $scope.updateProfile = function () {
      if ($scope.picture == $scope.olpEmpPic) {
        $scope.showMsg("info", "Nothing to save");
        return;
      }
      if ($scope.picture != "assets/img/theme/no-photo.png") {
        var entity = {
          EmpId: $scope.user.profile.empId,
          EmpPhoto1_64URL: $scope.picture
        }
        editFormService.saveForm(25, entity, {},
          'edit', 'Employee Profile', undefined, true)
          .then(_updateSuccessResult, _updateErrorResult)
      }
      else {
        $scope.showMsg("error", "Please select profile pictrue");
      }
    }
    function _updateSuccessResult(result) {
      if (result.success_message == "Record Updated.") {
        $rootScope.profilePicture = result.entity.EmpPhoto1_64URL;
        $scope.showMsg("success", "Profile Update Successfully");
      }
    }
    function _updateErrorResult(err) {
    }
    $scope.updateUserProfile = function () {
      if ($scope.picture == $scope.oldProfilePictrue) {
        $scope.showMsg("info", "Nothing to save");
        return;
      }
      if ($scope.picture != "assets/img/theme/no-photo.png") {
        pageService.updateSingleField(24, "AspNetUserId", $scope.user.profile.userId, "UserPhoto1_64URL", $scope.picture).then(_updateUserSuccessResult, _updateUserErrorResult)
      }
      else {
        $scope.showMsg("error", "Please select profile pictrue");
      }
    }
    function _updateUserSuccessResult(result) {
      console.log(result)
      if (result.success_message == "Updated") {
        $scope.showMsg("success", "User Profile Picture Updted Successfully");
        _loadController();
      }
    }
    function _updateUserErrorResult(err) {
    }

    _loadController();
  }
})();
