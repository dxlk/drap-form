
<template>
  <div class="header">
    <div class="sys_logo" v-if="type=='home'||type=='CreateForm' ||type=='ShowForm'">
      {{title}}
      <el-dropdown @command="chooseSys" v-if="type=='appManager'">
        <span class="el-dropdown-link">
          {{appnCurrentName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu v-for="item in appList">
            <el-dropdown-item :command="item">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div @click="back" class="btn_back" v-if="type=='formConfig' "></div>
    <el-input v-if="type=='formConfig' " v-model="title" type="size" @blur="editMenu()"></el-input>
    <div class="header_set">
      <span
        v-for="item in config[type]"
        @click="item.funName(item)"
        :class="item.class"
      >{{item.btnName}}</span>
    </div>
  </div>
</template>
  <script lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'HomeHeader',
  props: {
    type: {
      default: 'home',
    },
    title: {
      default: '工作台',
    },
  },
  data() {
    return {
      config: {
        home: [
          {
            btnName: '自定义工作台',
            funName: this.btn,
            class: 'btn_sys',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_phone',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_help',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_user',
          },
        ],
        ShowForm: [
          {
            btnName: '进入应用管理',
            funName: this.btn,
            class: 'btn_sysManager',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_phone',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_help',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_user',
          },
        ],
        CreateForm: [
          {
            btnName: '进入应用系统',
            funName: this.btn,
            class: 'btn_sys',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_phone',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_help',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_user',
          },
        ],
        formConfig: [
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_phone',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_help',
          },
          {
            btnName: '',
            funName: this.btn,
            class: 'btn_user',
          },
        ],
      },
    }
  },
  watch: {},
  setup() {
    // getCurrentAppConfig
    // if (this.type != 'home') {
    const store = useStore()
    console.log(store)
    const appList = computed(() => store.state.application.appList)
    const appnCurrentName = computed(
      () => store.state.application.currentAppName
    )
    return {
      appList,
      appnCurrentName,
      setCurrent: (param) => store.commit('setCurrentApp', param),
    }
    // }
  },
  mounted() {},
  methods: {
    editMenu() {
      var menuInfo = JSON.parse(localStorage.getItem('menuInfo'))
      menuInfo.menuName = this.title
      localStorage.removeItem('menuInfo')
      localStorage.setItem('menuInfo', JSON.stringify(menuInfo))

      let currentAppId = localStorage.getItem('currentAppId')
      var menu = JSON.parse(localStorage.getItem(currentAppId))
      menu &&
        menu.forEach((item) => {
          if (item.id == menuInfo.id) {
            item.menuName = this.title
          }
        })
      //针对菜单进行修改
      localStorage.setItem(currentAppId, JSON.stringify(menu))
    },
    btn(param) {
      // ElMessage('这是一条消息提示' + param.class)
      if (param.class == 'btn_sysManager') {
        this.$router.replace({
          path: '/appManager',
          query: { type: 'CreateForm' },
        })
      }
      if (param.class == 'btn_sys') {
        this.$router.replace({
          path: '/appManager',
          query: { type: 'ShowForm' },
        })
      }
    },

    chooseSys(param) {
      this.$jasStorage.set('currentAppId', param.id)
      this.$router.go(0)
      this.setCurrent(param) //设置当前的
    },
    back() {
      this.$confirm('请确定是否保存该表单的设计?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {})
    },
  },
}
</script>
  <style lang='scss'>
.header {
  height: 5.6vh;
  line-height: 5.6vh;
  background: #fff;
  box-shadow: 0px 3px 10px rgba(125, 133, 148, 0.25);
  opacity: 1;
  padding: 0vh 1.2vh 0vh 2vh;
  display: flex;
  align-items: center;
  .sys_logo {
    font-size: 1.8vh;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #1f2d3d;
    opacity: 1;
    padding-left: 3.6vh;
    background: url(../../assets/home/logo.png) no-repeat center left;
    background-size: auto;
  }
  .header_set {
    margin-left: auto;
    display: flex;
    align-content: flex-end;
    align-items: center;
    vertical-align: middle;
    span {
      display: inline-block;
      margin-left: 2.2vh;
      cursor: pointer;
    }
    .btn_sys,
    .btn_sysManager {
      height: 3vh;
      line-height: 3vh;
      background: #f3f7ff;
      border: 1px solid #e1e8f6;
      opacity: 1;
      border-radius: 18px;
      font-size: 1.2vh;
      color: #5887fb;
      padding: 0px 1vh 0px 3vh;
      background: url(../../assets/home/icon_set_hover.png) no-repeat 1vh center;
      background-size: auto;
    }
    .btn_user {
      height: 3vh;
      width: 3vh;
      background: url(../../assets/home/icon_use.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .btn_help {
      width: 3vh;
      height: 3vh;
      background: url(../../assets/home/icon_help.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .btn_phone {
      height: 3vh;
      width: 3vh;
      background: url(../../assets/home/icon_phone.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .btn_back {
    height: 3vh;
    width: 3vh;
    background: url(../../assets/home/back.png) no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .el-input {
    width: 20vh;
  }
  .el-input__inner {
    border: none;
    border-bottom: 1px dotted #333;
  }
}
</style>

 
