<script setup lang="ts">
const el = ref<HTMLElement>();

const obCallBack = (entries: Element[]) => {
  console.log(entries);
};

const ob = new IntersectionObserver(obCallBack);

onMounted(() => {
  ob.observe(unref(el));
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
