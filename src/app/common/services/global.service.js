//This Factory Inherting Our own factory called DJWebStore - /// <reference path="assets/angular-appJS/app-04-webstore-service.js" />
//This Factory is used to call get & set 
'use strict';
angular.module('BlurAdmin.common').factory('DJWebStoreGlobal', ['$http', '$timeout', 'DJWebStore',
    function ($http, $timeout, DJWebStore) {

        var DJWebStoreGlobal = {};

        DJWebStoreGlobal.JSONToCSVConvertor = _JSONToCSVConvertor;
        DJWebStoreGlobal.UIGridSetting = _UIGridSetting;
        DJWebStoreGlobal.COPYText = _COPYText;
        DJWebStoreGlobal.Compress = _Compress;
        DJWebStoreGlobal.Decompress = _Decompress;
        DJWebStoreGlobal.DTConvertor = _DTConvertor;
        DJWebStoreGlobal.GetResult = _GetResult;
        DJWebStoreGlobal.GoBack = _GoBack;
        DJWebStoreGlobal.ViewBack = _ViewBack;
        DJWebStoreGlobal.RoutePath = _RoutePath;
        DJWebStoreGlobal.GetStoreKey = _GetStoreKey;
        DJWebStoreGlobal.GoToPage = _GoToPage;
        DJWebStoreGlobal.GetParam = _GetParam;
        DJWebStoreGlobal.HideSideMenu = _HideSideMenu;
        DJWebStoreGlobal.ShowSideMenu = _ShowSideMenu;
        DJWebStoreGlobal.SetPageMenu = _SetPageMenu;
        DJWebStoreGlobal.ClearPageMenu = _ClearPageMenu;
        DJWebStoreGlobal.CallPageMenu = _CallPageMenu;
        DJWebStoreGlobal.SetSideFilter = _SetSideFilter;
        DJWebStoreGlobal.ClearSideFilter = _ClearSideFilter;
        DJWebStoreGlobal.SetMsg = _SetMsg;
        DJWebStoreGlobal.SendEmail = _SendEmail;

        return DJWebStoreGlobal;
        //=========================================================================func : Compress
        function _Compress(data, pageId) {
            var postData = JSON.stringify(data);
            var compressed = LZString.compressToEncodedURIComponent(postData);
            var compressData = { lz: true, data: compressed, pageId: pageId }
            return compressData;
        }
        //=========================================================================func : Decompress
        function _Decompress(data) {
            var decompressed = LZString.decompressFromEncodedURIComponent(data);
            return angular.fromJson(decompressed);
        }
        //=========================================================================func : _COPYText
        function _COPYText(textToCopy, element) {

            try {
                //clipboard.copyText(textToCopy, element);
                //            if (angular.isFunction(scope.onCopied)) {
                //                scope.$evalAsync(scope.onCopied());
                //            }
            } catch (err) {
                //            if (angular.isFunction(scope.onError)) {
                //                scope.$evalAsync(scope.onError({ err: err }));
                //            }
            }
        }
        //=========================================================================func : _UIGridSetting
        function _UIGridSetting($scope, multiSelect) {

            if (multiSelect === undefined)
                multiSelect = false;
            var gridOptions = {
                enableFiltering: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: multiSelect,
                modifierKeysToMultiSelect: false,
                noUnselect: false,
                enablePaginationControls: true,
                paginationPageSizes: [10, 25, 50, 75, 100],
                paginationPageSize: 10,
                minRowsToShow: 10,
                showColumnFooter: true,
                enableVerticalScrollbar: false,
                enableHighlighting: true
            };

            gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;

            };

            return gridOptions;
        }
        //=========================================================================func : _UIGridSetting
        function _GetResult(response) {
            var result = {};

            if (response.data !== undefined) {
                var result_data = angular.fromJson(response.data);
                result = result_data;

                if (result_data.lz !== undefined) {
                    if (result_data.lz) {
                        var paramData = LZString.decompressFromEncodedURIComponent(result_data.data);
                        result = angular.fromJson(paramData);
                    }
                }
            }

            return result;
        }

        function _DTConvertor(dtdatetime) {
            return moment(dtdatetime).format("YYYY-MMM-DD HH:mm:ss");

            //var s = "2012-10-16T17:57:28.556094Z";

        }

        //============================================================================================================func : JSONToCSVConvertor

        function _JSONToCSVConvertor(JSONData, ReportTitle, ShowTitle, ShowLabel, ShowData) {
            // debugger;
            // var auth = DJWebStore.ValidateUser();

            // var dt = new Date();
            // var appName = auth.app.AppName;
            // var userName = auth.profile.empName;
            // var dateStamp = dt.toDateString();
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object



            // //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            //             var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            //             var CSV = '';
            //             //Set Report title in first row or line
            //             if (ShowTitle)
            //                 CSV += ReportTitle + ',' + appName + ',Export By :, ' + userName + ',Exported On :, ' + dateStamp + '\r\n\n';

            //             //This condition will generate the Label/Header
            //             if (ShowLabel) {
            //                 var row = "";

            //                 //This loop will extract the label from 1st index of on array
            //                 for (var index in arrData[0]) {

            //                     //Now convert each value to string and comma-seprated
            //                     row += index + ',';
            //                 }

            //                 row = row.slice(0, -1);

            //                 //append Label row with line break
            //                 CSV += row + '\r\n';
            //             }




            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';
            //Set Report title in first row or line
            if (ShowTitle)
                CSV += ReportTitle + ',' + ',Export By :, ' + ',Exported On : ' + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            if (ShowData) {
                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";

                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        if (arrData[i][index] == "") {
                            arrData[i][index] = "";
                        }
                        row += '"' + arrData[i][index] + '",';
                    }

                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }
            }
            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            //this will remove the blank-spaces from the title and replace it with an underscore
            var fileName = 'Rudra' + '_' + ReportTitle.replace(/ /g, "_") + '_' + new Date().getMilliseconds();

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            $timeout(function () {
                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;

                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";

                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });


        }

        function _GoBack() {
            var param = _GetParam();
            if (param.isParam) {
                var navPath = param.navPath;
                if (navPath != null) {
                    if (navPath.length > 0) {
                        _ViewBack(navPath[0])
                    }
                }
            }
        }
        function _ViewBack(path) {
            if (path.type == 'grid') {
                var paramKey = _GetStoreKey(path.data)
                //var paramData = ''
                //if (path.data !== undefined)
                //    paramData = JSON.stringify(path.data);
                //var compressedData = '';
                //if (paramData != '')
                //    compressedData = LZString.compressToEncodedURIComponent(paramData);

                //var rndVal = Math.round((Math.random() * 10) * 10);
                //var rndVal2 = Math.round((Math.random() * rndVal) * rndVal);
                //var paramKey = rndVal + '&' + rndVal2
                //var paramKeyCom = LZString.compressToEncodedURIComponent(rndData);

                //DJWebStore.SetValue(paramKeyCom, compressedData);

                var url = '#Grid/' + path.pcode + '/' + paramKey
                location.href = url;

                var bodyClass = $('body').attr('class');
                if (bodyClass.indexOf('closed-sidebar') > 0) {
                    $('body').toggleClass('closed-sidebar');
                    $('.glyph-icon', this).toggleClass('icon-angle-right').toggleClass('icon-angle-left');
                }
            }
            else if (path.type == 'view') {

                location.href = '#View?param=' + path.param + '&nav=' + path.nav
            }
        }

        function _RoutePath() {

            // var paramData = { isData: false, isRec: false, isNav: false };

            // var paramKey = $routeParams.param;
            // var navKey = $routeParams.nav;
            // var recKey = $routeParams.rec;

            // if (paramKey !== undefined) {
            //     var paramDataCom = DJWebStore.GetValue(paramKey);
            //     var paramDataUnc = LZString.decompressFromEncodedURIComponent(paramDataCom)
            //     paramData.data = angular.fromJson(paramDataUnc);
            //     paramData.isData = true;
            // }
            // else {
            //     paramData.data = undefined;
            //     paramData.isData = false;
            // }

            // if (navKey !== undefined) {
            //     var navDataCom = DJWebStore.GetValue(navKey);
            //     var navDataUnc = LZString.decompressFromEncodedURIComponent(navDataCom)
            //     paramData.nav = angular.fromJson(navDataUnc);
            //     paramData.isNav = true;
            // }
            // else {
            //     paramData.nav = undefined;
            //     paramData.isNav = false;
            // }

            // if (recKey !== undefined) {
            //     var recDataCom = DJWebStore.GetValue(recKey);
            //     var recDataUnc = LZString.decompressFromEncodedURIComponent(recDataCom)
            //     paramData.rec = angular.fromJson(recDataUnc);
            //     paramData.isRec = true;
            // }
            // else {
            //     paramData.rec = undefined;
            //     paramData.isRec = false;
            // }
            // return paramData;
        }

        function _GetStoreKey(obj) {

            DJWebStore.SetParam(obj);

            //var cache = [];
            //var objData = JSON.stringify(obj, function (key, value) {
            //    if (typeof value === 'object' && value !== null) {
            //        if (cache.indexOf(value) !== -1) {
            //            // Circular reference found, discard key
            //            return;
            //        }
            //        // Store value in our collection
            //        cache.push(value);
            //    }
            //    return value;
            //});
            //cache = null; // Enable garbage collection

            var objData = JSON.stringify(obj);
            var objCom = LZString.compressToEncodedURIComponent(objData);
            //getting random value
            var rndVal = Math.round((Math.random() * 10) * 10);
            var rndVal2 = Math.round((Math.random() * rndVal) * rndVal);
            var rndData = rndVal + '&' + rndVal2 + '&' + (new Date()).getMilliseconds();
            //converting to compress mode
            var rndKey = LZString.compressToEncodedURIComponent(rndData);
            DJWebStore.SetValue(rndKey, objCom);

            return rndKey;
        }

        function _GoToPage(pageName, paramKey) {
            console.log(window.location)
            window.location = '#' + pageName + '/' + paramKey;
        }

        function _GetParam() {

            //customeditpage
            console.log($routeParams)
            var finalData = { isParam: false }
            if ($routeParams.param !== undefined) {
                var paramKey = $routeParams.param;
                var compressedData = DJWebStore.GetValue(paramKey)
                var decompressedData = LZString.decompressFromEncodedURIComponent(compressedData);
                var paramData = {}
                if (decompressedData != '') {
                    paramData = angular.fromJson(decompressedData)
                }
                console.log(paramData)
                var param = {};

                var entity = {};
                if (paramData.rec !== undefined) {
                    if (paramData.rec.length > 0) {
                        entity = paramData.rec[0];
                        if (param.idencolname != null) {
                            if (param.idencolname !== undefined) {
                                if (entity[param.idencolname] != null) {
                                    if (entity[param.idencolname] !== undefined) {
                                        param.idencolval = entity[param.idencolname]
                                    }
                                }
                            }
                        }
                    }
                }
                param.entity = entity;


                finalData = angular.extend(param, paramData);

                finalData.isParam = true;
            }
            console.log(finalData)
            return finalData;
        }

        function _HideSideMenu() {
            var bodyClass = $('body').attr('class');
            if (bodyClass.indexOf('closed-sidebar') <= 0) {
                $('body').toggleClass('closed-sidebar');
                $('.glyph-icon', this).toggleClass('icon-angle-right').toggleClass('icon-angle-left');
            }
        }
        function _ShowSideMenu() {
            var bodyClass = $('body').attr('class');
            if (bodyClass.indexOf('closed-sidebar') >= 0) {
                $('body').toggleClass('closed-sidebar');
                $('.glyph-icon', this).toggleClass('icon-angle-right').toggleClass('icon-angle-left');
            }
        }

        function _SetPageMenu(pageMenu) {
            //DJModaler.HandleObjectEvent('ngRowSelected', pageMenu)
        }
        function _ClearPageMenu() {
            //DJModaler.HandleObjectEvent('ngRowSelected', [])
        }

        function _SetSideFilter(pageFilters) {
            // DJModaler.HandleObjectEvent('ngSideFilter', pageFilters)
        }
        function _ClearSideFilter() {
            // DJModaler.HandleObjectEvent('ngSideFilter', [])
        }

        function _CallPageMenu(menu) {
            //DJModaler.HandleObjectEvent('ngCallPageMenu', menu)
        }

        function _SetMsg(type, text, interval, pageTitle) {
            var msg = { type: type, text: text, interval: interval, pageTitle: pageTitle }
            //DJModaler.HandleObjectEvent('ngShowMsgBox', msg)
        }

        function _SendEmail(data) {
            var composeData = { type: 'compose', data: data }
            //DJModaler.HandleObjectEvent('ngAddNewProcess', composeData)
        }
    }]);

