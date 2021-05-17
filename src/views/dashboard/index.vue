<template>
  <!-- 系统展示主界面，是否需要创建 -->
  <el-container style="height:100%;">
    <el-header style="padding:0px;height:auto">
      <HomeHeader :type="currentComponent" />
    </el-header>
    <el-container style="height: 0%;">
      <el-aside id="aside" style="background-color: #fff;width:auto;">
        <Menu @menuclick="clickMenu" />
      </el-aside>
      <el-main style="padding:0px;">
        <el-container style="height:100%" class="jas-flex-box is-vertical">
          <component v-bind:is="currentComponent" :id="formId"></component>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import HomeHeader from '../../components/layout/HomeHeader.vue'
import Menu from '../../components/layout/Menu.vue'
import MainHeader from '../../components/layout/MainHeader.vue'
import CreateForm from '../../components/layout/createForm.vue'
import ShowForm from '../../components/layout/showForm.vue'
export default {
  name: 'dashboard',
  components: { HomeHeader, Menu, MainHeader, CreateForm, ShowForm },
  data() {
    return {
      menuName: '', //表示当前选中的是哪个菜单
      currentComponent: 'ShowForm',
      formId: '', //当前选中的菜单id
    }
  },
  created() {
    this.currentComponent = this.$route.query.type
  },
  watch: {
    $route(to, from) {
      // 获取query中的参数
      if (to.query.type) {
        this.currentComponent = to.query.type
        //  let currentMenuId = this.$route.query.id
      }
    },
  },
  mounted() {},
  methods: {
    clickMenu(index, menuInfo) {
      this.menuName = menuInfo.menuName
      localStorage.setItem('menuInfo', JSON.stringify(menuInfo))
      if (this.currentComponent == 'CreateForm') {
        this.$router.push({
          path: '/indexDiy/form',
          query: { id: menuInfo.id },
        })
      }
      if (this.currentComponent == 'ShowForm') {
        let currentMenuId = menuInfo.id
        let currentAppId = localStorage.getItem('currentAppId') //当前的系统id
        this.formId = currentAppId + '-' + currentMenuId //当前表单id  用于获取当前表单设计的相关配置
      }
    },
  },
}
</script>
<style lang='scss'>
.el-aside {
  border-right: 0.1vh solid #e2e2e2;
  border-top: 0.2vh solid #e2e2e2;
}
</style>
