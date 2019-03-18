import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import UserApi from "@api/user.js";
import { ERR_OK, ERR_OR, ERR_NO } from "@common/js/config";
import interfaceApi from "@api/interface.js";

import "./signup.scss";

export default class signup extends Component {
  config = {
    navigationBarTitleText: "注册"
  };

  constructor() {
    super();
    this.state = {
      userName: "",
      passWord: "",
      conPassword: "",
      name: "",
      idCard: ""
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
  changeConPassword(conPassword) {
    this.setState({
      conPassword
    });
  }
  changeName(name) {
    this.setState({
      name
    });
  }
  changeIdcard(idCard) {
    this.setState({
      idCard
    });
  }
  onSubmit(e) {
    if (
      !this.state.userName ||
      !this.state.passWord ||
      !this.state.conPassword ||
      !this.state.name ||
      !this.state.idCard
    ) {
      interfaceApi.showModelApi("提示", "请填写完整");
      return;
    }
    if (this.state.passWord !== this.state.conPassword) {
      interfaceApi.showModelApi("提示", "两次输入的密码不一样");
      return;
    }
    let userInfo = {
      userName: this.state.userName,
      passWord: this.state.passWord,
      name: this.state.name,
      idCard: this.state.idCard
    };
    this._signup(userInfo);
  }
  _signup(userInfo) {
    UserApi.signup(userInfo).then(res => {
      console.log(res);
      if (res.data.code === ERR_NO) {
        interfaceApi.showModelApi("提示", "注册失败");
        return;
      } else if (res.data.code === ERR_OR) {
        interfaceApi.showModelApi("提示", "用户名已经被注册");
        return;
      }
      interfaceApi.showModelApi("成功", "注册成功").then(res => {
        if (res.confirm) {
          console.log("跳转到登录页面");
        }
      });
    });
  }
  render() {
    return (
      <View className="signup">
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
          <AtInput
            type="password"
            title="确认密码"
            placeholder="请确认密码"
            value={this.state.conPassword}
            onChange={this.changeConPassword.bind(this)}
          />
          <AtInput
            type="text"
            title="姓名"
            placeholder="请输入姓名"
            value={this.state.name}
            onChange={this.changeName.bind(this)}
          />
          <AtInput
            type="idcard"
            title="身份证号"
            placeholder="请输入身份证号"
            value={this.state.idCard}
            onChange={this.changeIdcard.bind(this)}
          />
          <AtButton
            className="button-container"
            type="primary"
            formType="submit"
          >
            注册
          </AtButton>
        </AtForm>
      </View>
    );
  }
}
