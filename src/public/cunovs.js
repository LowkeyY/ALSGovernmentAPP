var cunovs = {
  cnVersion: '9.0.6',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnhtmlWidth: document.documentElement.clientWidth,
  cnDownloadFileTag: 'tag_cunovs_download_files',
  cnId: function () {
    return cnGlobalIndex++;
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]';
    }
    return false;
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null);
  },
  cnIsDevice: function () {
    return typeof (device) != 'undefined';
  },
  cnIsAndroid: function () {
    return cnIsDevice() && device.platform == 'Android';
  },
  cnIsiOS: function () {
    return cnIsDevice() && device.platform == 'iOS';
  },
  cnUpdate: function (url) {
    window.location.href = url;
  },
  cnDeviceType: function () {
    if (cnIsAndroid()) {
      return 'android';
    }
    if (cnIsiOS()) {
      return 'iOS';
    }
    return '';
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString('#258eee');
      } else {
        router = router || '/';
        switch (router) {
          case '/':
          case '/dashboard': {
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString('#258eee');
            break;
          }
          default: {
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString('#258eee');
          }
        }
      }
    }
  },
  cnPrn: function (ars) {
    console.log(ars || arguments);
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl);
    };
    var onFail = function () {
    };
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    });
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      ,
      bstr = atob(arr.length > 1 ? arr[1] : data)
      ,
      n = bstr.length
      ,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    });
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg';
    return blob;
  },
  cnStartJiluguiji: function (serverId, entityId, onSuccess, onError, others, timeout) {
    if (cnIsAndroid()) {
      cordova.plugins.backgroundMode.enable();
    }
    var onSuccess = onSuccess || cnPrn
      ,
      onErroe = onError || cnPrn
      ,
      others = others || {};
    cbSuccess = function () {
      if (others.key && others.url) {
        cordova.BaiduLocation.startPositions(cnPrn, cbError, {
          submitUserToken: others.key,
          submitAddr: others.url,
        });
      }
      cordova.BaiduYingyan.setInterval(2, 10, cnPrn, cnPrn);
      cordova.BaiduYingyan.setLocationMode(0, cnPrn, cnPrn);
      cordova.BaiduYingyan.setProtocolType(0, cnPrn, cnPrn);
      cordova.BaiduYingyan.startTrace(entityId, serverId, '2', {}, onSuccess, onError);
    }
      ,
      cbError = function (err) {
        if (err.code == 3) {
          cbSuccess();
        } else {
          onError(err);
        }
      }
      ,
      timeout = timeout || 1000;
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout,
      });
    } else {
      onSuccess();
    }
  },
  cnStopJiluguiji: function (onSuccess, onError) {
    if (cnIsAndroid()) {
      cordova.plugins.backgroundMode.disable();
    }
    var onSuccess = onSuccess || cnPrn
      ,
      onErroe = onError || cnPrn;
    if (cnIsDevice()) {
      cordova.BaiduLocation.stop(cnPrn, cnPrn);
      cordova.BaiduYingyan.stopTrace(onSuccess, onError);
    } else {
      onSuccess();
    }
  },
  cnNeedPositions: function (key, url) {
    if (true) {
      return;
    }
    var cbError = function (err) {
        if (err.code == 3) {
          cbSuccess();
        } else {
          cnShowToast('无法定位您的位置，请开启定位权限并保持网络畅通。', 3000);
        }
      },
      cbSuccess = function () {
        cordova.BaiduLocation.startPositions(cnPrn, cbError, {
          submitUserToken: key,
          submitAddr: url,
        });
      };
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: 5000,
      });
    }
  },
  cnGetCurrentPosition: function (onSuccess, onError, timeout) {
    var cbSuccess = function () {
      onSuccess = onSuccess || cnPrn;
      cordova.BaiduLocation.getCurrentPosition(onSuccess, onError);
    };
    cbError = function (err) {
      //console.log(err)
      onError = onError || cnPrn;
      if (err.code == 3 || err.code == 1) {
        cbSuccess();
      } else {
        onError(err);
      }
    };
    timeout = timeout || 500;
    if (cnIsAndroid()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout,
      });
    } else if (cnIsiOS()) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: timeout,
      });
    }
    else {
      onSuccess();
    }
  },
  cnReadFile: function (file, params, onSuccess, onError) {
    onSuccess = onSuccess || cnPrn;
    onError = onError || cnPrn;
    params = params || {};
    if (!file) {
      onError({
        message: '文件不存在。',
      });
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        onSuccess(cnCreateBlob(e.target.result, params.name, params.type), params);
      };
      reader.onerror = onError;
      reader.readAsDataURL(file);
    }
  },
  cnWillCallBack: function (data) {
    var cnEvent = new Event('cnevent', { 'bubbles': true, 'cancelable': false });
    cnEvent.cneventParam = data;
    window.dispatchEvent(cnEvent);
  },
  cnPlayAudio: function (url, state, callback) {
    var my_media = new Media(url,
      function () {
        if (callback) callback();
      },
      function (err) {
        if (callback) callback();
      });
    my_media.play();
    return my_media;
  },
  cnStopPlay: function (media) {
    if (cnIsDefined(media) && cnIsDefined(media.stop)) {
      media.stop();
    }
  },
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia = '';
    if (cnIsAndroid() || cnIsiOS() && cnIsDefined(Media)) {
      id = id || 'Media';
      onSuccess = onSuccess || cnPrn;
      onError = onError || cnPrn;
      var mediaName = id + '_' + cnId() + '.mp3',
        mediaOnSuccess = function () {
          var media = {
            name: mediaName,
            timers: recordMedia.timers || 5,
          };
          resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
            dirEntry.getFile(media.name, {}, function (file) {
              file.file(function (f) {
                cnReadFile(f, {
                  name: media.name,
                  timers: media.timers,
                  type: f.type,
                  nativeURL: file.nativeURL,
                }, onSuccess, onError);
                /*                media.file = f
        cnPrn(media)
        onSuccess(media)*/
              }, onError);

            });
          }, onError);
        },
        recordMedia = new Media(mediaName, mediaOnSuccess, onError);
      recordMedia.startRecord();
    }
    return recordMedia;
  },
  cnStopRecord: function (recordMedia) {
    if (cnIsDefined(recordMedia) && cnIsDefined(recordMedia.stopRecord)) {
      recordMedia.stopRecord();
    }
    return recordMedia;
  },
  cnDecode: function (json) {
    try {
      return eval('(' + json + ')');
    } catch (e) {
      try {
        return JSON.parse(json);
      } catch (e) {
        return json;
      }
    }
  },
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div');
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);';
    dialog.innerHTML = d;
    document.getElementsByTagName('body')[0].appendChild(dialog);
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog);
      }
    }, time || 2000);
  },
  cnSetAlias: function (alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.setAlias({
        sequence: 1,
        alias: alias,
      }, function (result) {//console.log(" -JPush-setAlias-success: ", result);
      }, function (error) {//console.log(" -JPush-setAlias-error: ", error);
      });
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.setAlias({
        accessToken: accessToken,
        alias: alias,
      });
    }
  },
  cnDeleteAlias: function (alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.deleteAlias({
        sequence: 3,
      }, function (result) {//console.log(" -JPush-deleteAlias-success: ", result);
      }, function (error) {//console.log(" -JPush-deleteAlias-error: ", error);
      });
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.deleteAlias({
        accessToken: accessToken,
        alias: alias,
      });
    }
  },
  cnClearBadge: function () {
    if (!cnIsDevice() || typeof (cordova) == 'undefined') {
      return;
    }
    try {
      if (cnIsiOS()) {
        window.JPush.setApplicationIconBadgeNumber(0);
        window.JPush.setBadge(0);
      } else if (cordova.plugins.notification.badge) {
        cordova.plugins.notification.badge.clear();
      }
    } catch (exception) {
    }
  },
  cnScreenChange: function (isFull) {
    console.log(' ------------- isFull : ' + isFull);
    if (cnIsDevice()) {
      if (isFull === true) {
        screen.orientation.lock('landscape');
        StatusBar.hide();
      } else {
        screen.orientation.lock('portrait');
        StatusBar.show();
      }
    }
  },
  cnOpen: function (url, target, params, callback) {
    target = target || '_blank';
    window.open(url, target);
  },
  cnHasPlugin: function (key) {
    if (cnIsDevice() && cnIsDefined(cordova) && cordova.plugins) {
      var hasKey = cnIsDefined(key);
      return hasKey && cordova.plugins[key] || !hasKey;
    }
    return false;
  },
  cnGetAllLocalFiles: function () {
    var files = '';
    return localStorage && (files = localStorage.getItem(cnDownloadFileTag)) ? JSON.parse(files) || [] : [];
  },
  cnSetAllLocalFiles: function (files) {
    files = files || '';
    return localStorage ? localStorage.setItem(cnDownloadFileTag, JSON.stringify(files)) : '';
  },
  cnGetLocalFile: function (fileName, options, onSuccess, onError) {
    onError = onError || cnPrn;
    if (!!fileName && cnHasPlugin()) {
      options = options || {};
      onSuccess = onSuccess || cnPrn;
      if (options.isAPKFile === true) {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fs) {
          fs.getFile(decodeURI(fileName), {
            create: options.create === true,
            exclusive: options.exclusive === true,
          }, onSuccess, onError);
        }, onError);
      } else {
        var size = options.size || 0;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, size, function (fs) {
          fs.root.getFile(decodeURI(fileName), {
            create: options.create === true,
            exclusive: options.exclusive === true,
          }, onSuccess, onError);
        }, onError);
      }
    } else {
      onError({ 'message': !fileName ? '需要获取的文件名必须提供。' : '无法使用文件读取插件。' });
    }
  },
  cnOpener2File: function (filePath, miniType, onSuccess, onError) {
    onError = onError || cnPrn;
    var tag = 'fileOpener2';
    if (cnHasPlugin(tag)) {
      var errorMessage = '';
      miniType = miniType || cnGetFileMiniType(filePath);
      if (!filePath || !miniType) {
        errorMessage = (!filePath ? '文件路径' : '文件类型') + '必须提供。';
      }
      if (errorMessage === '') {
        onSuccess = onSuccess || cnPrn;
        cordova.plugins.fileOpener2.showOpenWithDialog(
          filePath,
          miniType,
          {
            success: onSuccess,
            error: onError,
          },
        );
      } else {
        onError({ 'message': errorMessage });
      }
    } else {
      onError({ 'message': '没有找到插件[' + tag + ']' });
    }
  },
  cnDownloadFile: function (fileUrl, fileName, options, onSuccess, onError, onProgress) {
    onError = onError || cnPrn;
    onProgress = onProgress || function (e) {
      if (e.lengthComputable) {
        var progress = e.loaded / e.total;
        // 显示下载进度
        console.log((progress * 100).toFixed(2));
      }
    };
    if (cnHasPlugin() && FileTransfer) {
      var errorMessage = '';
      if (!fileUrl || !fileName) {
        errorMessage = (!fileUrl ? '下载文件路径' : '文件名称') + '必须提供。';
      }
      if (errorMessage === '') {
        onSuccess = onSuccess || cnPrn;
        options = options || {};
        options.create = true;//默认创建文件
        cnGetLocalFile(decodeURI(fileName), options, function (fileEntry) {
          var fileTransfer = new FileTransfer(),
            fileUri = options.needEncode === true ? encodeURI(fileUrl) : fileUrl;
          fileTransfer.onprogress = onProgress;
          fileTransfer.download(
            fileUri,         //uri网络下载路径
            fileEntry.nativeURL,      //url本地存储路径
            function (entry) {
              if (localStorage && JSON) {
                entry.file(function (file) {
                  var files = cnGetAllLocalFiles();
                  files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    localURL: file.localURL,
                    lastModified: file.lastModified,
                  });
                  cnSetAllLocalFiles(files);
                });
              }
              onSuccess(entry);
            },
            onError,
          );
        }, onError);
      } else {
        onError({ 'message': errorMessage });
      }
    } else {
      onError({ 'message': '无法使用文件下载插件。' });
    }
  },
  cnUpdateByDownloadAPK: function (file, onSuccess, onError, onProgress) {
    file = file || {};
    onError = onError || cnPrn;
    var fileName = file.fileName || cnVersion + 'MALS.apk',
      fileUrl = file.fileUrl || '',
      mimeType = file.mimeType || 'application/vnd.android.package-archive';
    if (!fileName) {
      onError({ 'message': '获取本地文件，文件名不能为空。' });
      return;
    }
    var fileExistAndOpen = function (entry) {
      window.CunovsAliasPlugin.openAPK([cnIsiOS() ? entry.nativeURL : entry.toInternalURL(), mimeType, true], onSuccess, onError);
    };
    cnGetLocalFile(fileName, { isAPKFile: true }, fileExistAndOpen, function (error) {
      if (!fileUrl) {
        onError({ 'message': '本地文件不存在，获取网络文件，网络地址不能为空。' });
        return;
      }
      if (!error || !error.code || error.code !== 1) {
        onError({ 'message': error.code === 2 ? '获取本地文件使用权限失败，请允许获取文件权限。' : '获取本地文件时发生未知错误。' });
        return;
      }
      cnDownloadFile(fileUrl, fileName, { isAPKFile: true }, fileExistAndOpen, onError, onProgress);
    });
  },
};

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function (target, source) {
  if (target && source && typeof source == 'object') {
    for (var att in source) {
      target[att] = source[att];
    }
    return target;
  }
  return target || {};
};
cnApply(window, cunovs);


