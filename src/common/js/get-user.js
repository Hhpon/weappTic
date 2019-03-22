import Taro from "@tarojs/taro";

function getUser() {
  return Taro.getStorage({ key: "userName" });
}

export default getUser;
