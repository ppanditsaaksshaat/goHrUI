// /**
//  * @author a.demeshko
//  * created on 12/24/15
//  */
// (function () {
//   'use strict';

//   angular.module('BlurAdmin.pages.loan.loanmanagement')
//     .service('addModal', addModal);

//   /** @ngInject */
//   function addModal($uibModal) {
//       this.open = function(options){
//         return $uibModal.open({
//           animation: true,
//           templateUrl: 'app/pages/loan/masters/loanmanagement/add.html',
//           controller: 'mastersAddController',
//           controllerAs: 'boxCtrl',
//           size: 'compose',
//           resolve: {
//             subject: function () {
//               return options.subject;
//             },
//             to: function () {
//               return options.to;
//             },
//             text: function () {
//               return options.text;
//             }
//           }
//         });
//       }

//   }

// })();