//Service Created by Deepak Jain http://deepjain1290.blogspot.com
//Email : deepjain1290@gmail.com
//for any help
//01-July-2016`````````


angular.module('BlurAdmin.common').filter('griddropdown', function () {
    return function (input, context) {
        var map = context.col.colDef.editDropdownOptionsArray;
        var idField = context.col.colDef.editDropdownIdLabel;
        var valueField = context.col.colDef.editDropdownValueLabel;
        var initial = context.row.entity[context.col.field];
        if (typeof map !== "undefined") {
            for (var i = 0; i < map.length; i++) {

                if (map[i][idField] == input) {
                    return map[i][valueField];
                }

                if (map[i][valueField].toString().toLowerCase() == input.toString().toLowerCase()) {
                    return map[i][valueField];
                }
            }
            return initial;
        } else if (initial) {
            return initial;
        }
        return input;
    };
});

angular.module('BlurAdmin.common').filter('findobj', function () {

    return function (list, obj) {

        return list.filter(function (l) {
            if (l.name.toString().toLowerCase() == obj.toString().toLowerCase()) {
                return true;
            }
            //            console.log(l);
            //            console.log(obj);
            //            if (obj.indexOf(l.item_id) >= 0) {
            //                return true;
            //            }
        });

    };
})



angular.module('BlurAdmin.common').factory('clipboard', ['$document', function ($document) {
    function createNode(text, context) {
        var node = $document[0].createElement('textarea');
        node.style.position = 'absolute';
        node.textContent = text;
        node.style.left = '-10000px';
        if (context instanceof HTMLElement) {
            node.style.top = context.getBoundingClientRect().top + 'px';
        }
        return node;
    }

    function copyNode(node) {
        try {
            // Set inline style to override css styles
            $document[0].body.style.webkitUserSelect = 'initial';

            var selection = $document[0].getSelection();
            selection.removeAllRanges();
            node.select();

            if (!$document[0].execCommand('copy')) {
                throw ('failure copy');
            }
            selection.removeAllRanges();
        } finally {
            // Reset inline style
            $document[0].body.style.webkitUserSelect = '';
        }
    }

    function copyText(text, context) {
        var node = createNode(text, context);
        $document[0].body.appendChild(node);
        copyNode(node);
        $document[0].body.removeChild(node);
    }

    return {
        copyText: copyText,
        supported: 'queryCommandSupported' in document && document.queryCommandSupported('copy')
    };
}])

angular.module('BlurAdmin.common').filter('getById', function () {
    return function (input, id, propName) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (+input[i][propName] == +id) {
                return input[i];
            }
        }
        return null;
    }
});

