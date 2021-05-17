<template>
  <div class="jas_box_1 jas_box_vertical card box_flow h0">
    <div class="flow_icon"></div>
    <div @click="startFlow()" class="flow_btn">发起流程</div>
  </div>
</template>
  <script>
import { ElMessage } from 'element-plus'
export default {
  name: 'FlowBox',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    startFlow() {
      ElMessage('该功能暂时未开放')
    },
  },
}
</script>
  <style lang='scss'>
.box_flow {
  padding: 3.8vh 4.4vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .flow_icon {
    flex: 1;
    background: url(../../assets/home/icon_flow.png) no-repeat center center;
    background-size: 8.6vh 8.6vh;
  }
  .flow_btn {
    cursor: pointer;
    text-align: center;
    height: 4.7vh;
    line-height: 4.7vh;
    background: rgb(88, 135, 251);
    opacity: 1;
    border-radius: 18px;
    color: rgb(255, 255, 255);
    font-size: 1.5vh;
  }
}
</style>
