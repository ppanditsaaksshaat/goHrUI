/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail')
      .controller('MailTabCtrl', MailTabCtrl);

  /** @ngInject */
  function MailTabCtrl(composeModal, mailMessages, pageService) {
    debugger;
    pageService.getPagData(1).then(function(result){
      console.log(result)
    }, function(err){

    })
    var vm = this;
    vm.navigationCollapsed = true;
    vm.showCompose = function(subject, to , text){
      composeModal.open({
        subject : subject,
        to: to,
        text: text
      })
    };

    vm.tabs = mailMessages.getTabs();
  }

})();