if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}

(function () {
  var onDeviceReady = function () {
      try {
        if (cnIsDefined(StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false);
          cnSetStatusBarStyle();
        }
        cnClearBadge();
        if (cordova.InAppBrowser) {
          cnOpen = function (url, target, params, callback) {
            var getDefaultTarget = function () {
              if (cnIsiOS()) {
                return '_blank';
              }
              return '_self';
            };
            var getDefaultParams = function () {
              if (cnIsiOS()) {
                return 'location=no,toolbarposition=top,closebuttoncaption=完成,closebuttoncolor=#ffffff,hideurlbar=yes,toolbarcolor=#4eaaf7,navigationbuttoncolor=#ffffff';
              }
              return 'location=yes,hideurlbar=yes,toolbarcolor=#22609c,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff';
            };
            target = target || getDefaultTarget();
            params = params || getDefaultParams();
            callback = callback || new Function();
            var ref = cordova.InAppBrowser.open(url, target, params, callback),
              spinner = '<!DOCTYPE html><html><head><meta name=\'viewport\' content=\'width=device-width,height=device-height,initial-scale=1\'><style>.loader {position: absolute;    margin-left: -2em;    left: 50%;    top: 50%;    margin-top: -2em;    border: 5px solid #f3f3f3;    border-radius: 50%;    border-top: 5px solid #3498db;    width: 50px;    height: 50px;    -webkit-animation: spin 1.5s linear infinite;    animation: spin 1.5s linear infinite;}@-webkit-keyframes spin {  0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }}@keyframes spin {  0% { transform: rotate(0deg); }  100% { transform:rotate(360deg); }}</style></head><body><div class=\'loader\'></div></body></html>';
            ref.executeScript({ code: '(function() {document.write("' + spinner + '");window.location.href=\'' + url + '\';})()' });

          };
        }

        function syncStatus (status) {
          switch (status) {
            case SyncStatus.DOWNLOADING_PACKAGE:
              // Show "downloading" modal
              break;
            case SyncStatus.INSTALLING_UPDATE:
              // Hide "downloading" modal
              break;
          }
        }

        function downloadProgress (downloadProgress) {
          if (downloadProgress) {
            // Update "downloading" modal with current download %
            console.log('Downloading ' + downloadProgress.receivedBytes + ' of ' + downloadProgress.totalBytes);
          }
        }

        window.codePush.sync(syncStatus, null, downloadProgress);
      } catch (exception) {
      }
    },
    onResume = function () {
      cnClearBadge();
    },
    cunovsWebSocket = '',
    cunovsWebSocketUrl = '',
    cunovsWebSocketUserId = '',
    cnnovsWebSocketStatus = '';

  window.cnGetWebSocket = function (url, id) {
    if (cnIsDefined(url) && url) {
      if (cnIsDefined(id) && id) {
        if (cunovsWebSocket && cnnovsWebSocketStatus == 'open' && cunovsWebSocketUrl == url && cunovsWebSocketUserId == id) {
          return cunovsWebSocket;
        } else {
          cunovsWebSocketUrl = url;
          cunovsWebSocketUserId = id;
          cunovsWebSocket = new WebSocket(url + id + '/androidhome');
          cunovsWebSocket.onmessage = function (event) {
            cnWillCallBack(cnDecode(event.data));
          };
          cunovsWebSocket.onerror = function (event) {
            cnnovsWebSocketStatus = 'error';
            cunovsWebSocket = '';
          };
          cunovsWebSocket.onopen = function () {
            cnnovsWebSocketStatus = 'open';

          };
          cunovsWebSocket.onclose = function () {
            cnnovsWebSocketStatus = 'close';
            cunovsWebSocket = '';
          };
        }
      } else {
        cunovsWebSocket = '',
          cunovsWebSocketUrl = '',
          cunovsWebSocketUserId = '',
          cnnovsWebSocketStatus = '';
      }
    }
    return '';
  },
    exitApp = function () {
      navigator.app.exitApp();
    },
    onExitApp = function () {
      if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
        var curHref = window.location.href;
        if (curHref.indexOf('/login') != -1) {
          navigator.app.exitApp();
        } else if (curHref.indexOf('/?_k') != -1) {
          cnShowToast('再按一次退出我的阿拉善');
          document.removeEventListener('backbutton', onExitApp, false);
          document.addEventListener('backbutton', exitApp, false);
          var intervalID = window.setTimeout(function () {
            window.clearTimeout(intervalID);
            document.removeEventListener('backbutton', exitApp, false);
            document.addEventListener('backbutton', onExitApp, false);
          }, 2000);
        } else {
          navigator.app.backHistory();
        }
      }
    },
    screenChangeEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
  for (var i = 0; i < screenChangeEvents.length; i++) {
    document.addEventListener(screenChangeEvents[i], function (e) {
      if (e.target && e.target.tagName === 'VIDEO' && cnIsDefined(document.webkitIsFullScreen)) {
        cnScreenChange(document.webkitIsFullScreen);
      }
    });
  }
  window.cnPrintWebSocket = function () {
    console.log(cunovsWebSocket);
  };
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener('resume', onResume, false);
  document.addEventListener('backbutton', onExitApp, false);

  function resizeBaseFontSize () {
    var rootHtml = document.documentElement,
      deviceWidth = rootHtml.clientWidth;
    if (deviceWidth > 1024) {
      deviceWidth = 1024;
    }
    cnhtmlSize = deviceWidth / 7.5;
    cnhtmlHeight = document.documentElement.clientHeight;
    rootHtml.style.fontSize = cnhtmlSize + 'px';
  }

  resizeBaseFontSize();
  window.addEventListener('resize', resizeBaseFontSize, false);
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
  window.addEventListener('message', function (event) {
    cnWillCallBack(event.data);
  });
})();
