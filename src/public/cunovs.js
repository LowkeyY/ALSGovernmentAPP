var cunovs = {
  cnGlobalIndex: 0,
  cnhtmlSize:document.documentElement.clientWidth/7.5,
  cnhtmlHeight:document.documentElement.clientHeight,
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
    return (typeof(o) != 'undefined' && o != 'undefined' && o != null)
  },
  cnIsAndroid: function () {
    return typeof (device) != 'undefined' && device.platform == 'Android'
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
  cnStartRecord: function (id, onSuccess, onError) {
    var recordMedia
    if (cnIsAndroid() && cnIsDefined(Media)) {
      id = id || 'Media'
      onSuccess = onSuccess || function (media) {
        console.log(media)
      }
      onError = onError || function (error) {
        console.log(error)
      }
      var mediaName = id + '_' + cnId() + '.mp3',
        recordMedia = new Media(mediaName,
          function () {
            var media = { name: mediaName, timers: recordMedia.timers || 5 }
            resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
              dirEntry.getFile(media.name, {}, function (file) {
                console.log(file)
                media.file = file
                onSuccess(media)
              })
            }, function (error) {
              onError(error)
            })
          },
          function (err) {
            onError(err)
          },
        )
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

if (cunovs.cnIsDefined(Object.assign)) {
  Object.assign(window, cunovs)
} else {
  for (var att in cunovs) {
    window[att] = cunovs[att]
  }
}

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
    var rootHtml = document.documentElement,
      deviceWidth = rootHtml.clientWidth
    if (deviceWidth > 1024) {
      deviceWidth = 1024
    }
    rootHtml.style.fontSize = deviceWidth / 7.5 + 'px'
  }

  resizeBaseFontSize()
  window.addEventListener('resize', resizeBaseFontSize, false)
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
})()





