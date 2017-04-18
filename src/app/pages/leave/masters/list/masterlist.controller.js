/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.masters')
    .controller('LeaveMastersListController', LeaveMastersListController);

  /** @ngInject */
  function LeaveMastersListController($stateParams,  mailMessages, addModal) {
    var vm = this;
    vm.messages = mailMessages.getMessagesByLabel($stateParams.label);
    vm.label = $stateParams.label;

    vm.showAdd = function(){
      addModal.open({
        subject : 'subject',
        to: 'to',
        text: 'text'
      })
    };

  }

})();
