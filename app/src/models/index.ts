import Taro from "@tarojs/taro";
export default [
  {
    namespace: "common",
    state: {},
    reducers: {
      save(state, { payload }) {
        Taro.hideLoading();
        return { ...state, ...payload };
      }
    }
  },
  require("./order").default
];
