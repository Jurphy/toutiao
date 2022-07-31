<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">登陆后</div>
      <div class="logout" v-else>未登录</div>
    </header>
    <!-- 中间 -->
    <main>收藏/历史</main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // 清除token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
