import request from '@/utils/request'
import store from '@/store'
import storage from '@/utils/storage'

export const getMyChannelApi = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: 'Bearer ' + store.state.tokenObj.token
    }
  })
}

export const getALlChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
export const addChannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const TOUTAO_CHANNELS = 'TOUTAO_CHANNELS'
export const setChanneltoLOcal = (MyChannel) => {
  return storage.set(TOUTAO_CHANNELS, MyChannel)
}
export const geyChanneltoLOcal = () => {
  return storage.get(TOUTAO_CHANNELS)
}
