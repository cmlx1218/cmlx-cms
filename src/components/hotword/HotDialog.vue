<template>
  <div>
    <el-dialog :title="data[0].title" :visible.sync="data[0].isDisplay" :before-close="handleClose">
      <el-table
        :data="hotWords"
        style="width: 100%">
        <el-table-column
          prop="word"
          label="热词名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="count"
          label="动态数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="recentTime"
          label="最后活跃时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import api from 'network/common'

export default {
  name: "HotDialog",
  props: ['data'],
  data() {
    return {
      hotWords: '',
      dataInfo:[]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    }
  },
  created() {
    this.dataInfo = this.data
    api.getHotFeedWord().then(result => {
      this.hotWords = result.data.list
    })
  }
}
</script>

<style scoped>

</style>
