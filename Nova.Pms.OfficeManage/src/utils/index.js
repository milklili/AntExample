import classnames from 'classnames'
import lodash from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import config from './config'
import request from './request'
import axios from './axios'
import { color } from './theme'

moment.locale('zh-cn')

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

const isNumber = function (value, int = false) {
  const v = value.toString()
  const reg = int ? /^(\+|-)?\d+$/ig : /^(\+|-)?\d+(\.\d+)?$/ig
  return reg.test(v)
}

const checkFileType = function (type) {
  const imgTypeArr = ['jpeg', 'bmp', 'png', 'jpg', 'tiff', 'gif',
    'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'wmf']
  let typeArr = []
  if (Array.isArray(type)) {
    typeArr = [...type]
  } else if (typeof type === 'string') {
    switch (type) {
      case 'image':
        typeArr = [...imgTypeArr]
        break
      default:
        break
    }
  }
  if (!typeArr.length) {
    throw new Error('检测的文件类型不支持，请传入文件类型的数组！')
  }
  return function (fileName) {
    for (let i = 0; i < typeArr.length; i++) {
      const reg = new RegExp(`${typeArr[i]}$`, 'ig')
      if (reg.test(fileName)) {
        return true
      }
    }
    return false
  }
}

const dateFormat = (date, fmt = 'YYYY-MM-DD') => {
  // const listTitle = fmt && typeof fmt === 'number'
  // if (listTitle) {
  //   if (moment(date).year() === moment().year()) {
  //     fmt = moment(date).month() === moment().month() ? '本月' : 'M月'
  //   } else {
  //     fmt = 'YY年M月'
  //   }
  // }
  return moment(date).format(fmt)
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
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  return format
}

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = name => {
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

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', rootId = '-1', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })
  data.forEach(item => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      rootId === '-1' && result.push(item)
    }
    rootId === item.id && result.push(item)
  })
  return result
}

module.exports = {
  config,
  request,
  axios,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  moment,
  dateFormat,
  isNumber,
  checkFileType,
}
