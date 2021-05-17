<template>
  <div class="jas_box_1 ApplicationBox jas_box_vertical">
    <div class="h37 jas_box_row">
      <div class="jas_box_1 application_title">
        全部应用
        <span class="fa fa-cog" style="color:#5E6D82"></span>
      </div>
      <div class="jas_box_1 jas_box_row" style="justify-content: flex-end;">
        <div class="search" style="margin-right:1.6vh">
          <el-input type="size" placeholder="搜索应用/工单" v-model="applicationName" clearable>
            <template #suffix>
              <i class="fa fa-search" @click="search()"></i>
            </template>
          </el-input>
        </div>
        <div class="add_application" @click="add()">+ 新建应用</div>
      </div>
    </div>
    <div class="jas_box_1 applicationList" style="padding:1.6vh 0vh">
      <div
        v-for="item in appList"
        style="width:18vh;height:14vh;margin:1.6vh;    cursor: pointer;"
        @mouseover="goInto(item)"
        @mouseleave="leave(item)"
        :class="item.isShow?'app_item_open':'app_item_close'"
      >
        <div class="jas_box_vertical jas_box_c app_item" @click="goApplication(item)">
          <div class="app_item_icon"></div>
          <div class="app_item_name">{{item.name}}</div>
        </div>
        <div class="app_item_footer jas_box_row" v-if="item.isShow">
          <div class="app_item_drag"></div>
          <div class="jas_box_1">
            <el-popover
              placement="right-end"
              :width="40"
              trigger="manual"
              v-model:visible="item.visible"
            >
              <div
                style="cursor: pointer;font-size:1.2vh;color:#333;text-align:center;border-bottom: 0.1vh solid #e2e2e2;"
              >
                <el-input size="small" v-model="item.name" @blur="editToServe(item)"></el-input>
              </div>
              <template #reference>
                <div class="app_item_edit" @click="edit(item)"></div>
              </template>
            </el-popover>
            <div class="app_item_setting" @click="deleteById(item)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
export default {
  name: 'ApplicationBox',
  data() {
    return {
      icon: '../../assets/home/icon_search.png',
      applicationName: '',
      appList: [],
    }
  },
  setup() {
    const store = useStore() // 获取store 实例
    const appList = computed(() => store.state.application.appList)
    return {
      appList,
      getAppList: () => store.commit('getAllAppList'),
      deleteById: (id) => store.commit('deleteById', id),
      editApp: (param) => store.commit('edit', param),
      addApp: (param) => store.commit('addApp', param),
      setCurrent: (param) => store.commit('setCurrentApp', param),
    }
  },
  created() {
    this.getAppList()
  },
  mounted() {},
  methods: {
    leave(item) {
      if (!item.visible) {
        item.isShow = false
        item.visible = false
      }
    },
    editToServe(item) {
      item.visible = false
      this.editApp(item)
    },
    deleteById(item) {
      this.$confirm('请确定是否删除该应用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteById(item.id)
        })
        .catch(() => {})
    },
    edit(item) {
      item.visible = true
    },
    add() {
      let newAppInfo = {
        id: new Date().getTime() + '',
        name: '未命名应用',
      }
      this.addApp(newAppInfo)
      this.setCurrent(newAppInfo)

      this.$router.push({
        path: '/appManager',
        query: { type: 'ShowForm' },
      })
    },
    search() {
      ElMessage('该功能暂时未开放')
    },
    goInto(item) {
      item.isShow = true
    },
    goApplication(item) {
      //默认初始化获取应用菜单的id如果有取本地 没有的话进行初始化一个根目录
      this.setCurrent(item)
      this.$router.push({
        path: '/appManager',
        query: { type: 'ShowForm' },
      })
    },
  },
}
</script>
  <style lang='scss'>
.ApplicationBox {
  padding: 2.2vh 3.8vh;
  .h37 {
    height: 3.7vh;
    line-height: 3.7vh;
  }
  .application_title {
    font-size: 2.2vh;
    font-family: Source Han Sans CN;
    font-weight: 500;
  }
  .add_application {
    height: 3.7vh;
    background: #44d27d;
    opacity: 1;
    border-radius: 18px;
    color: #fff;
    padding: 0vh 1.6vh;
    cursor: pointer;
  }
  .el-input__inner {
    background: #f4f6fa80;
    border-radius: 16px;
    border: none;
  }
}

.applicationList {
  display: flex;

  flex-wrap: wrap;
  .app_item_icon {
    height: 4.4vh;
    width: 4.4vh;
    background: url(../../assets/home/app_river.png) no-repeat center center;
    background-size: cover;
  }
  .app_item_name {
    height: 3.7vh;
    line-height: 3.7vh;
    color: #1f2d3d;
  }
  .app_item {
    padding-top: 3vh;
  }
  .app_item_open {
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(50, 127, 227, 0.25);
    opacity: 1;
    border-radius: 5px;
    .app_item {
      animation: myfirst 0.2s;
      -webkit-animation: myfirst 0.2s;
      animation-fill-mode: forwards;
      transition: all 0.2s ease-in;
    }
  }
  .app_item_footer {
    display: flex;
    height: 2.3vh;
    .app_item_drag {
      width: 2.2vh;
      height: 2.2vh;
      background: url(../../assets/home/icon_remove.png) no-repeat center center;
      background-size: 100% 100%;
      cursor: move;
    }
    .app_item_edit {
      float: right;
      width: 2.2vh;
      height: 2.2vh;
      background: url(../../assets/home/icon_edit.png) no-repeat center center;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .app_item_setting {
      float: right;
      width: 2.2vh;
      height: 2.2vh;
      background: url(../../assets/home/icon_set.png) no-repeat center center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .app_item_close {
    animation: myfirstclose 0.2s;
  }
  @-webkit-keyframes myfirstclose {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @-webkit-keyframes myfirst {
    0% {
      transform: translateY(-0px);
    }
    100% {
      transform: translateY(-10px);
    }
  }
}
</style>
