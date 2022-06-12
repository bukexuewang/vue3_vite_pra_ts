<script setup lang="ts">
import TitleVue from '@/components/custom/Title.vue';

// const {meta} = useRoute();
</script>

<template>
  <section class="layout">
    <header class="layout_header"><TitleVue type="large" title="这里是顶部"></TitleVue></header>
    <nav class="layout_nav">左边导航栏</nav>
    <main class="layout_main">
      <!-- <Keep-alive>
      <Router-view />
    </Keep-alive> -->
      <Router-view />
    </main>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  padding-top: 60px;
  padding-left: 190px;
  background-color: snow;
  .layout_header {
    position: fixed;
    left: 190px;
    top: 0;
    right: 0;
    min-width: 1000px;
    background-color: #fff;
    z-index: 9999;
  }

  .layout_nav {
    float: left;
    background-color: #fff;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
