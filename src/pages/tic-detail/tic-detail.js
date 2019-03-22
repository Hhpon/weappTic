import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import UserApi from "@api/user.js";
import TicCard from "@base/tic-card/tic-card.js";
import getUser from "@common/js/get-user.js";
import { ERR_OK, ERR_OR } from "@common/js/config.js";
import interfaceApi from "@api/interface.js";

import "./tic-detail.scss";

export default class ticDetail extends Component {
  config = {
    navigationBarTitleText: "车票详情"
  };
  constructor() {
    super();
    this.state = {
      ticInfos: [],
      userName: ""
    };
  }
  componentWillMount() {
    let inquireInfo = this.$router.params;
    this._inquireTic(inquireInfo);
    getUser()
      .then(res => {
        console.log(res.data);
        this.setState({
          userName: res.data
        });
      })
      .catch(err => {
        console.log(err);
        Taro.navigateTo({ url: "/pages/signin/signin" });
      });
  }
  _inquireTic(inquireInfo) {
    UserApi.inquireTic(inquireInfo).then(res => {
      console.log(res.data.ticInfo);
      this.setState({
        ticInfos: res.data.ticInfo
      });
    });
  }
  saleHandle(e) {
    console.log(e);
    e.userName = this.state.userName;
    UserApi.saleTic(e).then(res => {
      console.log(res);
      if (res.data.code === ERR_OR) {
        interfaceApi.showModelApi("提示", "订单提交失败");
      } else if (res.data.code === ERR_OK) {
        interfaceApi.showModelApi("成功", "购买成功！");
        Taro.switchTab({ url: "/pages/order/order" });
      }
    });
  }
  render() {
    return (
      <View>
        <View>
          <TicCard onSale={this.saleHandle} ticInfos={this.state.ticInfos} />
        </View>
      </View>
    );
  }
}
