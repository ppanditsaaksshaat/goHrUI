

angular.module('BlurAdmin.common').directive('ngConfirm', ['$uibModal', function ($uibModal) {
    return {
        restrict: 'A',
        scope: {
            ngConfirmMessage: '@',
            ngConfirm: '&'
        },
        link: function (scope, element) {
            element.bind('click', function () {
                var modalInstance = $uibModal.open({
                    template: '<div class="modal-header"><h3 class="modal-title">{{confirmMessage}}</h3></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div>',
                    controller: 'ModalConfirmCtrl',
                    size: 'sm',
                    windowClass: 'confirm-window',
                    resolve: {
                        confirmClick: function () {
                            return scope.ngConfirm;
                        },
                        confirmMessge: function () {
                            return scope.ngConfirmMessage;
                        }
                    }
                });
            });
        }
    }
}]).controller('ModalConfirmCtrl', ['$scope', '$uibModalInstance', 'confirmClick', 'confirmMessge',
    function ($scope, $uibModalInstance, confirmClick, confirmMessge) {
        $scope.confirmMessage = confirmMessge;
        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.ok = function () {
            confirmClick();
            closeModal();
        }

        $scope.cancel = function () {
            closeModal();
        }
    }]);
