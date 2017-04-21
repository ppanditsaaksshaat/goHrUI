// /**
//  * @author v.lugovsky
//  * created on 16.12.2015
//  */
// (function () {
//   'use strict';

//   angular.module('BlurAdmin.pages.leave.applications')
//     .controller('ApplicationsMastersController', ApplicationsMastersController);

//   /** @ngInject */
//   function ApplicationsMastersController(composeModal, mailMessages, pageService) {
   
//     var vm = this;
//     vm.navigationCollapsed = true;
//     vm.showCompose = function (subject, to, text) {
//       composeModal.open({
//         subject: subject,
//         to: to,
//         text: text
//       })
//     };

//     vm.tabs = _getTabs();

//     function _getTabs() {

//       var mastersMenu = [];
//       mastersMenu.push({ name: 'leaveapplication', text: 'leaveapplication', id: 157 })
     
//       return mastersMenu;

//     }

//   }

// })();
