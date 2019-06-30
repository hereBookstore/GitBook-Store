import Head from "next/head";
import { Input, List, Icon, Button, Alert } from "antd";
import axios from "axios";
const url = "/gitbook";
const { Search } = Input;

export default class extends React.Component {
  state = {
    searchValue: "",
    gitbooks: [],
    value: ""
  };
  share() {
    if (this.state.shareUser) {
      axios.get(url + "/crawl/" + this.state.shareUser);
      this.setState({ shareUser: "" });
    } else {
      this.setState({ alert: true });
      setTimeout(() => {
        this.setState({ alert: false });
      }, 2000);
    }
  }
  componentDidMount() {
    this.list("/list");
  }
  list(path) {
    this.setState({ loading: true });
    axios.get(url + path).then(response => {
      this.setState({ gitbooks: response.data, loading: false });
    });
  }
  render() {
    return [
      <Head key="head">
        <title>GitBook Ebook Search--GitBook电子书资源搜索</title>
        <meta
          name="description"
          content="GitBook pdf/epub/kindle mobi格式电子书搜索下载."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>,
      <Search
        key="search"
        allowClear
        size="large"
        style={{
          position: "fixed",
          zIndex: 1,
          padding: "0 50px"
        }}
        onSearch={value =>
          value ? this.list("/search?q=" + value) : this.list("/list")
        }
        enterButton="kedo.so"
      />,
      <List
        key="list"
        locale={{ emptyText: "GitBook没有给你的那个搜索引擎" }}
        loading={this.state.loading}
        style={{ padding: "50px 50px" }}
        itemLayout="vertical"
        size="small"
        dataSource={this.state.gitbooks}
        footer={
          <div style={{ float: "left", width: "100%" }}>
            找不到GitBook资源？点击“分享”或
            <a href="https://github.com/hereBookstore/GitBook-Store">
              <Icon type="github" />
              反馈
            </a>
            。<br />
            <Input
              allowClear
              style={{ width: "200px", margin: "10px 10px 10px 0px" }}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="GitBook用户名"
              value={this.state.shareUser}
              onChange={({ target: { value } }) => {
                this.setState({ shareUser: value });
              }}
              onPressEnter={this.share.bind(this)}
            />
            <Button type="primary" onClick={this.share.bind(this)}>
              分享
            </Button>
            {this.state.alert && (
              <Alert
                style={{ width: "200px" }}
                message="您还没有输入用户名"
                type="warning"
                showIcon
              />
            )}
          </div>
        }
        pagination={{
          size: "small",
          hideOnSinglePage: true,
          pageSize: 9
        }}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <a
                href={`http://gitbook.kedo.so/ebook/${
                  item.author
                }/${item.title.join("")}.pdf`}
              >
                PDF
              </a>,
              <a
                href={`http://gitbook.kedo.so/ebook/${
                  item.author
                }/${item.title.join("")}.epub`}
              >
                Ebook
              </a>,
              <a
                href={`http://gitbook.kedo.so/ebook/${
                  item.author
                }/${item.title.join("")}.mobi`}
              >
                Kindle
              </a>
            ]}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={
                <a style={{ color: "rgba(0, 0, 0, 0.65)" }} href={item.href}>
                  {item.description.length
                    ? item.description
                    : "本书作者没写简介"}
                </a>
              }
            />
            {item.about.length ? (
              <a style={{ color: "rgba(0, 0, 0, 0.65)" }} href={item.href}>
                {item.about.join("").slice(0, innerWidth < 768 ? 150 : 300)}{" "}
                <Icon
                  style={{ color: "rgba(0, 0, 0, 0.5)" }}
                  type="double-right"
                />
              </a>
            ) : (
              ""
            )}
          </List.Item>
        )}
      />
    ];
  }
}
