<script setup>
const list = Array(100)
  .fill(0)
  .map((_, index) => `item ${index}`);

const refWrapDom = ref();
let resizeObserver;

const handleClick = () => {
  const el = document.querySelector('.scroll_item');
  el.innerHTML = el.innerHTML + `<div>123</div>`;
  // elList.forEach((el) => {
  //   el.style.height = el.scrollHeight + 10 + 'px';
  // });
};

onMounted(() => {
  resizeObserver = new MutationObserver((entries) => {
    console.log('resizeObserver', entries);
  });

  const config = { attributes: true, childList: true, subtree: true };
  resizeObserver.observe(unref(refWrapDom), config);
});
</script>

<template>
  <div class="other">
    <button @click="handleClick">点击</button>
    <ul ref="refWrapDom" class="scroll_wrap">
      <li v-for="item in list" :key="item" class="scroll_item">{{ item }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.scroll_wrap {
  height: 500px;
  overflow-y: auto;
  border: 1px solid;
}
</style>
