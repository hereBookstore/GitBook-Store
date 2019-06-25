import { Input, List, Icon, Form, Button, Menu } from "antd";
import axios from "axios";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/gitbook"
    : "http://gitbook.kedo.so/gitbook";
const { Search } = Input;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
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
    找不到想要的Gitbook资源?您可以通过"分享用户"帮助我们补充资源,或通过
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
    axios.get(url + path).then(response => {
      this.setState({ gitbooks: response.data });
    });
  }
  render() {
    return [
      <Search
        allowClear
        size="large"
        style={{
          position: "fixed",
          zIndex: 1,
          padding: "0 50px",
          width: "50%"
        }}
        onSearch={value =>
          axios.get(url + "/search?q=" + value).then(response => {
            this.setState({ gitbooks: response.data });
          })
        }
        enterButton="kedo.so"
      />,
      <List
        style={{ padding: "0 50px" }}
        itemLayout="horizontal"
        size="large"
        dataSource={this.state.gitbooks}
        footer={<WrappedShare />}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10
        }}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text="156" />,
              <IconText type="message" text="2" />
            ]}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.about}
          </List.Item>
        )}
      />
    ];
  }
}
