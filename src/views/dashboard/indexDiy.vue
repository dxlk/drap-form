
<template>
  <!-- 表单设计主界面展示 -->
  <el-container style="height:100%;">
    <el-header style="padding:0px;height:auto">
      <HomeHeader type="formConfig" :title="menuName" />
    </el-header>
    <el-container style="height:100%" class="jas-flex-box is-vertical">
      <div class="jas_box_1">
        <router-view />
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import HomeHeader from '../../components/layout/HomeHeader.vue'
export default {
  name: 'dashboard',
  components: { HomeHeader },
  data() {
    return {
      menuName: '', //表示当前选中的是哪个菜单
    }
  },
  created() {
    this.menuName = JSON.parse(localStorage.getItem('menuInfo')).menuName
  },
  mounted() {},
  methods: {
    clickMenu(priCode, menuInfo) {
      this.menuName = menuInfo.menuName
      this.$router.push({
        path: '/indexDiy/form',
        query: { id: menuInfo.id },
      })
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
