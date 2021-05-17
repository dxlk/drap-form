<template>
  <div class="allwrap">
    <div v-if="!ischild" class="btnwrap" style="text-align:right;    justify-content: flex-end;">
      <div>
        <el-button size="mini" type="primary" @click="save">保存</el-button>
        <el-button size="mini" type="primary" @click="preview">预览</el-button>
      </div>
    </div>
    <div v-if="!ischild" class="line"></div>
    <div class="formDiy">
      <div class="leftbox">
        <div class="container">
          <div class="pl8">
            <JasBaseModuleTitle name="基础组件" />
          </div>
          <draggable
            class="dragArea list-group"
            v-model="typelist"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="createNewItem"
          >
            <template #item="{element}">
              <div class="list-group-item01" :key="element.value">
                <div class="item">{{ element.label }}</div>
              </div>
            </template>
          </draggable>
          <div v-if="!ischild">
            <div class="pl8">
              <JasBaseModuleTitle name="高级组件" />
            </div>
            <draggable
              class="dragArea list-group"
              v-model="prolist"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :clone="createNewItem"
            >
              <template #item="{element}">
                <div class="list-group-item01" :key="element.value">
                  <div class="item">{{ element.label }}</div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="centerbox">
        <div class="container">
          <el-form
            label-position="left"
            label-width="120px"
            style="width:100%;height:100%;overflow:auto;"
          >
            <draggable class="dragArea02 list-group" v-model="formitems" group="people">
              <template #item="{element}">
                <div class="list-group-item" :key="element.field+( '_'+ Math.random())">
                  <div class="item2wrap">
                    <div
                      class="item2"
                      @click="activeItem =element"
                      :class="activeItem == element ? 'active' : ''"
                    >
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                          <JasFormItem :formconfigValue="form" :isview="true" :config="element"></JasFormItem>
                        </el-col>
                      </el-row>
                      <div v-show="activeItem == element" class="item2tool">
                        <el-button
                          type="primary"
                          @click.stop="copyItem(element)"
                          size="mini"
                          icon="fa fa-clone"
                          plain
                          round
                        ></el-button>
                        <el-button
                          type="danger"
                          @click.stop="deleteItem(element)"
                          size="mini"
                          icon="fa fa-trash"
                          plain
                          round
                        ></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
          </el-form>
        </div>
      </div>
      <div class="rightbox" v-if="activeItem!=null">
        <div class="container rightcon">
          <el-tabs>
            <el-tab-pane label="属性配置" class="tabBox">
              <el-form :model="activeItem" label-position="left" label-width="100px">
                <el-col
                  v-for="item in formItemAttrsObj[activeItem.type]"
                  :key="item.field"
                  :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24"
                >
                  <JasFormItem :formconfigValue="activeItem" :config="item">
                    <div slot="formbtn" style="padding-top:10px;text-align:right;">
                      <el-button size="mini" type="primary" @click="subFormShow = true">子表单配置</el-button>
                    </div>
                  </JasFormItem>
                </el-col>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="!ischild" label="表单配置" class="tabBox">
              <el-form label-position="left" label-width="100px">
                <el-row :gutter="20">
                  <el-col
                    v-for="item in formformConfs"
                    :key="item.field"
                    :xs="24"
                    :sm="24"
                    :md="24"
                    :lg="24"
                    :xl="24"
                  >
                    <JasFormItem :formconfigValue="formform" :config="item"></JasFormItem>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <FormDialog v-model="outerVisible" :id="formform.formId" v-if="outerVisible"></FormDialog>

    <el-dialog
      title="子表单"
      :visible.sync="subFormShow"
      top="15vh"
      append-to-body
      v-if="subFormShow"
      width="80%"
      :center="true"
    >
      <div style="height: calc( 75vh - 150px ) ;">
        <FormDiy ref="childForm" :form-items="activeItem&&activeItem.formitems" :ischild="true" />
      </div>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="setChildFormAttr">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import JasFormItem from '../../components/base/JasFormItem.vue'
import FormDialog from '../../components/base/FormDialog.vue'
import formItemAttrsObj from './config/formItemAttrsObj'
import formItemTypesArr from './config/formItemTypesArr'
import JasBaseModuleTitle from '../../components/base/JasBaseModuleTitle.vue'

