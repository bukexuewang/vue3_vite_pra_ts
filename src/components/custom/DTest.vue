<template>
  <div class="d-test">
    <div class="count_box">{{ mainStore.count }}</div>

    <div class="mul_count">{{ mainStore.countMul }}</div>

    <button @click="change">改变main数据</button>

    <button @click="asyncChange">请求</button>

    <n-button type="primary">测试ui按钮</n-button>

    <n-gradient-text type="success" @click="bodyColorChange"> 成了 </n-gradient-text>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store';
import { NButton, NGradientText } from 'naive-ui';

const mainStore = useMainStore();

const change = () => {
  mainStore.$patch({
    count: 12
  });
};

const randomArr = Array(10)
  .fill(0)
  .map((v, i) => v + i)
  .concat(['a', 'b', 'c', 'd', 'f']);

const getRgbVal = () => {
  const i = Math.floor(randomArr.length * Math.random());
  return randomArr[i];
};

const getRandomColor = () => {
  const val = Array(6).fill('').map(getRgbVal).join('');
  return '#' + val;
};

const isLight = (color: string) => {
  let i = 1;
  const res: number[] = [];
  while (i < color.length) {
    res.push(eval(`0x${color.substring(i, (i += 2))}`));
  }
  console.log(res);
  const grayLevel = res[0] + 0.299 + res[1] * 0.587 + res[2] * 0.114;
  return grayLevel >= 192;
};

const getStyleValue = (eleName: string, styleKey: string) => {
  return getComputedStyle(document.querySelector<HTMLElement>(eleName)!, null).getPropertyValue(styleKey);
};

const bodyColorChange = () => {
  const body = document.querySelector<HTMLElement>('body')!;
  // Reflect.set(, '--body-color', getRandomColor())
  const color = getRandomColor();
  console.log({ color, dark: isLight(color) });
  body.style.cssText = `--bg-color: ${color}; --font-color: ${isLight(color) ? '#000' : '#fff'}`;
  console.log({ style: getComputedStyle(body, null).getPropertyValue('--body-color') });
  setTimeout(() => {
    console.log({
      box: getStyleValue('.count_box', 'color'),
      mul: getStyleValue('.mul_count', 'color')
    });
  }, 300);
};

const asyncChange = () => {
  mainStore.countChange();
};
</script>

<style lang="scss" scoped>
.d-test {
  background-color: $bg-color;
  color: $font-color;
  .mul_count {
    @include font-color-level-1;
  }
  .count_box {
    @include font-color-level-2;
  }
}
</style>
