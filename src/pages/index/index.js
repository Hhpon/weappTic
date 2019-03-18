import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import interfaceApi from "@api/interface.js";
import UserApi from "@api/user.js";

import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };
  constructor() {
    super();
    this.state = {
      dateSel: "2019-03-18",
      outCity: "",
      overCity: ""
    };
  }
  componentWillMount() {
    let date = new Date();
    console.log(date);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

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
    console.log(this.state.outCity);
    if (!this.state.overCity || !this.state.outCity) {
      interfaceApi.showModelApi("提示", "请输入完整地址");
      return;
    }
    console.log(this.state);
    let inquireInfo = {
      dateSel: this.state.dateSel,
      outCity: this.state.outCity,
      overCity: this.state.overCity
    };
    this._inquireTic(inquireInfo);
  }
  _inquireTic(inquireInfo) {
    UserApi.inquireTic(inquireInfo).then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <View className="index">
        <Picker mode="date" onChange={this.onDateChange}>
          <AtInput
            editable={false}
            type="text"
            placeholder="2018-03-18"
            value={this.state.dateSel}
            className="region"
          />
        </Picker>
        <Picker mode="region" onChange={this.onoutCityChange}>
          <AtInput
            editable={false}
            title="您的抵达地"
            type="text"
            placeholder="您要去哪？"
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
