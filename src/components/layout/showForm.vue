<template>
  <div style="padding:3vh;overflow:auto">
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
          <JasFormItem @btnclick="clickbtn" :formconfig-value="form" :form="form" :config="item">
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
</template>

<script>
import JasFormItem from '../base/JasFormItem.vue'
export default {
  name: 'ShowForm',
  props: {
    value: {},
    isdialog: {
      default: true,
    },
    id: {},
  },
  watch: {
    id() {
      this.get()
    },
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
  created() {},
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
<style lang="scss" >
</style>  