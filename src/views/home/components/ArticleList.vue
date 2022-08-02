<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      success-text="刷新成功"
      @refresh="loadNestPageArticls"
    >
      <van-list
        v-model="loading"
        @load="loadNestPageArticls"
        :immediate-check="false"
        offset="0"
        :finished="isFinished"
        :error.sync="error"
        error-text="加载文章失败，请点击重新加载"
        finished-text="没有更多文章了"
      >
        <AriticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></AriticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleApi } from '@/api'
import AriticleItem from '@/components/AriticleItem.vue'
export default {
  components: {
    AriticleItem
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      pre_timestamp: '',
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstArticle()
  },
  methods: {
    async getFirstArticle() {
      try {
        const { data } = await getArticleApi(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
        console.log(this.pre_timestamp)
      } catch (error) {
        this.$toast.fail('请刷新重试')
      }
    },
    async loadNestPageArticls() {
      try {
        // 发送请求
        const { data } = await getArticleApi(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        // 判断是否完成加载
        if (timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          // 存储数据
          this.articles.unshift(...results)
        } else {
          // 存储数据
          this.articles.push(...results)
        }

        // 更新时间戳
        this.pre_timestamp = timestamp
        console.log(this.pre_timestamp)
      } catch (error) {
        this.error = true
      } finally {
        // 加载下一页
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
