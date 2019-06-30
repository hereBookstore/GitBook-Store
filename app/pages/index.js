import Head from "next/head";
import { Input, List, Icon, Form, Button } from "antd";
import axios from "axios";
const url = "/gitbook";
const { Search } = Input;
// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );
const WrappedShare = Form.create()(({ form }) => (
  <Form
    layout="inline"
    onSubmit={e => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err && values.username) {
          axios.get(url + "/crawl/" + values.username);
        }
      });
    }}
  >
    找不到想要的Gitbook资源?您可以通过"分享用户"功能帮助我们补充资源,或通过
    <a href="https://github.com/hereBookstore/GitBook-Store">GitHub</a>
    反馈...
    <Form.Item>
      {form.getFieldDecorator("username")(
        <Input
          allowClear
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Gitbook 用户名"
        />
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        分享用户
      </Button>
    </Form.Item>
  </Form>
));

export default class extends React.Component {
  state = {
    searchValue: "",
    gitbooks: [],
    value: ""
  };
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
        footer={<WrappedShare />}
        pagination={{
          position: "both",
          size: "small",
          hideOnSinglePage: true,
          pageSize: 9
        }}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              // <IconText type="star-o" text="156" />,
              // <IconText type="like-o" text="156" />,
              // <IconText type="message" text="2" />,
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
                  {item.description}
                </a>
              }
            />
            <a style={{ color: "rgba(0, 0, 0, 0.65)" }} href={item.href}>
              {item.about.join("").slice(0, innerWidth < 768 ? 150 : 300)} ……
            </a>
          </List.Item>
        )}
      />
    ];
  }
}
