<template>
  <div class="MainHeader">
    <div class="jas_box_1">
      <span class="fa fa-angle-double-right"></span>
      {{menuName}}
    </div>
    <div v-if="isFull" class="fullpage">全屏</div>
  </div>
</template>
  <script>
export default {
  name: 'MainHeader',
  props: {
    menuName: {
      type: String,
      default: '',
    },
    isFull: {
      default: false,
    },
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
  <style lang='scss'>
.MainHeader {
  height: 4vh;
  line-height: 4vh;
  display: flex;
  color: #333;
  font-size: 1.3vh; //相当于16px
  .jas_box_1 {
    padding-left: 1.8vh;
    span {
      padding: 0.5vh;
      text-align: center;
      background: #eaf5ff;
      color: #3f80ae;
      font-size: 1.5vh;
    }
  }
  border-bottom: 1px solid #e2e2e2;
}
</style>
