/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { _cs, _cr, _cg } from './cookie'
import defaultImg from "themes/images/patry.png"
import defaultUserIcon from "themes/images/userIcon.jpg"


let userAccessToken = "";
// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

const getImages = (path = "",type='defaultImg') => {
  if (path == "" || !path)
    return type==='defaultImg'?defaultImg:defaultUserIcon;
  return path.startsWith("http://") || path.startsWith("https://") ? path
    : (config.baseURL + (path.startsWith("/") ? "" : "/") + path);
}
const getErrorImg = (el) =>{
  if(el && el.target){
    el.target.src = defaultImg
    el.target.onerror=null;
  }
}

// const getDefaultUserICon = (el) =>{
//   if(el && el.target){
//     el.target.src = defaultImg;
//     el.target.onerror=null;
//   }
// }
const setLoginIn = ({accessToken, user_name, user_power}) => {
  const now = new Date()
  now.setDate(now.getDate() + 5)
  //_cs('user_session', now.getTime())
  _cs('user_name', user_name)
  //_cs('user_power', user_power)
  _cs(config.accessToken, accessToken)
  userAccessToken = accessToken
  // cnSetAlias(user_name , accessToken);
}
const getLocalIcon = (icon) => {
    const regex = /\/([^\/]+?)\./g;
    let addIconName = [];
    if(icon.startsWith("/") && (addIconName = regex.exec(icon)) && addIconName.length > 1){
      const addIcon = require(`svg/${icon.substr(1)}`);
      return `#${addIconName[1]}`;
    }
    return icon;
}

module.exports = {
  config,
  request,
  classnames,
  getErrorImg,
  getImages,
  queryURL,
  setLoginIn,
  queryArray,
  timeStamp : () => (new Date()).getTime(),
  isEmptyObject : (obj) => Object.keys(obj).length === 0,
  getLocalIcon,
}
