angular.module('BlurAdmin.common').service('fileUpload', ['$http', '$rootScope', function ($http, $rootScope) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            $rootScope.$broadcast('fileUploadComplete', response);
        }, function (err) {
            $rootScope.$broadcast('fileUploadCompleteError', err);
        })
    }
}])