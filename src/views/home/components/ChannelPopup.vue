<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in MyChannellist"
        :key="item.id"
        :text="item.name"
        :class="['Mychannnel', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="我的频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recomment-item"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getALlChannels as ALlChannels } from '@/api'
export default {
  props: {
    MyChannellist: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      aLlChannelsList: []
    }
  },
  created() {
    this.getALlChannels()
  },
  methods: {
    async getALlChannels() {
      const { data } = await ALlChannels()
      this.aLlChannelsList = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
        // 删除我的频道
      } else {
        // 关闭弹窗
        // this.$emit('close')
        this.$parent.$parent.show = false
        // 切换tab状态
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.aLlChannelsList.filter(
        (aItem) => !this.MyChannellist.find((mItem) => aItem.id === mItem.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    border-color: red;
    color: red;
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recomment-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-icon) {
      font-size: 40px;
    }
  }
  :deep(.Mychannnel) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
