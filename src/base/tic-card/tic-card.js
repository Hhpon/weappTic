import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";

import "./tic-card.scss";

export default class TicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  saleHandle(e){
    this.props.onSale(e)
  }
  render() {
    const ticList = this.props.ticInfos.map(ticInfo => {
      return (
        <View className="tic-card" key={ticInfo._id} onClick={this.saleHandle.bind(this, ticInfo)}>
          <AtList>
            <AtListItem
              title="始发站"
              note={ticInfo.outCity}
              extraText={ticInfo.outTime.substring(11)}
            />
            <AtListItem
              title="车次及价格"
              note={ticInfo.ticId}
              extraText={Math.round(ticInfo.price * ticInfo.disCount * 0.1)}
            />
            <AtListItem
              title="终点站"
              note={ticInfo.overCity}
              extraText={ticInfo.overTime.substring(11)}
            />
            <AtListItem
              title="余票"
              note={ticInfo.resVote}
              extraText="购买？"
            />
          </AtList>
        </View>
      );
    });
    return (
      <View>
        <View>{ticList}</View>
      </View>
    );
  }
}
