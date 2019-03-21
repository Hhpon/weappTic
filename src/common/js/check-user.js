import Taro from "@tarojs/taro";

function checkUser() {
  return Taro.getStorage({ key: "userName" });
}

export default checkUser;
