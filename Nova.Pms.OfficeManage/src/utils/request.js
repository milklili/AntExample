import fetch from 'dva/fetch'

const development = process.env.NODE_ENV === 'development'
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request (url, options) {
  const _options = Object.assign({
    headers: {
      'Content-Type': 'application/json',
    },
  }, options)
  if (development) {
    _options.credentials = 'include'
    _options.headers = {
      ..._options.headers,
      cookie: 'nova_pms_auth_Default=CfDJ8NC6t2Qg0VhBvXUTPaU3N-oz6Bhjkkqr0eXSK-PNLhHIMmAjfhiMqIK3lQVrUKHzKP-ZQDHNdiNCf6mVn7Xn0UtRvRAC5WUEeaXT5eAPKTaCOqdIFAvK6ixsspDgzK51Ki1HQAp2CHmB7yQVboaM6PXy2VvwcRqD86cWdXTtDUkiovhFv7HlywOGlJWg7ikMHGTFe_YLp_rs8pGYsOVyiLB6uOxGe5jfWwRwL1bz-P16AoZGBLVVfO59W34kMU_6Lmx31BvlV3kIr5CBDAYrPB3YPVmKBoqw_etFyrgueJw3QdVk531lr-gkDpIa9Qzf_eiXd9SbHZ9tO73PTtOWbmgU0P-UDGmsMqZ1fypQMbR8bTv1d37Lgjh-VjMzverCJEiWD8IH-RqsDQ2zXvs82rolYtlyJdgsZk_QmbARhUT2SADzrABCW9YI6856QK98kgred996cbq9WzTuv_KCOc2SIvnKYPAW6FrA93eqHMweKZB5051U0wx5ezr1LTVXGiZploJY1jo6kbdzXctLjCtVUFMwR0QF-pX635Q02CXRsLh-yf04MmJjyzLj9kN6Xw9vwX_9L__AD61QGjYqXM8',
    }
  }
  const response = await fetch(url, {
    ..._options,
  })

  checkStatus(response)

  const data = await response.json()
  const ret = {
    data,
    headers: {},
  }

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }

  return ret
}
