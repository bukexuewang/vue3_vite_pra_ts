<script setup lang="ts">
const count = ref(0);
</script>

<template>
  <div class="login">这里是登录页面</div>
  <button @click="count++">count的值是 {{ count }}</button>
</template>

<style lang="scss" scoped></style>
