<template>
  <div class="card jas_box_1 pad_all_32 jas_box_vertical">
    <div class="undo_title jas_box_row">
      <div class="title">
        待办事项
        <span>({{num}})</span>
      </div>
      <div class="jas_box_1 undo_mor">
        查看全部
        <span @click="showMorList" class="fa fa-angle-right"></span>
      </div>
    </div>
    <div class="jas_box_1" style="overflow:auto">
      <div class="undo_list maT16" v-for="item in undoList">
        <div
          class="undo_status"
          :style="item.status=='1'?'':(item.status=='2'?'background: #FF5151':'background: #F5F5F5;color: #BDBDBD;')"
        >{{item.statusName}}</div>
        <div class="jas_box_row jas_box_c" style="padding-right:1.6vh">
          <div class="jas_box_1">
            <div class="undo_item_title ellipsis">{{item.title}}</div>
            <div class="undo_item_desc ellipsis jas_box_row jas_box_c">
              <div>{{item.approvePeople}}</div>
              <div class="border"></div>
              <div class="jas_box_1">{{item.approveDate}}</div>
            </div>
          </div>
          <div class="fa fa-angle-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { ElMessage } from 'element-plus'
export default {
  name: 'UndoList',
  data() {
    return {
      num: 2,
      undoList: [
        {
          status: '1',
          statusName: '审批中',
          title: '采购申请CG20210420-02',
          approvePeople: '李景双',
          approveDate: '2021-03-21 14:30',
        },
        {
          status: '1',
          statusName: '审批中',
          title: '采购申请CG20210420-02',
          approvePeople: '李景双',
          approveDate: '2021-03-21 14:30',
        },
        {
          status: '2',
          statusName: '驳回',
          title: '采购申请CG20210420-02',
          approvePeople: '李景双',
          approveDate: '2021-03-21 14:30',
        },
        {
          status: '3',
          statusName: '已完成',
          title: '采购申请CG20210420-02',
          approvePeople: '李景双',
          approveDate: '2021-03-21 14:30',
        },
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    showMorList() {
      ElMessage('该功能暂时未开放')
    },
  },
}
</script>
  <style lang='scss'>
.pad_all_32 {
  padding: 1vh 2.8vh 2.8vh 2.8vh;
}
.undo_title {
  height: 5.6vh;
  line-height: 5.6vh;
  font-weight: 500;
  font-size: 2.2vh;
}
.undo_mor {
  text-align: right;
  font-size: 1.2vh;
  color: #91a1b7;
  cursor: pointer;
}
.undo_list {
  background: #ffffff;
  border: 1px solid #91a1b74d;
  border-radius: 6px;
  position: relative;
  padding: 1.6vh 0vh 1.6vh 1.6vh;
  .undo_status {
    position: absolute;
    right: 0px;
    top: 0.5vh;
    color: #fff;
    width: fit-content;
    padding: 0vh 0.6vh;
    height: 1.8vh;
    line-height: 1.8v;
    background: #5887fb;
    text-align: right;
    font-size: 1.2vh;
    opacity: 1;
    border-radius: 14px 0px 0px 14px;
  }
  .undo_item_title {
    height: 3vh;
    color: #1f2d3d;
    font-size: 1.6vh;
    line-height: 3vh;
  }
  .undo_item_desc {
    font-size: 1.5vh;
    height: 3vh;
    line-height: 3vh;
  }
  .jas_box_c {
    align-items: center;
    color: #91a1b7;
  }
  .border {
    width: 0.1vh;
    height: 2vh;
    background: #e0e0e0;
    margin: 0px 0.6vh;
  }
}
</style>
