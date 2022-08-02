import request from '@/utils/request'
import store from '@/store'

export const getMyChannelApi = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: 'Bearer ' + store.state.tokenObj.token
    }
  })
}
