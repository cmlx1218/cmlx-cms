<template>
  <div>
    <el-table
      :data="words"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import api from 'network/common'

export default {
  name: "HotWords",
  data() {
    return {
      words: []
    }
  },
  created() {
    api.getHotWordList().then(result => {
      console.log(result)
      if (result.code === 200) {
        this.words = result.data.list
      }
    })
  }
}
</script>

<style scoped>

</style>
