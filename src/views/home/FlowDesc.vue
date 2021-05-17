<template>
  <div class="jas_box_1 flow_start jas_box_vertical">
    <div class="jas_box_1 jas_box_row jas_box_c">
      <div
        class="jas_box_1 flow_desc jas_box_vertical"
        :class="flowInfo.status=='1'?'':(flowInfo.status=='2'?'flow_desc2':'flow_desc3')"
      >
        <div class="flow_desc_title jas_box_1">{{flowInfo.desc}}</div>
        <div class="jas_box_1 flow_desc_num">
          {{flowInfo.num}}
          <span class="flow_desc_unit">个</span>
        </div>
      </div>
      <div class="fa fa-angle-right" style="color: #91A1B7;"></div>
    </div>
    <div class="jas_box_2" style="overflow:auto">
      <!-- 具体流程的显示 -->
      <div
        class="flow_desc_item"
        v-for="(item,index) in flowInfo.flowList"
        :style="index!=0?'margin-top:2.2vh':''"
      >
        <div class="flow_desc_item_title jas_box_row">
          <div class="jas_box_1">{{item.flowTitle}}</div>
          <div class="flow_desc_item_num">{{item.num}}个</div>
        </div>

        <VueProgress :value="item.num" :max="flowInfo.num" :high-color="item.highColor" />
        <!-- <el-slider v-model="item.num" :max="flowInfo.num"></el-slider> -->
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import VueProgress from '../../components/base/VueProgress.vue'
export default {
  name: 'FlowDesc',
  props: {
    config: {
      default: {},
    },
  },
  components: {
    VueProgress,
  },
  data() {
    return {
      flowInfo: {},
      value2: 10,
    }
  },
  created() {
    this.flowInfo = this.config
  },
  mounted() {},
  methods: {},
}
</script>
  <style lang='scss'>
.flow_start {
  padding: 2.8vh;
}
.flow_desc {
  padding-left: 9vh;
  background: url(../../assets/home/icon_start.png) no-repeat center left;
  background-size: 7.8vh 7.4vh;
}
.flow_desc2 {
  padding-left: 9vh;
  background: url(../../assets/home/icon_middle.png) no-repeat center left;
  background-size: 7.8vh 7.4vh;
}
.flow_desc3 {
  padding-left: 9vh;
  background: url(../../assets/home/icon_flowToMy.png) no-repeat center left;
  background-size: 7.8vh 7.4vh;
}
.flow_desc_title {
  color: #5e6d82;
  height: 4vh;
  line-height: 4vh;
  font-weight: 400;
  font-size: 1.8vh;
}
.flow_desc_num {
  font-size: 3.8vh;
}
.flow_desc_unit {
  color: #5e6d82;
  font-size: 1.8vh;
}
.flow_desc_item_title {
  height: 3vh;
  line-height: 3vh;
}
.flow_desc_item {
  background: #f3f7ff;
  opacity: 0.5;
  border-radius: 0.8vh;
  padding: 1.8vh;
}
</style>
