import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
// import './custom-variables.scss'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/signup/signup',
      'pages/signin/signin',
      'pages/mine/mine',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    debug: true,
    tabBar: {
      color: '#333333',
      selectedColor: '#6190E8',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '订单',
          iconPath: '',
          selectedIconPath: ''
        },
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: '',
          selectedIconPath: ''
        },
        {
          pagePath: 'pages/index/index',
          text: '我的',
          iconPath: '',
          selectedIconPath: ''
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
