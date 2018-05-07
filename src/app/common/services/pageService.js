'use strict';
angular.module('BlurAdmin.common').factory('pageService', ['$http', 'DJWebStore', 'fileUpload', '$q',
    function ($http, DJWebStore, fileUpload, $q) {
        var title = 'default';

        var serviceBase = DJWebStore.GetServiceBase();

        var page = 'Login.html';

        var pageServiceFactory = {};

        var queryPageId = 0;
        var empId = 0;
        var loginData = {
            "userName": "EMP003",
            "password": "Password1!"
        };

        var _findEntity = function (tableId, pkValue, searchList) {


            var url = serviceBase + 'api/Data/FindEntity/' + tableId;
            if (pkValue !== undefined) {
                url = serviceBase + 'api/Data/FindEntity/' + tableId + "/" + pkValue;
            }

            if (searchList !== undefined) {

                var data = {
                    searchList: searchList
                };
                return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (results) {
                    return results;
                });

            } else {
                return $http.get(url).then(function (results) {
                    return results;
                });
            }

        }
        var _getTableData = function (tableId, pageId, search, value, forAllUser, searchList) {
            var titleempcolname = '';
            var isFound = false;
            var pgList = DJWebStore.GetValue('pageList');
            var page = null;
            if (pgList != null) {
                page = pgList['pg_' + pageId];
                if (page != null) {
                    titleempcolname = page.pageinfo.titleempcolname;
                    isFound = true;
                }
            }


            var apiUrl = serviceBase + 'api/Data/GetData/' + tableId + "/" + pageId;

            var rndVal = Math.round((Math.random() * 10) * 10);

            if (search !== undefined) {
                if (search != '') {
                    if (value !== undefined) {
                        if (value != '') {
                            apiUrl = serviceBase + 'api/Data/GetData/' + tableId + "/" + pageId + '/' + search + '/' + value;

                        }
                    }
                }
            }

            if (searchList !== undefined) {
                if (forAllUser !== undefined) {
                    apiUrl += '/' + forAllUser
                }
                var data = angular.copy(searchList)
                if (titleempcolname == null) {
                    titleempcolname = '';
                }
                data.titleempcolname = titleempcolname;
                return $http.post(apiUrl, JSON.stringify(JSON.stringify(data)), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (results) {
                    return results;
                });

            } else {
                return $http.get(apiUrl).then(function (results) {
                    return results;
                });
            }
        };



        var _getPagData = function (pageCode) {
            var isFound = false;
            var pgList = DJWebStore.GetValue('pageList');
            var page = null;
            if (pgList != null) {
                page = pgList['pg_' + pageCode];
                if (page != null) {
                    isFound = false;
                }
            }

            var dfd = $q.defer();

            if (!isFound) {
                var rndVal = Math.round((Math.random() * 10) * 10);
                var url = serviceBase + 'api/values/' + pageCode + "?" + rndVal;
                $http.get(url).then(function (results) {
                        var pgList = DJWebStore.GetValue('pageList');
                        if (pgList == null) {
                            pgList = {};
                        }
                        if (results.pageinfo)
                            if (results.pageinfo.pageid)
                                pgList['pg_' + results.pageinfo.pageid] = results;

                        DJWebStore.SetValue('pageList', pgList);
                        console.log(results)
                        dfd.resolve(results);
                    },
                    function (error) {
                        dfd.reject(error);
                    }
                );
            } else {

                dfd.resolve(page);

            }

            return dfd.promise;
        };

        var _getInnerPageData = function (pageId, actColName, idenColVal) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/values?pageId=' + pageId + "&actColName=" + actColName + "&idenColVal=" + idenColVal;
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _deletePageData = function (rowCode, pageCode) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/values/' + pageCode + "?code=" + rowCode + "&pageCode=" + pageCode;
            //        return $http.delete(url).then(function (results) {
            //            return results;
            //        });
        };

        var _editPageData = function (pageCode, entity) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/values/';
            return $http.post(url, JSON.stringify(entity), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _setMsg = function (type, text) {
            if (this.msg === undefined) {
                this.msg = {
                    type: '',
                    text: ''
                };
            }
            this.msg.type = type;
            this.msg.text = text;
        };
        var _getMsg = function () {
            return this.msg;
        }
        var _setMsgUndef = function () {
            this.msg = undefined;
        }

        var _getNavigation = function () {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Menu/State/?' + rndVal;
            return $http.get(url).then(function (results) {
                return results;
            });
        }
        var _getTitle = function () {
            return title;
        };
        var _setTitle = function (newTitle) {
            title = newTitle;
        };

        var _getIdenVal = function (pageId) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/GetIdentity/?pageId=' + pageId;
            //console.log(url);
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getSelect = function (columnId, linkId, linkId2) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/GetSelect/?columnId=' + columnId;
            if (linkId != '')
                url = url + '&linkid=' + linkId;
            if (linkId != '')
                url = url + '&linkid2=' + linkId2;
            //console.log(url);
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getEmpData = function (tableId, empId, colName) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Employee?tableId=' + tableId + '&empId=' + empId + ' &colName=' + colName
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getProfilePageNavigation = function () {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Menu/Profile';
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getAppUserData = function () {
            var url = serviceBase + 'api/AppUserData';
            return $http.get(url).then(function (results) {
                return results;
            });
        }
        var _getOnlyAppData = function () {
            var url = serviceBase + 'api/AppUserData?onlyApp';
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getFormBuilder = function (tableId, pageId) {
            var url = serviceBase + 'api/Builder/' + tableId + '/' + pageId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }
        var _getBuilderPageList = function (tableId) {
            var url = serviceBase + 'api/Builder/GetPage/' + tableId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }


        var _getPrintBuilder = function (tableId) {
            var url = serviceBase + 'api/Builder/Print/' + tableId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }


        var _getDetailView = function (tableId, pkValue) {
            var url = serviceBase + 'api/Data/FindRecord/' + tableId + "/" + pkValue;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _saveGridSetting = function (postData) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/UIGrid/SaveSetting/';
            return $http.post(url, JSON.stringify(postData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _getReport = function (reportId, filterData) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Report/GetReport/' + reportId;
            console.log(url);
            return $http.post(url, JSON.stringify(filterData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _getReportBuilder = function (reportId) {
            var url = serviceBase + 'api/Report/Builder/' + reportId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _saveReportBuilder = function (uReportId, data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Report/Save/' + uReportId;
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _getFilterColumn = function (columnId) {
            var url = serviceBase + 'api/Report/FilterColumn/' + columnId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getListReport = function (columnId) {
            var url = serviceBase + 'api/Report/GetListReport/' + columnId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getSequance = function (pageId) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/GetSequence/' + pageId;
            //console.log(url);
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getMapColumns = function (activityId) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Data/GetMapColumns/' + activityId;
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getBGClass = function () {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/AppData/BGClass/'
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        //===================================================================Upload Utility
        var _processUpload = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Upload/Process';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _uploadValidator = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Upload/Validator';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }


        //============================================================= T I C K E T S 

        var _getTicket = function (ticketId) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Tickets/Get/' + ticketId;
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        //============================================================= F I L E     R E P O 

        var _saveFile = function (file) {
            if (file !== undefined) {
                var serviceBase = DJWebStore.GetServiceBase();
                var uploadUrl = serviceBase + "api/Upload/SaveFile";
                fileUpload.uploadFileToUrl(file, uploadUrl);
            } else {
                console.log('No File Selected');
            }
        };

        var _getFile = function (fileId, source) {
            var serviceBase = DJWebStore.GetServiceBase();
            var fileUrl = serviceBase + "api/Upload/GetFile";
            if (source == 'attach') {
                fileUrl = serviceBase + "api/Upload/GetAttach";
            }

            _downloadFile(fileUrl, fileId)
        };

        var _downloadFile = function (fileUrl, fileId, filename) {
            if (filename === undefined) {
                'download.csv'
            }
            $http({
                method: 'GET',
                cache: false,
                url: fileUrl,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'fileID': fileId,
                    'fileName': filename
                }
            }).then(function (response) {

                console.log(response)

                var data = response.data;
                var status = response.status;
                var headers = response.headers;

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                //qq    aaq2headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || response.config.headers.fileName;

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try {

                    console.log(filename);
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], {
                        type: contentType
                    });
                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch (ex) {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], {
                                    type: contentType
                                });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], {
                                    type: octetStreamMime
                                });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }

            }, function (err) {
                console.log(err)
            })
        }

        var _downloadFileAsExcel = function (fileUrl, filename) {
            $http({
                method: 'GET',
                cache: false,
                url: fileUrl,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'fileName': filename
                }
            }).then(function (response) {

                //console.log(response)

                var data = response.data;
                var status = response.status;
                var headers = response.headers;

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                //qq    aaq2headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || response.config.headers.fileName;

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                var arraybuffer = data;
                /* convert data to binary string */
                var dataArr = new Uint8Array(arraybuffer);
                var arr = new Array();

                for (var i = 0; i != dataArr.length; ++i)
                    arr[i] = String.fromCharCode(dataArr[i]);

                var bstr = arr.join("");

                var workbook = XLSX.read(bstr, {
                    type: "binary"
                });
                console.log(workbook)


                var sheet = workbook.Sheets[workbook.SheetNames[0]]; // get the first worksheet

                //sheet.getCell("A1").setValue("hi");
                var range = XLSX.utils.decode_range(sheet['!ref']); // get the range
                console.log(range)
                console.log(sheet.cell('A1'))
                // var cellref = XLSX.utils.encode_cell({ c: 'A', r: 1 });
                // var cell = sheet[cellref];
                // cell.v = 'deepak';

                // /* loop through every cell manually */
                // var range = XLSX.utils.decode_range(sheet['!ref']); // get the range
                // for (var R = range.s.r; R <= range.e.r; ++R) {
                //     for (var C = range.s.c; C <= range.e.c; ++C) {
                //         /* find the cell object */
                //         var cellref = XLSX.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
                //         if (!sheet[cellref]) continue; // if cell doesn't exist, move on
                //         var cell = sheet[cellref];

                //         /* if the cell is a text cell with the old string, change it */
                //         if (!(cell.t == 's' || cell.t == 'str')) continue; // skip if cell is not text
                //         if (cell.v === oldtext) cell.v = MOMENT(); // change the cell value
                //     }
                // }

                /* write workbook (use type 'binary') */
                var wbout = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    type: 'binary'
                });
                var dataBinary = s2ab(wbout);
                // saveFileAs(dataBinary, contentType, filename)
                saveAs(new Blob([s2ab(wbout)], {
                    type: "application/octet-stream"
                }), "sheetjs.xlsx");
            }, function (err) {
                console.log(err)
            })
        }
        /* generate a download */
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i)
                view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        function saveFileAs(data, contentType, filename) {
            var success = false;
            try {

                console.log(filename);
                // Try using msSaveBlob if supported
                console.log("Trying saveBlob method ...");
                var blob = new Blob([data], {
                    type: contentType
                });
                if (navigator.msSaveBlob)
                    navigator.msSaveBlob(blob, filename);
                else {
                    // Try using other saveBlob implementations, if available
                    var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                    if (saveBlob === undefined) throw "Not supported";
                    saveBlob(blob, filename);
                }
                console.log("saveBlob succeeded");
                success = true;
            } catch (ex) {
                console.log("saveBlob method failed with the following exception:");
                console.log(ex);
            }

            if (!success) {
                // Get the blob url creator
                var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                if (urlCreator) {
                    // Try to use a download link
                    var link = document.createElement('a');
                    if ('download' in link) {
                        // Try to simulate a click
                        try {
                            // Prepare a blob URL
                            console.log("Trying download link method with simulated click ...");
                            var blob = new Blob([data], {
                                type: contentType
                            });
                            var url = urlCreator.createObjectURL(blob);
                            link.setAttribute('href', url);

                            // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                            link.setAttribute("download", filename);

                            // Simulate clicking the download link
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);
                            console.log("Download link method with simulated click succeeded");
                            success = true;

                        } catch (ex) {
                            console.log("Download link method with simulated click failed with the following exception:");
                            console.log(ex);
                        }
                    }

                    if (!success) {
                        // Fallback to window.location method
                        try {
                            // Prepare a blob URL
                            // Use application/octet-stream when using window.location to force download
                            console.log("Trying download link method with window.location ...");
                            var blob = new Blob([data], {
                                type: octetStreamMime
                            });
                            var url = urlCreator.createObjectURL(blob);
                            window.location = url;
                            console.log("Download link method with window.location succeeded");
                            success = true;
                        } catch (ex) {
                            console.log("Download link method with window.location failed with the following exception:");
                            console.log(ex);
                        }
                    }

                }
            }

            if (!success) {
                // Fallback to window.open method
                console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                window.open(httpPath, '_blank', '');
            }

        }
        var _sendJdToCand = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Email/JDToCand';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _saveRemind = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Remind/SaveRemind';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _getRemind = function (remindId) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Remind/Get/' + remindId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getRemindList = function (remindId) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Remind/GetList/';
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getAssignedUser = function () {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/GetSelect/AssignedUser'
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _saveUserAssigned = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/UIGrid/SaveAssigned';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _getCVSummary = function () {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Dashboard/CVSummary'
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getCalendar = function (source, id) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Calendar/Session/' + source + '/' + id
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _changePassword = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Account/ChangePassword';
            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _sendEmail = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Email/SendEmail';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _sendCustomEmail = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Email/CustomEmail';
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };
        var _studentSession = function (data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Account/';
            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _getEmailTempList = function (activityId) {
            var url = serviceBase + 'api/Email/TempList/' + activityId;
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _getFieldSetting = function (pageId) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Field/GetSequence/' + pageId;
            //console.log(url);
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _getQuesPaper = function (qpId, stid) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Ques/Paper/' + qpId + '/' + stid
            return $http.get(url).then(function (results) {
                return results;
            });
        };

        var _ansQuesPaper = function (qpId, stId, data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Ques/Answer/' + qpId + '/' + stId;
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _rptHandshake = function (udrId, data) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Report/Handshake/' + udrId;
            return $http.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        ////  add by nitesh   new fuction for  upload file



        var _saveFileAttach = function (file, pageId, tableId, pkId, docTypeId) {
            if (file !== undefined) {
                var serviceBase = DJWebStore.GetServiceBase();
                var uploadUrl = serviceBase + "api/Upload/SaveAttachmentFile/" + pageId + '/' + tableId + '/' + pkId + '/' + docTypeId;
                fileUpload.uploadFileToUrl(file, uploadUrl);
            } else {
                console.log('No File Selected');
            }
        };

        var _getFileAttach = function (fileId) {
            var serviceBase = DJWebStore.GetServiceBase();
            var fileUrl = serviceBase + "api/Upload/SaveAttachmentFile";

            $http({
                method: 'GET',
                cache: false,
                url: fileUrl,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'fileID': fileId
                }
            }).success(function (data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || 'download.bin';

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try {

                    console.log(filename);
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], {
                        type: contentType
                    });
                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch (ex) {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], {
                                    type: contentType
                                });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], {
                                    type: octetStreamMime
                                });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }

            }).error(function (data) {
                alert('Something went wrong, please retry.');
            });
        };

        //Add by nitesh for test
        var _saveTestFileAttach = function (file, pageId, tableId, pkId, docTypeId) {
            if (file !== undefined) {
                var serviceBase = DJWebStore.GetServiceBase();
                var uploadUrl = serviceBase + "api/Upload/SaveTestAttachmentFile/" + pageId + '/' + tableId + '/' + pkId + '/' + docTypeId;
                console.log(uploadUrl);
                fileUpload.uploadFileToUrl(file, uploadUrl);
            } else {
                console.log('No File Selected');
            }
        };

        var _getTestFileAttach = function (fileId) {
            var serviceBase = DJWebStore.GetServiceBase();
            var fileUrl = serviceBase + "api/Upload/SaveTestAttachmentFile";

            $http({
                method: 'GET',
                cache: false,
                url: fileUrl,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'fileID': fileId
                }
            }).success(function (data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || 'download.bin';

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try {

                    console.log(filename);
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], {
                        type: contentType
                    });
                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch (ex) {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], {
                                    type: contentType
                                });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], {
                                    type: octetStreamMime
                                });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }

            }).error(function (data) {
                alert('Something went wrong, please retry.');
            });
        };


        var _updateField = function (tableId, pkName, pkId, field, fieldValue) {

            var data = {
                tableId: tableId,
                pkColName: pkName,
                pkId: pkId,
                field: field,
                fieldValue: fieldValue
            }

            var url = serviceBase + 'api/Data/Field/';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _updateSingleField = function (tableId, searchColName, searchColValue, field, fieldValue) {

            var data = {
                tableId: tableId,
                searchColName: searchColName,
                searchColValue: searchColValue,
                field: field,
                fieldValue: fieldValue
            }

            var url = serviceBase + 'api/Data/UpdateSingleField/';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _getDashboard = function (appMode) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Dashboard/CRM/';
            return $http.get(url).then(function (results) {
                return results;
            });
        }


        var _migrateData = function (data) {
            var url = serviceBase + 'api/Upload/Migrate/';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _uploadEmployeeData = function (data) {
            var url = serviceBase + 'api/Upload/EmployeeUpload';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }



        var _getRowCount = function (data, tableId, pageId) {
            var url = serviceBase + 'api/Data/RowCount/' + tableId + "/" + pageId;
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }


        var _ucvSaveUSV = function (data, pageId) {
            var url = serviceBase + 'api/Data/SaveUCV/' + pageId;
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }



        var _getCustomEmailSetting = function (pageId) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Email/Custom/' + pageId
            return $http.get(url).then(function (results) {
                return results;
            });
        }
        var _getUserDashBoard = function (appMode) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Dashboard/GET/' + appMode
            return $http.get(url).then(function (results) {
                return results;
            });
        }
        var _getCustomReport = function (reportId, filterData) {

            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Report/GetCustomReport/' + reportId;
            console.log(url);
            return $http.post(url, JSON.stringify(filterData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };
        var _updateMultiField = function (tableId, pkName, pkId, fieldList) {

            var data = {
                tableId: tableId,
                pkColName: pkName,
                pkId: pkId,
                fieldList: fieldList
            }

            var url = serviceBase + 'api/Data/UpdateMultiField/';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _generateSalary = function (filterData) {
            var url = serviceBase + 'api/Payroll/GenerateSalary/';
            console.log(url)
            return $http.post(url, JSON.stringify(JSON.stringify(filterData)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;

            });
        }

        var _getCustomQuery = function (data, queryId) {
            var url = serviceBase + 'api/Data/Query/' + queryId;
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _getAllSelect = function (columnIds) {
            var url = serviceBase + 'api/GetSelect/All';
            return $http.post(url, JSON.stringify(JSON.stringify(columnIds)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _multiSave = function (data) {

            var url = serviceBase + 'api/Multi/Save';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _multiSaveRows = function (data) {

            var url = serviceBase + 'api/Multi/SaveRows';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _restorePayband = function (data) {

            var url = serviceBase + 'api/Multi/RestorePayband';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _getMultiEntity = function (data) {

            var url = serviceBase + 'api/Multi/FindEntity';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }


        var _create = function (entity) {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/Employee/Add';
            return $http.post(url, JSON.stringify(entity), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        };

        var _commonUploder = function (data) {
            var url = serviceBase + 'api/Upload/CommonUpload';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }


        var _leaveTypeUpload = function (data) {
            var url = serviceBase + 'api/Upload/LeaevTypeUpload';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _uploadManualAttendance = function (data) {
            var url = serviceBase + 'api/Upload/UploadManualAttendance';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _generateFullAndFinalSalary = function (filterData) {
            var url = serviceBase + 'api/Payroll/GenerateFullAndFinalSalary/';
            console.log(url)
            return $http.post(url, JSON.stringify(JSON.stringify(filterData)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;

            });
        }

        var _employeeBonusUpload = function (data) {
            var url = serviceBase + 'api/Upload/EmployeeBonus';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
            var url = serviceBase + 'api/Payroll/GenerateFullAndFinalSalary/';
            console.log(url)
            return $http.post(url, JSON.stringify(JSON.stringify(filterData)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;

            });
        }

        var _getResources = function (data) {

            var url = serviceBase + 'api/Resource/ByKey';
            console.log(url)
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;

            });
        }

        var _getTranslateData = function (data) {
            var url = serviceBase + 'api/Data/Translate';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _userRegister = function (data) {
            var url = serviceBase + 'api/Account/Register';
            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        var _setNewPassword = function (data) {
            var url = serviceBase + 'api/Account/NewPassword';
            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }
        var _updateUser = function (data) {
            var url = serviceBase + 'api/Account/UpdateUser';
            return $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }


        var _getAttSummaryFile = function () {
            var url = serviceBase + 'api/Files/AttendanceSummary';
            _downloadFileAsExcel(url, 'AttSummary.xlsm');
        }

        var _getAllPageList = function () {
            var rndVal = Math.round((Math.random() * 10) * 10);
            var url = serviceBase + 'api/AppData/PageAll/'
            return $http.get(url).then(function (results) {
                return results;
            });
        }

        var _uploadRosterDetail = function (data) {
            var url = serviceBase + 'api/Upload/UploadRosterDetail';
            return $http.post(url, JSON.stringify(JSON.stringify(data)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (results) {
                return results;
            });
        }

        pageServiceFactory.serviceBase = serviceBase;
        pageServiceFactory.getPagData = _getPagData;
        pageServiceFactory.deletePageData = _deletePageData;
        pageServiceFactory.editPageData = _editPageData;
        pageServiceFactory.setMsg = _setMsg;
        pageServiceFactory.getMsg = _getMsg;
        pageServiceFactory.setMsgUndef = _setMsgUndef;
        pageServiceFactory.getNavigation = _getNavigation;
        pageServiceFactory.msg = {
            type: '',
            text: ''
        };
        pageServiceFactory.getTitle = _getTitle;
        pageServiceFactory.setTitle = _setTitle;
        pageServiceFactory.getIdenVal = _getIdenVal;
        pageServiceFactory.getSelect = _getSelect;
        pageServiceFactory.getEmpData = _getEmpData;
        pageServiceFactory.getProfilePageNavigation = _getProfilePageNavigation;
        pageServiceFactory.getAppUserData = _getAppUserData;
        pageServiceFactory.getOnlyAppData = _getOnlyAppData;
        pageServiceFactory.getFormBuilder = _getFormBuilder;
        pageServiceFactory.getInnerPageData = _getInnerPageData;
        pageServiceFactory.getDetailView = _getDetailView;
        pageServiceFactory.saveGridSetting = _saveGridSetting;
        pageServiceFactory.findEntity = _findEntity;
        pageServiceFactory.getPrintBuilder = _getPrintBuilder;
        pageServiceFactory.getMapColumns = _getMapColumns;
        pageServiceFactory.getCustomQuery = _getCustomQuery;
        pageServiceFactory.getTableData = _getTableData;

        //report builder
        pageServiceFactory.getReport = _getReport;
        pageServiceFactory.getReportBuilder = _getReportBuilder;
        pageServiceFactory.saveReportBuilder = _saveReportBuilder;
        pageServiceFactory.getFilterColumn = _getFilterColumn;
        pageServiceFactory.getListReport = _getListReport;

        //uploader utility
        pageServiceFactory.processUpload = _processUpload;
        pageServiceFactory.uploadValidator = _uploadValidator;

        //tickets
        pageServiceFactory.getTicket = _getTicket;

        //File Repo
        pageServiceFactory.getFile = _getFile;
        pageServiceFactory.saveFile = _saveFile;
        pageServiceFactory.getBGClass = _getBGClass;
        pageServiceFactory.sendJdToCand = _sendJdToCand;

        //reminder
        pageServiceFactory.saveRemind = _saveRemind;
        pageServiceFactory.getRemind = _getRemind;
        pageServiceFactory.getRemindList = _getRemindList;
        pageServiceFactory.getAssignedUser = _getAssignedUser;
        pageServiceFactory.saveUserAssigned = _saveUserAssigned;

        //dashboard
        pageServiceFactory.getCVSummary = _getCVSummary;
        pageServiceFactory.getCalendar = _getCalendar;
        pageServiceFactory.changePassword = _changePassword;
        pageServiceFactory.studentSession = _studentSession;
        pageServiceFactory.sendEmail = _sendEmail;
        pageServiceFactory.sendCustomEmail = _sendCustomEmail;
        pageServiceFactory.getEmailTempList = _getEmailTempList;
        pageServiceFactory.getBuilderPageList = _getBuilderPageList;
        pageServiceFactory.getFieldSetting = _getFieldSetting;
        pageServiceFactory.getQuesPaper = _getQuesPaper;
        pageServiceFactory.ansQuesPaper = _ansQuesPaper;
        pageServiceFactory.rptHandshake = _rptHandshake;
        pageServiceFactory.updateField = _updateField;
        pageServiceFactory.updateSingleField = _updateSingleField;

        // FIle  Repo attchment by Nitesh
        pageServiceFactory.getFileAttach = _getFileAttach;
        pageServiceFactory.saveFileAttach = _saveFileAttach;

        //Test FIle  Repo attchment by Nitesh
        pageServiceFactory.saveTestFileAttach = _saveTestFileAttach;
        pageServiceFactory.getTestFileAttach = _getTestFileAttach;
        pageServiceFactory.getCustomReport = _getCustomReport;
        pageServiceFactory.updateMultiField = _updateMultiField;
        pageServiceFactory.generateSalary = _generateSalary;
        pageServiceFactory.getFieldSetting = _getFieldSetting;
        pageServiceFactory.getDashboard = _getDashboard;
        pageServiceFactory.migrateData = _migrateData;
        pageServiceFactory.getRowCount = _getRowCount;
        pageServiceFactory.uploadEmployeeData = _uploadEmployeeData;

        //User Custom View
        pageServiceFactory.ucvSaveUSV = _ucvSaveUSV;
        pageServiceFactory.getCustomEmailSetting = _getCustomEmailSetting;
        pageServiceFactory.getUserDashboard = _getUserDashBoard;
        pageServiceFactory.getAllSelect = _getAllSelect;
        pageServiceFactory.create = _create;
        pageServiceFactory.commonUploder = _commonUploder;
        pageServiceFactory.leaveTypeUpload = _leaveTypeUpload;
        pageServiceFactory.multiSave = _multiSave;
        pageServiceFactory.multiSaveRows = _multiSaveRows;
        pageServiceFactory.restorePayband = _restorePayband;
        pageServiceFactory.getMultiEntity = _getMultiEntity;
        pageServiceFactory.uploadManualAttendance = _uploadManualAttendance;
        pageServiceFactory.generateFullAndFinalSalary = _generateFullAndFinalSalary;
        pageServiceFactory.employeeBonusUpload = _employeeBonusUpload;
        pageServiceFactory.userRegister = _userRegister;
        pageServiceFactory.setNewPassword = _setNewPassword;
        pageServiceFactory.updateUser = _updateUser;
        pageServiceFactory.uploadRosterDetail = _uploadRosterDetail;
        

        //Resources
        pageServiceFactory.getResources = _getResources;
        pageServiceFactory.getTranslateData = _getTranslateData;

        pageServiceFactory.getAttSummaryFile = _getAttSummaryFile;

        pageServiceFactory.getAllPageList = _getAllPageList;

        return pageServiceFactory;

    }
]);

//Service Created by Deepak Jain http://deepjain1290.blogspot.com
//Email : deepjain1290@gmail.com
//for any help
//01-July-2016`````````