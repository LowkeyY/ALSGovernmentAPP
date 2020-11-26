var cunovs = {
  cnVersion: '9.0.0',
  cnCodeVersion: '1.0.0',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnhtmlWidth: document.documentElement.clientWidth,

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
    return '';
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString('#258eee');
      } else {
        router = router || '/';
        switch (router) {
          case '/':
          case '/dashboard': {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#258eee');
            break;
          }
          default: {
            StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#258eee');
          }
        }
      }
    }
  },
  cnPlayAudio: function (url, state, callback) {
    var my_media = new Media(url,
      // success callback
      function () {
        callback();
      },
      // error callback
      function (err) {
        callback();
      },
    );
    // Play audio
    state ? my_media.stop() : my_media.play();
  },
  cnPrintTag: '[CUNOVS-MYALS]',
  cnPrn: function (args) {
    console.log(cnPrintTag + ' ' + (!args || arguments.length > 1 ? JSON.stringify(arguments) : typeof args === 'object' ? JSON.stringify(args) : args));
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
      }
      ,
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
  initBaiduMap: function () {//先初始化一下，解决第一次插件不加载
    if ('baidumap_location' in window) {
      baidumap_location.getCurrentPosition(function (result) {
        console.log(result);
      }, function (error) {
        console.error(error);
      });
    } else {
      console.error('baidumap_location is undefined');
    }
  },
  cnGetCurrentPosition: function (onSuccess, onError, timeout) {
    var cbSuccess = function () {
      onSuccess = onSuccess || cnPrn;
      if ('baidumap_location' in window) {
        baidumap_location.getCurrentPosition(onSuccess, onError);
      } else {
        onError();
      }
    };
    cbError = function (err) {
      //console.log(err)
      onError = onError || cnPrn;
      if (err.code == 3) {
        cbSuccess();
      } else {
        onError();
      }
    };
    timeout = timeout || 500;
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout,
      });
    } else {
      onSuccess();
    }
  },
  cnReadFile: function (file, params, onSuccess, onError) {
    console.log(file);
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
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia = '';
    if (cnIsAndroid() || cnIsiOS() && cnIsDefined(Media)) {
      id = id || 'Media';
      onSuccess = onSuccess || cnPrn;
      onError = onError || cnPrn;
      var mediaName = id + '_' + cnId() + '.wav',
        mediaOnSuccess = function () {
          var media = {
            name: mediaName,
            timers: recordMedia.timers || 5,
          };
          window.requestFileSystem(window.TEMPORARY, 0, function (dirEntry) {
            dirEntry.root.getFile(media.name, {}, function (fileEntry) {
              fileEntry.file(function (f) {
                cnReadFile(f, {
                  name: media.name,
                  timers: media.timers,
                  type: f.type,
                  nativeURL: fileEntry.nativeURL,
                }, onSuccess, onError);
                /*                media.file = f
                 cnPrn(media)
                 onSuccess(media)*/
              }, onError);
            }, function (err) {
              console.log(err);
            });
          }, onError);
          //   resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dirEntry) {
          //     dirEntry.getFile(media.name, {}, function (file) {
          //       file.file(function (f) {
          //         cnReadFile(f, {
          //           name: media.name,
          //           timers: media.timers,
          //           type: f.type,
          //           nativeURL: file.nativeURL,
          //         }, onSuccess, onError);
          //         /*                media.file = f
          // cnPrn(media)
          // onSuccess(media)*/
          //       }, onError);
          //
          //     },function () {
          //       alert('获取文件错误')
          //     });
          //   }, onError);
        }
        ,
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
  cnInsertZeroByLength: function (v, len) {
    len = len || 0;
    if (len > 0) {
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push('0');
      }
      result.push(v);
      return result.join('');
    }
    return v;
  },
  cnCheckCodeVersion: function (cv, lens) {
    var cvs = [];
    if (cv && (cvs = cv.split('.')).length > 1 && lens && lens.length) {
      var maxLen = 1;
      for (var i = 0; i < lens.length; i++) {
        maxLen = maxLen > lens[i] ? maxLen : lens[i];
      }
      if (maxLen == 1) {
        return cvs.join('');
      }
      var result = [];
      for (var i = 0; i < cvs.length; i++) {
        var v = cvs[i];
        result.push(v.length <= maxLen ? cnInsertZeroByLength(v, maxLen - v.length) : v.substring(0, maxLen));
      }
      return result.join('');
    }
    return '0';
  },
  cnCodePush: function () {
    if (window.codePush) {

      var onError = function (error) {
        cnPrn('An error occurred. ' + error);
      };

      var onInstallSuccess = function () {
        cnPrn('Installation succeeded.');
      };

      var onPackageDownloaded = function (localPackage) {
        localPackage.install(onInstallSuccess, onError, {
          installMode: InstallMode.ON_NEXT_RESUME,
          minimumBackgroundDuration: 120,
          mandatoryInstallMode: InstallMode.ON_NEXT_RESTART,
        });
      };

      var onUpdateCheck = function (remotePackage) {
        if (!remotePackage) {
          cnPrn('The application is up to date.');
        } else {
          if (!remotePackage.failedInstall) {
            cnPrn('A CodePush update is available. Package hash: ' + remotePackage.packageHash);
            var codeVersions;
            if (remotePackage.description && (codeVersions = remotePackage.description.match(/cnCodeVersion:([\d\.]+)/i)) && codeVersions.length > 1) {
              var codeVersion = codeVersions[1].split('.'),
                formatLens = [];
              for (var i = 0; i < codeVersion.length; i++) {
                formatLens.push(codeVersion[i].length);
              }
              codeVersion = cnCheckCodeVersion(codeVersions[1], formatLens);
              var curCodeVersion = cnCheckCodeVersion(cnCodeVersion, formatLens);
              if (codeVersion > curCodeVersion) {
                remotePackage.download(onPackageDownloaded, onError);
              } else {
                cnPrn('The available update is old[' + codeVersions[1] + '], now[' + cnCodeVersion + '].');
              }
            } else {
              cnPrn('The available update is not right.');
            }
          } else {
            cnPrn('The available update was attempted before and failed.');
          }
        }
      };
      window.codePush.checkForUpdate(onUpdateCheck, onError);
    }
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
        initBaiduMap();
        if (cordova.InAppBrowser) {
          cnOpen = function (url, target, params, callback) {
            target = target || '_blank';
            params = params || 'location=no,toolbarposition=top,closebuttoncaption=完成,closebuttoncolor=#ffffff,hideurlbar=yes,toolbarcolor=#4eaaf7,navigationbuttoncolor=#ffffff';
            callback = callback || new Function();
            var ref = cordova.InAppBrowser.open(url, target, params, callback),
              spinner = '<!DOCTYPE html><html><head><meta name=\'viewport\' content=\'width=device-width,height=device-height,initial-scale=1\'><style>.loader {position: absolute;    margin-left: -2em;    left: 50%;    top: 50%;    margin-top: -2em;    border: 5px solid #f3f3f3;    border-radius: 50%;    border-top: 5px solid #3498db;    width: 50px;    height: 50px;    -webkit-animation: spin 1.5s linear infinite;    animation: spin 1.5s linear infinite;}@-webkit-keyframes spin {  0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }}@keyframes spin {  0% { transform: rotate(0deg); }  100% { transform:rotate(360deg); }}</style></head><body><div class=\'loader\'></div></body></html>';
            ref.executeScript({ code: '(function() {document.write("' + spinner + '");window.location.href=\'' + url + '\';})()' });

          };
        }
        if (window.codePush) {
          window.codePush.notifyApplicationReady();
        }
        cnCodePush();
      } catch (exception) {
      }
    }
    ,
    onResume = function () {
      cnClearBadge();
    }
    ,
    cunovsWebSocket = ''
    ,
    cunovsWebSocketUrl = ''
    ,
    cunovsWebSocketUserId = ''
    ,
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
    }
    ,
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
    }
    ,
    screenChangeEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];
  for (var i = 0; i < screenChangeEvents.length; i++) {
    document.addEventListener(screenChangeEvents[i], function (e) {
        if (e.target && e.target.tagName === 'VIDEO' && cnIsDefined(document.webkitIsFullScreen)) {
          cnScreenChange(document.webkitIsFullScreen);
        }
      },
    );
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
    rootHtml.style.fontSize = cnhtmlSize + 'px';
  }

  resizeBaseFontSize();
  window.addEventListener('resize', resizeBaseFontSize, false);
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
  window.addEventListener('message', function (event) {
    cnWillCallBack(event.data);
  });
})();
