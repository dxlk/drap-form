<template>
  <div class="VueProgress">
    <div class="progress">
      <div class="progress_value" :style="getValue"></div>
    </div>
  </div>
</template>
  <script>
export default {
  name: 'VueProgress',
  props: {
    value: {
      default: 0,
    },
    max: {
      default: 100,
    },
    highColor: {
      default: '#00A7FC',
    },
  },
  computed: {
    getValue() {
      return {
        width: parseInt((this.value / this.max) * 100) + '%',
        background:
          parseInt((this.value / this.max) * 100) < 30
            ? '#44D27D'
            : parseInt((this.value / this.max) * 100) < 60 &&
              parseInt((this.value / this.max) * 100) > 30
            ? '#00A7FC'
            : '#FFC000',
      }
    },
  },
  data() {
    return {
      num: 0,
    }
  },
  created() {
    this.num = parseInt(this.value / this.max)
  },
  mounted() {},
  methods: {},
}
</script>
  <style lang='scss'>
.VueProgress {
  width: 100%;
  margin: 1.6vh 0vh;
}
.progress {
  width: 100%;
  height: 0.6vh;
  background: #e1e8f6;
  border-radius: 0.3vh;
  position: relative;
}
.progress_value {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50%;
  height: 0.6vh;
  border-radius: 0.3vh;
  background: #00a7fc;
}
</style>
