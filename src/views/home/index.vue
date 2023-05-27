<script setup lang="ts">
  // ES6实现获取随机颜色的函数
  const getRandomColor = () => {
    // 生成RGB通道的随机值
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // 使用模板字符串拼接RGB值
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
  };

  const randomColor = ref('');
  const randomTimeOut = () => (Math.floor(Math.random() * 5) + 5) * 1000;

  let timer: NodeJS.Timeout | null = null;
  const obj = reactive({
    startTime: 0,
    duration: 0,
    endTime: 0,
    diffDuration: 0,
  });
  const startGame = () => {
    obj.diffDuration = 0;
    obj.startTime = +new Date();
    obj.duration = randomTimeOut();
    timer = setTimeout(() => {
      randomColor.value = getRandomColor();
      timer = null;
    }, obj.duration);
  };

  const endGame = () => {
    obj.endTime = +new Date();
    obj.diffDuration = Math.floor(obj.endTime - obj.startTime - obj.duration);
    randomColor.value = '';
    if (timer) clearTimeout(timer);
  };
</script>

<template>
  <div class="home">
    <div class="tip text-center">你的反应速度是{{ obj.diffDuration }}ms</div>
    <div class="box" :style="{ backgroundColor: randomColor }" @click="endGame"></div>
    <button @click="startGame">点击开始</button>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    border: 1px solid #fff;
  }
</style>
