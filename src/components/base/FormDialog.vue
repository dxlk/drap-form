<template>
  <el-dialog
    v-if="isdialog"
    :width="formform.width"
    :top="formform.top"
    append-to-body
    :visible.sync="visible"
  >
    <div>
      <el-form :model="form" label-position="right" label-width="100px" style="overflow:hidden;">
        <el-row :gutter="20">
          <el-col
            v-for="item in formitems"
            :key="item.field"
            :xs="colNum(item)"
            :sm="colNum(item)"
            :md="colNum(item)"
            :lg="colNum(item)"
            :xl="colNum(item)"
          >
            <JasFormItem @btnclick="clickbtn" :formconfigValue="form" :form="form" :config="item">
              <div slot="test">这是测试自定义插槽的功能</div>
            </JasFormItem>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" v-if="formform.buttonNames" class="dialog-footer">
      <el-button
        v-for="btn in formform.buttonNames.split('、')"
        :type="btn == '取消'?'' :'primary'"
        size="small"
        :key="btn"
        @click="visible = false"
      >{{btn}}</el-button>
    </div>
  </el-dialog>
  <div v-else>
    <el-form :model="form" label-position="right" label-width="100px" style="overflow:hidden;">
      <el-row :gutter="20">
        <el-col
          v-for="item in formitems"
          :key="item.field"
          :xs="colNum(item)"
          :sm="colNum(item)"
          :md="colNum(item)"
          :lg="colNum(item)"
          :xl="colNum(item)"
        >
          <JasFormItem @btnclick="clickbtn" v-model="form[item.field]" :form="form" :config="item">
            <div slot="test">这是测试自定义插槽的功能</div>
          </JasFormItem>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import JasFormItem from './JasFormItem.vue'
export default {
  name: 'FormDialog',
  props: {
    value: {},
    isdialog: {
      default: true,
    },
    id: {},
  },
  components: {
    JasFormItem,
  },
  computed: {},
  data() {
    return {
      form: {},
      formitems: [],
      formform: {},
    }
  },
  created() {
    this.get()
  },
  methods: {
    clickbtn(btn) {
      console.log(btn.id)
      if (btn.id == 'back') {
        this.visible = false
      }
      this.$emit('clickbtn', btn)
    },
    get() {
      if (this.id && localStorage.getItem(this.id)) {
        let oForm = JSON.parse(localStorage.getItem(this.id) || {})
        this.formitems = oForm.formitems
        this.formform = oForm.formform
        console.log(this.formform)
      }
    },
    colNum(item) {
      if (item.widthRate) {
        return 24 * item.widthRate
      }
      if (item.type == 'moduletitle') return 24
      if (item.type == 'grouptitle') return 24
      return 24 / this.formform.col
    },
  },
}
</script>

<style lang="scss" scoped>
</style>  