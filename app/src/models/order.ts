export default {
  namespace: "order",
  state: {},

  // effects: {
  //   *load(_, { call, put }) {
  //     const { msg, result } = yield call(request, {
  //       url: "order/getList.do",
  //       data: { pageNo: 1, craId: "150" }
  //     });
  //     if (msg === "OK") {
  //       yield put({
  //         type: "save",
  //         payload: {
  //           order: result
  //         }
  //       });
  //     }
  //   }
  // },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
