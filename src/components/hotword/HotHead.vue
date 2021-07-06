<template>
  <div class="hot-head">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,i) in headList" :to="item.path" :key="i">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "HotHead",
  props: ['headList'],
  data() {
    return {}
  }
}
</script>

<style scoped>
.hot-head {
  width: 100%;
  height: 100px;
  background-color: white;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 32px;
  border-bottom: 1px solid #d8cad6;
}
</style>
