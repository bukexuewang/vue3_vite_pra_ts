<script setup lang="ts">
import { LOGIN } from '@/router';
import { safeRegisterEvent } from '@/utils';
import { GET_COUNT } from './const';
import EventTest from './EventTest.vue';

const value = ref(new Set<number>([]));

const showIt = (index: number) => {
  value.value.add(index);
};
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
      <div>{{ count }}</div>
      <button @click="addCount">添加</button>
      <EventTest></EventTest>
      <button @click="toLogin">前往登录页</button>
    </div>
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
