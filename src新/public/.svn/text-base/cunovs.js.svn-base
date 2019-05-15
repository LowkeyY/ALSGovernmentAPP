var cunovs = {
  cnVersion: '2.4.1',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnId: function() {
    return cnGlobalIndex++
  },
  cnIsArray: function(o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]'
    }
    return false
  },
  cnIsDefined: function(o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null)
  },
  cnIsDevice: function() {
    return typeof (device) != 'undefined'
  },
  cnIsAndroid: function() {
    return cnIsDevice() && device.platform == 'Android'
  },
  cnIsiOS: function() {
    return cnIsDevice() && device.platform == 'iOS'
  },
  cnUpdate: function(url) {
    window.location.href = url
  },
  cnDeviceType: function() {
    if (cnIsAndroid()) {
      return 'android'
    }
    return ''
  },
  cnSetStatusBarStyle: function(router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleDefault()
        StatusBar.backgroundColorByHexString('#4eaaf7')
      } else {
        router = router || '/'
        switch (router) {
          case '/':
          case '/dashboard':
          {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#fff')
            break
          }
          default:
          {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#fff')
          }
        }
      }
    }
  },
  cnPlayAudio: function(id, played) {
    var el
    if (cnIsDefined(id) && (el = document.getElementById(id))) {
      played === true ? el.pause() : el.play()
    }
  },
  cnPrn: function(ars) {
    console.log(ars || arguments)
  },
  cnTakePhoto: function(cb, type) {
    var onSuccess = function(cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl)
    }
    var onFail = function() {}
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    })
  },
  cnCreateBlob: function(data, name, type) {
    var arr = data.split(',')
      , bstr = atob(arr.length > 1 ? arr[1] : data)
      , n = bstr.length
      , u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr],{
      type: type || 'image/jpeg',
    })
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg'
    return blob
  },
  cnStartJiluguiji: function(serverId, entityId, onSuccess, onError, others, timeout) {
    var onSuccess = onSuccess || cnPrn
      , onErroe = onError || cnPrn
      , others = others || {}
    cbSuccess = function() {
      if (others.key && others.url) {
        cordova.BaiduLocation.startPositions(cnPrn, cbError, {
          submitUserToken: others.key,
          submitAddr: others.url
        })
      }
      cordova.BaiduYingyan.setInterval(2, 10, cnPrn, cnPrn)
      cordova.BaiduYingyan.setLocationMode(0, cnPrn, cnPrn)
      cordova.BaiduYingyan.setProtocolType(0, cnPrn, cnPrn)
      cordova.BaiduYingyan.startTrace(entityId, serverId, '2', {}, onSuccess, onError)
    }
      ,
      cbError = function(err) {
        if (err.code == 3) {
          cbSuccess()
        } else {
          onError(err)
        }
      }
      ,
      timeout = timeout || 1000
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout
      })
    } else {
      onSuccess()
    }
  },
  cnStopJiluguiji: function(onSuccess, onError) {
    var onSuccess = onSuccess || cnPrn
      , onErroe = onError || cnPrn
    if (cnIsDevice()) {
      cordova.BaiduLocation.stop(cnPrn, cnPrn)
      cordova.BaiduYingyan.stopTrace(onSuccess, onError)
    } else {
      onSuccess()
    }
  },
  cnNeedPositions: function(key, url) {
    if (true) {
      return
    }
    var cbError = function(err) {
      if (err.code == 3) {
        cbSuccess()
      } else {
        cnShowToast('无法定位您的位置，请开启定位权限并保持网络畅通。', 3000)
      }
    }
      , cbSuccess = function() {
      cordova.BaiduLocation.startPositions(cnPrn, cbError, {
        submitUserToken: key,
        submitAddr: url
      })
    }
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: 5000
      })
    }
  },
  cnGetCurrentPosition: function(onSuccess, onError, timeout) {
    var cbSuccess = function() {
      onSuccess = onSuccess || cnPrn
      cordova.BaiduLocation.getCurrentPosition(onSuccess, onError)
    }
    cbError = function(err) {
      //console.log(err)
      onError = onError || cnPrn
      if (err.code == 3) {
        cbSuccess()
      } else {
        onError()
      }
    }
    timeout = timeout || 500
    if (cnIsDevice()) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
        timeout: timeout
      })
    } else {
      onSuccess()
    }
  },
  cnReadFile: function(file, params, onSuccess, onError) {
    onSuccess = onSuccess || cnPrn
    onError = onError || cnPrn
    params = params || {}
    if (!file) {
      onError({
        message: '文件不存在。',
      })
    } else {
      var reader = new FileReader()
      reader.onload = function(e) {
        onSuccess(cnCreateBlob(e.target.result, params.name, params.type), params)
      }
      reader.onerror = onError
      reader.readAsDataURL(file)
    }
  },
  cnWillCallBack: function(data) {
    var cnEvent = new Event('cnevent', { 'bubbles': true, 'cancelable': false });
    cnEvent.cneventParam = data
    window.dispatchEvent(cnEvent)
  },
  cnStartRecord: function(id, onSuccess, onError) {
    var recordMedia = ''
    if (cnIsAndroid() && cnIsDefined(Media)) {
      id = id || 'Media'
      onSuccess = onSuccess || cnPrn
      onError = onError || cnPrn
      var mediaName = id + '_' + cnId() + '.mp3'
        , mediaOnSuccess = function() {
        var media = {
          name: mediaName,
          timers: recordMedia.timers || 5,
        }
        resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dirEntry) {
          dirEntry.getFile(media.name, {}, function(file) {
            file.file(function(f) {
              cnReadFile(f, {
                name: media.name,
                timers: media.timers,
                type: f.type,
                nativeURL: file.nativeURL,
              }, onSuccess, onError)
              /*                media.file = f
      cnPrn(media)
      onSuccess(media)*/
            }, onError)

          })
        }, onError)
      }
        , recordMedia = new Media(mediaName,mediaOnSuccess,onError)
      recordMedia.startRecord()
    }
    return recordMedia
  },
  cnStopRecord: function(recordMedia) {
    if (cnIsDefined(recordMedia) && cnIsDefined(recordMedia.stopRecord)) {
      recordMedia.stopRecord()
    }
    return recordMedia
  },
  cnDecode: function(json) {
    try {
      return eval('(' + json + ')')
    } catch (e) {
      try {
        return JSON.parse(json)
      } catch (e) {
        return json
      }
    }
  },
  cnShowToast: function(d, time) {
    //退出提示
    var dialog = document.createElement('div')
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);'
    dialog.innerHTML = d
    document.getElementsByTagName('body')[0].appendChild(dialog)
    setTimeout(function() {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog)
      }
    }, time || 2000)
  },
  cnSetAlias: function(alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.setAlias({
        sequence: 1,
        alias: alias,
      }, function(result) {//console.log(" -JPush-setAlias-success: ", result);
      }, function(error) {//console.log(" -JPush-setAlias-error: ", error);
      })
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.setAlias({
        accessToken: accessToken,
        alias: alias
      })
    }
  },
  cnDeleteAlias: function(alias, accessToken) {
    if (cnIsiOS() && typeof (window.JPush) !== 'undefined') {
      window.JPush.deleteAlias({
        sequence: 3,
      }, function(result) {//console.log(" -JPush-deleteAlias-success: ", result);
      }, function(error) {//console.log(" -JPush-deleteAlias-error: ", error);
      })
    } else if (typeof (window.CunovsAliasPlugin) === 'object') {
      window.CunovsAliasPlugin.deleteAlias({
        accessToken: accessToken,
        alias: alias
      })
    }
  },
  cnClearBadge: function() {
    if (!cnIsDevice() || typeof (cordova) == 'undefined') {
      return
    }
    try {
      if (cnIsiOS()) {
        window.JPush.setApplicationIconBadgeNumber(0)
        window.JPush.setBadge(0)
      } else if (cordova.plugins.notification.badge) {
        cordova.plugins.notification.badge.clear()
      }
    } catch (exception) {}
  },
  cnScreenChange: function(isFull) {
    console.log(' ------------- isFull : ' + isFull)
    if (cnIsDevice()) {
      if (isFull === true) {
        screen.orientation.lock('landscape')
        StatusBar.hide()
      } else {
        screen.orientation.lock('portrait')
        StatusBar.show()
      }
    }
  },
}

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function(target, source) {
  if (target && source && typeof source == 'object') {
    for (var att in source) {
      target[att] = source[att]
    }
    return target
  }
  return target || {}
}
cnApply(window, cunovs)

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function(str) {
    return this.indexOf(str) === 0
  }
}

