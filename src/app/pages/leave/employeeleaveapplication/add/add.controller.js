/**
 * @author deepak.jain
 * created on 18/14/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.leave.employeeleaveappli')
    .controller('mastersAddController', mastersAddController);

  /** @ngInject */
  function mastersAddController(subject, to, text) {
    var vm = this;
    vm.subject = subject;
    vm.to = to;
    vm.text = text;
  }
})();