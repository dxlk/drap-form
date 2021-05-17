<template>
  <div v-for="item in menus" :key="item.id">
    <el-submenu v-if="item.subs" :index="item.index">
      <template #title>
        <i :class="item.icon||'fa fa-folder' "></i>
        <span slot="title">{{ item.menuName }}</span>
      </template>
      <MenuItem :menus="item.subs"></MenuItem>
    </el-submenu>
    <el-menu-item :index="item.index" v-else>
      <i :class=" item.icon||'fa fa-folder' "></i>
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
  </div>
</template>
<script lang="ts">
export default {
  name: 'MenuItem',
  props: {
    menus: {
      default: () => [],
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {
    console.log(this.menus)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>