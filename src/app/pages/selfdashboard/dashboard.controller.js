/**
 * @author Pardeep Pandit
 * created on 07.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdashboard')
        .controller('dashboardCtrl', dashboardCtrl);

    /** @ngInject */
    function dashboardCtrl($scope, $state, $timeout, pageService, $filter, $uibModal, dialogModal, baConfig, baUtil) {
       
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.charts = [{
            color: pieColor,
            description: 'C Present',
            stats: '10',
            icon: 'person',        
        }, {
            color: pieColor,
            description: 'QTR Present',
            stats: '100',
            icon: 'money',
         
        }, {
            color: pieColor,
            description: '1/2 Present',
            stats: '170',
            icon: 'face',
        }, {
            color: pieColor,
            description: 'Year Present',
            stats: '300',
            icon: 'refresh',
        }
        ];

        function getRandomArbitrary(min, max) {
           // console.log("random " + Math.random() * (max - min) + min)
           // return Math.random() * (max - min) + min;
           return min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        console.log("percentage "+percent)
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(10));
            });
        }

        $timeout(function () {
            loadPieCharts();
            updatePieCharts();
        }, 1000);
    }

   
})();