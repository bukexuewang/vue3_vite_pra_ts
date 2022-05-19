<script setup lang="ts"></script>

<template>
  <section class="dashboard">
    <div>这里是首页</div>
    div
    <hello-world v-for="i in 10" :key="i"></hello-world>
  </section>
</template>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  background-color: pink;
}
</style>
