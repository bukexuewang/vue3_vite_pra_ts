export const useOpenDialog = () => {
  let dialogDiv = null;
  let iframeEl = null;
  const openDialog = (src, width, height) => {
    createIframeEl(src);
    iframeEl.style.width = `${width}px`;
    iframeEl.style.height = `${height}px`;
    if (dialogDiv) {
      dialogDiv.style.display = 'flex';
    } else {
      createParentEl();
      dialogDiv.style.display = 'flex';
    }
  };

  const closeDialog = () => {
    if (!dialogDiv) return;
    dialogDiv.style.display = 'none';
  };

  const createCloseBtn = () => {
    const button = document.createElement('button');
    button.classList.add('dialog-close_btn');
    button.innerText = '关闭';
    button.addEventListener('click', closeDialog);
    return button;
  };

  const createParentEl = () => {
    // createIframeEl();
    if (dialogDiv) {
      dialogDiv.style.display = 'flex';
      return;
    }
    dialogDiv = document.createElement('div');
    dialogDiv.style.display = 'none';
    dialogDiv.classList.add('dialog');
    dialogDiv.appendChild(iframeEl);
    dialogDiv.appendChild(createCloseBtn());
    document.body.appendChild(dialogDiv);
    return dialogDiv;
  };

  const createIframeEl = (src) => {
    if (iframeEl) {
      iframeEl.contentWindow.postMessage({ type: OPERATION_TYPE.DIALOG_URL_CHANGE, data: src }, '*');
    } else {
      iframeEl = document.createElement('iframe');
      iframeEl.src = `http://localhost:8080/fbchat/loading?next=${encodeURIComponent(src)}`;
    }
    return iframeEl;
  };

  onBeforeUnmount(() => {
    closeDialog();
    iframeEl = null;
    dialogDiv = null; // 组件卸载时，清除DOM元素
  });

  onMounted(() => {
    // requestIdleCallback(() => {
    //   console.log(111);
    //   createParentEl();
    // });
  });
  return { openDialog, closeDialog, iframeEl };
};
