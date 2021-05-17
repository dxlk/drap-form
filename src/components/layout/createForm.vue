<template>
  <div class="createForm">
    <div class="formBox" @click="addMenu">
      <div class="form_icon"></div>
      <div style="text-align:center;hegiht:3.7vh;line-height:3.7vh;font-size:1.6vh">新建表单</div>
    </div>
  </div>
</template>
  <script lang="ts">
export default {
  name: 'createForm',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    addMenu() {
      const time = new Date().getTime()
      let menuInfo = {
        id: 'id' + time,
        menuCode: 'F' + time,
        menuName: '未命名菜单',
        index: 'pri' + time,
        icon: '',
        attributes: {
          URL: '',
          param: {},
        },
      }
      localStorage.setItem('menuInfo', JSON.stringify(menuInfo))
      this.$router.push({
        path: '/indexDiy/form',
        query: { id: menuInfo.id },
      })
    },
  },
}
</script>
  <style lang='scss'>
.createForm {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  .formBox {
    width: 18vh;
    box-sizing: border-box;
    margin: 4vh;
    height: 20vh;
    cursor: pointer;
    background: #f8faf9;
    .form_icon {
      width: 6vh;
      height: 8vh;
      background: url(../../assets/home/form.png) no-repeat center center;
      background-size: cover;
      margin: 3vh auto 0vh;
    }
  }
}
</style>