export default {
  name: 'FormDiy',
  components: {
    draggable,
    JasBaseModuleTitle,
    JasFormItem,
    FormDialog,
  },
  props: {},

  data() {
    return {
      ischild:false,
      form: {},
      outerVisible: false,
      subFormShow: false,
      activeItem: null, //表示当前选中的是哪一个，需要针对这个去修改
      idGlobal: 1,
      typelist: formItemTypesArr,
      prolist: [
        {
          label: '表单组',
          value: 'formarr',
        },
        {
          label: '按钮组',
          value: 'btnarr',
        },
        {
          label: '自定义插槽',
          value: 'slot',
        },
      ],
      formItemAttrsObj: formItemAttrsObj,
      formitems: [],
      formform: {},
      formformConfs: [
        {
          name: '列数',
          field: 'col',
          type: 'select',
          options: [
            { label: '单列', value: 1 },
            { label: '双列', value: 2 },
            { label: '三列', value: 3 },
            { label: '四列', value: 4 },
          ],
        },
        {
          name: '对话框宽度',
          field: 'width',
          type: 'input',
          defaultVal: '900px',
          placeholder: '例： 800px  或者  60% ',
        },
        {
          name: '对话框高度',
          field: 'height',
          type: 'input',
          placeholder: '例： 800px  或者  70vh ',
        },
        {
          name: '对话框上边距',
          field: 'top',
          type: 'input',
          defaultVal: '15vh',
          placeholder: '例： 100px  或者  15vh ',
        },
      ],
    }
  },
  mounted() {
    //此时需要通过菜单id和应用的id获取相关配置
    //this.$route.query.id  用来获取当前菜单的id 知道是为那个菜单进行配置的
    let currentMenuId = this.$route.query.id
    let currentAppId = localStorage.getItem('currentAppId') //当前的系统id
    let key = currentAppId + '-' + currentMenuId //用应用id和菜单id作为唯一值查看当前的配置。
    console.log(currentMenuId)
    console.log(currentAppId)
    console.log(key)
    if (currentMenuId && currentAppId && localStorage.getItem(key)) {
      let oForm = JSON.parse(localStorage.getItem(key) || {})
      this.formform = oForm.formform || this.formform
      this.formitems = oForm.formitems || this.formitems
      this.activeItem = this.formitems[0]
    }
  },
  methods: {
    setChildFormAttr() {
      this.activeItem.formitems = this.$refs.childForm.formitems
      this.subFormShow = false
    },
    save(isclose) {
      let currentMenuId = this.$route.query.id
      let currentAppId = localStorage.getItem('currentAppId') //当前的系统id
      let formId = currentAppId + '-' + currentMenuId //当前表单id  用于获取当前表单设计的相关配置
      let formList = JSON.parse(localStorage.getItem('formList') || '[]')
      if (formList.indexOf(formId) == -1) {
        //新表单
        formList.push(formId)
        localStorage.setItem('formList', JSON.stringify(formList))
        let menuInfo = JSON.parse(localStorage.getItem('menuInfo'))
        let menuList = JSON.parse(localStorage.getItem(currentAppId)) || []
        menuList.push(menuInfo)
        localStorage.setItem(currentAppId, JSON.stringify(menuList))
      } else {
        localStorage.removeItem(formId)
      }
      this.formform.formId = formId
      localStorage.setItem(
        formId,
        JSON.stringify({
          formform: this.formform,
          formitems: this.formitems,
        })
      ) //新增直接存储如果是修改的话，就先移除再进行存储
      console.log(
        JSON.stringify({
          formform: this.formform,
          formitems: this.formitems,
        })
      )
      isclose && this.$emit('save')
    },
    preview() {
      this.save(0)
      this.outerVisible = true
    },
    createNewItem(item) {
      let num = (Math.random() * 1000000).toFixed()
      let newItem = {
        name: item.label,
        type: item.value,
        field: 'field' + num,
        required: '0',
      }
      this.activeItem = newItem
      return newItem
    },
    copyItem(item) {
      let num = (Math.random() * 1000000).toFixed()
      let newItem = {
        ...JSON.parse(JSON.stringify(item)),
        field: 'field' + num,
      }
      let index = this.formitems.indexOf(item)
      this.formitems.splice(index + 1, 0, newItem)
      this.activeItem = newItem
    },
    deleteItem(item) {
      if (this.formitems.length == 1) {
        this.$message.error('无法删除最后一个')
        return
      }
      let index = this.formitems.indexOf(item)
      this.formitems.splice(index, 1)
      if (this.formitems.length > 0) {
        this.activeItem = this.formitems[index] || this.formitems[index - 1]
      } else {
        this.activeItem = null
      }
    },
  },
}
</script>

<style lang="scss">
.allwrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  .btnwrap {
    display: flex;
    flex-direction: row;
    padding: 10px;
  }
  .line {
    margin: 0 10px;
    border-bottom: 1px solid #ececec;
  }
}

.formDiy {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 0;
  .container {
    border-radius: 6px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }
  .leftbox {
    width: 150px;
    padding: 10px;
  }
  .centerbox {
    flex: 1;
    padding: 10px 0;
  }
  .rightbox {
    width: 350px;
    padding: 10px;

    .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: calc(100% - 50px);
        overflow: auto;
      }
      .tabBox {
        padding-right: 10px;
      }
    }

    .el-form-item {
      margin-bottom: 6px;
    }
    .rightcon {
      padding: 10px 0 10px 10px;
    }
  }
}

.pl8 {
  padding-left: 8px;
}
.dragArea02 {
  height: 100%;
}

.list-group-item01 {
  padding: 6px 6px 0 6px;
  .item {
    border-radius: 4px;
    background: #f4f6fc;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    cursor: move;
    &:hover {
      background: #e0f3ff;
    }
  }
}

.item2wrap {
  padding: 3px 6px;
  .item2 {
    line-height: 24px;
    border: 1px solid #ececec;
    // border-left: 1px solid #fff;
    padding: 6px;
    padding-left: 9px;
    cursor: move;
    overflow: hidden;
    position: relative;
    &:hover {
      background: #f3faff;
    }
    &.active {
      padding-left: 6px;
      background: #e0f3ff !important;
      border-left: 4px solid #7cc9fd;
    }
    .item2tool {
      height: 30px;
      width: 100px;
      position: absolute;
      z-index: 3;
      right: 10px;
      top: 12px;
    }
  }
}
</style>  