import Taro, { Component, Config } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtSearchBar, AtInput, AtButton } from "taro-ui";

import { url } from "../../config";

import "./index.scss";

@connect(({ common }) => ({ ...common }))
export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };
  constructor() {
    super(...arguments);
    this.state = {
      searchValue: "",
      gitbooks: [],
      value: ""
    };
  }
  list(path) {
    Taro.request({
      url: `${url}${path}`,
      success: ({ data }) => {
        this.setState({ gitbooks: data });
      }
    });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    this.list("/list");
  }

  componentDidHide() {}
  onChange(searchValue) {
    this.setState({
      searchValue
    });
  }

  onActionClick() {
    this.list(
      this.state.searchValue ? `/search?q=${this.state.searchValue}` : "/list"
    );
  }
  handleChange(value) {
    this.setState({
      value
    });
  }
  onSubmit() {
    Taro.request({
      url: `${url}/crawl/${this.state.value}`
    });
    this.setState({
      value: ""
    });
  }
  to(a) {
    Taro.redirectTo({
      url: this
    });
  }
  render() {
    return (
      <View className="index">
        <AtSearchBar
          value={this.state.searchValue}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <AtList>
          {this.state.gitbooks.map(gitbook => (
            <AtListItem
              note={gitbook.description.join("")}
              title={gitbook.title.join("")}
              onClick={this.to.bind(gitbook.href)}
            />
          ))}
        </AtList>
        <AtInput
          name="value"
          placeholder="Gitbook 用户名"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
          <AtButton onClick={this.onSubmit.bind(this)}>分享用户</AtButton>
        </AtInput>
      </View>
    );
  }
}
