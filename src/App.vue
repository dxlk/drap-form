<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>
<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
html,
body {
  padding-right: 0 !important;
  height: 100%;
  width: 100%;
  min-width: 1366px;
  min-height: 768px;
  overflow: hidden;
}

.app {
  padding-right: 0 !important;
  height: 100%;
  width: 100%;
  min-width: 1366px;
  min-height: 768px;
  overflow: auto;
}
</style>
