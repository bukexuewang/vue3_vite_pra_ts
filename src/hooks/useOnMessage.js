import { ref, unref } from 'vue';
import { CHAT_HREF } from '@/constant';

export const OPERATION_TYPE = {
  FB_CLOSE: 1, // 右下角聊天应用关闭隐藏
  MAIN_OPEN: 2, // 打开显示主应用
  DIALOG_OPEN: 3, // 打开弹窗
  OPEN_LOGIN: 4, // 打开登录页
  OPEN_USER_INFO: 5, // 打开个人中心
  MESSAGE_COUNT: 6, // 消息数量同步
  DIALOG_CLOSE: 7, // 关闭弹窗
  DIALOG_URL_CHANGE: 8, // 弹窗url改变
  ADD_CUSTOMER: 9, // 添加客服
  NIU_ADD_ACCOUNT: 11, // 牛人榜添加账号
  LAYOUT_TYPE: 100, // fb的布局方式
  DIALOG_SOCKET: 101, // 弹窗信息通信
  CLICK_OUTSIDE: 102, // iframe内点击

  SEND_MAIN_SOCKET: 200, // 顶层窗口对聊天窗口发送信息
  ACCEPT_MAIN_SOCKET: 201, // 顶层窗口接收主聊天窗口的信息

  H5_DOWNLOAD: 301, // h5通讯下载
  H5_IMG: 302, // h5图片,
  H5_VIDEO: 303, // h5视频
  H5_PERSONAL: 304, // h5个人中心

  BACK_END_UN_READ_COUNT: 400, // 后台未读消息数量
  BACK_END_SEND_MSG_COUNT: 401 // 后台已发送消息数量
};

let mainWin = null;

export const WIN_FX_MAIN = '_fx_main_app';

export const useOnMessage = (getCurLang = () => 'cn') => {
  const elFrame = ref();
  const refChatIframe = ref();

  /**
   * @description 主应用窗口
   */
  const getWinFxChat = (lang) => {
    return new Promise((resolve, reject) => {
      let windowObj = window[WIN_FX_MAIN];
      if (!windowObj || windowObj.closed) {
        const langText = lang === 'en' ? '' : `/${lang}`;
        const nextUrl = encodeURIComponent('/main');
        const url = CHAT_HREF + `${langText}/fbchat/loading?next=${nextUrl}`;
        windowObj = window.open(url, '_blank', `width=${960},height=${640}}`);
        window[WIN_FX_MAIN] = windowObj;
        const fn = (e) => {
          if (e.origin !== CHAT_HREF) return;
          if (e.data.type !== OPERATION_TYPE.ACCEPT_MAIN_SOCKET) return;
          window.removeEventListener('message', fn);
          resolve(windowObj);
        };
        window.addEventListener('message', fn);
        return;
      } else {
        windowObj.focus();
      }
      resolve(windowObj);
    });
  };

  const { openDialog, closeDialog } = useOpenDialog();

  const onMessage = (event) => {
    // console.log(event);
    if (!event.data) return;
    const { type, data } = event.data;
    if (type === OPERATION_TYPE.DIALOG_OPEN) {
      const { url, width, height } = event.data.data;
      openDialog(url, width, height, getCurLang());
    } else if (type === OPERATION_TYPE.DIALOG_CLOSE) {
      closeDialog();
    } else if (type === OPERATION_TYPE.MAIN_OPEN) {
      const { url, width, height } = event.data.data;
      if (mainWin === null || mainWin.closed) {
        mainWin = window.open(url, '_blank', `height=${height},width=${width}`);
      } else {
        mainWin.focus();
      }
    } else if (type === OPERATION_TYPE.DIALOG_SOCKET) {
      console.log('fb data', data);
      unref(refChatIframe).contentWindow.postMessage(event.data, '*');
    }
  };
  return { onMessage, elFrame, refChatIframe, getWinFxChat, OPERATION_TYPE };
};
