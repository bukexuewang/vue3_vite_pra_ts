<script setup>
import { setCookie } from '@/utils';
import { useOnMessage } from '@/hooks/useOnMessage';
import { CHAT_HREF } from '@/constant';
import axios from 'axios';

const router = useRouter();
const goOther = () => {
  router.push('/other');
};

const FB_LANG_TYPE = {
  0: 'en',
  1: 'cn',
  2: 'tw',
  7: 'th',
  8: 'ar',
  10: 'vi',
  12: 'zh',
  13: 'id',
  14: 'ms',
  11: 'es',
  6: 'jp',
  5: 'ko',
  15: 'pt',
  3: 'ru',
  4: 'fr',
  9: 'it',
  16: 'tr'
};

const currLang = ref('en');
const handleChangeLang = (lang) => {
  currLang.value = lang;
};

const { onMessage, elFrame, refChatIframe, getWinFxChat, OPERATION_TYPE } = useOnMessage(() => unref(currLang));

const couldUserId = '946807756626070496';
const sendMsg = async () => {
  const winObj = await getWinFxChat(unref(currLang));
  winObj.postMessage(
    {
      type: OPERATION_TYPE.SEND_MAIN_SOCKET,
      data: { targetId: couldUserId, conversationType: 1 }
    },
    CHAT_HREF
  );
};

const addCustomer = () => {
  unref(refChatIframe).contentWindow.postMessage(
    { type: OPERATION_TYPE.ADD_CUSTOMER, data: unref(currLang) },
    CHAT_HREF
  );
};

const { ELayoutType, chatLayoutChange } = useChatLayout();
let idx = 0;
const layoutChange = () => {
  idx++;
  const layout = (idx % 3) + 1;
  chatLayoutChange(layout);
  unref(refChatIframe).contentWindow.postMessage({ type: OPERATION_TYPE.LAYOUT_TYPE, data: { layout } }, CHAT_HREF);
};

const assetImg = 'https://img.forexchat.com/e3725d/bcae05/e68ba1eb-e4ec-481d-a982-e1fd5e4758a6.gif?v=47451041839528174';
const imgs = [
  'https://img.forexchat.com/e3725d/cf0904/4fb1706ce290451193067fcf7f759867.png',
  'https://imgs.dgrhw.net/album/scenery/15.jpg?123123',
  // 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png',
  // 'https://cdn.pixabay.com/photo/2023/09/24/14/05/dog-8272860_1280.jpg',
  // 'https://img.trading.live/2753a7/fromhuihu/user_photo/393975.jpg',
  'https://img.forexchat.com/ba88c1/301190/71b04c2762594b4ba9f03f18a613ab83.jpg'
  // 'https://img.forexchat.com/headdefault/19.png',
  // 'https://img.forexchat.com/ba88c1/9f544d/0f7e58c5dc4041beb63b3ee67426b433.gif',
  // assetImg
];

const downloadFile = (data, fileName) => {
  let blob = new Blob([data]);
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
};

const downloadImg = async () => {
  const res = await axios.get('https://img.forexchat.com/e3725d/cf0904/4fb1706ce290451193067fcf7f759867.png', {
    responseType: 'blob'
  });

  downloadFile(res.data, '1.png');
};

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
      <button @click="downloadImg">下载</button>
      <button @click="sendMsg">发送信息</button>
      <button @click="addCustomer">添加客服</button>
      <button @click="layoutChange">切换布局</button>
    </div>

    <ul>
      <li v-for="lang of FB_LANG_TYPE" :key="lang">
        <button @click="handleChangeLang(lang)">{{ lang }}</button>
      </li>
    </ul>

    <iframe
      ref="refChatIframe"
      allow="clipboard-write;clipboard-read"
      :src="`${CHAT_HREF}/${currLang}/fbchat/loading`"
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
