<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />

    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss 秒"
            @finish="isShowCode = true"
            v-else
          />
        </template>
      </van-field>
      <div class="logbtn">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules.js'
import { login, getCodeApi } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: 'true'
    }
  },
  methods: {
    loding() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // 如果表单校验不通过, 这个方法不会触发

      // q1: res是什么?
      //  - axios封装的对象, 她把服务端返回的数据放在res.data里

      // q2: res是什么?
      //  - Promise的resolve的值

      // q3: error是什么?
      //  - Promise reject的结果
      //  - axios封装的error
      //  - error.response.data是服务端返回的数据
      //  - error.response.status 是服务端返回的状态码

      try {
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        console.log(token)
        this.$store.commit('SET_TOKEN', token)
        this.loding()
        this.$router.push('/my')
        this.$toast.success('登录成功')
        // console.log(res)
      } catch (error) {
        // 细分失败
        const status = error.response.status
        let message = '请重新登陆'

        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 验证手机号，看vant文档 form绑定ref
      this.$refs.form.validate('mobile').then(async () => {
        this.loding()
        try {
          await getCodeApi(this.mobile)
          this.$toast.success('验证码发送成功')
          // 显示验证码
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.logbtn {
  margin: 16px;
}
.toutiao {
  font-size: 40px;
}
:deep(form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}

:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eee;
    color: a9929b;
  }
}
</style>
