var cunovs = {
  cnVersion: '0.0.1',
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnId: function () {
    return cnGlobalIndex++
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]'
    }
    return false
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null)
  },
  cnIsDevice: function () {
    return typeof (device) != 'undefined'
  },
  cnIsAndroid: function () {
    return cnIsDevice() && device.platform == 'Android'
  },
  cnUpdate:function (url) {
    window.location.href=url
  },
  cnDeviceType:function () {
   if(cnIsDevice()){
     return device.platform.toLocaleLowerCase()
   }
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleDefault()
        StatusBar.backgroundColorByHexString('#4eaaf7')
      } else {
        router = router || '/'
        switch (router) {
          case '/':
          case '/dashboard': {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#fff')
            break
          }
          default: {
            StatusBar.styleDefault()
            StatusBar.backgroundColorByHexString('#fff')
          }
        }
      }
    }
  },
  cnPlayAudio: function (id, played) {
    var el
    if (cnIsDefined(id) && (el = document.getElementById(id))) {
      played === true ? el.pause() : el.play()
    }
  },
  cnPrn: function (ars) {
    console.log(ars || arguments)
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl)
    }
    var onFail = function () {
    }
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    })
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      ,
      bstr = atob(arr.length > 1 ? arr[1] : data)
      ,
      n = bstr.length
      ,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    })
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg'
    return blob
  },
  cnGetCurrentPosition: function (onSuccess, onError, timeout) {
    var cbSuccess = function () {
      onSuccess = onSuccess || cnPrn
      cordova.BaiduLocation.getCurrentPosition(onSuccess, onError)
    }
    cbError = function (err) {
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
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError, { timeout: timeout })
    } else {
      onSuccess()
    }
  },
  cnReadFile: function (file, params, onSuccess, onError) {
    onSuccess = onSuccess || cnPrn
    onError = onError || cnPrn
    params = params || {}
    if (!file) {
      onError({
        message: '文件不存在。',
      })
    } else {
      var reader = new FileReader()
      reader.onload = function (e) {
        onSuccess(cnCreateBlob(e.target.result, params.name, params.type), params)
      }
      reader.onerror = onError
      reader.readAsDataURL(file)
    }
  },
  cnWillCallBack: function (data) {
    window.cneventParam = data
    window.dispatchEvent(new Event('cnevent', { 'bubbles': true, 'cancelable': false }))
  },
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia = ''
    if (cnIsAndroid() && cnIsDefined(Media)) {
      id = id || 'Media'
      onSuccess = onSuccess || cnPrn
      onError = onError || cnPrn
      var mediaName = id + '_' + cnId() + '.mp3',
        mediaOnSuccess = function () {
          var media = {
            name: mediaName,
            timers: recordMedia.timers || 5,
          }
          resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
            dirEntry.getFile(media.name, {}, function (file) {
              file.file(function (f) {
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
        ,
        recordMedia = new Media(mediaName, mediaOnSuccess, onError)
      recordMedia.startRecord()
    }
    return recordMedia
  },
  cnStopRecord: function (recordMedia) {
    if (cnIsDefined(recordMedia) && cnIsDefined(recordMedia.stopRecord)) {
      recordMedia.stopRecord()
    }
    return recordMedia
  },
  cnDecode: function (json) {
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
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div')
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);'
    dialog.innerHTML = d
    document.getElementsByTagName('body')[0].appendChild(dialog)
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog)
      }
    }, time || 2000)
  },
}

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function (target, source) {
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
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0
  }
}

(function () {
    var onDeviceReady = function () {
        try {
          if (cnIsDefined(StatusBar) != 'undefined') {
            StatusBar.overlaysWebView(false)
            cnSetStatusBarStyle()
          }
        } catch (exception) {
        }
      },
      cunovsWebSocket = '',
      cunovsWebSocketUrl = '',
      cunovsWebSocketUserId = '',
      cnnovsWebSocketStatus = ''

    window.cnGetWebSocket = function (url, id) {
      if (cnIsDefined(url) && url) {
        if (cnIsDefined(id) && id) {
          if (cunovsWebSocket && cnnovsWebSocketStatus == 'open' && cunovsWebSocketUrl == url && cunovsWebSocketUserId == id) {
            return cunovsWebSocket
          } else {
            cunovsWebSocketUrl = url
            cunovsWebSocketUserId = id
            cunovsWebSocket = new WebSocket(url + id + '/android')
            cunovsWebSocket.onmessage = function (event) {
              cnWillCallBack(cnDecode(event.data))
            }
            cunovsWebSocket.onerror = function (event) {
              cnnovsWebSocketStatus = 'error'
              cunovsWebSocket = ''
            }
            cunovsWebSocket.onopen = function () {
              cnnovsWebSocketStatus = 'open'
            }
            cunovsWebSocket.onclose = function () {
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
    window.cnPrintWebSocket = function () {
      console.log(cunovsWebSocket)
    }
    document.addEventListener('deviceready', onDeviceReady, false)

    function resizeBaseFontSize () {
      var rootHtml = document.documentElement,
        deviceWidth = rootHtml.clientWidth
      if (deviceWidth > 1024) {
        deviceWidth = 1024
      }
      cnhtmlSize = deviceWidth / 7.5
      rootHtml.style.fontSize = cnhtmlSize + 'px'
    }

    resizeBaseFontSize()
    window.addEventListener('resize', resizeBaseFontSize, false)
    window.addEventListener('orientationchange', resizeBaseFontSize, false)
    window.addEventListener('message', function (event) {
      cnWillCallBack(event.data)
    })
  }
)()
