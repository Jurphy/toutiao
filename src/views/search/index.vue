<template>
  <div>
    <!-- 搜索框 -->
    <!--v-model的三个修饰符 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS(苹果) 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296FA"
        show-action
        placeholder="请输入搜索关键词"
        class="rearch"
        @search="onSearch"
        @focus="onSearchfocus"
      />
    </form>
    <!-- 搜索历史/ 建议 / 结果 -->
    <!-- <search-suggestion></search-suggestion>
    <search-result></search-result>
    <seaech-history></seaech-history> -->
    <!-- 动态控制组件的显示，is的绑定值声明在计算属性里面 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
import seaechHistory from './components/seaechHistory.vue'

export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      // 用于记录用户是否搜索了
      isShowSearchResult: false
    }
  },
  components: {
    searchSuggestion,
    searchResult,
    seaechHistory
  },
  computed: {
    componentName() {
      // 空字符串时渲染搜索历史
      if (this.keywords === '') {
        return 'seaechHistory'
      }
      // isShowSearchResult变量记录显示搜索结果
      if (this.isShowSearchResult) {
        return 'searchResult'
      }
      // 搜索历史和搜索结果都不显示时，显示搜索建议
      return 'searchSuggestion'
    }
  },
  methods: {
    // 搜索
    onSearch() {
      //   console.log('onSearch')
      // 用户点击时变量改变
      this.isShowSearchResult = true
    },
    onSearchfocus() {
      // 获取焦点时，不让搜索结果显示，计算属性会重新进行计算，再搜索建议与搜索历史进行二选一
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.rearch {
  [role='button'] {
    color: #fff;
  }
}
</style>
