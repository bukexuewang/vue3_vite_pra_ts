<script setup lang="ts">
import { getRegisterEvent } from '@/utils';
import { GET_COUNT } from './const';

const subCount = () => {
  const count = getRegisterEvent(GET_COUNT);
  if (count) {
    count.value--;
  }
};
</script>

<template>
  <div class="">
    <button @click="subCount">计数递减</button>
  </div>
</template>

<style lang="scss" scoped></style>
