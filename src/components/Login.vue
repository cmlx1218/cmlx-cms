<template>
  <div>
    <div id="title"><a>CMLX 运营后台</a></div>
    <div id="login">
      <el-input class="login-item" v-model="userInfo.username" placeholder="用户名"></el-input>
      <el-input class="login-item" v-model="userInfo.password" placeholder="密码" show-password></el-input>
      <div class="login-item">
        <el-button type="primary" @click="loginBtn">登录</el-button>
        <el-button type="primary" @click="resetBtn">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import login from 'network/common'

export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginBtn() {
      let data = {
        grant_type: 'cmspassword',
        username: this.userInfo.username,
        code: this.userInfo.password,
      }
      login.login(data).then(result => {
          if (result.code === 200) {
            // 登录成功存储token,存储在sessionStorage,页面关闭时就清空该token值
            sessionStorage.setItem("Authorization", 'bearer ' + result.data.access_token)
            sessionStorage.setItem("token", result.data.access_token)
            this.$router.replace('/home')
            this.$message({
              message: '登录成功',
              duration: 1000,
              type: 'success'
            });
          } else {
            this.$message.error({
              message: '登录失败',
              duration: 1000
            });
          }
          // alert('账号密码不匹配')
        }
      ).catch(error => {
        this.$message.error({
          message: '服务器繁忙ing...',
          duration: 1000,
        });
      })
    },
    resetBtn() {
      this.username = '';
      this.code = ''
    }
  }
}
</script>

<style scoped>

#title {
  position: absolute;
  top: 25%;
  left: 45%;
}

#title > a {
  font-size: 30px;
}

#login {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 32%;
  left: 45.3%;
}

.login-item {
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
}

</style>
