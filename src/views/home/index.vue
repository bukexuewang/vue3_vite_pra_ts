<script setup>
import { setCookie } from '@/utils';
import { useOnMessage } from '@/hooks/useOnMessage';

const ids = ref([1, 2]);

const idsPush = () => {
  console.log(111);
  ids.value.push(ids.value.length + 1);
};

const router = useRouter();
const goOther = () => {
  router.push('/other');
};

watch(
  () => ids.value,
  (val, oVal) => {
    console.log(val, oVal);
  },
  { deep: true }
);

const { onMessage, elFrame, refChatIframe } = useOnMessage();

const assetImg = 'https://img.forexchat.com/e3725d/bcae05/e68ba1eb-e4ec-481d-a982-e1fd5e4758a6.gif?v=47451041839528174';
const imgs = [
  'https://img.forexchat.com/e3725d/cf0904/4fb1706ce290451193067fcf7f759867.png?v=2495978483874528',
  'https://imgs.dgrhw.net/album/scenery/15.jpg?123123',
  // 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png',
  // 'https://cdn.pixabay.com/photo/2023/09/24/14/05/dog-8272860_1280.jpg',
  // 'https://img.trading.live/2753a7/fromhuihu/user_photo/393975.jpg',
  'https://img.forexchat.com/ba88c1/301190/71b04c2762594b4ba9f03f18a613ab83.jpg'
  // 'https://img.forexchat.com/headdefault/19.png',
  // 'https://img.forexchat.com/ba88c1/9f544d/0f7e58c5dc4041beb63b3ee67426b433.gif',
  // assetImg
];

const setCookieInfo = async () => {
  setCookie(
    'SIDE_LAYOUT',
    '{"mode":3,"selected":[1,5],"modeMap":{"1":{"w":500},"2":{"w":500,"h":""},"3":{"1":345,"2":345,"3":345,"4":345,"5":345}}}'
  );
};

onMounted(() => {
  window.addEventListener('message', onMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', onMessage);
});
</script>

<template>
  <div class="fb-demo">
    <!-- <iframe ref="elFrame" src="" frameborder="0" class="m-iframe"></iframe> -->
    <div>
      <button @click="setCookieInfo">按钮</button>
      <button @click="goOther">to other</button>
    </div>

    <div>
      <img v-for="url in imgs" :key="url" :src="url" alt="" class="w-200px" crossorigin="anonymous" />
    </div>

    <div class="box">
      <div>
        一些内容
        <!-- <img :src="assetImg" alt="" /> -->
      </div>
      <div class="input_box">
        <input type="text" placeholder="正在搜索..." class="input" @click="idsPush" />
      </div>
    </div>
    <iframe
      ref="refChatIframe"
      src="http://localhost:8080/fbchat/loading?lang=ms"
      frameborder="0"
      class="r-iframe"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.box {
  position: relative;
  .input_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .input {
    border-color: transparent;
    box-shadow: none;
    color: transparent;
    background: none !important;
    &::placeholder {
      color: transparent;
    }
  }
}
.fb-demo {
  width: 800px;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.m-iframe {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -999;
}

.r-iframe {
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 100vh;
  border: 1px solid gray;
}
</style>
