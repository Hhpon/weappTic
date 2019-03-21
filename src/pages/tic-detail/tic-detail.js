import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import UserApi from "@api/user.js";
import TicCard from '@base/tic-card/tic-card.js'

import "./tic-detail.scss";

export default class ticDetail extends Component {
  config = {
    navigationBarTitleText: "车票详情"
  };
  constructor() {
    super();
    this.state = {
      ticInfos: []
    };
  }
  componentWillMount() {
    console.log(this.$router.params);
    // let inquireInfo = this.$router.params;
    let inquireInfo = {
      dateSel: "2019-03-25",
      outCity: "黑龙江省-鸡西市-麻山区",
      overCity: "黑龙江省-哈尔滨市-香坊区"
    };
    this._inquireTic(inquireInfo);
  }
  _inquireTic(inquireInfo) {
    UserApi.inquireTic(inquireInfo).then(res => {
      console.log(res.data.ticInfo);
      this.setState({
        ticInfos: res.data.ticInfo
      });
    });
  }
  render() {
    return (
      <View>
        <View>
          <TicCard></TicCard>
        </View>
      </View>
    );
  }
}
