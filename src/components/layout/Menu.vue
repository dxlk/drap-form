<template>
  <div style="height:100%;" class="jas-flex-box is-vertical menuwrapper">
    <div class="is-grown menusubwrap" :style="menuStyle" ref="menubar">
      <el-scrollbar
        :wrap-style="[{height:'calc( 100% + 17px )'}]"
        :view-style="[{height:'calc ( 100% + 17% )'}]"
        style="height: 100% "
      >
        <el-menu
          unique-opened
          :default-active="currentTap"
          class="el-menu-vertical-demo"
          @select="selectMenu"
          :collapse="!isExpend"
        >
          <menuItem :menus="items"></menuItem>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="switchwrapper" @click="isExpend=!isExpend">
      <i v-show="isExpend" class="fa fa-angle-left" aria-hidden="true"></i>
      <i v-show="!isExpend" class="fa fa-angle-right" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script lang="ts">
import menuItem from './MenuItem.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  components: {
    menuItem,
  },
  data() {
    return {
      items: [], //表示当前系统的菜单
      currentTap: '',
      isExpend: true,
      menuWith: 200,
      wrapStyle:{
        
      }
    }
  },
  computed: {
    menuStyle() {
      return {
        width: !this.isExpend ? '64px' : (this.menuWith || 200) + 'px',
      }
    },
  },
  setup() {
    const store = useStore()
    const currentAppId = computed(() => store.state.application.currentAppId)
    return {
      currentAppId,
    }
  },
  mounted() {
    let currentAppId = localStorage.getItem('currentAppId')
    var menu = JSON.parse(localStorage.getItem(currentAppId))
    console.log(menu)
    this.items = menu
    console.log(this.items)
  },
  methods: {
    selectMenu(index) {
      var obj = this._getMenuInfoByIndex(index, this.items)
      this.$emit('menuclick', index, obj)
    },
    _getMenuInfoByIndex(index, aMenu) {
      var _icon = ''
      var _menuName = ''
      var _closable = true
      var _link = ''
      var isGetResult = false
      var id = ''
      var getTitle = function (index, aMenu) {
        for (var i = 0; i < aMenu.length; i++) {
          var item = aMenu[i]
          if (item.subs) {
            //如果有子集递归处理
            if (!isGetResult) {
              _icon = item.icon
              _menuName = item.menuName
              getTitle(index, item.subs)
            }
          } else {
            if (index === item.index) {
              id = item.id
              isGetResult = true
              _icon = item.icon
              _menuName = item.menuName
              _link = item.attributes.URL
              _closable = item.closable !== false ? true : false
              return
            }
          }
        }
      }
      getTitle(index, aMenu)
      return {
        icon: _icon,
        menuName: _menuName,
        closable: _closable,
        link: _link || '',
        id: id,
      }
    },
    // _queryMenuData() {
    //   var that = this // 获取左侧菜单
    //   let _aMenu =
    //     this.$jasStorage.get('menus') &&
    //     JSON.parse(this.$jasStorage.get('menus'))
    //   if (typeof _aMenu === 'object' && _aMenu.length > 0) {
    //     that.items = that._formatMenus(_aMenu)
    //     if (!that.currentTap || that.currentTap == 0) {
    //       that.currentTap = that._getFirstMenuId(that.items)
    //       that.selectMenu(that.currentTap)
    //     }
    //   }
    //   return
    // },
    // _getFirstMenuId(items) {
    //   var obj = items[0]
    //   if (obj.subs && obj.subs.length > 0) {
    //     return this._getFirstMenuId(obj.subs)
    //   }
    //   return obj.id
    // },
    // _formatMenus(aMenu) {
    //   var _aMenu = JSON.parse(JSON.stringify(aMenu))
    //   var routerMenus = []
    //   var switcher = function (arr) {
    //     if (typeof arr === 'object') {
    //       arr.forEach(function (item) {
    //         item.index = item.id || ''
    //         item.icon = item.icon || '' //fa-bars fa-bookmark
    //         item.title = item.text
    //         if (!item.attributes) {
    //           item.attributes = {}
    //           item.attributes.URL =
    //             'jasmvvm/pages/module-jasdoc/doc-verify/doc-verify.html'
    //         }
    //         if (item.attributes && item.attributes.URL) {
    //           if (item.attributes.URL.indexOf('http') > -1) {
    //             item.link = item.attributes.URL
    //           } else {
    //           }
    //         }
    //         item.subs = item.children
    //         if (item.subs) {
    //           switcher(item.subs)
    //         }
    //       })
    //     }
    //   }
    //   switcher(_aMenu)
    //   this.routerMenus = routerMenus
    //   return _aMenu
    // },
  },
}
</script>

<style lang="scss">
.menuwrapper {
  border-right: solid 1px #e6e6e6;
  overflow: hidden;
}

.menusubwrap {
  transition: width 0.5s;
  overflow: auto;
  width: 200px;
}

.el-menu-vertical-demo.el-menu {
  overflow: hidden;
  border-right: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}

.switchwrapper {
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  height: 40px;
  box-sizing: border-box;
  border-top: solid 1px #e2e2e2;
  font-size: 16px;
  color: #333;
}

.el-menu {
  background: #fff;
}

.el-submenu__title {
  color: #333;
}

.el-menu-item {
  /* font-size: 12px; */
  color: #333;
}
.el-menu-item.is-active {
  color: #333;
}
.el-submenu__title:hover,
.el-submenu__title:focus {
  outline: none;
  background-color: rgb(224, 243, 255);
}

.el-menu .el-menu-item:hover {
  background: rgb(224, 243, 255);
}

.el-menu .el-menu-item.is-active {
  border-left: 3px solid rgb(124, 201, 253);
  background: rgb(224, 243, 255);
  /* color:#ececec */
}

.el-submenu__title i {
  color: #333;
}

.el-menu-item i {
  color: #333;
}
.el-menu-item.is-active i {
  color: #333;
}

.is-opened .el-menu-item {
  background: #fff;
}

.is-opened .el-menu {
  background: #222e3c;
}

.el-menu-item [class^='fa'] {
  margin-right: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 18px;
  vertical-align: middle;
}

.el-submenu [class^='fa'] {
  vertical-align: middle;
  margin-right: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 18px;
}

.el-scrollbar__wrap {
  height: calc(100% + 17px);
}

.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}
</style>