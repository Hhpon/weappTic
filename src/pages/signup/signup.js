import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
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
    console.log(e);
    console.log(this.state);
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
