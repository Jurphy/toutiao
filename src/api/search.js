import request from '@/utils/request'
// 传参时请求参数显示query时，用params
// 传参时请求参数显示body时，用data
/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchSuggestionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