(function() {
    var onDeviceReady = function() {
      try {
        if (cnIsDefined(StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false)
          cnSetStatusBarStyle()
        }
        cnClearBadge()
      } catch (exception) {}
    }
      , onResume = function() {
      cnClearBadge()
    }
      , cunovsWebSocket = ''
      , cunovsWebSocketUrl = ''
      , cunovsWebSocketUserId = ''
      , cnnovsWebSocketStatus = ''

    window.cnGetWebSocket = function(url, id) {
      if (cnIsDefined(url) && url) {
        if (cnIsDefined(id) && id) {
          if (cunovsWebSocket && cnnovsWebSocketStatus == 'open' && cunovsWebSocketUrl == url && cunovsWebSocketUserId == id) {
            return cunovsWebSocket
          } else {
            cunovsWebSocketUrl = url
            cunovsWebSocketUserId = id
            cunovsWebSocket = new WebSocket(url + id + '/androidhome')
            cunovsWebSocket.onmessage = function(event) {
              cnWillCallBack(cnDecode(event.data))
            }
            cunovsWebSocket.onerror = function(event) {
              cnnovsWebSocketStatus = 'error'
              cunovsWebSocket = ''
            }
            cunovsWebSocket.onopen = function() {
              cnnovsWebSocketStatus = 'open'

            }
            cunovsWebSocket.onclose = function() {
              cnnovsWebSocketStatus = 'close'
              cunovsWebSocket = ''
            }
          }
        } else {
          cunovsWebSocket = '',
            cunovsWebSocketUrl = '',
            cunovsWebSocketUserId = '',
            cnnovsWebSocketStatus = ''
        }
      }
      return ''
    }
      ,
      exitApp = function() {
        navigator.app.exitApp()
      }
      ,
      onExitApp = function() {
        if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
          var curHref = window.location.href
          if (curHref.indexOf('/login') != -1) {
            navigator.app.exitApp()
          } else if (curHref.indexOf('/?_k') != -1) {
            cnShowToast('再按一次退出我的阿拉善')
            document.removeEventListener('backbutton', onExitApp, false)
            document.addEventListener('backbutton', exitApp, false)
            var intervalID = window.setTimeout(function() {
              window.clearTimeout(intervalID)
              document.removeEventListener('backbutton', exitApp, false)
              document.addEventListener('backbutton', onExitApp, false)
            }, 2000)
          } else {
            navigator.app.backHistory()
          }
        }
      }
      ,
      screenChangeEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange']
    for (var i = 0; i < screenChangeEvents.length; i++) {
      document.addEventListener(screenChangeEvents[i], function(e){
          if (e.target && e.target.tagName === 'VIDEO' && cnIsDefined(document.webkitIsFullScreen)) {
            cnScreenChange(document.webkitIsFullScreen)
          }
        }
      )
    }
    window.cnPrintWebSocket = function() {
      console.log(cunovsWebSocket)
    }
    document.addEventListener('deviceready', onDeviceReady, false)
    document.addEventListener('resume', onResume, false)
    document.addEventListener('backbutton', onExitApp, false)

    function resizeBaseFontSize() {
      var rootHtml = document.documentElement
        , deviceWidth = rootHtml.clientWidth
      if (deviceWidth > 1024) {
        deviceWidth = 1024
      }
      cnhtmlSize = deviceWidth / 7.5
      rootHtml.style.fontSize = cnhtmlSize + 'px'
    }

    resizeBaseFontSize()
    window.addEventListener('resize', resizeBaseFontSize, false)
    window.addEventListener('orientationchange', resizeBaseFontSize, false)
    window.addEventListener('message', function(event) {
      cnWillCallBack(event.data)
    })
  }
)()
