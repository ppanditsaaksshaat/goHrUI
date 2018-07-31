/**
 * @author NKM
 * created on 26.07.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.self.statement.leavestatement')
        .controller('leaveStatementController', leaveStatementController);
    function leaveStatementController($scope, $rootScope, $state, $filter, pageService) {
        var vm = this;
        $scope.data = [{ "agence": "CTM", "secteur": "Safi", "statutImp": "operationnel" }];

        $scope.exportData = _exportData;

        function _exportData() {
            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("test.pdf");
                }
            });
        }
    }
})();