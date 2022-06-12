<script setup lang="ts">
import { throttle } from 'lodash-es';

const el = ref<HTMLElement>();
const elGap = ref('0px');
const rowCount = ref(5);

const CARD_W = 40 + 16 + 16;
const windowResizeFn = throttle(() => {
  console.log(111);
  const { width = 100 } = el.value?.getBoundingClientRect() ?? {};
  rowCount.value = Math.floor(width / CARD_W);
  const restW = Math.floor(width % CARD_W);
  elGap.value = `${Math.floor(restW / (unref(rowCount) - 1))}px`;
}, 300);

onMounted(() => {
  windowResizeFn();
  window.addEventListener('resize', windowResizeFn);
});

onMounted(() => {
  window.removeEventListener('resize', windowResizeFn);
});
</script>

<template>
  <div class="other">
    <section ref="el" class="area">
      <div v-for="i in 20" :key="i" class="area_card"></div>
    </section>
    <div style="flex: 1">111</div>
  </div>
</template>

<style lang="scss" scoped>
.other {
  display: flex;
}
.area {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: v-bind(elGap);
  .area_card {
    width: 40px;
    height: 40px;
    margin: 16px;
    background-color: pink;
  }
}
</style>
