import axios from 'axios'
import { baseURL, ajaxTimeout } from './config'
import { hashHistory } from 'react-router'
import EXIF from 'exif-js'
import { _cg } from './cookie'

axios.defaults.baseURL = baseURL
let formSubmitBaseIndex = 0

const doDecode = (json) => {
    return eval('(' + json + ')')
  },
  checkUrl = (url) => {
    if (!url) {
      return ''
    }
    return url
  },
  getKey = (name) => (name && `${name}` || 'formSubmitBaseIndex') + `_${formSubmitBaseIndex++}`

const getResponeseErrMsg = (status) => {
  var msg = '未知错误'
  if (status > 199 && status < 300) {
    return ''
  }
  switch (status) {
    case 500:
      msg = '服务器发生未知错误.'
      break
    case 403:
      msg = '访问服务器被拒绝'
      break
    case 404:
      msg = '未找到请求的页面'
      break
    case 405:
      msg = '不允许访问本页面的当前方法'
      break
    case 408:
    case -1: // 目前没有人为调用Connection.abort
      msg = '访问超时'
      break
    case 502:
      msg = '无法连接'
      break
    case 504:
    case 0:
    case undefined:
      msg = '网络已断开,不能连接到服务器'
      break
    default:
      msg = '系统错误,错误代码:' + status
  }
  return msg
}
const transformFileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    let orientation
    const reader = new FileReader()
    reader.onload = function (e) {
      const result = e.target.result
      EXIF.getData(file, function () {
        EXIF.getAllTags(this)
        orientation = EXIF.getTag(this, 'Orientation')
        resolve({
          data: result,
          orientation,
        })
      })
    }
    reader.readAsDataURL(file)
  })
}

const compressDataUrlToFile = (data) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = function () {
      resolve(img)
    }
    img.src = data
  })
}

const processData = (data, file, prefix = '') => {
  var arr = data.split(','),
    bstr = atob(arr.length > 1 ? arr[1] : data),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  var blob = new Blob([u8arr], {
    type: file.type,
  })
  blob.name = prefix + file.name
  return blob
}

const compressFile = (img, file, orientation, callback) => {
  const imgCompassMaxSize = 200 * 1024,
    compressionRatio = 30 // 超过 200k 就压缩
  let drawWidth,
    drawHeight,
    width,
    height
  drawWidth = img.naturalWidth
  drawHeight = img.naturalHeight

  let maxSide = Math.max(drawWidth, drawHeight)
  if (maxSide > 1024) {
    let minSide = Math.min(drawWidth, drawHeight)
    minSide = minSide / maxSide * 1024
    maxSide = 1024
    if (drawWidth > drawHeight) {
      drawWidth = maxSide
      drawHeight = minSide
    } else {
      drawWidth = minSide
      drawHeight = maxSide
    }
  }
  //cns__1024_768
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width = drawWidth
  canvas.height = height = drawHeight

  switch (orientation) {
    // 1 不需要旋转
    case 1: {
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight)
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      break
    }
    // iphone 横屏拍摄，此时 home 键在左侧 旋转180度
    case 3: {
      ctx.clearRect(0, 0, width, height)
      ctx.translate(0, 0)
      ctx.rotate(Math.PI)
      ctx.drawImage(img, -width, -height, width, height)
      break
    }
    // iphone 竖屏拍摄，此时 home 键在下方(正常拿手机的方向) 旋转90度
    case 6: {
      canvas.width = height
      canvas.height = width
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.translate(0, 0)
      ctx.rotate(90 * Math.PI / 180)
      ctx.drawImage(img, 0, -height, width, height)
      break
    }
    // iphone 竖屏拍摄，此时 home 键在上方 旋转270度
    case 8: {
      canvas.width = height
      canvas.height = width
      ctx.clearRect(0, 0, width, height)
      ctx.translate(0, 0)
      ctx.rotate(-90 * Math.PI / 180)
      ctx.drawImage(img, -width, 0, width, height)
      break
    }
    default: {
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      break
    }
  }
  callback(
    processData(canvas.toDataURL(
      file.type, file.size > imgCompassMaxSize ? (compressionRatio / 100) : 1), file, `cn__${drawWidth}_${drawHeight}__cn`))
}

const submit = (url, param, isCNDefined) => axios.post(checkUrl(url), param, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
  .then((response) => {
    const { statusText, status } = response
    let data = response.data
    typeof (data) === 'string' && (data = doDecode(data))
    const { success, message = '', ...results } = data
    if (success === true) {
      return {
        ...results,
        ...data,
      }
    } else {
      if (isCNDefined === true) {
        return data
      }
      throw {
        success,
        status,
        response: {
          message,
        },
      }
    }
  })
  .catch((error) => {
    const { response = {} } = error
    if (isCNDefined === true) {
      return response
    }
    let { message = '', status, ...otherData } = response
    if (message !== '') {
      status = 600
    } else {
      const { data, statusText } = response
      otherData = data
      status = response.status
      message = getResponeseErrMsg(status) || data.message || statusText
      if (status === 401) {
        hashHistory.replace(`/login`)
        return
      }
    }
    throw {
      success: false,
      status,
      message,
      ...otherData,
    }
  })


export default function formsubmit (url, params, images, files = {}, isCNDefined = false) {
  console.log('formsubmit!!', images, files)

  let param = new FormData()
  const { isOriginal = false, ...fields } = params
  param.append('__device', 'mobile')
  Object.keys(fields)
    .map(key => {
      param.append(key, fields[key])
    })
  Object.keys(files)
    .map(key => {
      const f = files[key]
      param.append(key, f, f.name)
    })

  if (isOriginal) {
    Object.keys(images)
      .map(key => {
        const f = images[key]
        param.append(key, f, f.name)
      })
    return submit(url, param, isCNDefined)
  } else {
    const newFiles = {},
      promiseFiles = [],
      promiseArray = Object.keys(images)
        .map((key) => {
          const f = images[key],
            { size = 0, type = 'image/jpeg', name = 'img_' + (cnGlobalIndex++) + '.jpg' } = f
          return transformFileToDataUrl(f)
            .then(({ data, orientation = 1 }) => {
              promiseFiles.push(compressDataUrlToFile(data)
                .then((img) => {
                  compressFile(img, {
                    size,
                    type,
                    name,
                  }, orientation, (newFile) => {
                    newFiles[key] = newFile
                  })
                }))
            })
        })
    return Promise.all(promiseArray)
      .then(() => {
        return Promise.all(promiseFiles)
          .then(() => {
            Object.keys(newFiles)
              .map(key => {
                const f = newFiles[key]
                param.append(key, f, f.name)
              })
            return submit(url, param, isCNDefined)
          })
      })
  }
}

export { transformFileToDataUrl, compressDataUrlToFile, compressFile }
