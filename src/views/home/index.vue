<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round class="search-btn" icon="search" @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in MyChannellist" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="showpopup"></span>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelPopup
        :MyChannellist="MyChannellist"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannelApi,
  delChannels,
  addChannels,
  setChanneltoLOcal,
  geyChanneltoLOcal
} from '@/api'
import ArticleList from '.././home/components/ArticleList.vue'
import ChannelPopup from '@/views/home/components/ChannelPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      MyChannellist: [],
      show: false
    }
  },
  components: {
    ArticleList,
    ChannelPopup
  },
  created() {
    this.initMyChannel()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    initMyChannel() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        const Mychannnels = geyChanneltoLOcal()
        if (Mychannnels) {
          this.MyChannellist = Mychannnels
        } else {
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const { data } = await getMyChannelApi()
        this.MyChannellist = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    showpopup() {
      this.show = true
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.MyChannellist.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannels(id)
        } else {
          setChanneltoLOcal(newChannels)
        }

        this.MyChannellist = newChannels
        // console.log(data)
        this.$toast.success('删除频道成功~')
      } catch (error) {
        this.$toast.fail('删除频道失败~')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannels(channel.id, this.MyChannellist.length)
        } else {
          setChanneltoLOcal([...this.MyChannellist, channel])
        }
        this.MyChannellist.push(channel)
        this.$toast.success('添加频道成功~')
      } catch {
        this.$toast.fail('添加频道失败~')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  position: sticky;
  top: 0px;
  left: 0px;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0px;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// .van-tab__pane {
//   // 符号的两侧必须由空格
//   min-height: calc(100vh - 92px - 88px - 100px);
// }
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
  padding-bottom: 100px;
}
</style>
