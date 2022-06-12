<script setup lang="ts">
import { LOGIN } from '@/router';
import { safeRegisterEvent } from '@/utils';
import { GET_COUNT } from './const';
import EventTest from './EventTest.vue';

const value = ref(new Set<number>([]));

const showIt = (index: number) => {
  value.value.add(index);
};

const valueText = computed(() => [...unref(value).values()].join(','));

const io = new IntersectionObserver(
  entries => {
    console.log(entries);
    entries.forEach(elEntry => {
      if (elEntry.isIntersecting) {
        const dataset: DOMStringMap = Reflect.get(elEntry.target, 'dataset');
        const index = +(dataset.index || 0);
        value.value.add(index);
      }
    });
  }
  // { root: document.querySelector('.scroll_wrapper'), rootMargin: '0 0 100px 0' }
);

onMounted(() => {
  const container = document.querySelector('.scroll_wrapper');
  if (container) {
    const eles = container.querySelectorAll('.hello-world');
    Array.from(eles).forEach(el => io.observe(el));
  }
});

// ---------------- 计数 ---------------------
const count = ref(0);

safeRegisterEvent(GET_COUNT, count);

const addCount = () => {
  count.value++;
};

const { push } = useRouter();
const toLogin = () => {
  push(LOGIN.path);
};
</script>

<template>
  <section class="dashboard">
    <div class="home_head">
      <div>这里是首页</div>
      <p>显示的index {{ valueText }}</p>
      <div>{{ count }}</div>
      <button @click="addCount">添加</button>
      <EventTest></EventTest>
      <button @click="toLogin">前往登录页</button>
    </div>
    <section class="scroll_wrapper">
      <hello-world v-for="i in 10" :key="i" :data-index="i" :index="i" @show="() => showIt(i)"></hello-world>
    </section>
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
.scroll_wrapper {
  height: 500px;
  overflow-y: auto;
}
</style>
