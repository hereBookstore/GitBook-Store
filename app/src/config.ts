import Taro from "@tarojs/taro";
export const url =
  "production" === process.env.NODE_ENV
    ? "http://gitbook.kedo.so"
    : Taro.getEnv() === "WEB"
    ? "/gitbook"
    : "http://127.0.0.1:9000/gitbook";
