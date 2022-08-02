<template>
  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <!-- 一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 三种图片 -->
  <van-cell v-else :title="articleInfo.title" :label="label">
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="100"
      height="100"
      :src="item"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      return `${this.articleInfo.aut_name} ${this.articleInfo.comm_count}评论  ${this.articleInfo.pubdate}`
    }
  }
}
</script>

<style></style>
