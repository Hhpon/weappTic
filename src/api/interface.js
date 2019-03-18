import Taro from "@tarojs/taro";

function showModelApi(title, content) {
  return Taro.showModal({
    title: title,
    content: content,
    showCancel: false
  });
}

export default {
  showModelApi
};
