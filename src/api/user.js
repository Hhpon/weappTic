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

function saleTic(saleInfo){
  return Taro.request({
    method: "POST",
    url: `${HOST}/sale`,
    data: { saleInfo: saleInfo }
  });
}

function getOrder(userName){
  return Taro.request({
    method: "POST",
    url: `${HOST}/order`,
    data: { userName: userName }
  });
}

function refundTic(_id){
  return Taro.request({
    method: "POST",
    url: `${HOST}/refund`,
    data: { _id: _id }
  });
}

export default {
  signup,
  signin,
  inquireTic,
  saleTic,
  getOrder,
  refundTic
};
