import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import UserApi from "@api/user.js";
import { AtList, AtListItem } from "taro-ui";
import { ERR_OK } from "@common/js/config.js";
import interfaceApi from "@api/interface.js";

import "./order.scss";

export default class order extends Component {
  config = {
    navigationBarTitleText: "车票详情"
  };
  constructor() {
    super();
    this.state = {
      orderInfo: [],
      userName: ""
    };
  }
  componentWillMount() {
    let userName = Taro.getStorageSync("userName");
    this.setState({
      userName: userName
    });
  }
  componentDidShow() {
    let userName = Taro.getStorageSync("userName");
    this._getOrder(userName);
  }
  _getOrder(userName) {
    UserApi.getOrder(userName).then(res => {
      console.log(res.data);
      this.setState({
        orderInfo: res.data.orderInfo
      });
    });
  }
  checkTime(outTime) {
    let time = new Date(outTime);
    let nowTime = new Date().getTime();
    let dif = time - nowTime;
    if (dif > 0) {
      console.log("可退");
      return true;
    } else {
      console.log("不可退");
      return false;
    }
  }
  refundHandle(e) {
    console.log(e);
    UserApi.refundTic(e._id).then(res => {
      console.log(res);
      if (res.data.code === ERR_OK) {
        interfaceApi.showModelApi("成功", "退票成功！").then(res => {
          if (res.confirm) {
            this._getOrder(this.state.userName);
          }
        });
      }
    });
  }
  render() {
    const ticList = this.state.orderInfo.map(ticInfo => {
      return (
        <View
          className="tic-card"
          key={ticInfo._id}
          onClick={this.refundHandle.bind(this, ticInfo)}
        >
          <AtList>
            <AtListItem
              title="始发站"
              note={ticInfo.outCity}
              extraText={ticInfo.outTime}
            />
            <AtListItem
              title="车次及价格"
              note={ticInfo.ticId}
              extraText={Math.round(ticInfo.price * ticInfo.disCount * 0.1)}
            />
            <AtListItem
              title="终点站"
              note={ticInfo.overCity}
              extraText={ticInfo.overTime}
            />
            <AtListItem
              title="状态"
              note="可点击进行相关操作"
              extraText={this.checkTime(ticInfo.outTime) ? "可退票" : "已过期"}
            />
          </AtList>
        </View>
      );
    });
    return (
      <View>
        {this.state.orderInfo.length ? (
          <View>{ticList}</View>
        ) : (
          <Text>您还没有任何订单</Text>
        )}
      </View>
    );
  }
}
