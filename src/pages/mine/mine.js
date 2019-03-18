import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtGrid, AtButton } from "taro-ui";

import "./mine.scss";

export default class mine extends Component {
  config = {
    navigationBarTitleText: "我的"
  };
  constructor() {
    super();
    this.state = {
      userName: "admin",
      avator:
        "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
      grid: [
        {
          image:
            "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
          value: "领取中心"
        },
        {
          image:
            "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
          value: "找折扣"
        },
        {
          image:
            "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
          value: "领京豆"
        }
      ]
    };
  }
  componentWillMount() {
    Taro.getStorage({ key: "key" })
      .then(res => {
        console.log(res);
        this.setState({
          userName: res.data
        });
      })
      .catch(err => {
        console.log("跳转到登录页面");
      });
  }
  render() {
    return (
      <View className="mine">
        <AtListItem
          title={this.state.userName}
          note="白银会员"
          arrow="right"
          thumb={this.state.avator}
        />
        <AtGrid data={this.state.grid} style="font-size: 14px" />
        <View className="features">
          <AtListItem title="客服中心" arrow="right" />
          <AtListItem title="产品意见" arrow="right" />
          <AtListItem title="邀请好友" arrow="right" />
        </View>
        <AtButton type="secondary">按钮文案</AtButton>
      </View>
    );
  }
}
