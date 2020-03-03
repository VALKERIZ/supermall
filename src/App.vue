<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
  import MainTabbar from './components/content/mainTabbar/MainTabBar.vue'
  export default {
    name: 'app',
    components: {
      MainTabbar
    }
  }
</script>

<style scoped>
  @import "./assets/css/base.css";
</style>
