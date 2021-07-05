<template>
  <div>

    <el-container>
      <!--  左侧导航栏  -->
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo"
                 background-color="#001529"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <div class="login" style="height: 64px;background-color: #002140;">
            <div style="display: flex;align-items: center;margin: 0 auto;width: 200px;line-height: 64px">
              <img src="~assets/img/logo_120.png" alt="" style="width: 40px;height: 44px">
              <span style="color: white;font-size: 20px">IF健身运营后台</span>
            </div>
          </div>

          <!-- 课程管理 -->
          <el-submenu index="1">
            <template slot="title">
              <span style="margin-left: 20px">课程管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">动作库</el-menu-item>
              <el-menu-item index="1-2">组件库</el-menu-item>
              <el-menu-item index="1-3">课件库</el-menu-item>
              <el-menu-item index="1-4">训练标签</el-menu-item>
              <el-menu-item index="1-5">视频课</el-menu-item>
              <el-menu-item index="1-6">直播课</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 用户管理 -->
          <el-submenu index="2">
            <template slot="title">
              <span style="margin-left: 20px">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">APP用户管理</el-menu-item>
              <el-menu-item index="2-2">运营账号管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <!-- 内容管理 -->
          <el-submenu index="3">
            <template slot="title">
              <span style="margin-left: 20px">内容管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">动态管理</el-menu-item>
              <el-menu-item index="3-2">课程评论管理</el-menu-item>
              <el-menu-item index="3-3" @click="jumpPage('/home/hotWords')">热词搜索</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--举报反馈-->
          <el-submenu index="4">
            <template slot="title">
              <!--          <i class="el-icon-location"></i>-->
              <span style="margin-left: 20px">举报反馈</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">举报列表</el-menu-item>
              <el-menu-item index="4-2">反馈列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--   运营管理notice   -->
          <el-submenu index="6">
            <template slot="title">
              <!--          <i class="el-icon-location"></i>-->
              <span style="margin-left: 20px">运营管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">系统通知</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <!--版本管理-->
          <el-submenu index="5">
            <template slot="title">
              <!--          <i class="el-icon-location"></i>-->
              <span style="margin-left: 20px">版本管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">终端版本上传</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>


      <el-container>
        <!--  顶部banner  -->
        <el-header style="position:relative;">
          <div style="float: right;margin-right: 50px;display: flex;margin-top: 5px">
            <el-dropdown>
              <div class="tou">
                <img style="width: 50px;height: 50px;" :src="userInfo.avatarUri" alt="">
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的信息</el-dropdown-item>
                <el-dropdown-item @click.native="logoutBtn">退出登录</el-dropdown-item>
                <!--                <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <!--                <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
                <!--                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
            <span style="margin-left: 20px">{{ userInfo.actualName }}</span>

          </div>
        </el-header>

        <!--  中间内容展示  -->
        <el-main style="padding: 0">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>

import api from 'network/common'

export default {
  name: "Home",
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  methods: {
    logoutBtn() {
      let data = {
        token: sessionStorage.getItem('token')
      }
      api.logout(data).then(result => {
        if (result.data === true) {
          // 退出登录成功,清除sessionStorage里面的token
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('Authorization')
          this.$router.replace('/login')
        }
      })
    },
    jumpPage(url) {
      this.$router.push(url)
    }
  },
  created() {
    api.getOperatorInfo({
      url: '/cms/web/operator/getOperatorInfo',
    }).then(result => {
      sessionStorage.setItem('userInfo', JSON.stringify(result.data))
    })
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.12);
  color: #333;
  height: 64px !important;
  text-align: center;
  line-height: 60px;
  z-index: 999;
}

.el-aside {
  /*background-color: #D3DCE6;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 200px;*/

  width: 256px !important;
  /*height: 1099px;*/
  background-color: #001529;
  box-shadow: 2px 0px 6px rgba(0, 21, 41, 0.35);
  opacity: 1;
}

.el-main {
  /*background-color: #E9EEF3;*/
  background-color: white;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
}

.el-container {
  height: 100vh;
  /*margin-bottom: 40px;*/
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

html, body {
  padding: 0px;
  margin: 0px;
  height: 100vh;
}

.el-menu {
  border-right: solid 0px;
  padding: 0px !important;
}

.el-menu-item {
  /*opacity: 0.5;*/
  color: #f7f1f17d !important;
  background-color: black !important;
}

.el-menu-item.is-active {
  background-color: #1890FF !important;
  color: white !important;
}

.el-aside {
  z-index: 1000;
}

.tou {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden
}

.loginBox {
  position: absolute;
  right: 30px;
  top: 72px;
  width: 150px;
  height: 100px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  background-color: white;
  z-index: 1000;
  /*display: none;*/
}

.loginBox1 {
  position: absolute;
  left: 26px;
  top: -30px;
  width: 0;
  height: 0;
  border: 15px solid;
  border-color: transparent transparent white;
}

.loginBox2 {
  color: black;
  width: 150px;
  height: 50px;
  cursor: pointer;
  user-select: none;
  line-height: 50px;
  text-align: center;
}

.loginBox3 {
  color: black;
  width: 150px;
  height: 50px;
  cursor: pointer;
  user-select: none;
  line-height: 50px;
  text-align: center;
}

.loginBox2:hover {
  color: #1890ff;
}

.loginBox3:hover {
  color: #1890ff;
}

</style>
