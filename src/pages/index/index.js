import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import interfaceApi from "@api/interface.js";
import UserApi from "@api/user.js";
import checkUser from "@common/js/get-user.js";
import getTime from "@common/js/get-time.js";

import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };
  constructor() {
    super();
    this.state = {
      dateSel: "",
      outCity: "",
      overCity: ""
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    let date = getTime();
    this.setState({
      dateSel: date
    });
    checkUser()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("跳转到登录页面");
        Taro.navigateTo({ url: "/pages/signin/signin" });
      });
  }

  componentDidHide() {}

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    });
  };
  onoutCityChange = e => {
    console.log(e);
    e = e.detail.value;
    this.setState({
      outCity: e[0] + "-" + e[1] + "-" + e[2]
    });
  };
  onoverCityChange = e => {
    console.log(e);
    e = e.detail.value;
    this.setState({
      overCity: e[0] + "-" + e[1] + "-" + e[2]
    });
  };
  onInquire(e) {
    console.log(this.state.dateSel);
    if (!this.state.overCity || !this.state.outCity) {
      interfaceApi.showModelApi("提示", "请输入完整地址");
      return;
    }
    let inquireInfo = {
      dateSel: this.state.dateSel,
      outCity: this.state.outCity,
      overCity: this.state.overCity
    };
    console.log(inquireInfo);
    this._inquireTic(inquireInfo);
  }
  _inquireTic(inquireInfo) {
    UserApi.inquireTic(inquireInfo).then(res => {
      console.log(res);
      if (res.data.code === 202) {
        interfaceApi.showModelApi("提示", "查询失败");
      } else if (res.data.code === 201) {
        interfaceApi.showModelApi("提示", "当天没有匹配车次");
      } else {
        console.log("跳转到车票详情页面");
        Taro.navigateTo({
          url: `/pages/tic-detail/tic-detail?dateSel=${
            this.state.dateSel
          }&&outCity=${this.state.outCity}&&overCity=${this.state.overCity}`
        });
      }
    });
  }
  render() {
    return (
      <View className="index">
        <Picker
          mode="date"
          onChange={this.onDateChange}
          start={this.state.dateSel}
        >
          <AtInput
            editable={false}
            value={this.state.dateSel}
            type="text"
            className="region"
          />
        </Picker>
        <Picker mode="region" onChange={this.onoutCityChange}>
          <AtInput
            editable={false}
            title="您的出发地"
            type="text"
            placeholder="您从哪里出发？"
            value={this.state.outCity}
            className="region"
          />
        </Picker>
        <Picker mode="region" onChange={this.onoverCityChange}>
          <AtInput
            editable={false}
            title="您的抵达地"
            type="text"
            placeholder="您要去哪？"
            value={this.state.overCity}
            className="region"
          />
        </Picker>
        <AtButton
          type="primary"
          className="btn-container"
          onClick={this.onInquire}
        >
          查询
        </AtButton>
      </View>
    );
  }
}
