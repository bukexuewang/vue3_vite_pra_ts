<script setup lang="ts">
const el = ref<HTMLElement>();

defineProps<{ index: number }>();

const emit = defineEmits<{
  (event: 'show'): void;
}>();

const obCallBack: IntersectionObserverCallback = entries => {
  const ele = entries[0];
  if (ele) {
    const { isIntersecting } = ele;
    if (isIntersecting) {
      emit('show');
    }
  }
};

const ob = new IntersectionObserver(obCallBack);

onMounted(() => {
  ob.observe(unref(el)!);
});
</script>

<template>
  <div ref="el" class="hello-world">这个是测试是否在页面的组件</div>
</template>

<style lang="scss" scoped>
.hello-world {
  width: 300px;
  height: 300px;
  color: skyblue;
}
</style>
