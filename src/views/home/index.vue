<script setup lang="ts">
const value = ref(new Set<number>([]));

const showIt = (index: number) => {
  value.value.add(index);
};

const showValueText = computed(() => [...unref(value).values()].join(','));
</script>

<template>
  <section class="dashboard">
    <div class="home_head">
      <div>这里是首页</div>
      <div>{{ showValueText }}</div>
    </div>

    <n-button size="small">small 按钮</n-button>

    <icon-custom-no1 style="width: 30px; height: 30px" />
    <hello-world v-for="i in 10" :key="i" :index="i" @show="() => showIt(i)"></hello-world>
  </section>
</template>

<style lang="scss" scoped>
.dashboard {
  min-height: 100%;
}
.home_head {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>
