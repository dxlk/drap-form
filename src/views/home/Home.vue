<template>
  <div class="home">
    <HomeHeader type="home" />
    <div class="home_box">
      <div class="jas_box_1 jas_box_vertical mar16">
        <FlowBox />
        <div class="jas_box_3 maT16 jas_box_row h0">
          <UndoList />
        </div>
      </div>
      <div class="jas_box_3 jas_box_vertical">
        <div class="jas_box_1 jas_box_row">
          <div
            class="jas_box_1 jas_box_row card"
            v-for="(item,index) in flowDescList"
            :class="index==1?'maL16 mar16':''"
          >
            <!-- 每个卡片里面的内容 -->
            <FlowDesc :config="item" />
          </div>
        </div>
        <div class="jas_box_1 jas_box_row maT16 card">
          <ApplicationBox />
        </div>
      </div>
    </div>
  </div>
</template>
  <script lang="ts">
import HomeHeader from '../../components/layout/HomeHeader.vue'
import FlowBox from './FlowBox.vue'
import UndoList from './UndoList.vue'
import FlowDesc from './FlowDesc.vue'
import ApplicationBox from './ApplicationBox.vue'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    FlowBox,
    UndoList,
    FlowDesc,
    ApplicationBox,
  },
  data() {
    return {
      flowDescList: [
        {
          desc: '我发起的',
          status: '1',
          num: 18,
          flowList: [
            {
              flowTitle: '采购申请',
              num: 3,
            },
            {
              flowTitle: '订单管理',
              num: 2,
            },
          ],
        },
        {
          desc: '我处理的',
          status: '2',
          num: 56,
          flowList: [
            {
              flowTitle: '采购申请',
              num: 39,
            },
            {
              flowTitle: '订单管理',
              num: 17,
            },
          ],
        },
        {
          desc: '抄送我的',
          status: '3',
          num: 6,
          flowList: [
            {
              flowTitle: '采购申请',
              num: 2,
            },
            {
              flowTitle: '订单管理',
              num: 4,
            },
          ],
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
  <style lang='scss'>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  background: #f4f6fa;
  flex-direction: column;
  .home_box {
    flex: 1;
    opacity: 1;
    padding: 2.8vh 13vh;
    display: flex;
    box-sizing: border-box;
  }
}
</style>
