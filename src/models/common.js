import modelExtend from 'dva-model-extend'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};

const pageModel = modelExtend(model, {

});
module.exports = {
  model,
  pageModel,
};
