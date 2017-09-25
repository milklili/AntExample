import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { YQL, CORS } from './config'

const development = process.env.NODE_ENV === 'development'

const fetch = options => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)
  // 权限验证用
  // if (!axios.defaults.headers.common.Authorization && sessionStorage.getItem('token')) {
  //   axios.defaults.headers.common.Authorization = `bearer ${sessionStorage.getItem('token')}`
  // }
  if (development) {
    // document.cookie['.AspNetCore.Antiforgery.39FrVq1LFEg'] = 'CfDJ8NC6t2Qg0VhBvXUTPaU3N-qyh2X1NuEYzZWDYcDhlO0KNDKhQyaJlpQxDdF63RFIVbMJUI7e3ubPJzFJyXFYfRhzjDZswMu5ugrCvDqshyfNli2oHokr4ecAsVvQ8QqClGTpdaf_BZMo8GJ58H9VIss'
    document.cookie = 'nova_pms_auth_Default=CfDJ8NC6t2Qg0VhBvXUTPaU3N-oz6Bhjkkqr0eXSK-PNLhHIMmAjfhiMqIK3lQVrUKHzKP-ZQDHNdiNCf6mVn7Xn0UtRvRAC5WUEeaXT5eAPKTaCOqdIFAvK6ixsspDgzK51Ki1HQAp2CHmB7yQVboaM6PXy2VvwcRqD86cWdXTtDUkiovhFv7HlywOGlJWg7ikMHGTFe_YLp_rs8pGYsOVyiLB6uOxGe5jfWwRwL1bz-P16AoZGBLVVfO59W34kMU_6Lmx31BvlV3kIr5CBDAYrPB3YPVmKBoqw_etFyrgueJw3QdVk531lr-gkDpIa9Qzf_eiXd9SbHZ9tO73PTtOWbmgU0P-UDGmsMqZ1fypQMbR8bTv1d37Lgjh-VjMzverCJEiWD8IH-RqsDQ2zXvs82rolYtlyJdgsZk_QmbARhUT2SADzrABCW9YI6856QK98kgred996cbq9WzTuv_KCOc2SIvnKYPAW6FrA93eqHMweKZB5051U0wx5ezr1LTVXGiZploJY1jo6kbdzXctLjCtVUFMwR0QF-pX635Q02CXRsLh-yf04MmJjyzLj9kN6Xw9vwX_9L__AD61QGjYqXM8'
  }
  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }

  return fetch(options).then(response => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch(error => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    message.error(msg)
    return { success: false, statusCode, message: msg }
  })
}
