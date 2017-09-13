import { axios, config } from 'utils'

const { api } = config
const { menus } = api

export default async function query (params) {
  return axios({
    url: menus,
    method: 'get',
    data: params,
  })
}
