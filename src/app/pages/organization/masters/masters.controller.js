/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.organization.masters')
      .controller('OrgMastersController', OrgMastersController);

  /** @ngInject */
  function OrgMastersController(composeModal, mailMessages, pageService) {
    // debugger;
    // pageService.getPagData(1).then(function(result){
    //   console.log(result)
    // }, function(err){

    // })
    var vm = this;
    vm.navigationCollapsed = true;
    vm.showCompose = function(subject, to , text){
      composeModal.open({
        subject : subject,
        to: to,
        text: text
      })
    };

    vm.tabs = _getTabs();

    function _getTabs(){
      
      var tabs = [
        {
          label:'branch',
          name:'Branch',
          pageId:29
        },
        {
          label:'unit',
          name:'Sub Unit',
          pageId:30
        },
      {
        label: 'inbox',
      name: 'Departments',
      newMails: 7,
      pageId:30
    }, {
      label: 'sent',
      name: 'Designation',
      pageId:30
    }, {
      label: 'important',
      name: 'Grades',
      pageId:30
    }, {
      label: 'draft',
      name: 'Levels',
      newMails: 2,
      pageId:30
    }, {
      label: 'spam',
      name: 'Spam'
    }, {
      label: 'trash',
      name: 'Trash'
    }];
    return tabs;
  }
  
  }

})();
