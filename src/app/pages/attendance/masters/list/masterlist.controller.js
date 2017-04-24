/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.attendance.masters')
    .controller('attendanceMastersListController', attendanceMastersListController);

  /** @ngInject */
  function attendanceMastersListController($stateParams,  mailMessages, addModal) {
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
