var cunovs = {
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnId: function () {
    return cnGlobalIndex++
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]'
    }
    return false
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null)
  },
  cnIsAndroid: function () {
    return typeof (device) != 'undefined' && device.platform == 'Android'
  },
  cnSetStatusBarStyle: function (router) {
    if (typeof (StatusBar) != 'undefined') {
      if (cnIsAndroid()) {
        StatusBar.styleDefault()
        StatusBar.backgroundColorByHexString('#108ee9')
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
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia
    if (cnIsAndroid() && cnIsDefined(Media)) {
      id = id || 'Media'
      onSuccess = onSuccess || cnPrn
      onError = onError || cnPrn
      var mediaName = id + '_' + cnId() + '.mp3'
        ,
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
    }
    document.addEventListener('deviceready', onDeviceReady, false)

    function resizeBaseFontSize () {
      var rootHtml = document.documentElement
        ,
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
  }
)()
