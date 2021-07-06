<template>
  <div>
    <HotHead :headList="headList"/>
    <div v-if="isDisplay">
      <hot-dialog :hotName="createHotName" :data="data"/>
    </div>
    <div style="width: 80%;margin: 50px auto 0 auto">
      <el-button type="primary" @click="btnCreateHotWord()">创建热门词</el-button>
      <el-table
        :data="words"
        style="width: 100%;
         padding-top: 10px"
        show-header>
        <el-table-column
          prop="rank"
          label="热词排名">
        </el-table-column>
        <el-table-column
          prop="word"
          label="词汇名称">
        </el-table-column>
        <el-table-column
          prop="count"
          label="动态数">
        </el-table-column>
        <el-table-column
          prop="creatorName"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="updateItem(scope.$index)">更换</el-button>
            <el-button type="text" style="color: red" @click="deleteItem(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import api from 'network/common'
import HotDialog from "./HotDialog";
import HotHead from "./HotHead";

export default {
  name: "HotWords",
  data() {
    return {
      isDisplay: false,
      words: [],
      data: [],
      headList: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '内容管理',
          path: '/home/hotWords'
        }, {
          name: '热词搜索',
          path: '/home/hotWords'
        }
      ],
      createHotName: '创建热门词'
    }
  },
  components: {
    HotDialog,
    HotHead
  },
  created() {
    api.getHotWordList().then(result => {
      if (result.code === 200) {
        this.words = result.data.list
      }
    })
  },
  methods: {
    deleteItem(index) {
      this.$confirm('确认删除该条热词吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.words.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    updateItem(index) {

    },
    btnCreateHotWord() {
      this.isDisplay = true
      this.data = [{
        isDisplay: this.isDisplay,
        title: '创建热门词'
      }]
    }

  }
}
</script>

<style scoped>
/deep/ .el-table th {
  color: black;
  background-color: #fafafa;
}
</style>
