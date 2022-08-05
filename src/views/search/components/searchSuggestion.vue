<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <!-- 渲染关键词变色（v-html只能作用于标签） -->
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsApi } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      SearchSuggestionList: []
    }
  },
  methods: {
    // getSearchSuggestionsApi() {
    //   // 搜索框防抖：1.延迟执行  2.干掉上一次的定时器（id要挂在全局变量身上，让大家都看到id）
    //   clearTimeout(this.id)
    //   this.id = setTimeout(async () => {
    //     try {
    //       // this.keywords 传参
    //       const { data } = await getSearchSuggestionsApi(this.keywords)
    //       this.SearchSuggestionList = data.data.options
    //     } catch (error) {
    //       this.$toast.fail('获取搜索建议失败')
    //     }
    //   }, 300)
    // }
    // 使用lodash包，下面的防抖函数debounce
    getSearchSuggestions: debounce(async function () {
      try {
        // this.keywords 传参
        const { data } = await getSearchSuggestionsApi(this.keywords)
        // Boolean 函数，等价与 （item）=> Boolean(item)
        this.SearchSuggestionList = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  },
  // 动态监视keywords的变化，当keywords变化时调用接口函数，将keywords改为对象写法
  watch: {
    // immediate解决了计算属性先计算渲染页面再进行监视的缺点
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.SearchSuggestionList.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
