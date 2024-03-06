import { setCookie } from '@/utils';

const ELayoutType = {
  SINGLE: 1, // 单列
  VERTICAL: 2, // 上下
  TILE: 3 // 平铺/并列
};

export const useChatLayout = () => {
  const chatLayoutChange = (sideVal) => {
    setCookie('SIDE_LAYOUT', JSON.stringify({ mode: sideVal }));
  };

  return { ELayoutType, chatLayoutChange };
};
