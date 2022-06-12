<script lang="ts">
import { CSSProperties } from 'vue';

export type TitleType = 'small' | 'large';
</script>

<script setup lang="ts">
interface Props {
  type: TitleType;
  title: string;
}

const props = defineProps<Props>();

// large 样式
const largeStyle: CSSProperties = {
  fontSize: '2em',
  color: 'red',
};

// small 样式
const smallStyle: CSSProperties = {
  fontSize: '0.5em',
  color: 'green',
};

// 样式 Mapper
const styleMapper: Record<TitleType, CSSProperties> = {
  small: smallStyle,
  large: largeStyle,
};

const styles = computed(() => styleMapper[props.type]);

const count = ref(0);

const add = () => count.value++;
</script>

<template>
  <section class="title">
    <div :style="styles">{{ title }}</div>
    <button @click="add">添加</button>
    <p>{{ count }}</p>
  </section>
</template>

<style lang="scss" scoped></style>
