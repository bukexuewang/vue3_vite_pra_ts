<template>
  <div class="d-test">
    <div>{{ mainStore.count }}</div>

    <div>{{ mainStore.countMul }}</div>

    <button @click="change">改变main数据</button>

    <button @click="asyncChange">请求</button>

    <n-button type="primary">测试ui按钮</n-button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { NButton } from 'naive-ui'

const mainStore = useMainStore()

const change = () => {
  mainStore.$patch({
    count: 12,
  })
}

const asyncChange = () => {
  mainStore.countChange()
}
</script>

<style lang="scss" scoped></style>
