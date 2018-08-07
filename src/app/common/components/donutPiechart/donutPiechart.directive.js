/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.common.components')
        .directive('donutPiechart', donutPiechart);
  
    /** @ngInject */
    function donutPiechart() {
      return {
        restrict: 'E',
        controller: '',
        templateUrl: 'app/common/components/donutPiechart/donutPiechart.html'
      };
    }
  })();