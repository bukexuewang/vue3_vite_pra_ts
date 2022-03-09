<template>
  <div class="d-test">
    <div class="count_box">{{ mainStore.count }}</div>

    <div>{{ mainStore.countMul }}</div>

    <button @click="change">改变main数据</button>

    <button @click="asyncChange">请求</button>

    <n-button type="primary">测试ui按钮</n-button>

    <n-gradient-text type="success" @click="bodyColorChange"> 成了 </n-gradient-text>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main'
import { NButton, NGradientText } from 'naive-ui'

const mainStore = useMainStore()

const change = () => {
  mainStore.$patch({
    count: 12,
  })
}

const randomArr = Array(10)
  .fill(0)
  .map((v, i) => v + i)
  .concat(['a', 'b', 'c', 'd', 'f'])

const getRgbVal = () => {
  const i = Math.floor(randomArr.length * Math.random())
  return randomArr[i]
}

const getColor = () => {
  const val = `#${Array(6).fill('').map(getRgbVal).join('')}`
  console.log(val)
  return val
}

const bodyColorChange = () => {
  const body = document.querySelector<HTMLElement>('body')!
  // Reflect.set(, '--body-color', getColor())
  body.style.cssText = `--body-color:  ${getColor()}`
}

const asyncChange = () => {
  mainStore.countChange()
}
</script>

<style lang="scss" scoped>
.count_box {
  background-color: $test-color;
}
</style>
