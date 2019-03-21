import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import UserApi from "@api/user.js";
import { ERR_OK } from "@common/js/config";
import interfaceApi from "@api/interface.js";

import "./signin.scss";

export default class signin extends Component {
  config = {
    navigationBarTitleText: "登录"
  };
  constructor() {
    super();
    this.state = {
      userName: "",
      passWord: ""
    };
  }
  changeUsername(userName) {
    this.setState({
      userName
    });
  }
  changePassword(passWord) {
    this.setState({
      passWord
    });
  }
  onSubmit(e) {
    if (!this.state.userName || !this.state.passWord) {
      interfaceApi.showModelApi("提示", "请填写完整");
      return;
    }
    let userInfo = {
      userName: this.state.userName,
      passWord: this.state.passWord
    };
    this._signin(userInfo);
  }
  _signin(userInfo) {
    UserApi.signin(userInfo).then(res => {
      console.log(res);
      if (res.data.code === ERR_OK) {
        interfaceApi.showModelApi("成功", "登录成功").then(res => {
          if (res.confirm) {
            console.log("跳转到index页面");
            Taro.setStorage({ key: "userName", data: this.state.userName });
            Taro.switchTab({ url: "/pages/index/index" });
          }
        });
        return;
      }
      interfaceApi.showModelApi("提示", "账号或密码错误");
    });
  }
  signup() {
    Taro.navigateTo({ url: "/pages/signup/signup" });
  }
  render() {
    return (
      <View className="signin">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput
            type="text"
            title="用户名"
            placeholder="请输入用户名"
            value={this.state.userName}
            onChange={this.changeUsername.bind(this)}
          />
          <AtInput
            type="password"
            title="密码"
            placeholder="请输入密码"
            value={this.state.passWord}
            onChange={this.changePassword.bind(this)}
          />
          <AtButton
            className="button-container"
            type="primary"
            formType="submit"
          >
            登录
          </AtButton>
          <AtButton
            className="button-container"
            type="primary"
            onClick={this.signup}
          >
            注册
          </AtButton>
        </AtForm>
      </View>
    );
  }
}
