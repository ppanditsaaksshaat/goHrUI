/**
 * @author deepak.jain
 * created on 08.08.2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.selfdocuments.drive')
        .controller('driveController', driveController);

    /** @ngInject */
    function driveController($scope, $rootScope, $state, $stateParams, $filter, pageService, DJWebStore) {
        $scope.type = $stateParams.type;


        console.log('type:', $rootScope.isShowList)

        //declairing variables
        $scope.page = {
            gridOptions: {}
        };



        //assigning functions
        $scope.toggleView = _toggleView;
        $scope.toggleFolderSelect = _toggleFolderSelect;
        $scope.openFolder = _openFolder;
        $scope.openFile = _openFile;

        //local functionsxc
        function _toggleView() {

            $scope.isShowList = !$scope.isShowList
            DJWebStore.SetValue('isShowList', $scope.isShowList)

            console.log('_toggleView', $scope.isShowList);
        }

        function _toggleFolderSelect(file) {
            angular.forEach($scope.page.gridOptions.data, function (row) {
                row.frameActiveClass = '';
            })
            file.frameActiveClass = 'md-whiteframe-15dp active';
        }

        function _openFolder(file) {

            var folderId = file.fileId + "~" + Math.random();

            var urlId = LZString.compressToEncodedURIComponent(folderId);
            $state.go('selfdocuments.drive.folder')

        }

        function _openFile(file) {
            alert('opening File' + file.fileName)
        }

        function loadData() {

            var data = [];
            data.push({
                fileId: 1,
                fileName: 'My Folder',
                creater: 'Self',
                fileCategory: 'mydocs',
                fileType: 'Folder',
                fileSize: 0,
                parentId: 0,
                modifiedDate: '09-Aug-2018',
                isFolder: true
            });

            data.push({
                fileId: 2,
                fileName: 'Resume.doc',
                creater: 'Self',
                fileCategory: 'mydocs',
                fileType: 'doc',
                fileSize: 0,
                parentId: 0,
                modifiedDate: '09-Aug-2018',
                isFolder: false
            });

            data.push({
                fileId: 3,
                fileName: 'DL.pdf',
                creater: 'Self',
                fileCategory: 'My Folder',
                fileType: 'pdf',
                fileSize: 0,
                parentId: 1,
                modifiedDate: '09-Aug-2018',
                isFolder: false
            });

            $scope.page.gridOptions.data = data;


            $scope.folderList = $filter('findAll')(data, true, 'isFolder')

            $scope.fileList = $filter('findAll')(data, false, 'isFolder')

        }


        function setupGridView() {
            var gridOptions = {
                rowHeight: 35,
                enableColumnResizing: false,
                enableFiltering: false,
                enableGridMenu: false,
                enableRowSelection: true,
                enableRowHeaderSelection: true,
                enablePaginationControls: false,
                paginationPageSizes: [10, 25, 50, 75, 100, 200, 500],
                paginationPageSize: 10,
                minRowsToShow: 10,
                showColumnFooter: false,
                enableVerticalScrollbar: false,
                enableHighlighting: true,
                enablePinning: true,
                data: [],
                columnDefs: []
                // rowTemplate:'app/common/components/listGrid/grid-row-template.html'
            }
            $scope.page.gridOptions = gridOptions;
            setupGridColumn();
            loadData()
        }

        function setupGridColumn() {
            var colFile = {
                name: 'fileName',
                field: 'fileName',
                displayName: 'Name',
                width: 200,
                cellTemplate: 'fileCell.html'
            }

            var colCreater = {
                name: 'creater',
                field: 'creater',
                displayName: 'Creater',
                width: 100
            }

            var colCategory = {
                name: 'fileCategory',
                field: 'fileCategory',
                displayName: 'Category',
                width: 100
            }

            var colType = {
                name: 'fileType',
                field: 'fileType',
                displayName: 'Type',
                width: 100
            }
            var colSize = {
                name: 'fileSize',
                field: 'fileSize',
                displayName: 'Size',
                width: 100
            }

            $scope.page.gridOptions.columnDefs.push(colFile);
            $scope.page.gridOptions.columnDefs.push(colCategory);
            $scope.page.gridOptions.columnDefs.push(colCreater);
            $scope.page.gridOptions.columnDefs.push(colType);
            $scope.page.gridOptions.columnDefs.push(colSize);
        }

        function _loadController() {

            $scope.isShowList = DJWebStore.GetValue('isShowList');


            setupGridView()

        }

        _loadController();

    }
})();