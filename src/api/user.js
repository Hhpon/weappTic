import Taro from "@tarojs/taro";
import { HOST } from "@common/js/config";

function signup(userInfo) {
  console.log(userInfo);
  return Taro.request({
    url: `${HOST}/signup`,
    method: "POST",
    data: { userInfo: userInfo }
  });
}

function signin(userInfo) {
  return Taro.request({
    method: "POST",
    url: `${HOST}/signin`,
    data: { userInfo: userInfo }
  });
}

function inquireTic(inquireInfo) {
  return Taro.request({
    method: "POST",
    url: `${HOST}/inquire`,
    data: { inquireInfo: inquireInfo }
  });
}

export default {
  signup,
  signin,
  inquireTic
};
